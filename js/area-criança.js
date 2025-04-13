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
  const carouselPrev = document.querySelector('.carousel-nav.prev');
  const carouselNext = document.querySelector('.carousel-nav.next');
  const carouselTrack = document.querySelector('.carousel-track');
  const characterSpeech = document.getElementById('character-speech');
  
  // Frases do personagem
  const characterPhrases = [
    "Vamos explorar e aprender coisas novas hoje?",
    "Que tal completar sua missão diária?",
    "Você está indo muito bem! Continue assim!",
    "Tem novos jogos esperando por você!",
    "Já viu suas novas conquistas?",
    "Estou feliz em te ver por aqui novamente!",
    "Vamos continuar nossa aventura de aprendizado?"
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
        const welcomeName = document.getElementById('welcome-name');
        if (headerName && welcomeName && parsedData.nome) {
          headerName.textContent = parsedData.nome;
          welcomeName.textContent = parsedData.nome.split(' ')[0]; // Apenas o primeiro nome
        }
        
        // Atualizar avatar
        const headerAvatar = document.getElementById('header-avatar');
        const avatarPreview = document.getElementById('avatar-preview');
        
        if (headerAvatar && avatarPreview && parsedData.personagem) {
          const avatarPath = `/imagens/avatares/${parsedData.personagem}.png`;
          headerAvatar.src = avatarPath;
          avatarPreview.src = avatarPath;
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
  
  // Carrossel de atividades
  if (carouselTrack && carouselPrev && carouselNext) {
    let position = 0;
    const cardWidth = 300; // Largura do card + gap
    const visibleCards = Math.floor(carouselTrack.parentElement.offsetWidth / cardWidth);
    const totalCards = document.querySelectorAll('.activity-card').length;
    const maxPosition = Math.max(0, totalCards - visibleCards);
    
    // Atualizar posição do carrossel
    function updateCarouselPosition() {
      carouselTrack.style.transform = `translateX(-${position * cardWidth}px)`;
      
      // Desabilitar botões quando necessário
      carouselPrev.style.opacity = position === 0 ? '0.5' : '1';
      carouselPrev.style.pointerEvents = position === 0 ? 'none' : 'auto';
      
      carouselNext.style.opacity = position >= maxPosition ? '0.5' : '1';
      carouselNext.style.pointerEvents = position >= maxPosition ? 'none' : 'auto';
    }
    
    // Inicializar carrossel
    updateCarouselPosition();
    
    // Botões de navegação
    carouselPrev.addEventListener('click', function() {
      if (position > 0) {
        position--;
        updateCarouselPosition();
        playSoundEffect('slide');
      }
    });
    
    carouselNext.addEventListener('click', function() {
      if (position < maxPosition) {
        position++;
        updateCarouselPosition();
        playSoundEffect('slide');
      }
    });
    
    // Atualizar carrossel ao redimensionar a janela
    window.addEventListener('resize', function() {
      const newVisibleCards = Math.floor(carouselTrack.parentElement.offsetWidth / cardWidth);
      const newMaxPosition = Math.max(0, totalCards - newVisibleCards);
      
      // Ajustar posição se necessário
      if (position > newMaxPosition) {
        position = newMaxPosition;
      }
      
      updateCarouselPosition();
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
  
  // Adicionar animação aos elementos
  function animateElements() {
    const elements = document.querySelectorAll('.path-node, .activity-card, .achievement-card, .game-card');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('fade-in');
      }, index * 100);
    });
  }
  
  // Iniciar animações após o carregamento
  setTimeout(animateElements, 1200);
  
  // Adicionar interatividade às conquistas
  const achievementCards = document.querySelectorAll('.achievement-card');
  achievementCards.forEach(card => {
    card.addEventListener('click', function() {
      if (this.querySelector('.locked')) {
        // Mostrar dica para conquistas bloqueadas
        alert('Complete os desafios necessários para desbloquear esta conquista!');
      } else {
        // Mostrar detalhes da conquista
        const title = this.querySelector('h3').textContent;
        const description = this.querySelector('p').textContent;
        alert(`Conquista: ${title}\n${description}\n\nParabéns por esta conquista!`);
      }
      
      // Tocar efeito sonoro
      playSoundEffect('click');
    });
  });
  
  // Adicionar interatividade aos nós de trilha
  const pathNodes = document.querySelectorAll('.path-node.active');
  pathNodes.forEach(node => {
    node.addEventListener('mouseenter', function() {
      playSoundEffect('hover');
    });
  });
  
  // Adicionar efeito de hover nos botões de ação rápida
  const quickActionBtns = document.querySelectorAll('.quick-action-btn');
  quickActionBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      playSoundEffect('hover');
    });
  });
  
  // Adicionar efeito de confete ao clicar em "Continuar Aventura"
  const continueBtns = document.querySelectorAll('.btn-continue');
  continueBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Prevenir navegação para demonstração
      e.preventDefault();
      
      // Tocar efeito sonoro
      playSoundEffect('success');
      
      // Aqui você pode adicionar um efeito de confete ou animação
      alert('Continuando a aventura! Esta funcionalidade estará disponível em breve.');
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
  </style>
`);