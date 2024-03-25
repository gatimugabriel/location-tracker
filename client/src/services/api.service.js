import axios from "axios";

const apiService = axios.create({
    baseURL: "https://location-tracker-687k.onrender.com/api/v1",
    headers: {
        "Content-type": "application/json"
    }
})

apiService.interceptors.request.use((config) => {
        const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).accessToken : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)

export default apiService


