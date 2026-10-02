
const HEADER_TEMPLATE = `
<nav class="navbar" id="navMenu">
  <a href="index.html" class="navbar-logo">
    <img src="https://codewar.my.id/GambarPemweb/Nisa1.png" alt="SMA Negeri 1 Sanggau">
    <span>SMA 1 Sanggau</span>
  </a>
  <ul class="navbar-nav" id="navbarNav">
    <li><a href="index.html#home">BERANDA</a></li>
    <li class="dropdown">
      <a href="profile.html" class="dropbtn">
        PROFIL
        <i class="fa-solid fa-chevron-down icon-arrow"></i>
      </a>
      <ul class="dropdown-content">
        <li><a href="profile.html#profil-singkat">Profil Singkat</a></li>
        <li><a href="profile.html#visi-misi">Visi dan Misi</a></li>
        <li><a href="profile.html#struktur-organisasi">Struktur Organisasi Sekolah</a></li>
      </ul>
    </li>
    <li><a href="index.html#berita">BERITA</a></li>
    <li class="dropdown">
      <a href="sdm.html" class="dropbtn">
        SDM
        <i class="fa-solid fa-chevron-down icon-arrow"></i>
      </a>
      <ul class="dropdown-content">
        <li><a href="sdm.html#guru-dosen">Guru</a></li>
        <li><a href="sdm.html#staff">Staff</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a href="Kesiswaan.html" class="dropbtn">
        KESISWAAN
        <i class="fa-solid fa-chevron-down icon-arrow"></i>
      </a>
      <ul class="dropdown-content">
        <li><a href="Kesiswaan.html#ekstrakurikuler">Ekstrakurikuler</a></li>
        <li><a href="Kesiswaan.html#siswa">Siswa</a></li>
        <li><a href="Kesiswaan.html#kelas">Kelas</a></li>
        <li><a href="Kesiswaan.html#alumni">Alumni</a></li>
      </ul>
    </li>
    <li><a href="mading.html">MADING</a></li>
    <li><a href="galeri.html">GALERI SEKOLAH</a></li>
    <li><a href="index.html#kontak">KONTAK</a></li>
  </ul>
  <div class="navbar-extra">
    <a href="#" id="search" aria-label="Pencarian">
      <i class="fa-solid fa-magnifying-glass"></i>
    </a>
    <a href="#" id="hamburger-menu" aria-label="Menu">
      <i class="fa-solid fa-bars"></i>
    </a>
  </div>
</nav>
`;
const FOOTER_TEMPLATE = `
<footer style="
  background-color: #F8F3F0;
  color: #1e293b;
  padding: 4.5rem 7% 1.5rem;
  border-top: 1px solid #e5e7eb;
">
  <div style="
    max-width: 1400px;
    margin: 0;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 50px;
    text-align: left;
  ">
    <div>
      <h2 style="
        color: #014BAA;
        font-family: Georgia, serif;
        font-size: 2rem;
        margin: 0 0 1.5rem;
      ">
        SMAN 1 Sanggau
      </h2>
      <p style="
        font-size: 0.95rem;
        line-height: 1.8;
        margin: 0;
        max-width: 380px;
      ">
        Mengantarkan peserta didik menjadi siswa yang berprestasi dalam
        bidang Science, Attitude, Talent dan Unity di tingkat nasional
        dan internasional
      </p>
      <div style="
        display: flex;
        gap: 22px;
        margin-top: 2rem;
      ">
        <a
          href="https://tiktok.com/@smansa_sanggau" target="_blank" rel="noopener noreferrer" aria-label="TikTok SMA Negeri 1 Sanggau"
          style="
            color:#014BAA;
            font-size:1.2rem;
            text-decoration:none;
          "
        >
          <i class="fab fa-tiktok"></i>
        </a>
        <a
          href="https://instagram.com/smansa_sanggau" target="_blank" rel="noopener noreferrer" aria-label="Instagram SMA Negeri 1 Sanggau"
          style="
            color:#014BAA;
            font-size:1.2rem;
            text-decoration:none;
          "
        >
          <i class="fab fa-instagram"></i>
        </a>
        <a
          href="https://whatsapp.com/channel/0029VaA" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel SMA Negeri 1 Sanggau"
          style="
            color:#014BAA;
            font-size:1.2rem;
            text-decoration:none;
          "
        >
          <i class="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
    <div>
      <h3 style="
        color: #014BAA;
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0 0 1.5rem;
        text-align: left;
      ">
        Quick Links
      </h3>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="http:
          style="color:#1e293b; text-decoration:none;"
        >
          Pengaruh Gadget Pada Kualitas Belajar Siswa
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://bos.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">Laporan BOS KEMENDIKBUD
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://pusatprestasinasional.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">Pusat Prestasi Nasional
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://gtk.belajar.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">Layanan GTK
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://spmb.dikbud.kalbarprov.go.id./" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">SPMB SMA Negeri 1 Sanggau
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://etpp.jakarta.go.id/login" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">Etpp-Ekinerja_PPPK
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://sidado.pusdatikomdik.id/login" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">Sidado
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://ekinkki.pusdatikomdik.id/index.php/login" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">E-Kinerja KKI
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://info.gtk.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">Info GTK
        </a>
      </p>
      <p style="margin:0 0 0.8rem; text-align:left;">
        <a
          href="https://app.edoo.id/login" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">Perpustakaan Digital Edoo
        </a>
      </p>
      <p style="margin:0; text-align:left;">
        <a
          href="https://drive.google.com/file/d/1Nak8kt0LQR1Cf-zl6qrmUouTWoi7Cn46/view?usp=sharing" target="_blank" rel="noopener noreferrer" style="color:#1e293b; text-decoration:none;">Panduan Kurikulum Merdeka
        </a>
      </p>
    </div>
    <div>
      <h3 style="
        color: #014BAA;
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0 0 1.5rem;
        text-align: left;
      ">
        Tentang Kami
      </h3>
      <p style="margin:0 0 1rem; text-align:left;">
        <a
          href="profile.html#profil-singkat"
          style="color:#1e293b; text-decoration:none;"
        >
          Profil Singkat
        </a>
      </p>
      <p style="margin:0 0 1rem; text-align:left;">
        <a
          href="profile.html#visi-misi"
          style="color:#1e293b; text-decoration:none;"
        >
          Visi dan Misi
        </a>
      </p>
      <p style="margin:0 0 1rem; text-align:left;">
        <a
          href="profile.html#struktur-organisasi"
          style="color:#1e293b; text-decoration:none;"
        >
          Struktur Organisasi Sekolah
        </a>
      </p>
    </div>
  </div>
  <div style="
    max-width: 1400px;
    margin: 4rem 0 0;
    padding-top: 1.5rem;
    border-top: 1px solid #d9dde3;
    text-align: left;
  ">
    <p style="
      margin:0;
      color:#1e293b;
      font-family:Georgia, serif;
      font-size:0.9rem;
    ">
      © 2026 Website. All rights reserved
    </p>
  </div>
</footer>
`;
function initNavbarEvents() {
  const hamburger = document.getElementById("hamburger-menu");
  const navbarNav = document.getElementById("navbarNav") || document.querySelector(".navbar-nav");
  if (hamburger && navbarNav) {
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    newHamburger.addEventListener("click", (e) => {
      e.preventDefault();
      navbarNav.classList.toggle("active");
    });
    navbarNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbarNav.classList.remove("active");
      });
    });
    document.addEventListener("click", (e) => {
      if (!newHamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove("active");
      }
    });
  }
  if (window.feather) {
    window.feather.replace();
  }
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  }
}
async function loadComponent(selector, filePath, fallbackHtml, onLoaded) {
  if (window.self !== window.top) {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.display = "none";
    });
    return;
  }
  const containers = document.querySelectorAll(selector);
  if (!containers.length) return;
  let content = fallbackHtml;
  if (window.location.protocol.startsWith("http")) {
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        content = await response.text();
      }
    } catch (err) {
    }
  }
  containers.forEach((container) => {
    container.innerHTML = content;
  });
  if (onLoaded) {
    onLoaded();
  }
}
function initLayoutComponents() {
  loadComponent(
    "#header-placeholder, #navbar-placeholder, header-component, main-header",
    "header.html",
    HEADER_TEMPLATE,
    initNavbarEvents
  );
  loadComponent(
    "#footer-placeholder, footer-component, main-footer",
    "footer.html",
    FOOTER_TEMPLATE
  );
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLayoutComponents);
} else {
  initLayoutComponents();
}
if (typeof customElements !== "undefined") {
  if (!customElements.get("main-header")) {
    customElements.define(
      "main-header",
      class extends HTMLElement {
        connectedCallback() {
          if (window.self !== window.top) {
            this.style.display = "none";
            return;
          }
          this.innerHTML = HEADER_TEMPLATE;
          initNavbarEvents();
        }
      }
    );
  }
  if (!customElements.get("main-footer")) {
    customElements.define(
      "main-footer",
      class extends HTMLElement {
        connectedCallback() {
          if (window.self !== window.top) {
            this.style.display = "none";
            return;
          }
          this.innerHTML = FOOTER_TEMPLATE;
        }
      }
    );
  }
}

