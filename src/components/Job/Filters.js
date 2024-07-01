import React, { useState } from "react";
import "../../styles/Job/Filters.css";

const Filters = () => {
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
    {
      name: "경력",
      options: ["신입", "경력 1년", "경력 5년", "경력 10년이상"],
    },
    {
      name: "학력",
      options: [
        "대학 졸업 4년",
        "대학 졸업 2,3년",
        "석사",
        "박사",
        "고졸",
        "학력무관",
      ],
    },
  ];

  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(
    Object.fromEntries(filters.map((filter) => [filter.name, []]))
  );

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
  };

  const handleReset = (filter) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [filter]: [],
    }));
  };

  const handleSearch = () => {
    console.log("검색을 수행합니다:", selectedOptions);
  };

  return (
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
                        checked={selectedOptions[filter.name].includes(option)}
                        onChange={() => handleOptionChange(filter.name, option)}
                      />
                      <label htmlFor={`${filter.name}-${option}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                  <div className="filter-actions">
                    <button
                      onClick={() => handleReset(filter.name)}
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
      {/* 검색 기능을 위한 입력란과 버튼입니다. */}
      <div className="searchdiv">
        <input
          type="text"
          placeholder="제목, 회사명 검색"
          className="searchInput"
        />
        <button onClick={handleSearch} className="searchButton">
          검색
        </button>
      </div>
    </div>
  );
};

export default Filters;
