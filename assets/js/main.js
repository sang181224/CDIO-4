document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Header tự động thay đổi khi cuộn trang ---
    const header = document.querySelector('.header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Kiểm tra lần đầu khi tải trang
    }

    // --- 2. Logic cho Menu Mobile (Hamburger) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('show-nav');
        });

        // Thêm: Đóng menu khi bấm vào một link trong mobile nav
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('show-nav');
            });
        });
    }

    // --- 3. Hiệu ứng Hiện Card khi cuộn tới (Intersection Observer) ---
    const cards = document.querySelectorAll('.post-card');
    if (cards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(card => {
            observer.observe(card);
        });
    }
});