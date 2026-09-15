'use strict';
(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = $('.menu-toggle');
  const menu = $('#mobile-menu');
  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
    $('main').inert = open;
    $('footer').inert = open;
    if (open) menu.querySelector('a').focus();
    else if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => setMenu(menu.hidden, !menu.hidden));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    setMenu(false);
    const section = document.querySelector(a.getAttribute('href'));
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  }));
  document.addEventListener('keydown', (e) => {
    if (menu.hidden) return;
    if (e.key === 'Escape') { setMenu(false, true); return; }
    if (e.key !== 'Tab') return;
    const links = [...menu.querySelectorAll('a')];
    if (e.shiftKey && document.activeElement === menuButton) { e.preventDefault(); links.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === links.at(-1)) { e.preventDefault(); menuButton.focus(); }
    else if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); menuButton.focus(); }
    else if (!e.shiftKey && document.activeElement === menuButton) { e.preventDefault(); links[0].focus(); }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  const progress = $('.reading-progress');
  let pending = false;
  function updateProgress() {
    const length = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${length > 0 ? Math.min(100, Math.max(0, window.scrollY / length * 100)) : 0}%`;
    pending = false;
  }
  window.addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('waiting'); observer.unobserve(entry.target); }
    }), { threshold: 0.07 });
    if (!reduceMotion.matches) {
      document.body.classList.add('motion-ready');
      $$('.reveal').forEach(el => { el.classList.add('waiting'); observer.observe(el); });
    }
    reduceMotion.addEventListener('change', e => { if (e.matches) $$('.waiting').forEach(el => el.classList.remove('waiting')); });
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$('.desktop-nav a').forEach(a => {
            if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
            else a.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    $$('main section').forEach(el => navObserver.observe(el));
  }
  $$('.filter').forEach(button => button.addEventListener('click', () => {
    $$('.filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    let count = 0;
    $$('.project-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) { count++; card.classList.remove('waiting'); }
    });
    $('.filter-status').textContent = `${count} registros no acervo${button.dataset.filter === 'all' ? '' : ' · ' + button.dataset.filter}`;
    updateProgress();
  }));
  const dialog = $('#lightbox');
  const photo = $('#lightbox-image');
  const caption = $('#lightbox-caption');
  let current = 0;
  let activePhotos = [];
  let opener;
  function showPhoto(index) {
    current = (index + activePhotos.length) % activePhotos.length;
    const item = activePhotos[current];
    photo.src = item.dataset.photo;
    photo.alt = item.querySelector('img').alt;
    caption.textContent = `${current + 1} / ${activePhotos.length} · ${item.dataset.caption}`;
  }
  $$('[data-photo]').forEach(button => button.addEventListener('click', () => {
    activePhotos = $$('[data-photo]').filter(b => !b.closest('[hidden]'));
    opener = button;
    showPhoto(activePhotos.indexOf(button));
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }));
  $('.close-lightbox').addEventListener('click', () => dialog.close());
  $('.previous-photo').addEventListener('click', () => showPhoto(current - 1));
  $('.next-photo').addEventListener('click', () => showPhoto(current + 1));
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); showPhoto(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); showPhoto(current - 1); }
  });
  dialog.addEventListener('click', e => {
    const bounds = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; if (opener) opener.focus(); });
})();
