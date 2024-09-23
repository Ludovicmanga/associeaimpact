import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import styles from "./FiltersRow.module.css";
import { Add, FilterList, Search, SwapVert } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FiltersRow = () => {
  const [searchBtnIsClicked, setSearchBtnIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleGoToCreationPage = () => {
    navigate("/create-project");
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterBtnContainer}>
        <div className={styles.filterBtn}>
          <IconButton>
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
    </div>
  );
};
