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
  const form = document.getElementById('form-avatar');
  const nomeInput = document.getElementById('nome');
  const nameDisplay = document.getElementById('name-display');
  const characterBase = document.getElementById('character-base');
  const accessoryDisplay = document.getElementById('accessory-display');
  const colorOverlay = document.getElementById('color-overlay');
  const confirmationModal = document.getElementById('confirmation-modal');
  const modalAvatarImg = document.getElementById('modal-avatar-img');
  const modalAvatarName = document.getElementById('modal-avatar-name');
  const continueBtn = document.getElementById('continue-btn');
  const closeModalBtn = document.querySelector('.close-modal');
  const backToTopBtn = document.getElementById('backToTop');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navIcons = document.querySelector('.nav-icons');
  
  // Caminhos das imagens
  const characterPaths = {
    passaro: '/imagens/avatares/passaro.png',
    gato: '/imagens/avatares/gato.png',
    raposa: '/imagens/avatares/raposa.png'
  };
  
  const accessoryPaths = {
    nenhum: '/imagens/avatares/acessorios/nenhum.png',
    oculos: '/imagens/avatares/acessorios/oculos.png',
    chapeu: '/imagens/avatares/acessorios/chapeu.png',
    gravata: '/imagens/avatares/acessorios/gravata.png'
  };
  
  const colorValues = {
    padrao: 'transparent',
    azul: 'var(--azul-claro)',
    rosa: 'var(--rosa)',
    verde: 'var(--verde)',
    amarelo: 'var(--amarelo)',
    roxo: 'var(--roxo)'
  };
  
  // Atualizar nome em tempo real
  nomeInput.addEventListener('input', function() {
    nameDisplay.textContent = this.value || 'Seu Nome';
  });
  
  // Atualizar personagem quando selecionado
  const characterRadios = document.querySelectorAll('input[name="personagem"]');
  characterRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      characterBase.src = characterPaths[this.value];
      characterBase.classList.add('bounce');
      setTimeout(() => {
        characterBase.classList.remove('bounce');
      }, 1000);
    });
  });
  
  // Atualizar acessório quando selecionado
  const accessoryRadios = document.querySelectorAll('input[name="acessorio"]');
  accessoryRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'nenhum') {
        accessoryDisplay.innerHTML = '';
      } else {
        const accessoryImg = document.createElement('img');
        accessoryImg.src = accessoryPaths[this.value];
        accessoryImg.alt = this.value;
        accessoryDisplay.innerHTML = '';
        accessoryDisplay.appendChild(accessoryImg);
      }
    });
  });
  
  // Atualizar cor quando selecionada
  const colorRadios = document.querySelectorAll('input[name="cor"]');
  colorRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'padrao') {
        colorOverlay.style.opacity = '0';
      } else {
        colorOverlay.style.backgroundColor = colorValues[this.value];
        colorOverlay.style.opacity = '0.3';
      }
    });
  });
  
  // Enviar formulário
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obter valores do formulário
    const nome = nomeInput.value;
    const personagem = document.querySelector('input[name="personagem"]:checked').value;
    const acessorio = document.querySelector('input[name="acessorio"]:checked').value;
    const cor = document.querySelector('input[name="cor"]:checked').value;
    
    // Salvar no localStorage
    const avatarData = {
      nome: nome,
      personagem: personagem,
      acessorio: acessorio,
      cor: cor
    };
    
    localStorage.setItem('avatarData', JSON.stringify(avatarData));
    
    // Atualizar modal de confirmação
    modalAvatarImg.src = characterPaths[personagem];
    modalAvatarName.textContent = nome;
    
    // Mostrar modal
    confirmationModal.classList.add('show');
  });
  
  // Fechar modal
  closeModalBtn.addEventListener('click', function() {
    confirmationModal.classList.remove('show');
  });
  
  // Botão continuar no modal
  continueBtn.addEventListener('click', function() {
    window.location.href = 'dashboard.html';
  });
  
  // Fechar modal ao clicar fora
  window.addEventListener('click', function(e) {
    if (e.target === confirmationModal) {
      confirmationModal.classList.remove('show');
    }
  });
  
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
  
  // Menu mobile
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navIcons.classList.toggle('show');
      
      // Animar as barras do botão
      const spans = this.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });
  }
  
  // Carregar avatar existente se houver
  const savedAvatar = localStorage.getItem('avatarData');
  if (savedAvatar) {
    try {
      const avatarData = JSON.parse(savedAvatar);
      
      // Preencher formulário com dados salvos
      nomeInput.value = avatarData.nome;
      nameDisplay.textContent = avatarData.nome;
      
      // Selecionar personagem
      const personagemRadio = document.querySelector(`input[name="personagem"][value="${avatarData.personagem}"]`);
      if (personagemRadio) {
        personagemRadio.checked = true;
        characterBase.src = characterPaths[avatarData.personagem];
      }
      
      // Selecionar acessório
      const acessorioRadio = document.querySelector(`input[name="acessorio"][value="${avatarData.acessorio}"]`);
      if (acessorioRadio) {
        acessorioRadio.checked = true;
        if (avatarData.acessorio !== 'nenhum') {
          const accessoryImg = document.createElement('img');
          accessoryImg.src = accessoryPaths[avatarData.acessorio];
          accessoryImg.alt = avatarData.acessorio;
          accessoryDisplay.innerHTML = '';
          accessoryDisplay.appendChild(accessoryImg);
        }
      }
      
      // Selecionar cor
      const corRadio = document.querySelector(`input[name="cor"][value="${avatarData.cor}"]`);
      if (corRadio) {
        corRadio.checked = true;
        if (avatarData.cor !== 'padrao') {
          colorOverlay.style.backgroundColor = colorValues[avatarData.cor];
          colorOverlay.style.opacity = '0.3';
        }
      }
    } catch (error) {
      console.error('Erro ao carregar avatar:', error);
    }
  }
  
  // Adicionar animação aos elementos da página
  const animateElements = () => {
    const elements = document.querySelectorAll('.avatar-header, .avatar-preview, .avatar-options');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('fade-in');
      }, index * 200);
    });
  };
  
  // Iniciar animações após o carregamento
  setTimeout(animateElements, 1200);
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