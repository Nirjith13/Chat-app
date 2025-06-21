import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import offlineIcon from '../../icons/closeIcon.png'; // You may want to use a different icon for offline status
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room, connected = true }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img 
        className="onlineIcon" 
        src={connected ? onlineIcon : offlineIcon} 
        alt={connected ? "online icon" : "offline icon"} 
      />
      <h3>{room}</h3>
      {!connected && <span className="connectionStatus">(Disconnected)</span>}
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;