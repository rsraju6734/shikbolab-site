/* ShikboLab সাইট কনফিগ (Phase 8): ব্যানার, ঘোষণা, যোগাযোগ, মেইন্টেন্যান্স পর্দা।
   সব লেখা textContent দিয়ে বসে, তাই অ্যাডমিনের ইনপুটে কোড চলবে না।
   ⚠️ মেইন্টেন্যান্স শুধু একটা পর্দা, আসল তালা নয়। */
(function(){
 var C=window.SL_CONTENT,d=document;if(!C||/admin\.html/.test(location.pathname))return;
 var S=C.site||{},now=Date.now(),COL={info:['#e8f1ff','#1f3a5f'],warn:['#fff1d6','#7a4a00'],good:['#e1f5ee','#0b5d4f']};
 function el(t,css,txt){var e=d.createElement(t);if(css)e.style.cssText=css;if(txt!=null)e.textContent=txt;return e;}
 function get(k){try{return localStorage.getItem(k);}catch(e){return null;}}
 function set(k,v){try{localStorage.setItem(k,v);}catch(e){}}
 function ready(f){if(d.body)f();else d.addEventListener('DOMContentLoaded',f);}
 function strip(txt,lv,id){
  var c=COL[lv]||COL.info,b=el('div','display:flex;gap:10px;align-items:center;justify-content:center;padding:9px 14px;font:600 15px "Hind Siliguri",sans-serif;background:'+c[0]+';color:'+c[1]+';border-bottom:1px solid rgba(0,0,0,.08)');
  b.setAttribute('role','status');b.appendChild(el('span','flex:1;text-align:center',txt));
  if(id){var x=el('button','border:0;background:transparent;color:inherit;font-size:18px;cursor:pointer','✕');x.setAttribute('aria-label','বন্ধ করো');x.onclick=function(){set('sl_dis_'+id,'1');b.remove();};b.appendChild(x);}
  return b;
 }
 function grade(){var g=+get('sl_class')||0;return g;}
 function forMe(a){if(!a.classes||!a.classes.length)return true;var g=grade();if(!g)return true;return (C.classes||[]).some(function(c){return a.classes.indexOf(c.id)>-1&&g>=c.from&&g<=c.to;});}
 ready(function(){
  var preview=/[?&]preview=1/.test(location.search);
  var top=el('div','position:relative;z-index:50');
  if(S.banner&&S.banner.on&&S.banner.text)top.appendChild(strip(String(S.banner.text),S.banner.level));
  (C.announcements||[]).forEach(function(a){
   if(!a||a.active===false||!a.id||!a.title)return;if(a.from&&a.from>now)return;if(a.until&&a.until<now)return;if(!forMe(a))return;if(get('sl_dis_'+a.id))return;
   top.appendChild(strip(String(a.title)+' — '+String(a.body||''),a.level,String(a.id).replace(/[^a-z0-9]/gi,'')));
  });
  if(top.childNodes.length)d.body.insertBefore(top,d.body.firstChild);
  var ct=S.contact||{};
  if(ct.phone||ct.email||ct.address){
   var f=el('footer','margin:30px auto 0;padding:18px 16px;max-width:900px;text-align:center;color:#5b6b78;font:500 14.5px "Hind Siliguri",sans-serif;border-top:1px solid #e3eaf0');
   f.appendChild(el('b','color:#1f3a5f;display:block;margin-bottom:4px',String(S.name||'ShikboLab')+' — যোগাযোগ'));
   if(ct.phone)f.appendChild(el('div','','📞 '+ct.phone));
   if(ct.email)f.appendChild(el('div','','✉️ '+ct.email));
   if(ct.address)f.appendChild(el('div','','📍 '+ct.address));
   d.body.appendChild(f);
  }
  if(S.maintenance&&S.maintenance.on&&!preview){
   var o=el('div','position:fixed;inset:0;z-index:99999;background:#f4f8fb;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font:600 20px "Hind Siliguri",sans-serif;color:#1f3a5f');
   var b=el('div','max-width:520px');b.appendChild(el('div','font-size:64px','🛠️'));b.appendChild(el('div','margin-top:8px',String(S.maintenance.message||'সাইটে কাজ চলছে, একটু পরে আসো।')));o.appendChild(b);d.body.appendChild(o);
  }
 });
})();
