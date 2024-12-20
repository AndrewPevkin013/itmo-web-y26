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


// Preloader
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const dataContainer = document.getElementById("data-container");

    async function fetchData(randomFilter) {
        preloader.style.display = "block";
        dataContainer.innerHTML = "";

        const url = randomFilter
            ? "https://jsonplaceholder.typicode.com/comments?id_gte=100"
            : "https://jsonplaceholder.typicode.com/comments?id_lte=200";

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Ошибка загрузки данных");
            }

            const data = await response.json();

            preloader.style.display = "none";

            data.forEach((comment) => {
                const item = document.createElement("div");
                item.innerHTML = `
                    <h3>${comment.name}</h3>
                    <p>${comment.body}</p>
                    <span>Email: ${comment.email}</span>
                `;
                dataContainer.appendChild(item);
            });
        } catch (error) {
            preloader.style.display = "none";
            dataContainer.innerHTML = `<div style="color: red;">⚠ Что-то пошло не так: ${error.message}</div>`;
        }
    }

    let randomFilter = Math.random() > 0.5;
    fetchData(randomFilter);

    // const reloadButton = document.createElement("button");
    // reloadButton.textContent = "Обновить данные";
    // reloadButton.addEventListener("click", () => {
    //     randomFilter = !randomFilter;
    //     fetchData(randomFilter);
    // });
    // dataContainer.appendChild(reloadButton);
});


// Login form =)
document.getElementById("login-btn").addEventListener("click", () => {
    Swal.fire({
        title: 'Login Form',
        html: `
            <input id="username" class="swal2-input" placeholder="Username">
            <input id="password" class="swal2-input" type="password" placeholder="Password">
        `,
        confirmButtonText: 'Sign in',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        focusConfirm: false,
        customClass: {
            popup: 'animated-popup',
        },
        preConfirm: () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                Swal.showValidationMessage('Both fields must be filled in!');
            }
            return { username, password };
        }
    })
});

