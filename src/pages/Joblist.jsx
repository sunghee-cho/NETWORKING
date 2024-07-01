import React from "react";
import Header from "../components/Job/Header";
import Profile from "../components/Job/Profile";
import Banner from "../components/Job/Banner";
import Filters from "../components/Job/Filters";
import Joblist from "../components/Job/Job";
import "../App.css";

const JoblistPage = () => {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <div className="leftColumn">
          <Profile />
        </div>
        <div className="rightColumn">
          <Banner />
          <Filters />
          <Joblist />
        </div>
      </div>
    </div>
  );
};

export default JoblistPage;
