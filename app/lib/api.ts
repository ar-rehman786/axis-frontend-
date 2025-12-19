
// import axios from 'axios';


// export const apiClient = axios.create({
//   baseURL: process.env.API_BASE_URL || 'http://localhost:8080/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle responses
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Clear auth data if token is invalid
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('adminUser');
//       window.location.href = '/admin/login';
//     }
//     return Promise.reject(error);
//   }
// );



import axios from 'axios';


export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('adminToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Clear auth data if token is invalid
//       if (typeof window !== 'undefined') {
//         window.localStorage.removeItem('adminToken');
//         window.localStorage.removeItem('adminUser');
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );