import { API_BASE_URL, renderErrorMessage } from './config.js';

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

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search)
  const chamadoId = params.get('id')
  const token = localStorage.getItem('token')

  const detalhesLista = document.getElementById('detalhes-chamado-lista')
  const respostasLista = document.getElementById('respostas-lista')

  try {
    const response = await fetch(`${API_BASE_URL}/chamado/${chamadoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) throw new Error('Erro ao buscar chamado')

    const chamado = await response.json()

    detalhesLista.innerHTML = `
      <div class="detalhes-card">
        <div class="detalhes-header">
            <h1 class="detalhes-titulo">${chamado.titulo}</h1>
            <span class="detalhes-status ${getStatusClass(chamado.status)}">${traduzirStatus(chamado.status)}</span>
        </div>
        <div class="detalhes-meta">
            <span><i class='bx bxs-id-card'></i> <strong>ID:</strong> #${chamado.id}</span>
            <span><i class='bx bxs-calendar'></i> <strong>Criado em:</strong> ${new Date(chamado.dataCriacao).toLocaleDateString('pt-BR')}</span>
        </div>
        <div class="detalhes-descricao">
            <span class="detalhes-descricao-label">Descrição do Problema:</span>
            <p>${chamado.descricao}</p>
        </div>
      </div>
    `

    if (chamado.Respostas && chamado.Respostas.length > 0) {
      respostasLista.innerHTML = chamado.Respostas.map(
        (resposta) => `
          <div class="resposta-card">
              <div class="resposta-header">
                  <span class="resposta-autor">
                      <i class='bx bxs-user-circle'></i>
                      ${resposta.usuario_id.nome} (Admin)
                  </span>
                  <span class="resposta-data">
                      ${new Date(resposta.dataEnvio).toLocaleString('pt-BR')}
                  </span>
              </div>
              <div class="resposta-conteudo">
                  <p>${resposta.mensagem}</p>
              </div>
          </div>
          `,
      ).join('')
    } else {
      respostasLista.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Este chamado ainda não possui respostas.</p>'
    }
  } catch (err) {
    detalhesLista.innerHTML = renderErrorMessage(
      'Erro ao carregar detalhes',
      err.message || 'Não foi possível buscar os dados do chamado.'
    );
    respostasLista.innerHTML = '';
  }

  // Função para traduzir status
  const btnDeletar = document.getElementById('deletar-chamado-btn')
  if (btnDeletar) {
    btnDeletar.addEventListener('click', async () => {
      if (confirm('Tem certeza que deseja deletar este chamado?')) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/chamados/${chamadoId}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          if (!response.ok) {
            const erro = await response.json()
            alert('Erro ao deletar chamado: ' + (erro.message || ''))
            return
          }
          alert('Chamado deletado com sucesso!')
          window.location.href = 'acompanhar-chamados.html'
        } catch (err) {
          alert('Erro ao deletar chamado!')
        }
      }
    })
  }
})
