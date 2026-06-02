import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Página principal
        main: resolve(__dirname, 'index.html'),
        // Adicione aqui todas as outras páginas do seu projeto
        inicio: resolve(__dirname, 'pages/inicio.html'),
        cadastro: resolve(__dirname, 'pages/cadastro.html'),
        recuperarSenha: resolve(__dirname, 'pages/recuperar-senha.html'),
        redefinirSenha: resolve(__dirname, 'pages/redefinir-senha.html'),
        acompanharChamados: resolve(__dirname, 'pages/acompanhar-chamados.html'),
        detalhesChamado: resolve(__dirname, 'pages/detalhes-chamado.html'),
        aberturaChamado: resolve(__dirname, 'pages/abertura-chamado.html'),
        ajuda: resolve(__dirname, 'pages/ajuda.html'),
        sobreNos: resolve(__dirname, 'pages/sobre-nos.html'),
        editarAdmin: resolve(__dirname, 'pages/editar-admin.html'),
        gerenciarAdmin: resolve(__dirname, 'pages/gerenciar-admin.html'),
        gerenciarUsuarios: resolve(__dirname, 'pages/gerenciar-usuarios.html'),
        editarUsuario: resolve(__dirname, 'pages/editar-usuario.html')
      },
    },
  },
});