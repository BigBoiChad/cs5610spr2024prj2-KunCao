import React from 'react';
import './Header.css'

function Header({ title1, title2 }) {

    
    return (
        <header className="cover">
            <div className="containerHome container_solid">
                <div className="title_wrapper">
                    <h1>{title1}</h1>
                    <h2>{title2}</h2>
                </div>
            </div>
            <div className="containerHome container_image">
                <div className="title_wrapper">
                    <h1>{title1}</h1>
                    
                </div>
            </div>
        </header>
    );

}

export default Header;
