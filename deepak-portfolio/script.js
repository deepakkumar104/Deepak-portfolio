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

  function initials(name) {
    return String(name || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); })
      .join("");
  }

  function hideSection(id) {
    var node = document.getElementById(id);
    if (node) node.hidden = true;
    var link = document.querySelector('.nav-menu a[href="#' + id + '"]');
    if (link && link.parentElement) link.parentElement.hidden = true;
  }

  function tagsHTML(list) {
    if (!list || !list.length) return "";
    return '<ul class="tag-list">' + list.map(function (t) {
      return '<li class="tag">' + esc(t) + "</li>";
    }).join("") + "</ul>";
  }

  /* ---------- 1. Navbar + hero ---------- */

  var p = d.profile || {};

  document.title = (p.name || "Portfolio") + " | " + (p.title || "");
  setText("navLogoName", p.shortName || p.name || "Portfolio");
  setText("navLogoMark", initials(p.name));

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
            "<h3>" + esc(s.category) + "</h3>" +
            (s.note ? '<p class="skill-note">' + esc(s.note) + "</p>" : "") +
            tagsHTML(s.items) +
          "</article>"
        );
      }).join("");
    }
  }

  /* ---------- 4. Projects ---------- */

  var projectsGrid = el("projectsGrid");
  if (projectsGrid) {
    if (!d.projects || !d.projects.length) {
      hideSection("projects");
    } else {
      projectsGrid.innerHTML = d.projects.map(function (pr) {
        var buttons = "";
        if (pr.github) {
          buttons += '<a class="btn btn-outline btn-sm" href="' + esc(pr.github) +
            '" target="_blank" rel="noopener">GitHub code</a>';
        }
        if (pr.demo) {
          buttons += '<a class="btn btn-primary btn-sm" href="' + esc(pr.demo) +
            '" target="_blank" rel="noopener">Live demo</a>';
        }

        var features = "";
        if (pr.features && pr.features.length) {
          features =
            '<p class="project-sub">Key features</p><ul class="feature-list">' +
            pr.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") +
            "</ul>";
        }

        var tech = "";
        if (pr.tech && pr.tech.length) {
          tech = '<div class="project-tags">' +
            '<p class="project-sub">Built with</p>' + tagsHTML(pr.tech) + "</div>";
        }

        return (
          '<article class="project-card reveal">' +
            '<img src="' + esc(pr.image || "images/project1.jpg") + '" alt="' +
              esc(pr.title) + '" loading="lazy" />' +
            '<div class="project-body">' +
              "<h3>" + esc(pr.title) + "</h3>" +
              '<p class="project-desc">' + esc(pr.description) + "</p>" +
              features + tech +
              (buttons ? '<div class="project-actions">' + buttons + "</div>" : "") +
            "</div>" +
          "</article>"
        );
      }).join("");
    }
  }

  /* ---------- 5. Training ---------- */

  var trainingList = el("trainingList");
  if (trainingList) {
    if (!d.training || !d.training.length) {
      hideSection("training");
    } else {
      trainingList.innerHTML = d.training.map(function (t) {
        var meta = [t.organization, t.location].filter(Boolean).join(" · ");
        var points = "";
        if (t.points && t.points.length) {
          points = "<ul>" + t.points.map(function (x) {
            return "<li>" + esc(x) + "</li>";
          }).join("") + "</ul>";
        }
        return (
          '<article class="timeline-item reveal">' +
            '<div class="timeline-head">' +
              "<h3>" + esc(t.program) + "</h3>" +
              (t.duration ? '<span class="timeline-when">' + esc(t.duration) + "</span>" : "") +
            "</div>" +
            (meta ? '<p class="timeline-org">' + esc(meta) + "</p>" : "") +
            points +
          "</article>"
        );
      }).join("");
    }
  }

  /* ---------- 6. Certificates ---------- */

  var certGrid = el("certGrid");
  if (certGrid) {
    if (!d.certificates || !d.certificates.length) {
      hideSection("certificates");
    } else {
      certGrid.innerHTML = d.certificates.map(function (c) {
        var meta = [c.organization, c.date].filter(Boolean).join(" · ");
        return (
          '<article class="cert-card reveal">' +
            '<img src="' + esc(c.image || "") + '" alt="' + esc(c.name) + '" loading="lazy" />' +
            '<div class="cert-body">' +
              "<h3>" + esc(c.name) + "</h3>" +
              (meta ? '<p class="cert-meta">' + esc(meta) + "</p>" : "") +
              (c.link
                ? '<a class="btn btn-outline btn-sm" href="' + esc(c.link) +
                  '" target="_blank" rel="noopener">View certificate</a>'
                : "") +
            "</div>" +
          "</article>"
        );
      }).join("");
    }
  }

  /* ---------- 7. Education + achievements ---------- */

  var edu = d.education || {};
  var eduBlock = el("educationBlock");
  if (eduBlock) {
    var earlier = "";
    if (edu.earlier && edu.earlier.length) {
      earlier = '<div class="edu-earlier">' + edu.earlier.map(function (e) {
        var meta = [e.board, e.year].filter(Boolean).join(" · ");
        return (
          '<div class="edu-card reveal">' +
            "<h4>" + esc(e.level) + "</h4>" +
            (meta ? "<p>" + esc(meta) + "</p>" : "") +
            (e.score ? '<p class="edu-score">' + esc(e.score) + "</p>" : "") +
          "</div>"
        );
      }).join("") + "</div>";
    }

    eduBlock.innerHTML =
      '<div class="edu-main reveal">' +
        (edu.collegeLogo
          ? '<img src="' + esc(edu.collegeLogo) + '" alt="' + esc(edu.institute) + ' logo" />'
          : "") +
        "<div>" +
          "<h3>" + esc(edu.degree) + "</h3>" +
          "<p>" + esc(edu.institute) + (edu.years ? " · " + esc(edu.years) : "") + "</p>" +
        "</div>" +
        (edu.score
          ? '<div class="score-box"><span class="score-value">' + esc(edu.score) +
            '</span><span class="score-label">' + esc(edu.scoreLabel || "Score") + "</span></div>"
          : "") +
      "</div>" + earlier;
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

  /* ---------- 9. Contact ---------- */

  var c = d.contact || {};
  setText("contactNote", c.note);

  var contactRows = [
    { label: "Email",    value: c.email,    href: c.email ? "mailto:" + c.email : "" },
    { label: "Phone",    value: c.phone,    href: c.phone ? "tel:" + String(c.phone).replace(/\s+/g, "") : "" },
    { label: "LinkedIn", value: c.linkedin, href: c.linkedin },
    { label: "GitHub",   value: c.github,   href: c.github },
    { label: "Location", value: c.location, href: "" }
  ];

  var contactList = el("contactList");
  if (contactList) {
    contactList.innerHTML = contactRows.filter(function (row) { return row.value; })
      .map(function (row) {
        var value = row.href
          ? '<a class="contact-value" href="' + esc(row.href) + '"' +
            (/^https?:/.test(row.href) ? ' target="_blank" rel="noopener"' : "") +
            ">" + esc(row.value) + "</a>"
          : '<span class="contact-value">' + esc(row.value) + "</span>";
        return '<li><span class="contact-label">' + esc(row.label) + "</span>" + value + "</li>";
      }).join("");
  }

  // Frontend-only form: it opens the visitor's own email app. No server, no database.
  var form = el("contactForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = el("formStatus");
      var name = el("cfName").value.trim();
      var email = el("cfEmail").value.trim();
      var message = el("cfMessage").value.trim();

      if (!name || !email || !message) {
        status.textContent = "Fill in your name, email and message first.";
        status.className = "form-status error";
        return;
      }

      var subject = "Portfolio enquiry from " + name;
      var body = message + "\n\n—\n" + name + "\n" + email;
      status.textContent = "Opening your email app…";
      status.className = "form-status";
      window.location.href =
        "mailto:" + (c.email || "") +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- 10. Footer ---------- */

  var f = d.footer || {};
  setText("footerName", "© " + (f.year || new Date().getFullYear()) + " " + (p.name || ""));
  setText("footerLine", f.line);

  var footerLinks = el("footerLinks");
  if (footerLinks) {
    footerLinks.innerHTML = [
      { label: "LinkedIn", href: c.linkedin },
      { label: "GitHub", href: c.github },
      { label: "Email", href: c.email ? "mailto:" + c.email : "" }
    ].filter(function (x) { return x.href; })
     .map(function (x) {
        return '<li><a href="' + esc(x.href) + '" target="_blank" rel="noopener">' +
          esc(x.label) + "</a></li>";
      }).join("");
  }

  /* ---------- 11. Navigation behaviour ---------- */

  var toggle = el("navToggle");
  var menu = el("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  var header = el("siteHeader");
  var toTop = el("toTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the section currently on screen.
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-menu a"));

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });

    // Gentle fade-in for cards as they scroll into view.
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
})();
