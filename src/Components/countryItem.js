import React from "react";
import Styles from "./countryItem.module.css";

export function CountryItemView({
  name,
  flags,
  callingCodes,
  region,
  subregion,
  population,
  area,
  timezones,
}) {
  return (
    <div className={Styles.countryItem}>
      <div>
        {flags ? (
          <img
            className={Styles.flag}
            src={flags.png}
            alt={`flag of ${name}`}
          />
        ) : null}
        <h3>{name}</h3>
      </div>

      {callingCodes && callingCodes.length > 0 ? (
        <div className={Styles.row}>
          Country calling code(s):{" "}
          <span className={Styles.rowSpan}>{callingCodes.join(",")}</span>
        </div>
      ) : null}

      {region ? (
        <div className={Styles.row}>
          Country region: <span className={Styles.rowSpan}>{region}</span>
        </div>
      ) : null}

      {subregion ? (
        <div className={Styles.row}>
          Country sub-region:{" "}
          <span className={Styles.rowSpan}>{subregion}</span>
        </div>
      ) : null}

      {population ? (
        <div className={Styles.row}>
          Population:
          <span className={Styles.rowSpan}>{population.toLocaleString()}</span>
        </div>
      ) : null}

      {area ? (
        <div className={Styles.row}>
          Area: <span className={Styles.rowSpan}>{area.toLocaleString()}</span>
        </div>
      ) : null}

      {timezones && timezones.length > 0 ? (
        <div className={Styles.row}>
          Timezone(s):{" "}
          <span className={Styles.rowSpan}>{timezones.join(",")}</span>
        </div>
      ) : null}
    </div>
  );
}
