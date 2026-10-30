(() => {
  "use strict";

  function init() {
    const menuToggle = document.querySelector(".menu-toggle");
    const primaryNav = document.querySelector(".primary-nav");

    if (menuToggle && primaryNav) {
      const navLinks = primaryNav.querySelectorAll("a");

      function closeMenu() {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "메뉴 열기");

        primaryNav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      }

      menuToggle.addEventListener("click", () => {
        const isOpening = menuToggle.getAttribute("aria-expanded") !== "true";

        menuToggle.setAttribute("aria-expanded", String(isOpening));

        menuToggle.setAttribute(
          "aria-label",
          isOpening ? "메뉴 닫기" : "메뉴 열기",
        );

        primaryNav.classList.toggle("is-open", isOpening);
        document.body.classList.toggle("menu-open", isOpening);
      });

      navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
          closeMenu();
        }
      });
    }

    const currentYear = document.querySelector("#current-year");

    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const supportsObserver = "IntersectionObserver" in window;

    function setupScrollReveal({
      root,
      selectors,
      itemClass = "k1-scroll-reveal",
      readyClass = "k1-reveal-ready",
      visibleClass = "k1-reveal-visible",
      threshold = 0.08,
      rootMargin = "0px 0px -5% 0px",
      delayProperty = null,
      observeItems = false,
      itemVisibleClass = null,
    }) {
      if (!root) return;

      const items = selectors.flatMap((selector) =>
        Array.from(root.querySelectorAll(selector)),
      );

      if (!items.length) return;

      items.forEach((item, index) => {
        item.classList.add(itemClass);

        if (delayProperty) {
          const delay = Math.min(index * 0.07, 0.45);

          item.style.setProperty(delayProperty, `${delay}s`);
        }
      });

      root.classList.add(readyClass);

      if (prefersReducedMotion || !supportsObserver) {
        if (observeItems && itemVisibleClass) {
          items.forEach((item) => {
            item.classList.add(itemVisibleClass);
          });
        } else {
          root.classList.add(visibleClass);
        }

        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            if (observeItems && itemVisibleClass) {
              entry.target.classList.add(itemVisibleClass);
              observer.unobserve(entry.target);
            } else {
              root.classList.add(visibleClass);
              observer.unobserve(root);
            }
          });
        },
        {
          threshold,
          rootMargin,
        },
      );

      if (observeItems && itemVisibleClass) {
        items.forEach((item) => observer.observe(item));
      } else {
        observer.observe(root);
      }
    }

    setupScrollReveal({
      root: document.querySelector("#why-k1"),

      selectors: [
        ".section-heading .eyebrow",
        ".section-heading h2",
        ".heading-note",
        ".why-card",
        ".fine-print",
      ],

      itemClass: "why-reveal-item",
      readyClass: "why-reveal-ready",
      visibleClass: "why-reveal-visible",

      observeItems: true,
      itemVisibleClass: "why-item-visible",

      threshold: 0.2,
      rootMargin: "0px 0px -20% 0px",
    });

    const revealConfigs = [
      {
        root: document.querySelector("#services"),

        selectors: [
          ".section-heading > .eyebrow",
          ".section-heading-row > h2",
          ".section-heading-row > .heading-note",
          ".service-grid > .service-card",
        ],

        observeItems: true,
        itemVisibleClass: "k1-item-visible",
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

    revealConfigs.forEach((config) => {
      setupScrollReveal({
        ...config,

        itemClass: "k1-scroll-reveal",
        readyClass: "k1-reveal-ready",
        visibleClass: "k1-reveal-visible",

        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px",

        delayProperty: "--k1-reveal-delay",
      });
    });

    const mobileCta = document.querySelector(".mobile-bottom-cta");

    if (mobileCta) {
      function updateCtaWidth() {
        const viewportWidth = document.documentElement.clientWidth;

        if (!viewportWidth) return;

        mobileCta.style.setProperty("position", "fixed", "important");

        mobileCta.style.setProperty("left", "0px", "important");

        mobileCta.style.setProperty("right", "auto", "important");

        mobileCta.style.setProperty("width", `${viewportWidth}px`, "important");

        mobileCta.style.setProperty(
          "max-width",
          `${viewportWidth}px`,
          "important",
        );

        mobileCta.style.setProperty("min-width", "0", "important");

        mobileCta.style.setProperty("box-sizing", "border-box", "important");
      }

      updateCtaWidth();

      window.addEventListener("resize", updateCtaWidth);

      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", updateCtaWidth);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true,
    });
  } else {
    init();
  }
})();
