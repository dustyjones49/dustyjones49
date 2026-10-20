(function(){
  function fixLink(a){
    var href = a.getAttribute('href');
    if(!href) return;
    if(/^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(href)) return;
    // Rewrite "./dir/" -> "./dir/index.html" and "../dir/" -> "../dir/index.html"
    if(/\.{1,2}\/[^"]*\/$/.test(href)){
      a.setAttribute('href', href + 'index.html');
    }
    // Relative "dir/" without ./ or ../
    else if(/^[^.\/][^"]*\/$/.test(href)){
      a.setAttribute('href', href + 'index.html');
    }
  }
  function scanAll(){
    document.querySelectorAll('a[href]').forEach(fixLink);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', scanAll);
  } else {
    scanAll();
  }
  // Fallback: rewrite on click too (capturing phase, before navigation)
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if(a) fixLink(a);
  }, true);
})();
