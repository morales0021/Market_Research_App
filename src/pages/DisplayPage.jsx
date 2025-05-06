import React, { useState, useEffect } from 'react';
import contentMarketSizeSection from '@/tmp_data/subsection_ms.json';
import { useLocation, useNavigate } from 'react-router-dom';
import ResearchReport from '@/sections/template_section_2';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import axios from 'axios';

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
  const [kgdContent, setKgdContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load KGD content only when needed
  useEffect(() => {
    const fetchData = async () => {
      if (activeSection === 'Key Growth and Challenges' && !kgdContent) {  
        setLoading(true);
        try {
          const response = await axios.post("http://192.168.1.48:8000/subsection", {
            industry,
            region,
            subsection: "Key Growth and Challenges",
            n_words: 400
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          console.log("Response all:", response);
          console.log("Response data:", response.data);
          setKgdContent(response.data);
        } catch (error) {
          console.error("Error fetching KGD content:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [activeSection, industry, region, kgdContent]);

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
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                activeSection === 'Market Size' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => {
                setActiveSection('Market Size');
                setMenuOpen(false);
              }}
            >
              Market Size
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                activeSection === 'Key Growth and Challenges' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => {
                setActiveSection('Key Growth and Challenges');
                setMenuOpen(false);
              }}
            >
              Key Growth and Challenges
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-4 ml-0 md:ml-10 lg:ml-80 max-w-[1100px] mt-4">
        {activeSection === 'Market Size' && <ResearchReport contentSection={contentMarketSizeSection} />}
        {activeSection === 'Key Growth and Challenges' && (
          loading ? (
            <div>Loading...</div>
          ) : (
            <ResearchReport contentSection={kgdContent} />
          )
        )}
      </div>
    </div>
  );
}
