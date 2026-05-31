import { API_BASE_URL, renderErrorMessage } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const listaUsuarios = document.querySelector('.user-list-container');

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
});