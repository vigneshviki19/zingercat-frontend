import axios from "axios";

const api = axios.create({
  baseURL: "https://zingercat-backend.onrender.com/api"
});

export default api;
