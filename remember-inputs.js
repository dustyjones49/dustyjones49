(function(){
  // FieldMath - Remember input values across reloads
  // Saves all input/select values per page in localStorage, restores on load.

  var KEY = 'bc_remember';

  function getStore(){
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e){ return {}; }
  }
  function setStore(store){ localStorage.setItem(KEY, JSON.stringify(store)); }

  // Page identifier
  function pageId(){
    var p = location.pathname;
    var seg = p.split('/').filter(Boolean);
    if(seg.length && seg[seg.length-1] === 'index.html') seg.pop();
    return seg.join('/') || 'home';
  }

  var pid = pageId();
  var store = getStore();
  var pageStore = store[pid] || {};

  function saveAll(){
    var data = {};
    document.querySelectorAll('input[type="number"], input[type="text"], select, textarea').forEach(function(el){
      if(!el.id && !el.name) return;
      var key = el.id || el.name;
      if(el.tagName === 'SELECT') data[key] = el.selectedIndex;
      else data[key] = el.value;
    });
    pageStore = data;
    store[pid] = data;
    setStore(store);
  }

  function restoreAll(){
    Object.keys(pageStore).forEach(function(key){
      var el = document.getElementById(key) || document.getElementsByName(key)[0];
      if(!el) return;
      if(el.tagName === 'SELECT'){
        if(typeof pageStore[key] === 'number' && pageStore[key] >= 0 && pageStore[key] < el.options.length){
          el.selectedIndex = pageStore[key];
        }
      } else {
        el.value = pageStore[key];
      }
    });
    // Trigger recalculation after restore
    document.querySelectorAll('input, select').forEach(function(el){
      try {
        el.dispatchEvent(new Event('input', {bubbles:true}));
        el.dispatchEvent(new Event('change', {bubbles:true}));
      } catch(e){}
    });
  }

  function init(){
    restoreAll();
    // Debounced save on input/change
    var timer = null;
    document.querySelectorAll('input, select, textarea').forEach(function(el){
      el.addEventListener('input', function(){ schedule(); });
      el.addEventListener('change', function(){ schedule(); });
    });
    function schedule(){
      clearTimeout(timer);
      timer = setTimeout(saveAll, 300);
    }
    // Save on page hide/unload too
    window.addEventListener('beforeunload', saveAll);
    document.addEventListener('visibilitychange', function(){
      if(document.visibilityState === 'hidden') saveAll();
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(init, 250); });
  } else {
    setTimeout(init, 250);
  }
})();
