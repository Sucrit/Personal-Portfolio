import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { FaEnvelope, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import LocationBadge from '../components/LocationBadge';
import { contactLinks } from '../data/portfolio';
import styles from './HeroSection.module.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, bounce: 0.4 } },
};

type HeroSectionProps = {
  isLoaded: boolean;
};

function HeroSection({ isLoaded }: HeroSectionProps) {
  const contactIcons = {
    email: FaEnvelope,
    github: FaGithub,
    linkedin: FaLinkedin,
  } as const;

  return (
    <section id="hero" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <LocationBadge />
          </motion.div>

          <motion.h1 variants={headingVariants} className={styles.heading}>
            Hi, Oliver here{' '}
            <motion.span
              className={styles.waveWrap}
              whileHover={{ rotate: 18, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src="/png1.png" alt="Wave" className={styles.wave} />
            </motion.span>
          </motion.h1>

          <motion.div variants={fadeUp} className={styles.tagline}>
            Backend Dev | Cybersecurity
          </motion.div>

          <motion.p variants={fadeUp} className={styles.intro}>
            I'm a 3rd-year BSIT student specialized in{' '}
            <strong className={styles.accent}>cybersecurity</strong> and{' '}
            <strong className={styles.accent}>backend</strong> development using{' '}
            <strong className={styles.accent}>Node.js</strong>,{' '}
            <strong className={styles.accent}>Express</strong> and{' '}
            <strong className={styles.accent}>MongoDB</strong> and also have experience with{' '}
            <strong className={styles.accent}>PHP</strong> and{' '}
            <strong className={styles.accent}>MySQL</strong>.
          </motion.p>

          <motion.div variants={fadeUp} className={styles.actions}>
            {contactLinks.map((link) => {
              const Icon = contactIcons[link.kind];
              return (
                <a
                  key={link.kind}
                  href={link.href}
                  className={styles.actionButton}
                  title={link.label}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              );
            })}
            <a
              href="/Oliver_Ondoy_Resume.pdf"
              className={styles.resumeButton}
              title="Download Resume"
              download
              aria-label="Download Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileDownload />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
