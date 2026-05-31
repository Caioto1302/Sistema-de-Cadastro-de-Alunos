# Estágio 1: Build da aplicação usando Node.js
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servidor Web (Nginx) para rodar o front-end na produção
FROM nginx:alpine
# Copia os arquivos estáticos gerados pelo Vite (pasta dist) para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
