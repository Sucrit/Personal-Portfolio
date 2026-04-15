import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { EducationItem } from '../data/portfolio';
import { aboutSections, educationItems } from '../data/portfolio';
import styles from './AboutSection.module.css';

function EducationCard({
  item,
  side,
  borderColor,
  boxShadow,
  connectorRef,
}: {
  item: EducationItem;
  side: 'left' | 'right';
  borderColor: ReturnType<typeof useMotionValue<string>>;
  boxShadow: ReturnType<typeof useMotionValue<string>>;
  connectorRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isLeft = side === 'left';

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
              <span
                className={`${styles.status} ${
                  item.status === 'Current' ? styles.statusCurrent : styles.statusComplete
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className={styles.degree}>{item.degree}</p>
            <p className={styles.years}>{item.years}</p>
            <div className={styles.highlights}>
              {item.highlights.map((highlight) => (
                <p key={highlight} className={styles.highlight}>
                  <span className={styles.highlightDot}>◆</span>
                  {highlight}
                </p>
              ))}
            </div>
          </motion.div>

          <div className={`${styles.connector} ${styles.connectorLeft}`}>
            <div ref={connectorRef} className={`${styles.node} ${styles.nodeRight}`} />
          </div>

          <div className={styles.spacer} />
        </>
      )}

      {!isLeft && (
        <>
          <div className={`${styles.connector} ${styles.connectorRight}`}>
            <div ref={connectorRef} className={`${styles.node} ${styles.nodeLeft}`} />
          </div>

          <motion.div className={styles.cardMotion} style={{ borderColor, boxShadow }}>
            <div className={styles.cardHead}>
              <div className={styles.schoolWrap}>
                <img src={item.logo} alt={item.logoAlt} className={styles.schoolLogo} />
                <h4 className={styles.school}>{item.school}</h4>
              </div>
              <span
                className={`${styles.status} ${
                  item.status === 'Current' ? styles.statusCurrent : styles.statusComplete
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className={styles.degree}>{item.degree}</p>
            <p className={styles.years}>{item.years}</p>
            <div className={styles.highlights}>
              {item.highlights.map((highlight) => (
                <p key={highlight} className={styles.highlight}>
                  <span className={styles.highlightDot}>◆</span>
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
  const hsConnectorRef = useRef<HTMLDivElement>(null);
  const collegeConnectorRef = useRef<HTMLDivElement>(null);
  const snapPointsRef = useRef({ hs: 23, college: 87 });

  const lightTopValue = useMotionValue('0%');
  const hsGlowValue = useMotionValue('0px 0px 0px rgba(255,255,255,0)');
  const hsBorderValue = useMotionValue('rgba(255,255,255,0.05)');
  const collegeGlowValue = useMotionValue('0px 0px 0px rgba(255,255,255,0)');
  const collegeBorderValue = useMotionValue('rgba(255,255,255,0.05)');

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  useEffect(() => {
    const calculateSnapPoints = () => {
      if (!timelineRef.current || !hsConnectorRef.current || !collegeConnectorRef.current) {
        return;
      }

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const hsRect = hsConnectorRef.current.getBoundingClientRect();
      const collegeRect = collegeConnectorRef.current.getBoundingClientRect();

      snapPointsRef.current = {
        hs: Math.max(5, Math.min(95, ((hsRect.top + hsRect.height / 2 - timelineRect.top) / timelineRect.height) * 100)),
        college: Math.max(5, Math.min(95, ((collegeRect.top + collegeRect.height / 2 - timelineRect.top) / timelineRect.height) * 100)),
      };
    };

    calculateSnapPoints();

    const resizeObserver = new ResizeObserver(calculateSnapPoints);
    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }

    window.addEventListener('resize', calculateSnapPoints);
    window.addEventListener('load', calculateSnapPoints);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateSnapPoints);
      window.removeEventListener('load', calculateSnapPoints);
    };
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, 'change', (progress) => {
    const { hs, college } = snapPointsRef.current;
    const hsP = hs / 100;
    const collegeP = college / 100;
    const snapRange = 0.15;
    let lightPercent: number;

    if (progress < hsP - snapRange) {
      lightPercent = lerp(0, hs, progress / (hsP - snapRange));
    } else if (progress < hsP + snapRange) {
      lightPercent = hs;
    } else if (progress < collegeP - snapRange) {
      const t =
        (progress - (hsP + snapRange)) /
        ((collegeP - snapRange) - (hsP + snapRange));
      lightPercent = lerp(hs, college, t);
    } else if (progress < collegeP + snapRange) {
      lightPercent = college;
    } else {
      lightPercent = lerp(
        college,
        100,
        (progress - (collegeP + snapRange)) / (1 - (collegeP + snapRange)),
      );
    }

    lightTopValue.set(`${lightPercent}%`);

    const applyGlow = (
      distance: number,
      motionGlow: typeof hsGlowValue,
      motionBorder: typeof hsBorderValue,
    ) => {
      const glowRange = 0.15;

      if (distance < glowRange) {
        const intensity =
          distance < snapRange
            ? 1
            : 1 - (distance - snapRange) / (glowRange - snapRange);
        const glowSize = Math.round(30 * intensity);
        const glowAlpha = (0.4 * intensity).toFixed(2);
        motionGlow.set(`0px 0px ${glowSize}px rgba(255,255,255, ${glowAlpha})`);
        motionBorder.set(
          intensity > 0.5 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
        );
        return;
      }

      motionGlow.set('0px 0px 0px rgba(255, 222, 33, 0)');
      motionBorder.set('rgba(255,255,255,0.05)');
    };

    applyGlow(Math.abs(progress - hsP), hsGlowValue, hsBorderValue);
    applyGlow(Math.abs(progress - collegeP), collegeGlowValue, collegeBorderValue);
  });

  const scrollVelocity = useVelocity(smoothProgress);
  const scaleY = useMotionValue(1);

  useMotionValueEvent(scrollVelocity, 'change', (latest) => {
    if (latest > 0 && scaleY.get() !== 1) {
      animate(scaleY, 1, { duration: 0.15 });
    } else if (latest < 0 && scaleY.get() !== -1) {
      animate(scaleY, -1, { duration: 0.15 });
    }
  });

  const lightOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const rawTrailOpacity = useTransform(scrollVelocity, [-0.05, -0.01, 0.01, 0.05], [0.8, 0, 0, 0.8]);
  const trailOpacity = useSpring(rawTrailOpacity, { stiffness: 60, damping: 15 });

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
                    <span>{section.body}</span>
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
                  className={styles.light}
                  style={{
                    top: lightTopValue,
                    x: '-50%',
                    y: '-50%',
                    opacity: lightOpacity,
                  }}
                  transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                />

                <motion.div
                  className={styles.lightTrail}
                  style={{
                    top: lightTopValue,
                    x: '-50%',
                    y: '-100%',
                    opacity: trailOpacity,
                    scaleY,
                    originY: 1,
                  }}
                  transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                />

                <EducationCard
                  item={educationItems[0]}
                  side="left"
                  borderColor={hsBorderValue}
                  boxShadow={hsGlowValue}
                  connectorRef={hsConnectorRef}
                />

                <EducationCard
                  item={educationItems[1]}
                  side="right"
                  borderColor={collegeBorderValue}
                  boxShadow={collegeGlowValue}
                  connectorRef={collegeConnectorRef}
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
