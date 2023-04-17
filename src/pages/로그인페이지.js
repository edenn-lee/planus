import { useState } from 'react';
import AuthAPI from '../components/AuthAPI';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    AuthAPI.login(email, password)
      .then((data) => {
        localStorage.setItem('accessToken', data.accessToken);
        window.location.href = '/protected';
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      <div>Don't have an account? <Link to="/register">Register</Link></div>
    </div>
  );
}

export default LoginPage;