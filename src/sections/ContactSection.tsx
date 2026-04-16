import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { contactLinks } from '../data/portfolio';
import styles from './ContactSection.module.css';

const iconMap = {
  email: FaEnvelope,
  github: FaGithub,
  linkedin: FaLinkedin,
} as const;

function ContactSection() {
  return (
    <>
      <section id="contact" className={styles.section}>
        <div className={`container ${styles.container}`}>
          <p className={styles.description}>
            If you have any questions or just wanna say hi, reach out below!😄
          </p>
          <motion.div
            className={styles.icons}
            initial={false}
            transition={{ staggerChildren: 0.05, delayChildren: 0.08 }}
          >
            {contactLinks.map((link) => {
              const Icon = iconMap[link.kind];
              return (
                <motion.a
                  key={link.kind}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={styles.iconLink}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon />
                </motion.a>
              );
            })}
          </motion.div>
          <div className={styles.location}>
            <FaMapMarkerAlt className={styles.marker} />
            Pangasinan, Philippines
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">&copy; {new Date().getFullYear()} Oliver. All rights reserved.</div>
      </footer>
    </>
  );
}

export default ContactSection;
