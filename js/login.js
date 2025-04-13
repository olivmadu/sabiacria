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