import React, { useState, useEffect } from "react";
import Styles from "./CountryData.module.css";
import { CountryItem } from "./CountryItem/CountryItem";
import { LoadingData } from "./LoadingData/LoadingData";
import { EmptyData } from "./EmptyData/EmptyData";
import { Error } from "./Error/Error";
import { Pagination } from "./Pagination/Pagination";
import { TopBarButtons } from "./TopBarButtons/TopBarButtons";
import {
  ASC,
  DESC,
  FILTER_TYPE_LITHUANIA,
  FILTER_TYPE_OCEANIA,
} from "./TopBarButtons/Constants";

const API_URL = "https://restcountries.com/v2/all";
const PAGE_SIZE = 20;  

function CountryData() {
  const [countryData, setCountryData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [hasFetchError, setHasFetchError] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [sortType, setSortType] = useState(undefined);
  const [filterType, setFilterType] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(0);


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
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = renderedData.slice(startIndex, endIndex);

  function handlePageChange(pageIndex) {
    setCurrentPage(pageIndex);
  }

  if (hasFetchError) {
    return <Error />;
  }

  if (isFetching) {
    return <LoadingData />;
  }

  return (
    <div>
      <div className={Styles.buttonContainer}>
      {paginatedData.length > 0 ? <TopBarButtons
          onSort={handleSortData}
          onReset={handleResetData}
          onFilter={handleFilterData}
          selectedSortType={sortType}
        /> : null}
      </div>

      {paginatedData.length > 0 ? (
        <ul className={Styles.ul}>
          {paginatedData.map((country) => (
            <li className={Styles.li} key={country.name}>
              <CountryItem {...country} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyData />
      )}

      <div className={Styles.paginationContainer}>
        <Pagination
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          dataSize={renderedData.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default CountryData;
