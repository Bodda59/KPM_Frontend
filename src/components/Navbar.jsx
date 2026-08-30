import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import iconLogo from "../assets/icon.png";
import "./Navbar.css";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`navbar navbar--${theme}`}>
            {/* Left: Logo */}
            <div className="navbar-left">
                <NavLink to="/lessons" className="navbar-logo-link">
                    <img src={iconLogo} alt="Logo" className="navbar-logo-img" />
                </NavLink>
            </div>

            {/* Center: Nav Links */}
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"} end>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/lessons" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>
                            Lessons Learned
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/processes" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>
                            Processes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>
                            Projects and Libraries
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Right: Icons */}
            <div className="navbar-right">
                {/* Search */}
                <button className="navbar-icon-btn" title="Search" aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>

                {/* Notification Bell */}
                <button className="navbar-icon-btn navbar-icon-btn--notif" title="Notifications" aria-label="Notifications">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="navbar-notif-dot" />
                </button>

                {/* Theme Toggle */}
                <button className="navbar-icon-btn" title="Toggle theme" aria-label="Toggle theme" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>

                {/* Account */}
                <button className="navbar-icon-btn navbar-account-btn" title="Account" aria-label="Account">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;