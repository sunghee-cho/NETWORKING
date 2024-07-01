import React from 'react';

const RightSideb = () => {
    return (
        <div className="rightsidebar">
            <div className="links">
                <div id="joblists">
                    <a href="#">Job 1</a>
                    <a href="#">Job 2</a>
                    <a href="#">Job 3</a>
                    <a href="#">Job 4</a>
                </div>
            </div>
            <div className="footer">
                <p style={{ fontWeight: 'bold' }}>
                    <span style={{ color: 'black' }}>NET</span><span style={{ color: '#12bdf3' }}>WORKING</span>
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
