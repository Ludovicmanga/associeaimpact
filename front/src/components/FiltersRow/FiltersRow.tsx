import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import styles from "./FiltersRow.module.css";
import { FilterList, Search, SwapVert } from "@mui/icons-material";
import { useState } from "react";

export const FiltersRow = () => {
  const [searchBtnIsClicked, setSearchBtnIsClicked] = useState(false);

  return (
    <div className={styles.container}>
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
  );
};
