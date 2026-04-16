import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/portfolio';
import { skillIconMap } from '../data/portfolio';
import TechTag from './ui/TechTag';
import ProjectCarousel from './ProjectCarousel';
import styles from './ProjectModal.module.css';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' as const, delay: 0.05 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 350, damping: 30, delay: 0.05 },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.18, ease: 'easeIn' as const } },
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── Escape key ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  /* ── Body scroll lock + key listener ── */
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleKeyDown]);

  /* ── Focus the panel on open ── */
  useEffect(() => {
    if (project && panelRef.current) {
      panelRef.current.focus();
    }
  }, [project]);

  /* ── Backdrop click (only direct clicks) ── */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const detail = project?.detail;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            className={styles.panel}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={panelRef}
            tabIndex={-1}
          >
            {/* Close button */}
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Close project details"
            >
              ✕
            </button>

            {/* Gallery */}
            <div className={styles.gallery}>
              <ProjectCarousel
                images={project.images}
                alt={project.alt}
                desktopPreviewMode={project.desktopPreviewMode}
              />
            </div>

            {/* Body */}
            <div className={styles.body}>
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.titleGroup}>
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className={`${styles.logo} ${project.name === 'Credence' ? styles.logoLarge : ''}`.trim()}
                  />
                  <h2 id="project-modal-title" className={styles.name}>
                    {project.name}
                  </h2>
                  <span className={styles.roleBadge}>{project.role}</span>
                  <span className={styles.durationBadge}>{project.duration}</span>
                </div>
                <a
                  href={project.repoUrl}
                  className={styles.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Code &rarr;
                </a>
              </div>

              {/* Overview */}
              {detail?.overview && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionStar}>✦</span> Overview
                  </h3>
                  <p className={styles.sectionText}>{detail.overview}</p>
                </div>
              )}

              <hr className={styles.divider} />

              {/* Key Features */}
              {detail?.features && detail.features.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionStar}>✦</span> Key Features
                  </h3>
                  <ul className={styles.featureList}>
                    {detail.features.map((feature) => (
                      <li key={feature} className={styles.featureItem}>
                        <span className={styles.featureStar}>✦</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <hr className={styles.divider} />

              {/* System Architecture */}
              {detail?.architecture && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionStar}>✦</span> System Architecture
                  </h3>
                  <p className={styles.sectionText}>{detail.architecture}</p>
                </div>
              )}

              <hr className={styles.divider} />

              {/* Security */}
              {detail?.security && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionStar}>✦</span> Security
                  </h3>
                  <p className={styles.sectionText}>{detail.security}</p>
                </div>
              )}

              <hr className={styles.divider} />

              {/* Full Tech Stack */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionStar}>✦</span> Tech Stack
                </h3>
                <div className={styles.techGrid}>
                  {project.technologies.map((technology) => (
                    <TechTag
                      key={technology}
                      name={technology}
                      icon={skillIconMap[technology.toLowerCase()]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default ProjectModal;
