import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import type { EducationItem } from '../data/portfolio';
import { aboutSections, educationItems } from '../data/portfolio';
import styles from './AboutSection.module.css';

function renderHighlightedText(text: string) {
  const parts = text.split(/(\[\[.*?\]\])/g);

  return parts.map((part, index) => {
    if (part.startsWith('[[') && part.endsWith(']]')) {
      return (
        <span key={`${part}-${index}`} className={styles.inlineHighlight}>
          {part.slice(2, -2)}
        </span>
      );
    }

    return part;
  });
}

function EducationCard({
  item,
  side,
  borderColor,
  boxShadow,
  connectorProgress,
}: {
  item: EducationItem;
  side: 'left' | 'right';
  borderColor: string;
  boxShadow: string;
  connectorProgress: MotionValue<number>;
}) {
  const isLeft = side === 'left';
  const connectorOpacity = useTransform(connectorProgress, [0, 0.08, 1], [0, 1, 1]);
  const connectorScale = useTransform(connectorProgress, [0, 1], [0, 1]);
  const nodeFillScale = useTransform(connectorProgress, [0, 1], [0, 1]);
  const nodeFillOpacity = useTransform(connectorProgress, [0, 0.1, 1], [0, 1, 1]);
  const starColor = useTransform(
    connectorProgress,
    [0, 1],
    ['rgba(255, 222, 33, 0.6)', 'rgba(255, 222, 33, 1)'],
  );
  const starGlow = useTransform(
    connectorProgress,
    [0, 1],
    ['0 0 0 rgba(255, 222, 33, 0)', '0 0 10px rgba(255, 222, 33, 0.45)'],
  );
  const starScale = useTransform(connectorProgress, [0, 1], [1, 1.08]);
  const statusFillScale = useTransform(connectorProgress, [0, 1], [0, 1]);
  const statusFillOpacity = useTransform(connectorProgress, [0, 0.04, 1], [0, 1, 1]);
  const statusTextColor = useTransform(connectorProgress, [0, 1], ['#94a3b8', '#0f172a']);
  const nodeBorderColor = useTransform(
    connectorProgress,
    [0, 1],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 222, 33, 0.95)'],
  );
  const nodeBorderGlow = useTransform(
    connectorProgress,
    [0, 1],
    [
      '0 0 10px rgba(255, 255, 255, 0.15), inset 0 0 4px rgba(255, 255, 255, 0.08)',
      '0 0 10px rgba(255, 222, 33, 0.2), inset 0 0 4px rgba(255, 222, 33, 0.08)',
    ],
  );

  return (
    <div className={`${styles.item} ${isLeft ? styles.left : styles.right}`}>
      {isLeft ? null : <div className={styles.spacer} />}

      {isLeft && (
        <>
          <motion.div className={styles.cardMotion} style={{ borderColor, boxShadow }}>
            <div className={styles.cardHead}>
              <div className={styles.schoolWrap}>
                <img src={item.logo} alt={item.logoAlt} className={styles.schoolLogo} />
                <h4 className={styles.school}>{item.school}</h4>
              </div>
              <motion.span
                className={`${styles.status} ${
                  item.status === 'Current' ? styles.statusCurrent : styles.statusComplete
                }`}
              >
                <motion.span
                  className={`${styles.statusFill} ${styles.statusFillReverse}`}
                  style={{ opacity: statusFillOpacity, scaleX: statusFillScale }}
                />
                <motion.span className={styles.statusText} style={{ color: statusTextColor }}>
                  {item.status}
                </motion.span>
              </motion.span>
            </div>
            <p className={styles.degree}>{item.degree}</p>
            <p className={styles.years}>{item.years}</p>
            <div className={styles.highlights}>
              {item.highlights.map((highlight) => (
                <p key={highlight} className={styles.highlight}>
                  <motion.span
                    className={styles.highlightDot}
                    style={{ color: starColor, textShadow: starGlow, scale: starScale }}
                  >
                    ★
                  </motion.span>
                  {highlight}
                </p>
              ))}
            </div>
          </motion.div>

          <div className={`${styles.connector} ${styles.connectorLeft}`}>
            <motion.div
              className={`${styles.connectorFill} ${styles.connectorFillLeft}`}
              style={{ opacity: connectorOpacity, scaleX: connectorScale }}
            />
            <motion.div
              className={`${styles.node} ${styles.nodeRight}`}
              style={{ borderColor: nodeBorderColor, boxShadow: nodeBorderGlow }}
            >
              <motion.div
                className={styles.nodeFill}
                style={{ opacity: nodeFillOpacity, scale: nodeFillScale }}
              />
            </motion.div>
          </div>

          <div className={styles.spacer} />
        </>
      )}

      {!isLeft && (
        <>
          <div className={`${styles.connector} ${styles.connectorRight}`}>
            <motion.div
              className={`${styles.connectorFill} ${styles.connectorFillRight}`}
              style={{ opacity: connectorOpacity, scaleX: connectorScale }}
            />
            <motion.div
              className={`${styles.node} ${styles.nodeLeft}`}
              style={{ borderColor: nodeBorderColor, boxShadow: nodeBorderGlow }}
            >
              <motion.div
                className={styles.nodeFill}
                style={{ opacity: nodeFillOpacity, scale: nodeFillScale }}
              />
            </motion.div>
          </div>

          <motion.div className={styles.cardMotion} style={{ borderColor, boxShadow }}>
            <div className={styles.cardHead}>
              <div className={styles.schoolWrap}>
                <img src={item.logo} alt={item.logoAlt} className={styles.schoolLogo} />
                <h4 className={styles.school}>{item.school}</h4>
              </div>
              <motion.span
                className={`${styles.status} ${
                  item.status === 'Current' ? styles.statusCurrent : styles.statusComplete
                }`}
              >
                <motion.span
                  className={styles.statusFill}
                  style={{ opacity: statusFillOpacity, scaleX: statusFillScale }}
                />
                <motion.span className={styles.statusText} style={{ color: statusTextColor }}>
                  {item.status}
                </motion.span>
              </motion.span>
            </div>
            <p className={styles.degree}>{item.degree}</p>
            <p className={styles.years}>{item.years}</p>
            <div className={styles.highlights}>
              {item.highlights.map((highlight) => (
                <p key={highlight} className={styles.highlight}>
                  <motion.span
                    className={styles.highlightDot}
                    style={{ color: starColor, textShadow: starGlow, scale: starScale }}
                  >
                    ★
                  </motion.span>
                  {highlight}
                </p>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const hsGlowValue = '0px 0px 0px rgba(255,255,255,0)';
  const hsBorderValue = 'rgba(255,255,255,0.05)';
  const collegeGlowValue = '0px 0px 0px rgba(255,255,255,0)';
  const collegeBorderValue = 'rgba(255,255,255,0.05)';

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });
  const lightTopValue = useTransform(smoothProgress, (progress) => `${lerp(0, 100, progress)}%`);
  const progressHeight = useTransform(smoothProgress, (progress) => `${lerp(0, 100, progress)}%`);
  const lightOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);
  const firstConnectorProgress = useTransform(smoothProgress, [0.2, 0.3], [0, 1]);
  const secondConnectorProgress = useTransform(smoothProgress, [0.7, 0.8], [0, 1]);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.headingWrap}>
          <h2 className={styles.heading}>About Me</h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.stack}>
            <div className={styles.card}>
              <div className={styles.text}>
                {aboutSections.map((section) => (
                  <div key={section.title}>
                    <strong className={styles.label}>{section.title}</strong>
                    <span>{renderHighlightedText(section.body)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.educationHeader}>
                <h3 className={styles.educationHeading}>Educational Background</h3>
              </div>

              <div ref={timelineRef} className={styles.timeline}>
                <div className={styles.centerBar} />
                <motion.div
                  className={styles.progressBar}
                  style={{
                    height: progressHeight,
                    opacity: lightOpacity,
                  }}
                />

                <motion.div
                  className={styles.light}
                  style={{
                    top: lightTopValue,
                    x: '-50%',
                    y: '-50%',
                    opacity: lightOpacity,
                  }}
                  transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                />

                <EducationCard
                  item={educationItems[0]}
                  side="left"
                  borderColor={hsBorderValue}
                  boxShadow={hsGlowValue}
                  connectorProgress={firstConnectorProgress}
                />

                <EducationCard
                  item={educationItems[1]}
                  side="right"
                  borderColor={collegeBorderValue}
                  boxShadow={collegeGlowValue}
                  connectorProgress={secondConnectorProgress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
