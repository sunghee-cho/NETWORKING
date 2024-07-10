import React from 'react';
import Post from './Post';

const MainContent = () => {
    return (
        <div className="main-content">
            {/* Post 컴포넌트를 렌더링 */}
            <Post />
            {/* 나중 추가 */}
        </div>
    );
};

export default MainContent;