const urlParams = new URLSearchParams(window.location.search);
const judul = urlParams.get('judul');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const video = data.find(v => v.judul === judul);
    const el = document.getElementById('videoContainer');

    if (!video) {
      el.innerHTML = "<p style='color:red; text-align:center;'>Video tidak ditemukan.</p>";
      return;
    }

    const related = data.filter(v => v.pemain === video.pemain && v.judul !== video.judul);

    el.innerHTML = `
      <h2>${video.judul}</h2>

      <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-bottom: 20px;">
        <iframe src="${video.link}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius:8px;" allowfullscreen></iframe>
      </div>

      ${related.length > 0 ? `
        <h3>Episode Lain dari <span style="color:#66ccff">${video.pemain}</span>:</h3>
        <div class="related-videos">
          ${related.map(v => `
            <div>
              <a href="video.html?judul=${encodeURIComponent(v.judul)}">
                <img src="${v.thumbnail}" alt="${v.judul}" />
                <p>${v.judul}</p>
              </a>
            </div>
          `).join('')}
        </div>
      ` : `<p style="color:gray; text-align:center;">Tidak ada episode lain dari ${video.pemain}.</p>`}

      <div class="back-button">
        <a href="index.html">← Kembali ke Beranda</a>
      </div>
    `;
  });
