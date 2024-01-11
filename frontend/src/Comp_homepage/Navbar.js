import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoMain from '../images/DataVizX.png';
// import '../index.css'

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
    window.addEventListener('resize', showButton);

  }, []);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logoMain} alt="DataVizX Logo" className="logo_img" />
            <span style={{ marginLeft: '5px' }}>DataVizX</span>
          </Link>
          {/* <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/solutions'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Solutions
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/resources'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Resources
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/enterprise'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Enterprise
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/pricings'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
            </li>
          </ul> */}
        </div>
      </nav>

    </>
  );
}

export default Navbar;

