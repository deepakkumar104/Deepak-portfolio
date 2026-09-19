/* ============================================================
   script.js — builds the page from data.js
   You do NOT need to edit this file.
   ============================================================ */

(function () {
  "use strict";

  // If data.js is missing or has an error, show a clear message instead of a blank page.
  if (typeof portfolioData === "undefined") {
    document.body.innerHTML =
      '<p style="padding:40px;font-family:sans-serif;color:#fff;background:#060B1A">' +
      "Could not load <strong>data.js</strong>. Check that the file is in the same folder as index.html " +
      "and that no comma, quote or bracket is missing.</p>";
    return;
  }

  var d = portfolioData;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- small helpers ---------- */

  // Escapes text so stray characters can never break the page.
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(id) { return document.getElementById(id); }

  function setText(id, value) {
    var node = el(id);
    if (node) node.textContent = value || "";
  }

  function hideSection(id) {
    var node = document.getElementById(id);
    if (node) node.hidden = true;
    var link = document.querySelector('.bottom-nav a[data-nav="' + id + '"]');
    if (link) link.hidden = true;
  }

  function tagsHTML(list) {
    if (!list || !list.length) return "";
    return '<ul class="tag-list">' + list.map(function (t) {
      return '<li class="tag">' + esc(t) + "</li>";
    }).join("") + "</ul>";
  }

  function listHTML(list) {
    if (!list || !list.length) return "";
    return "<ul>" + list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }

  /* ---------- 1. Hero ---------- */

  var p = d.profile || {};

  document.title = (p.name || "Portfolio") + " | " + (p.title || "");
  setText("heroName", p.name);
  setText("heroTitle", p.title);
  setText("heroTagline", p.tagline);
  setText("heroIntro", p.intro);

  if (p.available) {
    var badge = el("heroBadge");
    badge.textContent = p.available;
    badge.hidden = false;
  }

  var photo = el("heroPhoto");
  if (photo) {
    photo.src = p.photo || "images/profile.jpg";
    photo.alt = p.photoAlt || (p.name ? "Photo of " + p.name : "Profile photo");
  }

  /* ---------- 2. About ---------- */

  var a = d.about || {};
  if (a.heading) setText("aboutHeading", a.heading);

  var aboutText = el("aboutText");
  if (aboutText && a.paragraphs) {
    aboutText.innerHTML = a.paragraphs.map(function (para) {
      return "<p>" + esc(para) + "</p>";
    }).join("");
  }

  var facts = el("aboutFacts");
  if (facts && a.highlights) {
    facts.innerHTML = a.highlights.map(function (f) {
      return "<dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd>";
    }).join("");
  }

  /* ---------- 3. Skills ---------- */

  var skillsGrid = el("skillsGrid");
  if (skillsGrid) {
    if (!d.skills || !d.skills.length) {
      hideSection("skills");
    } else {
      skillsGrid.innerHTML = d.skills.map(function (s) {
        return (
          '<article class="skill-card reveal">' +
            (s.icon ? '<span class="skill-icon">' + esc(s.icon) + "</span>" : "") +
            "<h3>" + esc(s.category) + "</h3>" +
            (s.note ? '<p class="skill-note">' + esc(s.note) + "</p>" : "") +
            tagsHTML(s.items) +
          "</article>"
        );
      }).join("");
    }
  }

  /* ---------- 4 & 5. Projects and Training — mini cards in a slider + a popup ---------- */

  function projectModalHTML(pr) {
    var buttons = "";
    if (pr.github) {
      buttons += '<a class="btn btn-outline btn-sm" href="' + esc(pr.github) +
        '" target="_blank" rel="noopener">GitHub code</a>';
    }
    if (pr.demo) {
      buttons += '<a class="btn btn-primary btn-sm" href="' + esc(pr.demo) +
        '" target="_blank" rel="noopener">Live demo</a>';
    }
    return (
      (pr.image ? '<img src="' + esc(pr.image) + '" alt="' + esc(pr.title) + '" />' : "") +
      "<h3>" + esc(pr.title) + "</h3>" +
      (pr.description ? "<p>" + esc(pr.description) + "</p>" : "") +
      (pr.objective ? "<h4>Objective</h4><p>" + esc(pr.objective) + "</p>" : "") +
      (pr.features && pr.features.length ? "<h4>Key features</h4>" + listHTML(pr.features) : "") +
      (pr.components && pr.components.length ? "<h4>Components</h4>" + listHTML(pr.components) : "") +
      (pr.tech && pr.tech.length ? "<h4>Technologies used</h4>" + tagsHTML(pr.tech) : "") +
      (pr.working ? "<h4>Working</h4><p>" + esc(pr.working) + "</p>" : "") +
      (pr.contribution ? "<h4>My contribution</h4><p>" + esc(pr.contribution) + "</p>" : "") +
      (buttons ? '<div class="modal-actions">' + buttons + "</div>" : "")
    );
  }

  function trainingModalHTML(t) {
    var meta = [t.organization, t.duration].filter(Boolean).join(" · ");
    var buttons = "";
    if (t.certificate) {
      buttons += '<button type="button" class="btn btn-outline btn-sm js-open-lightbox" data-src="' +
        esc(t.certificate) + '" data-alt="' + esc(t.program) + ' certificate">View certificate</button>';
    }
    return (
      "<h3>" + esc(t.program) + "</h3>" +
      (meta ? '<p class="modal-meta">' + esc(meta) + "</p>" : "") +
      (t.location ? "<p>" + esc(t.location) + "</p>" : "") +
      (t.work ? "<h4>Work performed</h4><p>" + esc(t.work) + "</p>" : "") +
      (t.skillsLearned && t.skillsLearned.length ? "<h4>Skills learned</h4>" + tagsHTML(t.skillsLearned) : "") +
      (t.projectDetails ? "<h4>Project details</h4><p>" + esc(t.projectDetails) + "</p>" : "") +
      (t.technologies && t.technologies.length ? "<h4>Technologies</h4>" + tagsHTML(t.technologies) : "") +
      (buttons ? '<div class="modal-actions">' + buttons + "</div>" : "")
    );
  }

  function miniCardHTML(icon, title, index) {
    return (
      '<button type="button" class="mini-card" data-index="' + index + '">' +
        '<span class="mini-icon">' + esc(icon || "•") + "</span>" +
        "<h3>" + esc(title) + "</h3>" +
      "</button>"
    );
  }

  function setupSlider(trackId, arrowSelector, items, titleKey, htmlBuilder) {
    var track = el(trackId);
    if (!track) return;
    if (!items || !items.length) return;

    // Duplicate the list once so the auto-scroll can loop seamlessly.
    var doubled = items.concat(items);
    track.innerHTML = doubled.map(function (item, i) {
      return miniCardHTML(item.icon, item[titleKey], i % items.length);
    }).join("");

    track.addEventListener("click", function (event) {
      var card = event.target.closest(".mini-card");
      if (!card) return;
      openModal(htmlBuilder(items[Number(card.dataset.index)]));
    });

    var setWidth = 0;
    function measure() {
      var cards = track.children;
      if (cards.length < items.length + 1) return;
      var first = cards[0];
      var afterSet = cards[items.length];
      setWidth = afterSet.offsetLeft - first.offsetLeft;
    }

    var paused = false;
    var resumeTimer = null;
    function pauseThenResume(delay) {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () { paused = false; }, delay || 2200);
    }

    track.addEventListener("mouseenter", function () { paused = true; });
    track.addEventListener("mouseleave", function () { paused = false; });
    track.addEventListener("touchstart", function () { paused = true; }, { passive: true });
    track.addEventListener("touchend", function () { pauseThenResume(2600); }, { passive: true });
    track.addEventListener("wheel", function () { pauseThenResume(2200); }, { passive: true });

    document.querySelectorAll(arrowSelector).forEach(function (btn) {
      btn.addEventListener("click", function () {
        pauseThenResume(2800);
        var dir = Number(btn.dataset.dir);
        track.scrollBy({ left: dir * 220, behavior: "smooth" });
      });
    });

    requestAnimationFrame(function () {
      measure();
      window.addEventListener("resize", measure);
    });

    if (!reduceMotion) {
      var lastT = null;
      function tick(t) {
        if (lastT == null) lastT = t;
        var dt = t - lastT;
        lastT = t;
        if (!paused && setWidth > 0) {
          track.scrollLeft += dt * 0.03;
          if (track.scrollLeft >= setWidth) track.scrollLeft -= setWidth;
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }

  if (!d.projects || !d.projects.length) {
    hideSection("projects");
  } else {
    setupSlider("projectsTrack", '[data-slider="projects"]', d.projects, "title", projectModalHTML);
  }

  if (!d.training || !d.training.length) {
    hideSection("training");
  } else {
    setupSlider("trainingTrack", '[data-slider="training"]', d.training, "program", trainingModalHTML);
  }

  /* ---------- 6. Certificates ---------- */

  var certGrid = el("certGrid");
  if (certGrid) {
    if (!d.certificates || !d.certificates.length) {
      hideSection("certificates");
    } else {
      certGrid.innerHTML = d.certificates.map(function (c, i) {
        var meta = [c.organization, c.date].filter(Boolean).join(" · ");
        return (
          '<button type="button" class="cert-card reveal" data-index="' + i + '">' +
            '<img src="' + esc(c.image || "") + '" alt="' + esc(c.name) + '" loading="lazy" />' +
            '<div class="cert-body">' +
              "<h3>" + esc(c.name) + "</h3>" +
              (meta ? '<p class="cert-meta">' + esc(meta) + "</p>" : "") +
              '<span class="btn btn-outline btn-sm">View certificate</span>' +
            "</div>" +
          "</button>"
        );
      }).join("");

      certGrid.addEventListener("click", function (event) {
        var card = event.target.closest(".cert-card");
        if (!card) return;
        var c = d.certificates[Number(card.dataset.index)];
        openLightbox(c.link || c.image, c.name);
      });
    }
  }

  /* ---------- 7. Education + achievements ---------- */

  var edu = d.education || {};
  var eduBlock = el("educationBlock");
  if (eduBlock) {
    var mainMeta = [edu.institute, edu.years].filter(Boolean).join(" · ");
    var mainCard =
      '<div class="edu-card reveal">' +
        '<div class="edu-card-head">' +
          "<h3>" + esc(edu.degree) + "</h3>" +
          (edu.status ? '<span class="edu-when">' + esc(edu.status) + "</span>" : "") +
        "</div>" +
        (mainMeta ? "<p>" + esc(mainMeta) + "</p>" : "") +
        (edu.score
          ? '<div class="score-box"><span class="score-value">' + esc(edu.score) +
            '</span><span class="score-label">' + esc(edu.scoreLabel || "Score") + "</span></div>"
          : "") +
      "</div>";

    var earlierCards = "";
    if (edu.earlier && edu.earlier.length) {
      earlierCards = edu.earlier.map(function (e) {
        var meta = [e.board, e.year].filter(Boolean).join(" · ");
        return (
          '<div class="edu-card reveal">' +
            '<div class="edu-card-head">' +
              "<h3>" + esc(e.level) + "</h3>" +
              (e.score ? '<span class="edu-when">' + esc(e.score) + "</span>" : "") +
            "</div>" +
            (meta ? "<p>" + esc(meta) + "</p>" : "") +
          "</div>"
        );
      }).join("");
    }

    eduBlock.innerHTML = mainCard + earlierCards;
  }

  if (d.achievements && d.achievements.length) {
    var achBlock = el("achievementsBlock");
    el("achievementsList").innerHTML = d.achievements.map(function (x) {
      return "<li>" + esc(x) + "</li>";
    }).join("");
    achBlock.hidden = false;
  }

  /* ---------- 8. Resume ---------- */

  var r = d.resume || {};
  var resumeFile = r.file || "resume.pdf";
  setText("resumeDesc", r.description);
  setText("resumeUpdated", r.updated);
  ["heroResumeBtn", "resumeDownload", "resumeView"].forEach(function (id) {
    var node = el(id);
    if (node) node.setAttribute("href", resumeFile);
  });

  /* ---------- 9. Contact icons (hero + contact section) ---------- */

  var c = d.contact || {};

  var ICONS = {
    email: '<svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4.5c0-1.4 1-2.5 2.3-2.5 1.2 0 2.2 1 2.2 2.5V17"/></svg>',
    github: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>',
    location: '<svg viewBox="0 0 24 24"><path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>'
  };

  function buildContactIcons(containerId) {
    var host = el(containerId);
    if (!host) return;

    var rows = [];
    if (c.email) rows.push({ key: "email", label: "Email", value: c.email, action: "popover" });
    if (c.phone) rows.push({ key: "phone", label: "Phone", value: c.phone, action: "popover" });
    if (c.linkedin) rows.push({ key: "linkedin", label: "LinkedIn", value: c.linkedin, action: "link" });
    if (c.github) rows.push({ key: "github", label: "GitHub", value: c.github, action: "link" });
    if (c.location) rows.push({ key: "location", label: "Location", value: c.location, action: "popover" });

    host.innerHTML = rows.map(function (row, i) {
      var icon = ICONS[row.key] || "";
      if (row.action === "link") {
        return (
          "<li>" +
            '<a class="icon-btn" href="' + esc(row.value) + '" target="_blank" rel="noopener" aria-label="' +
            esc(row.label) + '">' + icon + "</a>" +
          "</li>"
        );
      }
      var popId = containerId + "-pop-" + i;
      var actionHTML = "";
      if (row.key === "email") {
        actionHTML = '<a class="btn btn-primary btn-sm" href="mailto:' + esc(row.value) + '">Send email</a>';
      } else if (row.key === "phone") {
        actionHTML = '<a class="btn btn-primary btn-sm" href="tel:' + esc(row.value.replace(/\s+/g, "")) + '">Call</a>';
      } else if (row.key === "location") {
        actionHTML = '<a class="btn btn-primary btn-sm" href="https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent(row.value) + '" target="_blank" rel="noopener">Open in Maps</a>';
      }
      return (
        "<li>" +
          '<button type="button" class="icon-btn js-contact-toggle" data-pop="' + popId + '" aria-label="' +
          esc(row.label) + '" aria-expanded="false">' + icon + "</button>" +
          '<div class="icon-popover" id="' + popId + '">' +
            '<span class="icon-popover-label">' + esc(row.label) + "</span>" +
            '<span class="icon-popover-value">' + esc(row.value) + "</span>" +
            actionHTML +
          "</div>" +
        "</li>"
      );
    }).join("");
  }

  buildContactIcons("heroContactIcons");
  buildContactIcons("contactIcons");
  setText("contactNote", c.note);

  document.addEventListener("click", function (event) {
    var toggle = event.target.closest(".js-contact-toggle");
    document.querySelectorAll(".icon-popover.open").forEach(function (pop) {
      if (!toggle || pop.id !== toggle.dataset.pop) {
        pop.classList.remove("open");
        var btn = document.querySelector('[data-pop="' + pop.id + '"]');
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
    if (toggle) {
      var pop = el(toggle.dataset.pop);
      if (pop) {
        var nowOpen = pop.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(nowOpen));
      }
    }
  });

  /* ---------- 10. Footer ---------- */

  var f = d.footer || {};
  setText("footerName", "© " + (f.year || new Date().getFullYear()) + " " + (p.name || ""));
  setText("footerLine", f.line);

  /* ---------- 11. Modal (projects & training) ---------- */

  var modalOverlay = el("modalOverlay");
  var modalContent = el("modalContent");

  function openModal(html) {
    modalContent.innerHTML = html;
    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modalOverlay.hidden = true;
    modalContent.innerHTML = "";
    document.body.style.overflow = "";
  }
  el("modalClose").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) closeModal();
  });
  modalContent.addEventListener("click", function (event) {
    var btn = event.target.closest(".js-open-lightbox");
    if (btn) openLightbox(btn.dataset.src, btn.dataset.alt);
  });

  /* ---------- 12. Lightbox (certificates) ---------- */

  var lightboxOverlay = el("lightboxOverlay");
  var lightboxImg = el("lightboxImg");

  function openLightbox(src, alt) {
    if (!src) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Certificate";
    lightboxOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightboxOverlay.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = modalOverlay.hidden ? "" : "hidden";
  }
  el("lightboxClose").addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", function (event) {
    if (event.target === lightboxOverlay) closeLightbox();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (!lightboxOverlay.hidden) closeLightbox();
    else if (!modalOverlay.hidden) closeModal();
  });

  /* ---------- 13. Bottom nav: active section + reveal on scroll ---------- */

  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".bottom-nav a"));

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (node) {
      revealObserver.observe(node);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("visible");
    });
  }

  /* ---------- 14. Animated PCB / circuit-board background ----------
     A faint, low-opacity electrical-circuit pattern (right-angle traces,
     solder pads, a few IC-style chip outlines) with small glowing pulses
     that crawl slowly along the traces, like current flowing through a
     board. The static trace layer is drawn once onto an offscreen canvas
     and just re-stamped onto the visible canvas every frame — only the
     pulses are recomputed — so it stays cheap even on longer pages. */

  (function backgroundAnimation() {
    var canvas = el("bgCanvas");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");

    var staticCanvas = document.createElement("canvas");
    var staticCtx = staticCanvas.getContext("2d");

    var W = 0, H = 0, DPR = 1;
    var paths = [];   // circuit traces, each a list of {x,y} grid points
    var pulses = [];  // small glowing dots travelling along a path

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width = staticCanvas.width = Math.floor(W * DPR);
      canvas.height = staticCanvas.height = Math.floor(H * DPR);
      canvas.style.width = staticCanvas.style.width = W + "px";
      canvas.style.height = staticCanvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      staticCtx.setTransform(DPR, 0, 0, DPR, 0, 0);

      buildPaths();
      drawStaticLayer();
      buildPulses();
    }

    // Build a handful of right-angle "traces" snapped to a loose grid,
    // each 3-6 segments long, so the pattern reads as a circuit board
    // rather than random scribbles.
    function buildPaths() {
      paths = [];
      var grid = W < 700 ? 90 : 110;
      var count = Math.max(6, Math.round((W * H) / (W < 700 ? 70000 : 95000)));

      for (var i = 0; i < count; i++) {
        var x = Math.round((Math.random() * W) / grid) * grid;
        var y = Math.round((Math.random() * H) / grid) * grid;
        var segs = 3 + Math.floor(Math.random() * 3);
        var pts = [{ x: x, y: y }];
        var horiz = Math.random() < 0.5;

        for (var s = 0; s < segs; s++) {
          var hop = grid * (1 + Math.floor(Math.random() * 2));
          if (horiz) x += Math.random() < 0.5 ? hop : -hop;
          else y += Math.random() < 0.5 ? hop : -hop;
          x = Math.max(0, Math.min(W, x));
          y = Math.max(0, Math.min(H, y));
          pts.push({ x: x, y: y });
          horiz = !horiz;
        }
        paths.push(pts);
      }
    }

    // Draws the faint traces + pads + a few chip-like rectangles once.
    function drawStaticLayer() {
      staticCtx.clearRect(0, 0, W, H);
      staticCtx.lineWidth = 1;
      staticCtx.strokeStyle = "rgba(232,169,74,0.09)";
      staticCtx.fillStyle = "rgba(232,169,74,0.16)";

      paths.forEach(function (pts) {
        staticCtx.beginPath();
        staticCtx.moveTo(pts[0].x, pts[0].y);
        for (var i = 1; i < pts.length; i++) staticCtx.lineTo(pts[i].x, pts[i].y);
        staticCtx.stroke();

        // solder pad at each bend + a small square "IC" at the trace end
        pts.forEach(function (pt, i) {
          staticCtx.beginPath();
          staticCtx.arc(pt.x, pt.y, i === 0 || i === pts.length - 1 ? 2.4 : 1.6, 0, Math.PI * 2);
          staticCtx.fill();
        });

        var last = pts[pts.length - 1];
        if (Math.random() < 0.35) {
          staticCtx.strokeRect(last.x - 9, last.y - 9, 18, 18);
        }
      });
    }

    function buildPulses() {
      pulses = [];
      var count = W < 700 ? Math.min(10, paths.length) : Math.min(22, paths.length);
      var used = {};
      for (var i = 0; i < count; i++) {
        var idx = Math.floor(Math.random() * paths.length);
        if (used[idx] || paths[idx].length < 2) continue;
        used[idx] = true;
        pulses.push({
          path: paths[idx],
          t: Math.random(),               // 0..1 progress along the path
          speed: 0.00016 + Math.random() * 0.00018 // very slow, smooth crawl
        });
      }
    }

    function pathLength(pts) {
      var total = 0;
      for (var i = 1; i < pts.length; i++) {
        total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      }
      return total;
    }

    function pointAt(pts, t) {
      var total = pathLength(pts);
      var target = total * t;
      var walked = 0;
      for (var i = 1; i < pts.length; i++) {
        var segLen = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        if (walked + segLen >= target) {
          var localT = segLen === 0 ? 0 : (target - walked) / segLen;
          return {
            x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * localT,
            y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * localT
          };
        }
        walked += segLen;
      }
      return pts[pts.length - 1];
    }

    function draw(dt) {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(staticCanvas, 0, 0, W, H);

      pulses.forEach(function (p) {
        if (!reduceMotion) {
          p.t += p.speed * dt;
          if (p.t > 1) p.t -= 1;
        }
        var pos = pointAt(p.path, p.t);
        ctx.beginPath();
        ctx.fillStyle = "rgba(76,255,160,0.75)";
        ctx.shadowColor = "rgba(76,255,160,0.9)";
        ctx.shadowBlur = 7;
        ctx.arc(pos.x, pos.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    var lastT = null;
    function loop(t) {
      if (lastT == null) lastT = t;
      var dt = t - lastT;
      lastT = t;
      draw(dt);
      if (!reduceMotion) requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    resize();
    if (reduceMotion) {
      draw(0);
    } else {
      requestAnimationFrame(loop);
      window.addEventListener("scroll", function () {
        canvas.style.transform = "translateY(" + (window.scrollY * 0.025) + "px)";
      }, { passive: true });
    }
  })();
})();
