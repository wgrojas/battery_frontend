import axios from "axios"

const API = axios.create({
  baseURL:"https://battery-monitor-93742821e808.herokuapp.com"
  //  baseURL:"http://localhost:5000"
})

API.interceptors.request.use((config)=>{

  const token = localStorage.getItem("token")

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default API

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000", // Cambia si tu backend corre en otra URL
// });

// // Interceptor para agregar token automáticamente
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;