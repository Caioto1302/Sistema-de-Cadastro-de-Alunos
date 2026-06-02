# Sistema-de-Cadastro-de-Alunos

## 📝 Descrição
Sistema web para cadastro, acompanhamento e gerenciamento de chamados acadêmicos, facilitando a comunicação entre alunos e administração da instituição.

## 🎯 Objetivo
Oferecer uma plataforma intuitiva para alunos registrarem solicitações, acompanharem o status dos chamados e permitirem que administradores gerenciem e respondam de forma eficiente.

## 📁 Estrutura
- **back-end/**: Código do servidor Node.js (Fastify, Prisma, rotas, serviços, validações, etc).
- **front-End/**: Páginas HTML, CSS e scripts JS para a interface do usuário.
- **docs/**: Documentação e arquivos auxiliares.
- **README.md**: Documentação do projeto.

## ⚙️ Explicação do Workflow
O workflow é definido no arquivo: .github/workflows/ci.yml

Ele descreve todas as etapas automatizadas que serão executadas sempre que houver uma atualização no código.
## 🔄 Explicação do Pipeline
O pipeline consiste em um conjunto de etapas automatizadas que garantem que o projeto esteja funcionando corretamente. Neste projeto, o pipeline executa:

- Exibição de mensagem no console (verificação básica)
- Execução de script do projeto
- Listagem dos arquivos do repositório

Essas etapas ajudam a validar rapidamente se o código está íntegro após alterações.
## 🧩 Tecnologias
* **Node.js**
* **TypeScript**
* **Prisma**
* **Fastify**
## 🚦 Fluxo de execução do pipeline
O fluxo do pipeline ocorre da seguinte forma:

1. Um push é realizado no repositório (branch main ou master)
2. O GitHub Actions é acionado automaticamente
3. O ambiente virtual (Ubuntu) é iniciado
4. O repositório é clonado
5. As etapas do pipeline são executadas em sequência:
    - Exibir mensagem no console
    - Executar script do projeto
    - Listar arquivos
6. O pipeline finaliza indicando sucesso ou falha

## 📜 Gerência de Configuração

# Itens de Configuração:
  - codigo Fonte
  - scripts
  - README.md
  - pipeline de Integração Contínua (CI)
  - imagem Docker
  - arquivos YAML
  - documentação

# Baseline do Projeto

- Nome da Baseline: Baseline Final de Entrega - Release Estável
- Versão Associada: v2.0.0
- Arquivos que fazem parte:
  * Núcleo Back-end: /back-end/src/*/,
     /back-end/prisma/schema.prisma, /back-end/Dockerfile e     
     package.json.
   * Núcleo Front-end: /front-end/pages/*.html,
     /front-end/scripts/.js, /front-end/styles/.css,
     /front-end/Dockerfile e package.json.
   * Orquestração e Infraestrutura: docker-compose.yml e        
     deployment.yaml (Kubernetes).
   * Automação e Configuração: .github/workflows/ci.yml,        
     tsconfig.json e .eslintrc.json.
   * Documentação: README.md e DOC_UNIDADE_2.md.
   
Porque ela pode ser considerada estável:
1. Imutabilidade: A aplicação está totalmente conteinerizada (Docker), garantindo que o comportamento em desenvolvimento seja idêntico ao de produção.
2. Orquestração: Possui configurações prontas para ambientes de alta disponibilidade, tanto em Docker Compose quanto em Kubernetes (deployment.yaml).
3. Persistência e Migrações: O esquema de banco de dados está versionado via Prisma, permitindo reconstruir o estado do banco de forma consistente.
4. Qualidade de Código: Integra fluxos de CI (GitHub Actions) e ferramentas de linting para garantir a integridade do código a cada alteração.
5. Prontidão para Deploy: A separação clara entre front-end (Nginx) e back-end (Node.js) permite escalabilidade independente dos serviços.


# Versionamento do sistema
v1.0.0 - Versão Inicial
v1.1.0 - Implementação do Recurso de Notificação de Resposta de Chamado Por Email
v1.1.1 - Aprimoramento no Design do Site
v2.0.0 - Adição do Dockerfile e imagem Docker
v2.1.0 - Repaginação do Design do Site
v2.2.0 - Implementação do Gerenciamento de Usuários
v2.2.1 - Correção de pequenos bugs


# Controle de Mudanças 
Mudança 1:
- Descrição: Refatoração completa da identidade visual e interface do usuário (UI).
- Itens impactados: Todos os arquivos HTML do front-end, criação do arquivo global.css, reestruturação de arquivos CSS específicos (login.css, inicio.css, etc.).
- Motivo: Modernizar a estética do sistema e centralizar os estilos para facilitar a manutenção, adotando um tema escuro (Dark Mode) com foco em usabilidade através de cards e paleta de cores consistente.
- Impacto: Melhora significativa na experiência do usuário (UX), maior fluidez na navegação e código CSS mais limpo e organizado.
Status: Concluído

Mudança 2:
- Descrição: Implementação do módulo de Gerenciamento de Usuários para administradores.
- Itens impactados: Criação de gerenciar-usuarios.html, editar-usuario.html, scripts gerenciar-usuarios.js e editar-usuario.js, e novas rotas no back-end.
- Motivo: Necessidade de prover ferramentas administrativas para que os gestores do sistema possam visualizar, editar credenciais ou remover usuários cadastrados.
- Impacto: Aumento do controle operacional do sistema, permitindo a gestão direta da base de usuários de forma segura.
Status: Concluído

Mudança 3:
- Descrição: Adição da funcionalidade de visibilidade da senha (Revelar/Esconder).
- Itens impactados: Páginas de login (index.html), cadastro (cadastro.html) e redefinição de senha (redefinir-senha.html); criação do script toggle-password.js.
- Motivo: Melhorar a usabilidade nos formulários de autenticação, permitindo que o usuário verifique o que digitou e evite erros de preenchimento.
- Impacto: Redução de falhas de login por erros de digitação e melhora na percepção de segurança pelo usuário.
Status: Concluído

Mudança 4:
- Descrição: Atualização e expansão do pipeline de Integração Contínua (CI).
- Itens impactados: Arquivo .github/workflows/ci.yml.
- Motivo: Automatizar a validação técnica do projeto, garantindo que novas alterações não quebrem o build do front-end ou a inicialização do back-end, além de padronizar a instalação de dependências em ambiente de nuvem.
- Impacto: Aumento da confiabilidade do código através de testes automatizados de build em cada push, prevenindo erros em produção e assegurando que as dependências de ambas as frentes (Back e Front) estejam sempre compatíveis.
Status: Concluído



