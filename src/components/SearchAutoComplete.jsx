import React, { useEffect, useState } from "react";
import "./SearchAutoComplete.css";
const SearchAutoComplete = () => {
  const [searchString, setSearchString] = useState();
  const [result, setResult] = useState([]);
  const [showData, setShowData] = useState(false);

  const fetchData = async () => {
    console.log("API CALLED!");

    const result = await fetch(
      "https://dummyjson.com/recipes/search?q=" + searchString
    );
    const data = await result.json();
    setResult(data?.recipes);
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchString]);

  return (
    <div className="search-container">
      <h1 id="search-container__heading">Search Auto Complete</h1>
      <input
        id="search-container__search-box"
        type="text"
        name="search"
        value={searchString}
        onBlur={() => {
          setTimeout(() => setShowData(false), 200);
        }}
        onFocus={() => {
          setShowData(true);
        }}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div id="search-container__result">
        {showData &&
          result.map((value) => {
            return (
              <span
                className="search-container__result-item"
                key={value.id}
                onClick={() => {
                  setSearchString(value?.name);
                }}
              >
                {value?.name}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default SearchAutoComplete;
