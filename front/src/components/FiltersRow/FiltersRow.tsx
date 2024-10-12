import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Popover,
  TextField,
} from "@mui/material";
import styles from "./FiltersRow.module.css";
import { Add, FilterList, Search, SwapVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/types";
import FilterPopover from "../FilterPopover/FilterPopover";

export const FiltersRow = (props: {
  allProjects: Project[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) => {
  const [searchBtnIsClicked, setSearchBtnIsClicked] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const filterPopoverIsOpen = Boolean(anchorEl);

  const handleGoToCreationPage = () => {
    navigate("/create-project");
  };

  const handleClickFilterBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterPopover = () => {
    setAnchorEl(null);
  };

  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    props.setFilteredProjects(
      props.allProjects.filter((proj) =>
        proj.name
          .toLocaleLowerCase()
          .includes(searchInputValue.toLocaleLowerCase())
      )
    );
  }, [searchInputValue]);

  return (
    <div className={styles.container}>
      <div className={styles.filterBtnContainer}>
        <div className={styles.filterBtn}>
          <IconButton onClick={handleClickFilterBtn}>
            <FilterList />
            <div className={styles.btnText}>Filtrer</div>
          </IconButton>
        </div>
        <div className={styles.filterBtn}>
          <IconButton className={styles.filterBtn}>
            <SwapVert />
            <div className={styles.btnText}>Trier</div>
          </IconButton>
        </div>
        {searchBtnIsClicked ? (
          <OutlinedInput
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            size="small"
            className={styles.filterBtn}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        ) : (
          <div className={styles.filterBtn}>
            <IconButton onClick={() => setSearchBtnIsClicked(true)}>
              <Search />
              <div className={styles.btnText}>Rechercher</div>
            </IconButton>
          </div>
        )}
      </div>
      <div className={styles.filterBtn}>
        <IconButton onClick={handleGoToCreationPage}>
          <Add />
          <div className={styles.btnText}>Créer un projet</div>
        </IconButton>
      </div>
      <Popover
        open={filterPopoverIsOpen}
        anchorEl={anchorEl}
        onClose={handleCloseFilterPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        elevation={10}
      >
        <FilterPopover />
      </Popover>
    </div>
  );
};
