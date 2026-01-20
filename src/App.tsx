import HexBackground from './components/HexBackground';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaFileDownload } from 'react-icons/fa';
import PhilippinesFlag from './components/PhilippinesFlag';

const skills = [
  {
    name: 'Rust',
    icon: '/Rust.png',
    color: '#DEA584',
    description: 'Twin of C++',
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6',
    description: 'Superset of JavaScript',
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB',
    description: 'General Purpose',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#3C873A',
    description: 'Server-side JavaScript',
  },
  {
    name: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    color: '#000000',
    description: 'Node.js Framework',
  },
  {
    name: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    color: '#777BB4',
    description: 'Old but Gold',
  },
  {
    name: 'Laravel',
    icon: '/Laravel.svg',
    color: '#FF2D20',
    description: 'PHP Framework',
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#2496ED',
    description: 'Containerization',
  },
  {
    name: 'GitHub',
    icon: '/github-white-icon.svg',
    color: '#181717',
    description: 'Version Control',
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: '#47A248',
    description: 'NoSQL Database',
  },
  {
    name: 'MySQL',
    icon: '/mysql.svg',
    color: '#4479A1',
    description: 'Relational Database',
  },
  {
    name: 'FTK Imager',
    icon: '/ftk.png',
    color: '#2E4053',
    description: 'Data Forensics',
  },
  {
    name: 'Volatility3',
    icon: '/volatility.png',
    color: '#4B4B4B',
    description: 'Memory Forensics',
  },
];
import { useHackerEffect } from './hooks/useHackerEffect';

function App() {
  const [showMap, setShowMap] = useState(false);
  const hackerName = useHackerEffect("Hi, Oliver here");

  return (
    <>
      <HexBackground />
      <nav className="glass-panel" style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '90%', 
        maxWidth: '1200px', 
        borderRadius: '50px', 
        zIndex: 100,
        padding: '1rem 2rem' 
      }}>
        <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
          <div className="logo" style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
            whoam<span style={{ color: 'var(--accent-color)' }}>i_</span>
          </div>
          <div className="nav-links" style={{ gap: '2rem', display: 'flex' }}>
            <a href="#about" style={{ fontWeight: '500' }}>About</a>
            <a href="#skills" style={{ fontWeight: '500' }}>Skills</a>
            <a href="#threatmap" style={{ fontWeight: '500' }}>Threat Map</a>
            <a href="#projects" style={{ fontWeight: '500' }}>Projects</a>
            <a href="#contact" style={{ fontWeight: '500' }}>Contact</a>
          </div>
        </div>
      </nav>

      <section id="hero" style={{ paddingTop: '160px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container hero-content" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--accent-color)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                justifyContent: 'space-between',
                minWidth: '220px',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaMapMarkerAlt /> BASED IN PHILIPPINES
              </span>
              <span style={{ marginLeft: '0rem', display: 'flex', alignItems: 'center' }}>
                <PhilippinesFlag className="flag-wave" style={{ width: 32, height: 16, display: 'block' }} />
              </span>
            </div>
            
            <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
              {hackerName} <motion.div 
                style={{ display: 'inline-block', originX: 0.7, originY: 0.7 }}
                whileHover={{ rotate: 18, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src="/png1.png" alt="Wave" style={{ height: '0.8em', marginLeft: '0px' }} />
              </motion.div>
            </h1>
            
            <div className="tagline" style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)', 
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)' 
            }}>
              <span style={{ color: 'var(--success-color)', marginRight: '10px' }}>&gt;</span>
              Backend Dev | Cybersecurity
            </div>
            
            <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: '1.8', color: '#cbd5e1' }}>
              I specialized in backend development using Express and TypeScript.
            </p>

            <div className="contact-actions">
              <a href="mailto:smitholiver106@gmail.com" className="contact-btn" title="Email" aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="https://github.com/Sucrit" className="contact-btn" title="GitHub" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://ph.linkedin.com/in/oliver-ondoy-3206052a1" className="contact-btn" title="LinkedIn" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="/resume.pdf" className="resume-btn" title="Download Resume" download aria-label="Download Resume">
                <FaFileDownload />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>

          {/* Right Side: 3D Globe Placeholder */}
          <div style={{ height: '400px' }}>
            {/* The 3D Scene background is visible here */}
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-grid">
            <div>
              <p>
                I'm an undergrad student studying Information Technology at University of Pangasinan. I have a passion for backend development and cybersecurity, constantly seeking to enhance my skills in building secure and efficient systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-item" key={skill.name} tabIndex={0} style={{ 
                  cursor: 'pointer', 
                  transition: 'transform 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                onFocus={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onBlur={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="skill-logo-img" 
                  style={{ 
                    width: 40, 
                    height: 40, 
                    objectFit: 'contain', 
                    filter: skill.name === 'Express' ? 'brightness(0) invert(1)' : undefined, 
                    transform: skill.name === 'MySQL' ? 'scale(1.3)' : undefined, 
                  }} 
                />
                <div className="skill-info">
                  <h3 className="skill-name" style={{ margin: 0, fontSize: '0.95rem' }}>{skill.name}</h3>
                  <p className="skill-description" style={{ margin: 0, fontSize: '0.75rem', lineHeight: '1.2' }}>{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>RoomFinder</h3>
              <div className="project-tech">JavaScript, PHP, MySQL</div>
              <p>
                A cross-platform room booking and management system for
                university.
              </p>
              <div className="project-security">
                <strong>Security Architecture:</strong>
                <ul>
                  <li>
                    <strong>Auth &amp; Identity:</strong> Stateless JWTs with
                    Role-Based Access Control (RBAC).
                  </li>
                  <li>
                    <strong>Data Protection:</strong> Password Hashing &amp;
                    Input Sanitization.
                  </li>
                  <li>
                    <strong>Database Security:</strong> Full usage of Prepared
                    Statements to prevent SQL Injection.
                  </li>
                </ul>
              </div>
              <div className="project-links">
                <a href="https://github.com/Sucrit/RoomFinder_API">
                  View Code &rarr;
                </a>
              </div>
            </div>

            <div className="project-card">
              <h3>EvacuDesk</h3>
              <div className="project-tech">Node.js, Express, MongoDB</div>
              <p>
                An evacuation center management system designed for CDRRMO in Dagupan, Philippines.
              </p>
              <div className="project-security">
                <strong>Security Architecture:</strong>
                <ul>
                  <li>
                    <strong>Active Defense:</strong> Arcjet Shield, Bot
                    Detection, Canary Honeypots &amp; IP Blocking.
                  </li>
                  <li>
                    <strong>Identity:</strong> Stateful JWTs, RBAC, and Pwned
                    Password checks.
                  </li>
                  <li>
                    <strong>Hardening:</strong> CSRF Double-Submit Cookies,
                    Helmet Headers, and NoSQL Sanitization.
                  </li>
                </ul>
              </div>
              <div className="project-links">
                <a href="https://github.com/endevium/EvacuDesk/tree/backend/UpdatedAPI2">
                  View Code &rarr;
                </a>
              </div>
            </div>

            {/* <div className="project-card">
              <h3>Wi-Fi Trilaterator POC</h3>
              <div className="project-tech">Python</div>
              <p>
                A simple offline geolocation tool that estimates the position of a
                target device using RSSI values from a given Access Point
                coordinates.
              </p>
              <div className="project-security">
                <strong>Technical Architecture:</strong>
                <ul>
                  <li>
                    <strong>Algorithm:</strong> Custom implementation of
                    Non-linear Least Squares optimization.
                  </li>
                  <li>
                    <strong>Signal Processing:</strong> Uses the Log-Distance
                    Path Loss model to convert RSSI into estimated distance.
                  </li>
                </ul>
              </div>
              <div className="project-links">
                <a href="https://github.com/Sucrit/Trilaterator_conceptual">
                  View Code &rarr;
                </a>
              </div>
            </div> */}

            <div className="project-card">
              <h3>NetHunter (In Development)</h3>
              <div className="project-tech">Python, Flask, MongoDB</div>
              <p>
                An OSINT platform that generates masked links to gather deep
                intelligence on targets.
              </p>
              <div className="project-security">
                <strong>Technical Architecture:</strong>
                <ul>
                  <li>
                    <strong>Fingerprinting:</strong> Captures User-Agent, Device
                    Type, and Browser capabilities; integrates with IP-API for
                    geolocation and ISP/ASN attribution.
                  </li>
                  <li>
                    <strong>Data Correlation:</strong> MongoDB aggregation
                    pipelines to visualize visitor trends and identify unique
                    entities across sessions.
                  </li>
                  <li>
                    <strong>Security:</strong> Protected by Flask-Limiter for
                    rate limiting and HTTP Basic Auth for dashboard access.
                  </li>
                </ul>
              </div>
              <div className="project-links">
                <span
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                  }}
                >
                  Private Repository
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="threatmap">
        <div className="container">
          <h2>Live Threat Map</h2>
          <p>
            Real-time visualization of global cyber attacks. This map demonstrates the scale and frequency of cyber threats across the globe.
          </p>
          <div className="threat-map-container">
            {showMap ? (
              <>
                <button
                  className="btn map-toggle-btn"
                  onClick={() => setShowMap(false)}
                >
                  Close
                </button>
                <iframe
                  title="Radware Live Threat Map"
                  src="https://livethreatmap.radware.com/"
                  className="threat-map-iframe"
                  allowFullScreen
                ></iframe>
              </>
            ) : (
              <div className="map-placeholder">
                <div className="placeholder-content">
                  <h3>Interactive Threat Map</h3>
                  <p>
                    Initialize the live map to view real-time global cyber attacks.
                    Warning: This visualization is resource-intensive.
                  </p>
                  <button className="btn" onClick={() => setShowMap(true)}>
                    Initialize Live Map
                  </button>
                </div>
              </div>
            )}
          </div>
          <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
            Source: <a href="https://livethreatmap.radware.com/" target="_blank" rel="noopener noreferrer">Radware Live Threat Map</a>
          </p>
        </div>
      </section>
    </>
  )
}

export default App

