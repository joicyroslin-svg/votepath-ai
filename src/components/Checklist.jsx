import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Volume2, Award } from 'lucide-react';
import './Checklist.css';

const tasks = [
  {
    id: 1,
    title: { standard: 'Check Eligibility', simple: 'Check if you can vote' },
    desc: { 
      standard: 'Ensure you meet the age, citizenship, and residency requirements, and verify your voter registration.',
      simple: 'Make sure you are allowed to vote and your name is on the list.' 
    }
  },
  {
    id: 2,
    title: { standard: 'Carry Valid ID', simple: 'Bring your ID' },
    desc: { 
      standard: 'Review local voter identification laws and ensure you have an acceptable form of ID ready.',
      simple: 'Make sure you have the right ID card (like a driver\'s license) to show them.' 
    }
  },
  {
    id: 3,
    title: { standard: 'Know Polling Location', simple: 'Know where to go' },
    desc: { 
      standard: 'Identify your officially designated polling station or drop-box location before Election Day.',
      simple: 'Find out the exact building you need to go to on Election Day.' 
    }
  },
  {
    id: 4,
    title: { standard: 'Understand Ballot', simple: 'Learn about the choices' },
    desc: { 
      standard: 'Research the candidates, propositions, and measures on your sample ballot beforehand.',
      simple: 'Read about the people and ideas you can vote for before you get there.' 
    }
  },
  {
    id: 5,
    title: { standard: 'Submit Vote', simple: 'Cast your ballot' },
    desc: { 
      standard: 'Follow the instructions carefully at the booth or on your mail-in ballot to cast your vote securely.',
      simple: 'Fill out the paper and turn it in to make your voice heard!' 
    }
  }
];

const Checklist = ({ isSimpleMode }) => {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('votePath_checklist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('votePath_checklist', JSON.stringify(completed));
  }, [completed]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(msg);
    }
  };

  const toggleTask = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter(taskId => taskId !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const progress = Math.round((completed.length / tasks.length) * 100);

  return (
    <section className="checklist-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="checklist-header">
        <h3 className="section-title">
          {isSimpleMode ? 'First-Time Voter To-Do List' : 'First-Time Voter Checklist'}
        </h3>
        <div className="progress-container">
          <div className="progress-text">
            <span>{progress}%</span>
            <span>{isSimpleMode ? 'Done' : 'Completed'}</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="checklist-items">
        {tasks.map(task => {
          const isDone = completed.includes(task.id);
          
          return (
            <div 
              key={task.id} 
              className={`checklist-item ${isDone ? 'completed' : ''}`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="checkbox-wrapper">
                {isDone ? (
                  <CheckSquare className="checkbox-icon checked" />
                ) : (
                  <Square className="checkbox-icon" />
                )}
              </div>
              <div className="task-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="task-title" style={{ margin: 0 }}>
                    {isSimpleMode ? task.title.simple : task.title.standard}
                  </h4>
                  <button 
                    className="speak-btn" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      speak(isSimpleMode ? task.desc.simple : task.desc.standard); 
                    }}
                    aria-label="Read description aloud"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="task-desc" style={{ marginTop: '0.25rem' }}>
                  {isSimpleMode ? task.desc.simple : task.desc.standard}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {progress === 100 && (
        <div className="badge-container animate-fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div className="voter-badge">
            <Award size={48} className="badge-icon" />
            <h4>Certified Ready to Vote!</h4>
            <p style={{ color: 'var(--text-muted)' }}>You have completed all the steps. Share this badge with your friends!</p>
            <button 
              className="hero-btn primary-btn" 
              style={{ marginTop: '1rem' }} 
              onClick={() => alert("Badge shared! (Demo)")}
            >
              Share Badge
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Checklist;
