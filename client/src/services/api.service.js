import axios from "axios";
const SERVER_ORIGIN = import.meta.env.VITE_SERVER_ORIGIN || import.meta.env.VITE_SERVER_ORIGIN_LOCAL

const apiService = axios.create({
    baseURL: `${SERVER_ORIGIN}/api/v1`,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true
})

apiService.interceptors.request.use(
     (config) => {
        const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).accessToken : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)

// interceptor for API calls
apiService.interceptors.response.use(   
    response => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(error)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await apiService.post('/auth/refresh')
                localStorage.setItem('userInfo', JSON.stringify(data));

                // update auth header with new accessToken
                apiService.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                return apiService(originalRequest); // retry original request
            } catch (error) {
                console.log('Token refresh failed', error);
                localStorage.removeItem('userInfo');
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
     }
)

export default apiService


