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
    <div className={Styles.topBarRow}>
      <button onClick={() => onFilter(FILTER_TYPE_OCEANIA)} className={Styles.button}>
        🌊 Oceania
      </button>
      <button onClick={() => onFilter(FILTER_TYPE_LITHUANIA)} className={Styles.button}>
        📏 <small>Smaller than Lithuania</small>
      </button>
      <button onClick={onReset} className={Styles.button}>
        🔄 Reset
      </button>
      <div className={Styles.sortContainer}>
        <label htmlFor="sort" className={Styles.sortLabel}>Sort:</label>
        <select
          id="sort"
          value={selectedSortType || ""}
          onChange={(e) => onSort(e.target.value)}
          className={Styles.select}
        >
          <option value="">--</option>
          <option value={ASC}>A → Z</option>
          <option value={DESC}>Z → A</option>
        </select>
      </div>
    </div>
  );
}
