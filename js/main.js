// 1. Scroll Reveal - Animação ao rolar a página
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-reveal').forEach(section => {
    observer.observe(section);
});

// 2. Filtro de Portfólio
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover classe active de todos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar active no clicado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                if (card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            }
        });
    });
});

// 3. Efeito Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 8%';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
        header.style.padding = '20px 8%';
        header.style.boxShadow = 'none';
    }
});

// 4. Lógica Simples para o Formulário de Contato
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aqui você integraria com o Formspree ou outro serviço
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Enviando...";
    btn.disabled = true;

    // Simulando envio
    setTimeout(() => {
        btn.innerText = "Mensagem Enviada!";
        btn.style.background = "#10b981";
        contactForm.reset();
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "var(--accent)";
            btn.disabled = false;
        }, 3000);
    }, 1500);
});