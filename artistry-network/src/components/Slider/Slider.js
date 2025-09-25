import React, { useState, useEffect, useRef } from 'react';
import './Slider.css';

// Component Slider nhận vào một prop là 'children',
// chính là các PostCard mà chúng ta đặt bên trong nó.
function Slider({ children }) {
    // useRef để tham chiếu đến div slider, giúp chúng ta đọc/thay đổi vị trí cuộn
    const sliderRef = useRef(null);

    // useState để lưu trữ số lượng dấu chấm cần tạo
    const [dots, setDots] = useState([]);
    // useState để theo dõi xem dấu chấm nào đang active
    const [activeIndex, setActiveIndex] = useState(0);

    // useEffect sẽ chạy để tính toán và tạo ra các dấu chấm
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        // Hàm debounce để tối ưu hiệu năng khi resize
        const debounce = (func, delay) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func(...args), delay);
            };
        };

        const calculateDots = () => {
            const itemCount = React.Children.count(children);
            const scrollWidth = slider.scrollWidth;
            const clientWidth = slider.clientWidth;

            if (scrollWidth <= clientWidth || itemCount === 0) {
                setDots([]); // Không cần dot nếu không thể cuộn
                return;
            }

            const dotCount = Math.ceil(scrollWidth / clientWidth);
            setDots(Array.from(Array(dotCount).keys()));
        };

        // Tính toán lần đầu và khi resize
        calculateDots();
        const debouncedCalculate = debounce(calculateDots, 300);
        window.addEventListener('resize', debouncedCalculate);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', debouncedCalculate);
        };
    }, [children]); // Chạy lại khi children thay đổi

    // Hàm xử lý khi cuộn
    const handleScroll = () => {
        const slider = sliderRef.current;
        const newIndex = Math.round(slider.scrollLeft / slider.clientWidth);
        setActiveIndex(newIndex);
    };

    // Hàm xử lý khi bấm vào một dấu chấm
    const handleDotClick = (index) => {
        const slider = sliderRef.current;
        slider.scrollTo({
            left: index * slider.clientWidth,
            behavior: 'smooth'
        });
    };

    return (
        <div className="slider-container">
            <div className="horizontal-slider" ref={sliderRef} onScroll={handleScroll}>
                {children}
            </div>
            <div className="slider-dots">
                {dots.map(index => (
                    <button
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;