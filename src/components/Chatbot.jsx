import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';

const initialMessages = [
  { id: 1, type: 'bot', text: 'Hi! I am here to help you vote for the first time. Ask me anything!' }
];

const mockResponses = {
  default: "I am a simple demo, so I only know a little bit! But remember: voting is just making your choice. Look at the steps above to see how it works.",
  register: "Before you can vote, you need to put your name on the list. You can do this online or at a local office.",
  where: "You have to go to a specific building to vote. You can find this place on your town's website.",
  id: "Some places ask you to show a card with your name and picture (like a driver's license) before you vote. Check what your town needs!",
  absentee: "If you can't go to the building on Voting Day, you can ask them to mail you the paper to make your choice from home.",
  hello: "Hello! Are you ready to learn how to vote?",
  hi: "Hi there! What do you want to know about voting?"
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Mock AI response delay
    setTimeout(() => {
      let botResponse = mockResponses.default;
      const lowerInput = userMessage.text.toLowerCase();
      
      if (lowerInput.includes('register')) botResponse = mockResponses.register;
      else if (lowerInput.includes('where') || lowerInput.includes('place')) botResponse = mockResponses.where;
      else if (lowerInput.includes('id') || lowerInput.includes('identification')) botResponse = mockResponses.id;
      else if (lowerInput.includes('absentee') || lowerInput.includes('mail')) botResponse = mockResponses.absentee;
      else if (lowerInput.includes('hello')) botResponse = mockResponses.hello;
      else if (lowerInput.includes('hi')) botResponse = mockResponses.hi;

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="chat-icon" />
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title-area">
            <Bot className="bot-icon" />
            <div>
              <h4 className="chat-title">VotePath Assistant</h4>
              <span className="chat-status">Online</span>
            </div>
          </div>
          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message-wrapper ${msg.type}`}>
              {msg.type === 'bot' && (
                <div className="avatar bot">
                  <Bot size={16} />
                </div>
              )}
              <div className={`message-bubble ${msg.type}`}>
                {msg.text}
              </div>
              {msg.type === 'user' && (
                <div className="avatar user">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-form" onSubmit={handleSend}>
          <input
            type="text"
            className="chat-input"
            placeholder="Ask a question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="send-btn"
            disabled={!inputValue.trim()}
            aria-label="Send Message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
