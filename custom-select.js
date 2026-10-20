(function(){
  // FieldMath - Custom Value Select (fixed)
  // Adds a "Custom..." option to numeric dropdowns.
  // Box stays open while typing; commits on Enter or blur.

  function enhanceSelect(sel){
    if(sel.hasAttribute('data-custom-enhanced')) return;
    sel.setAttribute('data-custom-enhanced','1');

    // Only enhance selects whose options look numeric
    var hasNumeric = false;
    for(var i=0;i<sel.options.length;i++){
      var txt = (sel.options[i].value || sel.options[i].textContent || '');
      if(/^\s*\d*\.?\d+/.test(txt)){
        hasNumeric = true;
        break;
      }
    }
    if(!hasNumeric) return;

    // Add the "Custom..." option
    var opt = document.createElement('option');
    opt.value = '__custom__';
    opt.textContent = 'Custom...';
    sel.appendChild(opt);

    // Wrap the select so we can add an inline input
    var wrap = document.createElement('span');
    wrap.style.cssText = 'display:inline-flex;align-items:center;gap:4px;width:100%';
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);

    var input = document.createElement('input');
    input.type = 'number';
    input.step = 'any';
    input.style.cssText = 'flex:1;min-width:60px;padding:10px 12px;border:2px solid var(--border,#ddd);border-radius:6px;font-size:1rem;background:var(--card,#fff);color:var(--text,#333);display:none';
    input.placeholder = 'Enter value';
    input.setAttribute('aria-label','Custom value');
    wrap.appendChild(input);

    var typing = false;

    function commitCustom(){
      var v = parseFloat(input.value);
      if(!isNaN(v)){
        var o = null;
        for(var i=0;i<sel.options.length;i++){
          if(parseFloat(sel.options[i].value) === v){ o = sel.options[i]; break; }
        }
        if(!o){
          o = document.createElement('option');
          o.value = v;
          o.textContent = v;
          sel.appendChild(o);
        }
        sel.value = o.value;
        sel.dispatchEvent(new Event('change', {bubbles:true}));
        sel.dispatchEvent(new Event('input', {bubbles:true}));
      }
    }

    sel.addEventListener('change', function(){
      if(sel.value === '__custom__'){
        input.style.display = 'block';
        input.focus();
      } else if(!typing){
        input.style.display = 'none';
      }
    });

    // Keep the box open while typing - do NOT commit on each keystroke
    input.addEventListener('input', function(){
      typing = true;
    });

    // Commit on Enter
    input.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        e.preventDefault();
        typing = false;
        commitCustom();
        input.style.display = 'none';
        input.blur();
      }
    });

    // Commit on blur (tapping away)
    input.addEventListener('blur', function(){
      typing = false;
      commitCustom();
      input.style.display = 'none';
      if(sel.value === '__custom__' && input.value === ''){
        // revert to first real option
        for(var i=0;i<sel.options.length;i++){
          if(sel.options[i].value !== '__custom__'){ sel.value = sel.options[i].value; break; }
        }
        sel.dispatchEvent(new Event('change', {bubbles:true}));
        sel.dispatchEvent(new Event('input', {bubbles:true}));
      }
    });
  }

  function scan(){
    document.querySelectorAll('select').forEach(enhanceSelect);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }
})();
