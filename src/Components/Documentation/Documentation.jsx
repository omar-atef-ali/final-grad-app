import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './Documentation.module.css';

const menuData = [
  {
    id: "introduction",
    title: "INTRODUCTION",
    items: [
      { name: "Platform Overview", path: "/documentation/overview" }
    ]
  },
  {
    id: "database",
    title: "DATABASE CONNECTION",
    items: [
      { name: "Overview", path: "/documentation/database-connection/overview" },
      { name: "Supported Databases & Fields", path: "/documentation/database-connection/supported-databases" },
      { name: "Connection Status", path: "/documentation/database-connection/status" }
    ]
  },
  {
    id: "recommendation",
    title: "RECOMMENDATION ENGINE",
    items: [
      { name: "Overview", path: "/documentation/recommendation-engine/overview" },
      { name: "API Reference", path: "/documentation/recommendation-engine/api" }
    ]
  },
  {
    id: "dashboard",
    title: "BUSINESS DASHBOARD",
    items: [
      { name: "Overview", path: "/documentation/business-dashboard/overview" }
    ]
  },
  {
    id: "analyst",
    title: "AGENTIC ANALYST",
    items: [
      { name: "Overview", path: "/documentation/agentic-analyst/overview" }
    ]
  },
  {
    id: "chatbot",
    title: "STOREFRONT CHATBOT",
    items: [
      { name: "Overview", path: "/documentation/storefront-chatbot/overview" },
      { name: "API Reference", path: "/documentation/storefront-chatbot/api" }
    ]
  }
];

export default function Documentation() {
  const location = useLocation();
  const contentRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({
    introduction: true,
    database: true,
    recommendation: true,
    dashboard: true,
    analyst: true,
    chatbot: true
  });

  // Toggle group accordion
  const toggleGroup = (groupId) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Extract page headings dynamically for right TOC sidebar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll('h2[id]');
        const sectionData = Array.from(headings).map(h => ({
          id: h.id,
          text: h.textContent
        }));
        setSections(sectionData);
        if (sectionData.length > 0) {
          setActiveSection(sectionData[0].id);
        } else {
          setActiveSection("");
        }
      }
    }, 150); // slight delay to allow Outlet rendering

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Scrollspy logic to highlight current section in view
  useEffect(() => {
    const handleScroll = () => {
      const headings = sections.map(s => document.getElementById(s.id)).filter(Boolean);
      if (!headings.length) return;

      let current = headings[0].id;
      // Offset for sticky headers
      const scrollOffset = 110; 
      
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        // If the top of the heading is above the threshold line
        if (rect.top - scrollOffset <= 50) {
          current = heading.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check in case of landing halfway down the page
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Smooth scroll handler
  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // space for sticky navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Helper to find page title based on current path
  const getCurrentPageTitle = () => {
    for (const group of menuData) {
      const match = group.items.find(item => item.path === location.pathname);
      if (match) return match.name;
    }
    return "Documentation";
  };

  return (
    <div className={styles.docsWrapper}>
      {/* Mobile Sticky Sub-Nav Bar */}
      <div className={styles.mobileSubNav}>
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Documentation Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span>Docs Menu</span>
        </button>
        <span className={styles.mobileCurrentPage}>{getCurrentPageTitle()}</span>
      </div>

      {/* Left Sidenavbar Backdrop for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileBackdrop} 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidenavbar */}
      <aside className={`${styles.leftSidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h3>DOCUMENTATION</h3>
          <button 
            className={styles.closeButton}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Documentation Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {menuData.map(group => (
            <div key={group.id} className={styles.navGroup}>
              {/* Accordion Group Title */}
              <button 
                className={styles.groupHeader}
                onClick={() => toggleGroup(group.id)}
              >
                <span>{group.title}</span>
                <svg 
                  className={`${styles.chevron} ${openGroups[group.id] ? styles.chevronOpen : ''}`} 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Accordion Group Items */}
              {openGroups[group.id] && (
                <div className={styles.groupItems}>
                  {group.items.map(item => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                      }
                      end
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Middle Content Area */}
      <main className={styles.mainContent} ref={contentRef}>
        <Outlet />
      </main>

      {/* Right Sidenavbar (TOC) */}
      {sections.length > 0 && (
        <aside className={styles.rightSidebar}>
          <div className={styles.tocWrapper}>
            <span className={styles.tocHeading}>ON THIS PAGE</span>
            <ul className={styles.tocList}>
              {sections.map(section => (
                <li key={section.id} className={styles.tocItem}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleTocClick(e, section.id)}
                    className={`${styles.tocLink} ${activeSection === section.id ? styles.tocLinkActive : ''}`}
                  >
                    {section.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}