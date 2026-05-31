# Documentação de Evolução do Projeto - 2ª Unidade

## 8.4 Controle de Mudanças

Abaixo estão registradas as principais alterações realizadas no sistema UniClass durante a transição da 1ª para a 2ª unidade.

---

### Mudança 1
**Descrição:** Refatoração completa da identidade visual e interface do usuário (UI).
**Itens impactados:** Todos os arquivos HTML do front-end, criação do arquivo `global.css`, reestruturação de arquivos CSS específicos (`login.css`, `inicio.css`, etc.).
**Motivo:** Modernizar a estética do sistema e centralizar os estilos para facilitar a manutenção, adotando um tema escuro (Dark Mode) com foco em usabilidade através de cards e paleta de cores consistente (Azul Escuro, Amarelo e Vermelho).
**Impacto:** Melhora significativa na experiência do usuário (UX), maior fluidez na navegação e código CSS mais limpo e organizado (sem redundâncias).
**Status:** Concluído.

---

### Mudança 2
**Descrição:** Implementação do módulo de Gerenciamento de Usuários para administradores.
**Itens impactados:** Criação de `gerenciar-usuarios.html`, `editar-usuario.html`, scripts `gerenciar-usuarios.js` e `editar-usuario.js`, e novas rotas no back-end.
**Motivo:** Necessidade de prover ferramentas administrativas para que os gestores do sistema possam visualizar, editar credenciais ou remover usuários cadastrados.
**Impacto:** Aumento do controle operacional do sistema, permitindo a gestão direta da base de usuários de forma segura através de permissões de administrador.
**Status:** Concluído.

---

### Mudança 3
**Descrição:** Adição da funcionalidade de visibilidade da senha (Revelar/Esconder).
**Itens impactados:** Páginas de login (`index.html`), cadastro (`cadastro.html`) e redefinição de senha (`redefinir-senha.html`); criação do script `toggle-password.js`.
**Motivo:** Melhorar a usabilidade nos formulários de autenticação, permitindo que o usuário verifique o que digitou e evite erros de preenchimento.
**Impacto:** Redução de falhas de login por erros de digitação e melhora na percepção de segurança e controle por parte do usuário final.
**Status:** Concluído.
