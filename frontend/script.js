let allPosts = [];

async function loadPosts() {
  const loader = document.getElementById("loader");
  const container = document.getElementById("posts");

  loader.style.display = "block";

  const res = await fetch("http://localhost:3000/posts");
  const data = await res.json();

  allPosts = data;

  setTimeout(() => {
    loader.style.display = "none";
    renderPosts(allPosts);
  }, 800); // efeito loading fake
}

function renderPosts(posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${post.fotoAutor}" />
      <div class="title">${post.titulo}</div>
      <div class="desc">${post.descricao}</div>
      <div class="meta">👤 ${post.autor} | 📅 ${post.dataPublicacao}</div>
    `;

    container.appendChild(card);
  });
}

// filtro de busca
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allPosts.filter(p =>
    p.titulo.toLowerCase().includes(value) ||
    p.autor.toLowerCase().includes(value)
  );

  renderPosts(filtered);
});

loadPosts();