import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaFolder, FaFolderOpen, FaHome, FaUserSecret } from 'react-icons/fa';
import './Navbar.css';

// Icons
const CodeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <motion.line
      x1="14" y1="4" x2="10" y2="20"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    />
  </svg>
);

const AboutIcon = ({ isActive }: { isActive: boolean }) => (
  <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <motion.div
      initial={false}
      /* Simple scale effect when active */
      animate={{ scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {isActive ? <FaUserSecret size={20} /> : <FaUser size={18} />}
    </motion.div>
  </div>
);

// Navbar
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
             current = section;
          }
        }
      }
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
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const getIcon = (id: string, isActive: boolean) => {
    switch (id) {
      case 'hero': 
        return (
          <motion.div initial={false} animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
            <FaHome size={20} />
          </motion.div>
        );
      case 'about': 
        return <AboutIcon isActive={isActive} />;
      case 'skills': 
        return (
          <motion.div initial={false} animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
            <CodeIcon isActive={isActive} />
          </motion.div>
        );
      case 'projects': 
        return (
          <motion.div
            initial={false}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {isActive ? <FaFolderOpen size={18} /> : <FaFolder size={18} />}
          </motion.div>
        );
      case 'contact': 
        return (
          <motion.div
            animate={isActive ? { 
              rotate: [0, -6, 6, -6, 6, 0],
              x: [0, -1.5, 1.5, -1.5, 1.5, 0],  
              y: [0, -0.5, 0.5, -0.5, 0.5, 0],  
              scale: isActive ? 1.1 : 1
            } : { rotate: 0, x: 0, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.36, 
              repeat: isActive ? Infinity : 0,
              repeatDelay: 1.2,
              ease: "easeInOut"
            }}
            style={{ display: 'inline-block', transformOrigin: 'center' }}
          >
            <img src="/assets/icons/ui/phonecall.svg" alt="Phone" className="nav-phone-icon" />
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <motion.nav
      className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}
      initial={false}
      animate={false}
    >
      <div className="nav-content">
        {/* Desktop links */}
        <div className="nav-links">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              title={link.name}
            >
              <div className="icon-wrapper">
                 {getIcon(link.id, activeSection === link.id)}
              </div>
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {links.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`nav-link-mobile ${activeSection === link.id ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mobile-link-icon">
                      {getIcon(link.id, activeSection === link.id)}
                    </span>
                    <span className="mobile-link-label">{link.name}</span>
                  </a>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
