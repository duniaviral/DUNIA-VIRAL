// Ambil parameter judul dari URL
const urlParams = new URLSearchParams(window.location.search);
const judul = urlParams.get("judul");

// Fetch data dari JSON
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    // Cari video utama berdasarkan judul
    const videoUtama = data.find((v) => v.judul === judul);

    if (!videoUtama) {
      document.getElementById("videoPlayer").innerHTML = "<p>Video tidak ditemukan</p>";
      return;
    }

    // Tampilkan iframe video utama
    document.getElementById("videoPlayer").innerHTML = `
      <iframe src="${videoUtama.link}" allowfullscreen></iframe>
    `;
    document.getElementById("judulVideo").textContent = videoUtama.judul;

    // Tampilkan video lainnya dari pemain yang sama
    const videoList = document.getElementById("videoList");
    const videoLainnya = data.filter(
      (v) => v.pemain === videoUtama.pemain && v.judul !== videoUtama.judul
    );

    videoLainnya.forEach((v) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="video.html?judul=${encodeURIComponent(v.judul)}">
          <img src="${v.thumbnail}" alt="${v.judul}" />
          <div class="judul">${v.judul}</div>
        </a>
      `;
      videoList.appendChild(card);
    });
  });
