(() => {
  function init() {
    /* ========================================
       1. 모바일 메뉴 열기 / 닫기
    ======================================== */

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

      navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 980) closeMenu();
      });
    }

    /* ========================================
       2. 푸터 연도 자동 표시
    ======================================== */

    const year = document.querySelector("#current-year");

    if (year) {
      year.textContent = String(new Date().getFullYear());
    }

    /* ========================================
       3. 스크롤 애니메이션 공통 설정
    ======================================== */

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const supportsObserver = "IntersectionObserver" in window;

    function setupScrollReveal({
      root,
      selectors,
      itemClass,
      readyClass,
      visibleClass,
      threshold = 0.1,
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

      // 모션 최소화 또는 미지원 브라우저에서는 즉시 표시
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
              // 개별 요소가 화면에 들어오면 해당 요소만 표시
              entry.target.classList.add(itemVisibleClass);
              observer.unobserve(entry.target);
            } else {
              // 기존 섹션 단위 등장 방식
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

      // 요소가 화면에 더 들어온 뒤 실행
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
  }

  /* ========================================
     6. 페이지 초기화는 한 번만 실행
  ======================================== */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true,
    });
  } else {
    init();
  }
})();

/* 모바일 하단 상담바 너비 보정 */
(() => {
  const cta = document.querySelector(".mobile-bottom-cta");

  if (!cta) return;

  const updateCtaWidth = () => {
    // 실제 문서의 가로 너비를 기준으로 계산
    const viewportWidth = document.documentElement.clientWidth;

    if (!viewportWidth) return;

    cta.style.setProperty("position", "fixed", "important");
    cta.style.setProperty("left", "0px", "important");
    cta.style.setProperty("right", "auto", "important");

    // 100% 대신 실제 너비를 px로 직접 지정
    cta.style.setProperty("width", `${viewportWidth}px`, "important");

    cta.style.setProperty("max-width", `${viewportWidth}px`, "important");

    cta.style.setProperty("min-width", "0", "important");
    cta.style.setProperty("box-sizing", "border-box", "important");
  };

  // 최초 실행
  updateCtaWidth();

  // 화면 크기 및 방향 변경 시 다시 계산
  window.addEventListener("resize", updateCtaWidth);

  // 모바일 뷰포트 변경에도 대응
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateCtaWidth);
  }
})();

/* 모바일 하단 상담바 너비 보정 */
(() => {
  const cta = document.querySelector(".mobile-bottom-cta");

  if (!cta) return;

  const updateCtaWidth = () => {
    const viewportWidth = document.documentElement.clientWidth;

    if (!viewportWidth) return;

    cta.style.setProperty("position", "fixed", "important");
    cta.style.setProperty("left", "0px", "important");
    cta.style.setProperty("right", "auto", "important");

    cta.style.setProperty("width", `${viewportWidth}px`, "important");

    cta.style.setProperty("max-width", `${viewportWidth}px`, "important");

    cta.style.setProperty("min-width", "0", "important");
    cta.style.setProperty("box-sizing", "border-box", "important");
  };

  updateCtaWidth();

  window.addEventListener("resize", updateCtaWidth);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateCtaWidth);
  }
})();
