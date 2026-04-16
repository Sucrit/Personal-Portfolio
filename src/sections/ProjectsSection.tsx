import { motion } from 'framer-motion';
import ProjectCarousel from '../components/ProjectCarousel';
import TechTag from '../components/ui/TechTag';
import { featuredProjects, skillIconMap } from '../data/portfolio';
import styles from './ProjectsSection.module.css';

function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <h2>Featured Projects</h2>
        <div className={styles.grid}>
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              className={`${styles.card} ${project.name === 'Credence' ? styles.cardExpanded : ''}`.trim()}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.42, delay: index * 0.05 }}
            >
              <div className={styles.imageContainer}>
                <ProjectCarousel
                  images={project.images}
                  alt={project.alt}
                  desktopPreviewMode={project.desktopPreviewMode}
                />
              </div>

              <div className={styles.content}>
                <div className={styles.titleInline}>
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className={`${styles.logo} ${project.name === 'Credence' ? styles.logoLarge : ''}`.trim()}
                  />
                  <h3 className={styles.title}>{project.name}</h3>
                </div>
                <div className={styles.role}>Role: {project.role}</div>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.tech}>
                  {project.technologies.map((technology) => (
                    <TechTag
                      key={technology}
                      name={technology}
                      icon={skillIconMap[technology.toLowerCase()]}
                    />
                  ))}
                </div>

                <div className={styles.links}>
                  <a
                    href={project.repoUrl}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
