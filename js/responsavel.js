// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Remover o preloader
    setTimeout(function() {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function() {
          preloader.style.display = 'none';
        }, 500);
      }
    }, 1000);
    
    // Elementos do DOM
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const backToTopBtn = document.getElementById('backToTop');
    const calendarNavPrev = document.querySelector('.calendar-nav.prev');
    const calendarNavNext = document.querySelector('.calendar-nav.next');
    const calendarTitle = document.querySelector('.calendar-header h3');
    
    // Toggle dropdown menu
    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
      });
      
      // Fechar dropdown ao clicar fora
      document.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
      });
    }
    
    // Toggle sidebar no mobile
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        
        // Animar as barras do botão
        const spans = this.querySelectorAll('span');
        spans[0].classList.toggle('rotate-down');
        spans[1].classList.toggle('fade-out');
        spans[2].classList.toggle('rotate-up');
      });
    }
    
    // Botão voltar ao topo
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
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
    
    // Navegação do calendário
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Atualizar título do calendário
    function updateCalendarTitle() {
      calendarTitle.textContent = `${months[currentMonth]} ${currentYear}`;
    }
    
    // Inicializar título do calendário
    updateCalendarTitle();
    
    // Navegação do calendário
    if (calendarNavPrev) {
      calendarNavPrev.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        updateCalendarTitle();
      });
    }
    
    if (calendarNavNext) {
      calendarNavNext.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        updateCalendarTitle();
      });
    }
    
    // Animação das barras de progresso
    function animateProgressBars() {
      const progressBars = document.querySelectorAll('.progress-fill, .mini-fill');
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
      });
    }
    
    // Iniciar animações após o carregamento
    setTimeout(animateProgressBars, 1000);
    
    // Adicionar animação aos cards
    function animateCards() {
      const cards = document.querySelectorAll('.stats-card, .child-card, .activity-item, .event, .report-item, .tip-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('fade-in');
        }, index * 100);
      });
    }
    
    // Iniciar animações após o carregamento
    setTimeout(animateCards, 1200);
    
    // Navegação da sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Remover classe ativa de todos os links
        sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
        
        // Adicionar classe ativa ao link clicado
        this.parentElement.classList.add('active');
        
        // Fechar sidebar no mobile
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('show');
        }
        
        // Atualizar título da página
        const pageTitle = document.querySelector('.page-header h1');
        const breadcrumbCurrent = document.querySelector('.breadcrumb span');
        
        if (pageTitle && breadcrumbCurrent) {
          const title = this.querySelector('span').textContent;
          pageTitle.textContent = title;
          breadcrumbCurrent.textContent = title;
        }
        
        // Prevenir navegação para manter a SPA
        e.preventDefault();
      });
    });
    
    // Simular carregamento de dados
    function simulateDataLoading() {
      // Atualizar números aleatoriamente para demonstração
      const statsNumbers = document.querySelectorAll('.stats-number');
      statsNumbers.forEach(stat => {
        const originalValue = parseInt(stat.textContent);
        const randomChange = Math.floor(Math.random() * 5) - 2; // -2 a +2
        const newValue = Math.max(0, originalValue + randomChange);
        stat.textContent = newValue;
      });
      
      // Atualizar tendências
      const statsTrends = document.querySelectorAll('.stats-trend');
      statsTrends.forEach(trend => {
        const isPositive = Math.random() > 0.3; // 70% chance de ser positivo
        trend.classList.remove('positive', 'negative');
        trend.classList.add(isPositive ? 'positive' : 'negative');
        
        const icon = trend.querySelector('i');
        icon.className = isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
        
        const value = Math.floor(Math.random() * 15) + 1;
        const text = trend.textContent.split(' ').pop();
        trend.innerHTML = `<i class="${icon.className}"></i> ${value}% ${text}`;
      });
    }
    
    // Simular atualização de dados a cada 30 segundos
    setInterval(simulateDataLoading, 30000);
    
    // Notificações
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
      notificationBell.addEventListener('click', function() {
        alert('Funcionalidade de notificações em desenvolvimento!');
      });
    }
  });
  
  // Backup para garantir que o preloader seja removido
  window.addEventListener('load', function() {
    setTimeout(function() {
      const preloader = document.getElementById('preloader');
      if (preloader && preloader.style.display !== 'none') {
        preloader.style.display = 'none';
      }
    }, 3000);
  });
  
  // Adicionar estilos para animação do botão mobile
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .mobile-menu-btn span.rotate-down {
        transform: translateY(8px) rotate(45deg);
      }
      
      .mobile-menu-btn span.fade-out {
        opacity: 0;
      }
      
      .mobile-menu-btn span.rotate-up {
        transform: translateY(-8px) rotate(-45deg);
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
      }
    </style>
  `);