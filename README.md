# Trabalho Prático 1

## Visão Geral

Este projeto implementa uma API RESTful para a gestão de alunos e cursos. A API permite executar operações CRUD (Create, Read, Update, Delete) sobre o recurso **alunos**.

## Como Utilizar

### 📦 Instalação

```bash
git clone <URL-do-repositório>
cd <nome-da-pasta>
npm install
```

### ⚙️ Configuração

1. Crie um ficheiro `.env` na raiz do projeto.
2. Adicione a variável de ambiente:

```env
MONGO_URI=<URL de conexão com o MongoDB Atlas>
```

### 🚀 Execução

```bash
cd .\backend\
node .\server.js
```

A API será iniciada em: [http://localhost:3000](http://localhost:3000)

---

## Endpoints – Alunos

- `GET /alunos` – Lista todos os alunos.
- `GET /alunos/:id` – Obtém os dados de um aluno específico.
- `POST /alunos` – Cria um novo aluno.
- `PUT /alunos/:id` – Atualiza as informações de um aluno existente.
- `DELETE /alunos/:id` – Remove um aluno da base de dados.

---

## 🌐 URLs de Produção

- **Frontend:** [https://frontend-y2eb.onrender.com/](https://frontend-y2eb.onrender.com/)
- **API:** [https://backend-3gjv.onrender.com/](https://backend-3gjv.onrender.com/)
