import React, { useState } from 'react';
import NotificationList from './NotificationList';

function Notification({isOpen, messages, setMessages, isAccepted,handleclose, setIsAccetpted, events}) {
  
  // const [showNotification, setShowNotification] = useState(false);

  // const handleClick = () => {
  //   setShowNotification(!showNotification);
  // };

  // const handleClose = () => {
  //   setShowNotification(false);
  // };

  return (
    <div className={`notification-container ${isOpen ? 'open' : ''}`}>
      <NotificationList
        messages={messages}
        setMessages={setMessages}
        setIsAccetpted={setIsAccetpted}
        isAccepted={isAccepted}
        events={events}
        isOpen={isOpen}
      />
    </div>
  );
}

export default Notification;
