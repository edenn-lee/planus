import React, { useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';



const API_ACCEPT = 'http://13.209.48.48:8080/api/messages/accept'
const API_MESSAGE_LIST = 'http://13.209.48.48:8080/api/messages/received'



function NotificationList() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    // 메시지 리스트를 서버에서 가져와서 messages 배열에 저장하는 코드

    axios.get(API_MESSAGE_LIST,{
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then(response=>{
        const messages = response.data.map(message => ({
            sharedScheduleId: message.sharedScheduleId,
            content: message.content,
            receiverName: message.receiverName,
            senderName: message.senderName,
            title: message.title,
            
        }));
        setMessages(messages);
        // console.log(messages);
        const filteredMessages = messages.filter(message => !message.isAccepted);

        setMessages(filteredMessages);
        // console.log(filteredMessages);




      }).catch(error => console.log(error));
  }, [messages]);

  const handleAccept = (sharedScheduleId) => {
    // const data = {sharedScheduleId: messageId}
    // console.log(data);
    console.log('sharedScheduleId');
    console.log(sharedScheduleId);
    axios.post(API_ACCEPT, JSON.stringify(sharedScheduleId),{
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type' : "application/json"
        }
      })
      .then(response => {
        
        const acceptedMessage = messages.find((message) => message.sharedScheduleId === sharedScheduleId);
        console.log(`메시지 "${acceptedMessage.content}"가 승인되었습니다.`);
    
      })
      .catch(error => console.log(error));
    };
    
  

  const handleReject = (sharedScheduleId) => {
    // 해당 messageId에 대한 메시지를 거절하는 코드
    const rejectedMessage = messages.find((message) => message.sharedScheduleId === sharedScheduleId);
    console.log(`메시지 "${rejectedMessage.content}"가 거절되었습니다.`);
  };

  return (
    <div>
      {messages.map((message) => (
        <Message
            sharedScheduleId={message.sharedScheduleId}
            title={message.title}
            content={message.content}
            onAccept={handleAccept}
            onReject={handleReject}
        />
      ))}
    </div>
  );
}

export default NotificationList;
