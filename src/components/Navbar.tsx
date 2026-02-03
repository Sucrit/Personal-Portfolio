import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaCode, FaFolderOpen, FaPhoneAlt, FaHome } from 'react-icons/fa';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is within the viewport (with some offset)
          // Relaxed logic for vertical scrolling
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
             current = section;
          }
        }
      }
      // If we're at (or very near) the bottom of the page, activate contact explicitly
      const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 8);
      if (scrolledToBottom) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#hero', id: 'hero', icon: <FaHome size={20} /> },
    { name: 'About', href: '#about', id: 'about', icon: <FaUser size={18} /> },
    { name: 'Skills', href: '#skills', id: 'skills', icon: <FaCode size={20} /> },
    { name: 'Projects', href: '#projects', id: 'projects', icon: <FaFolderOpen size={18} /> },
    { name: 'Contact', href: '#contact', id: 'contact', icon: <FaPhoneAlt size={18} /> },
  ];

  return (
    <motion.nav
      className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}
      initial={{ x: -100, opacity: 0, y: '-50%' }}
      animate={{ x: 0, opacity: 1, y: '-50%' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="nav-content">

        {/* Desktop Links (Icons Only Side Bar) */}
        <div className="nav-links">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              title={link.name}
            >
              <div className="icon-wrapper">
                 {link.icon}
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="nav-link-mobile"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span style={{marginLeft: '10px'}}>{link.name}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
