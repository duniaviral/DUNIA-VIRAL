const urlParams = new URLSearchParams(window.location.search);
const pemain = urlParams.get("pemain");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const videoUtama = data.find(v => v.pemain === pemain);
    const videoLain = data.filter(v => v.pemain === pemain);

    const videoPlayer = document.getElementById("videoPlayer");
    const judulVideo = document.getElementById("judulVideo");

    if (videoUtama) {
      judulVideo.textContent = videoUtama.judul;
      videoPlayer.innerHTML = `
        <iframe src="${videoUtama.link}" allowfullscreen></iframe>
      `;
    } else {
      judulVideo.textContent = "Video tidak ditemukan.";
    }

    const videoLainnya = document.getElementById("videoLainnya");
    if (videoLain.length > 1) {
      videoLainnya.innerHTML = `<h3>Video Lainnya dari ${pemain}</h3><div class="video-list"></div>`;
      const list = videoLainnya.querySelector(".video-list");
      videoLain.forEach(v => {
        if (v.link !== videoUtama.link) {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <a href="video.html?pemain=${encodeURIComponent(v.pemain)}&judul=${encodeURIComponent(v.judul)}">
              <img src="${v.thumbnail}" alt="${v.judul}">
              <p class="judul">${v.judul}</p>
            </a>
          `;
          list.appendChild(card);
        }
      });
    }
  });
