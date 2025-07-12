let videoData = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    videoData = data;
    renderVideos(data);
  });

function renderVideos(data) {
  const container = document.getElementById("videoContainer");
  container.innerHTML = "";

  const unique = {};
  data.forEach(video => {
    if (!unique[video.pemain]) {
      unique[video.pemain] = video;
    }
  });

  Object.values(unique).forEach(video => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <a href="video.html?judul=${encodeURIComponent(video.judul)}">
        <img src="${video.thumbnail}" alt="${video.judul}" />
        <h4>${video.judul}</h4>
      </a>
    `;
    container.appendChild(card);
  });
}

function filterKategori(kategori) {
  if (kategori === "semua") {
    renderVideos(videoData);
  } else {
    const filtered = videoData.filter(v => v.kategori === kategori);
    renderVideos(filtered);
  }
}

function filterVideos() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = videoData.filter(v => v.pemain.toLowerCase().includes(query));
  renderVideos(filtered);
}

function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}
