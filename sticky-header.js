(function(){
  // FieldMath - Fixed header with Home + Back + search (always visible)
  if(document.getElementById('bcStickyHeader')) return;

  function makeHeader(){
    // Depth is derived from this script's own src (root = "sticky-header.js",
    // level 1 = "../sticky-header.js", etc.). Works on file://, capacitor:// and http(s).
    function scriptDepth(){
      var scripts = document.getElementsByTagName('script');
      for(var i = 0; i < scripts.length; i++){
        var s = scripts[i].getAttribute('src') || '';
        if(/sticky-header\.js$/i.test(s)){
          var up = s.replace(/sticky-header\.js$/i, '');
          var segs = up.split('/').filter(Boolean);
          return segs.length;
        }
      }
      return 0;
    }
    var depth = scriptDepth();
    var isHome = depth === 0;
    var h1 = document.querySelector('h1');
    var isHub = document.querySelector('.cs') !== null || (h1 && /hub/i.test(h1.textContent||''));
    isHome = isHome || isHub;

    var pad = document.createElement('style');
    pad.textContent = 'body{padding-top:calc(env(safe-area-inset-top, 0px) + 52px) !important}';
    document.head.appendChild(pad);

    // Compute depth of current page so Home/Back can resolve the root index.html.
    // Derive depth from this script's own src (always at site root: "sticky-header.js",
    // "../sticky-header.js", "../../sticky-header.js", ...). Works on file:// and http(s).
    function rootHref(){
      var scripts = document.getElementsByTagName('script');
      var src = '';
      for(var i = 0; i < scripts.length; i++){
        var s = scripts[i].getAttribute('src') || '';
        if(/sticky-header\.js$/i.test(s)){ src = s; break; }
      }
      var up = src.replace(/sticky-header\.js$/i, '');
      return up + 'index.html';
    }

    // Fixed wrapper: SOLID BLACK at top (covers status bar area), navy bar inside below
    var wrap = document.createElement('div');
    wrap.id = 'bcStickyHeader';
    wrap.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:950;background:#000;padding-top:env(safe-area-inset-top, 0px);font-family:system-ui,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.25)';

    // Navy bar (search + toggles) below the black safe-area strip
    // Use a horizontal scroll row so it NEVER wraps and grows over the page title.
    var bar = document.createElement('div');
    bar.style.cssText = 'background:#1a2332;color:#fff;padding:8px 12px;display:flex;align-items:center;gap:8px;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none';
    bar.style.setProperty('scrollbar-width','none');
    wrap.appendChild(bar);

    // Back button
    var back = document.createElement('button');
    back.textContent = '\u2190';
    back.title = 'Go back';
    back.style.cssText = 'background:rgba(255,255,255,.08);border:none;color:#f97316;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:1.1rem;font-weight:700;line-height:1';
    back.onclick = function(){
      try { if(history.length > 1){ history.back(); } else { location.href = rootHref(); } }
      catch(e){ location.href = rootHref(); }
    };
    if(!isHome) bar.appendChild(back);

    // Home link
    var home = document.createElement('a');
    home.href = rootHref();
    home.textContent = 'Home';
    home.style.cssText = 'color:#f97316;text-decoration:none;font-weight:700;font-size:.85rem;white-space:nowrap;padding:4px 10px;background:rgba(255,255,255,.08);border-radius:6px';
    if(!isHome) bar.appendChild(home);

    // Search
    var search = document.createElement('input');
    search.type = 'search';
    search.placeholder = 'Search calculators...';
    // On the home screen the bar only holds the search box, so center it;
    // on inner pages keep it flexible next to Back/Home.
    search.style.cssText = (isHome
      ? 'flex:0 1 auto;width:min(480px,92%);margin:0 auto;'
      : 'flex:1 1 120px;min-width:90px;max-width:300px;')
      + 'padding:9px 14px;border:1px solid rgba(255,255,255,.35);border-radius:8px;background:rgba(255,255,255,.14);color:#fff;font-size:.9rem;outline:none;white-space:nowrap';
    bar.appendChild(search);
    search.addEventListener('input', function(){
      var q = this.value.toLowerCase();
      document.querySelectorAll('.card, .cc').forEach(function(c){
        c.style.display = c.textContent.toLowerCase().indexOf(q) > -1 ? '' : 'none';
      });
      document.querySelectorAll('.cs').forEach(function(s){
        var v = !q || s.textContent.toLowerCase().indexOf(q) > -1;
        s.style.display = v ? '' : 'none';
      });
      document.querySelectorAll('#tableBody tr').forEach(function(r){
        var v = !q || r.textContent.toLowerCase().indexOf(q) > -1;
        if(v){ r.classList.remove('hidden'); } else { r.classList.add('hidden'); }
      });
    });

    // Light-only app: no theme toggle needed
    /* dark toggle removed - app is light theme only */

    document.body.insertBefore(wrap, document.body.firstChild);

    // Reserve the REAL sticky header height so page content/title is never covered
    setTimeout(function(){
      var h = wrap.offsetHeight;
      if(h > 0){
        var style = document.createElement('style');
        style.textContent = 'body{padding-top:' + h + 'px !important}';
        document.head.appendChild(style);
      }
    }, 50);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(makeHeader, 100); });
  } else {
    setTimeout(makeHeader, 100);
  }
})();
