/* ============================================================
   effects.js — Typing Effect, Theme Toggle, Smooth Scroll
   Portfolio: Vijay Karthi
   ============================================================ */

/* ── Typing Text Effect ───────────────────────────────────── */
class TypingEffect {
  constructor(el, phrases, opts = {}) {
    if (!el) return;
    this.el     = el;
    this.phrases = phrases;
    this.speed   = opts.typeSpeed  ?? 68;
    this.backSpeed = opts.backSpeed ?? 38;
    this.pauseAfter = opts.pauseAfter ?? 1800;
    this.pauseBefore = opts.pauseBefore ?? 320;
    this.index  = 0;
    this.char   = 0;
    this.deleting = false;
    this._tick();
  }

  _tick() {
    const phrase = this.phrases[this.index % this.phrases.length];

    if (this.deleting) {
      this.char--;
    } else {
      this.char++;
    }

    this.el.textContent = phrase.slice(0, this.char);

    let delay = this.deleting ? this.backSpeed : this.speed;

    if (!this.deleting && this.char === phrase.length) {
      delay = this.pauseAfter;
      this.deleting = true;
    } else if (this.deleting && this.char === 0) {
      this.deleting = false;
      this.index++;
      delay = this.pauseBefore;
    }

    setTimeout(() => this._tick(), delay);
  }
}

/* ── Theme Toggle ─────────────────────────────────────────── */
class ThemeManager {
  constructor() {
    this.toggleBtns = document.querySelectorAll('.theme-toggle');
    this.root       = document.documentElement;
    this.KEY        = 'vk-theme';
    this._load();
    this._bind();
    this._updateIcons();
  }

  _load() {
    const saved = localStorage.getItem(this.KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.theme = saved ?? (prefersDark ? 'dark' : 'light');
    this._apply(this.theme, false);
  }

  _apply(theme, animate = true) {
    this.theme = theme;

    if (animate) {
      // Slight flash-free transition
      document.body.style.transition = 'background-color 0.35s, color 0.35s';
    }

    if (theme === 'light') {
      this.root.setAttribute('data-theme', 'light');
    } else {
      this.root.removeAttribute('data-theme');
    }

    localStorage.setItem(this.KEY, theme);
    this._updateIcons();
  }

  _bind() {
    this.toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this._apply(this.theme === 'dark' ? 'light' : 'dark');
      });
    });

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem(this.KEY)) {
          this._apply(e.matches ? 'dark' : 'light');
        }
      });
  }

  _updateIcons() {
    const isDark = this.theme === 'dark';
    this.toggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title',      isDark ? 'Switch to light mode' : 'Switch to dark mode');
      const moonIcon = btn.querySelector('.icon-moon');
      const sunIcon  = btn.querySelector('.icon-sun');
      if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
      if (sunIcon)  sunIcon.style.display  = isDark ? 'none'  : 'block';
    });
  }
}

/* ── Button Ripple ────────────────────────────────────────── */
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect   = this.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const size   = Math.max(rect.width, rect.height) * 1.4;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ── Smooth Scroll for Anchor Links ──────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '68'
      );

      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// Export
window.TypingEffect   = TypingEffect;
window.ThemeManager   = ThemeManager;
window.initRipple     = initRipple;
window.initSmoothScroll = initSmoothScroll;
