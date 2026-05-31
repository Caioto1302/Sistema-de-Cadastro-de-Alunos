import { API_BASE_URL } from './config.js';

document
  .querySelector('#redefinir-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault()
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const novaSenha = document.querySelector('#nova-senha').value
    const confirmarSenha = document.querySelector('#confirmar-senha').value
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!')
      return
    }
    try {
      const response = await fetch(`${API_BASE_URL}/redefinir-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, novaSenha }),
      })
      if (response.ok) {
        alert('Senha redefinida com sucesso!')
        window.location.href = '/index.html'
      } else {
        const error = await response.json()
        alert(`Erro: ${error.message}`)
      }
    } catch {
      alert('Erro ao conectar ao servidor.')
    }
  })
