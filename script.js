async function postArticle() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Title and content required");
    return;
  }

  const res = await fetch("/.netlify/functions/postArticle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (res.ok) {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    loadArticles();
  } else {
    alert("Failed to post");
  }
}

async function loadArticles() {
  const res = await fetch("/.netlify/functions/getArticles");
  const data = await res.json();
  const articlesDiv = document.getElementById("articles");
  articlesDiv.innerHTML = "";

  data.forEach(article => {
    articlesDiv.innerHTML += `
      <div class="article">
        <h3>${article.title}</h3>
        <p>${article.content}</p>
      </div>
    `;
  });
}

window.onload = loadArticles;
