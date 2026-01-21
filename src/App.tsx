// ...existing code...
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaFileDownload } from 'react-icons/fa';
import PhilippinesFlag from './components/PhilippinesFlag';
import FantasyBackground from './components/FantasyBackground';
import Navbar from './components/Navbar';

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
    description: 'JavaScript but Better',
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
    icon: '', // Will render custom white EX below
    color: '#ffffff',
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
    color: '#fff', // White shadow for GitHub
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
    name: 'Volatility',
    icon: '/volatility.png',
    color: '#4B4B4B',
    description: 'Memory Forensics',
  },
  {
    name: 'Ghidra',
    icon: '/ghidra.svg', 
    color: '#F7CE3E',
    description: 'Reverse Engineering',
  },
];

function App() {
  const devName = ("Hi, Oliver here");

  const projectImgWrapperStyle = {
    width: '100%',
    aspectRatio: '16/9',
    background: '#222',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
  };
  const projectImgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  return (
    <>
      <FantasyBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, width: '100%' }}>

      <section id="hero" style={{ paddingTop: '160px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 215, 0, 0.1)',
                color: 'var(--accent-color)',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                boxShadow: '0 0 15px var(--accent-glow)'
              }}
            >
              <FaMapMarkerAlt /> BASED IN PHILIPPINES
              <span style={{ width: 1, height: 16, background: 'var(--accent-color)', opacity: 0.3, margin: '0 0.5rem' }}></span>
              <PhilippinesFlag className="flag-wave" style={{ width: 24, height: 12, display: 'block' }} />
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
              {devName} <motion.div 
                style={{ display: 'inline-block', originX: 0.7, originY: 0.7 }}
                whileHover={{ rotate: 18, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src="/png1.png" alt="Wave" style={{ height: '0.8em' }} />
              </motion.div>
            </h1>
            
            <div className="tagline" style={{ 
              fontSize: '1.5rem', 
              color: '#f8fafc',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              marginBottom: '2rem',
              fontFamily: 'var(--font-mono)' 
            }}>
              <span style={{ color: 'var(--accent-color)', marginRight: '10px' }}>&gt;</span>
              Backend Dev | Cybersecurity
            </div>
            
            <p style={{ 
              fontSize: '1.1rem', 
              marginBottom: '.2rem', 
              maxWidth: '600px', 
              lineHeight: '1.8', 
              color: '#f1f5f9',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              background: 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(4px)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              I'm 22 yrs old, an undergrad IT student specialized in developing backend API's using Node.js environment, with a passion for cybersecurity.
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
              <div className="skill-item" key={skill.name}
                style={{ '--logo-glow': skill.color } as React.CSSProperties }
              >
                {skill.name === 'Express' ? (
                  <span
                    className="skill-logo-img"
                    style={{
                      fontWeight: 900,
                      fontSize: 36,
                      color: '#fff',
                      letterSpacing: 2,
                      fontFamily: 'JetBrains Mono, Fira Code, monospace',
                    }}
                  >
                    EX
                  </span>
                ) : (
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="skill-logo-img" 
                  />
                )}
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
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
              <div className="project-image-container">
                  <img
                    src="/roomfinder/ss1.png"
                    alt="RoomFinder Screenshot"
                  />
              </div>
              <div className="project-content">
                <h3>RoomFinder</h3>
                <div className="project-tech">JavaScript, PHP, MySQL</div>
                <p>
                  A cross-platform room booking and management system for
                  University of Pangasinan (UPang).
                </p>
                <div className="project-links">
                  <a href="https://github.com/Sucrit/RoomFinder_API" className="project-link-btn">
                    View Code &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image-container">
                  <img
                    src="/evacudesk/adl.png"
                    alt="EvacuDesk Screenshot"
                  />
              </div>
              <div className="project-content">
                <h3>EvacuDesk</h3>
                <div className="project-tech">Node.js, Express, MongoDB</div>
                <p>
                  An evacuation center management system designed for CDRRMO in Dagupan, Philippines.
                </p>
                <div className="project-links">
                  <a href="https://github.com/endevium/EvacuDesk/tree/backend/UpdatedAPI2" className="project-link-btn">
                    View Code &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image-container">
                  <img
                    src="/nethunter/nethunter.png"
                    alt="NetHunter Screenshot"
                  />
              </div>
              <div className="project-content">
                <h3>NetHunter (In Development)</h3>
                <div className="project-tech">Python, Flask, MongoDB</div>
                <p>
                  An OSINT platform that generates masked links to gather deep
                  intelligence on targets.
                </p>
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
        </div>
      </section>


          {/* Contact Section */}
          <section id="contact" style={{ background: 'var(--card-bg)', padding: '60px 0 40px 0', marginTop: '0', backdropFilter: 'blur(10px)' }}>
            <div className="container" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <h2>Contact</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
                Want to connect, collaborate, or just say hi? Reach out below!
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', fontSize: '2rem', marginBottom: 24 }}>
                <a href="mailto:oliver.smith@email.com" aria-label="Email" style={{ color: 'var(--accent-color)' }}><FaEnvelope /></a>
                <a href="https://github.com/endevium" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--accent-color)' }}><FaGithub /></a>
                <a href="https://linkedin.com/in/endevium" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--accent-color)' }}><FaLinkedin /></a>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                <FaMapMarkerAlt style={{ marginRight: 6 }} /> Philippines
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center', padding: '18px 0', fontSize: '1rem', letterSpacing: 1, marginTop: 0 }}>
            <div className="container">
              &copy; {new Date().getFullYear()} Oliver. All rights reserved.
            </div>
          </footer>
      </main>
    </>
  )
}

export default App

