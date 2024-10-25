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
import NoResultInfo from "../../components/NoResultInfo/NoResultInfo";
import noResultImgPath from "../../images/undraw_feeling_blue.svg";
import noSearchImgPath from "../../images/noSearchFound.svg";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import { useAppSelector } from "../../redux/hooks";

const ProjectsList = (props: { mode: "all projects" | "my projects" }) => {
  const navigate = useNavigate();
  const loggedUserState = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [noResultText, setNoResultText] = useState("");
  const [noResultImg, setNoResultImg] = useState("");

  const handleGetProjects = async () => {
    let projectsToSet;
    if (props.mode === "all projects") {
      projectsToSet = await getAllProjectsApiCall();
    } else {
      projectsToSet = await getProjectsCreatedByLoggedUserApiCall();
    }
    if (projectsToSet.length === 0) {
      setNoResultText("Aucun projet n'a été créé");
      setNoResultImg(noResultImgPath);
    } else {
      setNoResultText("Pas de résultat pour cette recherche");
      setNoResultImg(noSearchImgPath);
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
      <SideBar />
      <div className={styles.mainContent}>
        <NavBar
          startElement={
            <WelcomeMessage
              mainText={
                loggedUserState
                  ? `Bonjour ${loggedUserState?.name}`
                  : "Bienvenue sur Associé à impact"
              }
              subText={
                loggedUserState
                  ? "Ravis de vous revoir !"
                  : "L'endroit pour trouver son associé"
              }
            />
          }
        />
        {isLoading ? (
          <ProjectsListSkeleton />
        ) : (
          <>
            <FiltersRow
              allProjects={allProjects}
              setFilteredProjects={setFilteredProjects}
            />
            {filteredProjects.length === 0 ? (
              <div className={styles.noResultInfoContainer}>
                <NoResultInfo text={noResultText} img={noResultImg} />
              </div>
            ) : (
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
