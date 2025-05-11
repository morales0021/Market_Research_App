import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResearchReport from '@/sections/template_section_2';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import axios from 'axios';

const sectionNames = [
  'Market Size',
  'Key Growth and Challenges',
  // Add more section titles here
];

export default function DisplayPage() {
  const location = useLocation();
  const { industry, region } = location.state || {};
  const navigate = useNavigate();

  if (!industry || !region) {
    navigate('/');
    return null;
  }

  const [activeSection, setActiveSection] = useState(sectionNames[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentBySection, setContentBySection] = useState({});
  const [loadingBySection, setLoadingBySection] = useState(
    sectionNames.reduce((acc, section) => ({ ...acc, [section]: true }), {})
  );

  // Fetch all sections at once
  useEffect(() => {
    const fetchAllSections = async () => {
      const requests = sectionNames.map((section) =>
        axios
          .post('http://192.168.1.48:5000/subsection', {
            industry,
            region,
            subsection: section,
            n_words: 400,
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }})
          .then((res) => ({ section, data: res.data }))
          .catch((err) => {
            console.error(`Failed to fetch ${section}:`, err);
            return { section, data: null };
          })
      );

      const results = await Promise.all(requests);

      const newContent = {};
      const newLoading = {};
      results.forEach(({ section, data }) => {
        newContent[section] = data;
        newLoading[section] = false;
      });

      setContentBySection(newContent);
      setLoadingBySection(newLoading);
    };

    fetchAllSections();
  }, [industry, region]);

  const currentContent = contentBySection[activeSection];
  const isLoading = loadingBySection[activeSection];

  return (
    <div className="flex min-h-screen relative">
      <button
        className="lg:hidden fixed top-4 left-4 z-30 bg-blue-500 text-white px-3 py-2 rounded shadow"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      <div
        className={`
          ${menuOpen ? 'block' : 'hidden'} 
          lg:block w-80 bg-gray-100 p-4 z-20 mr-4 flex-shrink-0 
          fixed lg:static top-0 left-0 h-full lg:h-auto overflow-y-auto
        `}
      >
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul className="space-y-2">
          {sectionNames.map((section) => (
            <li key={section}>
              <button
                className={`w-full text-left px-4 py-2 rounded ${
                  activeSection === section ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => {
                  setActiveSection(section);
                  setMenuOpen(false);
                }}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-4 ml-0 md:ml-10 lg:ml-80 max-w-[1100px] mt-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          {/* Bigger spinner: 24x24 with thicker border */}
          <div className="animate-spin rounded-full h-24 w-24 border-8 border-blue-500 border-t-transparent"></div>
          
          {/* Bigger text */}
          <p className="mt-6 text-xl text-gray-700 font-medium">
            Loading {activeSection}...
          </p>
        </div>
      ) : currentContent ? (
        <ResearchReport contentSection={currentContent} />
      ) : (
        <div>Error loading {activeSection}.</div>
      )}
      </div>
    </div>
  );
}
