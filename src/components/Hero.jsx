import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import './Hero.css';

const Hero = ({ isSimpleMode }) => {
  const [zipCode, setZipCode] = useState('');

  const handleZipSubmit = (e) => {
    e.preventDefault();
    if (zipCode.length === 5) {
      alert(`Demo: Fetching local election data for ${zipCode}...`);
    } else {
      alert('Please enter a valid 5-digit zip code.');
    }
  };

  return (
    <section className="hero animate-fade-in">
      <div className="hero-content text-center">
        <h1 className="hero-title">
          VotePath AI
        </h1>
        <p className="hero-subtitle">
          Understand elections in a simple interactive way
        </p>
        
        <form onSubmit={handleZipSubmit} className="zip-form">
          <div className="zip-input-wrapper">
            <MapPin size={20} className="zip-icon" />
            <input 
              type="text" 
              placeholder="Enter Zip Code" 
              className="zip-input"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            />
            <button type="submit" className="zip-submit">Find Local Info</button>
          </div>
        </form>

        <div className="hero-buttons">
          <button 
            className="hero-btn primary-btn"
            onClick={() => document.querySelector('.timeline-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Process
          </button>
          <button 
            className="hero-btn secondary-btn"
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
          >
            Ask AI
          </button>
          <button 
            className="hero-btn outline-btn"
            onClick={() => document.querySelector('.checklist-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            First-Time Guide
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
