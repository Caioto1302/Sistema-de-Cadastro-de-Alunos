import { API_BASE_URL, renderErrorMessage } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token')
  const listaChamados = document.querySelector('#chamados')

  try {
    const response = await fetch(`${API_BASE_URL}/chamados`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        listaChamados.innerHTML = '<h2 style="text-align: center; color: var(--text-muted); margin-top: 2rem; grid-column: 1 / -1;">Nenhum chamado em aberto</h2>';
        return;
      }
      throw new Error('Erro ao buscar chamados');
    }

    const chamados = await response.json();

    if (chamados.length === 0) {
      listaChamados.innerHTML = '<h2 style="text-align: center; color: var(--text-muted); margin-top: 2rem; grid-column: 1 / -1;">Nenhum chamado em aberto</h2>';
      return;
    }

    function traduzirStatus(status) {
    switch (status) {
        case 'EmAndamento': return 'Em Andamento';
        case 'Aberto': return 'Aberto';
        case 'Concluido': return 'Concluído';
        default: return status;
    }
    }

    function getStatusClass(status) {
        return `status-${status.toLowerCase()}`;
    }

    listaChamados.innerHTML = chamados
      .map(
        (chamado) => `
        <div class="chamado-card">
            <div class="chamado-header">
                <h3 class="chamado-titulo">${chamado.titulo}</h3>
                <span class="chamado-status ${getStatusClass(chamado.status)}">${traduzirStatus(chamado.status)}</span>
            </div>
            <p class="chamado-autor">Aberto por: ${chamado.usuarios?.nome ?? 'Desconhecido'} (${chamado.usuarios?.email ?? 'Sem e-mail'})</p>
            <p class="chamado-id">#${chamado.id}</p>
            <p class="chamado-data">Criado em: ${new Date(chamado.dataCriacao).toLocaleDateString('pt-BR')}</p>
            <a href="editar-admin.html?id=${chamado.id}" class="btn-details ver-detalhes-btn" data-id="${chamado.id}">
                Gerenciar Chamado <i class='bx bx-right-arrow-alt'></i>
            </a>
        </div>
    `,
      )
      .join('')
      
  } catch (err) {
    console.error('Falha ao carregar os chamados:', err);
    listaChamados.innerHTML = renderErrorMessage(
      'Erro ao Carregar Chamados',
      err.message || 'Não foi possível buscar os dados. Por favor, verifique o console para mais detalhes ou tente novamente mais tarde.'
    );
  }
})
