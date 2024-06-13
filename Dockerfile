# Usar imagem base oficial do Node.js
FROM node:16

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
