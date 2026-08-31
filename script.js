(() => {
  "use strict";

  const MARQUEE_ITEMS = ["Gaming Edits", "Motion Graphics", "Portfolio Design", "Awareness Content", "Education Content", "Viral Hooks"];

  const PORTFOLIOS = [
    {
      tag: "Corporate", title: "IES-BIM",
      meta: "Web Design · Development · Branding",
      desc: "A professional corporate website for IES-BIM — clean layout, modern structure, built to convert.",
      url: "https://www.ies-bim.com/",
      screenshot: "assets/screenshots/ies-bim.jpg",
    },
  ];

  const VIDEOS = [
    { src: "assets/videos/lost-hadiths.mp4", title: "أحاديث ضيعة", tag: "Awareness" },
    { src: "assets/videos/rich-buy-poor-sell.mp4", title: "حاجة بيشتريها الأغنياء", tag: "Education" },
    { src: "assets/videos/major-minor-sins.mp4", title: "الكبائر و الصغائر", tag: "Awareness" },
    { src: "assets/videos/spiderman-yemen.mp4", title: "سبيدرمان اليمن", tag: "Entertainment" },
  ];

  const CAPABILITIES = [
    { label: "Video Editing", value: 90 },
    { label: "Motion Graphics", value: 82 },
    { label: "Portfolio Design", value: 88 },
    { label: "Social Strategy", value: 70 },
  ];

  const SERVICES = [
    { n: "01", label: "Short-Form Editing", note: "Reels · Shorts · TikTok" },
    { n: "02", label: "Motion Graphics & VFX", note: "Titles · Transitions · FX" },
    { n: "03", label: "Portfolio & Web Design", note: "Brand · Layout · Polish" },
    { n: "04", label: "Hook & Thumbnail Design", note: "Stop-the-scroll first frames" },
  ];

  const JOURNEY = [
    { year: "2022", title: "Started Learning", desc: "Self-taught editing journey begins. Discovered the power of short-form." },
    { year: "2024", title: "First Publish", desc: "Released first professional edits. Built a growing reel of viral-ready clips." },
    { year: "2026", title: "The Breakthrough", desc: "Content went viral. Portfolio design services launched. No looking back." },
  ];

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* Marquee */
  function buildMarquee() {
    const track = document.getElementById("marqueeTrack");
    const rep = (ariaHidden) => {
      const wrap = document.createElement("span");
      wrap.className = "inline-flex items-center";
      wrap.style.display = "inline-flex";
      if (ariaHidden) wrap.setAttribute("aria-hidden", "true");
      MARQUEE_ITEMS.forEach((item) => {
        const itemWrap = document.createElement("span");
        itemWrap.style.display = "inline-flex";
        itemWrap.style.alignItems = "center";
        itemWrap.innerHTML = `<span class="retro-marquee-item">${item}</span><span class="retro-marquee-dot"></span>`;
        wrap.appendChild(itemWrap);
      });
      return wrap;
    };
    track.appendChild(rep(false));
    track.appendChild(rep(true));
  }

  /* Timeline */
  function buildTimeline() {
    const wrap = document.getElementById("timeline");
    JOURNEY.forEach((entry, i) => {
      const node = el(`
        <div class="reveal" style="transition-delay:${i * 150}ms">
          <div class="retro-timeline-node">
            <div class="retro-timeline-marker">
              <span class="retro-timeline-diamond"></span>
              ${i < JOURNEY.length - 1 ? '<span class="retro-timeline-line"></span>' : ""}
            </div>
            <div class="retro-timeline-content">
              <div class="retro-timeline-year">${entry.year}</div>
              <div class="retro-timeline-title">${entry.title}</div>
              <p class="retro-timeline-desc">${entry.desc}</p>
            </div>
          </div>
        </div>
      `);
      wrap.appendChild(node);
    });
  }

  /* Work grid */
  function buildWork() {
    const grid = document.getElementById("workGrid");
    PORTFOLIOS.forEach((item, i) => {
      const card = el(`
        <div class="reveal" style="transition-delay:${i * 120}ms">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="retro-card">
            <div class="retro-card-media">
              <div class="retro-card-tag">[${item.tag}]</div>
              <img src="${item.screenshot}" alt="${item.title} website preview">
              <div class="retro-card-hover-overlay">
                <span class="retro-card-hover-circle">↗</span>
                <span class="retro-card-hover-text">VISIT SITE</span>
              </div>
            </div>
            <div class="retro-card-body">
              <div class="retro-card-title-row">
                <h3 class="retro-card-title">${item.title}</h3>
                <span class="retro-card-arrow">↗</span>
              </div>
              <p class="retro-card-desc">${item.desc}</p>
              <div class="retro-card-meta">${item.meta}</div>
            </div>
          </a>
        </div>
      `);
      grid.appendChild(card);
    });
  }

  /* Videos */
  function buildVideos() {
    const grid = document.getElementById("videoGrid");
    VIDEOS.forEach((video, i) => {
      const card = el(`
        <div class="reveal" style="transition-delay:${i * 120}ms">
          <div class="retro-video-card">
            <div class="retro-video-media">
              <video src="${video.src}" loop muted playsinline preload="metadata"></video>
              <div class="retro-video-overlay"><div class="retro-video-play-btn">▶</div></div>
              <div class="retro-video-ctrls" hidden>
                <button type="button" class="retro-video-ctrl" data-action="mute">♪×</button>
                <button type="button" class="retro-video-ctrl" data-action="fullscreen">⛶</button>
              </div>
            </div>
            <div class="retro-video-info">
              <div class="retro-video-tag">[${video.tag.toUpperCase()}]</div>
              <div class="retro-video-title">${video.title}</div>
            </div>
          </div>
        </div>
      `);
      grid.appendChild(card);

      const cardEl = card.querySelector(".retro-video-card");
      const media = cardEl.querySelector(".retro-video-media");
      const v = cardEl.querySelector("video");
      const overlay = cardEl.querySelector(".retro-video-overlay");
      const ctrls = cardEl.querySelector(".retro-video-ctrls");
      const muteBtn = cardEl.querySelector('[data-action="mute"]');
      const fsBtn = cardEl.querySelector('[data-action="fullscreen"]');

      v.addEventListener("loadeddata", () => { v.currentTime = 1; });
      v.addEventListener("ended", () => {
        overlay.hidden = false;
        ctrls.hidden = true;
      });

      media.addEventListener("click", () => {
        if (v.paused) {
          v.muted = true;
          v.play();
          overlay.hidden = true;
          ctrls.hidden = false;
          muteBtn.textContent = "♪×";
        } else {
          v.pause();
          overlay.hidden = false;
          ctrls.hidden = true;
        }
      });

      muteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        v.muted = !v.muted;
        muteBtn.textContent = v.muted ? "♪×" : "♪";
      });

      fsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (v.requestFullscreen) v.requestFullscreen();
      });
    });
  }

  /* Capabilities + services */
  function buildSkills() {
    const capList = document.getElementById("capList");
    CAPABILITIES.forEach((c, i) => {
      const row = el(`
        <div class="retro-cap-row reveal" style="transition-delay:${i * 90}ms">
          <div class="retro-cap-head">
            <span class="retro-cap-label">${c.label}</span>
            <span class="retro-cap-value">${c.value}%</span>
          </div>
          <div class="retro-bar-track">
            <div class="retro-bar-fill" data-value="${c.value}"></div>
            <div class="retro-bar-segments"></div>
          </div>
        </div>
      `);
      capList.appendChild(row);
    });

    const serviceList = document.getElementById("serviceList");
    SERVICES.forEach((s, i) => {
      const row = el(`
        <div class="reveal" style="transition-delay:${160 + i * 90}ms">
          <div class="retro-service-row">
            <span class="retro-service-num">[${s.n}]</span>
            <div style="flex:1">
              <div class="retro-service-label">${s.label}</div>
              <div class="retro-service-note">${s.note}</div>
            </div>
          </div>
        </div>
      `);
      serviceList.appendChild(row);
    });
  }

  /* Reveal-on-scroll */
  function initReveal() {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".reveal");
    if (reduced) {
      items.forEach((it) => it.classList.add("is-visible"));
      document.querySelectorAll(".retro-bar-fill").forEach((f) => { f.style.width = f.dataset.value + "%"; });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.classList.contains("retro-bar-fill") || entry.target.querySelector?.(".retro-bar-fill")) {
            entry.target.querySelectorAll(".retro-bar-fill").forEach((f) => { f.style.width = f.dataset.value + "%"; });
          }
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((it) => obs.observe(it));
  }

  /* Nav active state + scroll shadow */
  function initNav() {
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    const navBtns = document.querySelectorAll(".retro-nav-btn[data-nav]");
    const sections = ["hero", "studio", "journey", "work", "videos", "skills", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) nav.setAttribute("data-scrolled", "");
      else nav.removeAttribute("data-scrolled");
    }, { passive: true });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navBtns.forEach((b) => b.removeAttribute("data-active"));
          const btn = document.querySelector(`.retro-nav-btn[data-nav="${entry.target.id}"]`);
          if (btn) btn.setAttribute("data-active", "");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    sections.forEach((s) => obs.observe(s));

    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  function initBackToTop() {
    document.getElementById("toTop").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const type = form.type.value;
      const message = form.message.value.trim();
      const subject = encodeURIComponent(`Project inquiry — ${type}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`);
      window.location.href = `mailto:technecal23@gmail.com?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email client…";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildMarquee();
    buildTimeline();
    buildWork();
    buildVideos();
    buildSkills();
    initNav();
    initBackToTop();
    initContactForm();
    initReveal();
  });
})();
