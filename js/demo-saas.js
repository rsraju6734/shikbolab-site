/* ShikboLab ডেমো প্ল্যান সিস্টেম (js/demo-saas.js)
   ⚠️ সবকিছু শুধু ব্রাউজারের localStorage-এ থাকে। এটা শুধু ডেমো দেখানোর জন্য, আসল সিকিউরিটি নয়। */
(function(){
 if(window.SL)return;
 var d=document,inCh=/\/chapters\/[^\/]*$/.test(location.pathname),B=inCh?'../':'';
 if(!window.SL_CONTENT&&d.readyState==='loading')d.write('<script src="'+B+'js/content.js"><\/script>');
 /* ====== এখানে দাম, লিমিট, ফ্রি অধ্যায় বদলাতে পারবে ====== */
 var CFG={
  TRIAL_DAYS:7,
  TRIAL_CH:[],
  SUBJECTS:{chemistry:'রসায়ন',physics:'পদার্থবিজ্ঞান',math:'গণিত',biology:'জীববিজ্ঞান'},
  CUSTOM_MAX:30,
  /* ক্লাসের দল: ৬, ৭, ৮ আলাদা; ৯–১০ একসাথে; ১১–১২ একসাথে। price = স্টুডেন্ট প্ল্যানের দাম (এই ক্লাসের জন্য)। units = স্কুলের দাম হিসাবের ওজন */
  CLASSES:[
   {id:'c6',from:6,to:6,units:1,price:{month:79,week:28}},
   {id:'c7',from:7,to:7,units:1,price:{month:79,week:28}},
   {id:'c8',from:8,to:8,units:1,price:{month:89,week:31}},
   {id:'c910',from:9,to:10,units:2,price:{month:99,week:35}},
   {id:'c1112',from:11,to:12,units:2,price:{month:129,week:45}}
  ],
  FAMILY_EXTRA:{month:50,week:18}, /* ফ্যামিলি প্ল্যানে প্রথম ক্লাসের পর প্রতিটি বাড়তি ক্লাসের দাম */
  FAMILY_MAX_CLASSES:4,
  SCHOOL_BASE_UNITS:5, /* স্কুল প্ল্যানের দাম ধরা আছে ৬–১০ শ্রেণির (৫ ইউনিট) জন্য। কম/বেশি ক্লাস হলে সেই অনুপাতে বদলায় */
  FREE:['chem-concepts-of-chemistry','phy-physical-quantities','math-functions-graphs','bio-heredity-mendel','chem-x-lab-safety'],
  PAY:{bkash:'01719531952',nagad:'01719531952',wa:'8801719531952'},
  INSTANT:false, /* true = ডেমোতে পেমেন্ট দিলেই সাথে সাথে চালু। false = শুধু অ্যাডমিনকে অনুরোধ পাঠানো যাবে (আসল ম্যানুয়াল মোড) */
  CLOUD_URL:'https://script.google.com/macros/s/AKfycbzDjzjHrSpkBWDABQbt9FDQ7fpUEqc858vnzn2SozXpMiTe0daRqaB7k1KBR3R2Djj8/exec', /* ক্লাউড চালু করতে এখানে Google Apps Script-এর Web App URL বসাও। খালি থাকলে আগের মতো শুধু ব্রাউজারে সেভ হবে */
  PLANS:{
   student:{key:'student',name:'স্টুডেন্ট প্ল্যান',emoji:'🎒',desc:'একজন শিক্ষার্থীর জন্য',students:1,teachers:0,devices:2,price:{month:99,week:35},color:'#2a9d8f'},
   family:{key:'family',name:'ফ্যামিলি প্ল্যান',emoji:'👨‍👩‍👧‍👦',desc:'পরিবারের ৪ জন পর্যন্ত, একাধিক ক্লাস',students:4,teachers:0,devices:4,price:{month:249,week:89},color:'#3f6fd1'},
   custom:{key:'custom',name:'কাস্টম প্ল্যান',emoji:'🧩',desc:'জন ও বিষয় নিজে বেছে নাও (জনপ্রতি, বিষয়প্রতি দাম)',students:30,teachers:0,devices:2,price:{month:25,week:9},color:'#8a6d1d',custom:true},
   school:{key:'school',name:'স্কুল প্ল্যান',emoji:'🏫',desc:'স্কুল ও কোচিং সেন্টারের জন্য',students:100,teachers:5,devices:5,price:{month:1999,week:699},color:'#e76f51',isSchool:true},
   school300:{key:'school300',name:'স্কুল প্ল্যান ৩০০',emoji:'🏫',desc:'মাঝারি স্কুল ও কোচিং সেন্টার',students:300,teachers:15,devices:10,price:{month:3499,week:1225},color:'#d6603f',isSchool:true,big:true},
   school500:{key:'school500',name:'স্কুল প্ল্যান ৫০০',emoji:'🏛️',desc:'বড় স্কুল ও কলেজ',students:500,teachers:25,devices:15,price:{month:4999,week:1749},color:'#b24a8c',isSchool:true,big:true},
   school1000:{key:'school1000',name:'স্কুল প্ল্যান ১০০০',emoji:'🏙️',desc:'অনেক বড় প্রতিষ্ঠান',students:1000,teachers:50,devices:25,price:{month:7999,week:2799},color:'#7a3fb0',isSchool:true,big:true}
  }
 };
 var CLOUD=CFG.CLOUD_URL||'';if(CLOUD)CFG.INSTANT=false;
 function applyPrices(src){if(src&&src.classes)CFG.CLASSES.forEach(function(c){var o=src.classes[c.id];if(o){if(o.month>=0)c.price.month=+o.month;if(o.week>=0)c.price.week=+o.week;}});if(src&&src.familyExtra){if(src.familyExtra.month>=0)CFG.FAMILY_EXTRA.month=+src.familyExtra.month;if(src.familyExtra.week>=0)CFG.FAMILY_EXTRA.week=+src.familyExtra.week;}if(!src||!src.plans)return;Object.keys(src.plans).forEach(function(k){var p=CFG.PLANS[k],o=src.plans[k];if(!p||!o)return;if(o.month>=0)p.price.month=+o.month;if(o.week>=0)p.price.week=+o.week;p.disc=Math.min(90,Math.max(0,+o.disc||0));p.dlabel=o.label||'';p.duntil=+o.until||0;});}
 applyPrices(window.SL_PRICES);
 function applyContent(){var c=window.SL_CONTENT;if(!c)return;CFG.TRIAL_CH=Array.isArray(c.trialChapters)?c.trialChapters.map(String):[];if(+c.trialDays>0)CFG.TRIAL_DAYS=Math.min(90,+c.trialDays);if(Array.isArray(c.freeChapters)&&c.freeChapters.length)CFG.FREE=c.freeChapters.map(String);
  (Array.isArray(c.plans)?c.plans:[]).forEach(function(o){if(!o||!/^[a-z0-9_]{1,24}$/.test(String(o.key||'')))return;var p=CFG.PLANS[o.key]||(CFG.PLANS[o.key]={key:o.key,emoji:'📦',color:'#3f6fd1',students:1,teachers:0,devices:2,price:{month:0,week:0}});
   ['name','emoji','desc','color'].forEach(function(f){if(typeof o[f]==='string'&&o[f])p[f]=o[f];});['students','teachers','devices'].forEach(function(f){if(+o[f]>=0&&o[f]!=null)p[f]=+o[f];});
   p.isSchool=!!o.isSchool;if(o.price){p.price={month:Math.max(0,+o.price.month||0),week:Math.max(0,+o.price.week||0)};}p.days={month:Math.max(1,+(o.days&&o.days.month)||30),week:Math.max(1,+(o.days&&o.days.week)||7)};
   p.disc=Math.min(90,Math.max(0,+o.disc||0));p.dlabel=o.label||'';p.duntil=+o.until||0;p.off=o.active===false;p.features=Array.isArray(o.features)?o.features.map(String):[];});
  if(Array.isArray(c.plans)&&c.plans.length){var have={};c.plans.forEach(function(o){if(o&&o.key)have[o.key]=1;});Object.keys(CFG.PLANS).forEach(function(k){if(!have[k])CFG.PLANS[k].off=true;});}}
 applyContent();
 if(!window.SL_CONTENT)d.addEventListener('DOMContentLoaded',applyContent);
 try{if(isAdmin())applyPrices(JSON.parse(localStorage.getItem('sl_prices')||'null'));}catch(e){}
 function disc(p,b){var on=p.disc>0&&(!p.duntil||p.duntil>Date.now()),e=on?Math.round(b*(1-p.disc/100)):b;return {base:b,eff:e,disc:on?p.disc:0,label:on?(p.dlabel||''):'',until:on?(p.duntil||0):0};}
 function price(k,per){var p=CFG.PLANS[k];return disc(p,p.price[per==='week'?'week':'month']);}
 /* ====== ক্লাস অনুযায়ী দাম ====== */
 var ORDER=CFG.CLASSES.map(function(c){return c.id;});
 function cls(id){for(var i=0;i<CFG.CLASSES.length;i++)if(CFG.CLASSES[i].id===id)return CFG.CLASSES[i];return null;}
 function sortBands(b){var o=[],seen={};(b||[]).forEach(function(x){if(cls(x)&&!seen[x]){seen[x]=1;o.push(x);}});return o.sort(function(a,c){return ORDER.indexOf(a)-ORDER.indexOf(c);});}
 function cName(c){return c.from===c.to?bn(c.from):bn(c.from)+'–'+bn(c.to);}
 function bandsLabel(b){var bs=sortBands(b);if(!bs.length)return '—';var cs=bs.map(cls),ok=true;for(var i=1;i<bs.length;i++)if(ORDER.indexOf(bs[i])!==ORDER.indexOf(bs[i-1])+1)ok=false;
  if(bs.length>1&&ok)return bn(cs[0].from)+'–'+bn(cs[cs.length-1].to)+' শ্রেণি';return cs.map(cName).join(', ')+' শ্রেণি';}
 function bandOf(f){var L=window.CHAPTERS||[];for(var i=0;i<L.length;i++)if(String(L[i].file).split('/').pop()===f+'.html'&&L[i].cls)return L[i].cls;var m=/^(c6|c7|c8|c910|c1112)-/.exec(f);return m?m[1]:'c910';}
 function myBands(a){return a&&a.bands&&a.bands.length?sortBands(a.bands):['c910'];}
 function checkBands(k,b){var P=CFG.PLANS[k],bs=sortBands(b);
  if(k==='student'||k==='custom')return bs.length===1?'':'একটা ক্লাস বেছে নাও';
  if(k==='family')return bs.length<1?'কমপক্ষে একটা ক্লাস বেছে নাও':bs.length>CFG.FAMILY_MAX_CLASSES?'সর্বোচ্চ '+bn(CFG.FAMILY_MAX_CLASSES)+'টি ক্লাস নেওয়া যায়':'';
  if(P&&P.isSchool){if(!bs.length)return 'ক্লাসের সীমা বেছে নাও';for(var i=1;i<bs.length;i++)if(ORDER.indexOf(bs[i])!==ORDER.indexOf(bs[i-1])+1)return 'ক্লাসগুলো পরপর হতে হবে (যেমন ৬–১০)';}
  return '';}
 function minClass(w){return Math.min.apply(null,CFG.CLASSES.map(function(c){return c.price[w];}));}
 /* quote: প্ল্যান + ক্লাস (+ কাস্টমে জন/বিষয়) দিয়ে মোট দাম। ডিসকাউন্টসহ */
 function quote(k,per,o){o=o||{};var p=CFG.PLANS[k],w=per==='week'?'week':'month',bs=sortBands(o.bands),b;
  if(k==='student'){var c=cls(bs[0]);b=c?c.price[w]:minClass(w);}
  else if(k==='family'){b=p.price[w]+(Math.max(1,bs.length)-1)*CFG.FAMILY_EXTRA[w];}
  else if(p.isSchool){var u=bs.reduce(function(t,x){return t+cls(x).units;},0)||CFG.SCHOOL_BASE_UNITS;b=Math.round(p.price[w]*u/CFG.SCHOOL_BASE_UNITS);}
  else if(k==='custom'){b=p.price[w]*(Math.min(CFG.CUSTOM_MAX,Math.max(1,+o.seats||1)))*Math.max(1,(o.subs||[]).length);}
  else b=p.price[w];
  return disc(p,b);}
 function days(k,per){var p=CFG.PLANS[k],d=(p&&p.days)||{};return per==='week'?(+d.week||7):(+d.month||30);}
 function maxDisc(){var m=0;Object.keys(CFG.PLANS).forEach(function(k){m=Math.max(m,price(k,'month').disc);});return m;}
 var K='sl_demo_v1',DAY=864e5;
 function bn(n){return String(n).replace(/\d/g,function(c){return '০১২৩৪৫৬৭৮৯'.charAt(c);});}
 function en(s){return String(s).replace(/[০-৯]/g,function(c){return '০১২৩৪৫৬৭৮৯'.indexOf(c);});}
 function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
/* ইমেইল অথবা বাংলাদেশি মোবাইল নম্বর (০১৭xxxxxxxx, +৮৮০১৭..., 8801...) দিয়ে অ্যাকাউন্ট চেনা যায়। মোবাইল হলে ভেতরে 01xxxxxxxxx@phone.sl নামে রাখা হয় */
 function normId(x){
  x=en(String(x||'')).trim().toLowerCase();if(!x)return '';
  if(x.indexOf('@')>-1)return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x)&&x.length<120?x:'';
  var d=x.replace(/[\s\-().]/g,'').replace(/^\+/,'');
  if(/^8801[3-9]\d{8}$/.test(d))d=d.slice(2);
  if(/^1[3-9]\d{8}$/.test(d))d='0'+d;
  return /^01[3-9]\d{8}$/.test(d)?d+'@phone.sl':'';
 }
 function isPhoneId(e){return /@phone\.sl$/.test(String(e||''));}
 function disp(e){return isPhoneId(e)?String(e).replace('@phone.sl',''):String(e||'');}
 function get(){try{var x=JSON.parse(localStorage.getItem(K));if(x&&x.acc)return x;}catch(e){}return {acc:{},ses:null,prog:{}};}
 function put(x){try{localStorage.setItem(K,JSON.stringify(x));}catch(e){}}
 function acc(){var x=get();return x.ses&&x.acc[x.ses]||null;}
 function status(a){
  if(!a)return {state:'none',left:0};
  if(a.suspended)return {state:'suspended',left:0};
  var n=Date.now();
  if(a.paidUntil&&a.paidUntil>n)return {state:'active',left:Math.ceil((a.paidUntil-n)/DAY),until:a.paidUntil};
  if(a.compUntil&&a.compUntil>n)return {state:'active',comp:true,left:Math.ceil((a.compUntil-n)/DAY),until:a.compUntil};
  if(a.trialEnd>n)return {state:'trial',left:Math.ceil((a.trialEnd-n)/DAY),until:a.trialEnd};
  return {state:'expired',left:0,until:Math.max(a.trialEnd||0,a.paidUntil||0)};
 }
 function isAdmin(){try{return +localStorage.getItem('sl_admin_until')>Date.now();}catch(e){return false;}}
 function hasAccess(){if(isAdmin())return true;var s=status(acc()).state;return s==='trial'||s==='active';}
 function chFile(){return decodeURIComponent(location.pathname.split('/').pop()||'').replace(/\.html$/,'');}
 function isFree(f){var L=(window.SL_CONTENT&&window.SL_CONTENT.labs)||[];for(var i=0;i<L.length;i++){var l=L[i];if(l&&l.chapter===f&&l.active!==false&&(l.access==='free'||l.access==='premium'))return l.access==='free';}return CFG.FREE.indexOf(f)>-1;}
 function subOf(f){var p=String(f).replace(/^(c6|c7|c8|c910|c1112)-/,'').split('-')[0];return p==='chem'?'chemistry':p==='phy'?'physics':p==='math'?'math':p==='bio'?'biology':'';}
 function canOpen(f){if(isAdmin()||isFree(f))return true;var a=acc(),s=status(a).state;if(s==='trial')return CFG.TRIAL_CH.indexOf(f)>-1;if(s!=='active')return false;var st=status(a);if(!st.comp&&myBands(a).indexOf(bandOf(f))<0)return false;if(a.comp||st.comp||a.kind!=='custom')return true;return (a.subs||[]).indexOf(subOf(f))>-1;}
 function hash(s){
  s=String(s);
  if(window.crypto&&crypto.subtle&&window.TextEncoder){
   return crypto.subtle.digest('SHA-256',new TextEncoder().encode('sl|'+s)).then(function(b){return [].map.call(new Uint8Array(b),function(x){return ('0'+x.toString(16)).slice(-2);}).join('');});
  }
  var h=5381;for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return Promise.resolve('x'+h);
 }
function pwWeak(p,em){
  p=String(p);
  if(p.length<8)return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।';
  if(/^(\d+|[a-z]+)$/i.test(p))return 'পাসওয়ার্ডে অক্ষর আর সংখ্যা মিলিয়ে দাও (শুধু সংখ্যা বা শুধু অক্ষর চলবে না)।';
  var l=p.toLowerCase();
  if(['password','12345678','123456789','1234567890','qwertyui','iloveyou','shikbolab','password1','abcd1234','abc12345','11111111','00000000'].indexOf(l)>-1||(em&&l===String(em).split('@')[0].toLowerCase()))return 'এই পাসওয়ার্ডটা খুব সহজ। অন্য কিছু দাও।';
  return '';
 }
 function limits(a){var p=CFG.PLANS[a.kind]||CFG.PLANS.student;if(a.kind!=='custom')return p;var o={};Object.keys(p).forEach(function(k){o[k]=p[k];});o.students=Math.min(CFG.CUSTOM_MAX,Math.max(1,+a.seats||1));return o;}
 function ownerRole(a){return limits(a).isSchool?'admin':a.kind==='family'?'parent':'student';}
 function profiles(a){
  var l=[{id:'owner',name:a.name,role:ownerRole(a)}];
  (a.members||[]).forEach(function(m){l.push(m);});return l;
 }
 function counts(a){
  var st=(a.members||[]).filter(function(m){return m.role==='student';}).length+(a.kind==='student'||a.kind==='custom'?1:0);
  var te=(a.members||[]).filter(function(m){return m.role==='teacher';}).length;
  return {students:st,teachers:te};
 }
 var ROLE={admin:'স্কুল অ্যাডমিন',parent:'অভিভাবক',student:'শিক্ষার্থী',teacher:'শিক্ষক'};
 function mut(fn){var x=get(),a=x.ses&&x.acc[x.ses];if(!a)return {ok:false,err:'আগে লগইন করো।'};var r=fn(a,x)||{ok:true};if(r.ok)put(x);return r;}
 /* ====== ক্লাউড সিঙ্ক ====== */
function devId(){var v='';try{v=localStorage.getItem('sl_dev')||'';if(!/^[A-Za-z0-9_-]{8,40}$/.test(v)){v='d'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);localStorage.setItem('sl_dev',v);}}catch(e){v=v||'dtmp'+Math.random().toString(36).slice(2,12);}return v;}
 function devName(){var u=navigator.userAgent||'',b=/Edg\//.test(u)?'Edge':/OPR\/|Opera/.test(u)?'Opera':/Firefox\//.test(u)?'Firefox':/Chrome\//.test(u)?'Chrome':/Safari\//.test(u)?'Safari':'ব্রাউজার',o=/Android/.test(u)?'Android':/iPhone|iPad|iPod/.test(u)?'iOS':/Windows/.test(u)?'Windows':/Mac OS X/.test(u)?'Mac':/Linux/.test(u)?'Linux':'';return (o?o+' · ':'')+b;}
 function dev(){return {id:devId(),n:devName()};}
 function api(body,keep){
  return fetch(CLOUD,{method:'POST',body:JSON.stringify(body),redirect:'follow',keepalive:!!keep}).then(function(r){return r.json();}).catch(function(){return {ok:false,net:1,err:'ইন্টারনেট/সার্ভারে সমস্যা। একটু পরে আবার চেষ্টা করো।'};});
 }
 function applyServer(rec,prog){
  var x=get(),a=x.acc[rec.email];
  if(!a)a=x.acc[rec.email]={email:rec.email,hash:'',logo:'',members:[],active:'owner',pays:[],reqs:[],mv:0};
  ['name','kind','school','trialEnd','paidUntil','suspended','pays','reqs','created','logo','seats','subs','bands','devs','rem','compUntil'].forEach(function(k){if(rec[k]!==undefined)a[k]=rec[k];});
  if((rec.mv||0)>=(a.mv||0)){a.members=rec.members||[];a.mv=rec.mv||0;}
  if(a.active!=='owner'&&!(a.members||[]).some(function(m){return m.id===a.active;}))a.active='owner';
  if(prog){x.prog[rec.email]=prog;var dd=x.dirty&&x.dirty[rec.email];if(dd)Object.keys(dd).forEach(function(pid){Object.keys(dd[pid]).forEach(function(f){x.prog[rec.email][pid]=x.prog[rec.email][pid]||{};x.prog[rec.email][pid][f]=dd[pid][f];});});}
  put(x);return a;
 }
 /* ক্লাউডে লগইনের পর ব্রাউজারে পাসওয়ার্ড-হ্যাশ নয়, শুধু সার্ভারের দেওয়া সেশন টোকেন জমা থাকে */
 function cred(a){return a.tok?{tok:a.tok}:{hash:a.hash};}
 function finishLogin(rec,prog,h,tok){applyServer(rec,prog);var x=get(),a=x.acc[rec.email];if(tok){a.tok=tok;a.hash='';}else{a.hash=h;}x.ses=rec.email;put(x);}
 function cloudSignup(o,em){return hash(o.pass).then(function(h){return api({a:'signup',dev:dev(),email:em,rem:(isPhoneId(em)?normId(o.rem):''),hash:h,name:o.name,kind:o.kind,school:o.school||'',logo:o.logo||''}).then(function(r){if(!r.ok)return r;finishLogin(r.acc,{},h,r.tok);return {ok:true};});});}
 function cloudLogin(em,pw){return hash(pw).then(function(h){return api({a:'login',dev:dev(),email:em,hash:h}).then(function(r){if(!r.ok)return r;finishLogin(r.acc,r.prog,h,r.tok);return {ok:true};});});}
 function cloudSync(){
  if(!CLOUD)return Promise.resolve({ok:false,off:1});
  var x=get(),a=x.ses&&x.acc[x.ses];if(!a||!(a.tok||a.hash))return Promise.resolve({ok:false});
  var dirty=JSON.parse(JSON.stringify((x.dirty&&x.dirty[a.email])||{}));
  return api(Object.assign({a:'sync',dev:dev(),email:a.email,mv:a.mv||0,members:a.members||[],prog:dirty},cred(a))).then(function(r){
   if(r.ok){
    if(r.tok){var t0=get(),a0=t0.acc[a.email];if(a0){a0.tok=r.tok;a0.hash='';put(t0);}}
    var y=get();if(y.dirty&&y.dirty[a.email])Object.keys(dirty).forEach(function(pid){Object.keys(dirty[pid]).forEach(function(f){var c=y.dirty[a.email][pid]&&y.dirty[a.email][pid][f];if(c&&c.w===dirty[pid][f].w)delete y.dirty[a.email][pid][f];});});
    put(y);applyServer(r.acc,r.prog);
   }else if(r.devout||r.devfull||r.sesout||r.err==='পাসওয়ার্ড ভুল'||r.err==='এই ইমেইলে অ্যাকাউন্ট নেই'){var z=get();z.ses=null;put(z);r.loggedOut=true;}
   return r;
  });
 }
 var syncT=null;
 function schedSync(ms){if(!CLOUD)return;clearTimeout(syncT);syncT=setTimeout(cloudSync,ms||1500);}
 function pack(a,withMem){var o={e:a.email,h:a.hash,n:a.name,k:a.kind,s:a.school||'',te:a.trialEnd,pu:a.paidUntil||0,cu:a.compUntil||0,su:a.suspended?1:0,b:a.bands||[],c:a.created,v:Date.now()};if(withMem)o.m=a.members||[];return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
 function unpack(c){try{c=String(c).trim();var i=c.indexOf('#a=');if(i>-1)c=c.slice(i+3);c=c.replace(/-/g,'+').replace(/_/g,'/');while(c.length%4)c+='=';var o=JSON.parse(decodeURIComponent(escape(atob(c))));return o&&o.e&&o.h?o:null;}catch(e){return null;}}
 function mergeIn(o,useMem){var x=get(),a=x.acc[o.e],nw=!a;
  if(!a)a=x.acc[o.e]={email:o.e,hash:o.h,name:o.n,kind:o.k,school:o.s||'',logo:'',created:o.c||Date.now(),trialEnd:o.te,paidUntil:o.pu,compUntil:o.cu||0,suspended:false,members:[],active:'owner',pays:[]};
  a.hash=o.h;a.name=o.n;a.kind=CFG.PLANS[o.k]?o.k:a.kind;a.school=o.s||'';a.trialEnd=o.te;a.paidUntil=o.pu;a.compUntil=o.cu||0;a.suspended=!!o.su;if(o.b&&o.b.length)a.bands=o.b;if(useMem&&o.m)a.members=o.m;
  put(x);return {ok:true,isNew:nw,acc:a};}
 var SL={days:days,price:price,maxDisc:maxDisc,applyPrices:applyPrices,isAdmin:isAdmin,pack:pack,unpack:unpack,mergeIn:mergeIn,cfg:CFG,bn:bn,en:en,esc:esc,get:get,put:put,acc:acc,status:status,hasAccess:hasAccess,isFree:isFree,limits:limits,profiles:profiles,counts:counts,ROLE:ROLE,hash:hash,pwWeak:pwWeak,normId:normId,disp:disp,isPhoneId:isPhoneId,B:B,quote:quote,CLASSES:CFG.CLASSES,bandsLabel:bandsLabel,sortBands:sortBands,bandOf:bandOf,myBands:myBands,checkBands:checkBands,devId:devId,
  signup:function(o){
   var em=normId(o.email);
   if(!em)return Promise.resolve({ok:false,err:'সঠিক ইমেইল অথবা মোবাইল নম্বর লেখো (যেমন 01712345678)।'});
   var pwE=pwWeak(o.pass||'',em);if(pwE)return Promise.resolve({ok:false,err:pwE});
   if(!(o.name||'').trim())return Promise.resolve({ok:false,err:'নাম লেখো।'});
   if((CFG.PLANS[o.kind]||{}).isSchool&&!(o.school||'').trim())return Promise.resolve({ok:false,err:'স্কুলের নাম লেখো।'});
   if(CLOUD)return cloudSignup(o,em);
   var x=get();if(x.acc[em])return Promise.resolve({ok:false,err:'এই ইমেইলে আগেই অ্যাকাউন্ট আছে। লগইন করো।'});
   return hash(o.pass).then(function(h){
    var n=Date.now();
    x.acc[em]={email:em,hash:h,name:o.name.trim(),kind:CFG.PLANS[o.kind]?o.kind:'student',school:(o.school||'').trim(),logo:o.logo||'',created:n,trialEnd:n+CFG.TRIAL_DAYS*DAY,paidUntil:0,members:[],active:'owner',pays:[]};
    x.ses=em;put(x);return {ok:true};
   });
  },
  login:function(em,pw){
   em=normId(em);if(!em)return Promise.resolve({ok:false,err:'সঠিক ইমেইল অথবা মোবাইল নম্বর লেখো।'});if(CLOUD)return cloudLogin(em,pw);var x=get(),a=x.acc[em];
   if(!a)return Promise.resolve({ok:false,err:'এই ইমেইলে অ্যাকাউন্ট নেই।'});
   return hash(pw).then(function(h){if(h!==a.hash)return {ok:false,err:'পাসওয়ার্ড ভুল।'};x.ses=em;put(x);return {ok:true};});
  },
  logout:function(){try{Object.keys(sessionStorage).forEach(function(k){if(k.indexOf('sl_ck_')===0)sessionStorage.removeItem(k);});}catch(e){}var x=get(),a=x.ses&&x.acc[x.ses],p=null;if(CLOUD&&a&&(a.tok||a.hash))p=Promise.race([api(Object.assign({a:'devout',email:a.email,dev:{id:devId()}},cred(a)),true),new Promise(function(r){setTimeout(r,2500);})]);x.ses=null;put(x);return p||Promise.resolve();},
  devRemove:function(em,pw,id){return hash(pw).then(function(h){return api({a:'devrm',email:normId(em),hash:h,rm:id});});},
  resetRequest:function(id){var em=normId(id);if(!em)return Promise.resolve({ok:false,err:'সঠিক ইমেইল অথবা মোবাইল নম্বর লেখো।'});return api({a:'rst_req',email:em});},
  resetDo:function(id,code,pass){var em=normId(id),e=pwWeak(pass,em);if(!em)return Promise.resolve({ok:false,err:'ইমেইল/মোবাইল ঠিক নেই।'});if(e)return Promise.resolve({ok:false,err:e});if(!/^\d{6}$/.test(en(String(code||'')).trim()))return Promise.resolve({ok:false,err:'৬ অঙ্কের কোড লেখো।'});return hash(pass).then(function(h){return api({a:'rst_do',email:em,code:en(String(code)).trim(),hash:h});});},
  setRecovery:function(rem){var a=acc();rem=normId(rem);if(!a)return Promise.resolve({ok:false,err:'আগে লগইন করো।'});if(!rem||isPhoneId(rem))return Promise.resolve({ok:false,err:'সঠিক ইমেইল লেখো।'});return api(Object.assign({a:'setrem',email:a.email,rem:rem},cred(a))).then(function(r){if(r.ok)applyServer(r.acc,null);return r;});},
  devRemoveMine:function(id){var x=get(),a=x.ses&&x.acc[x.ses];if(!a)return Promise.resolve({ok:false});return api(Object.assign({a:'devrm',email:a.email,rm:id},cred(a))).then(function(r){if(r.ok)applyServer(r.acc,null);return r;});},
  addMember:function(name,role){return mut(function(a){
   name=(name||'').trim();if(!name)return {ok:false,err:'নাম লেখো।'};
   var L=limits(a),c=counts(a);
   if(a.kind==='student')return {ok:false,err:'স্টুডেন্ট প্ল্যানে আর কাউকে যোগ করা যায় না। ফ্যামিলি প্ল্যান নাও।'};
   if(role==='teacher'){if(!L.isSchool)return {ok:false,err:'শুধু স্কুল প্ল্যানে শিক্ষক যোগ করা যায়।'};if(c.teachers>=L.teachers)return {ok:false,err:'শিক্ষকের লিমিট ('+bn(L.teachers)+' জন) শেষ।'};}
   else{role='student';if(c.students>=L.students)return {ok:false,err:'শিক্ষার্থীর লিমিট ('+bn(L.students)+' জন) শেষ। বড় প্ল্যান নাও।'};}
   a.mv=Date.now();a.members.push({id:'m'+Date.now().toString(36)+Math.floor(Math.random()*99),name:name,role:role});return {ok:true};
  });},
  removeMember:function(id){return mut(function(a,x){a.mv=Date.now();a.members=a.members.filter(function(m){return m.id!==id;});if(a.active===id)a.active='owner';if(x.prog[a.email])delete x.prog[a.email][id];return {ok:true};});},
  setActive:function(id){return mut(function(a){a.active=id;return {ok:true};});},
  pay:function(plan,period,trx,bands){return mut(function(a){
   trx=(trx||'').trim();if(trx.length<6)return {ok:false,err:'ট্রানজেকশন আইডি (TrxID) লেখো (কমপক্ষে ৬ অক্ষর)।'};
   var P=CFG.PLANS[plan];if(!P)return {ok:false,err:'প্ল্যান বেছে নাও।'};
   var c=counts(a),own=a.kind==='student'?1:0;
   if(plan==='student'&&(a.members||[]).length)return {ok:false,err:'এই অ্যাকাউন্টে সদস্য আছে, স্টুডেন্ট প্ল্যানে নামানো যাবে না।'};
   if(c.students-own+(plan==='student'?1:0)>P.students||c.teachers>P.teachers)return {ok:false,err:'বর্তমান সদস্য সংখ্যা এই প্ল্যানের লিমিটের বেশি।'};
   var be=checkBands(plan,bands);if(be)return {ok:false,err:be};
   var days=SL.days(plan,period),n=Date.now(),base=Math.max(n,a.paidUntil||0);
   a.kind=plan;a.bands=sortBands(bands);a.paidUntil=base+days*DAY;a.pays.unshift({t:n,plan:plan,period:period,price:quote(plan,period,{bands:bands}).eff,trx:trx});return {ok:true};
  });},
  progress:function(email){return (get().prog[email])||{};},
  record:function(file,s,t){
   var x=get(),a=x.ses&&x.acc[x.ses];if(!a||!t)return;var p=a.active||'owner';
   x.prog[a.email]=x.prog[a.email]||{};x.prog[a.email][p]=x.prog[a.email][p]||{};
   var o=x.prog[a.email][p][file],pc=Math.round(s*100/t);
   if(!o||pc>=o.pc){var rc=x.prog[a.email][p][file]={s:s,t:t,pc:pc,w:Date.now()};if(CLOUD){x.dirty=x.dirty||{};x.dirty[a.email]=x.dirty[a.email]||{};(x.dirty[a.email][p]=x.dirty[a.email][p]||{})[file]=rc;}}
   put(x);if(CLOUD)schedSync(1500);
  },
  logoFromFile:function(f,cb){
   if(!f)return cb('');var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var c=d.createElement('canvas'),m=Math.min(1,128/Math.max(im.width,im.height));c.width=Math.max(1,im.width*m);c.height=Math.max(1,im.height*m);c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/png'));};im.onerror=function(){cb('');};im.src=r.result;};r.onerror=function(){cb('');};r.readAsDataURL(f);
  }
 };
 window.SL=SL;
SL.api=function(b){return api(b);};
 /* পেইড অধ্যায়ের চাবি সার্ভারের কাছে চাই (এনক্রিপ্ট করা পেজ খোলার জন্য) */
 SL.unlockKey=function(file){
  var a=acc(),body={a:'ck',file:file,dev:dev()};
  if(CLOUD&&isAdmin()){var t='';try{t=localStorage.getItem('sl_admin_token')||'';}catch(e){}if(t)body.k=t;}
  if(!body.k){
   if(!a||!(a.tok||a.hash))return Promise.resolve({ok:false,why:'noacc',err:'এই অধ্যায় দেখতে আগে লগইন করো।'});
   body=Object.assign(body,{email:a.email},cred(a));
  }
  return api(body).then(function(r){if(r&&!r.ok&&(r.sesout||r.devout)){var z=get();z.ses=null;put(z);}return r;});
 };
 /* পেমেন্ট নম্বর ক্লাউড থেকে আনা (অ্যাডমিন প্যানেল থেকে বদলানো যায়) */
 function usePay(p){if(!p)return;['bkash','nagad','wa'].forEach(function(k){if(p[k])CFG.PAY[k]=p[k];});}
 try{if(CLOUD)usePay(JSON.parse(localStorage.getItem('sl_pay')||'null'));}catch(e){}
 SL.loadCfg=function(){if(!CLOUD)return Promise.resolve();return api({a:'cfg'}).then(function(r){if(r&&r.ok&&r.pay){usePay(r.pay);try{localStorage.setItem('sl_pay',JSON.stringify(r.pay));}catch(e){}}return r;}).catch(function(){});};
 SL.noPay=function(){return /X/i.test(CFG.PAY.bkash||'')&&/X/i.test(CFG.PAY.nagad||'');};
 SL.cloud=!!CLOUD;SL.cloudSync=cloudSync;
 SL.subOf=subOf;SL.SUBJ=CFG.SUBJECTS;
 SL.payReq=function(plan,period,trx,method,from,seats,subs,bands){var x=get(),a=x.ses&&x.acc[x.ses];if(!a)return Promise.resolve({ok:false,err:'আগে লগইন করো।'});return api(Object.assign({a:'pay',dev:dev(),email:a.email},cred(a),{plan:plan,period:period,price:quote(plan,period,{bands:bands,seats:seats,subs:subs}).eff,trx:trx,method:method,from:from,seats:seats,subs:subs,bands:sortBands(bands)})).then(function(r){if(r.ok)applyServer(r.acc,null);return r;});};
 ['addMember','removeMember'].forEach(function(k){var f=SL[k];SL[k]=function(){var r=f.apply(SL,arguments);if(r&&r.ok)schedSync(300);return r;};});
 /* CSS লোড */
 var lk=d.createElement('link');lk.rel='stylesheet';lk.href=B+'css/saas.css';d.head.appendChild(lk);
 function ready(f){d.readyState==='loading'?d.addEventListener('DOMContentLoaded',f):f();}
 /* উপরের বার */
 function bar(){
  if(d.querySelector('.sl-bar')||d.body.hasAttribute('data-nobar'))return;
  var a=acc(),s=status(a),b=d.createElement('div');b.className='sl-bar';
  var h='';
  if(isAdmin()){
   h+='<div class="who"><b>👑 সুপার অ্যাডমিন</b></div><span class="bd">সব ফ্রি, কোনো লিমিট নেই</span><span class="sp"></span><a href="'+B+'admin.html">অ্যাডমিন প্যানেল</a><a href="'+B+'index.html" class="hide-m">হোম</a>';
  }else if(a){
   var title=limits(a).isSchool&&a.school?a.school:'ShikboLab',pl=profiles(a),cur=a.active||'owner';
   h+='<div class="who">'+(a.logo?'<img alt="" src="'+esc(a.logo)+'">':'')+'<b>'+esc(title)+'</b></div>';
   var cls=s.state==='active'?'':s.state==='trial'?' w':' x';
   if(s.state==='suspended')cls=' x';
   var tx=s.state==='active'?'✅ '+CFG.PLANS[a.kind].name+' · '+bn(s.left)+' দিন বাকি':s.state==='trial'?(CFG.TRIAL_CH.length?'🎁 ফ্রি ট্রায়াল · '+bn(s.left)+' দিন বাকি':'🆓 ফ্রি অ্যাকাউন্ট (শুধু ফ্রি অধ্যায়)'):s.state==='suspended'?'🚫 অ্যাকাউন্ট বন্ধ':'⛔ মেয়াদ শেষ';
   h+='<span class="bd'+cls+'">'+tx+'</span><span class="sp"></span>';
   if(pl.length>1)h+='<select id="slwho" aria-label="কে পড়ছে">'+pl.map(function(p){return '<option value="'+esc(p.id)+'"'+(p.id===cur?' selected':'')+'>👤 '+esc(p.name)+'</option>';}).join('')+'</select>';
   h+='<a href="'+B+'account.html">অ্যাকাউন্ট</a><a href="'+B+'plans.html" class="hide-m">প্ল্যান</a><button id="sllo">লগআউট</button>';
  }else{
   h+='<div class="who"><b>ShikboLab</b></div><span class="bd w">'+(CFG.TRIAL_CH.length?'🎁 '+bn(CFG.TRIAL_DAYS)+' দিনের ফ্রি ট্রায়াল':'🆓 কিছু অধ্যায় ফ্রি')+'</span>'+(maxDisc()?'<a class="bd x" href="'+B+'plans.html" style="text-decoration:none">🔥 '+bn(maxDisc())+'% পর্যন্ত ছাড়</a>':'')+'<span class="sp"></span><a href="'+B+'plans.html">প্ল্যান</a><a href="'+B+'account.html#login">লগইন</a><a class="cta" href="'+B+'account.html#signup">ফ্রি শুরু করো</a>';
  }
  b.innerHTML=h;d.body.insertBefore(b,d.body.firstChild);
  var lo=b.querySelector('#sllo');if(lo)lo.onclick=function(){SL.logout().then(function(){location.reload();});};
  var sw=b.querySelector('#slwho');if(sw)sw.onchange=function(){SL.setActive(sw.value);};
 }
 /* অধ্যায়ের তালা */
 function gate(){
  if(window.SL_SHELL)return;   /* এনক্রিপ্ট করা পেজের খোলসে unlock.js নিজেই বার্তা দেখায় */
  var f=chFile(),a=acc(),s=status(a);
  if(canOpen(f))return;
  var g=d.createElement('div');g.className='sl-gate';
  var msg,btns;
  if(!a){msg=CFG.TRIAL_CH.length?'এই অধ্যায় দেখতে একটা ফ্রি অ্যাকাউন্ট খুলে '+bn(CFG.TRIAL_DAYS)+' দিনের ফ্রি ট্রায়াল শুরু করো। ট্রায়ালে বাছাই করা '+bn(CFG.TRIAL_CH.length)+'টি অধ্যায় খোলা থাকে।':'এই অধ্যায়টি প্ল্যানের অন্তর্ভুক্ত। প্ল্যান নিলে সব অধ্যায় ও ল্যাব খুলবে। ফ্রি অধ্যায়গুলো সবার জন্য খোলা আছে।';btns='<a class="slb o" href="'+B+'plans.html">💳 প্ল্যান দেখো</a><a class="slb s" href="'+B+'account.html#login">লগইন</a>';}
  else if(s.state==='active'&&!s.comp&&myBands(a).indexOf(bandOf(f))<0){msg='এই অধ্যায়টি '+bandsLabel([bandOf(f)])+'-এর। তোমার প্ল্যানে আছে '+bandsLabel(myBands(a))+'। এই ক্লাসের অধ্যায় খুলতে প্ল্যানে ক্লাসটা যোগ করো।';btns='<a class="slb o" href="'+B+'account.html#pay">➕ ক্লাস যোগ করো</a><a class="slb s" href="'+B+'plans.html">প্ল্যান দেখো</a>';}
  else if(s.state==='active'&&a.kind==='custom'){msg='এই বিষয়টি ('+(CFG.SUBJECTS[subOf(f)]||'')+') তোমার কাস্টম প্ল্যানে নেই। বিষয় যোগ করতে আবার প্ল্যান নাও।';btns='<a class="slb o" href="'+B+'account.html#pay">➕ বিষয় যোগ করো</a><a class="slb s" href="'+B+'account.html">অ্যাকাউন্ট দেখো</a>';}
  else if(s.state==='trial'){msg=CFG.TRIAL_CH.length?'এই অধ্যায়টি ফ্রি ট্রায়ালে খোলা নেই (ট্রায়ালে শুধু বাছাই করা '+bn(CFG.TRIAL_CH.length)+'টি অধ্যায় পাওয়া যায়)। সব অধ্যায়ের জন্য প্ল্যান নাও।':'এই অধ্যায়টি প্ল্যানের অন্তর্ভুক্ত। ফ্রি অ্যাকাউন্টে শুধু ফ্রি অধ্যায়গুলো খোলা থাকে। প্ল্যান নিলে সব অধ্যায় খুলবে।';btns='<a class="slb o" href="'+B+'account.html#pay">💳 প্ল্যান নাও</a><a class="slb s" href="'+B+'plans.html">প্ল্যান দেখো</a>';}
  else if(s.state==='suspended'){msg='তোমার অ্যাকাউন্ট সাময়িক বন্ধ আছে। অ্যাডমিনের সাথে যোগাযোগ করো।';btns='<a class="slb s" href="'+B+'account.html">অ্যাকাউন্ট দেখো</a>';}
  else{msg='তোমার ট্রায়াল/প্ল্যানের মেয়াদ শেষ। প্ল্যান নিলে আবার সব অধ্যায় খুলবে।';btns='<a class="slb o" href="'+B+'account.html#pay">💳 প্ল্যান নাও</a><a class="slb s" href="'+B+'plans.html">প্ল্যান দেখো</a>';}
  g.innerHTML='<div class="card"><span class="lk">🔒</span><h2>এই অধ্যায়টি প্ল্যানের অন্তর্ভুক্ত</h2><p>'+msg+'</p><div class="row">'+btns+'</div><p style="margin:16px 0 0"><a href="'+B+'index.html" style="color:#1f3a5f;font-weight:600">← সব অধ্যায়</a></p></div>';
  d.body.appendChild(g);d.documentElement.style.overflow='hidden';d.body.style.overflow='hidden';
 }
 /* কুইজ স্কোর ট্র্যাক */
 function track(){
  var sc=d.getElementById('score')||d.getElementById('qscore');if(!sc||!acc())return;var f=chFile();
  new MutationObserver(function(){var m=en(sc.textContent||'').match(/(\d+)\s*\/\s*(\d+)/);if(m&&+m[2]>0)SL.record(f,+m[1],+m[2]);}).observe(sc,{childList:true,characterData:true,subtree:true});
 }
 /* হোমপেজে কার্ডে 🔒/ফ্রি ব্যাজ */
 var markFn=null;
 function badges(){
  function mark(){
   var ok=hasAccess();
   [].forEach.call(d.querySelectorAll('a[href*="chapters/"]:not([data-sl])'),function(el){
    var f=decodeURIComponent((el.getAttribute('href')||'').split('/').pop()).replace(/\.html.*$/,'');
    el.setAttribute('data-sl','1');
    var s=d.createElement('span');
    if(isFree(f)){s.className='sl-lock f';s.textContent='ফ্রি';}else if(canOpen(f)){return;}else{s.className='sl-lock';s.textContent='🔒 প্ল্যান';}
    el.appendChild(s);
   });
  }
  markFn=mark;mark();new MutationObserver(mark).observe(d.body,{childList:true,subtree:true});
 }
 function refreshUI(){
  if(window.SL_SHELL)return;
  var b=d.querySelector('.sl-bar');if(b)b.remove();bar();
  if(inCh){var g=d.querySelector('.sl-gate');if(g)g.remove();d.documentElement.style.overflow='';d.body.style.overflow='';gate();}
  else if(markFn){[].forEach.call(d.querySelectorAll('.sl-lock'),function(e){e.remove();});[].forEach.call(d.querySelectorAll('[data-sl]'),function(e){e.removeAttribute('data-sl');});markFn();}
 }
 ready(function(){
  if(window.SL_SHELL)return;   /* এনক্রিপ্ট করা পেজের খোলসে শুধু চাবি আনার কাজ হয় */
  bar();
  if(inCh){gate();track();}
  else if(/index\.html$|\/$/.test(location.pathname)||location.pathname.split('/').pop()==='')badges();
  if(CLOUD&&!isAdmin()&&acc()&&!/account\.html$/.test(location.pathname)){
   var x=get(),dd=x.dirty&&x.dirty[x.ses],hasD=dd&&Object.keys(dd).some(function(k){return Object.keys(dd[k]).length;}),last=0;
   try{last=+sessionStorage.getItem('sl_ls')||0;}catch(e){}
   if(hasD||Date.now()-last>60000){try{sessionStorage.setItem('sl_ls',String(Date.now()));}catch(e){}cloudSync().then(function(r){if(r&&(r.ok||r.loggedOut))refreshUI();});}
  }
 });
})();
