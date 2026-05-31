# Plano de Refatoração de Design do Front-End (Atualizado em 31/05/2026)

## 1. Contexto & Estado Atual
O objetivo inicial de transformar o design do sistema **UniClass** para um tema escuro, moderno e baseado em cards foi **concluído com sucesso**. A paleta de cores (azul escuro, amarelo e vermelho) foi implementada em todas as páginas principais e o arquivo `global.css` centraliza os estilos fundamentais.

**Estado Atual:**
- `global.css` estabelecido com variáveis e classes base (`.card`, `.btn`, `.navbar`, `.footer`).
- Todas as páginas HTML (`index.html`, `inicio.html`, `cadastro.html`, etc.) migradas para o novo padrão.
- Sistema de proteção de rotas (JS) integrado com o novo layout.

## 2. Novos Objetivos (Fase de Consolidação)
Agora que a base visual está pronta, o foco muda para a melhoria da experiência do usuário (UX), desempenho do front-end e facilidade de manutenção.

**Metas:**
- **Otimização de CSS:** Remover redundâncias nos arquivos `.css` individuais e centralizar importações de fontes no `global.css`.
- **Feedback Interativo:** Adicionar estados de *hover*, *focus* e *loading* em todos os elementos interativos.
- **Padronização de Componentes Dinâmicos:** Garantir que o HTML gerado via JavaScript (listagem de chamados, respostas) siga rigorosamente as classes do `global.css`.
- **UX de Formulários:** Melhorar mensagens de erro/sucesso e validações em tempo real.

## 3. Plano de Ação (Próximas Fases)

### Fase 6: Limpeza e Manutenibilidade (Curto Prazo)
- **Remover Redundâncias:** Unificar a importação de fontes (`Open Sauce One` e `Beyonders`) apenas no `global.css`.
- **Auditoria de Classes:** Substituir classes específicas de página por classes globais onde for possível (ex: unificar estilos de `.hero-btn` com `.btn`).
- **Organização de Pastas:** (Opcional) Mover imagens e ícones para uma estrutura mais organizada se o projeto crescer.

### Fase 7: Experiência do Usuário & Feedback (Médio Prazo)
- **Botões com Loading:** Implementar um estado visual para botões durante chamadas de API para evitar múltiplos cliques.
- **Toasts de Notificação:** Substituir `alert()` do navegador por notificações customizadas (toasts) que combinem com o design.
- **Animações Suaves:** Adicionar transições de entrada para os cards e mudanças de estado suaves.

### Fase 8: Refatoração de Componentes JS (Longo Prazo)
- **Templates Reutilizáveis:** Criar funções JavaScript que retornam o HTML de componentes (ex: `createChamadoCard(dados)`) para garantir que qualquer mudança no `global.css` seja refletida em todos os lugares.
- **Acessibilidade (WCAG):** Revisar contrastes de cores e adicionar atributos `aria-label` em botões de ícone.

## 4. Verificação de Qualidade
- **Linting Visual:** Abrir o sistema em diferentes navegadores (Chrome, Firefox, Safari) para verificar consistência.
- **Mobile First:** Garantir que novas funcionalidades (como modais ou filtros) funcionem perfeitamente em telas pequenas.
- **Performance:** Verificar se o carregamento das fontes e estilos está otimizado (uso de `swap` em fontes, etc).

## 5. Histórico de Mudanças
- **[Anterior]:** Foco em migração de design e criação do `global.css`.
- **[31/05/2026]:** Conclusão da migração básica. Início da fase de polimento, UX e otimização de código.
