import React from 'react';

const LeftSideb = () => {
    return (
        <div className="leftsidebar">
            <div className="profile">
                <img src="../assets/images/고양이 프로필.png" alt="Profile Picture" style={{ borderRadius: '50%' }} />
                <p style={{ fontWeight: 'bold' }}>사용자 이름</p>
                <button className="button">설정</button>
            </div>
        </div>
    );
};

export default LeftSideb;
