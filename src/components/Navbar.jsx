// src/components/Navbar.jsx

import { Link } from 'react-router-dom';
import { useState } from 'react';
import './css/ThemeSwitch.css';
import ThemeSwitch from './ThemeSwitch';



function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ThemeSwitch />
                <Link to="/" className="logo">
                    <img src="/img/icons/logo.svg" alt="logo" />
                </Link>
                <ul className={`nav-links ${open ? 'open' : ''}`}>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/fleet">Автопарк</Link></li>
                    <li><a href="#">Услуги</a></li>
                    <li><a href="#">Условия</a></li>
                    <li><a href="#">Корп. клиентам</a></li>
                </ul>
                <button className="burger" onClick={() => setOpen(!open)}>
                    ☰
                </button>

            </div>
        </nav>
    );
}

export default Navbar;