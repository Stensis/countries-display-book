import React from "react";
import Styles from "./Pagination.module.css";

export function Pagination({ onPageChange, currentPage, dataSize, pageSize }) {
  const totalPages = Math.ceil(dataSize / pageSize);

  return (
    <div className={Styles.paginationWrapper}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`${Styles.buttonPage} ${
            currentPage === index ? Styles.activeButton : ""
          }`}
          onClick={() => onPageChange(index)}
          type="button"
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
