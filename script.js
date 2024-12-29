
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  });
  
  
  document.getElementById('username-submit').addEventListener('click', () => {
    const username = document.getElementById('username-input').value.trim();
    if (username) {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('chat-container').style.display = 'block';
    }
  });
  
