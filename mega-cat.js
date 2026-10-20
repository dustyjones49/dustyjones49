(function(){
  // FieldMath - Professional vertical category navigation (Android)
  if(!document.querySelector('.mega-cat')) return;

  var pageKey = (location.pathname || '').toLowerCase();
  function isPage(name){ return pageKey.indexOf(name) > -1; }

  var categories;
  if(isPage('electrical')){
    categories = [
      { name:'Basics & Power', icon:'\u2699\ufe0f', kw:['watts','amps','kva','hp','power','ohm','resistor','capacitor','converter','voltage divider','phase','delta','impedance','load factor','diversity'] },
      { name:'Wire & Cable', icon:'\ud83d\udd0c', kw:['wire','voltage drop','ampacity','conductor','cable','neutral','tension','stress cone','submarine'] },
      { name:'Conduit & Enclosures', icon:'\ud83e\uddf1', kw:['conduit','box fill','cable tray','junction'] },
      { name:'Panels & Breakers', icon:'\ud83d\uddc4\ufe0f', kw:['panel','breaker','subpanel','branch','feeder','service','fault current'] },
      { name:'Motors & Drives', icon:'\u26a1', kw:['motor','overload','starter','efficiency','torque','flc','slip','vfd'] },
      { name:'Lighting', icon:'\ud83d\udca1', kw:['light','lumens','fixture','illuminance','led','lamp','recessed','track','lumen'] },
      { name:'Solar & Battery', icon:'\u2600\ufe0f', kw:['solar','battery','inverter','charge','pv','ups'] },
      { name:'Safety & Grounding', icon:'\ud83d\udee1\ufe0f', kw:['ground','arc','gfci','afci','surge','fault','boundary','electrode','bonding'] },
      { name:'Transformers', icon:'\ud83d\udd00', kw:['transformer','scc','short circuit'] },
    ];
  } else if(isPage('hvac')){
    categories = [
      { name:'Airflow & Duct', icon:'\ud83c\udf00', kw:['cfm','duct','velocity','friction','static','filter','register','diffuser','air changes','ventilation','exhaust','make-up','hood','sensible heat','total heat','infiltration','economizer','mixed air','coil','face velocity'] },
      { name:'Heating Load', icon:'\ud83d\udd25', kw:['heat loss','heating','furnace','btu','boiler','radiator'] },
      { name:'Cooling Load', icon:'\u2744\ufe0f', kw:['cooling','chiller','ton','ac','evaporator','condenser'] },
      { name:'Heat Pump', icon:'\u2668\ufe0f', kw:['heat pump','cop','seer','efficient','afue','er'] },
      { name:'Refrigerant', icon:'\ud83e\udeca', kw:['refrigerant','superheat','subcool','charge'] },
      { name:'Psychrometrics', icon:'\ud83d\udca7', kw:['humidity','dew point','enthalpy','grains','psychrom','wet bulb','dry bulb'] },
      { name:'Hydronics', icon:'\ud83d\udd27', kw:['hydronic','flow','pipe','boiler','steam','gpm'] },
      { name:'Insulation', icon:'\ud83e\uddf6', kw:['insulation','r-value','thickness'] },
    ];
  } else if(isPage('plumbing')){
    categories = [
      { name:'Water Supply', icon:'\ud83d\udebf', kw:['flow','pipe size','velocity','pressure','hammer','prv','booster','well pump','storage','expansion','softener','filter','uv','ro','recirc','mixing','scald','fixture flow','wsfu','peak demand','service pipe','temperature drop','heat trace'] },
      { name:'Drainage & Sewer', icon:'\ud83c\udf0a', kw:['drain','slope','dfu','vent','trap','cleanout','grease','sand','sump','ejector','sewer','storm','roof drain','area drain','catch','leaching','septic','drainfield','dosing','lift','backwater','aav','indirect'] },
      { name:'Gas Piping', icon:'\ud83d\udd25', kw:['gas','propane','meter','regulator','btu','connector','combustion','flue','vent','chimney','csst','pressure test','purge'] },
      { name:'Fire Protection', icon:'\ud83e\uddef', kw:['sprinkler','standpipe','hydrant','backflow','water meter'] },
      { name:'Specialty', icon:'\ud83d\udd27', kw:['irrigation','rainwater','greywater','expansion','pipe weight','support','thrust','chemical','boiler','cooling tower','chiller','steam','vacuum','compressed'] },
    ];
  } else if(isPage('structural')){
    categories = [
      { name:'Beams', icon:'\ud83e\udeB5', kw:['beam','moment','shear','deflection','cantilever','continuous','reaction','section modulus','inertia','bending','bearing','lvl','glulam','w-shape','hss','angle','channel','flitch','built-up','notched','tapered','point load','uniform load'] },
      { name:'Columns', icon:'\ud83c\udfdb\ufe0f', kw:['column','slenderness','euler','buckling','wood column','steel column','concrete column','effective length','k factor','axial','base plate','lally','pipe column','timber','stud','cripple','shear wall','hold-down','anchor'] },
      { name:'Footings & Foundations', icon:'\ud83e\uddf1', kw:['footing','foundation','bearing','overturning','sliding','eccentric','combined','strap','mat','pile','pier','helical','grade beam','retaining','gravity','cantilever wall','mse','gabion','sheet pile','soil nail'] },
      { name:'Loads & Codes', icon:'\ud83d\udcd0', kw:['dead load','live load','roof load','snow','wind','seismic','diaphragm','chord','collector','load combination','asd','lrfd','tributary','influence','uplift','lateral','surcharge'] },
    ];
  } else if(isPage('civil')){
    categories = [
      { name:'Grading & Earthwork', icon:'\u26f0\ufe0f', kw:['cut','fill','grading','berm','swale','grid','contour','stockpile','borrow','truck','compaction','swell','shrink','bulking','soil weight','proctor','cbr','bearing','permeability','infiltration','runoff','time of concentration','sheet flow','concentrated'] },
      { name:'Drainage & Stormwater', icon:'\ud83c\udf27\ufe0f', kw:['rational','pipe flow','open channel','culvert','inlet','gutter','storm','detention','retention','bioswale','rain garden','infiltration trench','drywell','check dam','riprap','scour','still','weir','orifice','underdrain','french','groundwater','flood'] },
      { name:'Paving & Roads', icon:'\ud83d\udee3\ufe0f', kw:['asphalt','base','subbase','pavement','esal','joint','dowel','tie bar','curb','sidewalk','driveway','ada','cross slope','superelevation','sight distance','curve','vertical curve','guardrail','sign','marking','tack'] },
      { name:'Environmental', icon:'\ud83c\udf31', kw:['sediment','silt','erosion','turf','seed','fertilizer','lime','mulch','compost','water quality','tss','nutrient','wetland','stream','floodplain','100-year','revET','gabion','turbidity','separator','chlorine','uv','aeration'] },
    ];
} else if(isPage('real-estate')){
    categories = [
      { name:'Mortgage & Loans', icon:'\ud83c\udfe6', kw:['payment','interest','amort','extra payment','biweekly','refinance','pmi','fha','va','jumbo','arm','interest-only','balloon','loan comparison','affordability','down payment','ltv','dti','piti','escrow','prepayment','buydown','points'] },
      { name:'Investment Analysis', icon:'\ud83d\udcc8', kw:['cap rate','cash on cash','grm','noi','irr','npv','1031','depreciation','cost segregation','brrrr','flip','wholesale','cash flow','vacancy','property management','maintenance','capex','rent','lease vs buy','moving','proceeds','closing'] },
      { name:'Tax & Legal', icon:'\ud83d\udcd1', kw:['property tax','assessment','homestead','deduction','capital gains','121','basis','exchange','energy credit','solar credit','historic','low-income','opportunity','professional','self-employment','llc','s-corp','title','survey','deed','recording','attorney','escrow','notary','stamp','intangible'] },
    ];
  } else if(isPage('design')){
    categories = [
      { name:'Furniture & Layout', icon:'\ud83d\udecb\ufe0f', kw:['furniture','clearance','traffic','conversation','dining','rug','sofa','tv','viewing','mount','artwork','curtain','rod','fullness','window treatment','picture','gallery','shelf','bookcase','closet','pantry','mudroom','bench','scale','focal','symmetry','proportion','negative space','layering','textile','pattern','vintage','traffic flow','seating','coffee table','end table','console','headboard','nightstand','dresser','desk','office','monitor','speaker','subwoofer','room mode','acoustic'] },
      { name:'Color & Paint', icon:'\ud83c\udfa8', kw:['paint','color','accent wall','ceiling color','scheme','warm','cool','natural light'] },
      { name:'Lighting', icon:'\ud83d\udca1', kw:['lamp','chandelier','pendant','recessed','sconce','picture light','undercabinet','cove','layers','dimmer','fixture','energy','skylight','glare'] },
      { name:'Kitchen & Bath', icon:'\ud83c\udf73', kw:['kitchen','work triangle','island','overhang','peninsula','counter','upper cabinet','hood','sink','dishwasher','trash','microwave','oven','cooktop','bathroom','vanity','mirror','towel','paper holder','grab bar','shower','niche','curbless','slope'] },
    ];
  } else if(isPage('safety')){
    categories = [
      { name:'Fire Protection', icon:'\ud83e\uddef', kw:['fire','occupancy','exit','egress','travel','corridor','door width','stair width','sign','emergency light','extinguisher','sprinkler','standpipe','alarm','smoke detector','heat detector','co detector','rating','separation','draft','block','flame spread','flash'] },
      { name:'Accessibility (ADA)', icon:'\u267f', kw:['ada','ramp','accessible','maneuvering','turning','reach','knee','toe','parking','van','aisle','sign','braille','pool lift','egress window'] },
      { name:'Structural Safety', icon:'\ud83c\udfd7\ufe0f', kw:['seismic','wind','flood','freeboard','anchorage','bolting','cripple','shear wall','nailing','hold-down','anchor','ledger','lateral','railing','handrail','stringer','roof tie','sheathing','bracing','portal','load path','soft story'] },
      { name:'Health & Environment', icon:'\ud83c\udf3f', kw:['ventilation','exhaust','radon','mold','humidity','lead','asbestos','silica','noise','stc','iic','daylight','thermal','voc','formaldehyde','clearance','air quality','water quality','backflow','legionella','pest','emf','light trespass'] },
    ];
  } else if(isPage('equipment')){
    categories = [
      { name:'Rental & Ownership', icon:'\ud83d\udcb0', kw:['rental','buy','cost per','fuel','maintenance','ownership','depreciation','resale','utilization','fleet','crew','labor','overtime','comp','downtime','standby','mobilization','demobilization','transport','rigging','crane'] },
      { name:'Production Rates', icon:'\ud83c\udfd7\ufe0f', kw:['rate','excavation','trenching','backfill','compaction','concrete pour','finishing','rebar','form','framing','drywall','painting','flooring','tile','roofing','siding','insulation','demolition','debris','dumpster','truck','haul','loader'] },
      { name:'Power & Fuel', icon:'\u26fd', kw:['generator','fuel','kwh','hp','motor','compressor','air tool','pneumatic','hydraulic','pump','conveyor','hoist','winch','jack','scaffold','ladder','manlift'] },
      { name:'Scheduling & Logistics', icon:'\ud83d\udcc5', kw:['duration','pert','critical path','leveling','balancing','lead time','eoq','safety stock','reorder','waste','delivery','concrete order','pump truck','mix truck','hoist','picks','erection','cycling','cure','weather','productivity','learning curve','shift'] },
    ];
  } else if(isPage('specialty')){
    categories = [
      { name:'Acoustics', icon:'\ud83d\udd0a', kw:['rt60','sabine','absorption','nrc','stc','iic','transmission','noise','barrier','attenuation','duct','silencer','nc','rc','intelligibility','privacy','masking','loudspeaker','amplifier','spl','octave','a-weighted'] },
      { name:'Thermal & Moisture', icon:'\ud83c\udf21\ufe0f', kw:['u-value','r-value','thermal','dew point','condensation','vapor','perm','drying','hygrothermal','sri','cool roof','thermal mass','phase change','radiant','attic','crawl space','basement','humidity','mold','psychrom','enthalpy'] },
      { name:'Lighting Design', icon:'\ud83d\udca1', kw:['lumens','fixture','illuminance','beam','throw','cri','cct','lpd','compliance','daylight','occupancy','dimming','controls','egress','stairwell','parking','sports','accent','task','uniformity','ugr','flicker','tm-30'] },
      { name:'Sustainability', icon:'\ud83c\udf0d', kw:['carbon','sequestration','operational','net zero','solar','wind','geothermal','rainwater','greywater','composting','living wall','green roof','passive','shading','ventilation','stack','berm','earth tube','hot water','pv','ev','eui','leed'] },
    ];
  } else {
    categories = [];
  }
  if(!categories.length) return;

var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  if(cards.length === 0) return;

  function findContainer(){
    // Prefer a real content wrapper if present
    var sel = document.querySelector('.c') ||
              document.querySelector('.container') ||
              document.querySelector('#calcContainer') ||
              document.querySelector('.content');
    if(sel) return sel;
    // Multi-grid pages (design/safety) have cards spread across <div class="grid"> siblings.
    if(cards.length){
      var firstParent = cards[0].parentNode;
      // If all cards share the same direct parent wrapper, use it
      var allSame = true;
      for(var i=0;i<cards.length;i++){
        if(cards[i].parentNode !== firstParent){ allSame = false; break; }
      }
      if(allSame && firstParent && firstParent !== document.body){
        return firstParent;
      }
      // Cards are spread across multiple grids/sections -> caller creates a fresh body mount
      return null;
    }
    return null;
  }

  function cardTitle(card){
    var h = card.querySelector('h3') || card.querySelector('.card-title');
    return h ? h.textContent : '';
  }

  var assigned = {};
  cards.forEach(function(card){
    var title = cardTitle(card).toLowerCase();
    var cat = null;
    for(var i=0;i<categories.length;i++){
      for(var j=0;j<categories[i].kw.length;j++){
        if(title.indexOf(categories[i].kw[j]) >= 0){ cat = categories[i].name; break; }
      }
      if(cat) break;
    }
    if(!card.id) card.id = 'bc' + cards.indexOf(card);
    assigned[card.id] = cat || 'Other';
  });

var used = categories.filter(function(c){
    return cards.some(function(cd){ return assigned[cd.id] === c.name });
  });
  var anyOther = cards.some(function(c){ return assigned[c.id] === 'Other' });
  if(anyOther) used.push({ name:'Other', icon:'\ud83d\udcda', kw:[] });

  function countIn(name){
    return cards.filter(function(cd){ return assigned[cd.id] === name }).length;
  }

  // Inject professional styles FIRST (used by both normal and fallback views)
  var css = document.createElement('style');
  css.textContent = `
.bc-menu{font-family:system-ui,sans-serif}
    .bc-menu .cat-list{display:flex;flex-direction:column;gap:10px;padding:0 14px 14px;width:100%;box-sizing:border-box}
    .bc-menu .cat-card{background:var(--card,#fff);border:1px solid var(--border,#e2e8f0);border-radius:12px;padding:14px 16px;cursor:pointer;transition:all .15s;box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;align-items:center;width:100%;box-sizing:border-box}
    .bc-menu .cat-card:active{transform:scale(.97);background:#fff7ed}
    .bc-menu .cat-card .cat-icon{font-size:1.6rem;margin-right:14px;flex-shrink:0}
    .bc-menu .cat-card .cat-body{flex:1;min-width:0}
.bc-menu .cat-card h3{font-size:1rem;margin:0 0 3px;color:var(--text,#1e293b)}
    .bc-menu .cat-card .cat-preview{font-size:.72rem;color:#94a3b8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .bc-menu .cat-card .chevron{color:#cbd5e1;font-size:1.2rem;flex-shrink:0;margin-left:6px}
    .bc-menu .show-all-row{padding:0 14px;margin-bottom:8px}
    .bc-menu .show-all{width:100%;padding:14px;background:linear-gradient(135deg,#f97316,#fb923c);color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 4px 10px rgba(249,115,22,.3)}
    .bc-menu .cat-header{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--card,#fff);border-bottom:1px solid var(--border,#e2e8f0)}
    .bc-menu .cat-header .back{background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--text,#1e293b);padding:2px 8px}
    .bc-menu .cat-header h3{font-size:1.05rem;margin:0;color:var(--text,#1e293b)}
    .bc-menu .cat-header .count{margin-left:auto;font-size:.72rem;color:#64748b;background:var(--muted,#f1f5f9);padding:3px 10px;border-radius:10px}
    .bc-menu .toolbar{display:flex;gap:8px;padding:10px 14px;position:sticky;top:134px;z-index:19;background:var(--card,#fff)}
    .bc-menu .toolbar input{flex:1;padding:10px 12px;border:2px solid var(--border,#e2e8f0);border-radius:10px;font-size:.9rem;background:var(--card,#fff);color:var(--text,#1e293b);outline:none}
    .bc-menu .toolbar input:focus{border-color:#f97316}
    .bc-menu .cards-view{padding:0 14px 20px;width:100%;box-sizing:border-box}
    .bc-menu .cards-view .card{display:none}
    .bc-menu .cards-view .card.show{display:block;animation:fadeIn .2s}
    @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
    .bc-menu .empty-msg{text-align:center;color:#94a3b8;padding:30px 16px;font-size:.9rem}
    .bc-topbar{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--card,#fff);border-bottom:1px solid var(--border,#e2e8f0)}
    .bc-topbar a,.bc-topbar button{background:none;border:none;color:var(--orange,#f97316);font-size:.9rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:4px}
  `;
  document.head.appendChild(css);

  // FALLBACK: if categorization effectively failed (all "Other" or <2 real categories),
  // show the calculators directly with a search box instead of a menu.
  var realUsed = used.filter(function(c){ return c.name !== 'Other'; });
  var onlyOther = realUsed.length <= 1;
if(onlyOther){
    var containerF = findContainer();
    if(!containerF){
      containerF = document.createElement('div');
      containerF.id = 'bcMenuMount';
      var headerEl = document.querySelector('header');
      if(headerEl && headerEl.parentNode) headerEl.parentNode.insertBefore(containerF, headerEl.nextSibling);
      else document.body.insertBefore(containerF, document.body.firstChild);
    }
    var wrapF = document.createElement('div');
    wrapF.className = 'bc-menu';
wrapF.innerHTML = `
      <div class="cards-view"></div>
    `;
    var vF = wrapF.querySelector('.cards-view');
    cards.forEach(function(c){ c.classList.add('show'); c.style.display=''; vF.appendChild(c); });
    containerF.innerHTML = '';
    containerF.appendChild(wrapF);
    // Clean legacy content
    document.querySelectorAll('.section-title, .cat-title, .grid, .footer').forEach(function(el){
      if(el === containerF || el.id === 'bcMenuMount') return;
      el.parentNode && el.parentNode.removeChild(el);
    });
    return;
  }

// Detach cards into hidden holder
  var cardsHolder = document.createElement('div');
  cardsHolder.id = 'bcCardsHolder';
  cardsHolder.style.display = 'none';

// Build views
  // IMPORTANT: resolve container BEFORE moving cards to holder (findContainer inspects card parents)
  var container = findContainer();
  var useBodyMount = false;
  if(container && container !== document.body){
    container.innerHTML = '';
  } else {
    // Cards are spread across body-level siblings (design/safety multi-grid).
    // Create a fresh mount div after the header instead of clearing body.
    useBodyMount = true;
    container = document.createElement('div');
    container.id = 'bcMenuMount';
    var headerEl = document.querySelector('header');
    if(headerEl && headerEl.parentNode){
      headerEl.parentNode.insertBefore(container, headerEl.nextSibling);
    } else {
      document.body.insertBefore(container, document.body.firstChild);
    }
  }
  // Now move cards into the holder
  cards.forEach(function(c){ cardsHolder.appendChild(c); });

  // Remove leftover legacy content: section-titles, card grids, and old footer text.
  // Never remove the mount container or the header.
  function cleanLegacy(){
    document.querySelectorAll('.section-title, .cat-title').forEach(function(el){ el.parentNode && el.parentNode.removeChild(el); });
    document.querySelectorAll('.grid').forEach(function(el){
      if(el.id === 'bcMenuMount') return;
      var isMount = el === container;
      if(isMount) return;
      el.parentNode && el.parentNode.removeChild(el);
    });
    // Remove the old ".footer" text divs (e.g. "100 ... - All calculations run locally")
    document.querySelectorAll('.footer').forEach(function(el){
      var t = (el.textContent || '').toLowerCase();
      if(t.indexOf('run locally') > -1 || t.indexOf('calculators - all') > -1 || t.indexOf('all calculations') > -1){
        el.parentNode && el.parentNode.removeChild(el);
      }
    });
  }
  cleanLegacy();

var gridView = document.createElement('div');
  gridView.className = 'bc-menu';
  gridView.innerHTML = `
    <div class="cat-list"></div>
    <div class="show-all-row"><button class="show-all">Show All Calculators</button></div>
  `;

var catList = gridView.querySelector('.cat-list');
used.forEach(function(cat){
    if(countIn(cat.name) === 0) return; // skip empty categories
    var firstTwo = cards.filter(function(cd){ return assigned[cd.id] === cat.name }).slice(0,2).map(function(cd){
      return cardTitle(cd).replace(/^\d+\.\s*/,'');
    });
    var card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML = `
      <span class="cat-icon">${cat.icon}</span>
<div class="cat-body">
        <h3>${cat.name}</h3>
        <div class="cat-preview">${firstTwo.join(' \u00b7 ')}</div>
      </div>
      <span class="chevron">\u203a</span>
    `;
    card.onclick = function(){ showCategory(cat.name); };
    catList.appendChild(card);
  });

var detailView = document.createElement('div');
  detailView.className = 'bc-menu';
  detailView.style.display = 'none';
  detailView.innerHTML = `
    <div class="cat-header">
<button class="back" aria-label="Back">\u2190</button>
      <h3></h3>
    </div>
    <div class="cards-view"></div>
  `;

  var detailHeader = detailView.querySelector('.cat-header h3');
  var detailCards = detailView.querySelector('.cards-view');

  detailView.querySelector('.back').onclick = function(){
    detailView.style.display = 'none';
    gridView.style.display = 'block';
    window.scrollTo({top:0,behavior:'smooth'});
  };

function showCategory(name){
    gridView.style.display = 'none';
    detailView.style.display = 'block';
    detailHeader.textContent = name;
    var catCards = cards.filter(function(c){ return assigned[c.id] === name });
    detailCards.innerHTML = '';
    catCards.forEach(function(c){
      c.classList.add('show');
      c.style.display = '';
      detailCards.appendChild(c);
    });
    var empty = document.createElement('p');
    empty.className = 'empty-msg';
    empty.textContent = catCards.length ? 'No results found' : 'No calculators in this category';
    empty.style.display = catCards.length ? 'none' : 'block';
    detailCards.appendChild(empty);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  gridView.querySelector('.show-all').onclick = function(){
    gridView.style.display = 'none';
    detailView.style.display = 'block';
detailHeader.textContent = 'All Calculators';
    detailCards.innerHTML = '';
    cards.forEach(function(c){ c.classList.add('show'); c.style.display=''; detailCards.appendChild(c); });
    var empty = document.createElement('p');
    empty.className = 'empty-msg';
    empty.textContent = 'No results found';
    empty.style.display = 'none';
    detailCards.appendChild(empty);
    window.scrollTo({top:0,behavior:'smooth'});
  };

  container.appendChild(gridView);
  container.appendChild(detailView);
  container.appendChild(cardsHolder);
})();


