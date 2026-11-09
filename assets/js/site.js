(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.remove('no-js');

  // Sticky header: translucent background after scroll
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var menu = document.getElementById('mobile-menu');
  var openBtn = document.querySelector('.burger');
  function setMenu(open) {
    if (!menu || !openBtn) return;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
    if (open) { var f = menu.querySelector('a,button'); if (f) f.focus(); } else { openBtn.focus({ preventScroll: true }); }
  }
  if (openBtn && menu) {
    openBtn.addEventListener('click', function () { setMenu(true); });
    menu.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
  }

  // Reveal on scroll
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (el.dataset.delay || 0) + 'ms';
      io.observe(el);
    });
  }

  // Active navigation link (home sections or project TOC)
  var links = document.querySelectorAll('[data-spy] a[href*="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').split('#')[1];
      var sec = id && document.getElementById(id);
      if (sec) { (map[id] = map[id] || []).push(a); }
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          (map[en.target.id] || []).forEach(function (a) { a.classList.add('active'); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { spy.observe(document.getElementById(id)); });
  }

  // Copy to clipboard
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = document.getElementById(b.dataset.copy);
      if (!el) return;
      var v = el.textContent.trim(), label = b.textContent;
      function done(t) { b.textContent = t; setTimeout(function () { b.textContent = label; }, 1600); }
      function fallback() {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); done('Выделено');
      }
      try { navigator.clipboard.writeText(v).then(function () { done('Скопировано'); }, fallback); } catch (e) { fallback(); }
    });
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
