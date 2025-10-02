import React from 'react';
import './Sidebar.css';

// Dữ liệu cho các bộ lọc để dễ quản lý
const sortOptions = [
    { key: 'newest', label: '✨ Mới nhất' },
    { key: 'popular', label: '🔥 Thịnh hành' },
];

const priceRanges = [
    { key: 'all', label: 'Tất cả' },
    { key: 'range1', label: 'Dưới 1.000.000đ' },
    { key: 'range2', label: '1.000.000đ - 5.000.000đ' },
    { key: 'range3', label: 'Trên 5.000.000đ' },
];

function Sidebar({ filters, onFilterChange }) {
    // Hàm xử lý chung khi người dùng bấm vào một lựa chọn
    const handleFilterClick = (event, filterType, value) => {
        event.preventDefault(); // Ngăn trang reload
        onFilterChange(filterType, value);
    };

    return (
        <aside className="sidebar">
            <div className="filter-group">
                <h3>Sắp xếp</h3>
                <ul className="sort-options">
                    {sortOptions.map(option => (
                        <li key={option.key}>
                            <a href="#"
                                className={filters.sortBy === option.key ? 'active' : ''}
                                onClick={(e) => handleFilterClick(e, 'sortBy', option.key)}>
                                {option.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filter-group">
                <h3>Khoảng giá</h3>
                <ul className="price-range">
                    {priceRanges.map(range => (
                        <li key={range.key}>
                            <a href="#"
                                className={filters.priceRange === range.key ? 'active' : ''}
                                onClick={(e) => handleFilterClick(e, 'priceRange', range.key)}>
                                {range.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;