## Jogo da Velha

Este é um simples jogo da velha construído usando Node.js e React no front-end e Flask (Python) no back-end.
Ele é jogado entre um humano e uma inteligência artificial (AI).

### Instalando Dependências

Baixe e instale Docker Desktop:
https://www.docker.com/products/docker-desktop/

Inicie os containers com o back e front usando o seguinte comando no diretório raiz do projeto:
```bash
docker-compose up --build
```

### Como Jogar

- O tabuleiro do jogo é exibido na tela. Clique em qualquer um dos quadrados vazios para fazer uma jogada.

- O jogador da AI fará sua jogada. O jogo continuará até que um dos jogadores vença ou o jogo termine em um empate.

- Para reiniciar o jogo, clique no botão "Reset".

### Testes

O aplicativo inclui dois testes de unidade:
- Um teste para o método que verifica se o jogo tem um vencedor
- Outro teste para os muitos movimentos que a AI pode executar

Os testes foram inicialmente criados usando Mocha e Chai.\
Porém, a criação da API tornou necessária a refatoração dos testes para PyTest.
Ambas as versões podem ser encontradas no repositório.

### Executando Testes

Para executar os testes em Mocha, use o seguinte comando:
```bash
cd .\front
npm test
```
Para executar os testes em PyTest, use os seguintes comandos:
```bash
cd .\api
pytest
```
### Créditos

Este aplicativo foi desenvolvido por Helena Neves. Se você tiver alguma dúvida ou feedback, entre em contato comigo em helenaneves.br@gmail.com.
