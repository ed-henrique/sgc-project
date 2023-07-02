# Backend

## Tipos de usuário

### Usuário aluno

- Pode se inscrever em cursos
- Pode ver os cursos que está inscrito
- Pode pesquisar por cursos
  - Usando filtros e categorias
- Pode ver os detalhes de um curso
- Pode alterar seus dados
- Pode ver seus certificados

### Usuário admin (herda de aluno)

- Pode ver a lista de alunos
- Pode ver a lista de cursos
- Pode emitir os certificados (fechar um curso)
- Pode cadastrar cursos
- Pode suspender contas de alunos

### Usuário root (herda de admin)

- Pode ver a lista de admins
- Pode cadastrar admins
- Pode suspender contas de admins

## Certificados

- Usar blockchain

## Deploy

- AWS usando Nginx e Docker
