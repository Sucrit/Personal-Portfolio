function App() {
  return (
    <>
      <nav>
        <div className="container nav-content">
          <div className="logo">
            Oliver<span>.sec</span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <section id="hero">
        <div className="container hero-content">
          <h1>Hello, I&apos;m Oliver</h1>
          <div className="tagline">Backend Developer | Cybersecurity</div>
          <p>I build secure backend systems and practice cybersecurity.</p>
          <a href="#projects" className="btn">
            View My Work
          </a>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-grid">
            <div>
              <p>
                My expertise lies in developing RESTful APIs using Node.js
                (Express) and PHP (Laravel). I practice cybersecurity to ensure
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
            <div className="skill-card">
              <h3>Languages</h3>
              <ul className="skill-list">
                <li>Python</li>
                <li>Node.js (Express)</li>
                <li>PHP (Laravel)</li>
                <li>Rust</li>
              </ul>
            </div>

            <div className="skill-card">
              <h3>Frameworks</h3>
              <ul className="skill-list">
                <li>Express.js</li>
                <li>Laravel</li>
              </ul>
            </div>

            <div className="skill-card">
              <h3>Databases</h3>
              <ul className="skill-list">
                <li>MongoDB</li>
                <li>MySQL</li>
                <li>Redis (Learning)</li>
                <li>PostgreSQL (Learning)</li>
              </ul>
            </div>

            <div className="skill-card">
              <h3>Cybersecurity</h3>
              <ul className="skill-list">
                <li>Web Security</li>
                <li>API Security</li>
                <li>Computer Forensics Fundamentals</li>
              </ul>
            </div>

            <div className="skill-card">
              <h3>DevOps</h3>
              <ul className="skill-list">
                <li>GitHub</li>
                <li>Docker</li>
                <li>Cloud Platform Fundamentals (Azure)</li>
              </ul>
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
                An offline geolocation tool that estimates the position of a
                target device using RSSI values from known Access Point
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

      <section id="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <p>I&apos;m currently open to new opportunities and collaborations.</p>

          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="contact-icon"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
                <span className="contact-label">Email</span>
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&to=smitholiver106@gmail.com"
                className="contact-value"
              >
                smitholiver@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="contact-icon"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="contact-label">GitHub</span>
              </div>
              <a href="https://github.com/Sucrit" className="contact-value">
                github.com/Sucrit
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="contact-icon"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="contact-label">LinkedIn</span>
              </div>
              <a
                href="https://ph.linkedin.com/in/oliver-ondoy-3206052a1"
                className="contact-value"
              >
                linkedin.com/oliver
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
