import React, { useState } from 'react';
import './Input.css';

// Simple emoji mapping for common text patterns
const emojiMap = {
  '<3': '❤️',
  ':)': '😊',
  ':D': '😃',
  ':(': '😢',
  ':P': '😛',
  ';)': '😉',
  ':*': '😘',
  ':/': '😕',
  ':O': '😮',
  ':|': '😐',
  '>:(': '😠',
  ':-)': '😊',
  ':-(': '😞',
};

const Input = ({ setMessage, sendMessage, message, disabled = false }) => {
  // Convert text patterns to emojis
  const handleInputChange = ({ target: { value } }) => {
    // Simple conversion of known patterns to emojis
    let processedText = value;
    
    // Check for emoji patterns after a space or at the beginning of text
    for (const [pattern, emoji] of Object.entries(emojiMap)) {
      const regex = new RegExp(`(^|\\s)${pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")}`, 'g');
      processedText = processedText.replace(regex, `$1${emoji}`);
    }
    
    setMessage(processedText);
  };

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder={disabled ? "Connecting..." : "Type a message..."}
        value={message}
        onChange={handleInputChange}
        onKeyPress={event => event.key === 'Enter' && !disabled ? sendMessage(event) : null}
        disabled={disabled}
      />
      <button 
        className={`sendButton ${disabled ? 'disabled' : ''}`}
        onClick={e => sendMessage(e)}
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
};

export default Input;