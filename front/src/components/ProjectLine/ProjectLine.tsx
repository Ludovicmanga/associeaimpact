import ProjectBox from "../ProjectBox/ProjectBox";
import styles from "./ProjectLine.module.css";

export const ProjectLine = () => {
  return (
    <div className={styles.container}>
      <ProjectBox />
      <ProjectBox />
    </div>
  );
};
