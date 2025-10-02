import axios from "axios";
import Pusher from "pusher-js";

// Tạo client API với baseURL chính
export const apiClient = axios.create({
    baseURL: "http://localhost:3001/api", // hoặc đổi sang https://localhost:44332/api
});

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
    authEndpoint: 'http://localhost:3001/api/pusher/auth', // Endpoint xác thực của bạn
    auth: {
        // Sử dụng hàm để đảm bảo token luôn được cập nhật mới nhất
        // mỗi khi Pusher cần xác thực.
        headersProvider: () => ({
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }),
    },
});

// // Dữ liệu giả
// const dummyArtworks = [
//     {
//         "id": 1,
//         "title": "Vũ Điệu Dưới Ánh Hoàng Hôn",
//         "imageUrls": [
//             "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5"
//         ],
//         "price": 3500000,
//         "createdAt": "2025-09-28T10:00:00.000Z",
//         "description": "Sử dụng kỹ thuật sơn dầu đa lớp, tác phẩm này thể hiện sự chuyển động của ánh sáng và màu sắc trong khoảnh khắc cuối ngày.",
//         "stats": {
//             "reactions": 125,
//             "comments": 12
//         },
//         "author": {
//             "id": "user123",
//             "name": "Elena Rodriguez",
//             "avatarUrl": "https://images.unsplash.com/photo-1580489944761-15a19d654956"
//         },
//         "userReaction": "love",
//         "isOwner": true
//     },
//     {
//         "id": 2,
//         "title": "Ký Ức Xuyên Thấu",
//         "imageUrls": [
//             "https://images.unsplash.com/photo-1579965342575-5f3d15d35c5b"
//         ],
//         "price": 1800000,
//         "createdAt": "2025-09-28T08:00:00.000Z",
//         "description": "Một tác phẩm trừu tượng thể hiện sự mong manh của ký ức, với những đường nét đứt gãy nhưng lại hòa quyện.",
//         "stats": {
//             "reactions": 302,
//             "comments": 25
//         },
//         "author": {
//             "id": "user456",
//             "name": "Kenji Watanabe",
//             "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
//         },
//         "userReaction": null,
//         "isOwner": false
//     },
//     {
//         "id": 3,
//         "title": "Khúc Hát Của Biển",
//         "imageUrls": [
//             "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//         ],
//         "price": 4200000,
//         "createdAt": "2025-09-27T15:30:00.000Z",
//         "description": "Bằng tông xanh lam chủ đạo, bức tranh khắc họa sự bao la và nhịp điệu bất tận của đại dương.",
//         "stats": {
//             "reactions": 210,
//             "comments": 18
//         },
//         "author": {
//             "id": "user789",
//             "name": "Sophia Nguyen",
//             "avatarUrl": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
//         },
//         "userReaction": "like",
//         "isOwner": false
//     },
//     {
//         "id": 4,
//         "title": "Bản Giao Hưởng Mùa Đông",
//         "imageUrls": [
//             "https://images.unsplash.com/photo-1519682337058-a94d519337bc"
//         ],
//         "price": 2500000,
//         "createdAt": "2025-09-26T20:45:00.000Z",
//         "description": "Sắc trắng và xám hòa quyện tạo nên không gian tĩnh lặng, gợi nhớ những ngày đông lạnh giá.",
//         "stats": {
//             "reactions": 98,
//             "comments": 9
//         },
//         "author": {
//             "id": "user321",
//             "name": "Michael Brown",
//             "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
//         },
//         "userReaction": null,
//         "isOwner": false
//     },
//     {
//         "id": 5,
//         "title": "Sắc Hoa Bừng Nở",
//         "imageUrls": [
//             "https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
//         ],
//         "price": 3000000,
//         "createdAt": "2025-09-25T07:20:00.000Z",
//         "description": "Bức tranh đầy màu sắc, thể hiện sự hồi sinh và sức sống mãnh liệt của thiên nhiên vào mùa xuân.",
//         "stats": {
//             "reactions": 410,
//             "comments": 30
//         },
//         "author": {
//             "id": "user654",
//             "name": "Aria Chen",
//             "avatarUrl": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
//         },
//         "userReaction": "love",
//         "isOwner": false
//     }
// ];

// // Hàm giả lập lấy tác phẩm nổi bật
// export const getFeaturedArtworks = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(dummyArtworks.slice(0, 4));
//         }, 800);
//     });
// };

// // Hàm giả lập lấy tác phẩm mới nhất
// export const getLatestArtworks = () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(dummyArtworks.slice(2, 6));
//         }, 1200);
//     });
// };
