import React, { useState } from "react";
import "../../styles/Job/Job.css";

const Job = () => {
  const sampleJobs = [
    {
      company_id: 1,
      company_name: "유모델러",
      job_description: "유니티(Unity) 엔진 개발자 경력 채용",
      company_location: "서울",
      career: "신입",
      education: "고졸",
      deadline: "2024-07-12",
      job_field: "소프트웨어 개발",
    },
    {
      company_id: 2,
      company_name: "웨이블",
      job_description: "React.js/ReactNative 개발자 경력 채용",
      company_location: "서울",
      career: "신입",
      education: "고졸",
      deadline: "2024-07-11",
      job_field: "프론트엔드 개발",
    },
    {
      company_id: 3,
      company_name: "애드크라운",
      job_description: "프론트엔드 개발자 경력 모집",
      company_location: "경기",
      career: "경력",
      education: "대졸(4년)",
      deadline: "2024-07-16",
      job_field: "프론트엔드 개발",
    },
    {
      company_id: 4,
      company_name: "테크리드",
      job_description: "클라우드 솔루션 아키텍트 모집",
      company_location: "서울",
      career: "경력",
      education: "석사",
      deadline: "2024-12-01",
      job_field: "클라우드",
    },
    {
      company_id: 5,
      company_name: "데이터릭스",
      job_description: "데이터 사이언티스트 채용 공고",
      company_location: "부산",
      career: "신입",
      education: "대졸(4년)",
      deadline: "2024-08-20",
      job_field: "데이터",
    },
    {
      company_id: 6,
      company_name: "코드브릭",
      job_description: "백엔드 개발자 (Node.js) 모집",
      company_location: "강원",
      career: "경력",
      education: "학력무관",
      deadline: "2024-09-15",
      job_field: "백엔드 개발",
    },
  ];

  const filters = [
    {
      name: "분야별",
      options: [
        "소프트웨어 개발",
        "웹 퍼블리셔",
        "웹 디자인",
        "프론트엔드 개발",
        "백엔드 개발",
        "클라우드",
        "데이터",
      ],
    },
    {
      name: "지역별",
      options: [
        "서울",
        "인천",
        "경기",
        "강원",
        "충북",
        "충남",
        "전북",
        "전남",
        "경북",
        "경남",
        "부산",
        "제주",
      ],
    },
    { name: "경력", options: ["신입", "경력", "관계없음"] },
    {
      name: "학력",
      options: [
        "학력무관",
        "초졸이하",
        "중졸",
        "고졸",
        "대졸(2~3년)",
        "대졸(4년)",
        "석사",
        "박사",
      ],
    },
  ];

  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(
    Object.fromEntries(filters.map((filter) => [filter.name, []]))
  );
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  const handleFilterClick = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleOptionChange = (filter, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [filter]: prevOptions[filter].includes(option)
        ? prevOptions[filter].filter((item) => item !== option)
        : [...prevOptions[filter], option],
    }));
  };

  const handleApply = () => {
    setActiveFilter(null);
    applyFilters();
  };

  const handleReset = () => {
    setSelectedOptions(
      Object.fromEntries(filters.map((filter) => [filter.name, []]))
    );
    setFilteredJobs(sampleJobs);
    setActiveFilter(null);
  };

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = sampleJobs.filter(
      (job) =>
        job.company_name.toLowerCase().includes(lowercasedFilter) ||
        job.job_description.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredJobs(filteredData);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const applyFilters = () => {
    let results = sampleJobs;
    Object.keys(selectedOptions).forEach((filterName) => {
      if (selectedOptions[filterName].length > 0) {
        switch (filterName) {
          case "분야별":
            results = results.filter((job) =>
              selectedOptions[filterName].includes(job.job_field)
            );
            break;
          case "지역별":
            results = results.filter((job) =>
              selectedOptions[filterName].includes(job.company_location)
            );
            break;
          case "경력":
            results = results.filter((job) =>
              selectedOptions[filterName].some((option) =>
                job.career.includes(option)
              )
            );
            break;
          case "학력":
            results = results.filter((job) =>
              selectedOptions[filterName].includes(job.education)
            );
            break;
        }
      }
    });
    setFilteredJobs(results);
  };

  return (
    <div className="jobPage">
      <div className="filters">
        <div className="filterdiv">
          {filters.map((filter) => (
            <div key={filter.name} className="filter-container">
              <div className="filter-header">
                <button
                  onClick={() => handleFilterClick(filter.name)}
                  className="filterButton"
                >
                  {filter.name}
                  {selectedOptions[filter.name].length > 0 && (
                    <span className="selectedCount">
                      {" "}
                      {selectedOptions[filter.name].length}
                    </span>
                  )}
                  <span
                    className={`arrow ${
                      activeFilter === filter.name ? "up" : "down"
                    }`}
                  ></span>
                </button>
                {activeFilter === filter.name && (
                  <div className="filter-options">
                    {filter.options.map((option) => (
                      <div key={option} className="filter-option">
                        <input
                          type="checkbox"
                          id={`${filter.name}-${option}`}
                          name={`${filter.name}-${option}`}
                          value={option}
                          checked={selectedOptions[filter.name].includes(
                            option
                          )}
                          onChange={() =>
                            handleOptionChange(filter.name, option)
                          }
                        />
                        <label htmlFor={`${filter.name}-${option}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="filter-actions">
                      <button
                        onClick={() => handleReset()}
                        className="resetButton"
                      >
                        초기화
                      </button>
                      <button onClick={handleApply} className="applyButton">
                        적용하기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="searchdiv">
          <input
            type="text"
            placeholder="제목, 회사명 검색"
            className="searchInput"
            value={searchTerm}
            onChange={handleChange}
          />
          <button onClick={handleSearch} className="searchButton">
            검색
          </button>
        </div>
      </div>
      <div className="joblist">
        {filteredJobs.map((job) => (
          <div className="jobItem" key={job.company_id}>
            <h3 className="jobTitle">{job.job_description}</h3>
            <div className="companyName">{job.company_name}</div>
            <div className="jobDetails">
              <p>
                <i className="fas fa-cogs"></i> {job.job_field}
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> {job.company_location}
              </p>
              <p>
                <i className="fas fa-briefcase"></i> {job.career}
              </p>
              <p>
                <i className="fas fa-graduation-cap"></i> {job.education}
              </p>
              <p>
                <i className="fas fa-clock"></i> {job.deadline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
