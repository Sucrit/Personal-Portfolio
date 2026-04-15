import styles from './TechTag.module.css';

type TechTagProps = {
  name: string;
  icon?: string;
};

const INVERTED_ICONS = new Set(['express', 'flask']);

function TechTag({ name, icon }: TechTagProps) {
  const shouldInvert = INVERTED_ICONS.has(name.toLowerCase());

  return (
    <span className={styles.tag}>
      {icon ? (
        <img
          src={icon}
          alt={name}
          className={`${styles.icon} ${shouldInvert ? styles.invert : ''}`.trim()}
        />
      ) : (
        <span aria-hidden className={styles.fallback}>
          •
        </span>
      )}
      {name}
    </span>
  );
}

export default TechTag;
