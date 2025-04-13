    // Script para o menu mobile
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        document.querySelector('.nav-icons').classList.toggle('show');
      });
      
      // Script para o accordion
      document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
          this.parentElement.classList.toggle('active');
        });
      });
      
      // Script para as abas de categorias
      document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
          // Remove active class from all tabs
          document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Hide all categories
          document.querySelectorAll('.faq-category').forEach(cat => cat.classList.remove('active'));
          // Show selected category
          document.getElementById(this.dataset.category).classList.add('active');
        });
      });