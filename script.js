// script.js - Agrinho 2026
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚜 Agrinho 2026 - JavaScript carregado com sucesso!');

    // ====================== SMOOTH SCROLL ======================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ====================== MOBILE MENU ======================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });

    // ====================== FORMULÁRIO DE CONTATO ======================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Validação
            if (nome === '' || email === '' || mensagem === '') {
                alert('❌ Por favor, preencha todos os campos obrigatórios!');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('❌ Por favor, insira um e-mail válido!');
                return;
            }
            
            // Simulação de envio
            const submitButton = contactForm.querySelector('button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('✅ Mensagem enviada com sucesso! Obrigado por participar do Agrinho 2026 🌱');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ====================== SCROLL ANIMATIONS ======================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // ====================== BACK TO TOP ======================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.classList.add('back-to-top');
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // ====================== KEYBOARD SUPPORT ======================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeMenu = document.querySelector('nav ul.active');
            if (activeMenu) {
                activeMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        }
    });

    // ====================== HERO PARALLAX EFFECT ======================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            hero.style.backgroundPositionY = `${scrollY * 0.3}px`;
        });
    }
});
