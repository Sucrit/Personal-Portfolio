// import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaFileDownload } from 'react-icons/fa';
import FantasyBackground from './components/FantasyBackground';
import Navbar from './components/Navbar';
import ProjectCarousel from './components/ProjectCarousel';

const skills = [
  {
    name: 'MySQL',
    icon: '/mysql.svg',
    color: '#0051ff',
    description: 'Relational Database',
  },
  {    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#336791',
    description: 'Relational Database',
  },
  {    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: '#25ff29',
    description: 'NoSQL Database',
  },
  {
    name: 'Rust',
    icon: '/Rust.png',
    color: '#dea584',
    description: 'Twin of C++',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#b8ac54af',
    description: 'Web Scripting',
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
    description: 'All-rounder Language',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#36dc31',
    description: 'Server-side JavaScript',
  },
  {
    name: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    color: '#ffffff',
    description: 'Node.js Framework',
  },
  {
    name: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    color: '#3843debb',
    description: 'Old but Gold',
  },
    {
    name: 'FTK Imager',
    icon: '/ftk.png',
    color: '#0e5aac',
    description: 'Data Forensics',
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
    color: '#0091ff',
    description: 'Containerization',
  },
  {
    name: 'GitHub',
    icon: '/github-white-icon.svg',
    color: '#ffffffd9', 
    description: 'Version Control',
  },
  {
    name: 'Volatility',
    icon: '/volatility.png',
    color: '#d6d3d3',
    description: 'Memory Forensics',
  },
  {
    name: 'Ghidra',
    icon: '/ghidra.svg', 
    color: '#ff5500',
    description: 'Reverse Engineering',
  },
];

function App() {
  const devName = ("Hi, Oliver here");

  const findSkillIcon = (name: string) => {
    const skill = skills.find(s => s.name.toLowerCase() === name.toLowerCase());
    return skill?.icon ?? '';
  };

  const TechTag = ({ name }: { name: string }) => {
    const src = findSkillIcon(name);
    const invert = name.toLowerCase() === 'express' || name.toLowerCase() === 'flask';
    return (
      <span className="tech-tag">
        {src ? <img src={src} alt={name} className={invert ? 'invert-icon' : ''} /> : <span aria-hidden className="tech-tag-fallback">•</span>}
        {name}
      </span>
    );
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
                background: 'rgba(255, 222, 33, 0.1)',
                color: 'var(--accent-color)',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                border: '1px solid rgba(255, 222, 33, 0.2)',
                boxShadow: '0 0 15px var(--accent-glow)'
              }}
            >
              <FaMapMarkerAlt /> BASED IN PANGASINAN, PHILIPPINES
              <img src="/Flag_of_the_Philippines.svg" alt="Philippines" style={{ height: '1rem', width: '1.6rem', objectFit: 'cover' }} />
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
              I'm a 22-year-old undergrad IT student specializing in backend development with Node.js, and a strong passion in cybersecurity and secure system design.
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
                I’m a 3rd-year BSIT student specializing in Cybersecurity at the University of Pangasinan in Dagupan, focused on backend development using the MERN and PERN stacks. I build secure and scalable RESTful API's and database design, and also have experience with PHP (Laravel) and MySQL. I’m currently open to remote freelance projects.
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
                  <ProjectCarousel 
                    images={[
                      '/roomfinder/ss1.png',
                      '/roomfinder/ss2.png',
                      '/roomfinder/ss3.png',
                      { src: '/roomfinder/mobile1.png', type: 'mobile' },
                      { src: '/roomfinder/mobile2.png', type: 'mobile' }
                    ]} 
                    alt="RoomFinder Screenshot" 
                  />
              </div>
              <div className="project-content">
                <div className="project-title-inline">
                  <img src="/roomfinder/roomfinder_logo.png" alt="RoomFinder logo" className="project-logo" />
                  <h3>RoomFinder</h3>
                </div>
                <div className="project-role">Role: Backend Developer</div>
                <p>
                  A mobile and web platform for room booking and management system for
                  University of Pangasinan.
                </p>
                <div className="project-tech">
                  <TechTag name="JavaScript" />
                  <TechTag name="PHP" />
                  <TechTag name="MySQL" />
                </div>
                <div className="project-links">
                  <a href="https://github.com/Sucrit/RoomFinder_API" className="project-link-btn">
                    View Code &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image-container">
                  <ProjectCarousel 
                    images={[
                      '/evacudesk/adl.png', 
                      '/evacudesk/evacudesk.png', 
                      '/evacudesk/web1.png',
                      '/evacudesk/ss2.png',
                      '/evacudesk/ss3.png'
                    ]} 
                    alt="EvacuDesk Screenshot" 
                  />
              </div>
              <div className="project-content">
                <div className="project-title-inline">
                  <img src="/evacudesk/evacudesk_logo.png" alt="EvacuDesk logo" className="project-logo" />
                  <h3>EvacuDesk</h3>
                </div>
                <div className="project-role">Role: Backend Developer</div>
                <p>
                  An evacuation center management system designed for CDRRMO in Dagupan, Philippines.
                </p>
                <div className="project-tech">
                  <TechTag name="Node.js" />
                  <TechTag name="Express" />
                  <TechTag name="MongoDB" />
                </div>
                <div className="project-links">
                  <a href="https://github.com/endevium/EvacuDesk/tree/backend/UpdatedAPI2" className="project-link-btn">
                    View Code &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


          {/* Contact Section */}
          <section id="contact" style={{ background: 'var(--card-bg)', padding: '40px 0 20px 0', marginTop: '0', backdropFilter: 'blur(10px)' }}>
            <div className="container" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 14, fontSize: '1.1rem', fontWeight: 500 }}>
                Want to connect, collaborate, or just say hi? Reach out below!
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '1.6rem', marginBottom: 16 }}>
                <a href="mailto:smitholiver106@gmail.com" aria-label="Gmail" style={{ color: 'var(--text-primary)' }}><FaEnvelope /></a>
                <a href="https://github.com/Sucrit" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--text-primary)' }}><FaGithub /></a>
                <a href="https://ph.linkedin.com/in/oliver-ondoy-3206052a1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text-primary)' }}><FaLinkedin /></a>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                <FaMapMarkerAlt style={{ marginRight: 6 }} /> Pangasinan, Philippines
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

