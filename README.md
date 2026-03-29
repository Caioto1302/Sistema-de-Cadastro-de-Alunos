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
