import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://15.165.204.96:8080/api/auth/signup', {
      username: username,
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response.data);
        window.location.href = '/login'; // 로그인 화면으로 이동
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Failed to register');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      <Link to="/login">Already have an account? Login here</Link>
    </div>
  );
}

export default RegisterPage;