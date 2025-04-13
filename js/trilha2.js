document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.resposta');
    const feedback = document.getElementById('feedback');
  
    botoes.forEach((botao) => {
      botao.addEventListener('click', () => {
        if (botao.dataset.correta === 'true') {
          feedback.innerText = 'Muito bem! O peixe vive no mar!';
          feedback.style.color = 'green';
        } else {
          feedback.innerText = 'Essa não! Pense bem e tente novamente.';
          feedback.style.color = 'red';
        }
      });
    });
  });
  