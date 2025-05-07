import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle">☰</button>
        <h2>Parkinson's Detector</h2>
      </div>
      
      <div className="header-right">
        <div className="notification-icon">
          <span>🔔</span>
          <span className="notification-badge">3</span>
        </div>
        
        <div 
          className="user-profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="user-avatar">DS</div>
          <span className="user-name">Dr. Smith</span>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <button>Profile</button>
              <button>Settings</button>
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}