const params = new URLSearchParams(window.location.search);
const judul = params.get("judul");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const video = data.find(v => v.judul === judul);
    if (video) {
      document.getElementById("videoPlayer").innerHTML = `
        <iframe src="${video.link}" allowfullscreen></iframe>
      `;
      document.getElementById("judulVideo").innerText = video.judul;

      const related = data.filter(v => v.pemain === video.pemain && v.judul !== video.judul);
      const container = document.getElementById("videoList");

      related.forEach(v => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <a href="video.html?judul=${encodeURIComponent(v.judul)}">
            <img src="${v.thumbnail}" alt="${v.judul}">
            <div class="judul">${v.judul}</div>
          </a>
        `;
        container.appendChild(card);
      });
    } else {
      document.getElementById("videoPlayer").innerHTML = `<p style="color:white">Video tidak ditemukan.</p>`;
    }
  });
