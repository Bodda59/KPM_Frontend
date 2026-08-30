import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./Footer.css";

function Footer() {
    const { theme } = useTheme();

    return (
        <footer className={`app-footer ${theme}-mode`}>
            <div className="footer-inner">
                <div className="footer-left">
                    <div className="footer-logo">Advansys</div>
                    <span className="footer-copyright">
                        © 2026 Advansys Intelligent Solutions. All rights reserved.
                    </span>
                </div>

                <div className="footer-right">
                    <a href="#" className="footer-link">Privacy Policy</a>
                    <a href="#" className="footer-link">Terms of Service</a>
                    <a href="#" className="footer-link">Support</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;