import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './components/Menu';
import MyCalendar from './components/MyCalendar';
import MenuButton from './components/MenuButton';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NotificationButton from './components/NotificationButton';
import Notification from './components/Notification';
import Group from './pages/Group';
import Setting from './pages/Setting';

import LoginPage from './pages/LoginPage';
import RegisterPage from './components/RegisterPage';

import axios from 'axios';


axios.defaults.baseURL = 'http://15.165.204.96:8080/api'; // 백엔드 API의 기본 URL 설정
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


// var express = require('express');
// var cors = require('cors')
// var app = express()

// app.use(cors())

// app.get('/products/:id',function(req,res,next){
//   res.json({msg:'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function() {
//   console.log('CORS-enabled web server listning on poirt 80')
// })


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccepted, setisAccepted] = useState(false);


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
          <Menu isOpen={menuOpen} />
          {isAuthenticated ? <p style={{fontSize:'15px'}}>user : {localStorage.getItem('user')}</p> : null}
          <h1 id="planus-title">Planus</h1>
          <NotificationButton onClick={handleNotificationToggle}/>
          <Notification isOpen={notificationOpen} handleclose={handleNotificationClose} isAccepted={true}/>
        </header>

        <div className="App-body" onClick={handleMenuClose} >
          <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} IsAuthenticated={isAuthenticated}/>} />
            <Route path="/mycalendar" element={isAuthenticated ? <MyCalendar /> : <Navigate to="/login" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to={redirectPath} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
