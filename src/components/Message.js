import React from 'react';

function Message({ sharedScheduleId, content, title, onAccept, onReject }) {
  return (
    <div>
      <h4 style={{margin:'0'}}>{title}</h4>
      <p style={{margin:'0'}}>일정 내용 : {content}</p>
      <p style={{margin:'0'}}>이벤트 ID : {sharedScheduleId}</p>
      <button className='accept' onClick={() => onAccept(sharedScheduleId)}>승인</button>
      <button className='reject' onClick={() => onReject(sharedScheduleId)}>거절</button>
    </div>
  );
}

export default Message;
