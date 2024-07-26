import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import "../../styles/Job/Job.css";

Modal.setAppElement("#root");

const regionOptions = [
  "서울전체",
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

const educationOptions = [
  "학력무관",
  "고등학교졸업",
  "대학졸업(2,3년)",
  "대학졸업(4년)",
  "석사졸업",
  "박사졸업",
  "고등학교졸업이상",
  "대학졸업(2,3년)이상",
  "대학졸업(4년)이상",
  "석사졸업이상",
];

const jobTypeOptions = [
  "호텔·여행·항공",
  "외식업·식음료",
  "시설관리·경비·용역",
  "레저·스포츠·여가",
  "AS·카센터·주유",
  "렌탈·임대",
  "웨딩·장례·이벤트",
  "기타서비스업",
  "뷰티·미용",
  "전기·전자·제어",
  "기계·설비·자동차",
  "석유·화학·에너지",
  "섬유·의류·패션",
  "화장품·뷰티",
  "생활용품·소비재·사무",
  "가구·목재·제지",
  "농업·어업·광업·임업",
  "금속·재료·철강·요업",
  "조선·항공·우주",
  "기타제조업",
  "식품·가공·개발",
  "반도체·광학·LCD",
  "환경",
  "솔루션·ERP·CRM",
  "웹에이전시",
  "쇼핑몰·오픈마켓",
  "포털·인터넷·컨텐츠",
  "네트워크·통신·모바일",
  "하드웨어·장비",
  "정보보안·백신",
  "IT컨설팅",
  "게임",
  "은행·금융·저축",
  "대출·캐피탈·여신",
  "기타금융",
  "증권·보험·카드",
  "신문·잡지·언론사",
  "방송사·케이블",
  "연예·엔터테인먼트",
  "광고·홍보·전시",
  "영화·배급·음악",
  "공연·예술·문화",
  "출판·인쇄·사진",
  "캐릭터·애니메이션",
  "디자인·설계",
  "초중고·대학",
  "학원·어학원",
  "유아·유치원",
  "교재·학습지",
  "전문·기능학원",
  "의료(진료과목별)",
  "의료(병원종류별)",
  "제약·보건·바이오",
  "사회복지",
  "판매(매장종류별)",
  "판매(상품품목별)",
  "유통·무역·상사",
  "운송·운수·물류",
  "건설·건축·토목·시공",
  "실내·인테리어·조경",
  "환경·설비",
  "부동산·임대·중개",
  "정부·공공기관·공기업",
  "협회·단체",
  "법률·법무·특허",
  "세무·회계",
  "연구소·컨설팅·조사",
];

const experienceOptions = ["신입", "경력", "신입/경력", "경력무관"];

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [dropdowns, setDropdowns] = useState({
    region: false,
    jobType: false,
    experience: false,
    education: false,
  });

  const [filters, setFilters] = useState({
    region: [],
    jobType: [],
    experience: [],
    education: [],
    search: "",
  });

  const [tempFilters, setTempFilters] = useState({
    region: [],
    jobType: [],
    experience: [],
    education: [],
    search: "",
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/data`
        );
        console.log("API Response:", response.data);

        const parsedData =
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;
        console.log("Parsed Data:", parsedData);

        if (
          parsedData &&
          parsedData.jobs &&
          Array.isArray(parsedData.jobs.job)
        ) {
          setJobs(parsedData.jobs.job);
        } else {
          console.error("Invalid data format", parsedData);
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  const formatLocation = (location) => {
    const locations = location
      .split(",")
      .map((loc) => loc.split(" &gt; ").map((part) => part.trim()));
    if (locations.length > 0) {
      const primaryLocation = locations[0].join(" ");
      const remainingLocationsCount = locations.length - 1;
      if (remainingLocationsCount > 0) {
        return `${primaryLocation} 그 외 지역 ${remainingLocationsCount}개`;
      }
      return primaryLocation;
    }
    return location.trim();
  };

  const openModal = (url) => {
    setModalUrl(url);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalUrl("");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prevFilters) => {
      const updatedFilter = { ...prevFilters };
      if (name === "search") {
        updatedFilter[name] = value;
      } else {
        const filterArray = [...prevFilters[name]];
        if (filterArray.includes(value)) {
          filterArray.splice(filterArray.indexOf(value), 1);
        } else {
          filterArray.push(value);
        }
        updatedFilter[name] = filterArray;
      }
      return updatedFilter;
    });
  };

  const toggleDropdown = (name) => {
    setDropdowns((prevDropdowns) => ({
      region: false,
      jobType: false,
      experience: false,
      education: false,
      [name]: !prevDropdowns[name],
    }));
    setTempFilters(filters);
  };

  const applyFilters = (name) => {
    setFilters(tempFilters);
    toggleDropdown(name);
  };

  const resetFilters = (name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: [],
    }));
    setTempFilters((prevTempFilters) => ({
      ...prevTempFilters,
      [name]: [],
    }));
  };

  const renderDropdownOptions = (options, filterName) => {
    return options.map((option) => (
      <label key={option}>
        <input
          type="checkbox"
          name={filterName}
          value={option}
          onChange={handleFilterChange}
          checked={tempFilters[filterName].includes(option)}
        />{" "}
        {option}
      </label>
    ));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdowns({
        region: false,
        jobType: false,
        experience: false,
        education: false,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFilteredJobs = () => {
    return jobs.filter((job) => {
      return (
        (filters.region.length === 0 ||
          filters.region.some((region) =>
            job.position.location.name.includes(region)
          )) &&
        (filters.jobType.length === 0 ||
          filters.jobType.some((jobType) =>
            job.position.title.includes(jobType)
          )) &&
        (filters.experience.length === 0 ||
          filters.experience.some((experience) =>
            job.position["experience-level"].name.includes(experience)
          )) &&
        (filters.education.length === 0 ||
          filters.education.some((education) =>
            job.position["required-education-level"].name.includes(education)
          )) &&
        (filters.search === "" ||
          job.position.title
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          job.company.detail.name
            .toLowerCase()
            .includes(filters.search.toLowerCase()))
      );
    });
  };

  const filteredJobs = getFilteredJobs();

  const getFilterCount = (filterName) => filters[filterName].length;

  return (
    <div ref={dropdownRef}>
      <div className="filter-search">
        <div className="filter-container">
          {["region", "jobType", "experience", "education"].map(
            (filterName, index) => (
              <div key={index} className="filter-group">
                <button onClick={() => toggleDropdown(filterName)}>
                  {filterName === "region"
                    ? "지역별"
                    : filterName === "jobType"
                    ? "산업별"
                    : filterName === "experience"
                    ? "경력"
                    : "학력"}{" "}
                  {getFilterCount(filterName) > 0 &&
                    `(${getFilterCount(filterName)})`}
                </button>
                {dropdowns[filterName] && (
                  <div className="dropdown">
                    <div className="dropdown-labels">
                      {renderDropdownOptions(
                        filterName === "region"
                          ? regionOptions
                          : filterName === "jobType"
                          ? jobTypeOptions
                          : filterName === "experience"
                          ? experienceOptions
                          : educationOptions,
                        filterName
                      )}
                    </div>
                    <div className="dropdown-buttons">
                      <button onClick={() => applyFilters(filterName)}>
                        적용하기
                      </button>
                      <button onClick={() => resetFilters(filterName)}>
                        초기화
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <div className="search-container">
          <input
            type="text"
            name="search"
            placeholder="제목, 회사명 검색"
            onChange={handleFilterChange}
            value={tempFilters.search}
          />
          <button
            onClick={() => {
              setFilters(tempFilters);
            }}
          >
            검색
          </button>
        </div>
      </div>
      <ul className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <li
              key={index}
              className="job-item"
              onClick={() => openModal(job.url)}
            >
              <div className="job-header">
                <h2 className="job-title">{job.position.title}</h2>
                <span className="company-link">{job.company.detail.name}</span>
              </div>
              <div className="job-details">
                <span className="job-location">
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {formatLocation(job.position.location.name)}
                </span>
                <span className="job-industry">
                  <i className="fas fa-industry"></i>{" "}
                  {job.position.industry.name}
                </span>
                <span className="job-experience">
                  <i className="fas fa-briefcase"></i>{" "}
                  {job.position["experience-level"].name}
                </span>
                <span className="job-education">
                  <i className="fas fa-graduation-cap"></i>{" "}
                  {job.position["required-education-level"].name}
                </span>
                <span className="job-salary">
                  <i className="fas fa-dollar-sign"></i> {job.salary.name}
                </span>
                <span className="job-expiration-date">
                  <i className="fas fa-calendar-times"></i>{" "}
                  {new Date(
                    job["expiration-timestamp"] * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>No job listings available.</p>
        )}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Job Details"
        className="job-modal"
        overlayClassName="job-modal-overlay"
      >
        <button onClick={closeModal} className="close-modal-btn">
          Close
        </button>
        <iframe
          src={modalUrl}
          title="Job Details"
          className="job-modal-iframe"
        ></iframe>
      </Modal>
    </div>
  );
};

export default Job;