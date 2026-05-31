import { API_BASE_URL } from './config.js';

document
  .querySelector('#recuperar-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = document.querySelector('#email').value
    try {
      const response = await fetch(`${API_BASE_URL}/recuperar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        alert('E-mail de recuperação enviado!')
      } else {
        const error = await response.json()
        alert(`Erro: ${error.message}`)
      }
    } catch {
      alert('Erro ao conectar ao servidor.')
    }
  })
