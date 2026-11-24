/* ShikboLab চ্যাপ্টার থিম স্ক্রিপ্ট: অ্যানিমেশন ও সুবিধা (js/theme.js) */
(function(){
 if(window.__thm)return;window.__thm=1;
 var thisScript=document.currentScript;
 var d=document,h=d.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var file=decodeURIComponent(location.pathname.split('/').pop()||'');
 var sub=/^phy/.test(file)?'physics':/^math/.test(file)?'math':/^bio/.test(file)?'biology':'chemistry';
 h.setAttribute('data-sub',sub);h.classList.add('th-on');
 var ICON={physics:'⚛️',chemistry:'🧪',math:'📐',biology:'🧬'};
 var BD='০১২৩৪৫৬৭৮৯';
 function en(s){return s.replace(/[০-৯]/g,function(c){return BD.indexOf(c);});}
 function ready(f){d.readyState==='loading'?d.addEventListener('DOMContentLoaded',f):f();}
 ready(function(){
  var b=d.body,i;
  /* পেছনের রং + অগ্রগতি বার */
  var bg=d.createElement('div');bg.className='th-bg';bg.innerHTML='<i></i><i></i><i></i>';b.insertBefore(bg,b.firstChild);
  var pr=d.createElement('div');pr.className='th-prog';b.appendChild(pr);
  /* হিরো ব্যানার */
  var cr=d.querySelector('.crumb'),ti=d.querySelector('.title');
  if(cr&&ti&&cr.parentNode===ti.parentNode){
   var hero=d.createElement('div');hero.className='th-hero';cr.parentNode.insertBefore(hero,cr);
   hero.innerHTML='<i class="o o1"></i><i class="o o2"></i><i class="o o3"></i><span class="ico">'+ICON[sub]+'</span>';
   hero.appendChild(cr);hero.appendChild(ti);
  }
  /* প্যানেলে রিভিল ও লাইভ ব্যাজ */
  var panels=[].slice.call(d.querySelectorAll('.panel'));
  panels.forEach(function(p){
   p.classList.add('th-rv');
   if(/^lab/.test(p.id)&&p.querySelector('canvas')){var s=d.createElement('span');s.className='th-live';s.textContent='লাইভ ল্যাব';p.appendChild(s);}
  });
  var qs=[].slice.call(d.querySelectorAll('.q'));qs.forEach(function(q){q.classList.add('th-rv');});
  var all=panels.concat(qs);
  if('IntersectionObserver' in window){
   var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('th-in');io.unobserve(x.target);}});},{threshold:.04,rootMargin:'0px 0px -40px 0px'});
   all.forEach(function(e){io.observe(e);});
  }else all.forEach(function(e){e.classList.add('th-in');});
  /* ট্যাব স্ক্রল-স্পাই */
  var tabs=d.querySelector('.tabs');
  if(tabs&&'IntersectionObserver' in window){
   var links={};[].forEach.call(tabs.querySelectorAll('a[href^="#"]'),function(a){links[a.getAttribute('href').slice(1)]=a;});
   var spy=new IntersectionObserver(function(en){en.forEach(function(x){
     if(x.isIntersecting&&links[x.target.id]){
      for(var k in links)links[k].classList.remove('on');
      var a=links[x.target.id];a.classList.add('on');
      if(tabs.scrollWidth>tabs.clientWidth)tabs.scrollTo({left:a.offsetLeft-tabs.clientWidth/2+a.clientWidth/2,behavior:'smooth'});
     }});},{rootMargin:'-35% 0px -55% 0px'});
   for(var k in links){var el=d.getElementById(k);if(el)spy.observe(el);}
  }
  /* রিপল */
  d.addEventListener('click',function(e){
   var t=e.target.closest&&e.target.closest('.btn,.opt');if(!t||rm)return;
   var r=t.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=d.createElement('span');sp.className='th-rip';
   sp.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';
   t.appendChild(sp);setTimeout(function(){sp.remove();},650);
  });
  /* কনফেটি */
  function confetti(n){
   if(rm)return;
   var c=d.createElement('canvas');c.className='th-conf';c.width=innerWidth;c.height=innerHeight;b.appendChild(c);
   var x=c.getContext('2d'),cols=['#2a9d8f','#e9a23b','#e76f51','#3f6fd1','#d64599'],P=[];
   for(i=0;i<n;i++)P.push({x:innerWidth/2+(Math.random()-.5)*200,y:innerHeight*.6,vx:(Math.random()-.5)*14,vy:-8-Math.random()*12,w:6+Math.random()*6,h:4+Math.random()*6,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[i%5]});
   var t0=performance.now();
   (function f(now){var t=now-t0;x.clearRect(0,0,c.width,c.height);
    P.forEach(function(p){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.globalAlpha=Math.max(0,1-t/2600);x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h);x.restore();});
    if(t<2600)requestAnimationFrame(f);else c.remove();})(t0);
  }
  var sc=d.getElementById('score');
  if(sc)new MutationObserver(function(){
   var m=en(sc.textContent||'').match(/(\d+)\s*\/\s*(\d+)/);
   if(m&&+m[2]>0)confetti(+m[1]/+m[2]>=.7?160:60);
  }).observe(sc,{childList:true,characterData:true,subtree:true});
  /* উপরে ফেরা বাটন + অগ্রগতি */
  var up=d.createElement('button');up.className='th-top';up.setAttribute('aria-label','উপরে যাও');up.textContent='↑';
  up.onclick=function(){scrollTo({top:0,behavior:rm?'auto':'smooth'});};b.appendChild(up);
  var tick=0;function onScroll(){if(tick)return;tick=requestAnimationFrame(function(){tick=0;
   var m=Math.max(1,h.scrollHeight-innerHeight);pr.style.transform='scaleX('+Math.min(1,scrollY/m)+')';up.classList.toggle('show',scrollY>700);});}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  /* আগের/পরের অধ্যায় */
  function buildNav(){
   var C=window.CHAPTERS;if(!C)return;
   var idx=-1;C.forEach(function(c,j){if(c.file&&c.file.split('/').pop()===file)idx=j;});
   if(idx<0)return;var cur=C[idx];
   var list=C.filter(function(c){return c.subject===cur.subject&&!!c.extra===!!cur.extra&&c.status==='live';});
   var k=list.indexOf(cur),pv=list[k-1],nx=list[k+1];if(!pv&&!nx)return;
   function nm(c){return c.title.replace(/^[^\wঀ-৿]+/u,'').replace(/\s*\((অধ্যায়[^)]*|বিশেষ)\)/,'');}
   var w=d.querySelector('.wrap')||b,nv=d.createElement('div');nv.className='th-nav';
   nv.innerHTML=(pv?'<a class="pv'+(nx?'':' only')+'" href="../'+pv.file+'"><small>← আগের</small><b>'+nm(pv)+'</b></a>':'')+(nx?'<a class="nx'+(pv?'':' only')+'" href="../'+nx.file+'"><small>পরের →</small><b>'+nm(nx)+'</b></a>':'');
   w.appendChild(nv);
  }
  /* ভার্চুয়াল ল্যাব স্টেজ (css/stage.css + js/lab-stage.js) */
  try{
   var base=(thisScript&&thisScript.src?thisScript.src.replace(/js\/theme\.js.*$/,''):'../');
   var lk=d.createElement('link');lk.rel='stylesheet';lk.href=base+'css/stage.css?v=3';d.head.appendChild(lk);
   var ls=d.createElement('script');ls.src=base+'js/lab-stage.js?v=5';d.head.appendChild(ls);
  }catch(e){}
  if(window.CHAPTERS)buildNav();
  else{var s=d.createElement('script');s.src='../js/chapters.js';s.onload=buildNav;d.head.appendChild(s);}
 });
})();
