import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Checklist from './components/Checklist';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [isSimpleMode, setIsSimpleMode] = useState(false);

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
