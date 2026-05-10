//You can edit ALL of the code here
async function setup() {
  const allShows = await fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .catch((error) => {
      document.body.innerHTML = `
    <p style="color:red;">
    Error fetching shows: ${error.message}
    </p>
    `;
      return [];
    });

  if (!Array.isArray(allShows)) {
    document.body.innerHTML = `
    <p style="color:red;">
    Unexpected data format
    </p>
    `;
    return;
  }
  const app = document.createElement("div");
  document.body.appendChild(app);

  const topBar = document.createElement("div");
  topBar.style.padding = "20px";
  topBar.style.backgroundColor = "rgb(37, 102, 140)";
  topBar.style.display = "flex";
  topBar.style.gap = "10px";
  topBar.style.alignItems = "center";
  app.appendChild(topBar);

  const showSelect = document.createElement("select");
  topBar.appendChild(showSelect);

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a show";
  showSelect.appendChild(defaultOption);

  allShows.forEach((show) => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });

  const content = document.createElement("div");
  app.appendChild(content);

  showSelect.addEventListener("change", async (event) => {
    const selectedShowId = event.target.value;

    content.innerHTML = "";

    if (!selectedShowId) {
      makePageForShows(allShows, content);
      return;
    }

    const episodes = await fetch(
      `https://api.tvmaze.com/shows/${selectedShowId}/episodes`,
    )
      .then((response) => response.json())
      .catch((error) => {
        content.innerHTML = `
    <p style="color:red;">
    Error fetching episodes: ${error.message}
    </p>
    `;
        return [];
      });

    if (!Array.isArray(episodes)) {
      content.innerHTML = `
    <p style="color:red;">
    Unexpected episode format
    </p>
    `;
      return;
    }

    makePageForEpisodes(episodes, content);
  });
}

window.onload = setup;
