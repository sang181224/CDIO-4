import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { apiClient, pusherClient } from '../../api/apiService';
import './Chat.css';

const ChatWindow = ({ receiver, onClose }) => {
    const { user: currentUser } = useAuth(); // người gửi
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(''); // nội dung input
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null); // cuộn

    // Hàm cuộn xuống cuối
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // 1. Lấy lịch sử tin nhắn khi mở cửa sổ chat
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/messages/${receiver.id}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Lỗi khi tải tin nhắn:", error);
            } finally {
                // Bỏ trạng thái loading dù thành công hay lỗi
                setLoading(false);
            }
        };

        if (receiver?.id) {
            fetchMessages();
        }
    }, [receiver]);

    // 2. Tự động cuộn xuống khi có tin nhắn mới
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    // Lắng nghe Pusher cho tin nhắn mới (theo cặp user), cập nhật có tin nhắn mới
    useEffect(() => {

        //ngăn việc thực thi các đoạn code phía dưới khi dữ liệu chưa sẵn sàng, tránh gây ra lỗi.
        if (!currentUser?.id || !receiver?.id) return;

        //cùng "đăng ký" và "lắng nghe" trên cùng một kênh duy nhất
        const ids = [currentUser.id, receiver.id].sort((a, b) => a - b);
        const channelName = `private-chat-${ids[0]}-${ids[1]}`;
        const channel = pusherClient.subscribe(channelName);

        // lắng nghe sự kiện 'message:new', incomingMessage là dữ liệu tin nhắn mới nhận được từ server
        channel.bind('message:new', (incomingMessage) => {
            setMessages((prevMessages) => {
                // tránh trùng lặp tin nhắn
                if (prevMessages.find(msg => msg.id === incomingMessage.id)) {
                    return prevMessages;
                }
                return [...prevMessages, incomingMessage];
            });
        });

        // Hủy đăng ký và hủy lắng nghe khi currentUser/receiver thay đổi, tránh rò rỉ bộ nhớ
        return () => {
            channel.unbind_all();// hủy tất cả hàm lắng nghe sự kiện
            pusherClient.unsubscribe(channelName); // hủy đăng ký kênh để không nhận tin nhắn nữa
        };
    }, [currentUser, receiver]);


    // Gửi tin nhắn
    const handleSendMessage = async (e) => {
        // Ngăn form submit reload trang
        e.preventDefault();
        // .trim() sẽ loại bỏ các khoảng trắng ở đầu và cuối chuỗi.
        if (!newMessage.trim()) return;

        const messageData = {
            receiverId: receiver.id,
            content: newMessage,
        };

        setNewMessage('');

        try {
            const response = await apiClient.post('/messages', messageData);

            // Optimistic update (tạm thời thêm tin nhắn vào giao diện ngay lập tức)
            setMessages((prev) => [...prev, response.data]);

        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn:", error);
            alert("Không thể gửi tin nhắn, vui lòng thử lại.");
        }
    };

    // Nếu chưa có người nhận, không hiển thị gì
    if (!receiver) return null;

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-header-info">
                    <img src={receiver.avatarUrl} alt={receiver.name} className="chat-avatar" />
                    <span>{receiver.name}</span>
                </div>
                <button onClick={onClose} className="chat-close-btn">&times;</button>
            </div>
            <div className="chat-body">
                {loading ? (
                    <p>Đang tải tin nhắn...</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message-bubble ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}
                        >
                            <p>{msg.content}</p>
                            <span className="message-time">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <form className="chat-footer text-black" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    autoFocus
                />
                <button type="submit">Gửi</button>
            </form>
        </div>
    );
};

export default ChatWindow;
