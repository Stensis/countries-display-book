import React from "react";
import Styles from "./Error.module.css";

export function Error() {
  return (
    <div className={Styles.errorViewContainer}>
      <div className={Styles.content}>
        <div className={Styles.emoji}>🚫</div>
        <h2 className={Styles.title}>Oops! Something went wrong</h2>
        <p className={Styles.message}>
          We encountered an error while fetching countries. <br />
          Please check your internet connection or try again later.
        </p>
      </div>
    </div>
  );
}
