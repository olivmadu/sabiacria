// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Remover o preloader imediatamente
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function() {
        preloader.style.opacity = '0';
        setTimeout(function() {
          preloader.style.display = 'none';
        }, 500);
      }, 1000); // Reduzido para 1 segundo
    }
    
    // Seleção de elementos
    const btnFamilia = document.getElementById('btn-familia');
    const btnEscola = document.getElementById('btn-escola');
    const formFamilia = document.getElementById('form-familia');
    const formEscola = document.getElementById('form-escola');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    // Alternar entre os tipos de conta
    if (btnFamilia && btnEscola) {
      btnFamilia.addEventListener('click', function() {
        btnFamilia.classList.add('ativo');
        btnEscola.classList.remove('ativo');
        formFamilia.style.display = 'block';
        formEscola.style.display = 'none';
        
        // Animação
        formFamilia.classList.add('fade-in');
        setTimeout(() => {
          formFamilia.classList.remove('fade-in');
        }, 500);
      });
      
      btnEscola.addEventListener('click', function() {
        btnEscola.classList.add('ativo');
        btnFamilia.classList.remove('ativo');
        formEscola.style.display = 'block';
        formFamilia.style.display = 'none';
        
        // Animação
        formEscola.classList.add('fade-in');
        setTimeout(() => {
          formEscola.classList.remove('fade-in');
        }, 500);
      });
    }
    
    // Mostrar/ocultar senha
    togglePasswordBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });
    });
    
    // Verificar força da senha
    passwordInputs.forEach(input => {
      const strengthBar = input.parentElement.parentElement.querySelector('.bar-progress');
      const strengthText = input.parentElement.parentElement.querySelector('.strength-text');
      
      if (strengthBar && strengthText) {
        input.addEventListener('input', function() {
          const password = this.value;
          const strength = checkPasswordStrength(password);
          
          // Atualizar barra de progresso
          strengthBar.style.width = strength.percentage + '%';
          strengthBar.style.backgroundColor = strength.color;
          
          // Atualizar texto
          strengthText.textContent = strength.message;
        });
      }
    });
    
    // Função para verificar força da senha
    function checkPasswordStrength(password) {
      let strength = {
        percentage: 0,
        message: 'Força da senha',
        color: '#ddd'
      };
      
      if (password.length === 0) {
        return strength;
      }
      
      let score = 0;
      
      // Comprimento básico
      score += password.length * 4;
      
      // Letras minúsculas
      if (/[a-z]/.test(password)) {
        score += 10;
      }
      
      // Letras maiúsculas
      if (/[A-Z]/.test(password)) {
        score += 10;
      }
      
      // Números
      if (/[0-9]/.test(password)) {
        score += 10;
      }
      
      // Caracteres especiais
      if (/[^a-zA-Z0-9]/.test(password)) {
        score += 15;
      }
      
      // Definir força com base na pontuação
      if (score >= 80) {
        strength.percentage = 100;
        strength.message = 'Senha forte';
        strength.color = '#4CAF50'; // Verde
      } else if (score >= 60) {
        strength.percentage = 75;
        strength.message = 'Senha média';
        strength.color = '#FFC107'; // Amarelo
      } else if (score >= 30) {
        strength.percentage = 50;
        strength.message = 'Senha fraca';
        strength.color = '#FF9800'; // Laranja
      } else {
        strength.percentage = 25;
        strength.message = 'Senha muito fraca';
        strength.color = '#F44336'; // Vermelho
      }
      
      return strength;
    }
    
    // Validação de formulários
    const formFamiliaEl = document.getElementById('form-familia');
    const formEscolaEl = document.getElementById('form-escola');
    
    if (formFamiliaEl) {
      formFamiliaEl.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
          // Simulação de envio
          showSubmitAnimation(this);
        }
      });
    }
    
    if (formEscolaEl) {
      formEscolaEl.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
          // Simulação de envio
          showSubmitAnimation(this);
        }
      });
    }
    
    // Função para validar formulário
    function validateForm(form) {
      const inputs = form.querySelectorAll('input[required], select[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          highlightInvalidInput(input);
        } else {
          removeInvalidHighlight(input);
        }
      });
      
      // Validação específica para e-mail
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        if (!isValidEmail(emailInput.value)) {
          isValid = false;
          highlightInvalidInput(emailInput);
        }
      }
      
      // Validação específica para senha
      const passwordInput = form.querySelector('input[type="password"]');
      if (passwordInput && passwordInput.value.trim()) {
        if (passwordInput.value.length < 6) {
          isValid = false;
          highlightInvalidInput(passwordInput);
          alert('A senha deve ter pelo menos 6 caracteres.');
        }
      }
      
      // Validação de checkbox de termos
      const termsCheckbox = form.querySelector('input[type="checkbox"][required]');
      if (termsCheckbox && !termsCheckbox.checked) {
        isValid = false;
        alert('Você precisa concordar com os Termos de Uso e Política de Privacidade.');
      }
      
      return isValid;
    }
    
    // Função para destacar input inválido
    function highlightInvalidInput(input) {
      input.classList.add('invalid');
      input.addEventListener('input', function() {
        removeInvalidHighlight(this);
      }, { once: true });
    }
    
    // Função para remover destaque de input inválido
    function removeInvalidHighlight(input) {
      input.classList.remove('invalid');
    }
    
    // Função para validar e-mail
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Função para mostrar animação de envio
    function showSubmitAnimation(form) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      
      setTimeout(function() {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Conta criada!';
        
        // Redirecionar após alguns segundos
        setTimeout(function() {
          window.location.href = 'dashboard.html';
        }, 2000);
      }, 2000);
    }
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefoneEscola');
    if (telefoneInput) {
      telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 10) {
          // Formato (00) 0000-0000
          value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
        } else {
          // Formato (00) 00000-0000
          value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        }
        
        e.target.value = value;
      });
    }
    
    // Inicializar com o formulário de família ativo
    if (btnFamilia) {
      btnFamilia.click();
    }
  });
  
  // Adicionar estilos CSS para inputs inválidos
  const style = document.createElement('style');
  style.textContent = `
    .input-icon input.invalid,
    .input-icon select.invalid {
      border-color: #F44336;
      background-color: rgba(244, 67, 54, 0.05);
    }
    
    .input-icon input.invalid:focus,
    .input-icon select.invalid:focus {
      box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
    }
    
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
  
  // Forçar a remoção do preloader caso ainda esteja visível após 3 segundos
  window.addEventListener('load', function() {
    setTimeout(function() {
      const preloader = document.getElementById('preloader');
      if (preloader && preloader.style.display !== 'none') {
        preloader.style.display = 'none';
      }
    }, 3000);
  });