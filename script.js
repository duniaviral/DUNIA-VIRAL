const menu = document.getElementById('menu');
document.getElementById('hamburger').onclick = () => {
  menu.classList.toggle('hidden');
  menu.style.display = menu.classList.contains('hidden') ? 'none' : 'block';
};

let data = [];

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    tampilkanVideo('semua');
  });

function tampilkanVideo(kategori) {
  const container = document.getElementById('video-list');
  container.innerHTML = '';

  const hasil = kategori === 'semua'
    ? data
    : data.filter(v => v.kategori === kategori);

  hasil.forEach(video => {
    container.innerHTML += `
      <div class="card">
        <a href="video.html?judul=${encodeURIComponent(video.judul)}">
          <img src="${video.thumbnail}" alt="${video.judul}">
          <div class="card-title">${video.judul}</div>
        </a>
      </div>
    `;
  });
}

function filterKategori(kat) {
  tampilkanVideo(kat);
}
