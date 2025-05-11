import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResearchReport from '@/sections/template_section_2';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import axios from 'axios';
import contentMarketSizeSection from '@/tmp_data/subsection_ms.json';

const STATIC_SECTIONS = {
  'Market Size': contentMarketSizeSection,
};

export default function DisplayPage() {
  const location = useLocation();
  const { industry, region } = location.state || {};
  const navigate = useNavigate();

  if (!industry || !region) {
    navigate('/');
    return null;
  }

  const [activeSection, setActiveSection] = useState('Market Size');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentBySection, setContentBySection] = useState({}); // cache for all sections

  const fetchSectionContent = async (sectionName) => {
    // Skip fetch for static content
    if (STATIC_SECTIONS[sectionName]) {
      setContentBySection((prev) => ({
        ...prev,
        [sectionName]: STATIC_SECTIONS[sectionName]
      }));
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://192.168.1.48:8008/subsection", {
        industry,
        region,
        subsection: sectionName,
        n_words: 400,
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setContentBySection((prev) => ({
        ...prev,
        [sectionName]: response.data
      }));
    } catch (err) {
      console.error(`Error fetching section "${sectionName}"`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!contentBySection[activeSection]) {
      fetchSectionContent(activeSection);
    }
  }, [activeSection]);

  const sectionNames = [
    'Market Size',
    'Key Growth and Challenges',
    // Add more sections here in the future
  ];

  const currentContent = contentBySection[activeSection];

  return (
    <div className="flex min-h-screen relative">
      <button
        className="lg:hidden fixed top-4 left-4 z-30 bg-blue-500 text-white px-3 py-2 rounded shadow"
        onClick={() => setMenuOpen(!menuOpen)}
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
        {loading ? (
          <div>Loading...</div>
        ) : currentContent ? (
          <ResearchReport contentSection={currentContent} />
        ) : (
          <div>No content available.</div>
        )}
      </div>
    </div>
  );
}
