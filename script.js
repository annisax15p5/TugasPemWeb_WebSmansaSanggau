
const namaBulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];
const dataEvent = {
  "2026-09-23": {
    judul: "Kegiatan Akademik",
    deskripsi: "Kegiatan akademik SMAN 1 Sanggau.",
    kategori: "akademik"
  },
  "2026-10-05": {
    judul: "Ujian Tengah Semester",
    deskripsi: "Pelaksanaan Ujian Tengah Semester.",
    kategori: "ujian"
  },
  "2026-10-12": {
    judul: "Kegiatan Sekolah",
    deskripsi: "Kegiatan sekolah dan pengembangan peserta didik.",
    kategori: "kegiatan"
  },
  "2026-10-20": {
    judul: "Evaluasi Pembelajaran",
    deskripsi: "Evaluasi kegiatan pembelajaran peserta didik.",
    kategori: "akademik"
  },
  "2026-11-02": {
    judul: "Ujian Sekolah",
    deskripsi: "Pelaksanaan ujian sekolah.",
    kategori: "ujian"
  }
};
let tanggalSekarang = new Date(2026, 8, 23);
let tanggalDipilih = null;
let filterAktif = "all";
const kalender = document.getElementById("isiKalender");
const namaBulanElement = document.getElementById("namaBulan");
const tahunElement = document.getElementById("tahun");
const detailJudul = document.getElementById("detailJudul");
const detailIsi = document.getElementById("detailIsi");
const eventStatus = document.getElementById("eventStatus");
const eventList = document.getElementById("eventList");
const eventCount = document.getElementById("eventCount");
const filterButton = document.getElementById("filterButton");
const filterMenu = document.getElementById("filterMenu");
const todayButton = document.getElementById("todayButton");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
function formatKey(tahun, bulan, tanggal) {
  return `${tahun}-${String(bulan + 1).padStart(2, "0")}-${String(tanggal).padStart(2, "0")}`;
}
function getFilteredEvents() {
  return Object.entries(dataEvent)
    .filter(([, event]) => {
      return (
        filterAktif === "all" ||
        event.kategori === filterAktif
      );
    })
    .sort(([a], [b]) => a.localeCompare(b));
}
function resetDetail() {
  if (detailJudul) {
    detailJudul.textContent = "Pilih tanggal";
  }
  if (detailIsi) {
    detailIsi.textContent =
      "Klik tanggal pada kalender untuk melihat informasi kegiatan.";
  }
  if (eventStatus) {
    eventStatus.textContent =
      "Belum ada event/acara";
  }
}
function pilihTanggal(key) {
  tanggalDipilih = key;
  const event = dataEvent[key];
  document
    .querySelectorAll(".calendar-day.selected")
    .forEach(item => {
      item.classList.remove("selected");
    });
  const selected =
    document.querySelector(
      `[data-date="${key}"]`
    );
  if (selected) {
    selected.classList.add("selected");
  }
  if (event) {
    detailJudul.textContent =
      event.judul;
    detailIsi.textContent =
      event.deskripsi;
    eventStatus.textContent =
      `${event.judul} — ${event.deskripsi}`;
  } else {
    detailJudul.textContent =
      "Tidak ada kegiatan";
    detailIsi.textContent =
      `Tidak ada kegiatan pada ${key}.`;
    eventStatus.textContent =
      "Tidak ada event/acara pada tanggal ini";
  }
}
function tampilkanKalender() {
  if (!kalender) {
    return;
  }
  kalender.innerHTML = "";
  const bulan =
    tanggalSekarang.getMonth();
  const tahun =
    tanggalSekarang.getFullYear();
  if (namaBulanElement) {
    namaBulanElement.textContent =
      namaBulan[bulan];
  }
  if (tahunElement) {
    tahunElement.textContent =
      tahun;
  }
  let hariPertama =
    new Date(
      tahun,
      bulan,
      1
    ).getDay();
  hariPertama =
    hariPertama === 0
      ? 6
      : hariPertama - 1;
  const jumlahHari =
    new Date(
      tahun,
      bulan + 1,
      0
    ).getDate();
  const hariIni =
    new Date();
  for (
    let i = 0;
    i < hariPertama;
    i++
  ) {
    const kosong =
      document.createElement("div");
    kosong.className =
      "calendar-day other-month";
    kalender.appendChild(kosong);
  }
  for (
    let tanggal = 1;
    tanggal <= jumlahHari;
    tanggal++
  ) {
    const tombol =
      document.createElement("button");
    tombol.type = "button";
    tombol.className =
      "calendar-day";
    const key =
      formatKey(
        tahun,
        bulan,
        tanggal
      );
    tombol.dataset.date = key;
    const angka =
      document.createElement("span");
    angka.textContent =
      tanggal;
    tombol.appendChild(angka);
    const event =
      dataEvent[key];
    if (
      event &&
      (
        filterAktif === "all" ||
        event.kategori === filterAktif
      )
    ) {
      tombol.classList.add(
        "has-event"
      );
    }
    if (
      tanggal === hariIni.getDate() &&
      bulan === hariIni.getMonth() &&
      tahun === hariIni.getFullYear()
    ) {
      tombol.classList.add("today");
    }
    if (
      key === tanggalDipilih
    ) {
      tombol.classList.add(
        "selected"
      );
    }
    tombol.addEventListener(
      "click",
      () => {
        pilihTanggal(key);
      }
    );
    kalender.appendChild(
      tombol
    );
  }
}
function tampilkanDaftarEvent() {
  if (
    !eventList ||
    !eventCount
  ) {
    return;
  }
  eventList.innerHTML = "";
  const events =
    getFilteredEvents();
  eventCount.textContent =
    `${events.length} kegiatan`;
  if (
    events.length === 0
  ) {
    eventList.innerHTML =
      '<div class="no-event">Belum ada kegiatan pada kategori ini.</div>';
    return;
  }
  events.forEach(
    ([key, event]) => {
      const [
        tahun,
        bulan,
        tanggal
      ] =
        key
          .split("-")
          .map(Number);
      const item =
        document.createElement("div");
      item.className =
        "event-item";
      item.innerHTML = `
        <div class="event-date">
          <strong>${tanggal}</strong>
          <small>${namaBulan[bulan - 1].substring(0, 3)}</small>
        </div>
        <div class="event-info">
          <h4>${event.judul}</h4>
          <p>${event.deskripsi}</p>
          <span class="event-category">
            ${event.kategori}
          </span>
        </div>
      `;
      item.addEventListener(
        "click",
        () => {
          tanggalSekarang =
            new Date(
              tahun,
              bulan - 1,
              1
            );
          tampilkanKalender();
          pilihTanggal(key);
          const kalenderSection =
            document.getElementById(
              "kalender"
            );
          if (kalenderSection) {
            window.scrollTo({
              top:
                kalenderSection.offsetTop - 80,
              behavior:
                "smooth"
            });
          }
        }
      );
      eventList.appendChild(
        item
      );
    }
  );
}
function renderSemuaKalender() {
  tampilkanKalender();
  tampilkanDaftarEvent();
}
if (prevMonth) {
  prevMonth.addEventListener(
    "click",
    () => {
      tanggalSekarang =
        new Date(
          tanggalSekarang.getFullYear(),
          tanggalSekarang.getMonth() - 1,
          1
        );
      tanggalDipilih = null;
      resetDetail();
      renderSemuaKalender();
    }
  );
}
if (nextMonth) {
  nextMonth.addEventListener(
    "click",
    () => {
      tanggalSekarang =
        new Date(
          tanggalSekarang.getFullYear(),
          tanggalSekarang.getMonth() + 1,
          1
        );
      tanggalDipilih = null;
      resetDetail();
      renderSemuaKalender();
    }
  );
}
if (todayButton) {
  todayButton.addEventListener(
    "click",
    () => {
      const now =
        new Date();
      tanggalSekarang =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          1
        );
      tanggalDipilih = null;
      resetDetail();
      renderSemuaKalender();
    }
  );
}
if (
  filterButton &&
  filterMenu
) {
  filterButton.addEventListener(
    "click",
    () => {
      filterMenu.classList.toggle(
        "show"
      );
    }
  );
}
document
  .querySelectorAll(
    ".filter-option"
  )
  .forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          filterAktif =
            button.dataset.filter ||
            "all";
          document
            .querySelectorAll(
              ".filter-option"
            )
            .forEach(item => {
              item.classList.remove(
                "active"
              );
            });
          button.classList.add(
            "active"
          );
          if (filterButton) {
            filterButton.innerHTML = `
              <i class="fa-solid fa-filter"></i>
              ${button.textContent}
            `;
          }
          if (filterMenu) {
            filterMenu.classList.remove(
              "show"
            );
          }
          renderSemuaKalender();
        }
      );
    }
  );
document.addEventListener(
  "click",
  event => {
    if (
      filterMenu &&
      filterButton &&
      !filterMenu.contains(
        event.target
      ) &&
      !filterButton.contains(
        event.target
      )
    ) {
      filterMenu.classList.remove(
        "show"
      );
    }
  }
);
const ctaSection =
  document.querySelector(
    ".cta-section"
  );
if (
  ctaSection &&
  "IntersectionObserver" in window
) {
  const ctaObserver =
    new IntersectionObserver(
      entries => {
        entries.forEach(
          entry => {
            if (
              entry.isIntersecting
            ) {
              ctaSection.classList.add(
                "show"
              );
              ctaObserver.unobserve(
                ctaSection
              );
            }
          }
        );
      },
      {
        threshold: 0.25
      }
    );
  ctaObserver.observe(
    ctaSection
  );
} else if (ctaSection) {
  ctaSection.classList.add(
    "show"
  );
}
const counters =
  document.querySelectorAll(
    ".counter"
  );
if (
  "IntersectionObserver" in window
) {
  const counterObserver =
    new IntersectionObserver(
      entries => {
        entries.forEach(
          entry => {
            if (
              !entry.isIntersecting
            ) {
              return;
            }
            const counter =
              entry.target;
            const target =
              Number(
                counter.dataset.target
              );
            const suffix =
              target === 18
                ? ""
                : "+";
            const startTime =
              performance.now();
            const duration =
              1200;
            function updateCounter(
              currentTime
            ) {
              const progress =
                Math.min(
                  (
                    currentTime -
                    startTime
                  ) / duration,
                  1
                );
              counter.textContent =
                Math.floor(
                  progress * target
                );
              if (
                progress < 1
              ) {
                requestAnimationFrame(
                  updateCounter
                );
              } else {
                counter.textContent =
                  target + suffix;
              }
            }
            requestAnimationFrame(
              updateCounter
            );
            counterObserver.unobserve(
              counter
            );
          }
        );
      },
      {
        threshold: 0.5
      }
    );
  counters.forEach(
    counter => {
      counterObserver.observe(
        counter
      );
    }
  );
}
const hamburger =
  document.getElementById(
    "hamburger-menu"
  );
const navbarNav =
  document.getElementById(
    "navbarNav"
  ) ||
  document.querySelector(
    ".navbar-nav"
  );
if (
  hamburger &&
  navbarNav
) {
  hamburger.addEventListener(
    "click",
    () => {
      navbarNav.classList.toggle(
        "active"
      );
    }
  );
  navbarNav
    .querySelectorAll("a")
    .forEach(
      link => {
        link.addEventListener(
          "click",
          () => {
            navbarNav.classList.remove(
              "active"
            );
          }
        );
      }
    );
}
const contactForm =
  document.getElementById(
    "contactForm"
  );
if (contactForm) {
  contactForm.addEventListener(
    "submit",
    event => {
      event.preventDefault();
      alert(
        "Pesan berhasil disiapkan. Silakan hubungkan form ini ke layanan pengiriman pesan jika ingin digunakan secara nyata."
      );
      contactForm.reset();
    }
  );
}
const slider =
  document.querySelector(
    ".berita-slider"
  );
if (slider) {
  let posisi = 0;
  function geserBerita() {
    const kartu =
      slider.querySelector(
        ".berita-card"
      );
    if (!kartu) {
      return;
    }
    const jarak =
      kartu.offsetWidth + 22;
    posisi += jarak;
    const batas =
      slider.scrollWidth -
      slider.parentElement.clientWidth;
    if (posisi > batas) {
      posisi = 0;
    }
    slider.style.transform =
      `translateX(-${posisi}px)`;
  }
  setInterval(
    geserBerita,
    3000
  );
}
function initProfilePage() {
  const profilePage =
    document.getElementById(
      "profilePage"
    );
  if (!profilePage) {
    return;
  }
  const navBtns =
    document.querySelectorAll(
      ".profile-nav-btn"
    );
  const sections = [
    document.getElementById(
      "profil-singkat"
    ),
    document.getElementById(
      "visi-misi"
    ),
    document.getElementById(
      "struktur-organisasi"
    )
  ].filter(Boolean);
  window.addEventListener(
    "scroll",
    () => {
      let currentId = "";
      const scrollPos =
        window.scrollY + 160;
      sections.forEach(
        sec => {
          if (
            scrollPos >=
            sec.offsetTop
          ) {
            currentId =
              sec.getAttribute(
                "id"
              );
          }
        }
      );
      navBtns.forEach(
        btn => {
          btn.classList.remove(
            "active"
          );
          const href =
            btn.getAttribute(
              "href"
            );
          if (
            href ===
            `#${currentId}`
          ) {
            btn.classList.add(
              "active"
            );
          }
        }
      );
    }
  );
  const searchInput =
    document.getElementById(
      "profileSearchInput"
    );
  const tableRows =
    document.querySelectorAll(
      ".profile-table tbody tr"
    );
  const noResultRow =
    document.getElementById(
      "tableNoResult"
    );
  if (
    searchInput &&
    tableRows.length
  ) {
    searchInput.addEventListener(
      "input",
      e => {
        const query =
          e.target.value
            .toLowerCase()
            .trim();
        let matchCount = 0;
        tableRows.forEach(
          row => {
            if (
              row.id ===
              "tableNoResult"
            ) {
              return;
            }
            const text =
              row.textContent
                .toLowerCase();
            if (
              text.includes(
                query
              )
            ) {
              row.style.display =
                "";
              matchCount++;
            } else {
              row.style.display =
                "none";
            }
          }
        );
        if (noResultRow) {
          noResultRow.style.display =
            matchCount === 0
              ? ""
              : "none";
        }
      }
    );
  }
  document
    .querySelectorAll(
      ".profile-copy-btn"
    )
    .forEach(
      btn => {
        btn.addEventListener(
          "click",
          () => {
            const textToCopy =
              btn.getAttribute(
                "data-copy"
              ) ||
              btn.parentElement
                .textContent
                .trim();
            navigator.clipboard
              .writeText(
                textToCopy
              )
              .then(
                () => {
                  const originalHtml =
                    btn.innerHTML;
                  btn.innerHTML =
                    '<i class="fa-solid fa-check"></i> Tersalin!';
                  btn.style.background =
                    "#16a34a";
                  btn.style.color =
                    "#ffffff";
                  setTimeout(
                    () => {
                      btn.innerHTML =
                        originalHtml;
                      btn.style.background =
                        "";
                      btn.style.color =
                        "";
                    },
                    2000
                  );
                }
              );
          }
        );
      }
    );
  const satuData = {
    s: {
      title:
        "S - SCIENCE (Sains & Teknologi)",
      desc:
        "Menumbuhkan nalar kritis, kemampuan riset, logika sains, dan penguasaan teknologi digital untuk bersaing di tingkat nasional maupun internasional.",
      icon:
        "fa-solid fa-flask-vial",
      color:
        "#014BAA"
    },
    a: {
      title:
        "A - ATTITUDE (Sikap & Karakter Mulia)",
      desc:
        "Menanamkan nilai-nilai religius, kejujuran, integritas, kedisiplinan, tata krama, serta etika berakhlak mulia dalam setiap aspek kehidupan.",
      icon:
        "fa-solid fa-heart",
      color:
        "#e11d48"
    },
    t: {
      title:
        "T - TALENT (Bakat, Minat & Kreativitas)",
      desc:
        "Membina dan menyalurkan potensi bakat minat siswa di bidang akademik, sains, seni budaya, kepemimpinan, dan olahraga melalui wadah ekstrakurikuler unggulan.",
      icon:
        "fa-solid fa-star",
      color:
        "#d97706"
    },
    u: {
      title:
        "U - UNITY (Persatuan & Toleransi)",
      desc:
        "Mempererat rasa persaudaraan, solidaritas, toleransi, semangat persatuan dan kesatuan seluruh warga sekolah dalam bingkai kebinekaan Indonesia.",
      icon:
        "fa-solid fa-handshake-angle",
      color:
        "#059669"
    }
  };
  const satuBtns =
    document.querySelectorAll(
      ".satu-btn"
    );
  const satuCard =
    document.getElementById(
      "satuContentCard"
    );
  if (
    satuBtns.length &&
    satuCard
  ) {
    satuBtns.forEach(
      btn => {
        btn.addEventListener(
          "click",
          () => {
            satuBtns.forEach(
              b =>
                b.classList.remove(
                  "active"
                )
            );
            btn.classList.add(
              "active"
            );
            const key =
              btn.getAttribute(
                "data-satu"
              );
            const data =
              satuData[key];
            if (!data) {
              return;
            }
            satuCard.style.opacity =
              "0";
            satuCard.style.transform =
              "translateY(8px)";
            setTimeout(
              () => {
                satuCard.innerHTML = `
                  <i
                    class="${data.icon}"
                    style="color: ${data.color}"
                  ></i>
                  <div>
                    <h4
                      style="
                        margin: 0 0 4px;
                        color: #1e293b;
                        font-size: 1.05rem;
                      "
                    >
                      ${data.title}
                    </h4>
                    <p
                      style="
                        margin: 0;
                        color: #475569;
                        font-size: 0.95rem;
                        line-height: 1.6;
                      "
                    >
                      ${data.desc}
                    </p>
                  </div>
                `;
                satuCard.style.opacity =
                  "1";
                satuCard.style.transform =
                  "translateY(0)";
              },
              180
            );
          }
        );
      }
    );
  }
  const orgImg =
    document.getElementById(
      "orgChartImg"
    );
  const zoomInBtn =
    document.getElementById(
      "zoomInBtn"
    );
  const zoomOutBtn =
    document.getElementById(
      "zoomOutBtn"
    );
  const zoomResetBtn =
    document.getElementById(
      "zoomResetBtn"
    );
  const zoomFullscreenBtn =
    document.getElementById(
      "zoomFullscreenBtn"
    );
  let currentZoom = 1.0;
  function updateZoom(
    newZoom
  ) {
    currentZoom =
      Math.min(
        Math.max(
          newZoom,
          0.7
        ),
        2.5
      );
    if (orgImg) {
      orgImg.style.transform =
        `scale(${currentZoom})`;
    }
  }
  if (zoomInBtn) {
    zoomInBtn.addEventListener(
      "click",
      () => {
        updateZoom(
          currentZoom + 0.25
        );
      }
    );
  }
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener(
      "click",
      () => {
        updateZoom(
          currentZoom - 0.25
        );
      }
    );
  }
  if (zoomResetBtn) {
    zoomResetBtn.addEventListener(
      "click",
      () => {
        updateZoom(1.0);
      }
    );
  }
  const orgFilterBtns =
    document.querySelectorAll(
      ".org-filter-btn"
    );
  const orgRoleCards =
    document.querySelectorAll(
      ".org-role-card"
    );
  if (
    orgFilterBtns.length &&
    orgRoleCards.length
  ) {
    orgFilterBtns.forEach(
      btn => {
        btn.addEventListener(
          "click",
          () => {
            orgFilterBtns.forEach(
              b =>
                b.classList.remove(
                  "active"
                )
            );
            btn.classList.add(
              "active"
            );
            const filter =
              btn.getAttribute(
                "data-filter"
              );
            orgRoleCards.forEach(
              card => {
                const category =
                  card.getAttribute(
                    "data-category"
                  );
                if (
                  filter === "all" ||
                  category === filter
                ) {
                  card.style.display =
                    "";
                  card.style.animation =
                    "zoomIn 0.3s ease";
                } else {
                  card.style.display =
                    "none";
                }
              }
            );
          }
        );
      }
    );
  }
  const lightbox =
    document.getElementById(
      "profileLightbox"
    );
  const lightboxImg =
    document.getElementById(
      "profileLightboxImg"
    );
  const lightboxCaption =
    document.getElementById(
      "profileLightboxCaption"
    );
  const lightboxClose =
    document.getElementById(
      "profileLightboxClose"
    );
  function openLightbox(
    src,
    caption
  ) {
    if (
      !lightbox ||
      !lightboxImg
    ) {
      return;
    }
    lightboxImg.src =
      src;
    if (lightboxCaption) {
      lightboxCaption.textContent =
        caption || "";
    }
    lightbox.classList.add(
      "active"
    );
    document.body.style.overflow =
      "hidden";
  }
  function closeLightbox() {
    if (!lightbox) {
      return;
    }
    lightbox.classList.remove(
      "active"
    );
    document.body.style.overflow =
      "";
  }
  document
    .querySelectorAll(
      ".profile-zoomable"
    )
    .forEach(
      elem => {
        elem.addEventListener(
          "click",
          () => {
            const img =
              elem.tagName === "IMG"
                ? elem
                : elem.querySelector(
                    "img"
                  );
            if (img) {
              const caption =
                elem.getAttribute(
                  "data-caption"
                ) ||
                img.getAttribute(
                  "alt"
                ) ||
                "";
              openLightbox(
                img.src,
                caption
              );
            }
          }
        );
      }
    );
  if (
    zoomFullscreenBtn &&
    orgImg
  ) {
    zoomFullscreenBtn.addEventListener(
      "click",
      () => {
        openLightbox(
          orgImg.src,
          "Bagan Struktur Organisasi SMA Negeri 1 Sanggau"
        );
      }
    );
  }
  if (lightboxClose) {
    lightboxClose.addEventListener(
      "click",
      closeLightbox
    );
  }
  if (lightbox) {
    lightbox.addEventListener(
      "click",
      e => {
        if (
          e.target === lightbox
        ) {
          closeLightbox();
        }
      }
    );
  }
  document.addEventListener(
    "keydown",
    e => {
      if (
        e.key === "Escape" &&
        lightbox &&
        lightbox.classList.contains(
          "active"
        )
      ) {
        closeLightbox();
      }
    }
  );
}
if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initProfilePage
  );
} else {
  initProfilePage();
}
    // Interaktivitas Drag-to-Scroll untuk SDM Grid
document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.sdm-grid, .mading-grid, .galeri-grid, .ekstra-grid');
    grids.forEach(grid => {
        let isDown = false;
        let startX;
        let scrollLeft;

        grid.addEventListener('mousedown', (e) => {
            isDown = true;
            grid.style.cursor = 'grabbing';
            grid.style.scrollSnapType = 'none'; 
            grid.style.scrollBehavior = 'auto'; 
            startX = e.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
        });

        grid.addEventListener('mouseleave', () => {
            isDown = false;
            grid.style.cursor = 'grab';
            grid.style.scrollSnapType = 'x mandatory';
            grid.style.scrollBehavior = 'smooth';
        });

        grid.addEventListener('mouseup', () => {
            isDown = false;
            grid.style.cursor = 'grab';
            grid.style.scrollSnapType = 'x mandatory';
            grid.style.scrollBehavior = 'smooth';
        });

        grid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 2; 
            grid.scrollLeft = scrollLeft - walk;
        });

        grid.style.cursor = 'grab';
    });
});



// Fix Statistik Animation
document.addEventListener('DOMContentLoaded', () => {
    const statCounters = document.querySelectorAll('.counter');
    if (statCounters.length > 0 && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
                    const suffix = target === 18 ? '' : '+';
                    let current = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); 
                    
                    const update = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + suffix;
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    update();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        statCounters.forEach(c => {
            c.innerText = '0' + (c.getAttribute('data-target') === '18' ? '' : '+');
            obs.observe(c);
        });
    }
});

// Pop-up animation for CTA text
document.addEventListener('DOMContentLoaded', () => {
    const popupText = document.querySelector('.popup-text');
    if (popupText && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        obs.observe(popupText);
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const satuButtons = document.querySelectorAll(".satu-btn");
  const satuContentCard = document.getElementById("satuContentCard");

  const satuData = {
    s: {
      icon: "fa-flask-vial",
      title: "S - SCIENCE",
      word: "(Sains & Teknologi)",
      text: "Menumbuhkan nalar kritis, kemampuan riset, logika sains, dan penguasaan teknologi digital untuk bersaing di tingkat nasional maupun internasional."
    },
    a: {
      icon: "fa-heart",
      title: "A - ATTITUDE",
      word: "(Sikap & Karakter)",
      text: "Membentuk peserta didik yang memiliki karakter baik, disiplin, bertanggung jawab, berakhlak mulia, serta mampu menghargai orang lain."
    },
    t: {
      icon: "fa-star",
      title: "T - TALENT",
      word: "(Bakat & Prestasi)",
      text: "Mengembangkan potensi, minat, dan bakat peserta didik agar mampu menghasilkan prestasi di bidang akademik maupun nonakademik."
    },
    u: {
      icon: "fa-people-group",
      title: "U - UNITY",
      word: "(Persatuan & Kebersamaan)",
      text: "Membangun semangat kebersamaan, kolaborasi, toleransi, dan persatuan seluruh warga sekolah untuk menciptakan lingkungan pendidikan yang harmonis."
    }
  };

  satuButtons.forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.satu;
      const data = satuData[key];

      if (!data || !satuContentCard) return;

      satuButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      satuContentCard.classList.add("changing");

      setTimeout(() => {
        satuContentCard.innerHTML = `
          <i class="fa-solid ${data.icon}"></i>
          <div>
            <h4>
              ${data.title}
              <span>${data.word}</span>
            </h4>
            <p>${data.text}</p>
          </div>
        `;

        satuContentCard.classList.remove("changing");
      }, 180);
    });
  });

  const profileSearchInput = document.getElementById("profileSearchInput");
  const profileTable = document.querySelector(".profile-table");
  const tableNoResult = document.getElementById("tableNoResult");

  if (profileSearchInput && profileTable) {
    profileSearchInput.addEventListener("input", () => {
      const keyword = profileSearchInput.value.toLowerCase().trim();
      const rows = profileTable.querySelectorAll("tbody tr:not(#tableNoResult)");
      let found = false;

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();

        if (text.includes(keyword)) {
          row.style.display = "";
          found = true;
        } else {
          row.style.display = "none";
        }
      });

      if (tableNoResult) {
        tableNoResult.style.display = found ? "none" : "";
      }
    });
  }

  const copyButtons = document.querySelectorAll(".profile-copy-btn");

  copyButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;

      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);

        const originalHTML = button.innerHTML;

        button.innerHTML = `
          <i class="fa-solid fa-check"></i>
          Tersalin
        `;

        setTimeout(() => {
          button.innerHTML = originalHTML;
        }, 1500);
      } catch (error) {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();

        const originalHTML = button.innerHTML;

        button.innerHTML = `
          <i class="fa-solid fa-check"></i>
          Tersalin
        `;

        setTimeout(() => {
          button.innerHTML = originalHTML;
        }, 1500);
      }
    });
  });

  const orgFilterButtons = document.querySelectorAll(".org-filter-btn");
  const orgRoleCards = document.querySelectorAll(".org-role-card");

  orgFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      orgFilterButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      orgRoleCards.forEach(card => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  const viewport = document.querySelector(".org-img-viewport");
  const image = document.getElementById("orgChartImg");

  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const zoomResetBtn = document.getElementById("zoomResetBtn");
  const zoomFullscreenBtn = document.getElementById("zoomFullscreenBtn");

  if (viewport && image) {
    let scale = 1;
    let positionX = 0;
    let positionY = 0;

    let dragging = false;
    let startX = 0;
    let startY = 0;

    const minScale = 0.5;
    const maxScale = 4;
    const zoomStep = 0.2;

    function updateChart() {
      image.style.transform =
        `translate3d(${positionX}px, ${positionY}px, 0) scale(${scale})`;
    }

    function resetChart() {
      scale = 1;
      positionX = 0;
      positionY = 0;
      updateChart();
    }

    zoomInBtn?.addEventListener("click", () => {
      scale = Math.min(maxScale, scale + zoomStep);
      updateChart();
    });

    zoomOutBtn?.addEventListener("click", () => {
      scale = Math.max(minScale, scale - zoomStep);
      updateChart();
    });

    zoomResetBtn?.addEventListener("click", resetChart);

    viewport.addEventListener(
      "wheel",
      event => {
        event.preventDefault();

        if (event.deltaY < 0) {
          scale = Math.min(maxScale, scale + zoomStep);
        } else {
          scale = Math.max(minScale, scale - zoomStep);
        }

        updateChart();
      },
      { passive: false }
    );

    viewport.addEventListener("mousedown", event => {
      if (scale <= 1) return;

      dragging = true;

      startX = event.clientX - positionX;
      startY = event.clientY - positionY;

      viewport.classList.add("dragging");
    });

    window.addEventListener("mousemove", event => {
      if (!dragging) return;

      positionX = event.clientX - startX;
      positionY = event.clientY - startY;

      updateChart();
    });

    window.addEventListener("mouseup", () => {
      dragging = false;
      viewport.classList.remove("dragging");
    });

    viewport.addEventListener(
      "touchstart",
      event => {
        if (event.touches.length !== 1 || scale <= 1) return;

        dragging = true;

        startX = event.touches[0].clientX - positionX;
        startY = event.touches[0].clientY - positionY;

        viewport.classList.add("dragging");
      },
      { passive: true }
    );

    viewport.addEventListener(
      "touchmove",
      event => {
        if (!dragging || event.touches.length !== 1) return;

        positionX = event.touches[0].clientX - startX;
        positionY = event.touches[0].clientY - startY;

        updateChart();
      },
      { passive: true }
    );

    viewport.addEventListener("touchend", () => {
      dragging = false;
      viewport.classList.remove("dragging");
    });

    zoomFullscreenBtn?.addEventListener("click", async () => {
      try {
        if (!document.fullscreenElement) {
          await viewport.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch (error) {
        viewport.classList.toggle("fullscreen-fallback");
      }
    });

    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement === viewport) {
        viewport.classList.add("org-fullscreen");
      } else {
        viewport.classList.remove("org-fullscreen");
      }
    });

    updateChart();
  }

  const lightbox = document.getElementById("profileLightbox");
  const lightboxImg = document.getElementById("profileLightboxImg");
  const lightboxCaption = document.getElementById("profileLightboxCaption");
  const lightboxClose = document.getElementById("profileLightboxClose");

  const zoomableImages = document.querySelectorAll(".profile-zoomable");

  zoomableImages.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.tagName === "IMG"
        ? item
        : item.querySelector("img");

      if (!img || !lightbox || !lightboxImg) return;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "Pratinjau Gambar";

      if (lightboxCaption) {
        lightboxCaption.textContent =
          item.dataset.caption || img.alt || "";
      }

      lightbox.classList.add("active");
      document.body.classList.add("lightbox-open");
    });
  });

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");

    setTimeout(() => {
      if (lightboxImg) {
        lightboxImg.src = "";
      }
    }, 200);
  }

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});
