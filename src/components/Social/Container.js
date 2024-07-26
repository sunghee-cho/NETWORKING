import React from 'react';
import LeftSideb from './LeftSideb';
import MainPost from './MainPost';
import RightSideb from './RightSideb';

const Container = () => {
    return (
        <div className="container">
            <LeftSideb />
            <MainPost />
            <RightSideb />
        </div>
    );
};

export default Container;