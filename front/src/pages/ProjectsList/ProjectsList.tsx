import { useNavigate } from "react-router-dom";
import { FiltersRow } from "../../components/FiltersRow/FiltersRow";
import NavBar from "../../components/NavBar/NavBar";
import ProjectBox from "../../components/ProjectBox/ProjectBox";
import styles from "./ProjectsList.module.css";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";

const ProjectsList = () => {
  const numbers = [1, 2, 33, 43, 78, 78];
  let nav = useNavigate();

  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(userState, " is the user state :o");
  }, [userState]);

  return (
    <>
      <NavBar />
      Bonjour {userState?.email}
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
