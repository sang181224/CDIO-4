import React from 'react';
import { Link } from 'react-router-dom';
import './DraftCard.css';
import { apiClient } from '../../api/apiService';

// Hàm helper để chuyển đổi status
const getStatusInfo = (status) => {
    switch (status) {
        case 'pending': return { text: 'Đang chờ duyệt', className: 'status-pending' };
        case 'rejected': return { text: 'Bị từ chối', className: 'status-rejected' };
        case 'draft': return { text: 'Bản nháp', className: 'status-draft' }; // Có thể thêm style sau
        default: return { text: status, className: '' };
    }
};

function DraftCard({ draft }) {
    const statusInfo = getStatusInfo(draft.status);

    return (
        <div className="draft-card">
            <Link to={`/artwork/${draft.id}`} className="draft-card-image">
                <img src={`http://localhost:3000/${JSON.parse(draft.imageUrls)[0]}`} alt={draft.title} />
            </Link>
            <div className="draft-card-info">
                <h4>{draft.title}</h4>
                <p>Cập nhật lần cuối: {new Date(draft.updatedAt).toLocaleDateString('vi-VN')}</p>
            </div>
            <div className={`status-badge ${statusInfo.className}`}>
                {statusInfo.text}
            </div>
            <div className="draft-card-actions">
                <Link to={`/edit-artwork/${draft.id}`} className="btn-draft-edit">Chỉnh sửa</Link>
                <button className="btn-draft-delete">Xóa</button>
            </div>
        </div>
    );
}

export default DraftCard;