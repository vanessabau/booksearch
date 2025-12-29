import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink to="/" className="brand">
          React Reading List
        </NavLink>

        <nav className="nav-links" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "nav-item" + (isActive ? " is-active" : "")
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/saved"
            className={({ isActive }) =>
              "nav-item" + (isActive ? " is-active" : "")
            }
          >
            Saved
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
