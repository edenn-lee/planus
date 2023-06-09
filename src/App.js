import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate,Link } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import MyCalendar from './components/MyCalendar';
import MenuButton from './components/MenuButton';
import NotificationButton from './components/NotificationButton';
import Notification from './components/Notification';
import LoginPage from './pages/LoginPage';
import RegisterPage from './components/RegisterPage';
import TodoList from './pages/TodoList';
import axios from 'axios';


axios.defaults.baseURL = 'http://13.209.48.48:8080/api'; // 백엔드 API의 기본 URL 설정
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


// const express = require('express');
// const app = express();

// CORS 설정
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccepted, setisAccepted] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showPersonalSchedule, setShowPersonalSchedule] = useState(true);
  const [events, setEvents] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      // 토큰 및 사용자 정보가 로컬 스토리지에 저장되어 있는 경우
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로그인 토큰 삭제
    localStorage.removeItem('user'); // 유저 정보 삭제
    localStorage.removeItem('userNickname'); // 유저 닉네임 삭제
    localStorage.removeItem('userId');
    setIsAuthenticated(false); // 인증 상태 변경
    
  };

  const handleSetEvents = (events) => {
    setEvents(events);
    // console.log(events);
  }

  const handleIsAccepted = (state) => {
    setisAccepted(state);
  }

  const handleSelectedGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleMessages = (messages) => {
    setMessages(messages);
  }

  const handleGroups = (groups) => {
    setGroups(groups);
    console.log(groups);
  };

  const handlePersonalScheduleCheckboxChange = (personal) => {
    setShowPersonalSchedule(!personal);
    // console.log(personal)
  };

  useEffect(()=>{
    console.log(showPersonalSchedule);
  },[showPersonalSchedule])

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    
  }

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleNotificationToggle = () => {
    // setNotificationOpen(!notificationOpen);
    setNotificationOpen(!notificationOpen);
    console.log(notificationOpen);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };
 

  const redirectPath = isAuthenticated ? '/mycalendar' : '/login';
  


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <MenuButton onClick={handleMenuToggle} />

          <Menu isOpen={menuOpen}
            handleSelectedGroup={handleSelectedGroup}
            selectedGroup={selectedGroup}
            groups={groups}
            setGroups={handleGroups}
            Personal={handlePersonalScheduleCheckboxChange}
            events = {events}
            setEvents={handleSetEvents}/>

          {isAuthenticated ? <p style={{fontSize:'15px'}}>user : {localStorage.getItem('userNickname')}</p> : null}
          
          
          {isAuthenticated && (<Link to="/login"><button onClick={handleLogout} style={{ marginLeft: '10px' }}>로그아웃</button></Link>)}
              
          <h1 id="planus-title">Planus</h1>
          <NotificationButton onClick={handleNotificationToggle}/>
          <Notification
            isOpen={notificationOpen}
            handleclose={handleNotificationClose}
            isAccepted={isAccepted}
            setIsAccepted={()=>handleIsAccepted}
            messages={messages}
            setMessages={handleMessages}
            events={events}/>

        </header>

        <div className="App-body" onClick={handleMenuClose} >
          <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} IsAuthenticated={isAuthenticated}/>} />
            <Route path="/mycalendar" element={isAuthenticated ?
            <MyCalendar
              handleIsAccepted={handleIsAccepted}
              isAccepted={isAccepted}
              selectedGroup={selectedGroup}
              Groups={groups}
              Personal={showPersonalSchedule}
              events={events}
              setEvents={handleSetEvents}/>
            : <Navigate to="/login" />} />
            <Route path="/todolist" element={<TodoList/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/" element={<Navigate to={redirectPath} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
