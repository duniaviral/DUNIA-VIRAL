let data = [];

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    tampilkanVideo();
  });

function tampilkanVideo(filter = 'semua') {
  const list = document.getElementById('videoList');
  list.innerHTML = '';
  const hasil = data.filter(v => filter === 'semua' || v.kategori === filter);
  hasil.forEach(video => {
    const item = document.createElement('div');
    item.className = 'video-item';
    item.innerHTML = `
      <a href="video.html?judul=${encodeURIComponent(video.judul)}">
        <img src="${video.thumbnail}" alt="${video.judul}">
        <h3>${video.judul}</h3>
      </a>
    `;
    list.appendChild(item);
  });
}

function filterKategori(kat) {
  tampilkanVideo(kat);
}

function cariVideo() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const hasil = data.filter(video => video.judul.toLowerCase().includes(input));
  const list = document.getElementById('videoList');
  list.innerHTML = '';
  hasil.forEach(video => {
    const item = document.createElement('div');
    item.className = 'video-item';
    item.innerHTML = `
      <a href="video.html?judul=${encodeURIComponent(video.judul)}">
        <img src="${video.thumbnail}" alt="${video.judul}">
        <h3>${video.judul}</h3>
      </a>
    `;
    list.appendChild(item);
  });
}

function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  menu.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.side-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('sideMenu').classList.remove('open');
    });
  });
});
