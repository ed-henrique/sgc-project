# Sistema de Gestão de Cursos (SGC)

Projeto final para a disciplina de Banco de Dados II, ministrada pelo [Prof. Acauan Ribeiro](https://github.com/acauanrr).

## Descrição

O SGC é um sistema de gestão de cursos que permite a criação de cursos, matrícula de alunos, avaliação de cursos e certificação de alunos. O sistema possui um banco de dados relacional PostgreSQL que armazena as informações de cursos, alunos e certificados. Os certificados são armazenados na blockchain, em uma rede de teste hospedada pela Ethereum, que é utilizada para garantir a autenticidade dos certificados emitidos.

## Tecnologias utilizadas

- Node.js
- Express.js
- Blockchain
- Banco de dados PostgreSQL

## Como executar

Esse projeto precisa de algumas dependências antes de ser utilizados, tais como:

- `node >= 18.11.0`
- `npm >= 6.14.0`
- `postgresql >= 13.3`
- Truffle
- Ganache

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Crie um arquivo `.env` na raiz do projeto e preencha com as variáveis de ambiente necessárias (veja o arquivo `.env.example` para mais detalhes)
4. Execute o projeto com `npm start`

