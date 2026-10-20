(function(){
  var unit = localStorage.getItem('tempUnit')||'F';
  var DEG = '\u00B0';

  // C/F temperature toggle removed from UI

  function f2c(v){return(v-32)*5/9}
  function c2f(v){return v*9/5+32}

  function isTempField(el){
    var lbl = el.closest('label');
    if(!lbl) lbl = el.previousElementSibling;
    if(!lbl) return false;
    var txt = (lbl.textContent||'').toLowerCase();
    return txt.indexOf('temp')>=0 || txt.indexOf('f')>=0 && txt.indexOf(DEG)>=0 || txt.indexOf('fahrenheit')>=0;
  }

  var tempEls = [];
  var resultEls = [];
  var DEG_F = new RegExp('(\\d+\\.?\\d*)\\s*'+DEG+'F','i');
  var DEG_C = new RegExp('(\\d+\\.?\\d*)\\s*'+DEG+'C','i');

  function patchInput(inp){
    var origVal = parseFloat(inp.value)||0;
    inp._tempF = unit==='F' ? origVal : c2f(origVal);
    var desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');
    Object.defineProperty(inp,'value',{
      get: function(){ return desc.get.call(this) },
      set: function(v){
        var n = parseFloat(v);
        if(!isNaN(n)){
          if(unit==='C'){ this._tempF = c2f(n); desc.set.call(this, n.toFixed(1)) }
          else{ this._tempF = n; desc.set.call(this, n.toFixed(1)) }
        }else{ desc.set.call(this,v) }
      },
      configurable:true
    });
    inp.addEventListener('input',function(){
      var n = parseFloat(desc.get.call(this));
      if(!isNaN(n)){ if(unit==='C')this._tempF=c2f(n); else this._tempF=n }
    });
    if(unit==='C') desc.set.call(inp, f2c(inp._tempF).toFixed(1));
    tempEls.push(inp);
  }

  function scanAndPatch(){
    document.querySelectorAll('input[type="number"]').forEach(function(inp){
      if(inp._tempF!==undefined)return;
      if(isTempField(inp)) patchInput(inp);
    });
    resultEls = [];
    document.querySelectorAll('.res span, .rv, [id^="r"] span, [class*="result"] span').forEach(function(sp){
      if(sp._tempF!==undefined)return;
      var m = (sp.textContent||'').match(DEG_F);
      if(m){ sp._tempF = parseFloat(m[1]); resultEls.push(sp); sp.setAttribute('data-temp','1') }
    });
  }

  function convertAll(){
    tempEls.forEach(function(inp){
      var desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value');
      if(unit==='C'){ desc.set.call(inp, f2c(inp._tempF).toFixed(1)) }
      else{ desc.set.call(inp, inp._tempF.toFixed(1)) }
    });
    resultEls.forEach(function(sp){
      if(unit==='C'){ sp.textContent = f2c(sp._tempF).toFixed(1)+DEG+'C' }
      else{ sp.textContent = sp._tempF.toFixed(1)+DEG+'F' }
    });
  }

  function updateResults(){
    scanAndPatch();
    tempEls.forEach(function(inp){
      try{ inp.dispatchEvent(new Event('input',{bubbles:true})) }catch(e){}
    });
    setTimeout(function(){
      resultEls = [];
      document.querySelectorAll('.res span, .rv').forEach(function(sp){
        var m = (sp.textContent||'').match(DEG_F);
        if(m){ sp._tempF = parseFloat(m[1]); resultEls.push(sp); }
      });
      convertAll();
    },300);
  }

  setTimeout(function(){
    scanAndPatch();
    if(unit==='C') convertAll();
  },400);
})();
