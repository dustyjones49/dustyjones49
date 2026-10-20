(function(){
  // FieldMath - Auto-initialize calculators (v3 - handles all button types)

  function clickCalcButtons(){
    // Click ALL buttons that look like Calculate buttons
    document.querySelectorAll('button').forEach(function(btn){
      var text = (btn.textContent || '').trim().toLowerCase();
      var hasOnclick = btn.hasAttribute('onclick');
      // Only auto-click "Calculate"-type buttons, skip nav/back/star/dark buttons
      if(hasOnclick && (text.indexOf('calc') !== -1 || text.indexOf('calculate') !== -1)){
        try { btn.click(); } catch(e) {}
      }
    });
    // Fallback: also click any button with an onclick that references getElementById/parseFloat
    document.querySelectorAll('button[onclick]').forEach(function(btn){
      var oc = btn.getAttribute('onclick') || '';
      if(btn.getAttribute('data-autoclicked')) return;
      if(oc.indexOf('parseFloat') !== -1 || oc.indexOf('getElementById') !== -1 || oc.indexOf('.value') !== -1){
        btn.setAttribute('data-autoclicked','1');
        try { btn.click(); } catch(e) {}
      }
    });
  }

  function init(){
    // Show result containers
    document.querySelectorAll('.res, .result').forEach(function(r){ r.classList.add('show'); });
    // Click all calc buttons
    clickCalcButtons();
    // Call global calc() if standalone page
    if(typeof window.calc === 'function'){
      try { window.calc(); } catch(e) {}
    }
    // Call global calculate() if present
    if(typeof window.calculate === 'function'){
      try { window.calculate(); } catch(e) {}
    }
    // Dispatch input/change to trigger real-time calcs (electrical/hvac)
    document.querySelectorAll('input, select').forEach(function(el){
      try {
        el.dispatchEvent(new Event('input', {bubbles:true}));
        el.dispatchEvent(new Event('change', {bubbles:true}));
      } catch(e) {}
    });
    // Submit forms to trigger submit-based calculators (baluster, carpet, etc.)
    document.querySelectorAll('form').forEach(function(f){
      try { f.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true})); } catch(e) {}
    });
    // Reveal hidden result containers
    document.querySelectorAll('#results, .results, .result-box').forEach(function(r){
      if(r.style.display === 'none' || getComputedStyle(r).display === 'none'){
        r.style.display = 'block';
      }
    });
  }

  function runWhenReady(){
    init();
    // Re-run at intervals to catch mega-cat re-renders
    [150, 400, 800, 1500, 2500].forEach(function(ms){ setTimeout(init, ms); });
  }

  // Poll for newly-shown cards (mega-cat category changes)
  setInterval(function(){
    document.querySelectorAll('.cards-view .card.show').forEach(function(c){
      if(!c.getAttribute('data-inited')){
        c.setAttribute('data-inited','1');
        c.querySelectorAll('button[onclick]').forEach(function(btn){
          try { btn.click(); } catch(e) {}
        });
      }
    });
    // Auto-click any new calc buttons anywhere
    document.querySelectorAll('button[onclick]').forEach(function(btn){
      if(btn.getAttribute('data-autoclicked')) return;
      var oc = btn.getAttribute('onclick') || '';
      if(oc.indexOf('parseFloat') !== -1 || oc.indexOf('getElementById') !== -1 || oc.indexOf('.value') !== -1){
        btn.setAttribute('data-autoclicked','1');
        try { btn.click(); } catch(e) {}
      }
    });
  }, 500);

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', runWhenReady);
  } else {
    runWhenReady();
  }
})();
