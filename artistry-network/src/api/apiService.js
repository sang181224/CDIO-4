import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:3100/api',
});