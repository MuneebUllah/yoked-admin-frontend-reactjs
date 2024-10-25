import axios from 'axios';
import Swal from 'sweetalert2';

export const Base_URL = "https://apis.yokedapp.com/api/";

export const Request = axios.create({
  baseURL: Base_URL,
});

// Configure Headers
export function configureHeaders() {
  Request.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
}

// Configure Interceptors
export const configureInterceptors = () => {
  Request.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return Request(originalRequest); 
      }
      if (error.response && error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      return Promise.reject(error);
    },
  );
}
