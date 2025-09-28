import 'bootstrap/dist/css/bootstrap.css';
import '/src/components/Home/style.css';
import '/src/main.css';
import './navbar.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import './navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav id="Nv" className={`navbar`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/Plotwist">
            <img src='/src/logo/wlogo.png' alt="Plotwist" />
          </Link>
        </div>

        <div className="navbar-search">
          <Search />
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/Plotwist" className={location.pathname === '/Plotwist' ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/Plotwist/Movies" className={location.pathname === '/Plotwist/Movies' ? 'active' : ''}>
                Movies
              </Link>
            </li>
            <li>
              <Link to="/Plotwist/TV" className={location.pathname === '/Plotwist/TV' ? 'active' : ''}>
                TV Shows
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;