// services/apiService.js
import axios from 'axios';

// Create an instance of axios with a base URL
const api = axios.create({
    baseURL: 'http://192.168.1.5:8080/java/api/', // Your backend API URL
    timeout: 10000, // Optional: Set a timeout for requests
});

// const api = axios.create({
//     baseURL: 'http://192.168.214.116:8080/java/api/', // Your backend API URL
//     timeout: 10000, // Optional: Set a timeout for requests
// });

export default api;
