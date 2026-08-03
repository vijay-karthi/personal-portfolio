/* ============================================================
   navigation.js — Sticky Nav, Scroll Progress, Mobile Drawer
   Portfolio: Vijay Karthi
   ============================================================ */

class Navigation {
  constructor() {
    this.nav         = document.getElementById('main-nav');
    this.progressBar = document.getElementById('scroll-progress');
    this.burger      = document.getElementById('nav-burger');
    this.mobileMenu  = document.getElementById('mobile-menu');
    this.backdrop    = document.getElementById('mobile-backdrop');
    this.scrollTop   = document.getElementById('scroll-top');
    this.navLinks    = document.querySelectorAll('.nav__link[data-section]');
    this.sections    = [];
    this.lastScroll  = 0;

    this._bindEvents();
    this._buildSectionMap();
  }

  _buildSectionMap() {
    this.navLinks.forEach(link => {
      const id = link.getAttribute('data-section');
      const el = document.getElementById(id);
      if (el) this.sections.push({ id, el, link });
    });
  }

  _bindEvents() {
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this._onScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Burger toggle
    this.burger?.addEventListener('click', () => this._toggleMenu());

    // Backdrop / close
    this.backdrop?.addEventListener('click', () => this._closeMenu());

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this._closeMenu();
    });

    // Mobile menu links
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => this._closeMenu());
    });

    // Scroll-to-top button
    this.scrollTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  _onScroll() {
    const scrollY = window.scrollY;
    const docH    = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    if (this.progressBar) {
      this.progressBar.style.width = `${Math.min((scrollY / docH) * 100, 100)}%`;
    }

    // Nav scrolled class
    if (this.nav) {
      this.nav.classList.toggle('scrolled', scrollY > 20);
    }

    // Scroll-to-top visibility
    if (this.scrollTop) {
      this.scrollTop.classList.toggle('visible', scrollY > 400);
    }

    // Active section highlight
    this._updateActiveSection(scrollY);

    this.lastScroll = scrollY;
  }

  _updateActiveSection(scrollY) {
    let current = '';
    const offset = 120;

    this.sections.forEach(({ id, el }) => {
      const top = el.getBoundingClientRect().top + scrollY - offset;
      if (scrollY >= top) current = id;
    });

    this.sections.forEach(({ id, link }) => {
      link.classList.toggle('active', id === current);
    });
  }

  _toggleMenu() {
    const isOpen = this.mobileMenu?.classList.contains('open');
    isOpen ? this._closeMenu() : this._openMenu();
  }

  _openMenu() {
    this.mobileMenu?.classList.add('open');
    this.burger?.classList.add('active');
    document.body.classList.add('no-scroll');
    this.burger?.setAttribute('aria-expanded', 'true');
  }

  _closeMenu() {
    this.mobileMenu?.classList.remove('open');
    this.burger?.classList.remove('active');
    document.body.classList.remove('no-scroll');
    this.burger?.setAttribute('aria-expanded', 'false');
  }
}

// Export so main.js can initialize
window.Navigation = Navigation;
