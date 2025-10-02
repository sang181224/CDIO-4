import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { apiClient, pusherClient } from '../../api/apiService';
import './Chat.css';

const ChatWindow = ({ receiver, onClose }) => {
    const { user: currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Hàm cuộn xuống dưới cùng mỗi khi có tin nhắn mới
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Lấy tin nhắn khi mở cửa sổ chat
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/messages/${receiver.id}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        // Chỉ fetch khi có người nhận
        if (receiver?.id) {
            fetchMessages();
        }
    }, [receiver]);

    // Cuộn xuống dưới cùng khi có tin nhắn mới
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Thiết lập Pusher để nhận tin nhắn mới
    useEffect(() => {
        if (!currentUser?.id || !receiver?.id) return;

        // Sắp xếp ID để đảm bảo tên channel nhất quán dù ai là người gửi hay nhận 
        const ids = [currentUser.id, receiver.id].sort((a, b) => a - b);
        const channelName = `private-chat-${ids[0]}-${ids[1]}`;

        const channel = pusherClient.subscribe(channelName);

        // Lắng nghe sự kiện 'new-message' từ server 
        channel.bind('new-message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Cleanup khi component unmount hoặc receiver thay đổi 
        return () => {
            pusherClient.unsubscribe(channelName);
            channel.unbind_all();
        };
    }, [currentUser, receiver]);


    // Hàm gửi tin nhắn 
    const handleSendMessage = async (e) => {
        e.preventDefault();
        // nếu tin nhắn rỗng thì không gửi
        if (!newMessage.trim()) return;

        const messageData = {
            receiverId: receiver.id,
            content: newMessage,
        };

        try {
            // Gửi tin nhắn lên server
            const response = await apiClient.post('/messages', messageData);
            // Không cần thêm tin nhắn ở đây nữa vì Pusher sẽ lo việc đó
            // setMessages((prev) => [...prev, response.data]);
            // sau khi gửi xong thì xóa ô nhập tin nhắn
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Nếu không có người nhận thì không hiển thị gì
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
                            <span className="message-time">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <form className="chat-footer" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                />
                <button type="submit">Gửi</button>
            </form>
        </div>
    );
};

export default ChatWindow;
