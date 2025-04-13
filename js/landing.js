// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  setTimeout(function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500);
  }, 1500);

  // Header fixo com mudança de estilo ao rolar
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Menu mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navIcons = document.querySelector('.nav-icons');
  
  mobileMenuBtn.addEventListener('click', function() {
    navIcons.classList.toggle('show');
    
    // Animar os spans do botão
    const spans = this.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
    
    if (navIcons.classList.contains('show')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navIcons.classList.contains('show')) {
        navIcons.classList.remove('show');
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  // Contador animado para estatísticas
  function animateCounter(elementId, target, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(function() {
      start += increment;
      element.textContent = Math.floor(start) + '+';
      
      if (start >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      }
    }, 16);
  }

  // Iniciar animação quando o elemento estiver visível
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'studentCount') {
          animateCounter('studentCount', 5000, 2000);
        } else if (entry.target.id === 'activityCount') {
          animateCounter('activityCount', 200, 2000);
        } else if (entry.target.id === 'schoolCount') {
          animateCounter('schoolCount', 50, 2000);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statElements = document.querySelectorAll('.stat-number');
  statElements.forEach(element => {
    observer.observe(element);
  });

  // Vídeo demonstrativo
  const videoPlaceholder = document.getElementById('videoPlaceholder');
  const playButton = document.getElementById('playButton');
  
  if (playButton && videoPlaceholder) {
    playButton.addEventListener('click', function() {
      // Em uma implementação real, substituiríamos a imagem por um iframe de vídeo
      const videoWrapper = this.parentElement;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1';
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      
      videoWrapper.removeChild(videoPlaceholder);
      videoWrapper.removeChild(this);
      videoWrapper.appendChild(iframe);
    });
  }

  // Slider de depoimentos
  const testimonialSlider = document.getElementById('testimonialSlider');
  if (testimonialSlider) {
    const container = testimonialSlider.querySelector('.testimonials-container');
    const testimonials = container.querySelectorAll('.testimonial');
    const dots = testimonialSlider.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    let currentIndex = 0;
    const testimonialWidth = 100; // 100%
    
    function updateSlider() {
      container.style.transform = `translateX(-${currentIndex * testimonialWidth}%)`;
      
      // Atualizar dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Evento para os dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentIndex = index;
        updateSlider();
      });
    });
    
    // Evento para os botões
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (currentIndex < testimonials.length - 1) {
          currentIndex++;
          updateSlider();
        }
      });
    }
    
    // Auto-play do slider
    setInterval(function() {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    }, 5000);
  }

  // Toggle de preços (mensal/anual)
  const pricingToggle = document.getElementById('pricingToggle');
  if (pricingToggle) {
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const annualPrices = document.querySelectorAll('.price.annual');
    
    pricingToggle.addEventListener('change', function() {
      if (this.checked) {
        // Anual
        monthlyPrices.forEach(price => {
          price.style.opacity = '0';
          price.style.transform = 'translateY(-10px)';
        });
        annualPrices.forEach(price => {
          price.style.opacity = '1';
          price.style.transform = 'translateY(0)';
        });
      } else {
        // Mensal
        monthlyPrices.forEach(price => {
          price.style.opacity = '1';
          price.style.transform = 'translateY(0)';
        });
        annualPrices.forEach(price => {
          price.style.opacity = '0';
          price.style.transform = 'translateY(10px)';
        });
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Fechar todos os outros itens
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Alternar o estado do item atual
      item.classList.toggle('active');
    });
  });

  // Formulário de Newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulação de envio
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';
      
      setTimeout(function() {
        submitBtn.innerHTML = 'Enviado!';
        
        // Resetar formulário
        newsletterForm.reset();
        
        // Mostrar mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<p>Obrigado por se inscrever! Em breve você receberá nossas novidades.</p>';
        
        newsletterForm.appendChild(successMessage);
        
        // Restaurar botão após alguns segundos
        setTimeout(function() {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          newsletterForm.removeChild(successMessage);
        }, 3000);
      }, 1500);
    });
  }

  // Botão de voltar ao topo
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Cookie Consent
  const cookieConsent = document.getElementById('cookieConsent');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieSettings = document.getElementById('cookieSettings');
  
  // Verificar se o usuário já aceitou os cookies
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  
  if (!cookiesAccepted && cookieConsent) {
    // Mostrar o banner após 2 segundos
    setTimeout(function() {
      cookieConsent.classList.add('show');
    }, 2000);
    
    // Evento para aceitar cookies
    if (cookieAccept) {
      cookieAccept.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
      });
    }
    
    // Evento para configurações de cookies
    if (cookieSettings) {
      cookieSettings.addEventListener('click', function() {
        // Redirecionar para a página de configurações de cookies
        window.location.href = 'privacidade.html#cookie-settings';
      });
    }
  }

  // Animação de elementos ao scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.feature, .step, .pricing-card, .testimonial');
  
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
  
      if (elementPosition < screenPosition) {
        element.classList.add('fade-in');
      }
    });
  }
  
  // Iniciar animação ao carregar a página
  animateOnScroll();
  
  // Continuar animação ao rolar a página
  window.addEventListener('scroll', animateOnScroll);
});