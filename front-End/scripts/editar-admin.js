import { API_BASE_URL, renderErrorMessage } from './config.js';

// Funções auxiliares
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

// Renderiza o card de detalhes do chamado
function renderizarDetalhes(chamado) {
    const detalhesCard = document.getElementById('detalhes-chamado-card');
    const dataCriacao = new Date(chamado.dataCriacao).toLocaleDateString('pt-BR');
    const statusTraduzido = traduzirStatus(chamado.status);
    const statusClass = getStatusClass(chamado.status);

    detalhesCard.innerHTML = `
        <div class="detalhes-header">
            <h1 class="detalhes-titulo">${chamado.titulo}</h1>
            <span class="detalhes-status ${statusClass}">${statusTraduzido}</span>
        </div>
        <div class="detalhes-meta">
            <span><i class='bx bxs-user'></i> <strong>Autor:</strong> ${chamado.usuarios?.nome ?? 'Desconhecido'}</span>
            <span><i class='bx bxs-envelope'></i> <strong>E-mail:</strong> ${chamado.usuarios?.email ?? 'N/A'}</span>
            <span><i class='bx bxs-id-card'></i> <strong>ID:</strong> #${chamado.id}</span>
            <span><i class='bx bxs-calendar'></i> <strong>Criado em:</strong> ${dataCriacao}</span>
        </div>
        <div class="detalhes-descricao">
            <span class="detalhes-descricao-label">Descrição do Chamado:</span>
            <p>${chamado.descricao}</p>
        </div>
        <form id="editar-status-form">
            <div class="form-group" style="margin-top: 2rem;">
                <label for="status">Gerenciar Status</label>
                <select id="status" class="form-control">
                    <option value="Aberto" ${chamado.status === 'Aberto' ? 'selected' : ''}>Aberto</option>
                    <option value="EmAndamento" ${chamado.status === 'EmAndamento' ? 'selected' : ''}>Em Andamento</option>
                    <option value="Concluido" ${chamado.status === 'Concluido' ? 'selected' : ''}>Concluído</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Atualizar Chamado</button>
        </form>
    `;
}

// Renderiza a lista de respostas
function renderizarRespostas(respostas) {
    const respostasLista = document.getElementById('respostas-lista');
    if (!respostas || respostas.length === 0) {
        respostasLista.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Nenhuma resposta para este chamado ainda.</p>';
        return;
    }

    respostasLista.innerHTML = respostas.map(resposta => `
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
    `).join('');
}

// Carrega os dados do chamado
async function carregarChamado(chamadoId, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/chamado/${chamadoId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Erro ao buscar detalhes do chamado.');
        
        const chamado = await response.json();
        renderizarDetalhes(chamado);
        renderizarRespostas(chamado.Respostas);
    } catch (error) {
        console.error(error);
        document.querySelector('main').innerHTML = renderErrorMessage(
            'Erro ao carregar',
            error.message || 'Não foi possível carregar os detalhes do chamado.'
        );
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const chamadoId = params.get('id');
    const token = localStorage.getItem('token');

    if (!chamadoId) {
        window.location.href = 'gerenciar-admin.html';
        return;
    }

    carregarChamado(chamadoId, token);

    // Delegação de eventos para os formulários
    document.addEventListener('submit', async (event) => {
        // Submissão do formulário de status
        if (event.target.id === 'editar-status-form') {
            event.preventDefault();
            const status = document.getElementById('status').value;
            
            try {
                const response = await fetch(`${API_BASE_URL}/chamados/${chamadoId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                });

                if (response.ok) {
                    alert('Status atualizado com sucesso!');
                    location.reload();
                } else {
                    const error = await response.json();
                    alert(`Erro ao atualizar status: ${error.message}`);
                }
            } catch (error) {
                console.error('Erro de rede:', error);
                alert('Erro de conexão ao tentar atualizar o status.');
            }
        }

        // Submissão do formulário de nova resposta
        if (event.target.id === 'nova-resposta-form') {
            event.preventDefault();
            const mensagem = document.getElementById('mensagem').value;

            try {
                const response = await fetch(`${API_BASE_URL}/respostas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ chamadoId, mensagem })
                });

                if (response.ok) {
                    alert('Resposta enviada com sucesso!');
                    location.reload();
                } else {
                    const error = await response.json();
                    alert(`Erro ao enviar resposta: ${error.message}`);
                }
            } catch (error) {
                console.error('Erro de rede:', error);
                alert('Erro de conexão ao tentar enviar a resposta.');
            }
        }
    });
});
