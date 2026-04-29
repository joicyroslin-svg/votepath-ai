import React, { useState } from 'react';
import { UserPlus, FileText, Megaphone, Vote, Calculator, Award, ChevronRight } from 'lucide-react';
import './Timeline.css';

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: { standard: 'Registration', simple: 'Sign Up' },
    desc: {
      standard: 'Citizens register to vote, ensuring they meet eligibility requirements before deadlines.',
      simple: 'Put your name on the list so you are allowed to vote.'
    }
  },
  {
    id: 2,
    icon: FileText,
    title: { standard: 'Candidate Filing', simple: 'Leaders Sign Up' },
    desc: {
      standard: 'Individuals officially declare their candidacy for specific offices and meet filing requirements.',
      simple: 'People who want to be leaders put their names on the ballot.'
    }
  },
  {
    id: 3,
    icon: Megaphone,
    title: { standard: 'Campaign', simple: 'Campaigning' },
    desc: {
      standard: 'Candidates share their platforms, debate, and rally to win the support of the electorate.',
      simple: 'Leaders share their ideas and ask people to vote for them.'
    }
  },
  {
    id: 4,
    icon: Vote,
    title: { standard: 'Voting Day', simple: 'Election Day' },
    desc: {
      standard: 'Registered voters cast their ballots at designated polling stations or via mail.',
      simple: 'The day you go and make your choice.'
    }
  },
  {
    id: 5,
    icon: Calculator,
    title: { standard: 'Counting', simple: 'Counting Votes' },
    desc: {
      standard: 'Election officials securely tally all valid ballots cast during the voting period.',
      simple: 'Workers carefully count everyone\'s choices.'
    }
  },
  {
    id: 6,
    icon: Award,
    title: { standard: 'Results', simple: 'Winners Announced' },
    desc: {
      standard: 'Final tallies are certified and winners are officially declared for each office.',
      simple: 'We find out who got the most votes and won.'
    }
  }
];

const Timeline = ({ isSimpleMode }) => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="timeline-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h3 className="section-title">
        {isSimpleMode ? 'How Elections Work' : 'The Election Process Timeline'}
      </h3>
      
      <div className="timeline-container">
        <div className="timeline-nav">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            const isPast = step.id < activeStep;
            
            return (
              <React.Fragment key={step.id}>
                <button 
                  className={`timeline-step-btn ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => setActiveStep(step.id)}
                  aria-label={`Step ${step.id}: ${isSimpleMode ? step.title.simple : step.title.standard}`}
                >
                  <div className="step-icon-wrapper">
                    <Icon className="step-icon" />
                  </div>
                  <span className="step-label">
                    {isSimpleMode ? step.title.simple : step.title.standard}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`timeline-connector ${isPast ? 'active' : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        <div className="timeline-content-card">
          {steps.map(step => (
            step.id === activeStep && (
              <div key={step.id} className="step-details animate-fade-in">
                <div className="step-header">
                  <div className="step-number">Step {step.id}</div>
                  <h4>{isSimpleMode ? step.title.simple : step.title.standard}</h4>
                </div>
                <p>{isSimpleMode ? step.desc.simple : step.desc.standard}</p>
                
                <div className="step-actions">
                  <button 
                    className="btn-primary"
                    disabled={activeStep === steps.length}
                    onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length))}
                  >
                    {isSimpleMode ? 'Next Step' : 'Continue'} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
