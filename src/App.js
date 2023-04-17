import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './components/Menu';
import MyCalendar from './components/MyCalendar';
import MenuButton from './components/MenuButton';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Group from './pages/Group';
import Setting from './pages/Setting';
// import AuthAPI from './Login/AuthAPI';
import LoginPage from './pages/LoginPage';
import RegisterPage from './components/RegisterPage';

// import PrivateRoute from './components/PrivateRoute';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   setIsAuthenticated(true);
    // }
    setIsAuthenticated(true);
  }, []);


  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  }

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  // const isAuthenticated =false; // TODO: 로그인 여부 확인 로직 구현
  const redirectPath = isAuthenticated ? '/mycalendar' : '/login';
  console.log(isAuthenticated);
  console.log(redirectPath);
  // setIsAuthenticated(true);
  // console.log(isAuthenticated);



  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <MenuButton onClick={handleMenuToggle} />
          <Menu isOpen={menuOpen} />
          <h1>Planus</h1>
        </header>

        <div className="App-body" onClick={handleMenuClose}>
          <Routes>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} IsAuthenticated={isAuthenticated}/>} />
            <Route path="/mycalendar" element={isAuthenticated ? <MyCalendar /> : <Navigate to="/login"/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to={redirectPath} />} />
            {/* <Route path="/" element={<Navigate to='/mycalendar' />} /> */}
          </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
