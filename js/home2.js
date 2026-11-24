/* ShikboLab 2.0 — হোমপেজের ক্লাস সিলেক্টর + ড্যাশবোর্ড + FAQ। শুধু localStorage (নিরাপদ নয়, গোপন তথ্য রাখা হয় না) */
(function(){
var L=[['১–৫ শ্রেণি','রঙিন ছবি, গল্প, সহজ কুইজ'],['৬–৮ শ্রেণি','ধারণা, মডেল, সহজ পরীক্ষা'],['৯–১০ শ্রেণি','পাঠ্যবই-ভিত্তিক ল্যাব, সূত্র, MCQ ও সৃজনশীল'],['১১–১২ শ্রেণি','উচ্চস্তরের ব্যাখ্যা ও হিসাব']];
function lv(c){return c<=5?0:c<=8?1:c<=10?2:3;}
function g(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function s(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function bn(n){return String(n).replace(/[0-9]/g,function(d){return '০১২৩৪৫৬৭৮৯'[d];});}
function today(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
/* সাম্প্রতিক ল্যাব রেকর্ড */
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';if(h.indexOf('chapters/')!==0)return;
 var r=[];try{r=JSON.parse(g('sl_recent')||'[]')||[];}catch(x){}
 var f=h.split('?')[0];r=r.filter(function(o){return o.f!==f;});r.unshift({f:f,d:today()});s('sl_recent',JSON.stringify(r.slice(0,8)));});
function title(f){var c=(window.CHAPTERS||[]).filter(function(x){return x.file===f;})[0];return c?c.title:f;}
function started(){var n=0;try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k.indexOf('sl_done_')===0){var o=JSON.parse(localStorage.getItem(k)||'{}');if(o&&Object.keys(o).length)n++;}}}catch(e){}return n;}
function xpLevel(x){var T=[[0,'নতুন অন্বেষক'],[100,'কৌতূহলী'],[300,'পরীক্ষক'],[700,'গবেষক'],[1500,'বিজ্ঞানী']],r=T[0],nx=null;for(var i=0;i<T.length;i++){if(x>=T[i][0]){r=T[i];nx=T[i+1]||null;}}return {n:r[1],lo:r[0],nx:nx};}
function classHTML(){var c=+g('sl_class')||0;
 var h='<section class="sec" id="myclass"><h2>🎓 তুমি কোন শ্রেণিতে পড়ো?</h2><p class="sub">শ্রেণি বেছে নাও। তোমার ব্রাউজারে সেভ থাকবে, কোনো রেজিস্ট্রেশন লাগবে না।</p><div class="h2box"><div class="clsrow" id="clsrow">';
 for(var i=1;i<=12;i++)h+='<button data-c="'+i+'"'+(c===i?' class="on"':'')+' aria-pressed="'+(c===i)+'">'+bn(i)+'</button>';
 h+='</div><div class="lvl" id="lvl"></div><div class="cmsg" id="cmsg" aria-live="polite"></div></div></section>';return h;}
function paint(){var c=+g('sl_class')||0,l=c?lv(c):-1,box=document.getElementById('lvl'),m=document.getElementById('cmsg');if(!box)return;
 box.innerHTML=L.map(function(a,i){return '<div'+(i===l?' class="on"':'')+'><b>'+a[0]+'</b>'+a[1]+'</div>';}).join('');
 var n=(window.CHAPTERS||[]).filter(function(x){return x.status==='live'&&!x.extra;}).length;
 if(!c){m.className='cmsg';m.innerHTML='শ্রেণি বেছে নিলে এখানে তোমার জন্য কী কী আছে জানাব।';}
 else if(l===2){m.className='cmsg ok';m.innerHTML='✅ <b>'+bn(c)+' শ্রেণি:</b> তোমার জন্য পাঠ্যবই-ভিত্তিক '+bn(n)+'টি অধ্যায় এখনই খোলা। "বিষয়" থেকে শুরু করো।';}
 else if(l<2){m.className='cmsg';m.innerHTML='🌱 <b>'+bn(c)+' শ্রেণি:</b> এই শ্রেণির জন্য আলাদা সহজ কনটেন্ট এখনো তৈরি হয়নি, আমরা ধাপে ধাপে বানাচ্ছি। এখনকার ল্যাবগুলো নবম-দশমের মানের, তাই কিছু অংশ কঠিন লাগতে পারে। কৌতূহল থেকে ঘুরে দেখতেই পারো, বিশেষ করে "বোনাস ল্যাব"।';}
 else{m.className='cmsg';m.innerHTML='🔭 <b>'+bn(c)+' শ্রেণি:</b> একাদশ-দ্বাদশের আলাদা কনটেন্ট এখনো তৈরি হয়নি। বর্তমান ল্যাবগুলো মৌলিক ধারণা ঝালিয়ে নিতে কাজে লাগবে।';}
 var row=document.getElementById('clsrow');if(row)row.querySelectorAll('button').forEach(function(b){var on=+b.dataset.c===c;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);});}
function dashHTML(){var xp=+g('sl_xp')||0,L2=xpLevel(xp),pct=L2.nx?Math.min(100,Math.round((xp-L2.lo)/(L2.nx[0]-L2.lo)*100)):100,r=[];try{r=JSON.parse(g('sl_recent')||'[]')||[];}catch(e){}
 var td=r.filter(function(o){return o.d===today();}).length,c=+g('sl_class')||0;
 var h='<section class="sec" id="dash"><h2>📊 আমার অগ্রগতি</h2><p class="sub">শুধু এই ডিভাইসের ব্রাউজারে সেভ হয়। ব্রাউজার ডেটা মুছলে হারিয়ে যাবে। নম্বর কম হলেও সমস্যা নেই, শেখাটাই আসল।</p><div class="h2box"><div class="dgrid">'
 +'<div class="dg"><small>শ্রেণি</small><b>'+(c?bn(c):'—')+'</b></div>'
 +'<div class="dg"><small>XP পয়েন্ট</small><b>'+bn(xp)+'</b></div>'
 +'<div class="dg"><small>কাজ শুরু করা অধ্যায়</small><b>'+bn(started())+'</b></div>'
 +'<div class="dg"><small>অন্বেষক স্তর</small><b style="font-size:20px">'+L2.n+'</b><div class="dbar"><i style="width:'+pct+'%"></i></div></div>'
 +'<div class="dg"><small>আজকের লক্ষ্য: ১টি ল্যাব খোলা</small><b style="font-size:20px">'+(td?'✅ হয়েছে':'🎯 চলো শুরু করি')+'</b></div></div>';
 h+=r.length?'<div class="rec"><span style="color:var(--muted)">সম্প্রতি দেখা:</span>'+r.slice(0,5).map(function(o){return '<a href="'+esc(o.f)+'">'+esc(title(o.f))+'</a>';}).join('')+'</div>':'<div class="rec"><span style="color:var(--muted)">এখনো কোনো ল্যাব খোলোনি। একটা অধ্যায় বেছে নাও 😊</span></div>';
 return h+'</div></section>';}
function moreHTML(){
 var q=[['ShikboLab কি ফ্রি?','মূল ল্যাব, নোট ও কুইজ ফ্রি এবং কোনো লগইন ছাড়াই খোলা যায়। স্কুল-কোচিংয়ের জন্য আলাদা প্ল্যান আছে।'],
 ['কোন শ্রেণির জন্য কনটেন্ট আছে?','এখন নবম-দশম শ্রেণির (NCTB) অধ্যায়ভিত্তিক ল্যাব আছে। অন্য শ্রেণির জন্য আলাদা কনটেন্ট এখনো নেই, ভবিষ্যতে ধাপে ধাপে যোগ হবে।'],
 ['ছবিগুলো কি বইয়ের ছবি?','না। অ্যানিমেশন ও ছবি আমার নিজের আঁকা শিক্ষামূলক চিত্র। বইয়ের পাশে রেখে মিলিয়ে নিও।'],
 ['আমার অগ্রগতি কোথায় সেভ হয়?','শুধু তোমার ব্রাউজারে (localStorage)। এটা নিরাপদ স্টোরেজ নয়, তাই কোনো গোপন তথ্য রাখা হয় না।'],
 ['রাসায়নিক পরীক্ষা কি বাড়িতে করা যাবে?','না। সব রাসায়নিক পরীক্ষা শুধু ভার্চুয়াল। বিপজ্জনক কোনো পরীক্ষা নিজে করতে যেও না, শিক্ষকের তত্ত্বাবধান ছাড়া নয়।']];
 return '<section class="sec" id="why"><h2>✨ কেন ShikboLab?</h2><p class="sub">শেখা আগে, সাজসজ্জা পরে।</p><div class="why">'
 +'<div><h4>🇧🇩 বাংলা আগে</h4><p>নোট, ব্যাখ্যা, কুইজ সব সহজ বাংলায়। বৈজ্ঞানিক শব্দ দরকার হলে ইংরেজি পাশে।</p></div>'
 +'<div><h4>🕹️ নিজে করে শেখা</h4><p>স্লাইডার নেড়ে, বাটন চেপে ফল দেখো, তারপর মিনি-কুইজে যাচাই করো।</p></div>'
 +'<div><h4>🔬 নির্ভুলতা আগে</h4><p>অনিশ্চিত কিছু থাকলে সেটা "আমার অনুমান" বলে লেখা থাকে। বানানো সংখ্যা বা ভুয়া তথ্য নেই।</p></div>'
 +'<div><h4>⚡ হালকা</h4><p>শুধু HTML, CSS ও JavaScript। আলাদা অ্যাপ বা পেইড API লাগে না।</p></div></div></section>'
 +'<section class="sec" id="faq"><h2>❓ সাধারণ প্রশ্ন</h2><div class="faq" style="margin-top:14px">'+q.map(function(a){return '<details><summary>'+a[0]+'</summary><p>'+a[1]+'</p></details>';}).join('')+'</div></section>'
 +'<section class="sec" id="about"><h2>ℹ️ পরিচিতি ও যোগাযোগ</h2><div class="abt" style="margin-top:14px"><div><h4>ShikboLab সম্পর্কে</h4><p style="color:var(--muted)">বাংলাভাষী শিক্ষার্থীদের জন্য বিজ্ঞান ইন্টারঅ্যাকটিভভাবে শেখার একটি স্বাধীন শিক্ষা-প্রকল্প। এটি ধাপে ধাপে বড় হচ্ছে।</p></div><div><h4>স্কুল / কোচিং</h4><p style="color:var(--muted)">প্ল্যান ও দাম দেখতে নিচের বাটন ব্যবহার করো।</p><p style="margin-top:8px"><a href="plans.html" style="color:#2a9d8f;font-weight:700">💎 প্ল্যান দেখো →</a></p></div></div></section>';}
window.home2=function(app){
 var mq=app.querySelector('.mq'),sub=app.querySelector('#subjects'),sch=app.querySelector('.sch'),w=document.createElement('div');
 if(mq&&sub){w.innerHTML=classHTML()+dashHTML();while(w.firstChild)app.insertBefore(w.firstChild,sub);}
 if(sch){var sec=sch.closest('.sec'),w2=document.createElement('div');w2.innerHTML=moreHTML();while(w2.firstChild)app.insertBefore(w2.firstChild,sec);}
 var row=document.getElementById('clsrow');if(row)row.onclick=function(e){var b=e.target.closest('button');if(!b)return;s('sl_class',b.dataset.c);paint();};
 paint();};
})();
