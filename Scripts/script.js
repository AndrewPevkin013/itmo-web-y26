// Поиск
const searchBtn = document.querySelector(".search-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const searchBox = document.querySelector(".search-box");
const searchInput = document.querySelector("input");
searchBtn.onclick = () => {
    searchBox.classList.add("active");
    searchInput.classList.add("active");
    searchBtn.classList.add("active");
    cancelBtn.classList.add("active");
}
cancelBtn.onclick = () => {
    searchBox.classList.remove("active");
    searchInput.classList.remove("active");
    searchBtn.classList.remove("active")
    cancelBtn.classList.remove("active")
}

// Каталог
document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.querySelector('.header-nav ul li:nth-child(1) a');
    const targetElement = document.querySelector('h3.inscription');

    if (cartButton && targetElement) {
        cartButton.addEventListener('click', (event) => {
            event.preventDefault();
            targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        });
    }
});

// Переход между страницами
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const navLinks = document.querySelectorAll('.header-nav a');
        const currentPath = document.location.pathname;

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
})();

// Скорость загрузки страницы
(function () {
    function displayLoadTime() {
        if (performance && performance.timing) {
            const timing = performance.timing;
            const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
            const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
            const connectionTime = timing.responseEnd - timing.requestStart;
            const statsHTML = `
                <p><strong>Статистика загрузки страницы:</strong></p>
                <ul>
                    <li>Время полной загрузки: ${pageLoadTime} мс</li>
                    <li>Время до DOMContentLoaded: ${domContentLoadedTime} мс</li>
                    <li>Время соединения с сервером: ${connectionTime} мс</li>
                </ul>
            `;
            const footer = document.querySelector('.footer .footer-container');
            if (footer) {
                const statsDiv = document.createElement('div');
                statsDiv.innerHTML = statsHTML;
                footer.appendChild(statsDiv);
            }
        } else {
            console.error('Performance API недоступен.');
        }
    }
    window.addEventListener('load', function () {
        setTimeout(displayLoadTime, 1);
    });
})();


// Кнопки для изменения количества товаров
document.addEventListener('DOMContentLoaded', () => {
    const basketWrappers = document.querySelectorAll('.basket-product-wrapper');

    basketWrappers.forEach((wrapper) => {
        const minusBtn = wrapper.querySelector('.count-minus');
        const plusBtn = wrapper.querySelector('.count-plus');
        const numericInput = wrapper.querySelector('.count-numeric');
        const priceElement = wrapper.querySelector('.product-price');
        const basePrice = parseInt(priceElement.textContent.match(/\d+/), 10);

        const updatePrice = () => {
            const quantity = parseInt(numericInput.value, 10) || 1;
            priceElement.textContent = `Стоимость: ${basePrice * quantity} руб.`;
        };

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(numericInput.value, 10) || 1;
            numericInput.value = currentValue + 1;
            updatePrice();
        });

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(numericInput.value, 10) || 1;
            const minValue = parseInt(numericInput.min, 10) || 1;

            if (currentValue > minValue) {
                numericInput.value = currentValue - 1;
                updatePrice();
            }
        });
    });
});

