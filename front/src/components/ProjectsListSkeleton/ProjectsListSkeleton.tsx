import { Skeleton } from "@mui/material";
import styles from "./ProjectsListSkeleton.module.css";

export const ProjectsListSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filtersSkeletonContainer}>
        <Skeleton width="94%" height="4rem" />
      </div>
      <div className={styles.projectsContainer}>
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    </div>
  );
};

export const ProjectSkeleton = () => {
  return (
    <div className={styles.projectSkeletonContainer}>
      <Skeleton variant="rounded" height="100%" />
    </div>
  );
};
