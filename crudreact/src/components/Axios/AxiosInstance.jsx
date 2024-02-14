import axios from "axios";
// const token=localStorage.getItem("jwttoken");
const AxiosInstance=axios.create({
    baseURL:'http://localhost:9090',
})
// if (token) {
//     AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }
export default AxiosInstance;