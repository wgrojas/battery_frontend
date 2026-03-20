import axios from "axios"

const API = axios.create({
  baseURL:"https://battery-monitor-93742821e808.herokuapp.com"
  //  baseURL:"http://localhost:5000"
})

API.interceptors.request.use((config)=>{

  // const token = localStorage.getItem("token")

  // if(token){
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  
  if (typeof localStorage !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
}

  return config
})

export default API
