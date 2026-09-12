(() => {
  const W = window.WEDDING;

  const get = (path) =>
    path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), W);

  const applyBindings = () => {
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const value = get(el.dataset.bind);
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-src]").forEach((el) => {
      const value = get(el.dataset.src);
      if (value) el.src = value;
    });
    document.querySelectorAll("[data-href]").forEach((el) => {
      const value = get(el.dataset.href);
      if (value) el.href = value;
    });
  };

  const setBackgrounds = () => {
    const hero = document.getElementById("hero-bg");
    const quote = document.getElementById("quote-stage");
    const quoteBg = document.getElementById("quote-bg");
    const thanks = document.getElementById("thank-you");
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (hero) {
      hero.style.backgroundImage = `url("${mobile ? W.images.heroMobile : W.images.hero}")`;
    }
    if (quote) quote.style.backgroundImage = `url("${W.images.bgQuote}")`;
    if (quoteBg) quoteBg.style.backgroundImage = `url("${W.images.bgQuote1}")`;
    if (thanks) {
      thanks.style.backgroundImage = `url("${mobile ? W.images.thankYouMobile : W.images.thankYou}")`;
    }
  };

  const renderStory = () => {
    const intro = document.getElementById("story-intro");
    const list = document.getElementById("story-timeline");
    if (intro) intro.textContent = W.story.intro;
    if (!list) return;
    list.innerHTML = W.story.items
      .map(
        (item) => `
        <article class="journey-item reveal-block reveal">
          <p class="journey-period">${item.period}</p>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>`
      )
      .join("");
  };

  const renderCalendar = () => {
    const grid = document.getElementById("calendar-grid");
    const label = document.getElementById("calendar-month");
    if (!grid) return;

    const year = W.date.calendarYear;
    const month = W.date.calendarMonth;
    const monthNames = [
      "",
      "THÁNG 1 - JANUARY",
      "THÁNG 2 - FEBRUARY",
      "THÁNG 3 - MARCH",
      "THÁNG 4 - APRIL",
      "THÁNG 5 - MAY",
      "THÁNG 6 - JUNE",
      "THÁNG 7 - JULY",
      "THÁNG 8 - AUGUST",
      "THÁNG 9 - SEPTEMBER",
      "THÁNG 10 - OCTOBER",
      "THÁNG 11 - NOVEMBER",
      "THÁNG 12 - DECEMBER",
    ];
    if (label) label.textContent = monthNames[month];

    const first = new Date(year, month - 1, 1);
    const startOffset = (first.getDay() + 6) % 7; // Monday first
    const daysInMonth = new Date(year, month, 0).getDate();
    const brideDay = W.brideCeremony?.enabled ? Number(W.brideCeremony.calendarDay) : NaN;
    const groomDay = Number(W.weddingCeremony.calendarDay);

    if (!W.brideCeremony?.enabled) {
      document.getElementById("bride-ceremony-card")?.classList.add("hidden");
      document.getElementById("legend-bride")?.classList.add("hidden");
    }

    let html = "";
    for (let i = 0; i < startOffset; i += 1) html += `<div class="calendar-cell"></div>`;
    for (let day = 1; day <= daysInMonth; day += 1) {
      const isBride = day === brideDay;
      const isGroom = day === groomDay;
      if (isBride || isGroom) {
        const mark = isBride && isGroom ? "mark-groom" : isBride ? "mark-bride" : "mark-groom";
        html += `<div class="calendar-cell ${mark}"><span class="heart-marker"><span class="heart-day">${day}</span></span></div>`;
      } else {
        html += `<div class="calendar-cell"><span class="day-number">${day}</span></div>`;
      }
    }
    grid.innerHTML = html;
  };

  const startCountdown = () => {
    const target = new Date(W.date.iso).getTime();
    const dateEl = document.getElementById("countdown-date");
    const caption = document.getElementById("countdown-caption");
    if (dateEl) dateEl.textContent = W.date.text.toUpperCase();

    const tick = () => {
      const now = Date.now();
      let diff = Math.max(0, target - now);
      if (diff === 0 && caption) {
        caption.textContent = "CHÚC MỪNG HAI BẠN TRONG NGÀY THÀNH HÔN.";
      }
      const days = Math.floor(diff / 86400000);
      diff %= 86400000;
      const hours = Math.floor(diff / 3600000);
      diff %= 3600000;
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(value);
      };
      set("cd-days", days);
      set("cd-hours", hours);
      set("cd-mins", mins);
      set("cd-secs", secs);
    };
    tick();
    setInterval(tick, 1000);
  };

  const setupAlbum = () => {
    const photos = W.images.album;
    const image = document.getElementById("album-image");
    const thumbs = document.getElementById("album-thumbs");
    const counter = document.getElementById("album-counter");
    if (!image || !thumbs || !photos.length) return;
    let index = 0;

    const render = () => {
      image.src = photos[index];
      counter.textContent = `${index + 1} / ${photos.length}`;
      thumbs.querySelectorAll(".thumb-item").forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });
    };

    thumbs.innerHTML = photos
      .map(
        (src, i) =>
          `<button class="thumb-item${i === 0 ? " active" : ""}" type="button" data-index="${i}" aria-label="Ảnh ${i + 1}">
            <img src="${src}" alt="" />
          </button>`
      )
      .join("");

    thumbs.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-index]");
      if (!btn) return;
      index = Number(btn.dataset.index);
      render();
    });

    document.getElementById("album-prev")?.addEventListener("click", () => {
      index = (index - 1 + photos.length) % photos.length;
      render();
    });
    document.getElementById("album-next")?.addEventListener("click", () => {
      index = (index + 1) % photos.length;
      render();
    });

    let startX = 0;
    image.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].clientX;
    });
    image.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      index = dx > 0 ? (index - 1 + photos.length) % photos.length : (index + 1) % photos.length;
      render();
    });

    render();
  };

  const setupReveal = () => {
    const nodes = document.querySelectorAll(".reveal, .reveal-block");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          const collage = entry.target.id === "collage" ? entry.target : entry.target.closest("#collage");
          if (entry.target.matches(".wedding-info-reveal, #collage, .couple-collage-grid")) {
            entry.target.querySelectorAll(".family-col, .collage-card, .name-block").forEach((child) => {
              child.classList.add("is-visible");
            });
          }
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((node) => io.observe(node));
    const collage = document.getElementById("collage");
    if (collage) io.observe(collage);
  };

  const setupCover = () => {
    const root = document.getElementById("cover");
    const shell = document.getElementById("cover-shell");
    const heart = document.getElementById("cover-heart");
    const ring = document.getElementById("cover-ring");
    const button = document.getElementById("open-invite");
    if (!button) return;

    const closeCover = (instant = false) => {
      if (instant) {
        root?.classList.add("is-gone");
        root?.setAttribute("aria-hidden", "true");
        document.body.classList.remove("is-locked");
        if (root) root.style.display = "none";
        return;
      }
      heart?.classList.add("is-breaking");
      ring?.classList.add("is-active");
      shell?.classList.add("is-exiting");
      setTimeout(() => closeCover(true), 720);
    };

    button.addEventListener("click", () => closeCover(false));
    if (new URLSearchParams(location.search).has("open")) closeCover(true);
  };

  const setupPetals = () => {
    const layer = document.getElementById("cover-petals");
    if (!layer) return;
    const glyphs = ["❀", "✿", "❁", "✾"];
    for (let i = 0; i < 14; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.textContent = glyphs[i % glyphs.length];
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.fontSize = `${12 + Math.random() * 16}px`;
      petal.style.animationDuration = `${10 + Math.random() * 12}s`;
      petal.style.animationDelay = `${-Math.random() * 10}s`;
      petal.style.color = i % 2 ? "#ba4a59" : "#d5758b";
      layer.appendChild(petal);
    }
  };

  const setupHearts = () => {
    const layer = document.getElementById("floating-hearts");
    if (!layer) return;
    const colors = ["#d5758b", "#ba4a59", "#e8a0ad"];
    for (let i = 0; i < 10; i += 1) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.style.setProperty("--left", `${Math.random() * 100}%`);
      heart.style.setProperty("--size", `${8 + Math.random() * 10}px`);
      heart.style.setProperty("--color", colors[i % colors.length]);
      heart.style.setProperty("--opacity", `${0.18 + Math.random() * 0.22}`);
      heart.style.setProperty("--duration", `${10 + Math.random() * 10}s`);
      heart.style.setProperty("--delay", `${-Math.random() * 12}s`);
      heart.style.setProperty("--drift", `${-40 + Math.random() * 80}px`);
      layer.appendChild(heart);
    }
  };

  const setupMusic = () => {
    const audio = document.getElementById("bg-music");
    const button = document.getElementById("music-btn");
    if (!audio || !button) return;
    audio.src = W.music;
    button.addEventListener("click", async () => {
      if (audio.paused) {
        try {
          await audio.play();
          button.classList.remove("is-paused");
        } catch {
          button.classList.add("is-paused");
        }
      } else {
        audio.pause();
        button.classList.add("is-paused");
      }
    });
  };

  const setupParallax = () => {
    const bg = document.getElementById("hero-bg");
    if (!bg || window.matchMedia("(max-width: 767px)").matches) return;
    const onScroll = () => {
      const y = Math.min(window.scrollY, 600);
      bg.style.transform = `translateY(${y * 0.18}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  applyBindings();
  setBackgrounds();
  renderStory();
  renderCalendar();
  startCountdown();
  setupAlbum();
  setupReveal();
  setupCover();
  setupPetals();
  setupHearts();
  setupMusic();
  setupParallax();
  window.addEventListener("resize", setBackgrounds);

  document.title = `${W.couple.groomShort} - ${W.couple.brideShort}, ${W.date.simplify}`;
})();
