fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const videoContainer = document.getElementById("videoContainer");

    // Hitung jumlah video per pemain
    const pemainCount = {};
    data.forEach(video => {
      pemainCount[video.pemain] = (pemainCount[video.pemain] || 0) + 1;
    });

    // Ambil 1 video per pemain
    const pemainVideoMap = {};
    data.forEach(video => {
      if (!pemainVideoMap[video.pemain]) {
        pemainVideoMap[video.pemain] = video;
      }
    });

    // Urutkan pemain berdasarkan jumlah video (populer duluan)
    const sortedPemain = Object.keys(pemainVideoMap).sort((a, b) => {
      return (pemainCount[b] || 0) - (pemainCount[a] || 0);
    });

    // Tampilkan
    sortedPemain.forEach(pemain => {
      const video = pemainVideoMap[pemain];
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="video.html?judul=${encodeURIComponent(video.judul)}">
          <img src="${video.thumbnail}" alt="${video.judul}" />
          <p>${video.pemain}</p>
        </a>
      `;
      videoContainer.appendChild(card);
    });
  });
