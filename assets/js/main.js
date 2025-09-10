// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Lấy mobile nav elements bên trong function để đảm bảo chúng tồn tại khi script chạy
        const mobileNav = document.querySelector('.mobile-nav');
        const hamburger = document.querySelector('.hamburger-menu');

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Đóng menu di động sau khi nhấp vào link (nếu đang mở)
            if (mobileNav && mobileNav.classList.contains('show-nav')) {
                mobileNav.classList.remove('show-nav');
                hamburger.classList.remove('open');
            }
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (header) { // Thêm kiểm tra null an toàn
        if (window.scrollY > 50) {
            header.style.background = 'rgba(20, 20, 20, 0.95)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.9)';
        }
    }
});

// Animation on scroll for post cards (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries, observer) { // Thêm observer vào params callback
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.post-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

/* --- JavaScript cho Mobile Menu --- */
const hamburger = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) { // Thêm kiểm tra null an toàn
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('show-nav');
    });
}

