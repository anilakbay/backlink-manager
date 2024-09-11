document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const showModalButton = document.getElementById("show-modal");
  const closeModalButton = document.getElementById("close-modal");
  const form = document.getElementById("backlink-form");
  const backlinksContainer = document.getElementById("backlinks-container");

  // Modal'ı açma ve kapama
  function toggleModal(show) {
    modal.style.display = show ? "flex" : "none";
  }

  // URL doğrulama
  function isValidUrl(url) {
    const pattern = /^(https?:\/\/)?([\w.-]+)\.[a-zA-Z]{2,6}(\/.*)?$/;
    return pattern.test(url);
  }

  // Backlink'leri güncelleme
  function updateBacklinks() {
    const backlinks = JSON.parse(localStorage.getItem("backlinks")) || [];
    backlinksContainer.innerHTML = backlinks
      .map(
        ({ name, url }) => `
      <div class="item">
        <i class="fas fa-times delete-icon" onclick="deleteBacklink('${url}')"></i>
        <div class="name"><a href="${url}" target="_blank">${name}</a></div>
      </div>
    `
      )
      .join("");
  }

  // Backlink ekleme
  function addBacklink(e) {
    e.preventDefault();
    const name = document.getElementById("website-name").value.trim();
    let url = document.getElementById("website-url").value.trim();

    if (!name || !url || !isValidUrl(url)) {
      alert("Lütfen geçerli bir web adı ve adresi girin.");
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    const backlinks = JSON.parse(localStorage.getItem("backlinks")) || [];
    backlinks.push({ name, url });
    localStorage.setItem("backlinks", JSON.stringify(backlinks));
    form.reset();
    toggleModal(false);
    updateBacklinks();
  }

  // Backlink silme
  window.deleteBacklink = (url) => {
    let backlinks = JSON.parse(localStorage.getItem("backlinks")) || [];
    backlinks = backlinks.filter((link) => link.url !== url);
    localStorage.setItem("backlinks", JSON.stringify(backlinks));
    updateBacklinks();
  };

  // Olay dinleyicileri
  showModalButton.addEventListener("click", () => toggleModal(true));
  closeModalButton.addEventListener("click", () => toggleModal(false));
  form.addEventListener("submit", addBacklink);

  // Sayfa yüklendiğinde backlink'leri güncelle
  updateBacklinks();
});
