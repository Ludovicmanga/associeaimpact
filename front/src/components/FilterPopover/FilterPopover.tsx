import styles from "./FilterPopover.module.css";

export default function FilterPopover() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>Filtres actifs</div>
      <div className={styles.sectionTitle}>Choisir filtres</div>
    </div>
  );
}
