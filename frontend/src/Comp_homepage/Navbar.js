import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoMain from "../images/DataVizX.png";

function Navbar() {
  const [click, setClick] = useState(false);
  // eslint-disable-next-line
  const [button, setButton] = useState(true);
  // eslint-disable-next-line
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const showButton = () => {
      if (window.innerWidth <= 1650) {
        setButton(false);
      } else {
        setButton(true);
      }
    };

    showButton();
    window.addEventListener("resize", showButton);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={logoMain} alt="DataVizX Logo" className="logo_img" />
            <span style={{ marginLeft: "5px" }}>DataVizX</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
