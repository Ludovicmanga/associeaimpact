import { useNavigate } from "react-router-dom";
import { FiltersRow } from "../../components/FiltersRow/FiltersRow";
import NavBar from "../../components/NavBar/NavBar";
import ProjectBox from "../../components/ProjectBox/ProjectBox";
import styles from "./ProjectsList.module.css";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";

const ProjectsList = () => {
  const numbers = [1, 2, 33, 43, 78, 78];
  let nav = useNavigate();

  const userState = useAppSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <SideBar />
      </div>
      <div className={styles.mainContent}>
        <NavBar />
        <FiltersRow />
        <div className={styles.projectBoxesContainer}>
          {numbers.map((num) => (
            <div
              className={styles.projectBox}
              onClick={() => {
                nav("/project-details/" + num);
              }}
            >
              <ProjectBox />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
