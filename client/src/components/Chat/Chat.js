import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

// Updated endpoint to use HTTP instead of HTTPS
const ENDPOINT = 'https://chat-backend1-zdy0.onrender.com';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    if (!location || !location.search) {
      console.error("Location or search parameters are missing");
      return;
    }

    const { name, room } = queryString.parse(location.search);
    
    if (!name || !room) {
      console.error("Name or room is missing in URL parameters");
      return;
    }

    setName(name);
    setRoom(room);

    // Initialize socket connection with options
    socket = io(ENDPOINT, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5
    });

    // Connect event
    socket.on('connect', () => {
      console.log('Connected to socket server');
      setConnected(true);
      setConnectionError(null);
      
      // Join the room once connected
      socket.emit('join', { name, room }, (error) => {
        if (error) {
          setConnectionError(error);
          alert(error);
        }
      });
    });

    // Connection error event
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnected(false);
      setConnectionError('Failed to connect to the server. Is it running?');
    });

    // Message event
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Room data event
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    // Cleanup function
    return () => {
      if (socket) {
        console.log('Disconnecting socket');
        socket.disconnect();
      }
    };
  }, [location]);

  // Function to send a message
  const sendMessage = (event) => {
    event.preventDefault();
    
    if (message && socket && connected) {
      console.log('Sending message:', message);
      socket.emit('sendMessage', message, (error) => {
        if (error) {
          console.error('Error sending message:', error);
          alert(error);
        } else {
          setMessage('');
        }
      });
    } else if (!connected) {
      alert('Not connected to chat server');
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} connected={connected} />
        {connectionError && (
          <div className="error-message">
            Error: {connectionError}
          </div>
        )}
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          disabled={!connected}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;