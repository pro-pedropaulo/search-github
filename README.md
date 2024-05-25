# Search Devs

## Índice

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Versões](#versões)
- [Instalação](#instalação)
  - [Passos](#passos)
- [Acessar Sistema Online](#acessar-sistema-online)
- [Rotas](#rotas)
- [Motivação das Escolhas](#motivação-das-escolhas)
- [Testes](#testes)
- [Vídeo Demonstrativo](#vídeo-demonstrativo)
- [Contribuição](#contribuição)

## Descrição

Aplicação Angular que busca perfis de desenvolvedores na API pública do GitHub e exibe seus dados em uma página de perfil. A aplicação utiliza um token de acesso para garantir que não exceda os limites da API gratuita do GitHub.

## Tecnologias Utilizadas

- **Angular**: Framework robusto e amplamente utilizado para desenvolvimento de SPAs.
- **Angular Material**: Biblioteca de componentes de UI que segue as diretrizes do Material Design, facilitando a criação de uma interface consistente e acessível.
- **RxJS**: Biblioteca para programação reativa, essencial para lidar com operações assíncronas e fluxos de dados no Angular.

## Versões

- Angular: 17.3.8
- Node: 20.10.0

## Instalação

### Passos

1.  **Clone o repositório:**
    ` git clone https://github.com/pro-pedropaulo/search-github.git`

2.  no terminal navegue para a pasta: ` cd search-devs`

3.  **Instale as dependências:**
    `npm install `

4.  **Rode o ambiente de desenvolvimento:**
    `npm start `

5.  **Para criar uma build de produção:**
    `npm run build `

## Acessar sistema online

https://search-github-git-main-pedros-projects-a4954bcf.vercel.app/

## Rotas

- `/`: Página de busca de usuários.
- `/profile/:username`: Página de perfil do usuário.

## Motivação das Escolhas

- **Angular Material**: Facilita a criação de uma interface de usuário consistente e acessível, seguindo as diretrizes do Material Design.
- **RxJS**: Essencial para lidar com operações assíncronas e fluxos de dados no Angular, proporcionando uma abordagem reativa e mais fácil de manter.

## Testes

Testes unitários foram implementados para garantir a funcionalidade dos componentes.

### Para rodar os testes:

`npm test `

## Vídeo Demonstrativo

Link para Vídeo do youtube: https://youtu.be/nMlCNoVISRM

## Contribuição

Sinta-se à vontade para abrir issues e pull requests. Todas as contribuições são bem-vindas!
