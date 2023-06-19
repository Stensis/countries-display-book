import React, { useState, useEffect } from "react";
import { CountryItemView } from "./countryItem";
import Styles from "./countryData.module.css";

const API_URL = "https://restcountries.com/v2/all";
const ASC = "Asc";
const DESC = "Desc";

function countryData() {
  const [countryData, setCountryData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [hasFetchError, setHasFetchError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(API_URL)
      .then(async (res) => {
        const dataArr = await res.json();
        if (isMounted) {
          setIsFetching(false);
          setHasFetchError(false);
          setCountryData(dataArr);
          setOriginalData(dataArr);
        }
      })
      .catch((_err) => {
        if (isMounted) {
          setIsFetching(false);
          setHasFetchError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleSortData(type) {
    setSortType(type);
    if (type === ASC) {
      const sorted = [...countryData].sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setCountryData(sorted);
    } else if (type === DESC) {
      const sorted = [...countryData].sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      setCountryData(sorted);
    }
  }

}
export default countryData;
