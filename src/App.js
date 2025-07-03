import React from "react";
import CountryData from "./Components/CountryData";
import "./App.css"; // create this file for styling

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌍 Country Book</h1>
        <p className="app-subtitle">Explore the world, one country at a time</p>
      </header>
      <main className="app-main">
        <CountryData />
      </main>
    </div>
  );
}

export default App;
