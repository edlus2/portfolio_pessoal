window.addEventListener('load', () => {
    // --- 1. LÓGICA DO MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    const toggleMenu = () => {
        const isActive = mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (isActive) {
            icon.classList.replace('fa-bars-staggered', 'fa-xmark');
            document.body.style.overflow = 'hidden'; 
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars-staggered');
            document.body.style.overflow = 'auto';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    menuLinks.forEach(link => link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
    }));

    // --- 2. EFEITO DA NAVBAR AO SCROLL ---
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- 3. SCROLL REVEAL ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // --- 4. FILTRO DO PORTFÓLIO (LÓGICA EDGAR) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    const filterProjects = (category) => {
        // Fade-out suave de todos os itens ativos
        projectItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            // Timeout para esperar a transição do CSS terminar antes de dar display none
            setTimeout(() => { 
                item.style.display = 'none'; 
            }, 300);
        });

        // Entrada dos novos itens
        setTimeout(() => {
            if (category === 'all') {
                // Mostra apenas o primeiro de cada categoria no "Destaque"
                const categories = ['maker', 'dev', 'work'];
                categories.forEach(cat => {
                    const firstItem = document.querySelector(`.project-item.${cat}`);
                    if (firstItem) renderItem(firstItem);
                });
            } else {
                // Mostra todos da categoria selecionada
                const selectedItems = document.querySelectorAll(`.project-item.${category}`);
                selectedItems.forEach(item => renderItem(item));
            }
        }, 310); // Tempo ligeiramente maior que o transition do CSS
    };

    const renderItem = (el) => {
        el.style.display = 'flex';
        // Pequeno delay para o navegador registrar o display flex antes de iniciar a opacidade
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        }, 50);
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.getAttribute('data-filter'));
        });
    });

    // Inicia com os destaques
    filterProjects('all');
});