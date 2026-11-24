/* ShikboLab - lab-boost.js
   সব অধ্যায়ে: (১) অ্যানিমেশনের গতি নিয়ন্ত্রণ, (২) canvas পরিষ্কার ও একটু বড়, (৩) ছোট লেখা বড় */
(function () {
  'use strict';
  var sc = document.currentScript;
  var HID = !(sc && sc.getAttribute('data-hidpi') === '0');

  /* ---------- ১) গতি নিয়ন্ত্রণ ---------- */
  var LV = [
    { n: 'খুব ধীর', fps: 21 },
    { n: 'ধীর', fps: 30 },
    { n: 'মাঝারি', fps: 45 },
    { n: 'স্বাভাবিক', fps: 60 }
  ];
  var cur = 2;
  try {
    var sv = localStorage.getItem('sl_speed2');
    if (sv !== null && LV[+sv]) cur = +sv;
  } catch (e) {}

  var nat = window.requestAnimationFrame.bind(window);
  var natC = window.cancelAnimationFrame.bind(window);
  var q = {}, qid = 0, acc = 0, lastTs = 0, armed = false;

  function arm() {
    if (armed) return;
    armed = true;
    nat(pump);
  }
  function pump(ts) {
    armed = false;
    var dt = lastTs ? ts - lastTs : 16.7;
    lastTs = ts;
    if (dt > 100 || dt < 0) dt = 16.7;
    acc += dt;
    var step = 1000 / LV[cur].fps;
    if (acc >= step - 0.6) {
      acc -= step;
      if (acc > step) acc = 0;
      var cbs = q;
      q = {};
      for (var id in cbs) {
        try { cbs[id](ts); } catch (err) { (function (e) { setTimeout(function () { throw e; }); })(err); }
      }
    }
    for (var k in q) { arm(); break; }
  }
  window.requestAnimationFrame = function (cb) {
    var id = ++qid;
    q[id] = cb;
    arm();
    return id;
  };
  window.cancelAnimationFrame = function (id) {
    delete q[id];
  };

  /* ---------- ২) পরিষ্কার (HiDPI) ও একটু বড় canvas ---------- */
  var dpr = Math.min(window.devicePixelRatio || 1, 3);
  var proto = HTMLCanvasElement.prototype;
  if (HID) {
    var gc = proto.getContext;
    var wd = Object.getOwnPropertyDescriptor(proto, 'width');
    var hd = Object.getOwnPropertyDescriptor(proto, 'height');
    proto.getContext = function (type, opt) {
      var c = this;
      if (type === '2d' && !c.__lb && c.isConnected) {
        var L = { w: wd.get.call(c), h: hd.get.call(c) };
        var S = Math.min(1.3, 560 / L.w);
        if (S < 1) S = 1;
        var k = Math.min(dpr * S, document.documentElement.classList.contains('fut') ? 1.25 : 4);
        c.__lb = L;
        var ctx = gc.call(c, type, opt);
        var apply = function () {
          wd.set.call(c, Math.round(L.w * k));
          hd.set.call(c, Math.round(L.h * k));
          ctx.setTransform(k, 0, 0, k, 0, 0);
        };
        Object.defineProperty(c, 'width', {
          get: function () { return L.w; },
          set: function (v) { L.w = +v || 0; apply(); },
          configurable: true
        });
        Object.defineProperty(c, 'height', {
          get: function () { return L.h; },
          set: function (v) { L.h = +v || 0; apply(); },
          configurable: true
        });
        c.style.width = Math.round(L.w * S) + 'px';
        c.style.maxWidth = '100%';
        c.style.height = 'auto';
        apply();
        return ctx;
      }
      return gc.call(c, type, opt);
    };
  }

  /* ---------- ৩) খুব ছোট লেখা বড় করা (কমপক্ষে ১১px) ---------- */
  try {
    var fd = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'font');
    Object.defineProperty(CanvasRenderingContext2D.prototype, 'font', {
      get: function () { return fd.get.call(this); },
      set: function (v) {
        if (typeof v === 'string') {
          v = v.replace(/(\d+(?:\.\d+)?)px/, function (m, n) { return (+n < 11 ? 11 : n) + 'px'; });
        }
        fd.set.call(this, v);
      },
      configurable: true
    });
  } catch (e) {}

  /* ---------- গতি বাটন ---------- */
  function ui() {
    if (document.getElementById('slSpd')) return;
    var st = document.createElement('style');
    st.textContent =
      '#slSpd{position:fixed;left:12px;bottom:12px;z-index:9990;font-family:"Hind Siliguri",system-ui,sans-serif}' +
      '#slSpd .b{background:#fff;border:1.5px solid #cfd8e6;border-radius:999px;padding:7px 14px;font-size:14px;font-weight:600;color:#1f3a5f;cursor:pointer;box-shadow:0 6px 18px rgba(31,58,95,.18);font-family:inherit}' +
      '#slSpd .m{display:none;margin-bottom:8px;background:#fff;border:1.5px solid #cfd8e6;border-radius:16px;padding:8px;box-shadow:0 10px 26px rgba(31,58,95,.22)}' +
      '#slSpd.o .m{display:block}' +
      '#slSpd .m div{font-size:12px;color:#667;margin:0 4px 6px}' +
      '#slSpd .m button{display:block;width:100%;text-align:left;border:0;background:#f2f6fb;margin:3px 0;padding:8px 12px;border-radius:10px;font-size:14px;font-family:inherit;cursor:pointer;color:#1f3a5f}' +
      '#slSpd .m button.on{background:#1f3a5f;color:#fff;font-weight:700}';
    document.head.appendChild(st);
    var box = document.createElement('div');
    box.id = 'slSpd';
    box.innerHTML = '<div class="m"><div>অ্যানিমেশনের গতি</div></div><button class="b" type="button"></button>';
    var m = box.querySelector('.m'), b = box.querySelector('.b');
    function paint() {
      b.textContent = '⏱ গতি: ' + LV[cur].n;
      var bs = m.querySelectorAll('button');
      for (var i = 0; i < bs.length; i++) bs[i].className = i === cur ? 'on' : '';
    }
    LV.forEach(function (l, i) {
      var x = document.createElement('button');
      x.type = 'button';
      x.textContent = (['🐢 ', '🚶 ', '🚴 ', '🏃 '][i]) + l.n;
      x.onclick = function () {
        cur = i;
        acc = 0;
        try { localStorage.setItem('sl_speed2', String(i)); } catch (e) {}
        paint();
        box.className = '';
      };
      m.appendChild(x);
    });
    b.onclick = function () { box.className = box.className ? '' : 'o'; };
    document.body.appendChild(box);
    paint();
  }
  if (document.body) ui();
  else document.addEventListener('DOMContentLoaded', ui);
})();
