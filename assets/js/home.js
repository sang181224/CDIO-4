document.addEventListener('DOMContentLoaded', () => {

    /**
     * Hàm Debounce: Chìa khóa để tối ưu hiệu năng.
     * Nó sẽ ngăn một hàm chạy liên tục, thay vào đó, nó sẽ đợi người dùng
     * ngừng hành động (ví dụ: resize) một khoảng thời gian rồi mới chạy hàm đó một lần.
     */
    function debounce(func, delay = 250) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Xử lý tất cả các slider có trên trang
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(container => {
        const slider = container.querySelector('.horizontal-slider');
        const dotsContainer = container.querySelector('.slider-dots');

        if (!slider || !dotsContainer) return;

        let dots = [];

        // Hàm để tạo các dấu chấm điều hướng
        const createDots = () => {
            dotsContainer.innerHTML = ''; // Luôn xóa các chấm cũ trước khi tạo mới
            const scrollWidth = slider.scrollWidth;
            const clientWidth = slider.clientWidth;

            // Nếu nội dung không dài hơn khung nhìn, không cần dấu chấm
            if (scrollWidth <= clientWidth) return;

            const dotCount = Math.ceil(scrollWidth / clientWidth);

            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.dataset.index = i;
                dotsContainer.appendChild(dot);
            }
            dots = Array.from(dotsContainer.children); // Cập nhật lại danh sách dots
            updateActiveDot(); // Cập nhật trạng thái active cho dot đầu tiên
        };

        // Hàm cập nhật màu cho dấu chấm đang active
        const updateActiveDot = () => {
            if (dots.length === 0) return;
            const scrollLeft = slider.scrollLeft;
            const clientWidth = slider.clientWidth;
            const activeIndex = Math.round(scrollLeft / clientWidth);

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        };

        // Gán sự kiện click cho container của các dấu chấm
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.matches('.dot')) {
                const index = parseInt(e.target.dataset.index);

                // CẬP NHẬT: Đổi màu dot ngay lập tức khi click
                dots.forEach(dot => dot.classList.remove('active'));
                e.target.classList.add('active');

                // Cuộn slider đến vị trí tương ứng
                slider.scrollTo({
                    left: index * slider.clientWidth,
                    behavior: 'smooth'
                });
            }
        });

        // Cập nhật dot active khi người dùng tự cuộn slider
        slider.addEventListener('scroll', debounce(updateActiveDot, 100));

        // Tạo các dấu chấm lần đầu (sau một khoảng trễ nhỏ để đảm bảo layout đã render xong)
        setTimeout(createDots, 100);

        // CẬP NHẬT: Chỉ chạy lại hàm createDots sau khi người dùng ngừng resize
        window.addEventListener('resize', debounce(createDots, 300));
    });
});