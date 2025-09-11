function handlePostCardInteractions() {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        const mainIcon = button.querySelector('i');
        const mainText = button.querySelector('span');
        const reactionPopup = button.querySelector('.reaction-popup');
        if (!reactionPopup) return;

        let longPressTimer;
        let isLongPress = false;
        let leaveTimeout;

        // --- CÁC HÀM XỬ LÝ ---
        const setReaction = (iconElement) => {
            const reactionTitle = iconElement.getAttribute('title');
            mainIcon.className = iconElement.className.replace(' reaction-icon', '');
            mainText.textContent = reactionTitle;

            const activeColor = getComputedStyle(iconElement).color;
            button.style.color = activeColor;
            button.style.setProperty('--reaction-color', activeColor);

            button.classList.add('reacted');
        };

        const unsetReaction = () => {
            button.classList.remove('reacted');
            mainIcon.className = 'fa-regular fa-thumbs-up';
            mainText.textContent = 'Thích';
            button.style.color = ''; // Quay về màu mặc định
        };

        const showPopup = () => {
            clearTimeout(leaveTimeout);
            reactionPopup.classList.add('is-visible');
        };

        const hidePopup = () => {
            leaveTimeout = setTimeout(() => {
                reactionPopup.classList.remove('is-visible');
            }, 200);
        };

        // --- GÁN SỰ KIỆN ---

        // Xử lý hover trên Desktop
        button.addEventListener('mouseenter', showPopup);
        button.addEventListener('mouseleave', hidePopup);
        reactionPopup.addEventListener('mouseenter', () => clearTimeout(leaveTimeout));
        reactionPopup.addEventListener('mouseleave', () => reactionPopup.classList.remove('is-visible'));

        // Xử lý nhấn giữ trên Mobile
        button.addEventListener('touchstart', (e) => {
            isLongPress = false;
            longPressTimer = setTimeout(() => {
                e.preventDefault();
                showPopup();
                isLongPress = true;
            }, 500);
        }, { passive: true });

        button.addEventListener('touchend', () => clearTimeout(longPressTimer));

        // ---- LOGIC QUAN TRỌNG NHẤT NẰM Ở ĐÂY ----
        button.addEventListener('click', () => {
            // Nếu là hành động nhấn giữ để mở popup, thì không làm gì cả
            if (isLongPress) return;

            // KIỂM TRA: Nút đã có trạng thái "reacted" chưa?
            if (button.classList.contains('reacted')) {
                // NẾU ĐÃ CÓ -> BỎ THÍCH
                unsetReaction();
            } else {
                // NẾU CHƯA CÓ -> THÍCH (mặc định)
                const defaultReactionIcon = button.querySelector('.reaction-icon[data-reaction="like"]');
                setReaction(defaultReactionIcon);
            }
        });

        // Xử lý khi click vào một icon trong popup
        const reactionIcons = reactionPopup.querySelectorAll('.reaction-icon');
        reactionIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                event.stopPropagation();
                setReaction(icon);
                reactionPopup.classList.remove('is-visible');
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', handlePostCardInteractions);