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
  //   reset button function to default
  function handleResetData() {
    setSortType(undefined);
    setFilterType(undefined);
    setCountryData(originalData);
  }
  //   rendering the filted data and sorted data
  const renderedData = sortType || filterType ? countryData : originalData;

  if (hasFetchError) {
    return <ErrorView />;
  }

  if (isFetching) {
    return <LoadingDataView />;
  }
  // RENDERING DATA
  return (
    <div>
      <div className={Styles.buttonContainer}>
        <div className={Styles.filterButtons}>
          <button
            className={Styles.button}
            onClick={() => handleFilterData(FILTER_TYPE_OCEANIA)}
          >
            Filter countries in Oceania
          </button>

          <button
            className={Styles.button}
            onClick={() => handleFilterData(FILTER_TYPE_LITHUANIA)}
          >
            Filter countries smaller than Lithuania
          </button>
          <button className={Styles.button} onClick={handleResetData}>
            Reset
          </button>
        </div>

        <button className={Styles.button}>
          Sort by Name:
          <select
            value={sortType}
            onChange={(e) => handleSortData(e.target.value)}
            className={Styles.sortSelect}
          >
            <option value={null}></option>
            <option value={ASC}>{ASC}</option>
            <option value={DESC}>{DESC}</option>
          </select>
        </button>
      </div>

      {renderedData.length > 0 ? (
        <ul className={Styles.ul}>
          {renderedData.map((country) => (
            <li className={Styles.li} key={country.name}>
              <CountryItemView {...country} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyDataView />
      )}
    </div>
  );
//   defined a function to show empty data views
function EmptyDataView() {
    return <div className={Styles.emptyView}>No countries found.</div>;
  }
}
export default countryData;
