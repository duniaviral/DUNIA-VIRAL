const urlParams = new URLSearchParams(window.location.search);
const judul = urlParams.get("judul");

if (!judul) {
  document.getElementById("videoPlayer").innerHTML = "<p style='text-align:center'>❌ Parameter judul tidak ditemukan.</p>";
  document.getElementById("judulVideo").textContent = "Judul Tidak Ditemukan";
} else {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const videoUtama = data.find(v => v.judul === judul);
      if (!videoUtama) {
        document.getElementById("videoPlayer").innerHTML = "<p style='text-align:center'>❌ Video tidak ditemukan.</p>";
        document.getElementById("judulVideo").textContent = judul;
        return;
      }
      document.getElementById("videoPlayer").innerHTML = `
        <iframe src="${videoUtama.link}" allowfullscreen></iframe>
      `;
      document.getElementById("judulVideo").textContent
