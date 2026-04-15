import type { CSSProperties } from 'react';
import { skills } from '../data/portfolio';
import styles from './SkillsSection.module.css';

function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <h2>Technical Skills</h2>
        <div className={styles.grid}>
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={styles.item}
              style={{ '--logo-glow': skill.color } as CSSProperties}
            >
              <img src={skill.icon} alt={skill.name} className={styles.logo} />
              <h3 className={styles.name}>{skill.name}</h3>
              <p className={styles.description}>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
