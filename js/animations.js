/* ============================================================
   animations.js — Scroll Reveal, Cursor Glow, Canvas Particles
   Portfolio: Vijay Karthi
   ============================================================ */

/* ── Scroll Reveal (IntersectionObserver) ─────────────────── */
class ScrollReveal {
  constructor() {
    this.observer = new IntersectionObserver(
      this._onIntersect.bind(this),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this._observe();
  }

  _observe() {
    document.querySelectorAll('.reveal').forEach(el => {
      this.observer.observe(el);
    });
  }

  _onIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

/* ── Cursor Glow ──────────────────────────────────────────── */
class CursorGlow {
  constructor() {
    this.el = document.getElementById('cursor-glow');
    if (!this.el || window.matchMedia('(hover: none)').matches) return;
    this._bind();
  }

  _bind() {
    window.addEventListener('mousemove', (e) => {
      this.el.style.left = `${e.clientX}px`;
      this.el.style.top  = `${e.clientY}px`;
    }, { passive: true });
  }
}

/* ── Particle Canvas Background ───────────────────────────── */
class ParticleSystem {
  constructor(canvasId) {
    this.canvas  = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx     = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse   = { x: -999, y: -999 };
    this.animId  = null;
    this._resize();
    this._spawn();
    this._bindEvents();
    this._loop();
  }

  _resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _spawn() {
    const count = Math.floor((this.canvas.width * this.canvas.height) / 22000);
    for (let i = 0; i < count; i++) {
      this.particles.push(this._createParticle());
    }
  }

  _createParticle(x, y) {
    return {
      x: x ?? Math.random() * this.canvas.width,
      y: y ?? Math.random() * this.canvas.height,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.7
        ? '15,118,110'   // emerald
        : Math.random() > 0.5
          ? '214,178,94' // gold
          : '168,173,184' // grey
    };
  }

  _bindEvents() {
    window.addEventListener('resize', () => {
      this._resize();
      this.particles = [];
      this._spawn();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });
  }

  _loop() {
    this.animId = requestAnimationFrame(this._loop.bind(this));
    this._draw();
  }

  _draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < -5) p.x = this.canvas.width + 5;
      if (p.x > this.canvas.width + 5) p.x = -5;
      if (p.y < -5) p.y = this.canvas.height + 5;
      if (p.y > this.canvas.height + 5) p.y = -5;

      // Mouse interaction: slight drift away
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        p.x -= dx * force * 0.015;
        p.y -= dy * force * 0.015;
      }

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });

    // Draw connection lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(15,118,110,${(1 - dist / 90) * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }
}

/* ── Statistics Counter ───────────────────────────────────── */
class StatsCounter {
  constructor() {
    this.counters = document.querySelectorAll('[data-count]');
    if (!this.counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this._animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(el => observer.observe(el));
  }

  _animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start    = performance.now();

    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
}

// Export
window.ScrollReveal  = ScrollReveal;
window.CursorGlow    = CursorGlow;
window.ParticleSystem = ParticleSystem;
window.StatsCounter  = StatsCounter;
