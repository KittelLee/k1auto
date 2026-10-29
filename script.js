(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const navLinks = document.querySelectorAll(".primary-nav a");

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const opening = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(opening));
      menuToggle.setAttribute(
        "aria-label",
        opening ? "메뉴 닫기" : "메뉴 열기",
      );
      primaryNav.classList.toggle("is-open", opening);
      document.body.classList.toggle("menu-open", opening);
    });
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

(function () {
  function initWhyReveal() {
    const section = document.querySelector("#why-k1");

    if (!section) return;

    const items = [
      section.querySelector(".section-heading .eyebrow"),
      section.querySelector(".section-heading h2"),
      section.querySelector(".heading-note"),
      ...section.querySelectorAll(".why-card"),
      section.querySelector(".fine-print"),
    ].filter(Boolean);

    items.forEach((item) => {
      item.classList.add("why-reveal-item");
    });

    section.classList.add("why-reveal-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("why-reveal-visible");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      section.classList.add("why-reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("why-reveal-visible");
            observer.unobserve(section);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(section);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhyReveal, {
      once: true,
    });
  } else {
    initWhyReveal();
  }
})();

(function () {
  function initK1ScrollReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const configs = [
      {
        root: document.querySelector("#services"),
        selectors: [
          ".section-heading > .eyebrow",
          ".section-heading-row > h2",
          ".section-heading-row > .heading-note",
          ".service-grid > .service-card",
        ],
      },
      {
        root: document.querySelector("#about"),
        selectors: [
          ".about-heading > .eyebrow",
          ".about-heading > h2",
          ".about-mark",
          ".about-copy > .about-lead",
          ".about-copy > p:not(.about-lead)",
          ".about-divider",
          ".about-subgrid > div",
        ],
      },
      {
        root: document.querySelector("#car-life"),
        selectors: [
          ".vision-copy > .eyebrow",
          ".vision-copy > h2",
          ".vision-copy > p:not(.eyebrow)",
          ".vision-status",
          ".vision-copy > .button",
          ".vision-visual",
        ],
      },
      {
        root: document.querySelector("#contact"),
        selectors: [
          ".contact-copy > .eyebrow",
          ".contact-copy > h2",
          ".contact-copy > p:not(.eyebrow)",
          ".contact-copy > .button",
          ".contact-card-head",
          ".contact-card > .contact-line",
          ".contact-card > .contact-kakao",
        ],
      },
      {
        root: document.querySelector(".community-strip"),
        selectors: [
          ".community-symbol",
          ".community-inner > p",
          ".community-caption",
        ],
      },
    ];

    if (!("IntersectionObserver" in window)) {
      return;
    }

    configs.forEach(({ root, selectors }) => {
      if (!root) return;

      const items = selectors.flatMap((selector) =>
        Array.from(root.querySelectorAll(selector)),
      );

      if (!items.length) return;

      items.forEach((item, index) => {
        item.classList.add("k1-scroll-reveal");

        const delay = Math.min(index * 0.12, 1.1);
        item.style.setProperty("--k1-reveal-delay", `${delay}s`);
      });

      root.classList.add("k1-reveal-ready");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              root.classList.add("k1-reveal-visible");
              observer.unobserve(root);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -5% 0px",
        },
      );

      observer.observe(root);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initK1ScrollReveal, {
      once: true,
    });
  } else {
    initK1ScrollReveal();
  }
})();
