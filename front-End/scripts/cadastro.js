import { API_BASE_URL } from './config.js';

document
  .querySelector('#cadastro-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault()

    const nome = document.querySelector('#firstname').value
    const sobrenome = document.querySelector('#lastname').value
    const email = document.querySelector('#email').value
    const senha = document.querySelector('#password').value

    if (senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, sobrenome, email, senha }),
      })

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!')
        window.location.href = '/index.html' // Redireciona para a página de login
      } else {
        const error = await response.json()
        alert(`Erro: ${error.message}`)
      }
    } catch (err) {
      console.error('Erro ao enviar a requisição:', err)
      alert('Erro ao conectar ao servidor.')
    }
  })
