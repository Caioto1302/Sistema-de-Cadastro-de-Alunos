import { API_BASE_URL } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '../index.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const usuarioId = urlParams.get('id');

  if (!usuarioId) {
    alert('ID do usuário não fornecido na URL.');
    window.location.href = 'gerenciar-usuarios.html';
    return;
  }

  const formEdit = document.querySelector('.form-edit');
  const inputNome = document.querySelector('#edit-nome');
  const inputEmail = document.querySelector('#edit-email');
  const inputPassword = document.querySelector('#edit-password');
  const inputEhAdm = document.querySelector('#edit-eh-adm');

  // Buscar detalhes do usuário para popular o form
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/${usuarioId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar informações do usuário.');
    }

    const usuario = await response.json();
    inputNome.value = usuario.nome;
    inputEmail.value = usuario.email;
    inputEhAdm.value = usuario.ehAdm.toString();

  } catch (err) {
    console.error(err);
    alert('Erro ao carregar o usuário. Verifique o console.');
    window.location.href = 'gerenciar-usuarios.html';
  }

  // Lidar com a submissão do formulário
  formEdit.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoNome = inputNome.value.trim();
    const novoEmail = inputEmail.value.trim();
    const novaSenha = inputPassword.value.trim();
    const ehAdm = inputEhAdm.value === 'true';

    const corpoRequisicao = { ehAdm };
    if (novoNome) corpoRequisicao.nome = novoNome;
    if (novoEmail) corpoRequisicao.email = novoEmail;
    if (novaSenha) {
      if (novaSenha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
      corpoRequisicao.senha = novaSenha;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(corpoRequisicao)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar o usuário.');
      }

      alert('Usuário atualizado com sucesso!');
      window.location.href = 'gerenciar-usuarios.html';
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro ao atualizar o usuário.');
    }
  });

  // Lidar com a exclusão do usuário
  const btnDelete = document.querySelector('#btn-delete');
  if (btnDelete) {
    btnDelete.addEventListener('click', async () => {
      const confirmar = confirm('Tem certeza que deseja excluir este usuário? Esta ação apagará todos os chamados e respostas vinculados a ele e não pode ser desfeita.');
      if (!confirmar) return;

      try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${usuarioId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao excluir o usuário.');
        }

        alert('Usuário excluído com sucesso!');
        window.location.href = 'gerenciar-usuarios.html';
      } catch (err) {
        console.error(err);
        alert(err.message || 'Erro ao excluir o usuário.');
      }
    });
  }
});