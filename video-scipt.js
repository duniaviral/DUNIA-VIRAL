let data = [];

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    tampilkanDetail();
  });

function tampilkanDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const judul = urlParams.get('judul');
  const video = data.find(v => v.judul === judul);

  if (!video) {
    document.getElementById('videoContainer').innerHTML = '<p style="color:red; padding:10px;">Video tidak ditemukan.</p>';
    return;
  }

  document.title = `${video.judul} - DUNIA VIRAL`;

  const container = document.getElementById('videoContainer');
  container.innerHTML = `
    <h2 style="padding: 10px;">${video.judul}</h2>
    <div style="padding:10px;">
      <iframe src="${video.link}" frameborder="0" allowfullscreen style="width:100%; height:360px; border-radius:6px;"></iframe>
    </div>
  `;

  tampilkanEpisode(video.pemain, video.judul);
}

function tampilkanEpisode(pemain, judulSekarang) {
  const list = document.getElementById('episodeList');
  const hasil = data.filter(v => v.pemain === pemain && v.judul !== judulSekarang);
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
