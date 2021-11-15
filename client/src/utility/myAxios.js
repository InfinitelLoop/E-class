import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://e-class-40901-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

axiosInstance.defaults.headers.common['Authorization'] = "AUTH TOKEN!!"

export default axiosInstance;