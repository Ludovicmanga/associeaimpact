import { useNavigate } from "react-router-dom";
import { FiltersRow } from "../../components/FiltersRow/FiltersRow";
import NavBar from "../../components/NavBar/NavBar";
import ProjectBox from "../../components/ProjectBox/ProjectBox";
import styles from "./ProjectsList.module.css";

const ProjectsList = () => {
  const numbers = [1, 2, 33, 43, 78, 78];
  let nav = useNavigate();

  return (
    <>
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
    </>
  );
};

export default ProjectsList;
