/* App compartida: carrito, buscador, toast, analítica con consentimiento */
(function (BP) {
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* modo privado */ } }
  };
  BP.LS = LS;
  const $q = (s, r) => (r || document).querySelector(s);
  BP.$ = $q; BP.$$ = (s, r) => [...(r || document).querySelectorAll(s)];

  /* ---------- Toast ---------- */
  let tt;
  BP.toast = function (msg) {
    const t = $q('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('on'); clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove('on'), 2600);
  };

  /* ---------- Carrito ---------- */
  const KEY = 'bp_cart_v1';
  BP.cart = {
    get() { return LS.get(KEY, []); },
    save(c) { LS.set(KEY, c); BP.cart.badge(); },
    add(it) {
      const c = BP.cart.get();
      it.key = [it.id, it.color, it.size, it.tech, it.note || ''].join('|');
      const ex = c.find(x => x.key === it.key);
      if (ex) ex.qty += it.qty; else c.push(it);
      BP.cart.save(c);
    },
    setQty(key, q) { const c = BP.cart.get(); const l = c.find(x => x.key === key); if (l) l.qty = Math.max(1, q | 0); BP.cart.save(c); },
    remove(key) { BP.cart.save(BP.cart.get().filter(x => x.key !== key)); },
    clear() { BP.cart.save([]); },
    count() { return BP.cart.get().reduce((a, b) => a + b.qty, 0); },
    qtyOf(id) { return BP.cart.get().filter(x => x.id === id).reduce((a, b) => a + b.qty, 0); },
    unit(it) { return BP.unitPrice(BP.getProduct(it.id), BP.cart.qtyOf(it.id)); },
    subtotal() { return BP.cart.get().reduce((a, it) => a + BP.cart.unit(it) * it.qty, 0); },
    badge() { const b = $q('#cartCount'); if (!b) return; const n = BP.cart.count(); b.textContent = n || ''; b.dataset.n = n; }
  };
  BP.cart.badge();

  /* Texto de un pedido para WhatsApp */
  BP.cartText = function () {
    return BP.cart.get().map(it => {
      const p = BP.getProduct(it.id);
      return `• ${it.qty} x ${p.name} (${it.color}${it.size ? ', ' + it.size : ''}, ${BP.techniques[it.tech].name})` + (it.note ? ` — ${it.note}` : '');
    }).join('\n');
  };

  /* ---------- Analítica con consentimiento ---------- */
  const an = BP.config.analytics;
  const hasAn = !!(an.metaPixelId || an.ga4Id);
  function loadAnalytics() {
    if (an.metaPixelId && !window.fbq) {
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', an.metaPixelId); fbq('track', 'PageView');
    }
    if (an.ga4Id && !window.gtag) {
      const s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + an.ga4Id; document.head.appendChild(s);
      window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag('js', new Date()); gtag('config', an.ga4Id);
    }
  }
  BP.track = function (name, data) {
    if (window.fbq) { const std = { add_to_cart: 'AddToCart', lead: 'Lead', purchase_intent: 'InitiateCheckout' }[name]; std ? fbq('track', std, data || {}) : fbq('trackCustom', name, data || {}); }
    if (window.gtag) gtag('event', name, data || {});
  };
  const consent = LS.get('bp_consent', null);
  if (hasAn) {
    if (consent === 'yes') loadAnalytics();
    else if (consent === null) {
      const ck = $q('#cookie'); if (ck) { ck.classList.add('on'); $q('#ck-yes').onclick = () => { LS.set('bp_consent', 'yes'); ck.classList.remove('on'); loadAnalytics(); }; $q('#ck-no').onclick = () => { LS.set('bp_consent', 'no'); ck.classList.remove('on'); }; }
    }
  }
  document.addEventListener('click', e => { const t = e.target.closest('[data-track]'); if (t) BP.track(t.dataset.track === 'whatsapp_fab' ? 'lead' : 'lead', { source: t.dataset.track }); });

  /* ---------- Buscador con sugerencias ---------- */
  const q = $q('#q'), sg = $q('#sugg');
  if (q && sg) {
    q.addEventListener('input', () => {
      const v = q.value.trim().toLowerCase();
      if (v.length < 2) { sg.classList.remove('on'); return; }
      const r = BP.products.filter(p => (p.name + ' ' + p.cat + ' ' + p.techs.join(' ')).toLowerCase().includes(v)).slice(0, 5);
      sg.innerHTML = r.length ? r.map(p => `<a href="producto-${p.id}.html"><span class="th">${BP.art(p.shape, p.colors[0].hex, { print: false })}</span>${p.name}</a>`).join('') : '<a href="cotizar.html">Sin resultados · Cotiza algo a medida</a>';
      sg.classList.add('on');
    });
    document.addEventListener('click', e => { if (!e.target.closest('.search')) sg.classList.remove('on'); });
  }

  /* ---------- Utilidades ---------- */
  BP.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  BP.param = k => new URLSearchParams(location.search).get(k);
})(window.BP = window.BP || {});
