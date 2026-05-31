import"./modulepreload-polyfill-Dezn_h7o.js";/* empty css               */import{n as e,t}from"./config-DPSuE5lU.js";import"./logout-B0Sq76Co.js";import"./proteger-admin-B9nYTbku.js";function n(e){switch(e){case`EmAndamento`:return`Em Andamento`;case`Aberto`:return`Aberto`;case`Concluido`:return`Concluído`;default:return e}}function r(e){return`status-${e.toLowerCase()}`}function i(e){let t=document.getElementById(`detalhes-chamado-card`),i=new Date(e.dataCriacao).toLocaleDateString(`pt-BR`),a=n(e.status),o=r(e.status);t.innerHTML=`
        <div class="detalhes-header">
            <h1 class="detalhes-titulo">${e.titulo}</h1>
            <span class="detalhes-status ${o}">${a}</span>
        </div>
        <div class="detalhes-meta">
            <span><i class='bx bxs-user'></i> <strong>Autor:</strong> ${e.usuarios?.nome??`Desconhecido`}</span>
            <span><i class='bx bxs-calendar'></i> <strong>Criado em:</strong> ${i}</span>
            <span><i class='bx bxs-id-card'></i> <strong>ID:</strong> #${e.id}</span>
        </div>
        <div class="detalhes-descricao">
            <p>${e.descricao}</p>
        </div>
        <form id="editar-status-form">
            <div class="form-group" style="margin-top: 2rem;">
                <label for="status">Alterar Status do Chamado</label>
                <select id="status" class="form-control">
                    <option value="Aberto" ${e.status===`Aberto`?`selected`:``}>Aberto</option>
                    <option value="EmAndamento" ${e.status===`EmAndamento`?`selected`:``}>Em Andamento</option>
                    <option value="Concluido" ${e.status===`Concluido`?`selected`:``}>Concluído</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Salvar Status</button>
        </form>
    `}function a(e){let t=document.getElementById(`respostas-lista`);if(!e||e.length===0){t.innerHTML=`<p style="text-align: center; color: var(--text-muted);">Nenhuma resposta para este chamado ainda.</p>`;return}t.innerHTML=e.map(e=>`
        <div class="resposta-card">
            <div class="resposta-header">
                <span class="resposta-autor">
                    <i class='bx bxs-user-circle'></i>
                    ${e.usuario_id.nome} (Admin)
                </span>
                <span class="resposta-data">
                    ${new Date(e.dataEnvio).toLocaleString(`pt-BR`)}
                </span>
            </div>
            <div class="resposta-conteudo">
                <p>${e.mensagem}</p>
            </div>
        </div>
    `).join(``)}async function o(n,r){try{let e=await fetch(`${t}/chamado/${n}`,{headers:{Authorization:`Bearer ${r}`}});if(!e.ok)throw Error(`Erro ao buscar detalhes do chamado.`);let o=await e.json();i(o),a(o.Respostas)}catch(t){console.error(t),document.querySelector(`main`).innerHTML=e(`Erro ao carregar`,t.message||`Não foi possível carregar os detalhes do chamado.`)}}document.addEventListener(`DOMContentLoaded`,()=>{let e=new URLSearchParams(window.location.search).get(`id`),n=localStorage.getItem(`token`);if(!e){window.location.href=`gerenciar-admin.html`;return}o(e,n),document.addEventListener(`submit`,async r=>{if(r.target.id===`editar-status-form`){r.preventDefault();let i=document.getElementById(`status`).value;try{let r=await fetch(`${t}/chamados/${e}`,{method:`PUT`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${n}`},body:JSON.stringify({status:i})});if(r.ok)alert(`Status atualizado com sucesso!`),location.reload();else{let e=await r.json();alert(`Erro ao atualizar status: ${e.message}`)}}catch(e){console.error(`Erro de rede:`,e),alert(`Erro de conexão ao tentar atualizar o status.`)}}if(r.target.id===`nova-resposta-form`){r.preventDefault();let i=document.getElementById(`mensagem`).value;try{let r=await fetch(`${t}/chamados/${e}/respostas`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${n}`},body:JSON.stringify({mensagem:i})});if(r.ok)alert(`Resposta enviada com sucesso!`),location.reload();else{let e=await r.json();alert(`Erro ao enviar resposta: ${e.message}`)}}catch(e){console.error(`Erro de rede:`,e),alert(`Erro de conexão ao tentar enviar a resposta.`)}}})});