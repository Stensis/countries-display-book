import React from "react";
import CountryData from "./Components/countryData";

function App() {
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        padding: "16px",
      }}
    >
      <h1 style={{ padding: "10px" }}>Country Book</h1>
      <CountryData />
    </div>
  );
}

export default App;
