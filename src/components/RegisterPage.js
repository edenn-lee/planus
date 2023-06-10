import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email,password,nickname,phoneNumber);
    axios.post('http://13.209.48.48:8080/auth/signup', {
      email: email,
      password: password,
      nickname: nickname,
      phoneNumber: phoneNumber
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
          placeholder="닉네임"
          type="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <input 
          style={{margin:'5px'}}
          placeholder="이메일"
          type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input 
          style={{margin:'5px'}}
          placeholder="비밀번호"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input 
          style={{margin:'5px'}}
          placeholder="휴대전화(ex:01012345678)"
          type="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

        <button style={{display:'flex',margin:'5px', width:'100px'}} type="submit">Register</button>
        
      </form>
      {errorMessage && <div>{errorMessage}</div>}
      <Link to="/login">Already have an account? Login here</Link>
    </div>
  );
}

export default RegisterPage;