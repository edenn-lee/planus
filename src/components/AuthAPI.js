// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/';

// const getAuthHeader = () => {
//   const token = localStorage.getItem('accessToken');
//   return token ? { Authorization: `${'Bearer '}${token}` } : {};
// };

// const AuthAPI = {
//   // 구글 로그인 API 호출
//   googleLogin: (code, state, registrationId) => {
//     const url = `${API_BASE_URL}/login/oauth2/code/${registrationId}?code=${code}&state=${state}`;
//     return axios.get(url, { headers: getAuthHeader() })
//       .then(response => response.data)
//       .catch(error => {
//         console.error(error);
//         throw error;
//       });
//   },

// // 로그인 API 호출
// login: (email, password) => {
//   const url = `${API_BASE_URL}/auth/login`;
//   return axios.post(url, { email, password })
//     .then(response => response.data)
//     .catch(error => {
//       console.error(error);
//       throw error;
//     });
// },

//   // JWT 토큰 갱신 API 호출
//   refreshToken: (refreshToken) => {
//     const url = `${API_BASE_URL}/auth/token`;
//     return axios.post(url, { refreshToken }, { headers: getAuthHeader() })
//       .then(response => response.data)
//       .catch(error => {
//         console.error(error);
//         throw error;
//       });
//   }
// }

// export default AuthAPI;
