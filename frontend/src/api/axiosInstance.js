import axios from "axios";

console.log(import.meta.env.VITE_BACKEND_URL)
const axiosInstance=axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL||"http://localhost:8000",
    withCredentials: true,
})

export default axiosInstance