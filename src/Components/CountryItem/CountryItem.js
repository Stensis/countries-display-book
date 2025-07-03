import React from "react";
import Styles from "./CountryItem.module.css";

export function CountryItem({
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
      <div className={Styles.header}>
        {flags?.png && (
          <img className={Styles.flag} src={flags.png} alt={`Flag of ${name}`} />
        )}
        <h3 className={Styles.name}>{name}</h3>
      </div>

      <div className={Styles.details}>
        {callingCodes?.length > 0 && (
          <div className={Styles.row}>
            📞 <strong>Calling Code:</strong>{" "}
            <span className={Styles.value}>{callingCodes.join(", ")}</span>
          </div>
        )}

        {region && (
          <div className={Styles.row}>
            🌍 <strong>Region:</strong>{" "}
            <span className={Styles.value}>{region}</span>
          </div>
        )}

        {subregion && (
          <div className={Styles.row}>
            🧭 <strong>Sub-region:</strong>{" "}
            <span className={Styles.value}>{subregion}</span>
          </div>
        )}

        {population && (
          <div className={Styles.row}>
            👥 <strong>Population:</strong>{" "}
            <span className={Styles.value}>{population.toLocaleString()}</span>
          </div>
        )}

        {area && (
          <div className={Styles.row}>
            📐 <strong>Area:</strong>{" "}
            <span className={Styles.value}>{area.toLocaleString()} km²</span>
          </div>
        )}

        {timezones?.length > 0 && (
          <div className={Styles.row}>
            ⏰ <strong>Timezones:</strong>{" "}
            <span className={Styles.value}>{timezones.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
