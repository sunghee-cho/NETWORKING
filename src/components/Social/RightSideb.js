import React, { useEffect, useState } from 'react';
import bannerImage from '../../assets/images/rightsideb_banner.jpg';
import '../../styles/Social/RightSideb.css';
import { fetchJobListings } from '../Social/Socialapi';

const RightSideb = () => {
    const [topJobs, setTopJobs] = useState([]);

    useEffect(() => {
        const loadTopJobs = async () => {
            try {
                const data = await fetchJobListings();
                if (data.jobs && Array.isArray(data.jobs.job)) {
                    setTopJobs(data.jobs.job.slice(0, 8));  //구인공고 가져오기
                }
            } catch (error) {
                console.error('Error loading top jobs:', error);
            }
        };

        loadTopJobs();
    }, []);

    return (
        <div className="rightsidebar">
            <div className="links">
                <h2 className="section-title">가장 빠른 구인공고</h2>
                <div id="joblists-social">
                    {topJobs.map((job, index) => (
                        <a href={job.url} key={index} target="_blank" rel="noopener noreferrer" className="job-item-social">
                            <div className="job-details-social">
                                <div className="job-title-social">{job.position.title}</div>
                                <div className="company-name-social">{job.company.detail.name}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <div className="banner">
                <img src={bannerImage} alt="Banner" className="banner-image" />
            </div>
            <div className="footer">
                <p style={{ fontWeight: 'bold' }}>
                    <span style={{ color: 'black' }}>NET</span>
                    <span style={{ color: '#12bdf3' }}>WORKING</span>
                </p>
                <div>
                    <a href="#">🔗</a>
                    <a href="#">🔗</a>
                    <a href="#">🔗</a>
                </div>
            </div>
        </div>
    );
};

export default RightSideb;