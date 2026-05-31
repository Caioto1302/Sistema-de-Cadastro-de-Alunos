import"./modulepreload-polyfill-Dezn_h7o.js";/* empty css               */import"./proteger-pagina-CCLhLS-N.js";import{n as e,t}from"./config-DPSuE5lU.js";import"./logout-B0Sq76Co.js";function n(e){switch(e){case`EmAndamento`:return`Em Andamento`;case`Aberto`:return`Aberto`;case`Concluido`:return`Concluído`;default:return e}}function r(e){return`status-${e.toLowerCase()}`}document.addEventListener(`DOMContentLoaded`,async()=>{let i=new URLSearchParams(window.location.search).get(`id`),a=localStorage.getItem(`token`),o=document.getElementById(`detalhes-chamado-lista`),s=document.getElementById(`respostas-lista`);try{let e=await fetch(`${t}/chamado/${i}`,{headers:{Authorization:`Bearer ${a}`}});if(!e.ok)throw Error(`Erro ao buscar chamado`);let c=await e.json();o.innerHTML=`
      <div class="detalhes-card">
        <div class="detalhes-header">
            <h1 class="detalhes-titulo">${c.titulo}</h1>
            <span class="detalhes-status ${r(c.status)}">${n(c.status)}</span>
        </div>
        <div class="detalhes-meta">
            <span><i class='bx bxs-calendar'></i> <strong>Criado em:</strong> ${new Date(c.dataCriacao).toLocaleDateString(`pt-BR`)}</span>
            <span><i class='bx bxs-id-card'></i> <strong>ID:</strong> #${c.id}</span>
        </div>
        <div class="detalhes-descricao">
            <p>${c.descricao}</p>
        </div>
      </div>
    `,c.Respostas&&c.Respostas.length>0?s.innerHTML=c.Respostas.map(e=>`
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
          `).join(``):s.innerHTML=`<p style="text-align: center; color: var(--text-muted);">Este chamado ainda não possui respostas.</p>`}catch(t){o.innerHTML=e(`Erro ao carregar detalhes`,t.message||`Não foi possível buscar os dados do chamado.`),s.innerHTML=``}let c=document.getElementById(`deletar-chamado-btn`);c&&c.addEventListener(`click`,async()=>{if(confirm(`Tem certeza que deseja deletar este chamado?`))try{let e=await fetch(`${t}/chamados/${i}`,{method:`DELETE`,headers:{Authorization:`Bearer ${a}`}});if(!e.ok){let t=await e.json();alert(`Erro ao deletar chamado: `+(t.message||``));return}alert(`Chamado deletado com sucesso!`),window.location.href=`acompanhar-chamados.html`}catch{alert(`Erro ao deletar chamado!`)}})});