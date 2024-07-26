import React from "react";
import Profile from "../components/Job/Profile";
import Banner from "../components/Job/Banner";
import Job from "../components/Job/Job";
import "../styles/Job/Joblist.css";

const JoblistPage = () => {
  return (
    <div className="app">
      <div className="main">
        <div className="leftColumn">
          <Profile />
        </div>
        <div className="rightColumn">
          <Banner />
          <Job />
        </div>
      </div>
      <div className="powered-by">
        Powered by <a href="http://www.saramin.co.kr" target="_blank" rel="noopener noreferrer">취업 사람인</a>
      </div>
    </div>
  );
};

export default JoblistPage;