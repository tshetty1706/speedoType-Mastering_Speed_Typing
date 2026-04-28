import "./Navbar.css";
import React, { useState } from "react";
import { SiSpeedypage } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdHome, MdLeaderboard, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Navbar( { activePlayer } ){
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };
  console.log(activePlayer)

  return(
    <div>
      {/* Header */}
      <header className="tt-header">
        <div className="tt-logo">
          <SiSpeedypage className="tt-logo-icon"/>
          <span className="tt-logo-text">speedoType</span>
        </div>
        
        {/* Menu Container */}
        <div className="tt-menu-container">
          <div className="tt-header-right">
            {activePlayer && (
              <div className="tt-bestScore">
                <h1>Best Score: <span>0</span></h1>
              </div>
            )}
            
            <div className="tt-menu-button" onClick={handleMenuToggle}>
              <GiHamburgerMenu className="tt-menu-icon" />
            </div>
          </div>
          
          {/* Dropdown Menu */}
          <div className={`tt-dropdown-menu ${menuOpen ? "tt-menu-open" : ""}`}>
            <div className="tt-menu-item" onClick={() => handleNavigation("/")}>
              <MdHome className="tt-menu-item-icon" />
              <span>Back to Home</span>
              <MdKeyboardArrowRight className="tt-menu-arrow" />
            </div>
            <div className="tt-menu-item" onClick={() => handleNavigation("/player")}>
              <MdLeaderboard className="tt-menu-item-icon" />
              <span>Players</span>
              <MdKeyboardArrowRight className="tt-menu-arrow" />
            </div>
          </div>
        </div>
        
      </header>
    </div>
  )
}
export default Navbar;