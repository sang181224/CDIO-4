// File: src/components/Pagination/Pagination.js
import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) {
        return null; // Không hiển thị nếu chỉ có 1 trang
    }

    return (
        <nav className="pagination">
            {pageNumbers.map(number => (
                <a
                    key={number}
                    href="#"
                    className={currentPage === number ? 'active' : ''}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </a>
            ))}
        </nav>
    );
}
export default Pagination;  