import React, { useState } from 'react';
import NotificationList from './NotificationList';

function Notification({isOpen}) {
  
  // const [showNotification, setShowNotification] = useState(false);

  // const handleClick = () => {
  //   setShowNotification(!showNotification);
  // };

  // const handleClose = () => {
  //   setShowNotification(false);
  // };

  return (
    <div className={`notification-container ${isOpen ? 'open' : ''}`}>
      <NotificationList/>
    </div>
  );
}

export default Notification;
