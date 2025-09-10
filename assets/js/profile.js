document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.profile-tabs .tab-item');
    const panes = document.querySelectorAll('.profile-content .tab-pane');

    if (tabs.length > 0 && panes.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();

                const currentActiveTab = document.querySelector('.tab-item.active');
                if (currentActiveTab) currentActiveTab.classList.remove('active');

                const currentActivePane = document.querySelector('.tab-pane.active');
                if (currentActivePane) currentActivePane.classList.remove('active');

                tab.classList.add('active');

                const targetId = tab.dataset.tabTarget;
                const targetPane = document.getElementById('tab-' + targetId);

                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
});