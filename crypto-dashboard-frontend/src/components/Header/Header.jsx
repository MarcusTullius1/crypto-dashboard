import React from "react";
import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="header__content">
                <a href="/" className="header__logo">Crypto Dashboard</a>
                <nav className="header__nav">
                    <ul>
                        <li><a href="/">Dashboard</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
