import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Scene3D from './components/Scene3D';
import { useHackerEffect } from './hooks/useHackerEffect';

function App() {
  const [showMap, setShowMap] = useState(false);
  const hackerName = useHackerEffect("Hi, Oliver here");

  return (
    <>
      <Scene3D />
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
            Oliver<span style={{ color: 'var(--accent-color)' }}>.sec</span>
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
            <div style={{ 
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
              border: '1px solid rgba(6, 182, 212, 0.2)'
            }}>
              <FaMapMarkerAlt /> BASED IN PHILIPPINES
            </div>
            
            <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
              {hackerName} <motion.div 
                style={{ display: 'inline-block', originX: 0.7, originY: 0.7 }}
                whileHover={{ rotate: 18, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src="/svg1.svg" alt="Wave" style={{ height: '0.8em', marginLeft: '0px' }} />
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
              Building resilient systems that stand up to modern threats. 
              Specialized in secure API development and digital forensics.
            </p>

            <div className="contact-info" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a href="mailto:smitholiver106@gmail.com" className="contact-item" title="Email" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                <FaEnvelope />
              </a>
              <a href="https://github.com/Sucrit" className="contact-item" title="GitHub" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                <FaGithub />
              </a>
              <a href="https://ph.linkedin.com/in/oliver-ondoy-3206052a1" className="contact-item" title="LinkedIn" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                <FaLinkedin />
              </a>
              <a href="#projects" className="btn" style={{ 
                marginLeft: '1rem', 
                padding: '0.8rem 2rem', 
                borderRadius: '8px', 
                background: 'linear-gradient(45deg, var(--accent-color), #3b82f6)',
                border: 'none',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px var(--accent-glow)'
              }}>
                View Missions
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
                I specialized in developing RESTful APIs using Node.js
                (Express) and PHP (Laravel). I practice cybersecurity by implementing best practices to ensure
                that the systems I build are resilient against threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">Python</h3>
                <p className="skill-description">Programming Language</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">Node.js</h3>
                <p className="skill-description">Runtime Environment</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">PHP</h3>
                <p className="skill-description">Scripting Language</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" alt="Rust" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">Rust</h3>
                <p className="skill-description">Systems Programming</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">Express.js</h3>
                <p className="skill-description">Web Framework</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" alt="Laravel" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">Laravel</h3>
                <p className="skill-description">PHP Framework</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">Docker</h3>
                <p className="skill-description">Containerization</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">GitHub</h3>
                <p className="skill-description">Version Control</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">MongoDB</h3>
                <p className="skill-description">NoSQL Database</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">MySQL</h3>
                <p className="skill-description">Relational Database</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Web Security" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">Web Security</h3>
                <p className="skill-description">Cybersecurity</p>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-icon-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Forensic_Science_Logo.svg" alt="Computer Forensics" />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">Forensics</h3>
                <p className="skill-description">Digital Investigation</p>
              </div>
            </div>
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
                university campuses with real-time room scheduling and conflict
                detection. Includes both web and mobile API endpoints.
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
                An evacuation center management system designed for CDRRMO.
                Provides real-time coordination and resource allocation during
                critical situations.
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

            <div className="project-card">
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
                  <li>
                    <strong>Visualization:</strong> Simple tkinter GUI for input
                    mapping and Google Maps linking for result visualization.
                  </li>
                </ul>
              </div>
              <div className="project-links">
                <a href="https://github.com/Sucrit/Trilaterator_conceptual">
                  View Code &rarr;
                </a>
              </div>
            </div>

            <div className="project-card">
              <h3>NetHunter (In Development)</h3>
              <div className="project-tech">Python, Flask, MongoDB</div>
              <p>
                An OSINT platform that generates masked links to gather deep
                intelligence on targets. Correlates network data (ASN, ISP) with
                device fingerprints to build detailed digital fingerprints.
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
                  title="FortiGuard Threat Map"
                  src="https://fortiguard.fortinet.com/threat-map"
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
            Source: <a href="https://fortiguard.fortinet.com/threat-map" target="_blank" rel="noopener noreferrer">FortiGuard Threat Map</a>
          </p>
        </div>
      </section>
    </>
  )
}

export default App

