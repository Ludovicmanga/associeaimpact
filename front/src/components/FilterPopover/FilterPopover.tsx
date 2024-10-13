import { Dispatch, useEffect, useState } from "react";
import styles from "./FilterPopover.module.css";
import {
  Button,
  Chip,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Clear, HideSource, Search } from "@mui/icons-material";
import UiverseCheckBox from "../UiverseCheckBox/UiverseCheckBox";
import { Filter } from "../../types/types";

const allFilters: Filter[] = [
  {
    id: "1",
    type: "city",
    value: "Paris",
  },
  {
    id: "2",
    type: "city",
    value: "Washington",
  },
  {
    id: "3",
    type: "city",
    value: "Sidney",
  },
  {
    id: "4",
    type: "stake",
    value: "Agriculture",
  },
  {
    id: "5",
    type: "stake",
    value: "Energie",
  },
  {
    id: "6",
    type: "stake",
    value: "Social",
  },
];

export default function FilterPopover(props: {
  activeFilters: Filter[];
  setActiveFilters: Dispatch<React.SetStateAction<Filter[]>>;
}) {
  const [searchInputValue, setSearchInputValue] = useState("");

  const [selectableFiltersToDisplay, setSelectableFiltersToDisplay] = useState<
    {
      id: string;
      type: "city" | "stake";
      value: string;
    }[]
  >([]);

  const [selectedFilterType, setSelectedFilterType] = useState<
    "city" | "stake"
  >("city");

  useEffect(() => {
    if (selectedFilterType === "city") {
      setSelectableFiltersToDisplay((curr) =>
        allFilters.filter((filt) => filt.type === "city")
      );
    } else {
      setSelectableFiltersToDisplay(
        allFilters.filter((filt) => filt.type === "stake")
      );
    }
  }, [allFilters, selectedFilterType]);

  useEffect(() => {
    setSearchInputValue("");
  }, [selectedFilterType]);

  useEffect(() => {
    setSelectableFiltersToDisplay((curr) =>
      allFilters
        .filter((filt) => filt.value.includes(searchInputValue))
        .filter((filt) =>
          selectedFilterType === "city"
            ? filt.type === "city"
            : filt.type === "stake"
        )
    );
  }, [searchInputValue, allFilters]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Filtres actifs</div>
        {props.activeFilters.length > 0 && (
          <IconButton>
            <Clear
              sx={{
                fontSize: "1.1rem",
              }}
            />
            <div
              className={styles.deleteActiveFiltersText}
              onClick={() => props.setActiveFilters([])}
            >
              Supprimer tous les filtres actifs
            </div>
          </IconButton>
        )}
        <div className={styles.chipsContainer}>
          {props.activeFilters.length > 0 ? (
            props.activeFilters.map((filt) => (
              <Chip
                key={filt.id}
                label={filt.value}
                sx={{
                  margin: "0.2rem",
                  backgroundColor:
                    filt.type === "city"
                      ? "#fff0f6"
                      : filt.type === "stake"
                      ? "#edf2ff"
                      : "",
                }}
                onDelete={() =>
                  props.setActiveFilters((curr) =>
                    curr.filter((activeFilt) => activeFilt.id !== filt.id)
                  )
                }
              />
            ))
          ) : (
            <div className={styles.noActiveFilterInfoContainer}>
              <HideSource
                sx={{
                  fontSize: "0.8rem",
                }}
              />
              <div className={styles.noActiveFilterInfoText}>
                Pas de filtres actifs
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Choisir filtres</div>
        <div>
          <div className={styles.filtersTypeBtnContainer}>
            <Button
              variant={selectedFilterType === "city" ? "contained" : "text"}
              sx={{
                margin: "0.3rem",
              }}
              onClick={() => setSelectedFilterType("city")}
            >
              Ville
            </Button>
            <Button
              variant={selectedFilterType === "stake" ? "contained" : "text"}
              sx={{
                margin: "0.3rem",
              }}
              onClick={() => setSelectedFilterType("stake")}
            >
              Enjeu
            </Button>
          </div>
          <div className={styles.searchInputContainer}>
            <OutlinedInput
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder={
                selectedFilterType === "city"
                  ? "Ex: Paris"
                  : selectedFilterType === "stake"
                  ? "Ex: Agriculture"
                  : ""
              }
              fullWidth
              size="small"
              className={styles.filterBtn}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </div>
          <div className={styles.filtersToSelectListContainer}>
            {selectableFiltersToDisplay.length > 0
              ? selectableFiltersToDisplay.map((filt) => (
                  <div className={styles.filterToSelectContainer} key={filt.id}>
                    <div>{filt.value}</div>
                    <UiverseCheckBox
                      id={filt.id}
                      activeFilters={props.activeFilters}
                      onChange={(isChecked: boolean) => {
                        if (isChecked) {
                          const foundFilter = allFilters.find(
                            (filter) => filter.id === filt.id
                          );
                          if (foundFilter) {
                            props.setActiveFilters((curr) => [
                              ...curr,
                              foundFilter,
                            ]);
                          }
                        } else {
                          props.setActiveFilters((curr) =>
                            curr.filter((filter) => filter.id !== filt.id)
                          );
                        }
                      }}
                      isChecked={
                        !!props.activeFilters.find(
                          (filter) => filter.id === filt.id
                        )
                      }
                    />
                  </div>
                ))
              : "Pas de filtre pour cette recherche"}
          </div>
        </div>
      </div>
    </div>
  );
}
