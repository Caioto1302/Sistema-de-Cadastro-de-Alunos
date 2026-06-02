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

### Itens de Configuração:
  - codigo Fonte
  - scripts
  - README.md
  - pipeline de Integração Contínua (CI)
  - imagem Docker
  - arquivos YAML
  - documentação

### 📌 Baseline do Projeto

- Nome da Baseline: Baseline Final de Entrega - Release Estável
- Versão Associada: v2.0.0
- Arquivos que fazem parte:

 - Núcleo Back-end: `/back-end/src/*/`, `/back-end/prisma/schema.prisma`, `/back-end/Dockerfile`, `package.json`
- Núcleo Front-end: `/front-end/pages/*.html`, `/front-end/scripts/*.js`, `/front-end/styles/*.css`, `/front-end/Dockerfile`, `package.json`
- Orquestração e Infraestrutura: `docker-compose.yml`, `deployment.yaml` (Kubernetes)
- Automação e Configuração: `.github/workflows/ci.yml`, `tsconfig.json`, `.eslintrc.json`
- Documentação: `README.md`, `DOC_UNIDADE_2.md`

Porque ela pode ser considerada estável:
1. Imutabilidade: A aplicação está totalmente conteinerizada (Docker), garantindo que o comportamento em desenvolvimento seja idêntico ao de produção.
2. Orquestração: Possui configurações prontas para ambientes de alta disponibilidade, tanto em Docker Compose quanto em Kubernetes (deployment.yaml).
3. Persistência e Migrações: O esquema de banco de dados está versionado via Prisma, permitindo reconstruir o estado do banco de forma consistente.
4. Qualidade de Código: Integra fluxos de CI (GitHub Actions) e ferramentas de linting para garantir a integridade do código a cada alteração.
5. Prontidão para Deploy: A separação clara entre front-end (Nginx) e back-end (Node.js) permite escalabilidade independente dos serviços.


### 🔖 Versionamento do sistema
v1.0.0 - Versão Inicial

v1.1.0 - Implementação do Recurso de Notificação de Resposta de Chamado Por Email

v1.1.1 - Aprimoramento no Design do Site

v2.0.0 - Adição do Dockerfile e imagem Docker

v2.1.0 - Repaginação do Design do Site

v2.2.0 - Implementação do Gerenciamento de Usuários

v2.2.1 - Correção de pequenos bugs


### 🔄 Controle de Mudanças 
Mudança 1:
- Descrição: Refatoração completa da identidade visual e interface do usuário.
- Itens impactados: Todos os arquivos HTML do front-end, criação do arquivo `global.css`, reestruturação de arquivos CSS específicos (`login.css`, `inicio.css`, etc.).
- Motivo: Modernizar a estética do sistema e centralizar os estilos para facilitar a manutenção, adotando tema escuro (Dark Mode) com foco em usabilidade através de cards e paleta de cores consistente.
- Impacto: Melhora significativa na experiência do usuário (UX), maior fluidez na navegação e código CSS mais limpo e organizado.
- Status: ✅ Concluído

Mudança 2:
- Descrição: Implementação do módulo de gerenciamento de usuários para administradores.
- Itens impactados: Criação de `gerenciar-usuarios.html`, `editar-usuario.html`, scripts `gerenciar-usuarios.js` e `editar-usuario.js`, e novas rotas no back-end.
- Motivo: Necessidade de prover ferramentas administrativas para que os gestores possam visualizar, editar credenciais ou remover usuários cadastrados.
- Impacto: Aumento do controle operacional do sistema, permitindo a gestão direta da base de usuários de forma segura.
- Status: ✅ Concluído

Mudança 3:
- Descrição: Adição da funcionalidade de visibilidade da senha nos formulários de autenticação.
- Itens impactados: Páginas `index.html`, `cadastro.html` e `redefinir-senha.html`; criação do script `toggle-password.js`.
- Motivo: Melhorar a usabilidade nos formulários de autenticação, permitindo que o usuário verifique o que digitou e evite erros de preenchimento.
- Impacto: Redução de falhas de login por erros de digitação e melhora na percepção de segurança pelo usuário.
- Status: ✅ Concluído

Mudança 4:
- Descrição: Atualização e expansão do pipeline de Integração Contínua (CI).
- Itens impactados: Arquivo `.github/workflows/ci.yml`.
- Motivo: Automatizar a validação técnica do projeto, garantindo que novas alterações não quebrem o build do front-end ou a inicialização do back-end.
- Impacto: Aumento da confiabilidade do código através de testes automatizados de build em cada push, prevenindo erros em produção.
- Status: ✅ Concluído

### 📋 Solicitação de Mudança Fictícia

Título: Implementação do Módulo de Notificações Push para Alunos e Gestores

Descrição: Desenvolvimento e integração de um módulo de notificações push em tempo real na plataforma Uniclass, permitindo que alunos e gestores institucionais recebam alertas automáticos sobre abertura, atualização e encerramento de chamados. O módulo contempla notificações via aplicativo mobile (iOS e Android) e via e-mail, com configuração de preferências individuais por perfil de usuário.

Motivo: Análise de satisfação realizada no 1º trimestre de 2025 identificou que 67% dos alunos desconheciam atualizações nos seus chamados por falta de aviso proativo. A implementação de notificações push aumentará a transparência do processo e reduzirá o tempo médio de resposta em aproximadamente 40%.

Itens de Configuração Impactados:

- Código-fonte (`TypeScript + Node.js`): lógica do módulo de notificações adicionada diretamente na aplicação
- Scripts: comandos de build e execução com ajustes para contemplar as novas dependências
- Arquivos de configuração: novos parâmetros de conexão com o Firebase e variáveis de ambiente
- Pipeline de CI (GitHub Actions): ajustado para validar e testar o novo módulo a cada entrega
- Documentação (`README.md`): atualizada com instruções de configuração do Firebase e variáveis de ambiente necessárias

Impacto Técnico:

- Criação de 3 novas tabelas no banco de dados (tokens de dispositivos, histórico de notificações e preferências por usuário)
- Adição de 5 novos endpoints na API (registrar dispositivo, desativar, disparar notificação manual, consultar preferências e consultar histórico)
- Integração do SDK do Firebase no app mobile
- Enfileiramento de notificações para evitar impacto no tempo de resposta da API
- Limite de 500 notificações por minuto com escalonamento automático de instâncias

Riscos Envolvidos:

- **Falha no Firebase Cloud Messaging:** em caso de instabilidade do Google, o sistema envia e-mail como fallback e retenta por até 24h
- **Vazamento de token de dispositivo:** mitigado com criptografia dos tokens e controle de acesso por permissão
- **Sobrecarga da fila em picos:** controlado pelo limite de 500 notificações/min e escalonamento automático

Prioridade: Alta — impacta diretamente a experiência do usuário e a efetividade do sistema.

Necessidade de Testes: Sim.

- Testes Unitários (Jest): validação isolada de cada componente do módulo
- Testes de Integração: verificação da comunicação entre a API e o Firebase Cloud Messaging
- Testes Mobile: simulação do fluxo completo (abertura de chamado → notificação na tela) em iOS e Android
- Testes de Stress: simulação de picos de acesso para garantir que filas e banco de dados não travam

Decisão: Mudança aprovada pelo Comitê de Mudanças (CAB) em 27/05/2025, com votos favoráveis do CTO, da Gerente de Projetos e do responsável pela Segurança da Informação. A aprovação da área de segurança foi condicionada à revisão do modelo de criptografia dos tokens antes do deploy em produção. Deploy autorizado para 18/06/2025, na janela de manutenção das 22h às 02h.

---

### 📦 Gerência de Dependências

#### Quais dependências o projeto utiliza?

Frameworks e Bibliotecas (Back-end):

| Dependência | Descrição |
|---|---|
| `fastify` | Framework web de alta performance para Node.js |
| `prisma ORM` | Mapeamento objeto-relacional e manipulação do banco de dados (PostgreSQL) |
| `zod` | Validação de esquemas e tipos de dados |
| `bcrypt` | Criptografia (hashing) de senhas |
| `jsonwebtoken (JWT)` | Autenticação baseada em tokens |
| `nodemailer` | Serviço de envio de e-mails |
| `cors` | Middleware para habilitar compartilhamento de recursos entre origens |

Ferramentas de Desenvolvimento:

| Dependência | Descrição |
|---|---|
| `typescript` | Linguagem base do projeto |
| `tsx` | Executor de TypeScript para ambiente de desenvolvimento |
| `eslint` | Padronização e qualidade do código |

Frameworks e Bibliotecas (Front-end):

| Dependência | Descrição |
|---|---|
| `vite` | Ferramenta de build e servidor de desenvolvimento rápido |

Infraestrutura e Ambiente:

| Dependência | Descrição |
|---|---|
| `docker` | Containerização da aplicação |

---

#### Onde essas dependências estão registradas?

1. `back-end/package.json` — dependências de runtime (`dependencies`) e de desenvolvimento (`devDependencies`) da API
2. `front-end/package.json` — dependências necessárias para o front-end
3. `back-end/Dockerfile` e `front-end/Dockerfile` — imagens base (ex.: `node:20-alpine`) e versões das ferramentas de sistema
4. `docker-compose.yml` — orquestração dos serviços e versões das imagens construídas
5. `package-lock.json` (em ambas as pastas) — versões exatas e sub-dependências instaladas, garantindo determinismo

---

#### Qual risco existe se uma dependência for atualizada sem teste?

- Quebra de funcionalidade (Breaking Changes): atualizações major podem remover ou alterar funções existentes, impedindo a compilação ou execução do projeto
- Incompatibilidade entre pacotes: uma dependência atualizada pode exigir versão de outra biblioteca incompatível com o projeto, gerando conflitos
- Instabilidade e bugs: novas versões podem introduzir regressões que afetam a experiência do usuário
- Regressão de performance: a atualização pode tornar o sistema mais lento ou consumir mais memória de forma inesperada

---

#### Como a equipe controlaria a atualização dessas dependências?

1. Uso de arquivos de lock: manter o `package-lock.json` no repositório para garantir que todos usem a mesma versão testada
2. Versionamento semântico (SemVer): utilizar prefixos como `^` ou `~` no `package.json` com cautela, ou fixar versões exatas para dependências críticas
3. Pipeline de CI/CD: testes automatizados que rodam sempre que uma dependência é alterada
4. Ambiente de homologação: atualizar e testar dependências em ambiente de staging antes de subir para produção
5. Auditorias de segurança: utilizar `npm audit` para identificar e atualizar dependências com vulnerabilidades conhecidas de forma controlada

---

### 🔍 Auditoria de Configuração

| Item Verificado | Conforme? |
|---|---|
| README atualizado | ✅ Sim |
| Dockerfile presente | ✅ Sim |
| `deployment.yaml` presente | ✅ Sim |
| Imagem Docker versionada | ✅ Sim |
| Baseline definida | ✅ Sim |
| Mudanças registradas | ✅ Sim |

