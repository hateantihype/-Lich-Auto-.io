document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    // Собираем все ссылки, которые ведут на внутренние ID
    const navLinks = document.querySelectorAll('.nav-menu a, .navigation-menu a');
    
    /**
     * Отображает указанную секцию и скрывает все остальные.
     * @param {string} sectionId - ID секции для отображения (например, "#main-page").
     */
    const showSection = (sectionId) => {
        sections.forEach(section => {
            // Скрываем все секции
            section.style.display = 'none';
        });
        
        // Определяем, какую секцию показать
        const targetId = sectionId.split('#')[1];
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.style.display = 'block';
        } else {
            // Если ID не найден или это ссылка на заглушку
            document.getElementById('main-page').style.display = 'block';
        }

        // Скроллим вверх при переходе
        window.scrollTo(0, 0);
    };

    // Обработчик кликов по навигационным ссылкам
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault(); 
                showSection(href);
            } else if (link.textContent.trim() === 'Расчёт стоимости' || href === '#') {
                // Обработка заглушки "Расчёт стоимости" (показываем главную)
                e.preventDefault();
                showSection('#main-page'); 
            }
        });
    });

    // Инициализация: показываем нужную страницу при загрузке
    const initialHash = window.location.hash || '#main-page';
    showSection(initialHash);
});