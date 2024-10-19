import {
  Badge,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Popover,
} from "@mui/material";
import styles from "./FiltersRow.module.css";
import { Add, FilterList, Search, SwapVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Project } from "../../types/types";
import FilterPopover from "../FilterPopover/FilterPopover";
import { haveCommonElements } from "../../utils/utils";

export const FiltersRow = (props: {
  allProjects: Project[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) => {
  const [searchBtnIsClicked, setSearchBtnIsClicked] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
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

  const cityFiltersValues = activeFilters
    .filter((filt) => filt.type === "city")
    .map((filt) => filt.value.toLocaleLowerCase());

  const stakeFiltersValues = activeFilters
    .filter((filt) => filt.type === "stake")
    .map((filt) => filt.value.toLocaleLowerCase());

  const hasMatchingStakes = (proj: Project) => {
    if (stakeFiltersValues.length === 0) {
      return true;
    }

    const projectStakes = proj.stakes.map((stake) => stake.toLocaleLowerCase());
    return haveCommonElements(projectStakes, stakeFiltersValues);
  };

  const hasMatchingCity = (proj: Project) => {
    if (cityFiltersValues.length === 0) {
      return true;
    }

    if (proj?.place.formatted_address?.toLocaleLowerCase()) {
      return cityFiltersValues.includes(
        proj?.place.formatted_address?.toLocaleLowerCase()
      );
    }
  };

  const projectNameMatchesSearch = (proj: Project) => {
    return proj.name
      .toLocaleLowerCase()
      .includes(searchInputValue.toLocaleLowerCase());
  };

  useEffect(() => {
    props.setFilteredProjects(
      props.allProjects
        .filter((proj) => projectNameMatchesSearch(proj))
        .filter((proj) => hasMatchingCity(proj))
        .filter((proj) => hasMatchingStakes(proj))
    );
  }, [searchInputValue, activeFilters]);

  return (
    <div className={styles.container}>
      <div className={styles.filterBtnContainer}>
        <div className={styles.filterBtn}>
          <Badge badgeContent={activeFilters.length} color="primary">
            <IconButton onClick={handleClickFilterBtn}>
              <FilterList />
              <div className={styles.btnText}>Filtrer</div>
            </IconButton>
          </Badge>
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
        <FilterPopover
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </Popover>
    </div>
  );
};
