let allPosts = [];

const API_URL = "https://posts-sites.onrender.com";

async function loadPosts() {
  const loader = document.getElementById("loader");
  const container = document.getElementById("posts");

  loader.style.display = "block";
  container.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}/posts`);

    if (!res.ok) {
      throw new Error("Servidor retornou erro");
    }

    const data = await res.json();
    allPosts = data;

    setTimeout(() => {
      loader.style.display = "none";
      renderPosts(allPosts);
    }, 800);

  } catch (err) {
    console.error(err);

    loader.style.display = "none";

    container.innerHTML = `
      <div class="error-box">
        <h2>⚠️ O servidor caiu</h2>
        <p>Mas já estamos tentando resolver isso. Tente novamente em instantes.</p>
        <button onclick="loadPosts()">Tentar novamente</button>
      </div>
    `;
  }
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