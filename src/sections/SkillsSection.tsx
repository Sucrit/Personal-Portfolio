import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { skills } from '../data/portfolio';
import styles from './SkillsSection.module.css';

function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <h2>Technical Skills</h2>
        <div className={styles.grid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={styles.item}
              style={{ '--logo-glow': skill.color } as CSSProperties}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
            >
              <img src={skill.icon} alt={skill.name} className={styles.logo} />
              <h3 className={styles.name}>{skill.name}</h3>
              <p className={styles.description}>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
