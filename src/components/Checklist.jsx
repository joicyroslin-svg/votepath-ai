import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
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
  const [completed, setCompleted] = useState([]);

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
                <h4 className="task-title">
                  {isSimpleMode ? task.title.simple : task.title.standard}
                </h4>
                <p className="task-desc">
                  {isSimpleMode ? task.desc.simple : task.desc.standard}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Checklist;
