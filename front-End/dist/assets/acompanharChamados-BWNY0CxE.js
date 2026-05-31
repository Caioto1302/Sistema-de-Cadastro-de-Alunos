import"./modulepreload-polyfill-Dezn_h7o.js";/* empty css               */import"./proteger-pagina-CCLhLS-N.js";import{n as e,t}from"./config-DPSuE5lU.js";import"./logout-B0Sq76Co.js";document.addEventListener(`DOMContentLoaded`,async()=>{let n=localStorage.getItem(`token`),r=document.querySelector(`#chamados`);try{let e=await fetch(`${t}/chamados`,{headers:{Authorization:`Bearer ${n}`}});if(!e.ok)throw Error(`Erro ao buscar chamados`);let i=await e.json();if(i.length===0){r.innerHTML=`<h1>Nenhum chamado encontrado.</h1>`;return}function a(e){switch(e){case`EmAndamento`:return`Em Andamento`;case`Aberto`:return`Aberto`;case`Concluido`:return`Concluído`;default:return e}}function o(e){return`status-${e.toLowerCase()}`}r.innerHTML=i.map(e=>`
        <div class="chamado-card">
            <div class="chamado-header">
                <h3 class="chamado-titulo">${e.titulo}</h3>
                <span class="chamado-status ${o(e.status)}">${a(e.status)}</span>
            </div>
            <p class="chamado-id">#${e.id}</p>
            <p class="chamado-data">Criado em: ${new Date(e.dataCriacao).toLocaleDateString(`pt-BR`)}</p>
            <a href="detalhes-chamado.html?id=${e.id}" class="btn-details ver-detalhes-btn" data-id="${e.id}">
                Ver Detalhes <i class='bx bx-right-arrow-alt'></i>
            </a>
        </div>
    `).join(``)}catch(t){r.innerHTML=e(`Erro ao carregar chamados`,t.message||`Houve um problema ao buscar os dados.`)}});