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
}

window.onload = setup;
