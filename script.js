fetch('data.json').then(res => res.json()).then(data => {
  const container = document.getElementById("video-gallery");
  const searchInput = document.getElementById("search");

  const render = (videos) => {
    container.innerHTML = "";
    videos.forEach(video => {
      const div = document.createElement("div");
      div.className = "video-card";
      div.innerHTML = `<img src="${video.thumbnail}" alt=""><p>${video.title}</p>`;
      div.onclick = () => window.location.href = `video.html?link=${encodeURIComponent(video.link)}`;
      container.appendChild(div);
    });
  };

  render(data);

  searchInput.oninput = () => {
    const keyword = searchInput.value.toLowerCase();
    render(data.filter(v => v.title.toLowerCase().includes(keyword)));
  };
});
