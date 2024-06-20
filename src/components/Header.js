import React from 'react';
import '../styles/css_social.css';

const Header = () => {
    return (
        <div className="header">
            <div className="logo"><span style={{color: 'black'}}>NET</span>WORKING</div>
            <div className="menu">
                <a href="#">Page1</a>
                <a href="#">Page2</a>
                <a href="#">Page3</a>
                <button className="button">Button</button>
            </div>
        </div>
    );
};

export default Header;