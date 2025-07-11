// index-script.js yang kamu minta sebelumnya: tampilkan semua video langsung dari data.json

fetch("data.json") .then((res) => res.json()) .then((data) => { const videoContainer = document.getElementById("videoContainer"); const searchInput = document.getElementById("searchInput");

function tampilkanVideo(videoList) {
  videoContainer.innerHTML = "";
  videoList.forEach(video => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <a href="video.html?judul=${encodeURIComponent(video.judul)}">
        <img src="${video.thumbnail}" alt="${video.judul}" />
        <p class="judul">${video.judul}</p>
        <p class="pemain">${video.pemain}</p>
      </a>
    `;
    videoContainer.appendChild(card);
  });
}

// Tampilkan semua di awal
tampilkanVideo(data);

// Fitur pencarian
searchInput.addEventListener("input", () => {
  const kata = searchInput.value.toLowerCase();
  const hasil = data.filter(video =>
    video.judul.toLowerCase().includes(kata) ||
    video.pemain.toLowerCase().includes(kata)
  );
  tampilkanVideo(hasil);
});

// Fitur filter kategori
window.filterKategori = function (kategori) {
  if (kategori === "semua") {
    tampilkanVideo(data);
  } else {
    const hasil = data.filter(video => video.kategori.toLowerCase() === kategori.toLowerCase());
    tampilkanVideo(hasil);
  }
};

});

