import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email,password,nickname);
    axios.post('http://13.209.48.48:8080/auth/signup', {
      email: email,
      password: password,
      nickname: nickname
    }, 
    )
    .then((response) => {
        if (response.data){
          console.log(response);
          alert('Register success')
          window.location.href = '/login';} // 로그인 화면으로 이동
        else window.location.href = '/mycalendar';
      }
      )
      .catch((error) => {
        console.error(error);
        setErrorMessage(errorMessage);
        alert(errorMessage);
        
      });
      console.log(localStorage.getItem('token'));
  };

  return (
    <div style={{textAlign:"center"}}>
      <form  style={{display:'flex', flexDirection:'column', alignItems:'center'}} onSubmit={handleSubmit}>
      <img src='/planus-logo.png' alt='Planus Logo' style={{paddingBottom:'5rem'}}/>
        <input 
          style={{margin:'5px'}}
          placeholder="ID"
          type="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <input 
          style={{margin:'5px'}}
          placeholder="email"
          type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input 
          style={{margin:'5px'}}
          placeholder="password"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button style={{display:'flex',margin:'5px', width:'100px'}} type="submit">Register</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      <Link to="/login">Already have an account? Login here</Link>
    </div>
  );
}

export default RegisterPage;