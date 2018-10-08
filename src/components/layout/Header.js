import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <Link className="link logo" to="/">
        <span>Form</span>Builder
      </Link>
      <nav>
        <ul className="nav">
          <li>
            <Link className="link" to="/creator">
              Creator
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
