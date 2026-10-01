/* ============================================
   LOJA DA CONSTRUÇÃO - SCRIPT PRINCIPAL
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MENU MOBILE
    // ============================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            
            // Trocar ícone
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('open');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            header.style.background = 'rgba(255, 255, 255, 0.99)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    });
    
    // ============================================
    // SCROLL REVEAL (Animações de entrada)
    // ============================================
    const revealElements = document.querySelectorAll('.section, .feature-item, .produto-card, .info-card, .privacidade-item, .contato-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // ============================================
    // BOTÃO VOLTAR AO TOPO
    // ============================================
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // SCROLL SUAVE PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // FORMULÁRIO DE CONTATO
    // ============================================
    const contatoForm = document.getElementById('contatoForm');
    
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Validação básica
            if (!nome || !email || !mensagem) {
                mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }
            
            // Validar e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarAlerta('Por favor, insira um e-mail válido.', 'erro');
                return;
            }
            
            // Simular envio
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                mostrarAlerta(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`, 'sucesso');
                
                // Resetar formulário
                contatoForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
    
    // ============================================
    // FUNÇÃO PARA MOSTRAR ALERTAS CUSTOMIZADOS
    // ============================================
    function mostrarAlerta(mensagem, tipo) {
        // Remover alerta existente
        const alertaExistente = document.querySelector('.alerta-custom');
        if (alertaExistente) {
            alertaExistente.remove();
        }
        
        const alerta = document.createElement('div');
        alerta.className = `alerta-custom alerta-${tipo}`;
        
        const icone = tipo === 'sucesso' ? 'fa-circle-check' : 'fa-circle-exclamation';
        const cor = tipo === 'sucesso' ? '#28A745' : '#DC3545';
        
        alerta.innerHTML = `
            <i class="fa-solid ${icone}" style="color: ${cor};"></i>
            <span>${mensagem}</span>
        `;
        
        // Estilos inline para garantir funcionamento
        Object.assign(alerta.style, {
            position: 'fixed',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%) translateY(-20px)',
            background: 'white',
            padding: '18px 28px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: '10000',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#212529',
            opacity: '0',
            transition: 'all 0.4s ease',
            maxWidth: '90%',
            borderLeft: `4px solid ${cor}`
        });
        
        document.body.appendChild(alerta);
        
        // Animação de entrada
        requestAnimationFrame(() => {
            alerta.style.opacity = '1';
            alerta.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        // Remover após 4 segundos
        setTimeout(() => {
            alerta.style.opacity = '0';
            alerta.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => alerta.remove(), 400);
        }, 4000);
    }
    
    // ============================================
    // CONTADOR DE ESTATÍSTICAS (se houver)
    // ============================================
    // Efeito de contagem para números (pode ser usado futuramente)
    function animarContador(elemento, alvo, duracao = 2000) {
        let inicio = 0;
        const incremento = alvo / (duracao / 16);
        
        function atualizar() {
            inicio += incremento;
            if (inicio >= alvo) {
                elemento.textContent = alvo.toLocaleString('pt-BR');
                return;
            }
            elemento.textContent = Math.floor(inicio).toLocaleString('pt-BR');
            requestAnimationFrame(atualizar);
        }
        
        atualizar();
    }
    
    // ============================================
    // LAZY LOADING DE IMAGENS (se houver)
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // LOG DE INICIALIZAÇÃO
    // ============================================
    console.log('%c🏗️ Loja da Construção', 'font-size: 24px; font-weight: bold; color: #FF6B00;');
    console.log('%cSite carregado com sucesso!', 'font-size: 14px; color: #0056B3;');
    console.log('%cCNPJ: 29.006.686/0001-00', 'font-size: 12px; color: #6C757D;');
    
});
