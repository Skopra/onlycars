// src/components/ThemeSwitch.jsx

import { useEffect, useState } from 'react';
import './css/Navbar.css'; // или другой файл, где у тебя лежит CSS для toggle-switch

function ThemeSwitch() {
    const [light, setLight] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('light-theme', light);
    }, [light]);

    return (
        <div className="toggle-switch">
            <label className="switch-label">
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => setLight(!light)}
                    checked={light}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
}

export default ThemeSwitch;
