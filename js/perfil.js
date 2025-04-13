    // Script para o menu mobile
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
      document.querySelector('.nav-icons').classList.toggle('show');
    });
    
    // Script para mostrar/ocultar senha
    document.querySelector('.toggle-password').addEventListener('click', function() {
      const senhaInput = document.querySelector('#senha');
      const icon = this.querySelector('i');
      
      if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        senhaInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
    
    // Script para seleção de perfil
    document.getElementById('btn-crianca').addEventListener('click', function() {
      window.location.href = 'area-crianca.html';
    });
    
    document.getElementById('btn-adulto').addEventListener('click', function() {
      document.querySelector('.profile-selection').style.display = 'none';
      document.getElementById('area-senha').style.display = 'flex';
    });
    
    document.getElementById('btn-voltar').addEventListener('click', function() {
      document.querySelector('.profile-selection').style.display = 'flex';
      document.getElementById('area-senha').style.display = 'none';
      document.getElementById('erro-senha').textContent = '';
      document.getElementById('senha').value = '';
    });
    
    document.getElementById('btn-validar').addEventListener('click', function() {
      const senha = document.getElementById('senha').value;
      
      // Simulação de validação
      if (senha === '123456') {
        window.location.href = 'area-pais.html';
      } else {
        document.getElementById('erro-senha').textContent = 'Senha incorreta. Tente novamente.';
      }
    });