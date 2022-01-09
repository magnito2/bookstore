import React from "react";
import { Link } from "react-router-dom";
import './styles.scss';

import Logo from '../../assets/Logo.png'

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="ekitabu Logo" />
                    </Link>
                </div>
            </div>

            <div className="callToActions">
                <ul>
                    <li>
                        <Link to="/registration">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>

        </header>
    );
};

export default Header;