document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('avatarNome');
    const personagem = localStorage.getItem('avatarPersonagem');
  
    if (nome && personagem) {
      document.getElementById('boas-vindas').innerText = `Bem-vindo(a), ${nome}!`;
  
      const img = document.createElement('img');
      img.src = `caminho/para/${personagem}.png`; // ajuste para seu caminho correto
      img.alt = personagem;
      img.style.width = '100px';
  
      document.getElementById('area-avatar').appendChild(img);
    } else {
      document.getElementById('boas-vindas').innerText = `Bem-vindo(a)! Crie seu avatar para começar.`;
    }
  });
  