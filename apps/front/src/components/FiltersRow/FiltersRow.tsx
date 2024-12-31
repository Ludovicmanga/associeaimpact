import {
  Badge,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Popover,
  useMediaQuery,
} from "@mui/material";
import styles from "./FiltersRow.module.css";
import { Add, FilterList, Search, SwapVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Project } from "../../types/types";
import FilterPopover from "../FilterPopover/FilterPopover";
import { haveCommonElements } from "../../utils/utils";
import { biggestFrenchCities, stakesList } from "../../types/constants";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNeedToLoginModal } from "../../redux/needToLoginModalSlice";

export const FiltersRow = (props: {
  allProjects: Project[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) => {
  const [allFilters, setAllFilters] = useState<Filter[]>([]);
  const [searchBtnIsClicked, setSearchBtnIsClicked] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const filterPopoverIsOpen = Boolean(anchorEl);
  const loggedUserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleGoToCreationPage = () => {
    if (loggedUserState) {
      navigate("/my-projects");
    } else {
      dispatch(
        setNeedToLoginModal({
          isOpen: true,
          message: "Vous devez vous connecter pour créer un projet",
        })
      );
    }
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

    if (proj?.place?.formatted_address?.toLocaleLowerCase()) {
      return cityFiltersValues.some((cityFilt) =>
        proj?.place?.formatted_address?.toLocaleLowerCase().includes(cityFilt)
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

  useEffect(() => {
    const cityFilters: Filter[] = biggestFrenchCities.map((city) => {
      return {
        id: uuidv4(),
        type: "city",
        value: city,
      };
    });

    const stakeFilters: Filter[] = stakesList.map((stake) => {
      return {
        id: uuidv4(),
        type: "stake",
        value: stake,
      };
    });

    setAllFilters([...cityFilters, ...stakeFilters]);
  }, []);

  const bigScreen = useMediaQuery("(min-width: 40rem)");

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
            sx={{
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 1px #adb5bd",
                },
              },
            }}
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
          <div className={styles.btnText}>
            {bigScreen ? "Créer un projet" : "Créer"}
          </div>
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
          allFilters={allFilters}
        />
      </Popover>
    </div>
  );
};
