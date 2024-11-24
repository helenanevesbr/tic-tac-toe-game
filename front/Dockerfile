# Usa uma imagem oficial do Node.js como base
FROM node:20.15.0-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta que a aplicação irá usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
