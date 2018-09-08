import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li>
            <Link to="/" className="nav-link text-white">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/creator" className="nav-link">
              Creator
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
