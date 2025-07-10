let semuaVideo = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    semuaVideo = data;
    tampilkanVideo(semuaVideo);
  });

function tampilkanVideo(list) {
  const container = document.getElementById('video-container');
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Tidak ada video ditemukan.</p>";
    return;
  }

  list.forEach((video, index) => {
    const div = document.createElement('div');
    div.className = 'video-card';
    div.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.judul}">
      <div class="badge">${video.kategori}</div>
      <h4>${video.judul}</h4>
      <a href="video.html?id=${index}" class="tonton">Tonton Video</a>
    `;
    container.appendChild(div);
  });
}

function tampilkanSemua() {
  tampilkanVideo(semuaVideo);
  document.getElementById("subkategori-pemain").style.display = "none";
}

function filterKategori(kategori) {
  const hasil = semuaVideo.filter(v => v.kategori.toLowerCase() === kategori.toLowerCase());
  tampilkanVideo(hasil);

  const subkategori = document.getElementById("subkategori-pemain");
  const tombolPemain = document.getElementById("pemain-buttons");

  if (kategori.toLowerCase() === "indo") {
    subkategori.style.display = "block";

    const pemainUnik = [...new Set(semuaVideo
      .filter(v => v.kategori.toLowerCase() === "indo")
      .map(v => v.pemain.toLowerCase()))];

    tombolPemain.innerHTML = "";
    pemainUnik.forEach(nama => {
      const btn = document.createElement("button");
      btn.innerText = nama.charAt(0).toUpperCase() + nama.slice(1);
      btn.onclick = () => filterPemain(nama);
      btn.className = "btn-pemain";
      tombolPemain.appendChild(btn);
    });
  } else {
    subkategori.style.display = "none";
  }
}

function filterPemain(nama) {
  const hasil = semuaVideo.filter(
    v => v.kategori.toLowerCase() === "indo" && v.pemain.toLowerCase() === nama.toLowerCase()
  );
  tampilkanVideo(hasil);
}

function cariVideo() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const hasil = semuaVideo.filter(v => v.judul.toLowerCase().includes(keyword));
  tampilkanVideo(hasil);
}