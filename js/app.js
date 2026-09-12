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
    const quoteImg = document.getElementById("quote-stage-img");
    const quoteBgImg = document.getElementById("quote-bg-img");
    const thanksImg = document.getElementById("thank-you-img");
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (hero) hero.src = mobile ? W.images.heroMobile : W.images.hero;
    if (quoteImg) quoteImg.src = W.images.bgQuote;
    if (quoteBgImg) quoteBgImg.src = W.images.bgQuote1;
    if (thanksImg) thanksImg.src = mobile ? W.images.thankYouMobile : W.images.thankYou;
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
        const path = "M12 21s-6.7-4.35-9.33-8.2C.7 9.96 1.56 6.5 4.4 5.2c1.86-.85 4.05-.2 5.2 1.46C10.75 5 12.94 4.35 14.8 5.2c2.84 1.3 3.7 4.76 1.73 7.6C18.7 16.65 12 21 12 21z";
        const heart = isBride
          ? `<svg class="cal-heart" viewBox="0 0 24 24" aria-hidden="true"><path class="cal-heart-border" d="${path}"/><path class="cal-heart-hole" d="${path}" transform="translate(12 12.6) scale(0.72) translate(-12 -12.6)"/></svg>`
          : `<svg class="cal-heart" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
        html += `<div class="calendar-cell ${isBride ? "mark-bride" : "mark-groom"}">${heart}<span class="heart-day">${day}</span></div>`;
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

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  scrollToTop();
  window.addEventListener("pageshow", scrollToTop);

  const setupCover = () => {
    const root = document.getElementById("cover");
    const shell = document.getElementById("cover-shell");
    const heart = document.getElementById("cover-heart");
    const ring = document.getElementById("cover-ring");
    const button = document.getElementById("open-invite");
    if (!button) return;

    const closeCover = (instant = false) => {
      scrollToTop();
      if (instant) {
        root?.classList.add("is-gone");
        root?.setAttribute("aria-hidden", "true");
        document.body.classList.remove("is-locked");
        if (root) root.style.display = "none";
        scrollToTop();
        requestAnimationFrame(scrollToTop);
        return;
      }
      heart?.classList.add("is-breaking");
      ring?.classList.add("is-active");
      shell?.classList.add("is-exiting");
      window.playWeddingMusic?.();
      setTimeout(() => closeCover(true), 420);
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
    const button = document.getElementById("music-btn");
    const audio = document.getElementById("wedding-audio");
    if (!button) return;

    const start = Number(W.music?.startSeconds) || 0;
    const file = W.music?.file;
    const trackId = W.music?.trackId || "617343069";
    let widget = null;
    let playing = false;
    let wantPlay = false;
    let usingAudio = false;

    const setPlaying = (on) => {
      playing = on;
      button.classList.toggle("is-paused", !on);
    };

    const ensureWidgetApi = (onReady) => {
      if (typeof SC !== "undefined") {
        onReady();
        return;
      }
      const existing = document.querySelector("script[data-sc-api]");
      if (existing) {
        existing.addEventListener("load", onReady, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://w.soundcloud.com/player/api.js";
      script.dataset.scApi = "true";
      script.onload = onReady;
      document.head.appendChild(script);
    };

    const bindFrame = (iframe) => {
      ensureWidgetApi(() => {
        if (typeof SC === "undefined") return;
        widget = SC.Widget(iframe);
        widget.bind(SC.Widget.Events.READY, () => {
          if (start > 0) widget.seekTo(start * 1000);
          widget.bind(SC.Widget.Events.PLAY, () => setPlaying(true));
          widget.bind(SC.Widget.Events.PAUSE, () => setPlaying(false));
          widget.bind(SC.Widget.Events.FINISH, () => {
            widget.seekTo(start * 1000);
            widget.play();
          });
        });
      });
    };

    const playStream = () => {
      let iframe = document.getElementById("music-frame");
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "music-frame";
        iframe.title = W.music?.title || "Nhạc cưới";
        iframe.setAttribute("allow", "autoplay; encrypted-media");
        iframe.setAttribute("allowfullscreen", "true");
        document.body.appendChild(iframe);
        iframe.addEventListener("load", () => bindFrame(iframe));
      }
      iframe.src =
        `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}` +
        `&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;
      setPlaying(true);
    };

    const play = () => {
      wantPlay = true;
      if (file && audio) {
        usingAudio = true;
        audio.src = file;
        audio.loop = true;
        audio.currentTime = start;
        const result = audio.play();
        if (result && typeof result.catch === "function") {
          result.then(() => setPlaying(true)).catch(() => {
            usingAudio = false;
            playStream();
          });
        }
        return;
      }
      playStream();
    };

    const pause = () => {
      wantPlay = false;
      if (usingAudio && audio) audio.pause();
      widget?.pause();
      setPlaying(false);
    };

    window.playWeddingMusic = play;
    button.addEventListener("click", () => {
      if (playing) pause();
      else play();
    });
  };

  applyBindings();
  setBackgrounds();
  renderCalendar();
  startCountdown();
  setupAlbum();
  setupReveal();
  setupMusic();
  setupCover();
  setupPetals();
  setupHearts();
  window.addEventListener("resize", setBackgrounds);

  document.title = `${W.couple.groomShort} - ${W.couple.brideShort}, ${W.date.simplify}`;
})();
