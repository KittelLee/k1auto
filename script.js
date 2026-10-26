(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  const navLinks = document.querySelectorAll('.primary-nav a');

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
    primaryNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(opening));
      menuToggle.setAttribute('aria-label', opening ? '메뉴 닫기' : '메뉴 열기');
      primaryNav.classList.toggle('is-open', opening);
      document.body.classList.toggle('menu-open', opening);
    });
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
