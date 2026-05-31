# Usa a imagem oficial do Node.js (versão leve)
FROM node:20-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código e gera o Prisma Client
COPY . .
RUN npx prisma generate

# Expõe a porta da API e inicia o servidor
EXPOSE 5000
CMD ["npm", "run", "dev"]
