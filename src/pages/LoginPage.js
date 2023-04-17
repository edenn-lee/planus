import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    const { setIsAuthenticated, isAuthenticated } = props;
    event.preventDefault();
  
    try {
      const response = await axios.post('http://15.165.204.96:8080/api/auth/signin', {
        username: username,
        password: password,
      });
  
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
  
      setIsAuthenticated(true, () => {
        if (!isAuthenticated) {
          console.log('isAuthenticated is false');
          return;
        }
  
        console.log('Login success');
        window.location.href = '/mycalendar';
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <div>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default LoginPage;
