document.addEventListener('DOMContentLoaded', () => {
  const paginasLivres = [
    'index.html',
    '', // Permite o acesso à raiz do site pelo Vite (http://localhost:5173/)
    'cadastro.html',
    'recuperar-senha.html',
    'redefinir-senha.html',
  ]
  const paginaAtual = window.location.pathname.split('/').pop()

  if (!paginasLivres.includes(paginaAtual)) {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/index.html'
    }
  }
})
