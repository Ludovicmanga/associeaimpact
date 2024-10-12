import { useNavigate } from "react-router-dom";
import { FiltersRow } from "../../components/FiltersRow/FiltersRow";
import NavBar from "../../components/NavBar/NavBar";
import ProjectBox from "../../components/ProjectBox/ProjectBox";
import styles from "./ProjectsList.module.css";
import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { ProjectsListSkeleton } from "../../components/Skeletons/ProjectsListSkeleton/ProjectsListSkeleton";
import {
  getAllProjectsApiCall,
  getProjectsCreatedByLoggedUserApiCall,
} from "../../helpers/projects.helper";
import { Project } from "../../types/types";

const ProjectsList = (props: { mode: "all projects" | "my projects" }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const handleGetProjects = async () => {
    let projectsToSet;
    if (props.mode === "all projects") {
      projectsToSet = await getAllProjectsApiCall();
    } else {
      projectsToSet = await getProjectsCreatedByLoggedUserApiCall();
    }
    setAllProjects(projectsToSet);
    setFilteredProjects(projectsToSet);
    setIsLoading(false);
  };

  const handleClickOnProject = (id: number) => {
    navigate("/project-details/" + id);
  };

  useEffect(() => {
    handleGetProjects();
  }, [props.mode]);

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
            <FiltersRow
              allProjects={allProjects}
              setFilteredProjects={setFilteredProjects}
            />
            <div className={styles.projectBoxesContainer}>
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className={styles.projectBoxContainer}
                  onClick={() => handleClickOnProject(proj.id)}
                >
                  <ProjectBox
                    id={proj.id}
                    name={proj.name}
                    description={proj.description}
                    createdAt={proj.createdAt}
                    stakes={proj.stakes}
                    isEditable={props.mode === "my projects"}
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
