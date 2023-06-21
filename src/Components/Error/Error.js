import React from "react";
import Styles from "./Error.module.css";

export function Error() {
  return (
    <div className={Styles.errorViewContainer}> 
        Sorry, we encountered an error while fetching countries.
    </div>
  );
}
