import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Checklist from './components/Checklist';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [isSimpleMode, setIsSimpleMode] = useState(() => {
    const saved = localStorage.getItem('votePath_isSimpleMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('votePath_isSimpleMode', JSON.stringify(isSimpleMode));
  }, [isSimpleMode]);

  return (
    <div className="app-container">
      <Header isSimpleMode={isSimpleMode} setIsSimpleMode={setIsSimpleMode} />
      <main className="main-content">
        <Hero isSimpleMode={isSimpleMode} />
        <Timeline isSimpleMode={isSimpleMode} />
        <Checklist isSimpleMode={isSimpleMode} />
      </main>
      <Chatbot />
    </div>
  );
}

export default App;
