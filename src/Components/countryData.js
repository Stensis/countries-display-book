import React, { useState, useEffect } from "react";
import { CountryItemView } from "./countryItem";
import Styles from "./countryData.module.css";

const API_URL = "https://restcountries.com/v2/all";
const ASC = "Asc";
const DESC = "Desc";
const FILTER_TYPE_LITHUANIA = "filter-lithuania";
const FILTER_TYPE_OCEANIA = "filter-oceania";

function countryData() {
  // setting variables states
  const [countryData, setCountryData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [hasFetchError, setHasFetchError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [sortType, setSortType] = useState(undefined);
  const [filterType, setFilterType] = useState(undefined);

  // fetching the data from  the api server
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
  // sorting the country data by ascending and descending order
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
  //   filtering function to filter countrie in ocenia region and that are small than luthuania
  function handleFilterData(type) {
    setFilterType(type);
    if (type === FILTER_TYPE_LITHUANIA) {
      const lithuania = originalData.find(
        (country) => country.name === "Lithuania"
      );
      const filterSize = lithuania ? lithuania.area : 0;
      const filtered = [...originalData].filter(
        (country) => country.area < filterSize
      );
      setCountryData(filtered);
    } else if (type === FILTER_TYPE_OCEANIA) {
      const filtered = [...originalData].filter(
        (country) => country.region === "Oceania"
      );
      setCountryData(filtered);
    }
  }
}
export default countryData;
