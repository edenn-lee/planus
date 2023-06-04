import React from 'react';

function Message({ sharedScheduleId, content, title, onAccept, onReject }) {
  return (
    <div style={{border:'2rem', borderBlockColor:'white', marginBottom:'2rem'}}>
      <p style={{margin:'0'}}>{title}</p>
      <h3 style={{margin:'0'}}>일정 내용 : {content}</h3>
      <h4 style={{margin:'0'}}>이벤트 ID : {sharedScheduleId}</h4>
      <button onClick={() => onAccept(sharedScheduleId)}>승인</button>
      <button onClick={() => onReject(sharedScheduleId)}>거절</button>
    </div>
  );
}

export default Message;
