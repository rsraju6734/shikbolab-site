/* ShikboLab ভার্চুয়াল ল্যাব স্টেজ (js/lab-stage.js): সব অধ্যায়ের প্রতিটি ল্যাবে কাজ করে */
(function(){
 'use strict';
 if(window.__lbs)return;window.__lbs=1;
 var d=document,h=d.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
 var file=decodeURIComponent(location.pathname.split('/').pop()||'');
 var sub=h.getAttribute('data-sub')||'physics';
 var BENCH={physics:['⚡','🧲','🔭'],chemistry:['🧪','⚗️','🔬'],math:['📐','📏','🧮'],biology:['🧬','🔬','🌱']}[sub]||['🔬','🧪','⚛️'];
 var BD='০১২৩৪৫৬৭৮৯';
 function bn(n){return String(n).replace(/\d/g,function(c){return BD[c];});}
 function en(s){return String(s).replace(/[০-৯]/g,function(c){return BD.indexOf(c);});}
 /* থামাও/চালাও: সব অ্যানিমেশন লুপ একসাথে */
 var paused=false,raf0=window.requestAnimationFrame;

 /* depth v3: soft shadow + glossy 3D shading on filled shapes (bounds tracked per path) */
 function FUT(){return document.documentElement.classList.contains('fut');}
 var reduce0=matchMedia('(prefers-reduced-motion: reduce)').matches,cnt=0;
 (function rs(){cnt=0;requestAnimationFrame(rs);})();
 var PALE=/^(#fff|#fefefe|#fafafa|#f[0-9a-f]{5}$|white|rgba?\(\s*2[45]\d)/i;
 function ok(c){var f=c.fillStyle;return typeof f==='string'&&!PALE.test(f)&&c.globalAlpha>=.6&&cnt<140;}
 function gloss(c,x0,y0,x1,y1){
  var w=x1-x0,h=y1-y0;if(!(w>7&&h>7)||w>420||h>420)return;cnt++;
  var g=c.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'rgba(255,255,255,.34)');g.addColorStop(.45,'rgba(255,255,255,.04)');g.addColorStop(1,'rgba(0,0,40,.20)');
  c.fillStyle=g;c.shadowColor='transparent';c.fillRect(x0-1,y0-1,w+2,h+2);
 }
 function depth(cv){
  var c=cv.getContext('2d');if(!c||c.__dp||reduce0)return;c.__dp=1;
  var f0=c.fill,fr0=c.fillRect,bp0=c.beginPath,mv0=c.moveTo,ln0=c.lineTo,ar0=c.arc,el0=c.ellipse,rc0=c.rect,qc0=c.quadraticCurveTo,bc0=c.bezierCurveTo,rr0=c.roundRect;
  var bx0=1e9,by0=1e9,bx1=-1e9,by1=-1e9;
  function P(x,y){if(x<bx0)bx0=x;if(x>bx1)bx1=x;if(y<by0)by0=y;if(y>by1)by1=y;}
  c.beginPath=function(){bx0=by0=1e9;bx1=by1=-1e9;return bp0.apply(this,arguments);};
  c.moveTo=function(x,y){P(x,y);return mv0.apply(this,arguments);};
  c.lineTo=function(x,y){P(x,y);return ln0.apply(this,arguments);};
  c.arc=function(x,y,r){P(x-r,y-r);P(x+r,y+r);return ar0.apply(this,arguments);};
  if(el0)c.ellipse=function(x,y,a,b){P(x-a,y-b);P(x+a,y+b);return el0.apply(this,arguments);};
  c.rect=function(x,y,w,h){P(x,y);P(x+w,y+h);return rc0.apply(this,arguments);};
  if(rr0)c.roundRect=function(x,y,w,h){P(x,y);P(x+w,y+h);return rr0.apply(this,arguments);};
  c.quadraticCurveTo=function(a,b,x,y){P(a,b);P(x,y);return qc0.apply(this,arguments);};
  c.bezierCurveTo=function(a,b,d,e,x,y){P(a,b);P(d,e);P(x,y);return bc0.apply(this,arguments);};
  c.fill=function(){
   var a=arguments;
   if(FUT()||(a.length&&typeof a[0]==='object')){return f0.apply(this,a);}
   var good=ok(this),b=[bx0,by0,bx1,by1];
   this.save();if(FUT()&&typeof this.fillStyle==='string'){this.shadowColor=this.fillStyle;this.shadowBlur=11;this.shadowOffsetX=0;this.shadowOffsetY=0;}else{this.shadowColor='rgba(20,40,80,.28)';this.shadowBlur=9;this.shadowOffsetX=1.5;this.shadowOffsetY=3.5;}f0.apply(this,a);this.restore();
   if(good&&b[2]>b[0]){this.save();this.clip();gloss(this,b[0],b[1],b[2],b[3]);this.restore();}
  };
  c.fillRect=function(x,y,w,h){
   if(FUT())return fr0.apply(this,arguments);
   var good=ok(this)&&w>10&&h>10&&w<420&&h<420;
   if(good){this.save();if(FUT()&&typeof this.fillStyle==='string'){this.shadowColor=this.fillStyle;this.shadowBlur=9;this.shadowOffsetX=0;this.shadowOffsetY=0;}else{this.shadowColor='rgba(20,40,80,.26)';this.shadowBlur=8;this.shadowOffsetX=1;this.shadowOffsetY=3;}fr0.apply(this,arguments);this.restore();
    this.save();this.beginPath();rc0.call(this,x,y,w,h);this.clip();gloss(this,x,y,x+w,y+h);this.restore();return;}
   return fr0.apply(this,arguments);
  };
 }
 window.requestAnimationFrame=function(cb){return raf0.call(window,function(t){if(paused){window.requestAnimationFrame(cb);return;}cb(t);});};
 /* সংরক্ষিত অগ্রগতি */
 var KEY='sl_done_'+file,done={},xp=0;
 try{done=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){}
 try{xp=+localStorage.getItem('sl_xp')||0;}catch(e){}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(done));localStorage.setItem('sl_xp',String(xp));}catch(e){}}
 var stages=[],panels=[];
 function ready(f){d.readyState==='loading'?d.addEventListener('DOMContentLoaded',f):f();}
 ready(function(){
  panels=[].slice.call(d.querySelectorAll('section[id^=lab]'));
  panels.forEach(function(p){
   [].slice.call(p.querySelectorAll('canvas')).forEach(function(cv,ci){
    try{depth(cv);}catch(e){}
   if(cv.closest('.lbs')||cv.classList.contains('lbo'))return;
   var st=d.createElement('div');st.className='lbs';
   st.innerHTML='<div class="lbh"><i></i><i class="l2"></i><i class="l3"></i><span class="lbt">ভার্চুয়াল ল্যাব</span><span class="lbx"><button type="button" data-a="p" title="থামাও / চালাও">⏸</button><button type="button" data-a="s" title="ছবি তোলো">📷</button><button type="button" data-a="f" title="বড় পর্দায় দেখো">⛶</button></span></div><div class="lbv"><div class="lbg"></div><div class="lbn"></div></div><div class="lbf"><span class="lbi">'+BENCH.map(function(e){return '<span>'+e+'</span>';}).join('')+'</span><span class="lbpips"><u></u><u></u><u></u><u></u><u></u></span><span class="lbxp">⭐ <b>'+bn(xp)+'</b> XP</span></div>';
   var tt=p.querySelector('h2');if(tt)st.querySelector('.lbt').textContent='ভার্চুয়াল ল্যাব · '+tt.textContent.replace(/^\S+\s*/,'').replace(/^ল্যাব\s*[০-৯0-9]+\s*[:：]\s*/,'').slice(0,34);
   cv.parentNode.insertBefore(st,cv);
   var v=st.querySelector('.lbv'),oc=d.createElement('canvas'),ox=oc.getContext('2d');
   oc.className='lbo';v.insertBefore(cv,v.firstChild);v.insertBefore(oc,v.querySelector('.lbg'));
   var S={el:st,p:p,cv:cv,oc:oc,ox:ox,vis:false,sp:[],mo:[],ok:0,pips:st.querySelectorAll('.lbpips u'),on:false};
   for(var i=0;i<12;i++)S.mo.push({x:Math.random(),y:Math.random(),r:1+Math.random()*2.4,s:.02+Math.random()*.05,o:Math.random()*6});
   if(!p.__lbs)p.__lbs=S;else{var pp=S.el.querySelector('.lbpips');if(pp)pp.remove();}
   S.first=(p.__lbs===S);stages.push(S);
   if(!p.querySelector('.lbclose')){var cb=d.createElement('button');cb.type='button';cb.className='lbclose';cb.textContent='✕ ছোট করো';cb.onclick=function(){full(p.__lbs,false);};p.insertBefore(cb,p.firstChild);}
   /* বাটন */
   st.querySelector('.lbx').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var a=b.getAttribute('data-a');
    if(a==='p'){setPause(!paused);}
    else if(a==='s'){snap(S);}
    else if(a==='f'){full(S,!p.classList.contains('lbfull'));}});
   /* টিল্ট ও গ্লেয়ার */
   if(fine&&!rm){
    st.addEventListener('pointermove',function(e){var r=st.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
     st.style.setProperty('--gx',(px*100)+'%');st.style.setProperty('--gy',(py*100)+'%');
     if(!p.classList.contains('lbfull'))st.style.transform='perspective(1000px) rotateY('+((px-.5)*7)+'deg) rotateX('+((.5-py)*7)+'deg)';});
    st.addEventListener('pointerleave',function(){st.style.transform='';});
   }
   fit(S);
   });
  });
  /* দৃশ্যমান হলে পাওয়ার-অন */
  if('IntersectionObserver' in window){
   var io=new IntersectionObserver(function(en){en.forEach(function(x){var S=x.target.__st;if(!S)return;S.vis=x.isIntersecting;if(x.isIntersecting&&!S.on){S.on=true;if(!rm)S.el.classList.add('lbon');}});},{threshold:.2});
   stages.forEach(function(S){S.el.__st=S;io.observe(S.el);});
  }else stages.forEach(function(S){S.vis=true;});
  if(window.ResizeObserver){var ro=new ResizeObserver(function(es){es.forEach(function(e){var S=e.target.__lbs;if(S)fit(S);});});stages.forEach(function(S){S.cv.__lbs=S;ro.observe(S.cv);});}
  addEventListener('resize',function(){stages.forEach(fit);});
  hero();paint();
  if(!rm)loop();
 });
 function fit(S){var r=S.cv.getBoundingClientRect();if(r.width>0){S.oc.width=Math.round(r.width);S.oc.height=Math.round(r.height);}}
 function setPause(v){paused=v;stages.forEach(function(S){var b=S.el.querySelector('[data-a=p]');b.classList.toggle('on',v);b.textContent=v?'▶':'⏸';});}
 /* কিছু নাড়ালে নিজে নিজে আবার চালু */
 d.addEventListener('input',function(e){if(paused&&e.target.closest&&e.target.closest('section[id^=lab]'))setPause(false);});
 d.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('section[id^=lab] .pills button,section[id^=lab] .btnrow button');if(paused&&t)setPause(false);});
 /* ছবি তোলা */
 function snap(S){
  try{
   var w=S.cv.width||380,hh=S.cv.height||300,c=d.createElement('canvas'),k=2;c.width=w*k;c.height=(hh+34)*k;
   var x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(S.cv,0,0,w*k,hh*k);
   x.fillStyle='#1f3a5f';x.fillRect(0,hh*k,c.width,34*k);x.fillStyle='#fff';x.font=(15*k)+'px "Hind Siliguri",sans-serif';x.textBaseline='middle';
   x.fillText('ShikboLab · '+(S.p.querySelector('h2')?S.p.querySelector('h2').textContent.slice(0,40):'ল্যাব'),12*k,(hh+17)*k);
   var a=d.createElement('a');a.download='shikbolab-'+S.p.id+'.png';a.href=c.toDataURL('image/png');d.body.appendChild(a);a.click();a.remove();
   burst(S,10,'#3f6fd1');
  }catch(e){}
 }
 /* বড় পর্দা */
 function full(S,on){
  S.p.classList.toggle('lbfull',on);h.style.overflow=on?'hidden':'';
  if(on)S.p.scrollTop=0;
  setTimeout(function(){fit(S);},60);
 }
 addEventListener('keydown',function(e){if(e.key==='Escape'){var f=d.querySelector('.panel.lbfull');if(f&&f.__lbs)full(f.__lbs,false);}});
 /* কুইজে ঠিক/ভুল */
 d.addEventListener('click',function(e){
  var b=e.target.closest&&e.target.closest('.cls button');if(!b)return;
  var o=b.parentNode,pid=(o.id||'').replace(/o$/,''),p=b.closest('section[id^=lab]'),S=p&&p.__lbs;if(!S||!pid)return;
  setTimeout(function(){
   var fb=d.getElementById(pid+'fb'),sc=d.getElementById(pid+'sc');if(!fb)return;
   var m=sc?en(sc.textContent).match(/(\d+)\s*\/\s*(\d+)/):null,ok=m?+m[1]:0,t=m?+m[2]:0;
   var good=/^✅/.test(fb.textContent);
   S.pips&&S.pips.forEach(function(u,i){u.classList.toggle('on',i<ok);});
   if(good){xp+=10;burst(S,26,'#22c55e');S.el.classList.remove('lbwin');void S.el.offsetWidth;S.el.classList.add('lbwin');}
   else{burst(S,10,'#e5484d');S.el.classList.remove('lbbad');void S.el.offsetWidth;S.el.classList.add('lbbad');}
   if(t>=3&&!done[p.id]){done[p.id]=1;xp+=20;}
   save();paint();
  },30);
 });
 function burst(S,n,col){if(rm)return;var W=S.oc.width,H=S.oc.height;for(var i=0;i<n;i++){var a=Math.random()*6.283,sp=1.5+Math.random()*3.5;S.sp.push({x:W/2,y:H/2,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,l:1,c:col,r:2+Math.random()*3});}}
 /* অগ্রগতি দেখানো */
 function paint(){
  d.querySelectorAll('.lbxp b').forEach(function(b){b.textContent=bn(xp);});
  var n=0;panels.forEach(function(p){var a=d.querySelector('.tabs a[href="#'+p.id+'"]');if(done[p.id]){n++;if(a)a.classList.add('lbdone');}});
  var q=d.querySelector('.lbq');if(q){q.querySelector('b').textContent=bn(n);q.querySelector('u').style.width=(panels.length?n/panels.length*100:0)+'%';q.querySelector('.xq').textContent=bn(xp);}
 }
 function hero(){
  var hr=d.querySelector('.th-hero');if(!hr||!panels.length)return;
  var q=d.createElement('div');q.className='lbq';q.innerHTML='<span>🏅 ল্যাব সম্পন্ন <b>০</b>/'+bn(panels.length)+'</span><i><u></u></i><span>⭐ <b class="xq">০</b> XP</span>';hr.appendChild(q);
 }
 /* ভাসমান কণা ও স্পার্ক */
 function loop(){
  stages.forEach(function(S){
   if(!S.vis)return;var x=S.ox,W=S.oc.width,H=S.oc.height;if(!W)return;x.clearRect(0,0,W,H);
   S.mo.forEach(function(m){m.y-=m.s*.01;m.o+=.03;if(m.y<-.05){m.y=1.05;m.x=Math.random();}x.globalAlpha=.18+.14*Math.sin(m.o);x.fillStyle='#8fb4ff';x.beginPath();x.arc(m.x*W+Math.sin(m.o)*6,m.y*H,m.r,0,7);x.fill();});
   for(var i=S.sp.length-1;i>=0;i--){var s=S.sp[i];s.x+=s.vx;s.y+=s.vy;s.vy+=.12;s.l-=.03;if(s.l<=0){S.sp.splice(i,1);continue;}x.globalAlpha=s.l;x.fillStyle=s.c;x.beginPath();x.arc(s.x,s.y,s.r*s.l+.5,0,7);x.fill();}
   x.globalAlpha=1;
  });
  window.requestAnimationFrame(loop);
 }
 /* স্লাইডারের রঙিন ট্র্যাক */
 function rngs(){d.querySelectorAll('input[type=range]').forEach(function(r){var mn=+r.min||0,mx=+r.max||100,p=mx>mn?(r.value-mn)/(mx-mn)*100:0;if(r.__p!==p){r.__p=p;r.style.setProperty('--p',p+'%');}});}
 setInterval(rngs,200);
})();
