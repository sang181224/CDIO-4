// --- Logic for Shopping Cart Selection ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.cart-page')) {
        const selectAllCheckbox = document.getElementById('select-all-checkbox');
        const itemCheckboxes = document.querySelectorAll('.item-checkbox');
        const summaryTotalElement = document.querySelector('.summary-total strong');

        function formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        }

        function updateCartTotal() {
            let currentTotal = 0;
            itemCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const itemRow = checkbox.closest('.cart-item');
                    const priceElement = itemRow.querySelector('.item-price');
                    const price = parseFloat(priceElement.dataset.price);
                    if (!isNaN(price)) {
                        currentTotal += price;
                    }
                }
            });
            summaryTotalElement.textContent = formatCurrency(currentTotal);
        }

        selectAllCheckbox.addEventListener('change', () => {
            itemCheckboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
            updateCartTotal();
        });

        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                selectAllCheckbox.checked = Array.from(itemCheckboxes).every(cb => cb.checked);
                updateCartTotal();
            });
        });

        updateCartTotal();
    }
});