(function(){
  // FieldMath - AdMob banner at the bottom of every page (native apps only)
  //
  // The REAL (live) ad unit is requested first. Once the AdMob account/app is
  // approved, it serves live ads automatically - no code change or resubmit.
  var REAL_BANNER_AD_ID = 'ca-app-pub-2608021392372978/8214562122';

  // Google's public TEST banner. Used ONLY as a fallback while the AdMob
  // account is still pending approval (Google blocks the real unit entirely
  // during that time - "Account not approved yet" - even on test devices).
  // Once approved, the real unit serves and this fallback never runs.
  var TEST_BANNER_AD_ID = 'ca-app-pub-3940256099942544/2934735716';

  // Optional: AdMob test device IDs. Once the app is approved, these devices
  // receive test ads instead of live ads (safe for your own testing).
  var TEST_DEVICES = ['B93AF3DA-47C5-41D2-9F21-B5C87BA90298'];

  // Only run inside the native Capacitor app
  if(typeof Capacitor === 'undefined' || !Capacitor.isNativePlatform || !Capacitor.isNativePlatform()){
    return;
  }

  var started = false;
  var AdMobPlugin = null;
  var usingTestFallback = false;

  function getPlugin(){
    if(AdMobPlugin) return AdMobPlugin;
    try {
      AdMobPlugin = Capacitor.Plugins.AdMob;
    } catch(e){ AdMobPlugin = null; }
    return AdMobPlugin;
  }

  // Bottom padding so the native banner never covers page content/footer,
  // plus a solid black bar under the banner down to the bottom of the screen.
  function reserveBannerSpace(){
    var BANNER_H = 60;
    var pad = document.createElement('style');
    pad.textContent =
      'body{padding-bottom:calc(env(safe-area-inset-bottom, 0px) + ' + (BANNER_H + 80) + 'px) !important}' +
      'footer, .footer{margin-bottom:calc(env(safe-area-inset-bottom, 0px) + ' + BANNER_H + 'px) !important}' +
      '#bcAdBar{position:fixed;left:0;right:0;bottom:0;height:calc(env(safe-area-inset-bottom, 0px) + ' + BANNER_H + 'px);background:#000;z-index:900;pointer-events:none}';
    document.head.appendChild(pad);
    if(!document.getElementById('bcAdBar')){
      var bar = document.createElement('div');
      bar.id = 'bcAdBar';
      document.body.appendChild(bar);
    }
  }

  function showBanner(adId){
    var p = getPlugin();
    if(!p){ console.error('[AdMob] plugin not available'); return; }
    var id = adId || (usingTestFallback ? TEST_BANNER_AD_ID : REAL_BANNER_AD_ID);
    p.showBanner({
      adId: id,
      adSize: 'ADAPTIVE_BANNER',
      position: 'BOTTOM_CENTER',
      margin: 0
    }).then(function(){
      console.log('[AdMob] showBanner ok, adId=' + id);
    }).catch(function(e){
      console.error('[AdMob] showBanner failed', e);
    });
  }

  function initAdMob(){
    if(started) return;
    started = true;
    var p = getPlugin();
    if(!p){ console.error('[AdMob] plugin not available'); return; }

    // Log banner lifecycle so problems are visible in the device console.
    try {
      p.addListener('bannerAdLoaded', function(){ console.log('[AdMob] bannerAdLoaded'); });
      p.addListener('bannerAdFailedToLoad', function(e){
        var msg = (e && e.message) || '';
        console.error('[AdMob] bannerAdFailedToLoad', e);
        // While the account/app is pending approval Google blocks the real unit
        // entirely; show the test banner so a banner is still visible. This
        // never triggers once the account is approved.
        if(!usingTestFallback && /not approved|not yet approved/i.test(msg)){
          usingTestFallback = true;
          console.log('[AdMob] account pending approval -> falling back to test banner');
          showBanner(TEST_BANNER_AD_ID);
        }
      });
      p.addListener('bannerAdSizeChanged', function(e){ console.log('[AdMob] bannerAdSizeChanged', e); });
    } catch(e){}

    // Register test devices (if any).
    var initOpts = {};
    if(TEST_DEVICES.length > 0){
      initOpts.initializeForTesting = true;
      initOpts.testingDevices = TEST_DEVICES;
    }

    p.initialize(initOpts)
      .then(function(){
        console.log('[AdMob] initialized, testDevices=' + TEST_DEVICES.length);
        try { p.requestTrackingAuthorization().catch(function(){}); } catch(e){}
        return p;
      })
      .then(function(){ showBanner(); })
      .catch(function(e){
        console.error('[AdMob] initialize failed', e);
      });
  }

  function start(){
    reserveBannerSpace();
    setTimeout(initAdMob, 400);
    document.addEventListener('visibilitychange', function(){
      if(!document.hidden && started){
        showBanner();
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();