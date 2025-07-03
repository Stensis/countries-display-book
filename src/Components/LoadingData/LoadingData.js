import React from "react";
import Styles from "./LoadingData.module.css";

export function LoadingData() {
  return (
    <div className={Styles.loadingData}>
      <div className={Styles.loadingIcon}></div>
      <p className={Styles.loadingText}>Loading countries...</p>
    </div>
  );
}
