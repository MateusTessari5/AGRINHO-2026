// script.js - Agrinho 2026 (Versão Melhorada)
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 Agrinho 2026 - JavaScript carregado com sucesso!');

    // ====================== HEADER SCROLL EFFECT ======================
    const header = document.getElementById('header');
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // executa no carregamento

    // ====================== MENU MOBILE ======================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-list');

    if (menuToggle && navMenu) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
            document.body.classList.toggle('menu-open', isActive);
        };

        menuToggle.addEventListener('click', toggleMenu);

        // Fechar ao clicar em link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('menu-open');
                }
            });
        });

        // Fechar ao clicar fora do menu
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    // ====================== ACTIVE NAV LINK ON SCROLL ======================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);

    // ====================== SMOOTH SCROLL (com offset do header) ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====================== TOAST NOTIFICATION SYSTEM ======================
    const createToast = (message, type = 'success', duration = 4000) => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">×</button>
        `;
        
        document.body.appendChild(toast);
        
        // Anima entrada
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Fechar ao clicar
        toast.querySelector('.toast-close').addEventListener('click', () => {
            removeToast(toast);
        });
        
        // Auto-remover
        setTimeout(() => removeToast(toast), duration);
    };

    const removeToast = (toast) => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    };

    // ====================== FORMULÁRIO (com validação visual) ======================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');
            
            let isValid = true;
            
            if (!validateField(nome)) isValid = false;
            if (!validateField(email)) isValid = false;
            if (!validateField(mensagem)) isValid = false;
            
            if (!isValid) {
                createToast('Por favor, corrija os erros no formulário', 'error');
                return;
            }
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.innerHTML = '<span class="loader"></span> Enviando...';
            submitButton.disabled = true;
            
            // Simulação de envio
            setTimeout(() => {
                createToast('Mensagem enviada com sucesso! Obrigado por participar 🌱', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Limpa mensagens de erro
                inputs.forEach(input => input.classList.remove('error'));
                document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
            }, 1800);
        });
    }

    function validateField(field) {
        const errorMsg = field.nextElementSibling;
        let message = '';
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            message = 'Este campo é obrigatório';
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                message = 'E-mail inválido';
            }
        }
        
        if (message) {
            field.classList.add('error');
            if (errorMsg) errorMsg.textContent = message;
            return false;
        } else {
            field.classList.remove('error');
            if (errorMsg) errorMsg.textContent = '';
            return true;
        }
    }

    // ====================== SCROLL ANIMATIONS ======================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Se for stats, animar números
                if (entry.target.classList.contains('stats')) {
                    animateStats(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .card, .galeria-item, .stats').forEach(el => {
        observer.observe(el);
    });

    // ====================== ANIMATE STATS NUMBERS ======================
    const animateStats = (statsContainer) => {
        const stats = statsContainer.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const text = stat.textContent;
            const match = text.match(/(\d+)/);
            if (!match) return;
            
            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            let current = 0;
            const increment = target / 60;
            const duration = 2000;
            const stepTime = duration / 60;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, stepTime);
        });
    };

    // ====================== BACK TO TOP BUTTON ======================
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ====================== KEYBOARD SUPPORT ======================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.classList.remove('menu-open');
        }
    });

    // ====================== HERO PARALLAX ======================
    const hero = document.querySelector('.hero');
    let ticking = false;
    
    if (hero) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY;
                    if (scrollPosition < hero.offsetHeight) {
                        hero.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ====================== LAZY LOADING ======================
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.loading = 'lazy';
        }
    });

    // ====================== TYPING EFFECT NO HERO ======================
    const heroHighlight = document.querySelector('.hero-highlight');
    if (heroHighlight) {
        const text = heroHighlight.textContent;
        heroHighlight.textContent = '';
        heroHighlight.style.borderRight = '2px solid currentColor';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            heroHighlight.textContent += text[index];
            index++;
            if (index >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    heroHighlight.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }
});
