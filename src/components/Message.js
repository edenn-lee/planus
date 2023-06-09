import React from 'react';

function Message({message,onAccept, onReject}) {
  return (
    <div className='message-box'>
      <h4 style={{margin:'0'}}>{message.title}</h4>
      <p style={{margin:'0'}}>일정 내용 : {message.content}</p>
      <p style={{margin:'0'}}>이벤트 ID : {message.sharedScheduleId}</p>
      <button className='accept' onClick={() => onAccept(message)}>승인</button>
      <button className='reject' onClick={() => onReject(message)}>거절</button>
    </div>
  );
}

export default Message;