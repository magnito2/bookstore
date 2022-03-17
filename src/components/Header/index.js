import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";
import "./styles.scss";

import Logo from "../../assets/Logo.png";
import {ReactComponent as CloseMenu} from "../../assets/x.svg";
import {ReactComponent as MenuIcon} from "../../assets/menu.svg";
import Search from "../Search";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state)
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="ekitabu Logo" />
          </Link>
        </div>
        <nav className={click ? "active" : ""}>
          <ul className="nav-options">
            <div className="navigators">
              <li className="option" onClick={closeMobileMenu}>
                <Link to="/">Home</Link>
              </li>
              <li className="option" onClick={closeMobileMenu}>
                <Link to="/search">Search</Link>
              </li>

              <li className="option" onClick={closeMobileMenu}>
                <Link to="/cart">
                  Your Cart ({ totalNumCartItems })
                </Link>
              </li>

              <li className="option">
                <Search />
              </li>
            </div>
            <div className="accountActions">
            {currentUser && [
                  <li className="option" key='1' onClick={closeMobileMenu}>
                    <Link to="/dashboard">My Account</Link>
                  </li>,
                  <li className="option" key='2' onClick={closeMobileMenu}>
                    <span onClick={() => signOut()}>Logout</span>
                  </li>
              ]}
              {!currentUser && [
                  <li className="option" key='3' onClick={closeMobileMenu}>
                    <Link to="/registration">Register</Link>
                  </li>,
                  <li className="option" key='4' onClick={closeMobileMenu}>
                    <Link to="/login">Login</Link>
                  </li>
              ]}
            </div>
          </ul>
        </nav>

        <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
