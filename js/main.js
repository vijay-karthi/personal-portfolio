/* ============================================================
   main.js — App Initialization, Projects Modal, Contact Form
   Portfolio: Vijay Karthi
   ============================================================ */

/* ── Project Data ─────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'interview',
    num: '01',
    name: 'AI-Powered Mock Interview & Aptitude Platform',
    desc: 'A full-stack web application that leverages Claude AI (Anthropic) to deliver personalized, real-time mock interview sessions and aptitude assessments — helping students and professionals prepare for technical roles with structured, AI-driven feedback.',
    image: 'assets/images/project-interview.svg',
    tags: ['React', 'Claude API', 'REST API', 'JavaScript', 'Node.js'],
    achievements: [
      'Built with React frontend and a REST API backend integrating the Claude API for real-time AI-powered question generation and evaluation.',
      'Designed conversational interview flow with question difficulty scaling based on user performance.',
      'Implemented aptitude test module covering logical reasoning, quantitative aptitude, and verbal ability.',
      'Engineered structured scoring and feedback pipeline delivering detailed post-session performance analytics.',
    ],
    github: 'https://github.com/vijay-karthi/mock-test-app',
    details: {
      architecture: 'React SPA → REST API (Node.js/Express) → Claude AI (Anthropic API). Session state managed client-side with context-aware prompts sent to Claude for dynamic question generation and rubric-based answer evaluation.',
      highlights: [
        'Dynamic interview prompt engineering using context injection for role-specific questions (SWE, data analyst, backend).',
        'Modular aptitude engine covering 5 categories: Quant, Logical, Verbal, Coding, and Domain Knowledge.',
        'Session replay feature allowing users to review AI feedback on each answer.',
        'Fully responsive UI with smooth loading states and error boundary handling.',
      ]
    }
  },
  {
    id: 'steganography',
    num: '02',
    name: 'Image Steganography using LSB',
    desc: 'Developed a secure image steganography application that hides confidential text messages inside digital images using the Least Significant Bit (LSB) algorithm while preserving image quality.',
    image: 'assets/images/image_steganography_tool_green_tone_matched.svg',
    tags: ['Python', 'OpenCV', 'NumPy', 'LSB'],
    achievements: [
      'Hide secret text inside images using LSB-based embedding with minimal visual distortion.',
      'Extract hidden messages from encoded images reliably through bit-level decoding.',
      'Preserve image quality with negligible visual changes after embedding.',
      'Designed a simple, user-friendly interface for both encoding and decoding workflows.',
    ],
    github: 'https://github.com/vijay-karthi/image-stegnography',
    details: {
      architecture: 'Python application using OpenCV for image handling, NumPy for pixel manipulation, and LSB bit-level encoding to embed and extract secret text messages without perceptible image degradation.',
      highlights: [
        'Implemented robust LSB encoding and decoding routines for secure message transmission.',
        'Used OpenCV to read and write image files while preserving original image format and metadata.',
        'Validated hidden message integrity using message length headers and error checking.',
        'Built an easy-to-use interface to toggle between embedding and extraction modes.',
      ]
    }
  },
  {
    id: 'portfolio-optimizer',
    num: '03',
    name: 'Investment Portfolio Optimizer',
    desc: 'A quantitative finance tool that builds optimized portfolios with risk-return modeling, historical backtesting, and asset allocation visualization for smarter investment decisions.',
    image: 'assets/images/project-stock.svg',
    tags: ['Python', 'pandas', 'NumPy', 'yfinance', 'Matplotlib'],
    achievements: [
      'Implemented mean-variance optimization using historical price data and covariance analysis to identify efficient portfolios.',
      'Backtested portfolio performance with annualized return, volatility, and drawdown metrics.',
      'Automated asset allocation using target return, risk budget, and allocation constraints.',
      'Built interactive visualizations for portfolio weights, efficient frontier, and risk-adjusted performance.',
    ],
    github: 'https://github.com/vijay-karthi/investment-portfolio-optimizer',
    details: {
      architecture: 'Data ingestion with yfinance → pandas preprocessing → NumPy covariance and optimization routines → Matplotlib portfolio visualizations and backtesting reports.',
      highlights: [
        'Designed efficient frontier generation for portfolios across varying risk-return tradeoffs.',
        'Included customizable constraints for maximum sector exposure and target volatility.',
        'Implemented Monte Carlo-style scenario analysis for expected portfolio outcomes.',
        'Delivered exportable summary reports for holdings, allocation, and performance metrics.',
      ]
    }
  }
];;

/* ── Project Cards Renderer ───────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card reveal" aria-label="${p.name}">
      <div class="project-card__image">
        <img src="${p.image}" alt="${p.name} preview" loading="lazy" width="600" height="338" />
        <div class="project-card__overlay"></div>
        <span class="project-card__num">${p.num}</span>
      </div>
      <div class="project-card__body">
        <div class="project-card__tags">
          ${p.tags.map((t, i) => `<span class="tag${i >= 2 ? ' tag--gold' : ''}">${t}</span>`).join('')}
        </div>
        <h3 class="project-card__name">${p.name}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <ul class="project-card__achievements">
          ${p.achievements.slice(0, 3).map(a => `
            <li class="project-card__achievement">${a}</li>
          `).join('')}
        </ul>
        <div class="project-card__footer">
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            GitHub
          </a>
          <button
            class="btn btn--primary btn--sm"
            data-project="${p.id}"
            aria-haspopup="dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            View Details
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Bind modal triggers
  grid.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', () => openProjectModal(btn.getAttribute('data-project')));
  });

  // Re-observe new reveal elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Project Modal ────────────────────────────────────────── */
function openProjectModal(id) {
  const p = PROJECTS.find(proj => proj.id === id);
  if (!p) return;

  const overlay = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div class="modal__header">
      <div>
        <div class="section__eyebrow" style="margin-bottom:0.6rem;">${p.tags.slice(0,3).join(' · ')}</div>
        <h2 class="display-sm" style="letter-spacing:-0.02em;">${p.name}</h2>
      </div>
      <button class="modal__close" id="modal-close-btn" aria-label="Close dialog">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal__body">
      <div>
        <p class="modal__section-title">Overview</p>
        <p class="modal__desc">${p.desc}</p>
      </div>
      <div>
        <p class="modal__section-title">Architecture</p>
        <p class="modal__desc">${p.details.architecture}</p>
      </div>
      <div>
        <p class="modal__section-title">Technical Highlights</p>
        <ul class="modal__bullets">
          ${p.details.highlights.map(h => `<li class="modal__bullet">${h}</li>`).join('')}
        </ul>
      </div>
      <div>
        <p class="modal__section-title">All Achievements</p>
        <ul class="modal__bullets">
          ${p.achievements.map(a => `<li class="modal__bullet">${a}</li>`).join('')}
        </ul>
      </div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
        ${p.tags.map((t,i)=>`<span class="tag${i>=2?' tag--gold':''}">${t}</span>`).join('')}
      </div>
      <div style="display:flex;gap:0.75rem;padding-top:0.5rem;border-top:1px solid var(--border);">
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          View on GitHub
        </a>
      </div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.classList.add('no-scroll');

  // Focus management
  setTimeout(() => {
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn?.focus();
    closeBtn?.addEventListener('click', closeModal);
  }, 50);
}

function closeModal() {
  const overlay = document.getElementById('project-modal');
  overlay.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

function initModal() {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}


/* ── App Init ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Navigation
  new Navigation();

  // Theme
  new ThemeManager();

  // Smooth scroll
  initSmoothScroll();

  // Button ripple
  initRipple();

  // Particles
  new ParticleSystem('particle-canvas');

  // Cursor glow
  new CursorGlow();

  // Scroll reveals
  new ScrollReveal();

  // Stats counter
  new StatsCounter();

  // Typing effect
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    new TypingEffect(typingEl, [
      'Software Engineering Graduate',
      'Full Stack Developer',
      'Backend Engineer',
      'AI Enthusiast',
      'Problem Solver',
    ], { typeSpeed: 65, backSpeed: 35, pauseAfter: 2000 });
  }

  // Projects
  renderProjects();

  // Modal
  initModal();

  // Hide loader when everything is ready
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }
  document.body.classList.remove('loading');
});
