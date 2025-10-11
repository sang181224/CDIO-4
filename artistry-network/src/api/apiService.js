import axios from "axios";
import Pusher from "pusher-js";

// Tạo client API với baseURL chính
export const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
})

// interceptor (tự động gắn token nếu có)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Cấu hình Pusher
export const pusherClient = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    authEndpoint: 'http://localhost:3000/api/pusher/auth', // Endpoint xác thực của bạn
    auth: {
        // Sử dụng hàm để đảm bảo token luôn được cập nhật mới nhất
        // mỗi khi Pusher cần xác thực.
        headersProvider: () => ({
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }),
    },
});

