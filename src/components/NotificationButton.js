import React from 'react';

function NotificationButton({ onClick }) {
  return (
    <img src='/pngegg.png'
    className="notification-btn"
    onClick={onClick}
    alt='알림 수신함'
    color='white'
    width={'65px'}
    style={{margin:'0'}}
    >
    </img>
  );
}

export default NotificationButton;
