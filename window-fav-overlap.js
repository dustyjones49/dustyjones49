const { app, BrowserWindow } = require('electron');
const path = require('path');
const site = 'C:/Users/dusty/Documents/Default Project/website calc/windows-exe/site';
app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 390, height: 844, show: false, webPreferences: { contextIsolation: false, nodeIntegration: true } });
  win.webContents.once('did-finish-load', () => {
    setTimeout(() => {
      win.webContents.executeJavaScript(`
        (function(){
          var out = {};
          var header = document.getElementById('bcStickyHeader');
          var fav = document.getElementById('bcFavBar');
          out.header = header ? {top: header.getBoundingClientRect().top, bottom: header.getBoundingClientRect().bottom, height: header.offsetHeight} : 'none';
          out.fav = fav ? {top: fav.getBoundingClientRect().top, bottom: fav.getBoundingClientRect().bottom, height: fav.offsetHeight} : 'none';
          // search input position
          var search = document.querySelector('#bcStickyHeader input[type="search"]');
          out.search = search ? {top: search.getBoundingClientRect().top, bottom: search.getBoundingClientRect().bottom} : 'none';
          // overlap detection
          if(fav && search){
            var favT = fav.getBoundingClientRect().top;
            var searchB = search.getBoundingClientRect().bottom;
            out.overlap = favT < searchB ? ('OVERLAP by ' + (searchB - favT) + 'px') : 'no overlap (gap ' + (favT - searchB) + 'px)';
          }
          // force favorites to render with a stored fav
          localStorage.setItem('bc_favs', JSON.stringify([{id:'concrete-calculator',title:'Concrete Calculator',url:'./concrete-calculator/'}]));
          return out;
        })()
      `).then(r => {
        console.log('=== BEFORE FAVBAR RENDER (initial) ===');
        console.log(JSON.stringify(r, null, 2));
        // Now re-run favorites init to render bar, then measure again
        win.webContents.executeJavaScript(`
          (function(){
            if(window.__favInjected) return 'already';
            // reload favorites
            var s = document.createElement('script');
            s.src = './favorites.js';
            document.body.appendChild(s);
            window.__favInjected = true;
            return 'injected';
          })()
        `).then(()=>{
          setTimeout(()=>{
            win.webContents.executeJavaScript(`
              (function(){
                var out = {};
                var header = document.getElementById('bcStickyHeader');
                var fav = document.getElementById('bcFavBar');
                out.headerBottom = header ? header.getBoundingClientRect().bottom : 'none';
                out.favTop = fav ? fav.getBoundingClientRect().top : 'none';
                out.favBottom = fav ? fav.getBoundingClientRect().bottom : 'none';
                out.headerH = header ? header.offsetHeight : 'none';
                out.bodyPadTop = document.body.style.paddingTop;
                var search = document.querySelector('#bcStickyHeader input[type="search"]');
                out.searchBottom = search ? search.getBoundingClientRect().bottom : 'none';
                out.toolbar = document.querySelector('.bc-menu .toolbar');
                out.toolbarTop = out.toolbar ? out.toolbar.getBoundingClientRect().top : 'no toolbar';
                return out;
              })()
            `).then(r2 => {
              console.log('=== AFTER FAVBAR RENDER ===');
              console.log(JSON.stringify(r2, null, 2));
              app.exit(0);
            });
          }, 1200);
        });
      });
    }, 2500);
  });
  win.loadFile(path.join(site,'electrical-calculators','index.html'));
});
setTimeout(()=>{ console.log('TIMEOUT'); app.exit(0); }, 30000);