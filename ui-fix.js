(function(){
  // FieldMath - UI improvements for calculator pages
  // Uses unified theme variables so all pages match in light/dark

  var css = document.createElement('style');
  css.textContent = `
    /* Prevent any horizontal scrolling - everything fits the screen width */
    html, body { overflow-x: hidden !important; max-width: 100% !important; }
    body, .c, .container, .card, .panel, main, .content {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }
    img, video, canvas, svg, iframe { max-width: 100% !important; height: auto !important; }
    pre, code, textarea { white-space: pre-wrap !important; word-wrap: break-word !important; }
    table { width: 100% !important; table-layout: auto !important; }
    table, thead, tbody, tr, td, th { max-width: 100% !important; }
    td, th { word-wrap: break-word !important; word-break: break-word !important; }
    /* Allow rows to wrap so inputs get more width */
    .row, .fr, .form-row { flex-wrap: wrap !important; display: flex !important; }
    .row > *, .fr > *, .form-row > * { flex: 1 1 30% !important; min-width: 110px !important; }
    .row > div, .fr > div { flex: 1 1 30% !important; min-width: 110px !important; }

    /* Bigger inputs with room for numbers - use theme vars */
    .card input, .card select, .fg input, .fg select, .form-group input, .form-group select {
      width: 100% !important;
      padding: 10px 12px !important;
      font-size: 1rem !important;
      border-radius: 8px !important;
      height: 44px !important;
      background: var(--card, #fff) !important;
      color: var(--text, #333) !important;
      border: 2px solid var(--border, #dde3ea) !important;
    }

    /* Labels readable */
    .card label, .fg label, .form-group label { font-size: 0.85rem !important; font-weight: 600 !important; margin: 8px 0 4px !important; color: var(--text, #333) !important; }

    /* Result areas roomy - use theme vars */
    .card .result, .result, .res {
      margin-top: 10px !important;
      padding: 12px 14px !important;
      font-size: 1rem !important;
      min-height: 40px !important;
      line-height: 1.5 !important;
      border-radius: 8px !important;
      background: var(--muted, #f8f9fa) !important;
      color: var(--text, #333) !important;
    }

    /* Cards breathe - use theme vars */
    .card {
      padding: 18px !important;
      background: var(--card, #fff) !important;
      color: var(--text, #333) !important;
      border: 1px solid var(--border, #dde3ea) !important;
    }

    /* Solid sticky header for subcategory views - theme vars */
    .bc-menu .cat-header { background: var(--navy, #1a2332) !important; color: var(--header-text, #fff) !important; box-shadow: 0 2px 8px rgba(0,0,0,.3) !important; }
    .bc-menu .cat-header h3, .bc-menu .cat-header .count { color: var(--header-text, #fff) !important; }
    .bc-menu .cat-header .count { background: rgba(255,255,255,.15) !important; }
    .bc-menu .cat-header .back { color: var(--orange, #f97316) !important; }

    /* Sticky toolbar (search) solid - theme vars */
    .bc-menu .toolbar { background: var(--card, #fff) !important; box-shadow: 0 2px 6px rgba(0,0,0,.15) !important; z-index: 30 !important; }

    /* Sticky topbar solid - theme vars */
    .bc-menu .bc-topbar { background: var(--navy, #1a2332) !important; }
    .bc-menu .bc-topbar a { color: var(--orange, #f97316) !important; }

    /* Headings and body text use theme */
    body { background: var(--bg, #f5f5f5) !important; color: var(--text, #333) !important; }
    .card h2, .card h3, .card-title, .card .title, h1, h2, h3 { color: var(--text, #333) !important; }
    body.dark .card h2, body.dark .card h3, body.dark .card-title, body.dark .card .title, body.dark h1, body.dark h2, body.dark h3 { color: var(--text, #e5e7eb) !important; }

    /* Labels - readable in both themes, match theme text color */
    label, .fg label, .form-group label, .form-label, .field-label, .card label, .row label {
      color: var(--text, #333) !important;
    }
    body.dark label, body.dark .fg label, body.dark .form-group label, body.dark .form-label,
    body.dark .field-label, body.dark .card label, body.dark .row label {
      color: var(--text, #e5e7eb) !important;
    }

    /* Result boxes - force unified themed look (orange-tint bg, orange border) */
    .res, .result, .results, .result-box, .output, .calc-result {
      background: linear-gradient(135deg, #fff7ed, var(--card, #fff)) !important;
      border: 2px solid var(--orange, #f97316) !important;
      border-radius: 10px !important;
      padding: 20px !important;
      margin-top: 20px !important;
    }
    body.dark .res, body.dark .result, body.dark .results, body.dark .result-box, body.dark .output, body.dark .calc-result {
      background: linear-gradient(135deg, #2a2430, var(--card, #1e2130)) !important;
      border: 2px solid var(--orange, #fb923c) !important;
    }
    .res h3, .result h3, .results h3, .result-box h3 {
      color: var(--orange, #f97316) !important;
    }
    body.dark .res h3, body.dark .result h3, body.dark .results h3, body.dark .result-box h3 {
      color: var(--orange, #fb923c) !important;
    }

    /* Result value text - themed orange in light, light text in dark */
    .rv, .result-value, .output-value, .res .rv, .result .rv, .results .rv {
      color: var(--orange, #f97316) !important;
      font-weight: 700 !important;
    }
    body.dark .rv, body.dark .result-value, body.dark .output-value, body.dark .res .rv, body.dark .result .rv {
      color: var(--orange, #fb923c) !important;
    }
    .rl, .result-label, .res .rl {
      color: var(--text, #333) !important;
      font-weight: 600 !important;
    }
    body.dark .rl, body.dark .result-label, body.dark .res .rl {
      color: var(--text, #e5e7eb) !important;
    }
    /* Result row separators */
    .ri, .result-item {
      border-bottom: 1px solid var(--border, #dde3ea) !important;
    }
    body.dark .ri, body.dark .result-item {
      border-bottom: 1px solid var(--border, #33364a) !important;
    }

    /* FAQ text - follows theme */
    .faq-question, .faqq, .faq-q, .faq-question button, .faq-question .arrow, .faqq::after, .faq-q::after {
      color: var(--text, #333) !important;
      background: var(--card, #fff) !important;
    }
    .faq-answer p, .faqa p, .faq-answer, .faqa, .faq-a {
      color: var(--text, #333) !important;
      background: var(--card, #fff) !important;
    }
    body.dark .faq-question, body.dark .faqq, body.dark .faq-q,
    body.dark .faq-answer p, body.dark .faqa p, body.dark .faq-answer, body.dark .faqa,
    body.dark .faq-question button, body.dark .faq-question .arrow {
      color: var(--text, #e5e7eb) !important;
      background: var(--card, #1e2130) !important;
    }
    .faq-item, .faq { background: var(--card, #fff) !important; border-color: var(--border, #dde3ea) !important; }
    body.dark .faq-item, body.dark .faq { background: var(--card, #1e2130) !important; border-color: var(--border, #33364a) !important; }

    /* Formula / Example / Product boxes - follow theme (fix hardcoded light backgrounds) */
    .formula, .formula-box, .fb, .example, .example-box, .eb,
    .product-item, .product-card, .products .product, .products a,
    .factor-item, .guide-box, .info-box, .tip-box, .callout,
    .tip, .note-box, .disclaimer, .guide-card, .product-link,
    .grid a, .alpha a, .card-link, .ref-card {
      background: var(--muted-bg, #f8f9fa) !important;
      border-color: var(--border, #dde3ea) !important;
      color: var(--text, #333) !important;
    }
    body.dark .formula, body.dark .formula-box, body.dark .fb,
    body.dark .example, body.dark .example-box, body.dark .eb,
    body.dark .product-item, body.dark .product-card, body.dark .products .product,
    body.dark .factor-item, body.dark .guide-box, body.dark .info-box, body.dark .tip-box, body.dark .callout,
    body.dark .tip, body.dark .note-box, body.dark .disclaimer, body.dark .guide-card, body.dark .product-link,
    body.dark .grid a, body.dark .alpha a, body.dark .card-link, body.dark .ref-card {
      background: var(--muted-bg, #181b28) !important;
      border-color: var(--border, #33364a) !important;
      color: var(--text, #e5e7eb) !important;
    }

    /* Inputs inside card-inputs / search-wrap - follow theme */
    .card-inputs input, .card-inputs select, .card-inputs textarea,
    .search-wrap input, .search-bar input, .search input {
      background: var(--card, #fff) !important;
      color: var(--text, #333) !important;
      border-color: var(--border, #dde3ea) !important;
    }
    body.dark .card-inputs input, body.dark .card-inputs select, body.dark .card-inputs textarea,
    body.dark .search-wrap input, body.dark .search-bar input, body.dark .search input {
      background: var(--card, #1e2130) !important;
      color: var(--text, #e5e7eb) !important;
      border-color: var(--border, #33364a) !important;
    }
    .card-inputs input:focus, .card-inputs select:focus, .card-inputs textarea:focus,
    .search-wrap input:focus {
      background: var(--card, #fff) !important;
      border-color: var(--orange, #f97316) !important;
    }
    body.dark .card-inputs input:focus, body.dark .card-inputs select:focus, body.dark .card-inputs textarea:focus,
    body.dark .search-wrap input:focus {
      background: var(--card, #1e2130) !important;
      border-color: var(--orange, #fb923c) !important;
    }

    /* Semantic pastel badges - keep the tint but darken for dark mode */
    .pct-up, .diff-beginner { background: #eafaf1 !important; color: #166534 !important; }
    body.dark .pct-up, body.dark .diff-beginner { background: #143a2a !important; color: #86efac !important; }
    .pct-down, .diff-pro { background: #fdecea !important; color: #b91c1c !important; }
    body.dark .pct-down, body.dark .diff-pro { background: #3f1d1d !important; color: #fca5a5 !important; }
    .diff-intermediate { background: #fef9e7 !important; color: #92400e !important; }
    body.dark .diff-intermediate { background: #3a2f14 !important; color: #fcd34d !important; }
    .disclaimer { background: #fef9e7 !important; color: var(--text, #333) !important; }
    body.dark .disclaimer { background: #3a2f14 !important; color: var(--text, #e5e7eb) !important; }

    /* Tag pills - keep accent on hover/active but readable in dark */
    .tag-power.active, .tag-power:hover, .tag-thermal.active, .tag-thermal:hover, .tag-lighting.active, .tag-lighting:hover {
      color: var(--text, #333) !important;
    }
    body.dark .tag-power.active, body.dark .tag-power:hover, body.dark .tag-thermal.active, body.dark .tag-thermal:hover, body.dark .tag-lighting.active, body.dark .tag-lighting:hover {
      color: var(--text, #e5e7eb) !important;
    }

    /* Tables - zebra striping, hover, and cell borders follow theme */
    tbody tr:nth-child(even), tr:nth-child(even), .striped tr:nth-child(even), tr.alt, tr.even {
      background: var(--muted-bg, #f8f9fa) !important;
    }
    body.dark tbody tr:nth-child(even), body.dark tr:nth-child(even), body.dark .striped tr:nth-child(even),
    body.dark tr.alt, body.dark tr.even {
      background: var(--muted-bg, #181b28) !important;
    }
    tbody tr:hover, tr:hover {
      background: var(--muted-bg, #f8f9fa) !important;
    }
    body.dark tbody tr:hover, body.dark tr:hover {
      background: var(--muted-bg, #181b28) !important;
    }
    tbody td, td {
      border-bottom-color: var(--border, #dde3ea) !important;
      border-color: var(--border, #dde3ea) !important;
    }
    body.dark tbody td, body.dark td {
      border-bottom-color: var(--border, #33364a) !important;
      border-color: var(--border, #33364a) !important;
    }
    .formula strong, .example strong, .formula-box strong, .example-box strong {
      color: var(--orange, #f97316) !important;
    }
    body.dark .formula strong, body.dark .example strong, body.dark .formula-box strong, body.dark .example-box strong {
      color: var(--orange, #fb923c) !important;
    }
    .product-item small, .product-card small { color: var(--text-light, #888) !important; }
    body.dark .product-item small, body.dark .product-card small { color: var(--text-light, #9ca3af) !important; }

    /* General body text - follows theme */
    p, span, li, td, th, .description, .desc, .formula, .formula-box, .fb, .example, .example-box, .eb {
      color: var(--text, #333) !important;
    }
    body.dark p, body.dark span, body.dark li, body.dark td, body.dark th,
    body.dark .description, body.dark .desc, body.dark .formula, body.dark .formula-box, body.dark .fb,
    body.dark .example, body.dark .example-box, body.dark .eb {
      color: var(--text, #e5e7eb) !important;
    }

    /* Footer follows theme - text matches the footer link color */
    footer, .footer { background: var(--navy, #1a2332) !important; text-align: center !important; padding: 24px 16px !important; font-size: .85rem !important; }
    footer p, .footer p { text-align: center !important; margin: 0 auto !important; }
    html body footer, html body .footer,
    html body footer p, html body .footer p,
    html body footer span, html body .footer span { color: var(--orange, #f97316) !important; }
    footer a, .footer a { color: var(--orange, #f97316) !important; }

    /* Pin footer to bottom: body flex column, footer pushed down with auto margin */
    body {
      min-height: 100vh !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      box-sizing: border-box !important;
    }
    #bcMenuMount, .c, .container, main, .content {
      flex: 1 0 auto !important;
      width: 100% !important;
    }
    footer, .footer { margin-top: auto !important; flex-shrink: 0 !important; }

    /* ==== UNIVERSAL THEME OVERRIDES (forces every page to unified theme) ==== */
    /* Page background */
    html, body { background: var(--bg, #f5f5f5) !important; }
    body.dark, body.dark html { background: var(--bg, #12141d) !important; }

    /* Headers - force to navy (overrides indigo #1a237e and other customs) */
    header, .header, .site-header, .hero, .banner, .topbar {
      background: var(--navy, #1a2332) !important;
      color: var(--header-text, #fff) !important;
      padding: 40px 16px 32px !important;
      text-align: center !important;
    }
    header h1, header h2, header h3, header p, header .title,
    .header h1, .hero h1, .banner h1 {
      color: var(--header-text, #fff) !important;
    }
    header h1, .header h1, .hero h1, .banner h1 {
      font-size: 1.8rem !important;
      margin: 0 !important;
    }

    /* Main content - consistent spacing below header */
    .c, .container, .bc-menu {
      padding-top: 24px !important;
    }

    /* Cards - force to theme card color */
    .card, .panel, .box, .widget, .calculator, .container > div {
      background: var(--card, #fff) !important;
    }
    body.dark .card, body.dark .panel, body.dark .box, body.dark .widget, body.dark .calculator {
      background: var(--card, #1e2130) !important;
    }

    /* ALL text follows theme (except buttons/links/inputs which have their own contrast colors) */
    body, body p:not(button), body span, body li, body td, body th, body div, body section, body article,
    body .text, body .content, body .description, body .subtitle, body .caption,
    body .result, body .output, body .value, body .label {
      color: var(--text, #333) !important;
    }
    body.dark p, body.dark span, body.dark li, body.dark td, body.dark th, body.dark div,
    body.dark section, body.dark article, body.dark .text, body.dark .content,
    body.dark .description, body.dark .subtitle, body.dark .caption,
    body.dark .result, body.dark .output, body.dark .value, body.dark .label {
      color: var(--text, #e5e7eb) !important;
    }

    /* Headings follow theme */
    h1, h2, h3, h4, h5, h6, .card h1, .card h2, .card h3, .card h4, .title {
      color: var(--text, #333) !important;
    }
    body.dark h1, body.dark h2, body.dark h3, body.dark h4, body.dark h5, body.dark h6,
    body.dark .card h1, body.dark .card h2, body.dark .card h3, body.dark .title {
      color: var(--text, #e5e7eb) !important;
    }

    /* Keep interactive elements' own colors (buttons/links) */
    button, input, select, textarea, .btn, .calcbtn, a:not(.cc):not(.card) {
      color: inherit;
    }
    body.dark button, body.dark input, body.dark select, body.dark textarea {
      background: var(--card, #1e2130) !important;
      color: var(--text, #e5e7eb) !important;
      border-color: var(--border, #33364a) !important;
    }
  `;
  document.head.appendChild(css);

  // Add reference disclaimer to every page footer (skip if one already exists)
  function addDisclaimer(){
    // Skip if the page already has ANY disclaimer text anywhere
    var bodyText = (document.body && document.body.textContent) || '';
    if(/reference only|verify with your local|for reference|estimates only|reference only/i.test(bodyText)) return;
    // Also skip if a .bc-disclaimer was already injected
    if(document.querySelector('.bc-disclaimer')) return;
    var foot = document.querySelector('footer') || document.querySelector('.footer');
    if(!foot) return;
    var p = document.createElement('p');
    p.className = 'bc-disclaimer';
    p.style.cssText = 'margin:10px auto 0;max-width:720px;font-size:.78rem;color:var(--text-light,#999);line-height:1.4';
    p.textContent = '2026 FieldMath - Calculators are reference only. Always verify with your local code.';
    foot.appendChild(p);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(addDisclaimer, 300); });
  } else {
    setTimeout(addDisclaimer, 300);
  }

  // Add Privacy / Support links to every page footer
  function addFooterLinks(){
    var foot = document.querySelector('footer') || document.querySelector('.footer');
    if(!foot) return;
    // Skip if already added (our own or an existing privacy/support link set)
    if(foot.querySelector('.bc-foot-links')) return;
    if(/privacy/i.test(foot.textContent) && /support/i.test(foot.textContent)) return;
    // Compute relative path to site root based on page depth.
    // Robust: count the ../ prefixes in the ui-fix.js script src (ui-fix lives at site root).
    var depth = 0;
    var fixSrc = null;
    document.querySelectorAll('script[src]').forEach(function(s){
      if(!fixSrc && (s.getAttribute('src')||'').indexOf('ui-fix.js') !== -1) fixSrc = s.getAttribute('src');
    });
    if(fixSrc){
      depth = (fixSrc.match(/\.\.\//g) || []).length;
    } else {
      var p = location.pathname;
      var seg = p.split('/').filter(Boolean);
      if(seg.length && seg[seg.length-1] === 'index.html') seg.pop();
      depth = seg.length;
    }
    var up = '';
    for(var i = 0; i < depth; i++) up += '../';
    if(up === '') up = './';
    var nav = document.createElement('nav');
    nav.className = 'bc-foot-links';
    nav.style.cssText = 'margin-top:10px;text-align:center';
    var priv = document.createElement('a');
    priv.href = up + 'privacy/index.html';
    priv.textContent = 'Privacy';
    priv.style.cssText = 'color:var(--orange,#f97316);margin:0 8px;text-decoration:none;font-size:.85rem';
    var sup = document.createElement('a');
    sup.href = up + 'support/index.html';
    sup.textContent = 'Support';
    sup.style.cssText = 'color:var(--orange,#f97316);margin:0 8px;text-decoration:none;font-size:.85rem';
    var sep = document.createTextNode('|');
    sep.style = '';
    nav.appendChild(priv);
    nav.appendChild(document.createTextNode(' | '));
    nav.appendChild(sup);
    foot.appendChild(nav);
    // Fix broken relative links on navigation (Electron file:// trailing-slash issue)
    if(typeof window.fixFavLinks === 'function'){}
    try {
      if(window.Capacitor === undefined){}
    } catch(e){}
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(addFooterLinks, 320); });
  } else {
    setTimeout(addFooterLinks, 320);
  }

  // Remove Share/Embed/Ad-slot sections from the live DOM (multiple legacy formats)
  function cleanShareEmbed(){
    // Cards/sections whose heading is Share, Share This Calculation, or Embed This Calculator
    document.querySelectorAll('.card').forEach(function(card){
      var h = card.querySelector('h2, h3');
      if(h){
        var t = (h.textContent||'').trim().toLowerCase();
        if(t === 'share' || t === 'share this calculation' || t === 'embed this calculator'){
          card.parentNode && card.parentNode.removeChild(card);
        }
      }
    });
    // Share button groups / embed code / ad slots by class or id (targeted)
    document.querySelectorAll('.share-btns, .share, .sb, .embed-code, .ad-slot, [id*="ad-slot"], .share-btn').forEach(function(el){
      el.parentNode && el.parentNode.removeChild(el);
    });
    // Remove cards that contain share/embed/ad elements (baluster-style)
    document.querySelectorAll('.card').forEach(function(card){
      if(card.querySelector('.share-btn, .share-btns, .embed-code, .ad-slot, .sb')){
        card.parentNode && card.parentNode.removeChild(card);
      }
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(cleanShareEmbed, 350); setTimeout(cleanShareEmbed, 900); });
  } else {
    setTimeout(cleanShareEmbed, 350);
    setTimeout(cleanShareEmbed, 900);
  }
})();
