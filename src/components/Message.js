import React, { useState } from 'react';

function Message({showGroupMessages, message, onAccept, onReject, groupMessages,handleAcceptGroup, handleRejectGroup }) {
  

  return (
    <>
    
    <div className="message-box">
      <h4 style={{ margin: '0' }}>{message.title}</h4>
      <p style={{ margin: '0' }}>일정 내용: {message.content}</p>
      <p style={{ margin: '0' }}>이벤트 ID: {message.sharedScheduleId}</p>
      <button className="accept" onClick={() => onAccept(message)}>
        승인
      </button>
      <button className="reject" onClick={() => onReject(message)}>
        거절
      </button>
    </div>

      

      {showGroupMessages && (
        
        <div>
          <div className="message-box">
      
    </div>
          {groupMessages.map((groupMessage) => (
            <div key={groupMessage.id}>
              <h4 style={{ margin: '0' }}>{groupMessage.groupId}</h4>
              <p style={{ margin: '0' }}>초대 코드{groupMessage.sharedCode}</p>
              <p style={{ margin: '0' }}>그룹 요청 ID : {groupMessage.id}</p>
              <button className="accept" onClick={() => handleAcceptGroup(groupMessage)}>
                승인
              </button>
              <button className="reject" onClick={() => handleRejectGroup(groupMessage)}>
                거절
              </button>
            </div>
          ))}
        </div>
      )}
    
    </>
  );
}

export default Message;
