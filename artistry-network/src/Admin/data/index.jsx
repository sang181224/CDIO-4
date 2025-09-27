// export const mockUsers = [
//   { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'Tên nghệ sĩ', status: 'Hoạt động', joinDate: '2024-01-15', artworks: 12 },
//   { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', role: 'Người mua', status: 'Hoạt động', joinDate: '2024-02-20', artworks: 0 },
//   { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', role: 'Tên nghệ sĩ', status: 'Tạm khóa', joinDate: '2024-01-10', artworks: 8 },
// ];

// export const mockArtworks = [
//   { id: 1, title: 'Tác phẩm 1', artist: 'Nguyễn Văn A', category: 'Hội họa', price: '3,500,000 VND', status: 'Đã duyệt', uploadDate: '2024-03-01', views: 1250, likes: 89 },
//   { id: 2, title: 'Tác phẩm 2', artist: 'Lê Văn C', category: 'Điêu khắc', price: '5,200,000 VND', status: 'Chờ duyệt', uploadDate: '2024-03-05', views: 850, likes: 45 },
//   { id: 3, title: 'Tác phẩm 3', artist: 'Nguyễn Văn A', category: 'Nhiếp ảnh', price: '2,800,000 VND', status: 'Từ chối', uploadDate: '2024-02-28', views: 320, likes: 12 },
// ];

// export const mockInvoices = [
//   { id: 1, customer: 'Trần Thị B', artwork: 'Tác phẩm 1', amount: '3,500,000 VND', date: '2024-03-10', status: 'Đã thanh toán', paymentMethod: 'Chuyển khoản' },
//   { id: 2, customer: 'Phạm Văn D', artwork: 'Tác phẩm 2', amount: '5,200,000 VND', date: '2024-03-12', status: 'Chờ thanh toán', paymentMethod: 'Ví điện tử' },
//   { id: 3, customer: 'Hoàng Thị E', artwork: 'Tác phẩm 3', amount: '2,800,000 VND', date: '2024-03-08', status: 'Hoàn tiền', paymentMethod: 'Thẻ tín dụng' },
// ];

// export const menuItems = [
//   { id: 'dashboard', label: 'Tổng quan', icon: 'BarChart3' },
//   { id: 'users', label: 'Quản lý người dùng', icon: 'Users' },
//   { id: 'content', label: 'Quản lý nội dung', icon: 'FileText' },
//   { id: 'invoices', label: 'Quản lý hóa đơn', icon: 'Receipt' },
// ];
// Menu sidebar
export const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "users", label: "Users" },
  { id: "content", label: "Content Management" },
  { id: "invoices", label: "Invoices" },
];

// Dữ liệu Dashboard
export const mockStats = {
  newUsers: 125,
  newArtworks: 342,
  revenue: 7850,
  views: 23450,
};

export const mockRecentUsers = [
  { id: 1, name: "Nguyễn Văn A", date: "2024-06-01" },
  { id: 2, name: "Trần Thị B", date: "2024-06-02" },
  { id: 3, name: "Lê Văn C", date: "2024-06-03" },
];

// Dữ liệu Users
export const mockUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "b@example.com",
    role: "User",
    status: "Pending",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "c@example.com",
    role: "User",
    status: "Banned",
  },
];

// Dữ liệu Content
export const mockArtworks = [
  { id: 1, title: "Bức tranh A", author: "Nguyễn Văn A", status: "Published" },
  { id: 2, title: "Bức tranh B", author: "Trần Thị B", status: "Draft" },
  { id: 3, title: "Bức tranh C", author: "Lê Văn C", status: "Published" },
];

// Dữ liệu Invoices
export const mockInvoices = [
  { id: "INV-001", customer: "Nguyễn Văn A", amount: "$120", status: "Paid" },
  { id: "INV-002", customer: "Trần Thị B", amount: "$200", status: "Unpaid" },
  { id: "INV-003", customer: "Lê Văn C", amount: "$150", status: "Paid" },
];
