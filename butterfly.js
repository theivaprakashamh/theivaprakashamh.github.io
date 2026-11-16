(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  const butterfly = document.createElement('div');
  butterfly.className = 'scroll-butterfly';
  butterfly.setAttribute('aria-hidden', 'true');
  butterfly.innerHTML = `<svg viewBox="0 0 80 72" focusable="false">
    <g class="butterfly-wing wing-left">
      <path d="M39 33 C30 4 7 3 6 17 C5 26 18 36 34 39 C15 34 6 43 14 53 C22 62 35 53 39 40Z" fill="#f6f3e7" stroke="#14251f" stroke-width="3"/>
      <path d="M7 17 C8 4 27 4 35 24 C24 16 13 14 7 19Z" fill="#18251f"/>
      <path d="M14 53 C22 61 32 53 36 45 C25 49 19 48 13 48Z" fill="#e65c33"/>
      <g fill="#18251f"><circle cx="17" cy="24" r="3"/><circle cx="26" cy="28" r="2.7"/><circle cx="23" cy="39" r="2.3"/></g>
      <g fill="#f6f3e7"><circle cx="14" cy="15" r="2"/><circle cx="22" cy="14" r="2"/></g>
    </g>
    <g class="butterfly-wing wing-right">
      <path d="M41 33 C50 4 73 3 74 17 C75 26 62 36 46 39 C65 34 74 43 66 53 C58 62 45 53 41 40Z" fill="#f6f3e7" stroke="#14251f" stroke-width="3"/>
      <path d="M73 17 C72 4 53 4 45 24 C56 16 67 14 73 19Z" fill="#18251f"/>
      <path d="M66 53 C58 61 48 53 44 45 C55 49 61 48 67 48Z" fill="#e65c33"/>
      <g fill="#18251f"><circle cx="63" cy="24" r="3"/><circle cx="54" cy="28" r="2.7"/><circle cx="57" cy="39" r="2.3"/></g>
      <g fill="#f6f3e7"><circle cx="66" cy="15" r="2"/><circle cx="58" cy="14" r="2"/></g>
    </g>
    <path d="M38 23 Q40 18 42 23 L43 47 Q40 55 37 47Z" fill="#14251f"/>
    <path d="M39 23 Q34 13 29 11 M41 23 Q46 13 51 11" stroke="#14251f" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
  document.body.appendChild(butterfly);

  let queued = false;
  let hideTimer;
  function updatePosition() {
    queued = false;
    const scroll = window.scrollY;
    const x = Math.max(8, window.innerWidth - 78 - (25 + 25 * Math.sin(scroll / 270)));
    const y = Math.max(12, Math.min(window.innerHeight - 80, window.innerHeight * .36 + 65 * Math.sin(scroll / 350)));
    butterfly.style.transform = `translate3d(${x}px,${y}px,0) rotate(${8 * Math.sin(scroll / 180)}deg)`;
    butterfly.classList.toggle('is-flying', scroll > 60);
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => butterfly.classList.remove('is-flying'), 1200);
  }
  function queueUpdate() {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(updatePosition);
    }
  }
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate, { passive: true });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) butterfly.classList.remove('is-flying');
  });
})();
