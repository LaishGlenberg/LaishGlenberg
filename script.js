const owner = "LaishGlenberg";
const repoGrid = document.getElementById("repo-grid");
const cardTemplate = document.getElementById("repo-card-template");

function formatDescription(description) {
  if (!description || !description.trim()) {
    return "No description provided.";
  }
  return description;
}

function repoImagePath(repoName) {
  return `assets/images/repos/${repoName}.jpg`;
}

async function fetchRepos() {
  const url = `https://api.github.com/users/${owner}/repos?sort=updated&per_page=100`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`);
  }

  const repos = await response.json();
  return repos.filter((repo) => !repo.fork);
}

function renderRepos(repos) {
  repoGrid.innerHTML = "";

  if (repos.length === 0) {
    const empty = document.createElement("p");
    empty.className = "status";
    empty.textContent = "No repositories found.";
    repoGrid.appendChild(empty);
    return;
  }

  for (const repo of repos) {
    const card = cardTemplate.content.cloneNode(true);

    const image = card.querySelector(".repo-card__image");
    const title = card.querySelector(".repo-card__title");
    const description = card.querySelector(".repo-card__description");
    const link = card.querySelector(".repo-card__link");

    image.src = repoImagePath(repo.name);
    image.alt = `${repo.name} repository preview`;
    image.onerror = () => {
      image.onerror = null;
      image.src = "assets/images/repos/repo-placeholder.jpg";
    };

    title.textContent = repo.name;
    description.textContent = formatDescription(repo.description);
    link.href = repo.html_url;

    repoGrid.appendChild(card);
  }
}

async function init() {
  try {
    repoGrid.innerHTML = '<p class="status">Loading repositories...</p>';
    const repos = await fetchRepos();
    renderRepos(repos);
  } catch (error) {
    repoGrid.innerHTML = `<p class="status">Unable to load repositories right now. ${error.message}</p>`;
  }
}

init();
