# Usa uma imagem oficial do Python como base
FROM python:3.12.4

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de dependências e instala as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código fonte para o container
COPY . .

# Define a porta que o servidor irá expor
EXPOSE 8000

# Comando para executar a aplicação
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
