import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaEllipsisH, FaGithub } from 'react-icons/fa';
import ProjectCarousel from '../components/ProjectCarousel';
import ProjectModal from '../components/ProjectModal';
import TechTag from '../components/ui/TechTag';
import type { Project } from '../data/portfolio';
import { featuredProjects, skillIconMap } from '../data/portfolio';
import styles from './ProjectsSection.module.css';

function ProjectsSection() {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // ── Dynamic row measurement ──
  // null = needs measurement pass (render all tags), object = measured counts
  const [previewCounts, setPreviewCounts] = useState<Record<string, number> | null>(null);
  const techRowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Measure how many tags fit in the first 2 flex-wrap rows
  useLayoutEffect(() => {
    if (previewCounts !== null) return;

    const counts: Record<string, number> = {};

    for (const project of featuredProjects) {
      const container = techRowRefs.current[project.name];
      if (!container) continue;

      const children = Array.from(container.children) as HTMLElement[];
      if (children.length <= 1) {
        counts[project.name] = children.length;
        continue;
      }

      // Collect unique vertical positions (= rows)
      const uniqueTops: number[] = [];
      const childTops: number[] = [];

      for (const child of children) {
        const top = child.offsetTop;
        childTops.push(top);
        if (!uniqueTops.includes(top)) uniqueTops.push(top);
      }

      uniqueTops.sort((a, b) => a - b);

      if (uniqueTops.length <= 2) {
        // Everything fits in ≤ 2 rows — no overflow needed
        counts[project.name] = children.length;
      } else {
        // Count children whose top is in the first 2 rows
        const secondRowTop = uniqueTops[1];
        counts[project.name] = childTops.filter((t) => t <= secondRowTop).length;
      }
    }

    setPreviewCounts(counts);
  });

  // Re-measure when the window resizes (tag wrapping may change)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setPreviewCounts(null), 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ── Collapsible extra-tech height ──
  const extraRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [heights, setHeights] = useState<Record<string, number>>({});

  const measureExtraRef = useCallback(
    (name: string) => (el: HTMLDivElement | null) => {
      extraRefs.current[name] = el;
      if (el) {
        const h = el.scrollHeight;
        setHeights((prev) => (prev[name] === h ? prev : { ...prev, [name]: h }));
      }
    },
    [],
  );

  const toggleProjectTech = (projectName: string) => {
    const el = extraRefs.current[projectName];
    if (el) {
      setHeights((prev) => ({ ...prev, [projectName]: el.scrollHeight }));
    }
    setExpandedProjects((current) => ({
      ...current,
      [projectName]: !current[projectName],
    }));
  };

  // ── Render ──
  const isMeasuring = previewCounts === null;

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <h2>Featured Projects</h2>
        <div className={styles.grid}>
          {featuredProjects.map((project) => {
            const isExpanded = !!expandedProjects[project.name];

            // During measurement, show ALL tags so we can read their positions.
            // After measurement, show only the tags that fit in 2 rows.
            const previewCount = isMeasuring
              ? project.technologies.length
              : (previewCounts[project.name] ?? project.technologies.length);

            const visibleTech = project.technologies.slice(0, previewCount);
            const hiddenTech = project.technologies.slice(previewCount);
            const hasOverflow = !isMeasuring && hiddenTech.length > 0;

            return (
              <div key={project.name} className={styles.card}>
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
                      className={
                        `${styles.logo} ${project.name === 'Credence' ? styles.logoLarge : ''}`.trim()
                      }
                    />
                    <h3 className={styles.title}>{project.name}</h3>
                  </div>
                  <div className={styles.role}>Role: {project.role}</div>
                  <p className={styles.description}>{project.description}</p>

                  <div className={styles.techSection}>
                    <div
                      className={styles.tech}
                      ref={(el) => {
                        techRowRefs.current[project.name] = el;
                      }}
                    >
                      {visibleTech.map((technology) => (
                        <TechTag
                          key={technology}
                          name={technology}
                          icon={skillIconMap[technology.toLowerCase()]}
                        />
                      ))}
                    </div>

                    {hasOverflow && (
                      <div
                        ref={measureExtraRef(project.name)}
                        className={styles.extraTechWrap}
                        style={{
                          height: isExpanded ? (heights[project.name] ?? 0) : 0,
                        }}
                      >
                        <div className={styles.extraTechInner}>
                          {hiddenTech.map((technology) => (
                            <span
                              key={technology}
                              className={`${styles.extraTechItem} ${isExpanded ? styles.extraTechItemVisible : ''}`}
                            >
                              <TechTag
                                name={technology}
                                icon={skillIconMap[technology.toLowerCase()]}
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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

                  <div className={styles.links}>
                    <button
                      type="button"
                      className={styles.detailsBtn}
                      onClick={() => setActiveProject(project)}
                    >
                      <FaEllipsisH aria-hidden="true" />
                      More
                    </button>
                    <a
                      href={project.repoUrl}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub aria-hidden="true" />
                      View
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}

export default ProjectsSection;
