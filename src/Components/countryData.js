import React, { useState, useEffect } from "react";
import { CountryItemView } from "./countryItem";
import Styles from "./countryData.module.css";

const API_URL = "https://restcountries.com/v2/all";

const ASC = "Asc";
const DESC = "Desc";
const FILTER_TYPE_LITHUANIA = "filter-lithuania";
const FILTER_TYPE_OCEANIA = "filter-oceania";

function CountryData() {
  const [countryData, setCountryData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [hasFetchError, setHasFetchError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [sortType, setSortType] = useState(undefined);
  const [filterType, setFilterType] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20; // Number of countries per page

  useEffect(() => {
    let isMounted = true;

    fetch(API_URL)
      .then(async (res) => {
        const dataArr = await res.json();
        if (isMounted) {
          setIsFetching(false);
          console.log("dataArr", dataArr);
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
      const sorted = [...countryData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCountryData(sorted);
    } else if (type === DESC) {
      const sorted = [...countryData].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setCountryData(sorted);
    }
  }

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

  function handleResetData() {
    setSortType(undefined);
    setFilterType(undefined);
    setCountryData(originalData);
  }

  const renderedData = sortType || filterType ? countryData : originalData;
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = renderedData.slice(startIndex, endIndex);

  function handlePageChange(pageIndex) {
    setCurrentPage(pageIndex);
  }

  if (hasFetchError) {
    return <ErrorView />;
  }

  if (isFetching) {
    return <LoadingDataView />;
  }

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

      {paginatedData.length > 0 ? (
        <div >
          <ul className={Styles.ul}>
            {paginatedData.map((country) => (
              <li className={Styles.li} key={country.name}>
                <CountryItemView  className={Styles.itemCard} {...country} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptyDataView />
      )}

      {/* Pagination */}
      <div className={Styles.buttonPageContainer}>
        {Array.from({ length: Math.ceil(renderedData.length / pageSize) }).map(
          (_item, index) => (
            <button
              key={index}
              className={`${Styles.buttonPage} ${
                currentPage === index ? Styles.activeButton : ""
              }`}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// loads when there is no country found
function EmptyDataView() {
  return <div className={Styles.emptyView}>No countries found.</div>;
}

// load when there is an error fetching the data
function ErrorView() {
  return (
    <div className={Styles.errorViewContainer}>
      <p className={Styles.errorView}>
        Encountered an error while fetching countries.
      </p>
    </div>
  );
}

// loads before the data is loaded
function LoadingDataView() {
  return (
    <div className={Styles.loadingDataView}>
      Loading countries... <div className={Styles.loadingIcon}></div>
    </div>
  );
}

export default CountryData;
