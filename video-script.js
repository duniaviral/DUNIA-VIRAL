const container = document.getElementById("videoContainer"); const params = new URLSearchParams(window.location.search); const judul = params.get("judul");

fetch("data.json") .then(res => res.json()) .then(data => { const current = data.find(v => v.judul === judul); if (!current) { container.innerHTML = "<p style='text-align:center;'>Video tidak ditemukan.</p>"; return; }

container.innerHTML = `
  <h2 style="text-align:center; color:white;">${current.judul}</h2>
  <iframe src="${current.link}" allowfullscreen></iframe>
  <h3 style="margin-top:30px;">Episode lainnya (${current.pemain})</h3>
  <div class="related-videos" id="relatedVideos"></div>
  <div class="back-button">
    <a href="index.html">⬅ Kembali ke Beranda</a>
  </div>
`;

const relatedContainer = document.getElementById("relatedVideos");

const related = data.filter(
  v => v.pemain === current.pemain && v.judul !== current.judul
);

related.forEach(video => {
  const div = document.createElement("div");
  div.className = "video-card";
  div.innerHTML = `
    <a href="video.html?judul=${encodeURIComponent(video.judul)}">
      <img src="${video.thumbnail}" alt="${video.judul}">
      <p>${video.judul}</p>
    </a>
  `;
  relatedContainer.appendChild(div);
});

});

