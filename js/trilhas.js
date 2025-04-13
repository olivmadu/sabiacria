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
    }, 1500);
    
    // Animar texto de carregamento
    const loadingTextSpans = document.querySelectorAll('.loading-text span');
    loadingTextSpans.forEach((span, index) => {
      span.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Elementos do DOM
    const soundToggle = document.querySelector('.sound-toggle');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const headerActions = document.querySelector('.header-actions');
    const backToTopBtn = document.getElementById('backToTop');
    const characterSpeech = document.getElementById('character-speech');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const trailCards = document.querySelectorAll('.trail-card');
    const notifyButtons = document.querySelectorAll('.btn-notify');
    const notifyModal = document.getElementById('notifyModal');
    const closeModal = document.querySelector('.close-modal');
    const notifyForm = document.getElementById('notifyForm');
    const suggestionBtn = document.querySelector('.btn-suggestion');
    
    // Frases do personagem
    const characterPhrases = [
      "Escolha uma trilha para começar sua jornada de aprendizado!",
      "Cada trilha tem atividades divertidas esperando por você!",
      "Você pode continuar de onde parou ou começar uma nova aventura!",
      "Qual mundo você quer explorar hoje?",
      "As trilhas com fita verde são novidades!",
      "Complete as trilhas para ganhar estrelas e subir de nível!",
      "Não sabe qual escolher? Use o botão 'Encontrar Minha Trilha'!"
    ];
    
    // Trocar frase do personagem a cada 10 segundos
    let currentPhraseIndex = 0;
    function changeCharacterPhrase() {
      if (characterSpeech) {
        characterSpeech.style.opacity = '0';
        
        setTimeout(() => {
          currentPhraseIndex = (currentPhraseIndex + 1) % characterPhrases.length;
          characterSpeech.textContent = characterPhrases[currentPhraseIndex];
          characterSpeech.style.opacity = '1';
        }, 500);
      }
    }
    
    // Iniciar troca de frases
    setInterval(changeCharacterPhrase, 10000);
    
    // Carregar dados do usuário do localStorage
    function loadUserData() {
      const userData = localStorage.getItem('avatarData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          
          // Atualizar nome do usuário
          const headerName = document.getElementById('header-name');
          if (headerName && parsedData.nome) {
            headerName.textContent = parsedData.nome;
          }
          
          // Atualizar avatar
          const headerAvatar = document.getElementById('header-avatar');
          
          if (headerAvatar && parsedData.personagem) {
            const avatarPath = `/imagens/avatares/${parsedData.personagem}.png`;
            headerAvatar.src = avatarPath;
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      }
    }
    
    // Carregar dados do usuário
    loadUserData();
    
    // Toggle som
    if (soundToggle) {
      let soundOn = true;
      soundToggle.addEventListener('click', function() {
        soundOn = !soundOn;
        this.innerHTML = soundOn ? 
          '<i class="fas fa-volume-up"></i><div class="tooltip">Som</div>' : 
          '<i class="fas fa-volume-mute"></i><div class="tooltip">Som</div>';
        
        // Aqui você pode adicionar lógica para ativar/desativar sons
        if (soundOn) {
          // Ativar sons
          playBackgroundMusic();
        } else {
          // Desativar sons
          pauseBackgroundMusic();
        }
        
        // Tocar efeito sonoro
        playSoundEffect('click');
      });
    }
    
    // Funções para controle de áudio (placeholder)
    function playBackgroundMusic() {
      // Implementação futura
      console.log('Música de fundo ativada');
    }
    
    function pauseBackgroundMusic() {
      // Implementação futura
      console.log('Música de fundo desativada');
    }
    
    function playSoundEffect(effect) {
      // Implementação futura
      console.log(`Efeito sonoro: ${effect}`);
    }
    
    // Toggle menu mobile
    if (mobileMenuBtn && headerActions) {
      mobileMenuBtn.addEventListener('click', function() {
        headerActions.classList.toggle('show');
        
        // Animar as barras do botão
        const spans = this.querySelectorAll('span');
        spans[0].classList.toggle('rotate-down');
        spans[1].classList.toggle('fade-out');
        spans[2].classList.toggle('rotate-up');
        
        // Tocar efeito sonoro
        playSoundEffect('click');
      });
      
      // Fechar menu ao clicar fora
      document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !headerActions.contains(event.target) && headerActions.classList.contains('show')) {
          headerActions.classList.remove('show');
          
          // Resetar animação do botão
          const spans = mobileMenuBtn.querySelectorAll('span');
          spans[0].classList.remove('rotate-down');
          spans[1].classList.remove('fade-out');
          spans[2].classList.remove('rotate-up');
        }
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
      
      // Tocar efeito sonoro
      playSoundEffect('click');
    });
    
    // Filtrar trilhas
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remover classe ativa de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar classe ativa ao botão clicado
        this.classList.add('active');
        
        // Obter o filtro
        const filter = this.getAttribute('data-filter');
        
        // Filtrar trilhas
        trailCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else {
            if (card.getAttribute('data-category') === filter) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
        
        // Tocar efeito sonoro
        playSoundEffect('click');
        
        // Animar cards visíveis
        setTimeout(() => {
          document.querySelectorAll('.trail-card[style="display: block"]').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }, 100);
      });
    });
    
    // Abrir modal de notificação
    notifyButtons.forEach(button => {
      button.addEventListener('click', function() {
        notifyModal.style.display = 'flex';
        
        // Tocar efeito sonoro
        playSoundEffect('click');
        
        // Obter o nome da trilha
        const trailName = this.closest('.trail-card').querySelector('h2').textContent;
        
        // Atualizar o texto do modal
        const modalText = notifyModal.querySelector('.modal-body p');
        modalText.textContent = `Vamos te avisar quando a trilha "${trailName}" estiver disponível!`;
      });
    });
    
    // Fechar modal
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        notifyModal.style.display = 'none';
        
        // Tocar efeito sonoro
        playSoundEffect('click');
      });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
      if (event.target === notifyModal) {
        notifyModal.style.display = 'none';
      }
    });
    
    // Enviar formulário de notificação
    if (notifyForm) {
      notifyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Obter valores do formulário
        const email = document.getElementById('parentEmail').value;
        const name = document.getElementById('childName').value;
        
        // Aqui você pode adicionar lógica para enviar os dados para o servidor
        console.log(`Notificação registrada para: ${name} (${email})`);
        
        // Tocar efeito sonoro
        playSoundEffect('success');
        
        // Mostrar mensagem de sucesso
        alert('Pronto! Vamos te avisar quando esta trilha estiver disponível.');
        
        // Fechar modal
        notifyModal.style.display = 'none';
        
        // Limpar formulário
        notifyForm.reset();
      });
    }
    
    // Botão de sugestão de trilha
    if (suggestionBtn) {
      suggestionBtn.addEventListener('click', function() {
        // Aqui você pode adicionar lógica para o questionário de sugestão
        alert('Em breve você poderá responder a um questionário para descobrir a trilha perfeita para você!');
        
        // Tocar efeito sonoro
        playSoundEffect('click');
      });
    }
    
    // Animação das barras de progresso
    function animateProgressBars() {
      const progressBars = document.querySelectorAll('.progress-fill');
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
    
    // Adicionar animação aos elementos
    function animateElements() {
      const elements = document.querySelectorAll('.trail-card');
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('fade-in');
        }, index * 100);
      });
    }
    
    // Iniciar animações após o carregamento
    setTimeout(animateElements, 1200);
    
    // Adicionar efeito de hover nos cards
    trailCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        playSoundEffect('hover');
      });
    });
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
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
      }
      
      .trail-card {
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
    </style>
  `);