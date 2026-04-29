import React from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';
import './Header.css';

const Header = ({ isSimpleMode, setIsSimpleMode }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <CheckCircle2 className="logo-icon" />
          <span className="logo-text">VotePath AI</span>
        </div>
        
        <div className="mode-toggle">
          <span className={`mode-label ${!isSimpleMode ? 'active' : ''}`}>Standard</span>
          <button 
            className={`toggle-switch ${isSimpleMode ? 'on' : 'off'}`}
            onClick={() => setIsSimpleMode(!isSimpleMode)}
            aria-label="Toggle Simple Language Mode"
          >
            <span className="toggle-thumb"></span>
          </button>
          <span className={`mode-label ${isSimpleMode ? 'active' : ''}`}>Simple</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
