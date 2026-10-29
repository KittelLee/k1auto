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

    // 순서대로 등장시킬 요소를 선택
    const items = [
      section.querySelector(".section-heading .eyebrow"),
      section.querySelector(".section-heading h2"),
      section.querySelector(".heading-note"),
      ...section.querySelectorAll(".why-card"),
      section.querySelector(".fine-print"),
    ].filter(Boolean);

    // 등장 효과를 적용할 요소에 클래스 추가
    items.forEach((item) => {
      item.classList.add("why-reveal-item");
    });

    section.classList.add("why-reveal-ready");

    // 애니메이션을 최소화하도록 설정한 경우에는 바로 표시
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("why-reveal-visible");
      return;
    }

    // IntersectionObserver 미지원 환경에서는 콘텐츠를 바로 표시
    if (!("IntersectionObserver" in window)) {
      section.classList.add("why-reveal-visible");
      return;
    }

    // 섹션이 화면에 들어오면 한 번만 실행
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

  // DOM 로딩 상태에 맞게 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhyReveal, {
      once: true,
    });
  } else {
    initWhyReveal();
  }
})();
