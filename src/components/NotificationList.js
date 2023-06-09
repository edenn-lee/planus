import React, { useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import './Notification.css';



const API_MESSAGE_LIST = `http://13.209.48.48:8080/api/messages/received/`



function NotificationList() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');


  const getMessages = () => {
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
          id: message.id
      }));
      setMessages(messages);
      console.log(messages);
      console.log(response);
      const filteredMessages = messages.filter(message => !message.isAccepted);

        setMessages(filteredMessages);
        // console.log(filteredMessages);




      }).catch(error => console.log(error));
  }, []);

  const handleAccept = (message) => {
    // const data = {sharedScheduleId: messageId}
    // console.log(data);
    console.log('sharedScheduleId');
    console.log(message.sharedScheduleId);
    let id = Number(message.sharedScheduleId);
      axios.post(`http://13.209.48.48:8080/api/messages/accept/${message.id}`, Number(message.sharedScheduleId),{
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type' : "application/json"
          }
        })
        .then(response => {
          console.log(response);
          const acceptedMessage = messages.find((message) => message.id === id);
          console.log(`메시지 "${acceptedMessage.content}"가 승인되었습니다.`);
      
        })
        .catch(error => console.log(error));
      };
    
  

  const handleReject = (message) => {
    let id = Number(message.sharedScheduleId);
    // 해당 messageId에 대한 메시지를 거절하는 코드
    const rejectedMessage = messages.find((message) => message.id === id);
    console.log(`메시지 "${rejectedMessage.content}"가 거절되었습니다.`);
  };

  return (
    <div>
      {messages.map((message) => (
        <Message
            message={message}
            onAccept={handleAccept}
            onReject={handleReject}
        />
      ))}
    </div>
  );
}

export default NotificationList;
