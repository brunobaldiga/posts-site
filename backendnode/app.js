const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// posts
const posts = Array.from({ length: 30 }, (_, i) => {
  const id = i + 1;

  return {
    id,
    titulo: id <= 10
      ? [
          "Lançamento do novo sistema",
          "Manutenção programada",
          "Nova funcionalidade de perfil",
          "Atualização de segurança",
          "Novo design no sistema",
          "Performance melhorada",
          "Novo sistema de login",
          "Correção de bugs",
          "Nova página inicial",
          "API pública lançada"
        ][i]
      : `Post automático ${id}`,

    descricao: id <= 10
      ? "Conteúdo importante do sistema em atualização."
      : `Descrição gerada automaticamente para o post ${id}.`,

    autor: id <= 10
      ? ["Maria Silva","Admin","João Souza","Ana Costa","Carlos Lima","Dev Team","Maria Silva","João Souza","Ana Costa","Dev Team"][i]
      : `Autor ${id}`,

    dataPublicacao: `2026-04-${String((i % 28) + 1).padStart(2, "0")}`,

    fotoAutor: `https://i.pravatar.cc/150?img=${id}`
  };
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ error: "Post não encontrado" });
  }

  res.json(post);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// 🔥 ISSO ESTAVA FALTANDO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});