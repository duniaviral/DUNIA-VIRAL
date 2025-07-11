const urlParams = new URLSearchParams(window.location.search);
const judul = urlParams.get('judul');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const video = data.find(v => v.judul === judul);
    const el = document.getElementById('videoContainer');

    if (!video) {
      el.innerHTML = "<p style='color:red'>Video tidak ditemukan.</p>";
      return;
    }

    const related = data.filter(v => v.pemain === video.pemain && v.judul !== video.judul);

    el.innerHTML = `
      <h2 style="color:white;">${video.judul}</h2>
      <iframe src="${video.link}" width="100%" height="360" frameborder="0" allowfullscreen></iframe>
      <h3 style="color:white;">Episode Lain (${video.pemain}):</h3>
      <ul style="color:white;">
        ${related.map(v => `<li><a href="video.html?judul=${encodeURIComponent(v.judul)}" style="color:lightblue">${v.judul}</a></li>`).join('')}
      </ul>
    `;
  });
