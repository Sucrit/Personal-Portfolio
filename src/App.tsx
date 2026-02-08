import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useVelocity, useMotionValue, useMotionValueEvent, animate, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaFileDownload } from 'react-icons/fa';
import FantasyBackground from './components/FantasyBackground';
import Navbar from './components/Navbar';
import LocationBadge from './components/LocationBadge';
import ProjectCarousel from './components/ProjectCarousel';
import LoadingScreen from './components/LoadingScreen';

const skills = [
  {
    name: 'MySQL',
    icon: '/mysql.svg',
    color: '#0051ff',
    description: 'Relational Database',
  },
  { name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#336791',
    description: 'SQL Powerhouse',
  },
  {    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: '#25ff29bb',
    description: 'NoSQL Goat',
  },
  {
    name: 'Rust',
    icon: '/Rust.png',
    color: '#dea584',
    description: 'C++ Bff',
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
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#37dc31b5',
    description: 'Server magician',
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
  //   {
  //   name: 'FTK Imager',
  //   icon: '/ftk.png',
  //   color: '#0e5aac',
  //   description: 'Data Forensics',
  // },
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
  // {
  //   name: 'Ghidra',
  //   icon: '/ghidra.svg', 
  //   color: '#ff5500',
  //   description: 'Reverse Engineering',
  // },
  {
    name: 'GitHub',
    icon: '/github-white-icon.svg',
    color: '#ffffffa3', 
    description: 'Version Control',
  },
  {
    name: 'Linux',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    color: '#968b0d',
    description: 'Operating System',
  },
  // {
  //   name: 'Volatility',
  //   icon: '/volatility.png',
  //   color: '#d6d3d3',
  //   description: 'Memory Forensics',
  // },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB',
    description: 'All-rounder Language',
  },
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setIsLoaded(true), []);

  const timelineRef = useRef<HTMLDivElement>(null);
  const highSchoolRef = useRef<HTMLDivElement>(null);
  const collegeRef = useRef<HTMLDivElement>(null);
  const hsConnectorRef = useRef<HTMLDivElement>(null);
  const collegeConnectorRef = useRef<HTMLDivElement>(null);
  
  // Store snap points as refs so they update without re-render issues
  const snapPointsRef = useRef({ hs: 23, college: 87 });
  
  // Motion values we control manually for true responsiveness
  const lightTopValue = useMotionValue("0%");
  const hsGlowValue = useMotionValue("0px 0px 0px rgba(255,255,255,0)");
  const hsBorderValue = useMotionValue("rgba(255,255,255,0.05)");
  const collegeGlowValue = useMotionValue("0px 0px 0px rgba(255,255,255,0)");
  const collegeBorderValue = useMotionValue("rgba(255,255,255,0.05)");

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // Recalculate snap points on resize/layout changes
  useEffect(() => {
    const calculateSnapPoints = () => {
      if (timelineRef.current && hsConnectorRef.current && collegeConnectorRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const hsRect = hsConnectorRef.current.getBoundingClientRect();
        const collegeRect = collegeConnectorRef.current.getBoundingClientRect();

        const hsTop = hsRect.top + hsRect.height / 2 - timelineRect.top;
        const collegeTop = collegeRect.top + collegeRect.height / 2 - timelineRect.top;

        const hsPercent = Math.max(5, Math.min(95, (hsTop / timelineRect.height) * 100));
        const collegePercent = Math.max(5, Math.min(95, (collegeTop / timelineRect.height) * 100));

        snapPointsRef.current = { hs: hsPercent, college: collegePercent };
      }
    };

    calculateSnapPoints();

    const resizeObserver = new ResizeObserver(() => {
      calculateSnapPoints();
    });

    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }
    
    window.addEventListener('resize', calculateSnapPoints);
    // Also recalculate after fonts/images load
    window.addEventListener('load', calculateSnapPoints);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSnapPoints);
      window.removeEventListener('load', calculateSnapPoints);
    };
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  // Interpolation helper
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Update motion values reactively based on scroll + current snap points
  useMotionValueEvent(smoothProgress, "change", (progress) => {
    const { hs, college } = snapPointsRef.current;
    const hsP = hs / 100;
    const colP = college / 100;
    
    // Calculate light position with magnetic snapping
    let lightPercent: number;
    const snapRange = 0.15; 
    
    if (progress < hsP - snapRange) {
      // Before hs snap zone - interpolate from 0 to hs
      const t = progress / (hsP - snapRange);
      lightPercent = lerp(0, hs, t);
    } else if (progress < hsP + snapRange) {
      // In hs snap zone - lock to hs
      lightPercent = hs;
    } else if (progress < colP - snapRange) {
      // Between hs and college - interpolate
      const t = (progress - (hsP + snapRange)) / ((colP - snapRange) - (hsP + snapRange));
      lightPercent = lerp(hs, college, t);
    } else if (progress < colP + snapRange) {
      // In college snap zone - lock to college
      lightPercent = college;
    } else {
      // After college snap zone - interpolate to 100
      const t = (progress - (colP + snapRange)) / (1 - (colP + snapRange));
      lightPercent = lerp(college, 100, t);
    }
    
    lightTopValue.set(`${lightPercent}%`);
    
    // HS glow effect
    const hsDistance = Math.abs(progress - hsP);
    const hsGlowRange = 0.15;
    if (hsDistance < hsGlowRange) {
      const intensity = hsDistance < snapRange ? 1 : 1 - ((hsDistance - snapRange) / (hsGlowRange - snapRange));
      const glowSize = Math.round(30 * intensity);
      const glowAlpha = (0.4 * intensity).toFixed(2);
      hsGlowValue.set(`0px 0px ${glowSize}px rgba(255,255,255, ${glowAlpha})`);
      hsBorderValue.set(intensity > 0.5 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)");
    } else {
      hsGlowValue.set("0px 0px 0px rgba(255, 222, 33, 0)");
      hsBorderValue.set("rgba(255,255,255,0.05)");
    }
    
    // College glow effect
    const collegeDistance = Math.abs(progress - colP);
    const collegeGlowRange = 0.15;
    if (collegeDistance < collegeGlowRange) {
      const intensity = collegeDistance < snapRange ? 1 : 1 - ((collegeDistance - snapRange) / (collegeGlowRange - snapRange));
      const glowSize = Math.round(30 * intensity);
      const glowAlpha = (0.4 * intensity).toFixed(2);
      collegeGlowValue.set(`0px 0px ${glowSize}px rgba(255,255,255, ${glowAlpha})`);
      collegeBorderValue.set(intensity > 0.5 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)");
    } else {
      collegeGlowValue.set("0px 0px 0px rgba(255, 222, 33, 0)");
      collegeBorderValue.set("rgba(255,255,255,0.05)");
    }
  });
  
  const scrollVelocity = useVelocity(smoothProgress);
  const scaleY = useMotionValue(1);

  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    if (latest > 0 && scaleY.get() !== 1) {
      animate(scaleY, 1, { duration: 0.15 });
    } else if (latest < 0 && scaleY.get() !== -1) {
      animate(scaleY, -1, { duration: 0.15 });
    }
  });
  
  // Keep light visible throughout the active scrolling phase in the center
  const lightOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  
  // Trail opacity based on velocity - only visible when moving
  const rawTrailOpacity = useTransform(scrollVelocity, [-0.05, -0.01, 0.01, 0.05], [0.8, 0, 0, 0.8]);
  const trailOpacity = useSpring(rawTrailOpacity, { stiffness: 60, damping: 15 });

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
      <main style={{ position: 'relative', zIndex: 1, width: '100%', visibility: isLoaded ? 'visible' : 'hidden' }}>
        <section id="hero" style={{ paddingTop: '160px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="container hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <LocationBadge />
            
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
              I'm a 3rd-year BSIT student specialized in <strong style={{color: 'var(--accent-color)'}}>cybersecurity</strong> and <strong style={{color: 'var(--accent-color)'}}>backend</strong> development using <strong style={{color: 'var(--accent-color)'}}>MERN</strong> stack and also have experience with <strong style={{color: 'var(--accent-color)'}}>PHP</strong> and <strong style={{color: 'var(--accent-color)'}}>MySQL</strong>.
            </p>

            <div className="contact-actions">
              <a href="https://mail.google.com/mail/?view=cm&to=smitholiver106@gmail.com" className="contact-btn" title="Compose Email" aria-label="Compose Email" target="_blank" rel="noopener noreferrer">
                <FaEnvelope />
              </a>
              <a href="https://github.com/Sucrit" className="contact-btn" title="GitHub" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://ph.linkedin.com/in/oliver-ondoy-3206052a1" className="contact-btn" title="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="/Oliver_Ondoy_Resume.pdf" className="resume-btn" title="Download Resume" download aria-label="Download Resume" target="_blank" rel="noopener noreferrer">
                <FaFileDownload />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" style={{ position: 'relative', overflow: 'hidden', padding: '100px 0' }}>
        {/* Decorative background element for this section */}
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        
        <div className="container">
          <div
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '0 0 20px rgba(255, 222, 33, 0.2)' }}>About Me</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '2.5rem',
            alignItems: 'start'
          }}>
            
            {/* Right Column: Lore & Questline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              
              {/* Lore Section */}
              <div>
                <div style={{ 
                  background: 'rgba(0,0,0,0.2)', 
                  padding: '1rem', 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(4px)',
                  boxShadow: 'none'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#e2e8f0', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    <div>
                      <strong style={{ color: 'var(--accent-color)', fontSize: '1.1rem', display: 'block', marginBottom: '0.4rem' }}>Who am I:</strong>
                      <span>A <strong style = {{color: '#fff'}}>22</strong> years old <strong style = {{color: '#fff'}}>3rd year student</strong> at the <strong style = {{color: '#fff'}}>University of Pangasinan</strong> who likes messing around with technology.</span>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--accent-color)', fontSize: '1.1rem', display: 'block', marginBottom: '0.4rem' }}>What I do:</strong>
                      <span>Build secure, scalable backend systems with <strong style = {{color: '#fff'}}>MERN</strong>, <strong style = {{color: '#fff'}}>Laravel</strong>, <strong style = {{color: '#fff'}}>MySQL</strong>, <strong style = {{color: '#fff'}}>RESTful APIs</strong>. I also perform <strong style = {{color: '#fff'}}>Data Recovery</strong> and <strong style = {{color: '#fff'}}>Computer Forensics</strong> as well as run my homelab for <strong style = {{color: '#fff'}}>threat analysis</strong> and <strong style = {{color: '#fff'}}>detection</strong>.</span>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--accent-color)', fontSize: '1.1rem', display: 'block', marginBottom: '0.4rem' }}>What I'm currently learning:</strong>
                      <span>CI/CD Pipelines, Postgres, and Redis.</span>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--accent-color)', fontSize: '1.1rem', display: 'block', marginBottom: '0.4rem' }}>My goal:</strong>
                      <span>Climb my way up as a <strong style={{color: '#fff'}}>Cybersecurity expert</strong> and <strong style={{color: '#fff'}}>Backend Engineer</strong> as well as work with law enforcements and security agencies in combating cyber threats.</span>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--accent-color)', fontSize: '1.1rem', display: 'block', marginBottom: '0.4rem' }}>My hobbies:</strong>
                      <span>Listening to music, watching crime documentaries, interrogations, mysteries and gaming.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Background */}
              <div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                   <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>Educational Background</h3>
                </div>

                {/* Timeline Container */}
                <div 
                  ref={timelineRef}
                  className="timeline-scroll-container"
                  style={{ 
                    position: 'relative', 
                    minHeight: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4rem'
                  }}
                >
                  
                  {/* Central Vertical Progress Bar */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: 'rgba(255, 255, 255, 0.27)',
                    transform: 'translateX(-50%)',
                    borderRadius: '4px',
                    boxShadow: 'none'
                  }} />
  
                  {/* Moving Yellow Light */}
                  <motion.div 
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: lightTopValue,
                      x: '-50%',
                      y: '-50%',
                      width: '16px',
                      height: '16px',
                      background: 'radial-gradient(circle, #fff 0%, var(--accent-color) 50%, transparent 100%)',
                      borderRadius: '50%',
                      boxShadow: '0 0 12px 4px var(--accent-color), 0 0 30px 10px rgba(255, 222, 33, 0.5), 0 0 60px 20px rgba(255, 222, 33, 0.2)',
                      zIndex: 10,
                      opacity: lightOpacity
                    }} 
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                  />
                  
                  {/* Light Trail Effect */}
                  <motion.div 
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: lightTopValue,
                      x: '-50%',
                      y: '-100%',
                      width: '6px',
                      height: '40px',
                      background: 'linear-gradient(to top, var(--accent-color) 0%, transparent 100%)',
                      borderRadius: '4px',
                      zIndex: 9,
                      opacity: trailOpacity,
                      scaleY,
                      originY: 1
                    }} 
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                  />

                  {/* High School - Top Left */}
                  <div 
                    ref={highSchoolRef}
                    className="timeline-snap-item"
                    style={{ 
                      display: 'flex', 
                      width: '100%', 
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* High School Card */}
                    <motion.div 
                      style={{ 
                        width: 'calc(50% - 40px)',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: hsBorderValue,
                        backdropFilter: 'blur(4px)',
                        boxShadow: hsGlowValue
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src="/BIS_Logo.png" alt="High School logo" style={{ width: 28, height: 28, objectFit: 'cover', borderRadius: 6 }} />
                          <h4 style={{ fontSize: '1.25rem', color: '#e2e8f0', margin: 0, fontWeight: '600' }}>Bugallon Integrated School</h4>
                        </div>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          padding: '4px 12px', 
                          background: 'rgba(71, 85, 105, 0.5)',
                          color: '#94a3b8', 
                          borderRadius: '12px', 
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>Completed</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>Junior & Senior High School</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>2016 - 2022</p>
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.48)' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}><span style={{ color: 'var(--accent-color)', fontSize: '1rem' }}>◆</span> Honor Student, 2016-2022</p>
                      </div>
                    </motion.div>

                    {/* Horizontal Connector Line - Right (White) */}
                    <div style={{
                      width: '40px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 100%)',
                      position: 'relative',
                      boxShadow: '0 0 8px rgba(255,255,255,0.12)',
                      opacity: 1
                    }}>
                      {/* Node Point */}
                      <div ref={hsConnectorRef} style={{
                        position: 'absolute',
                        right: '-6px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '12px',
                        background: '#0f172a',
                        border: '2px solid rgba(255,255,255,0.95)',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px rgba(255,255,255,0.15), inset 0 0 4px rgba(255,255,255,0.08)'
                      }} />
                    </div>

                    {/* Spacer for right side */}
                    <div style={{ width: 'calc(50% - 40px)' }} />
                  </div>

                  {/* College - Bottom Right */}
                  <div 
                    ref={collegeRef}
                    className="timeline-snap-item"
                    style={{ 
                      display: 'flex', 
                      width: '100%', 
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Spacer for left side */}
                    <div style={{ width: 'calc(50% - 40px)' }} />

                    {/* Horizontal Connector Line - Left (White) */}
                    <div style={{
                      width: '40px',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, transparent 100%)',
                      position: 'relative',
                      boxShadow: '0 0 8px rgba(255,255,255,0.12)',
                      opacity: 1
                    }}>
                      {/* Node Point */}
                      <div ref={collegeConnectorRef} style={{
                        position: 'absolute',
                        left: '-6px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '12px',
                        background: '#0f172a', 
                        border: '2px solid rgba(255,255,255,0.95)',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px rgba(255,255,255,0.15), inset 0 0 4px rgba(255,255,255,0.08)'
                      }} />
                    </div>

                    {/* College Card */}
                    <motion.div 
                      style={{ 
                        width: 'calc(50% - 40px)',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: collegeBorderValue,
                        backdropFilter: 'blur(4px)',
                        boxShadow: collegeGlowValue
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src="/UPANG_Logo.png" alt="University logo" style={{ width: 28, height: 28, objectFit: 'cover', borderRadius: 6 }} />
                          <h4 style={{ fontSize: '1.25rem', color: '#e2e8f0', margin: 0, fontWeight: '700' }}>University of Pangasinan</h4>
                        </div>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          padding: '5px 14px', 
                          background: 'var(--accent-color)', 
                          color: '#0f172a', 
                          borderRadius: '12px', 
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          boxShadow: '0 0 15px rgba(255, 222, 33, 0.4)'
                        }}>Current</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>Bachelor of Science in Information Technology</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>2024 - 2027 </p>
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.48)' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                          <span style={{ color: 'var(--accent-color)', fontSize: '1rem' }}>◆</span> Backend Development
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                          <span style={{ color: 'var(--accent-color)', fontSize: '1rem' }}>◆</span> Computer Forensics & Data Recovery
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                          <span style={{ color: 'var(--accent-color)', fontSize: '1rem' }}>◆</span> Ethical Hacking
                        </p>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </div>

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
                      fontFamily: 'monospace',
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
                      { src: '/roomfinder/mobile1.png', type: 'mobile' },
                      { src: '/roomfinder/mobile2.png', type: 'mobile' },
                      '/roomfinder/ss1.png',
                      '/roomfinder/ss2.png',
                      '/roomfinder/ss3.png',
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
                  <a href="https://github.com/Sucrit/RoomFinder_API" className="project-link-btn" target="_blank" rel="noopener noreferrer">
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
                  <a href="https://github.com/endevium/EvacuDesk/tree/backend/UpdatedAPI2" className="project-link-btn" target="_blank" rel="noopener noreferrer">
                    View Code &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Contact Section */}
          <section id="contact" style={{ background: 'var(--card-bg)', padding: '25px 0', marginTop: '0', backdropFilter: 'blur(10px)' }}>
            <div className="container" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>
                I’m currently open to remote freelance projects. Reach out below!😄 
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '1.5rem' }}>
                <a href="https://mail.google.com/mail/?view=cm&to=smitholiver106@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Compose Email" style={{ color: 'var(--text-primary)', transition: 'transform 0.2s' }}><FaEnvelope /></a>
                <a href="https://github.com/Sucrit" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--text-primary)' }}><FaGithub /></a>
                <a href="https://ph.linkedin.com/in/oliver-ondoy-3206052a1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text-primary)' }}><FaLinkedin /></a>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', opacity: 0.8 }}>
                <FaMapMarkerAlt style={{ marginRight: 6 }} /> Pangasinan, Philippines
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', textAlign: 'center', padding: '10px 0', fontSize: '1rem', letterSpacing: 1, marginTop: 0 }}>
            <div className="container">
              &copy; {new Date().getFullYear()} Oliver. All rights reserved.
            </div>
          </footer>
      </main>
      {!isLoaded && <LoadingScreen onLoadComplete={handleLoadComplete} />}
    </>
  )
}

export default App

