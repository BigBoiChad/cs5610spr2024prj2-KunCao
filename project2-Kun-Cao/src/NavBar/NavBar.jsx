import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file for NavBar styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/app" className="nav-link">Game</Link>
        </li>
        <li className="nav-item">
          <Link to="/more" className="nav-link">More</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
