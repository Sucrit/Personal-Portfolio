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
          <div className={styles.icons}>
            {contactLinks.map((link) => {
              const Icon = iconMap[link.kind];
              return (
                <a
                  key={link.kind}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={styles.iconLink}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
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
