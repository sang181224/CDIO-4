export function timeAgo(isoDateString) {
    const now = new Date();
    const past = new Date(isoDateString);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 3) {
        const day = past.getDate().toString().padStart(2, '0');
        const month = (past.getMonth() + 1).toString().padStart(2, '0');
        const year = past.getFullYear();
        return `${day}/${month}/${year}`;
    } else if (days > 0) {
        return `Đã đăng ${days} ngày trước`;
    } else if (hours > 0) {
        return `Đã đăng ${hours} giờ trước`;
    } else if (minutes > 0) {
        return `Đã đăng ${minutes} phút trước`;
    } else {
        return `Vừa đăng`;
    }
}
