const videoList = document.getElementById("videoList");
const searchInput = document.getElementById("searchInput");

let allData = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    allData = data;
    renderVideos(allData);
  });

function renderVideos(data) {
  videoList.innerHTML = "";
  data.forEach(video => {
    const div = document.createElement("div");
    div.className = "video-card";
    div.setAttribute("data-kategori", video.kategori || "semua");

    div.innerHTML = `
      <a href="video.html?judul=${encodeURIComponent(video.judul)}">
        <img src="${video.thumbnail}" alt="${video.judul}">
        <p>${video.judul}</p>
      </a>
    `;
    videoList.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allData.filter(video =>
    video.judul.toLowerCase().includes(query)
  );
  renderVideos(filtered);
});

function filterKategori(kategori) {
  if (kategori === "semua") {
    renderVideos(allData);
  } else {
    const filtered = allData.filter(video =>
      (video.kategori || "").toLowerCase() === kategori.toLowerCase()
    );
    renderVideos(filtered);
  }
}

function toggleMenu() {
  const menu = document.getElementById("kategoriMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
