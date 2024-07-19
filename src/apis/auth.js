import api from "./api";

// 로그인
export const login = (username, password) =>
  api.post(`/login?username=${username}&password=${password}`);

// export const login = async (username, password) => {
//   try {
//     const response = await api.post(
//       `/login?username=${username}&password=${password}`
//     );

//     const token = response.data.token;
//     console.log("토큰 저장:", token);
//     localStorage.setItem("token", token);
//   } catch (error) {
//     console.error('로그인 실패:', error);
//   }
// };

// 사용자 정보
export const info = () => api.get(`/users/info`);

// 회원 가입
export const join = (data) => api.post(`/users`, data);

// 회원 정보 수정
export const update = (data) => api.put(`/users`, data);

// 회원 탈퇴
export const remove = (userId) => api.delete(`/users/${userId}`);
