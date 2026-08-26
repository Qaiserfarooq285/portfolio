/* ============================================================
   Qaiser Farooq — Portfolio
   Rendering + motion.

   Motion principles applied here:
   - IntersectionObserver for anything tied to position on the
     page; exactly one rAF-throttled scroll handler, touching two
     elements, for the hero parallax.
   - No getBoundingClientRect() inside a scroll loop (that forces
     synchronous layout on every frame).
   - Stagger is computed from DOM order at reveal time, so items
     that enter alone get no delay.
   - Every motion path checks prefers-reduced-motion.
   ============================================================ */

(function () {
  "use strict";

  var D = window.PORTFOLIO;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = function () { return motionQuery.matches; };

  var GH_ICON = '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4C17.6 5 18.6 5.3 18.6 5.3c.6 1.5.2 2.7.1 3 .8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>';

  /* ---------------- render ---------------- */

  $("ticker").innerHTML = D.ticker.concat(D.ticker)
    .map(function (t) {
      return '<span class="ticker-item">' + esc(t) + '<span class="ticker-dot"></span></span>';
    })
    .join("");

  $("stats").innerHTML = D.stats.map(function (s) {
    return '<div>' +
      '<div class="stat-value" data-count="' + s.value + '" data-decimals="' + s.decimals + '" data-suffix="' + esc(s.suffix) + '">0' + esc(s.suffix) + '</div>' +
      '<div class="stat-label">' + esc(s.label) + '</div>' +
    '</div>';
  }).join("");

  $("projects-grid").innerHTML = D.projects.map(function (p) {
    return '<article class="project-card" data-reveal>' +
      (p.video
        ? '<video class="card-video" src="' + encodeURI(p.video) + '" loop muted playsinline preload="metadata"></video>'
        : "") +
      '<div class="card-scrim"></div>' +
      '<div class="card-top">' +
        '<span class="card-num">' + esc(p.num) + '</span>' +
        '<span class="card-date">' + esc(p.dates) + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<h3 class="card-title">' + esc(p.title) + '</h3>' +
        '<div class="card-tags">' +
          p.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("") +
          (p.repo
            ? '<a class="code-btn" href="' + encodeURI(p.repo) + '" target="_blank" rel="noreferrer">' + GH_ICON + 'Code</a>'
            : "") +
        '</div>' +
      '</div>' +
    '</article>';
  }).join("");

  $("research-grid").innerHTML = D.research.map(function (r) {
    return '<article class="research-item" data-reveal>' +
      '<span class="research-num">' + esc(r.num) + '</span>' +
      '<h3>' + esc(r.title) + '</h3>' +
      '<p>' + esc(r.body) + '</p>' +
    '</article>';
  }).join("");

  $("proficiency").innerHTML = D.proficiency.map(function (s) {
    return '<div>' +
      '<div class="bar-head"><span>' + esc(s.label) + '</span><b>' + s.value + '%</b></div>' +
      '<div class="bar-track"><div class="bar-fill" data-bar="' + s.value + '"></div></div>' +
    '</div>';
  }).join("");

  $("experience").innerHTML = D.experience.map(function (e) {
    return '<div class="exp-item">' +
      '<div class="exp-head">' +
        '<h4>' + esc(e.role) + '</h4>' +
        '<span class="exp-dates">' + esc(e.dates) + '</span>' +
      '</div>' +
      '<div class="exp-org">' + esc(e.org) + '</div>' +
      '<p class="exp-body">' + esc(e.body) + '</p>' +
    '</div>';
  }).join("");

  $("skills").innerHTML = D.skills.map(function (s) {
    return '<span class="chip">' + esc(s) + '</span>';
  }).join("");

  $("education-grid").innerHTML = D.education.map(function (ed) {
    return '<article class="edu-card" data-reveal>' +
      '<div class="edu-top">' +
        '<span class="edu-status">' + esc(ed.status) + '</span>' +
        '<span class="edu-score">' + esc(ed.score) + '</span>' +
      '</div>' +
      '<h3>' + esc(ed.degree) + '</h3>' +
      '<div class="edu-field">' + esc(ed.field) + '</div>' +
      '<div class="edu-school">' + esc(ed.school) + '</div>' +
      '<div class="edu-meta">' + esc(ed.dates) + ' · ' + esc(ed.place) + '</div>' +
    '</article>';
  }).join("");

  /* ---------------- scroll reveal ----------------
     Stagger index is assigned from DOM order across everything
     that became visible in the same frame. An element entering on
     its own therefore gets index 0 and animates immediately —
     the previous build keyed the delay off the IntersectionObserver
     entries index, which is batch order, not page order. */

  var pending = [];
  var flushQueued = false;

  function flushReveals() {
    flushQueued = false;
    pending.sort(function (a, b) {
      var rel = a.compareDocumentPosition(b);
      return (rel & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });
    pending.forEach(function (el, i) {
      el.style.setProperty("--i", String(Math.min(i, 5)));
      el.classList.add("is-in");
    });
    pending = [];
  }

  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      revealIO.unobserve(en.target);
      pending.push(en.target);
    });
    if (pending.length && !flushQueued) {
      flushQueued = true;
      requestAnimationFrame(flushReveals);
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  document.querySelectorAll("[data-reveal]").forEach(function (el) {
    revealIO.observe(el);
  });

  /* Hero headline wipe. Driven by the same observer as everything
     else rather than a rAF pair: an IntersectionObserver callback is
     delivered after the browser has laid out and painted, so the
     "from" style is guaranteed committed and the transition actually
     ticks. Triggering it from rAF on first load produced a
     CSSTransition stuck at currentTime 0 — the element stayed at
     opacity 0 with the clip already open. */
  document.querySelectorAll("[data-hero-reveal]").forEach(function (el) {
    revealIO.observe(el);
  });

  /* safety net: if an observer never fires, show everything */
  setTimeout(function () {
    document.querySelectorAll("[data-reveal], [data-hero-reveal]").forEach(function (el) {
      el.classList.add("is-in");
    });
  }, 2500);

  /* ---------------- proficiency bars ----------------
     scaleX rather than width: width is a layout property and
     animating it reflows the row on every frame. */

  var barIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      barIO.unobserve(en.target);
      var el = en.target;
      var pct = parseFloat(el.getAttribute("data-bar")) || 0;
      var idx = Array.prototype.indexOf.call(el.closest(".bars").querySelectorAll("[data-bar]"), el);
      el.style.transitionDelay = reduced() ? "0ms" : (idx * 80) + "ms";
      el.style.transform = "scaleX(" + (pct / 100) + ")";
    });
  }, { threshold: 0.4 });

  document.querySelectorAll("[data-bar]").forEach(function (el) { barIO.observe(el); });

  /* ---------------- stat count-up ---------------- */

  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";

    if (reduced()) {
      el.textContent = target.toFixed(dec) + suffix;
      return;
    }

    /* paced to land with the intro clip rather than finishing well
       before the turn does */
    var dur = 2300;
    var start = performance.now();
    (function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  /* threshold 0 rather than 0.5: the hero stats are on screen from the
     start, but the clip loading reflows the row underneath them, and at
     0.5 the observer did not fire until that settled — leaving the
     digits sitting on zero for over two seconds before moving. */
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      countIO.unobserve(en.target);
      countUp(en.target);
    });
  }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });

  /* Counters already on screen start directly rather than waiting on the
     observer. IntersectionObserver callbacks are delivered during the
     rendering step, which a backgrounded or throttled tab runs rarely —
     measured here as an in-view element getting no callback at all for
     600ms+, which left the digits parked on zero through the intro.
     Anything below the fold still goes through the observer. */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var box = el.getBoundingClientRect();
    var onScreen = box.top < (window.innerHeight || 0) && box.bottom > 0;
    if (onScreen) countUp(el);
    else countIO.observe(el);
  });

  /* ---------------- project video ----------------
     Play only what is on screen. The previous build autoplayed all
     six at once with preload="auto", which decoded every video
     for the entire session. */

  var videoIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (en.isIntersecting) {
        var q = v.play();
        if (q && q.catch) q.catch(function () {});
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll("video.card-video").forEach(function (v) {
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.volume = 0;
    videoIO.observe(v);
  });

  /* ---------------- hero intro clip ----------------
     The clip ships as one MP4 with two stacked halves: colour on top,
     alpha matte below. Neither VP8 nor VP9 alpha survived encoding in
     this toolchain, so the halves are recombined here — read both, copy
     the matte into the colour data's alpha channel, paint the result.
     The subject is genuinely cut out, so there is no video rectangle
     and the page behind it can be anything.

     The matte itself is keyed on saturation rather than colour
     distance: the backdrop sits at S=210 while the suit is S=27 and
     skin S=96, so saturation separates them cleanly where an RGB key
     could not — that key ate either the face or the suit depending on
     how tight it was. Enclosed transparent islands are then filled,
     since a hole that does not reach the frame border can only be a
     gap punched in the subject (his eyes, mouth, and collar shadows).

     It plays once and holds its final frame: a loop would pull focus
     every few seconds, while one turn-to-camera reads as an intro and
     then gets out of the way. */

  (function heroIntro() {
    var wrap = document.querySelector("[data-hero-img]");
    if (!wrap) return;
    var canvas = wrap.querySelector(".hero-canvas");
    var clip = wrap.querySelector(".hero-clip");

    function fallBack() { wrap.classList.add("clip-failed"); }
    if (!canvas || !clip || !canvas.getContext) { fallBack(); return; }

    var ctx = canvas.getContext("2d");
    var scratch, sctx, w, h, running = false, done = false;

    function paint() {
      if (clip.readyState < 2) return;
      try {
        sctx.drawImage(clip, 0, 0);
        var colour = sctx.getImageData(0, 0, w, h);
        var alpha = sctx.getImageData(0, h, w, h);
        var cd = colour.data, ad = alpha.data;
        for (var i = 0; i < cd.length; i += 4) cd[i + 3] = ad[i];
        ctx.putImageData(colour, 0, 0);
      } catch (e) { fallBack(); }
    }

    function frame() {
      paint();
      if (running && !clip.ended) requestAnimationFrame(frame);
    }

    clip.addEventListener("error", fallBack);

    clip.addEventListener("loadeddata", function () {
      w = clip.videoWidth;
      h = clip.videoHeight / 2;
      if (!w || !h) { fallBack(); return; }
      canvas.width = w;
      canvas.height = h;
      scratch = document.createElement("canvas");
      scratch.width = w;
      scratch.height = clip.videoHeight;
      sctx = scratch.getContext("2d", { willReadFrequently: true });

      if (reduced()) {
        /* no turn under reduced motion — hold the closing pose */
        clip.currentTime = Math.max(clip.duration - 0.05, 0);
        clip.addEventListener("seeked", paint, { once: true });
        return;
      }

      running = true;
      var started = clip.play();
      if (started && started.catch) {
        started.catch(function () {
          running = false;
          clip.currentTime = Math.max(clip.duration - 0.05, 0);
          clip.addEventListener("seeked", paint, { once: true });
        });
      }
      requestAnimationFrame(frame);
    });

    /* browsers suspend video in throttled surfaces; resume until the
       turn has actually finished */
    clip.addEventListener("pause", function () {
      if (!done && !clip.ended && running) {
        var p = clip.play();
        if (p && p.catch) p.catch(function () {});
      }
    });

    clip.addEventListener("ended", function () {
      done = true;
      running = false;
      paint();               /* hold the final frame */
    });
  })();

  /* ---------------- nav ---------------- */

  var navEl = $("nav");
  var sentinel = $("nav-sentinel");

  if (navEl && sentinel) {
    new IntersectionObserver(function (entries) {
      navEl.classList.toggle("is-stuck", !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  /* active-section underline */
  var navMap = new Map();
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href.charAt(0) === "#") navMap.set(href.slice(1), a);
  });

  var sectionIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var link = navMap.get(en.target.id);
      if (!link) return;
      navMap.forEach(function (a) { a.classList.remove("is-active"); });
      link.classList.add("is-active");
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  navMap.forEach(function (_a, id) {
    var sec = document.getElementById(id);
    if (sec) sectionIO.observe(sec);
  });

  /* ---------------- hero parallax ----------------
     One rAF-throttled listener writing transforms to two elements.
     No layout reads, no per-frame querySelectorAll. */

  var heroImg = document.querySelector("[data-hero-img]");
  var heroCopy = document.querySelector("[data-hero-copy]");
  var ticking = false;
  var lastT = -1;
  /* The hero stacks below this width and grows taller, so a fade keyed
     to scrollY/viewport would wash the copy out while it is still being
     read. Parallax is a desktop-only flourish. */
  var wideQuery = window.matchMedia("(min-width: 1081px)");

  function applyParallax() {
    ticking = false;
    var vh = window.innerHeight || 1;
    var t = Math.min(window.scrollY / vh, 1);
    if (t === lastT) return;
    lastT = t;

    if (heroImg) {
      heroImg.style.transform =
        "translate3d(0," + (t * -30).toFixed(2) + "px,0) scale(" + (1 + t * 0.04).toFixed(4) + ")";
    }
    if (heroCopy) {
      heroCopy.style.opacity = String(Math.max(1 - t * 1.15, 0));
      heroCopy.style.transform = "translate3d(0," + (t * -46).toFixed(2) + "px,0)";
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(applyParallax);
  }

  function clearParallax() {
    if (heroImg) heroImg.style.transform = "";
    if (heroCopy) { heroCopy.style.opacity = ""; heroCopy.style.transform = ""; }
  }

  function syncParallax() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (reduced() || !wideQuery.matches) {
      clearParallax();
      return;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    lastT = -1;
    applyParallax();
  }

  syncParallax();

  /* respond live if the OS motion preference changes */
  [motionQuery, wideQuery].forEach(function (mq) {
    if (mq.addEventListener) mq.addEventListener("change", syncParallax);
    else if (mq.addListener) mq.addListener(syncParallax);
  });
})();
