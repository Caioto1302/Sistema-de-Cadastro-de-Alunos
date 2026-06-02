import { API_BASE_URL, renderErrorMessage } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const listaUsuarios = document.querySelector('.user-list-container');

  // Elementos do Modal
  const modal = document.getElementById('create-user-modal');
  const btnOpenModal = document.getElementById('btn-open-modal');
  const spanCloseModal = document.querySelector('.close-modal');
  const formCreateUser = document.getElementById('form-create-user');

  async function carregarUsuarios() {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          listaUsuarios.innerHTML = '<h2 style="text-align: center; color: var(--text-muted); margin-top: 2rem;">Nenhum usuário encontrado no sistema</h2>';
          return;
        }
        throw new Error('Erro ao buscar usuários');
      }

      const usuarios = await response.json();

      if (usuarios.length === 0) {
        listaUsuarios.innerHTML = '<h2 style="text-align: center; color: var(--text-muted); margin-top: 2rem;">Nenhum usuário encontrado no sistema</h2>';
        return;
      }

      listaUsuarios.innerHTML = usuarios.map(usuario => {
        const isAdm = usuario.ehAdm;
        const roleText = isAdm ? 'Administrador' : 'Usuário Padrão';
        const roleColor = isAdm ? 'color: var(--accent-red);' : 'color: var(--accent-yellow);';
        
        return `
          <div class="user-card" onclick="window.location.href='editar-usuario.html?id=${usuario.id}'">
              <div class="user-info">
                  <span class="user-name">${usuario.nome}</span>
                  <span class="user-email">${usuario.email}</span>
                  <span class="user-role" style="${roleColor}">${roleText}</span>
              </div>
              <div class="user-actions">
                  <i class='bx bxs-edit'></i>
              </div>
          </div>
        `;
      }).join('');

    } catch (err) {
      console.error('Falha ao carregar os usuários:', err);
      listaUsuarios.innerHTML = renderErrorMessage(
        'Erro ao Carregar Usuários',
        err.message || 'Não foi possível buscar os dados.'
      );
    }
  }

  // Carregar inicialmente
  await carregarUsuarios();

  // Modal Control
  const toggleModal = (show) => {
    if (show) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  btnOpenModal.onclick = () => toggleModal(true);
  spanCloseModal.onclick = () => toggleModal(false);

  window.onclick = (event) => {
    if (event.target == modal) {
      toggleModal(false);
    }
  }

  // Form Submission
  formCreateUser.onsubmit = async (e) => {
    e.preventDefault();

    const nome = document.getElementById('new-nome').value.trim();
    const sobrenome = document.getElementById('new-sobrenome').value.trim();
    const email = document.getElementById('new-email').value.trim();
    const senha = document.getElementById('new-password').value.trim();
    const ehAdm = document.getElementById('new-eh-adm').value === 'true';

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          sobrenome,
          email,
          senha,
          ehAdm
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar usuário');
      }

      alert('Usuário criado com sucesso!');
      toggleModal(false);
      formCreateUser.reset();
      await carregarUsuarios();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
});