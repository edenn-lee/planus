import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import NotificationList from '../components/NotificationList';
// import '../App.css';
function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://13.209.48.48:8080/auth/login', {
        email: email,
        password: password,
      }, );
      console.log(response);
      localStorage.setItem('token',response.data.accessToken);
      localStorage.setItem('user',email);
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get('http://13.209.48.48:8080/member/me', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      }, );
      console.log(response);
      localStorage.setItem('userNickname',response.data.nickname);
      localStorage.setItem('userId',response.data.id);

    } catch (error) {
      console.error(error);
    }
  };

  

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Login success');
      
      props.setIsAuthenticated(true);
    }
  }, [isAuthenticated, props]);

  if (props.IsAuthenticated) {
    return <Navigate to="/mycalendar" />;
  }

  return (
   <>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' , flexDirection:'column'}}>
    <img src='/planus-logo.png' alt='Planus Logo' style={{paddingBottom:'5rem' ,width:"100%",height:"30%"}}/>
    <div style={{ textAlign: 'center' }}>
      <form id="login" onSubmit={handleSubmit}>
        <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />

        <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />

        <button type="submit"
        style={{ fontSize: '1.3rem', padding: '0.5rem 1rem', marginTop:'2rem'}}>
          Login
          </button>
      </form>
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold'}}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  </div></> 
);

  
}

export default LoginPage;
