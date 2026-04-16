import { useState } from 'react';
import ProjectCarousel from '../components/ProjectCarousel';
import TechTag from '../components/ui/TechTag';
import { featuredProjects, skillIconMap } from '../data/portfolio';
import styles from './ProjectsSection.module.css';

const TECH_PREVIEW_COUNT = 5;

function ProjectsSection() {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleProjectTech = (projectName: string) => {
    setExpandedProjects((current) => ({
      ...current,
      [projectName]: !current[projectName],
    }));
  };

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <h2>Featured Projects</h2>
        <div className={styles.grid}>
          {featuredProjects.map((project) => {
            const isExpanded = !!expandedProjects[project.name];
            const visibleTech = project.technologies.slice(0, TECH_PREVIEW_COUNT);
            const hiddenTech = project.technologies.slice(TECH_PREVIEW_COUNT);
            const hasOverflow = hiddenTech.length > 0;

            return (
              <div
                key={project.name}
                className={styles.card}
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

                  <div className={styles.techSection}>
                    <div className={styles.tech}>
                      {visibleTech.map((technology) => (
                        <TechTag
                          key={technology}
                          name={technology}
                          icon={skillIconMap[technology.toLowerCase()]}
                        />
                      ))}
                      {isExpanded &&
                        hiddenTech.map((technology) => (
                          <span
                            key={technology}
                            className={styles.extraTechItem}
                          >
                            <TechTag
                              name={technology}
                              icon={skillIconMap[technology.toLowerCase()]}
                            />
                          </span>
                        ))}
                      {hasOverflow && (
                        <button
                          type="button"
                          className={styles.techOverflow}
                          onClick={() => toggleProjectTech(project.name)}
                          aria-expanded={isExpanded}
                          aria-label={
                            isExpanded
                              ? `Collapse ${project.name} tech stack`
                              : `Show ${hiddenTech.length} more ${project.name} technologies`
                          }
                        >
                          {!isExpanded && (
                            <span className={styles.techOverflowIcons} aria-hidden="true">
                              {hiddenTech.slice(0, 3).map((technology) => {
                                const icon = skillIconMap[technology.toLowerCase()];
                                return (
                                  <span key={technology} className={styles.techOverflowIcon}>
                                    {icon ? (
                                      <img src={icon} alt="" className={styles.techOverflowIconImage} />
                                    ) : (
                                      <span className={styles.techOverflowFallback}>•</span>
                                    )}
                                  </span>
                                );
                              })}
                            </span>
                          )}
                          <span className={styles.techOverflowLabel}>
                            {isExpanded ? 'Show less' : `+${hiddenTech.length} more`}
                          </span>
                        </button>
                      )}
                    </div>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
