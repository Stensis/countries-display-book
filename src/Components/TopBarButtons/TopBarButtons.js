import React from "react";
import Styles from "./TopBarButtons.module.css";
import {
  ASC,
  DESC,
  FILTER_TYPE_LITHUANIA,
  FILTER_TYPE_OCEANIA,
} from "./Constants";

export function TopBarButtons({ onSort, onFilter, onReset, selectedSortType }) {
  return (
    <>
      <div className={Styles.filterButtons}>
        <Button onClick={() => onFilter(FILTER_TYPE_OCEANIA)}>
          Filter countries in Oceania
        </Button>

        <Button onClick={() => onFilter(FILTER_TYPE_LITHUANIA)}>
          Filter countries smaller than Lithuania
        </Button>

        <Button onClick={onReset}>Reset</Button>
      </div>

      <Button>
        Sort by Name:
        <select
          value={selectedSortType}
          onChange={(e) => onSort(e.target.value)}
          className={Styles.sortSelect}
        >
          <option value={null}></option>
          <option value={ASC}>{ASC}</option>
          <option value={DESC}>{DESC}</option>
        </select>
      </Button>
    </>
  );
}

function Button({ children, ...props }) {
  return (
    <button {...props} className={Styles.button} type="button">
      {children}
    </button>
  );
}
