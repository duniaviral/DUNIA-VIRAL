fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const videoContainer = document.getElementById("videoContainer");
    const searchInput = document.getElementById("searchInput");

    const pemainMap = {};
    const countMap = {};

    data.forEach(video => {
      const nama = video.pemain;
      countMap[nama] = (countMap[nama] || 0) + 1;
      if (!pemainMap[nama]) {
        pemainMap[nama] = video;
      }
    });

    const sortedPemain = Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a]);

    function tampilkan(videoList) {
      videoContainer.innerHTML = "";
      videoList.forEach(nama => {
        const video = pemainMap[nama];
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <a href="video.html?pemain=${encodeURIComponent(video.pemain)}">
            <img src="${video.thumbnail}" alt="${video.judul}" />
            <p class="judul">${video.judul}</p>
            <p class="pemain">${video.pemain}</p>
          </a>
        `;
        videoContainer.appendChild(card);
      });
    }

    tampilkan(sortedPemain);

    searchInput.addEventListener("input", () => {
      const kata = searchInput.value.toLowerCase();
      const hasil = sortedPemain.filter(nama => nama.toLowerCase().includes(kata));
      tampilkan(hasil);
    });
  });
