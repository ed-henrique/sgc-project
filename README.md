# Sistema de Gestão de Cursos (SGC)

Projeto final para a disciplina de Banco de Dados II, ministrada pelo [Prof. Acauan Ribeiro](https://github.com/acauanrr).

## Descrição

O SGC é um sistema de gestão de cursos que permite a criação de cursos, matrícula de alunos, avaliação de cursos e certificação de alunos. O sistema possui um banco de dados relacional PostgreSQL que armazena as informações de cursos, alunos e certificados.

## Tecnologias utilizadas

- Node.js
- Express.js
- Banco de dados PostgreSQL

## Como configurar ambiente de desenvolvimento

1. Clone o repositório

```bash
git clone git@github.com:ed-henrique/sgc-project.git
cd sgc-project
```

2. Instale as dependências

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e preencha com as informações do banco de dados

```env
SECRET=
```

4. Crie um arquivo `config.json` na pasta `config` e preencha com as informações do banco de dados

```json
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "postgres"
  }
}
```

5. Inicie o servidor

```bash
npm start
```

6. Acesse o sistema em `http://localhost:3000`

## Como configurar ambiente de produção

1. Crie um EC2 na AWS com o sistema operacional Ubuntu

2. Use o usuário root

```bash
sudo -s
```

3. Instale o NVM

```bash
apt-get update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

4. Instale o Node.js e NPM

```bash
nvm install --lts
```

5. Clone o repositório

```bash
git clone git@github.com:ed-henrique/sgc-project.git
cd sgc-project
```

6. Instale o PostgreSQL

```bash
sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
apt-get update
apt-get -y install postgresql
```

7. Mude a senha do usuário postgres

```bash
sudo -i -u postgres
psql
\password # Create the password
\q
exit
```

8. Instale as dependências e PM2

```bash
npm install
npm install pm2 -g
```

9. Crie um arquivo `.env` na raiz do projeto e preencha com as informações do banco de dados

```env
SECRET=
```

10. Crie um arquivo `config.json` na pasta `config` e preencha com as informações do banco de dados

```json
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "postgres"
  }
}
```

11. Inicie o servidor

```bash
cd bin
pm2 start www
```

12. Configure o Nginx

```bash
apt-get install nginx
unlink /etc/nginx/sites-enabled/default
rm /etc/nginx/sites-available/default
vim /etc/nginx/sites-available/default
ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
```

13.  Adicione o seguinte conteúdo ao arquivo

```nginx
server {
    listen 80;
    location / {
        proxy_pass http://IP_DO_SERVIDOR:3000;
    }
}
```

14. Reinicie o Nginx

```bash
service nginx configtest
service nginx restart
```
