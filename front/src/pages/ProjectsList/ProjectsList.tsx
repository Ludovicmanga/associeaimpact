import { useNavigate } from "react-router-dom";
import { FiltersRow } from "../../components/FiltersRow/FiltersRow";
import NavBar from "../../components/NavBar/NavBar";
import ProjectBox from "../../components/ProjectBox/ProjectBox";
import styles from "./ProjectsList.module.css";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { ProjectsListSkeleton } from "../../components/ProjectsListSkeleton/ProjectsListSkeleton";
import { getAllProjectsApiCall } from "../../helpers/projects.helper";
import { Project } from "../../types/types";

const ProjectsList = () => {
  let nav = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleGetProjects = async () => {
    const projectsFromDB = await getAllProjectsApiCall();
    setProjects(projectsFromDB);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetProjects();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <SideBar />
      </div>
      <div className={styles.mainContent}>
        <NavBar />
        {isLoading ? (
          <ProjectsListSkeleton />
        ) : (
          <>
            <FiltersRow />
            <div className={styles.projectBoxesContainer}>
              {projects.map((proj) => (
                <div
                  className={styles.projectBox}
                  onClick={() => {
                    nav("/project-details/" + proj.id);
                  }}
                >
                  <ProjectBox
                    name={proj.name}
                    description={proj.description}
                    createdAt={proj.createdAt}
                    stakes={proj.stakes}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
