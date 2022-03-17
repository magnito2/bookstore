import React from "react";
import { Link } from 'react-router-dom';
import {ReactComponent as FbIcon} from "../../assets/facebook.svg";
import {ReactComponent as InstaIcon} from "../../assets/instagram.svg";
import {ReactComponent as TwitterIcon} from "../../assets/twitter.svg";

import "./styles.scss";

const Footer = props => {
    return (
        <footer className="footer">
            <div className="footerNavigation">
                <div className="customerService">
                    <ul>
                        <li>
                            <Link to="/faq">Frequently asked questions</Link>
                        </li>
                        <li>
                            <Link to="/account">My Account</Link>
                        </li>
                    </ul>
                </div>
                <div className="shopWithUs">
                    <ul>
                        <li>
                            <Link to="/shippingAndRefund">
                                Shipping and refund
                            </Link>
                        </li>
                        <li>
                            <Link to="privacyPolicy">
                                Privacy policy
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="aboutUs">
                    <ul>
                        <li>
                            <Link to="/ourStory">
                                Our Story
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="social">
                    <ul>
                        <li>
                            <Link to="/fb">
                                <FbIcon className="socialIcon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/twitter">
                                <TwitterIcon className="socialIcon" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/instagram">
                                <InstaIcon className="socialIcon" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="wrap">
                @ Eduline 2022
            </div>
        </footer>
    )
}

export default Footer;