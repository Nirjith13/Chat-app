import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

// Create a wrapper component to pass location to Chat
const ChatWithLocation = () => {
  const location = useLocation();
  return <Chat location={location} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<ChatWithLocation />} />
      </Routes>
    </Router>
  );
};

export default App;