import React from 'react';
import './Hero.css';

const Hero = ({ isSimpleMode }) => {
  return (
    <section className="hero animate-fade-in">
      <div className="hero-content text-center">
        <h2 className="hero-title">
          {isSimpleMode 
            ? "Your Easy Guide to Voting" 
            : "Navigate Your Election Journey with Confidence"}
        </h2>
        <p className="hero-subtitle">
          {isSimpleMode
            ? "Learn how to vote step by step. We make the rules easy to understand so your voice is heard."
            : "VotePath AI demystifies the electoral process. Discover interactive timelines, checklists, and an AI assistant designed to empower first-time and veteran voters alike."}
        </p>
      </div>
    </section>
  );
};

export default Hero;
