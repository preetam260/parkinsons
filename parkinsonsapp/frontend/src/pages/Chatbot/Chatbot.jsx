import { useState } from 'react';
import './Chatbot.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your Parkinson\'s Disease Assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  console.log("Gemini API Key:", import.meta.env.VITE_GEMINI_API_KEY);

  // Store API key in .env
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const _handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await model.generateContent({
        contents: [{
          role: "user",
          parts: [{ text: `As a Parkinson's Disease specialist, answer concisely: ${inputValue}` }]
        }]
      });

      const response = await result.response;
      const botResponse = {
        id: messages.length + 2,
        text: response.text(),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: `Error: ${error.message || "Please try again later."}`,
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Parkinson's Disease Assistant</h1>

      <div className="chat-window">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.sender}`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="typing-indicator">...</div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your question here..."
          onKeyPress={(e) => e.key === 'Enter' && _handleSendMessage()}
          disabled={isLoading}
        />
        <button onClick={_handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>

      <div className="suggested-questions">
        <p>Try asking:</p>
        <button onClick={() => setInputValue('What are the early signs of Parkinson\'s?')}>
          What are the early signs of Parkinson's?
        </button>
        <button onClick={() => setInputValue('How accurate is EEG-based Parkinson\'s detection?')}>
          How accurate is EEG-based Parkinson's detection?
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
