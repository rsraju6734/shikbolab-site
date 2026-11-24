/* ShikboLab অ্যাডমিন: অ্যানালিটিক্স ও অডিট লগ (Phase 8, ডেমো মোড)
   অ্যানালিটিক্স: শুধু আসল রেকর্ড থেকে। কিছু না থাকলে "—" দেখায়, বানানো সংখ্যা নেই।
   অডিট লগ: ⚠️ এই ব্রাউজারের localStorage এ থাকে, তাই ব্রাউজারে ঢুকতে পারা যে কেউ বদলাতে/মুছতে পারে।
   টেম্পার-প্রুফ লগ লাগলে backend/schema.sql এর audit_log টেবিল (Phase 9) লাগবে। */
(function(){
 var KEY='sl_audit_v1',MAX=500,X=null,F={q:'',a:''},AP='ov';
 function rd(){try{var a=JSON.parse(localStorage.getItem(KEY));return Array.isArray(a)?a:[];}catch(e){return [];}}
 function wr(a){try{localStorage.setItem(KEY,JSON.stringify(a.slice(0,MAX)));}catch(e){}}
 function log(act,detail,cat){var a=rd(),last=a[0],t=Date.now(),k=String(act||'').slice(0,60),dt=String(detail||'').slice(0,200);
  if(last&&last.act===k&&last.detail===dt&&t-last.t<250)return;
  a.unshift({t:t,act:k,detail:dt,cat:cat||'action',who:'অ্যাডমিন (ডেমো)'});wr(a);}
 function E(s){return X.esc(s);}
 function csvCell(x){x=String(x==null?'':x);if(/^[=+\-@\t\r]/.test(x))x="'"+x;return '"'+x.replace(/"/g,'""')+'"';}
 function dl(name,rows){var bl=new Blob(['﻿'+rows.map(function(r){return r.map(csvCell).join(',');}).join('\r\n')],{type:'text/csv;charset=utf-8'}),l=document.createElement('a');l.href=URL.createObjectURL(bl);l.download=name;l.click();}
 function dayKey(t){var x=new Date(t);return x.getFullYear()+'-'+('0'+(x.getMonth()+1)).slice(-2)+'-'+('0'+x.getDate()).slice(-2);}
 function bars(items){var mx=Math.max.apply(null,items.map(function(i){return i[1];}).concat([1]));return '<div class="ad-bars">'+items.map(function(i){return '<div class="r"><span>'+E(i[0])+'</span><div class="tr"><i style="width:'+Math.round(i[1]*100/mx)+'%"></i></div><b>'+X.bn(i[1])+'</b></div>';}).join('')+'</div>';}
 function card(t,b,em){return '<div><small>'+t+'</small><b>'+b+'</b>'+(em?'<em>'+em+'</em>':'')+'</div>';}
 function off(t,w){return '<div class="off"><small>'+t+'</small><b>—</b><em>'+w+'</em></div>';}

 /* ---------- অ্যানালিটিক্স ---------- */
 function data(){
  var L=X.list(),now=Date.now(),D={n:L.length,st:{active:0,trial:0,expired:0,suspended:0},plan:{},sign:{},rev:{},recs:0,act:{d1:{},d7:{},d30:{}},ch:{}};
  L.forEach(function(a){var s=X.stat(a).state;D.st[s]=(D.st[s]||0)+1;D.plan[a.kind]=(D.plan[a.kind]||0)+1;if(a.created){var k=dayKey(a.created);D.sign[k]=(D.sign[k]||0)+1;}
   (a.pays||[]).forEach(function(p){if(p.refund)return;var x=new Date(p.t),m=x.getFullYear()+'-'+('0'+(x.getMonth()+1)).slice(-2);D.rev[m]=(D.rev[m]||0)+(+p.price||0);});
   var pr=X.prog(a.email)||{};
   Object.keys(pr).forEach(function(pid){var o=pr[pid]||{};Object.keys(o).forEach(function(f){var r=o[f];if(!r||typeof r!=='object')return;D.recs++;var id=a.email+'|'+pid,w=+r.w||0;
    if(w>now-864e5)D.act.d1[id]=1;if(w>now-7*864e5)D.act.d7[id]=1;if(w>now-30*864e5)D.act.d30[id]=1;
    var c=D.ch[f]=D.ch[f]||{who:{},sum:0,n:0};c.who[id]=1;c.sum+=(+r.pc||0);c.n++;});});
  });
  return D;
 }
 function vAn(){
  var body=X.body,D=data(),C=window.SL_CONTENT||{},days=[],now=Date.now(),i;
  for(i=29;i>=0;i--)days.push(dayKey(now-i*864e5));
  var sg=days.map(function(k){return [k.slice(5),D.sign[k]||0];}),sgTot=sg.reduce(function(s,x){return s+x[1];},0);
  var ms=Object.keys(D.rev).sort().slice(-6).map(function(k){return [k,D.rev[k]];});
  var chs=Object.keys(D.ch).map(function(f){var c=D.ch[f];return {f:f,n:Object.keys(c.who).length,avg:Math.round(c.sum/c.n)};}).sort(function(a,b){return b.n-a.n;}).slice(0,10);
  var titles={};(window.CHAPTERS_BASE||window.CHAPTERS||[]).forEach(function(c){titles[String(c.file||'').split('/').pop().replace(/\.html.*$/,'')]=c.title;});
  var PN=function(k){var p=X.cfg.PLANS[k];return p?p.name:k;};
  var tabs='<div class="ad-tabs"><button data-ap="ov" class="'+(AP==='ov'?'on':'')+'">👥 অ্যাকাউন্ট ও আয়</button><button data-ap="lr" class="'+(AP==='lr'?'on':'')+'">📖 শেখার তথ্য</button><button data-ap="ct" class="'+(AP==='ct'?'on':'')+'">📚 কনটেন্ট</button></div>';
  var h=tabs+'<div class="sl-note">🔎 <b>তথ্যের উৎস:</b> শুধু '+(X.cloud?'ক্লাউডে':'এই ব্রাউজারে')+' থাকা অ্যাকাউন্ট ও তাদের জমা হওয়া অগ্রগতি। সাইটের সব দর্শক নয়। কোনো সংখ্যা আন্দাজে বানানো হয় না, তথ্য না থাকলে "—" আসে।</div>';
  if(AP==='ov'){
   h+='<div class="ad-cards">'+card('👥 মোট অ্যাকাউন্ট',X.bn(D.n))+card('✅ চালু (পেইড)',X.bn(D.st.active))+card('🎁 ট্রায়াল',X.bn(D.st.trial))+card('⛔ মেয়াদ শেষ',X.bn(D.st.expired))+card('🆕 গত ৩০ দিনে নতুন',X.bn(sgTot))+'</div>'
   +'<div class="sl-box"><h2>🆕 দৈনিক নতুন অ্যাকাউন্ট (৩০ দিন)</h2>'+(sgTot?bars(sg.filter(function(x){return x[1]>0;})):'<p style="color:var(--mut)">গত ৩০ দিনে নতুন অ্যাকাউন্ট নেই।</p>')+'</div>'
   +'<div class="sl-box"><h2>🏷️ প্ল্যান অনুযায়ী অ্যাকাউন্ট</h2>'+(D.n?bars(Object.keys(D.plan).map(function(k){return [PN(k),D.plan[k]];})):'<p style="color:var(--mut)">কোনো অ্যাকাউন্ট নেই।</p>')+'</div>'
   +'<div class="sl-box"><h2>💰 মাসিক রেকর্ড করা আয় (রিফান্ড বাদে, সার্ভার-যাচাই নয়)</h2>'+(ms.length?bars(ms.map(function(x){return [x[0],x[1]];}))+'<p style="color:var(--mut);margin:6px 0 0">সংখ্যাগুলো টাকায়।</p>':'<p style="color:var(--mut)">এখনও কোনো পেমেন্ট রেকর্ড নেই।</p>')+'</div>';
  }else if(AP==='lr'){
   h+='<div class="ad-cards">'+(D.recs?card('🔥 গত ২৪ ঘণ্টায় সক্রিয়',X.bn(Object.keys(D.act.d1).length),'প্রোফাইল')+card('📅 গত ৭ দিনে সক্রিয়',X.bn(Object.keys(D.act.d7).length))+card('🗓️ গত ৩০ দিনে সক্রিয়',X.bn(Object.keys(D.act.d30).length))+card('📝 কুইজ রেকর্ড',X.bn(D.recs)):off('🔥 সক্রিয় শিক্ষার্থী','এখনও কোনো অগ্রগতি নেই'))+'</div>'
   +'<div class="sl-box"><h2>🏅 জনপ্রিয় অধ্যায় (কুইজ দেওয়া শিক্ষার্থী অনুযায়ী)</h2>'+(chs.length?'<div class="sl-scroll"><table class="sl-tbl"><tr><th>অধ্যায়</th><th>শিক্ষার্থী</th><th>গড় স্কোর</th></tr>'+chs.map(function(c){return '<tr><td>'+E(titles[c.f]||c.f)+'</td><td>'+X.bn(c.n)+'</td><td>'+X.bn(c.avg)+'%</td></tr>';}).join('')+'</table></div>':'<p style="color:var(--mut)">কেউ এখনও কুইজ দেয়নি।</p>')+'</div>'
   +'<div class="ad-cards">'+off('🧪 ল্যাব ব্যবহার (সবার)','দর্শক ট্র্যাকিং ব্যাকএন্ড লাগে')+off('👀 পেজ ভিউ','ব্যাকএন্ড লাগে')+off('⏱️ পড়ার সময়','ব্যাকএন্ড লাগে')+'</div>'
   +'<div class="sl-note">ℹ️ অ্যাকাউন্ট ছাড়া দর্শকের ব্যবহার এখন কোথাও জমা হয় না। তাই সেগুলো দেখাচ্ছি না। Phase 9 এর <code>events</code> টেবিল জুড়লে আসবে।</div>';
  }else{
   var A=window.CHAPTERS_BASE||window.CHAPTERS||[],live=A.filter(function(c){return c.status==='live';}).length,qs=C.questions||[],ty={};qs.forEach(function(q2){ty[q2.type]=(ty[q2.type]||0)+1;});
   h+='<div class="ad-cards">'+card('📖 অধ্যায় পেজ',X.bn(A.length),'chapters.js')+card('✅ প্রকাশিত',X.bn(live))+card('📝 লেসন',X.bn((C.lessons||[]).length),'content.js')+card('🧪 ল্যাব রেকর্ড',X.bn((C.labs||[]).length))+card('❓ প্রশ্ন',X.bn(qs.length))+card('🏆 কুইজ',X.bn((C.quizzes||[]).length))+'</div>'
   +'<div class="sl-box"><h2>❓ প্রশ্নের ধরন</h2>'+(qs.length?bars(Object.keys(ty).map(function(k){return [k,ty[k]];})):'<p style="color:var(--mut)">প্রশ্নব্যাংকে কিছু নেই।</p>')+'</div>';
  }
  h+='<div class="ad-inl"><button class="slb s ad-sm" data-a="ex">⬇️ CSV এক্সপোর্ট</button></div>';
  body.innerHTML=h;
  [].forEach.call(body.querySelectorAll('[data-ap]'),function(b){b.onclick=function(){AP=b.dataset.ap;vAn();};});
  var ex=body.querySelector('[data-a="ex"]');ex.onclick=function(){
   var R=[['বিভাগ','নাম','সংখ্যা']];sg.forEach(function(x){R.push(['নতুন অ্যাকাউন্ট/দিন',x[0],x[1]]);});Object.keys(D.rev).sort().forEach(function(k){R.push(['মাসিক রেকর্ড আয় (টাকা)',k,D.rev[k]]);});
   Object.keys(D.plan).forEach(function(k){R.push(['প্ল্যান',PN(k),D.plan[k]]);});chs.forEach(function(c){R.push(['জনপ্রিয় অধ্যায়',titles[c.f]||c.f,c.n]);});dl('analytics.csv',R);};
 }

 /* ---------- অডিট লগ ---------- */
 function vAud(){
  var body=X.body,all=rd(),q=(F.q||'').toLowerCase(),R=all.filter(function(r){return (!q||(r.act+' '+r.detail).toLowerCase().indexOf(q)>-1)&&(!F.a||r.cat===F.a);});
  body.innerHTML='<div class="sl-note" style="background:#fff1d6;border-left-color:#e76f51">⚠️ <b>এটা ডেমো লগ।</b> এই ব্রাউজারে রাখা হয়, তাই ব্রাউজারে ঢুকতে পারা যে কেউ বদলাতে বা মুছতে পারে। সর্বশেষ '+X.bn(MAX)+'টি ঘটনা থাকে। আসল, বদলানো-যায়-না লগের জন্য Phase 9 এর <code>audit_log</code> টেবিল লাগবে।</div>'
  +'<div class="sl-box"><h2>🧾 অডিট লগ ('+X.bn(all.length)+')</h2><div class="ad-fil"><input id="aq" placeholder="🔍 খোঁজো" value="'+E(F.q)+'" style="flex:1;min-width:150px"><select id="ac2"><option value="">সব ধরন</option><option value="auth"'+(F.a==='auth'?' selected':'')+'>🔑 লগইন/পাসওয়ার্ড</option><option value="money"'+(F.a==='money'?' selected':'')+'>💰 পেমেন্ট</option><option value="action"'+(F.a==='action'?' selected':'')+'>✍️ অন্যান্য কাজ</option></select><button class="slb s ad-sm" data-a="ex">⬇️ CSV</button><button class="slb r ad-sm" data-a="cl">🗑️ লগ মুছো</button></div>'
  +(R.length?'<div class="sl-scroll"><table class="sl-tbl"><tr><th>সময়</th><th>কে</th><th>কাজ</th><th>বিবরণ</th></tr>'+R.slice(0,200).map(function(r){return '<tr><td style="white-space:nowrap">'+X.fd(r.t)+' '+new Date(r.t).toTimeString().slice(0,5)+'</td><td>'+E(r.who||'')+'</td><td>'+E(r.act)+'</td><td>'+E(r.detail)+'</td></tr>';}).join('')+'</table></div>'+(R.length>200?'<p style="color:var(--mut)">প্রথম ২০০টি দেখাচ্ছি, বাকিগুলো CSV তে পাবে।</p>':''):'<p style="color:var(--mut)">'+(all.length?'কিছু পাওয়া যায়নি।':'এখনও কোনো ঘটনা নেই। অ্যাডমিন প্যানেলে কিছু করলেই এখানে আসবে।')+'</p>')+'</div>';
  var rf=function(){var n=document.getElementById('aq');n.focus();try{n.setSelectionRange(n.value.length,n.value.length);}catch(e){}};
  document.getElementById('aq').oninput=function(){F.q=this.value;vAud();rf();};
  document.getElementById('ac2').onchange=function(){F.a=this.value;vAud();};
  body.querySelector('[data-a="ex"]').onclick=function(){var o=[['সময়','কে','ধরন','কাজ','বিবরণ']];R.forEach(function(r){o.push([new Date(r.t).toISOString(),r.who,r.cat,r.act,r.detail]);});dl('audit-log.csv',o);};
  body.querySelector('[data-a="cl"]').onclick=function(){if(!confirm('পুরো লগ মুছবে? এটা আর ফেরানো যাবে না।'))return;wr([]);log('অডিট লগ মোছা হয়েছে','',  'auth');vAud();};
 }

 /* ---------- ব্যাকআপ ও রিস্টোর (Phase 10) ---------- */
 /* নিয়ম: অ্যাডমিনের পাসওয়ার্ড hash/সেশন ব্যাকআপে যায় না, রিস্টোরেও কখনো বদলায় না। */
 var PARTS=[
  ['accounts','👥 অ্যাকাউন্ট ও অগ্রগতি (ডেমো)','sl_demo_v1','⚠️ এতে গ্রাহকদের পাসওয়ার্ড hash থাকে, ফাইলটা গোপন রাখো'],
  ['content','📝 কনটেন্ট ড্রাফট (ক্লাস, লেসন, প্রশ্ন, কুইজ, প্ল্যান, ঘোষণা, সেটিংস)','sl_content_draft',''],
  ['staff','🛡️ স্টাফ তালিকা','sl_staff_v1','নাম/ইমেইল আছে, গোপন রাখো'],
  ['rbac','🔑 রোল ও পারমিশন','sl_rbac_v1',''],
  ['audit','🧾 অডিট লগ (ডেমো)','sl_audit_v1',''],
  ['prices','🏷️ পুরোনো দাম (prices)','sl_prices','']
 ];
 var BT='bk',RS=null,BK_MAX=10*1024*1024;
 function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
 function lsJson(k){try{return JSON.parse(lsGet(k)||'null');}catch(e){return null;}}
 function quizKeys(){var o=[];try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('sl_quiz_')===0)o.push(k);}}catch(e){}return o;}
 function snapshot(sel){
  var P={};
  PARTS.forEach(function(x){if(sel&&sel.indexOf(x[0])<0)return;
   if(x[0]==='accounts'&&X.cloud){P.accounts=JSON.parse(JSON.stringify({acc:X.cache().acc,prog:X.cache().prog,ses:null}));return;}
   var v=lsJson(x[2]);if(v!=null)P[x[0]]=v;});
  if(!sel||sel.indexOf('quiz')>-1){var Q={};quizKeys().forEach(function(k){var v=lsGet(k);if(v&&v.length<200000)Q[k]=v;});if(Object.keys(Q).length)P.quiz=Q;}
  if(P.accounts&&P.accounts.ses)P.accounts.ses=null;
  return {app:'shikbolab-backup',v:2,t:Date.now(),parts:P};
 }
 function saveFile(obj,name){var bl=new Blob([JSON.stringify(obj)],{type:'application/json'}),l=document.createElement('a');l.href=URL.createObjectURL(bl);l.download=name;l.click();}
 function cnt(k,v){
  try{if(k==='accounts')return X.bn(Object.keys(v.acc||{}).length)+'টি অ্যাকাউন্ট';
  if(k==='content')return X.bn((v.lessons||[]).length)+' লেসন, '+X.bn((v.questions||[]).length)+' প্রশ্ন, '+X.bn((v.quizzes||[]).length)+' কুইজ';
  if(k==='staff')return X.bn(Array.isArray(v)?v.length:Object.keys(v).length)+' জন';
  if(k==='audit')return X.bn(v.length)+'টি ঘটনা';
  if(k==='quiz')return X.bn(Object.keys(v).length)+'টি কুইজ রেকর্ড';
  return 'আছে';}catch(e){return '?';}
 }
 function isObj(v){return v&&typeof v==='object'&&!Array.isArray(v);}
 /* প্রতিটি অংশ যাচাই: ঠিক না হলে বাতিল, কিছু লেখা হয় না */
 function check(k,v){
  if(k==='accounts'){if(!isObj(v)||!isObj(v.acc))return 'অ্যাকাউন্ট কাঠামো ঠিক নয়';var ks=Object.keys(v.acc);if(ks.length>5000)return 'অ্যাকাউন্ট সংখ্যা অস্বাভাবিক';
   for(var i=0;i<ks.length;i++){var a=v.acc[ks[i]];if(!isObj(a)||typeof a.email!=='string'||a.email!==ks[i])return 'একটা অ্যাকাউন্ট রেকর্ড ঠিক নয়';}
   if(v.prog!=null&&!isObj(v.prog))return 'অগ্রগতি ঠিক নয়';return '';}
  if(k==='content'){if(!isObj(v))return 'কনটেন্ট ঠিক নয়';var A=['classes','subjects','lessons','labs','questions','quizzes'];for(var j=0;j<A.length;j++)if(v[A[j]]!=null&&!Array.isArray(v[A[j]]))return A[j]+' তালিকা ঠিক নয়';
   if(v.chapters!=null&&!isObj(v.chapters))return 'chapters ঠিক নয়';return '';}
  if(k==='staff'){return (Array.isArray(v)||isObj(v))?'':'স্টাফ ঠিক নয়';}
  if(k==='rbac'){return isObj(v)||Array.isArray(v)?'':'রোল ঠিক নয়';}
  if(k==='audit'){if(!Array.isArray(v)||v.length>MAX)return 'অডিট লগ ঠিক নয়';return v.every(function(r){return isObj(r)&&typeof r.t==='number'&&typeof r.act==='string';})?'':'অডিট রেকর্ড ঠিক নয়';}
  if(k==='prices'){return isObj(v)?'':'দাম ঠিক নয়';}
  if(k==='quiz'){if(!isObj(v))return 'কুইজ রেকর্ড ঠিক নয়';return Object.keys(v).every(function(x){return x.indexOf('sl_quiz_')===0&&typeof v[x]==='string'&&v[x].length<200000;})?'':'কুইজ রেকর্ডের কী ঠিক নয়';}
  return 'অচেনা অংশ';
 }
 function parseBackup(txt){
  var x;try{x=JSON.parse(txt);}catch(e){return {err:'ফাইলটা JSON নয়'};}
  if(isObj(x)&&x.app==='shikbolab-backup'&&x.v===2&&isObj(x.parts)){
   var out={};Object.keys(x.parts).forEach(function(k){out[k]=x.parts[k];});return {parts:out,t:x.t,legacy:false};}
  /* পুরোনো (v1) ব্যাকআপ: শুধু অ্যাকাউন্ট। অ্যাডমিন পাসওয়ার্ড কখনো ফেরানো হয় না। */
  if(isObj(x)&&x.v===1&&isObj(x.data)&&isObj(x.data.acc))return {parts:{accounts:x.data},t:x.t,legacy:true};
  return {err:'এটা ShikboLab ব্যাকআপ ফাইল নয়'};
 }
 function vBk(){
  var body=X.body,last=+lsGet('sl_last_backup')||0;
  var tabs='<div class="ad-tabs"><button data-bt="bk" class="'+(BT==='bk'?'on':'')+'">💾 ব্যাকআপ ও রিস্টোর</button><button data-bt="hc" class="'+(BT==='hc'?'on':'')+'">🩺 সিস্টেম চেক</button><button data-bt="gn" class="'+(BT==='gn'?'on':'')+'">⚙️ অন্যান্য সেটিংস</button></div>';
  if(BT==='hc')return vHc(tabs);
  if(BT==='gn'){X.legacy();body.insertAdjacentHTML('afterbegin',tabs);tabsBind();return;}
  var ag=last?Math.floor((Date.now()-last)/864e5):-1;
  var h=tabs+'<div class="sl-note" style="'+(ag<0||ag>7?'background:#fff1d6;border-left-color:#e76f51':'background:#e1f5ee;border-left-color:#2a9d8f')+'">'+(ag<0?'⚠️ এই ব্রাউজারে এখনও কোনো ব্যাকআপ নামানো হয়নি।':(ag>7?'⚠️ শেষ ব্যাকআপ <b>'+X.bn(ag)+' দিন</b> আগে। নতুন একটা নামাও।':'✅ শেষ ব্যাকআপ '+(ag===0?'আজ':X.bn(ag)+' দিন আগে')+'।'))+' ব্রাউজারের ডেটা মুছে গেলে এখানকার সব ডেমো তথ্য চলে যায়।</div>'
  +'<div class="sl-box"><h2>⬇️ ব্যাকআপ নামাও</h2><p style="color:var(--mut);margin-top:0">কোন কোন অংশ নেবে?</p>'
  +PARTS.concat([['quiz','🏆 কুইজের ফলাফল (এই ব্রাউজারের)','',' ']]).map(function(x){var c=x[0]==='quiz'?quizKeys().length:(lsGet(x[2])?1:0);if(x[0]==='accounts'&&X.cloud)c=1;return '<label style="display:flex;gap:8px;align-items:flex-start;margin:6px 0;font-weight:600"><input type="checkbox" class="bkp" value="'+x[0]+'"'+(c?' checked':' disabled')+'><span>'+x[1]+(c?'':' <small style="color:var(--mut)">(কিছু নেই)</small>')+(x[3]&&x[3].trim()?'<br><small style="color:#b4501d;font-weight:500">'+x[3]+'</small>':'')+'</span></label>';}).join('')
  +'<div class="sl-note">🔒 অ্যাডমিনের পাসওয়ার্ড ও লগইন সেশন ব্যাকআপে <b>কখনো যায় না</b>। ফাইলটা যেখানে-সেখানে শেয়ার করো না।</div><div class="ad-inl"><button class="slb p" data-a="bk">⬇️ ব্যাকআপ নামাও</button></div></div>'
  +'<div class="sl-box"><h2>⬆️ ব্যাকআপ থেকে ফেরাও</h2><p style="color:var(--mut);margin-top:0">ফাইল বাছলে আগে যাচাই করে কী কী আছে দেখাব। তারপর তুমি বেছে নেবে কোনগুলো ফেরাবে। ফেরানোর আগে বর্তমান অবস্থার একটা <b>নিরাপত্তা-ব্যাকআপ</b> নিজে নেমে যাবে।</p><label class="slb s" style="cursor:pointer">📂 ফাইল বাছো<input type="file" id="bkf" accept=".json,application/json" style="display:none"></label><div id="rsb" style="margin-top:12px"></div></div>';
  body.innerHTML=h;tabsBind();
  if(RS)renderRs();
  body.querySelector('[data-a="bk"]').onclick=function(){var sel=[].map.call(body.querySelectorAll('.bkp:checked'),function(c){return c.value;});if(!sel.length)return X.toast('❌ কমপক্ষে একটা অংশ বাছো');
   saveFile(snapshot(sel),'shikbolab-backup-'+dayKey(Date.now())+'.json');try{localStorage.setItem('sl_last_backup',String(Date.now()));}catch(e){}log('ব্যাকআপ নামানো হয়েছে',sel.join(', '),'action');X.toast('✅ ব্যাকআপ নেমেছে');vBk();};
  document.getElementById('bkf').onchange=function(){var f=this.files[0];if(!f)return;if(f.size>BK_MAX){RS={err:'ফাইল ১০ MB এর বেশি, নেওয়া যাবে না'};renderRs();return;}
   var r=new FileReader();r.onload=function(){var p=parseBackup(String(r.result));if(p.err){RS={err:p.err};}else{RS={parts:{},bad:{},t:p.t,legacy:p.legacy};Object.keys(p.parts).forEach(function(k){var e=check(k,p.parts[k]);if(e)RS.bad[k]=e;else RS.parts[k]=p.parts[k];});}renderRs();};r.readAsText(f);};
 }
 function tabsBind(){[].forEach.call(X.body.querySelectorAll('[data-bt]'),function(b){b.onclick=function(){BT=b.dataset.bt;RS=null;vBk();};});}
 function renderRs(){
  var box=document.getElementById('rsb');if(!box)return;
  if(RS.err){box.innerHTML='<div class="sl-note" style="background:#fde2e2;border-left-color:#c0392b">❌ '+E(RS.err)+'</div>';return;}
  var ks=Object.keys(RS.parts),bd=Object.keys(RS.bad);
  box.innerHTML='<div class="sl-note">📦 ব্যাকআপ নেওয়া হয়েছিল: <b>'+(RS.t?X.fd(RS.t):'জানা নেই')+'</b>'+(RS.legacy?' · পুরোনো ধরনের ফাইল (শুধু অ্যাকাউন্ট আছে; এতে থাকা অ্যাডমিন পাসওয়ার্ড <b>ফেরানো হবে না</b>)':'')+'</div>'
  +ks.map(function(k){var nm=(PARTS.filter(function(x){return x[0]===k;})[0]||[k,k==='quiz'?'🏆 কুইজের ফলাফল':k])[1];return '<label style="display:flex;gap:8px;margin:6px 0;font-weight:600"><input type="checkbox" class="rsp" value="'+E(k)+'" checked><span>'+nm+' <small style="color:var(--mut)">— '+cnt(k,RS.parts[k])+'</small></span></label>';}).join('')
  +bd.map(function(k){return '<div style="color:#c0392b;margin:6px 0">❌ '+E(k)+': '+E(RS.bad[k])+' (বাদ দেওয়া হলো)</div>';}).join('')
  +(ks.length?'<div class="ad-inl" style="margin-top:8px"><button class="slb o" data-a="rs">⬆️ বাছাইকরা অংশ ফেরাও</button></div>':'<p style="color:var(--mut)">ফেরানোর মতো ঠিক অংশ নেই।</p>');
  var b=box.querySelector('[data-a="rs"]');if(!b)return;
  b.onclick=function(){var sel=[].map.call(box.querySelectorAll('.rsp:checked'),function(c){return c.value;});if(!sel.length)return X.toast('❌ কিছু বাছো');
   if(sel.indexOf('accounts')>-1&&X.cloud){sel=sel.filter(function(x){return x!=='accounts';});X.toast('ℹ️ ক্লাউড মোডে অ্যাকাউন্ট ফেরানো হয় না, বাদ দিলাম');if(!sel.length)return;}
   if(!confirm('বাছাইকরা অংশগুলো বর্তমান তথ্যের জায়গায় বসবে। এর আগে বর্তমান অবস্থার নিরাপত্তা-ব্যাকআপ নামবে। এগোবে?'))return;
   saveFile(snapshot(null),'shikbolab-before-restore-'+dayKey(Date.now())+'.json');
   try{sel.forEach(function(k){var v=RS.parts[k];
    if(k==='quiz'){Object.keys(v).forEach(function(q){localStorage.setItem(q,v[q]);});return;}
    if(k==='accounts'){v=JSON.parse(JSON.stringify(v));v.ses=null;if(!isObj(v.prog))v.prog={};}
    localStorage.setItem(PARTS.filter(function(x){return x[0]===k;})[0][2],JSON.stringify(v));});
   log('ব্যাকআপ থেকে ফেরানো হয়েছে',sel.join(', '),'auth');X.toast('✅ ফেরানো হয়েছে');}catch(e){X.toast('❌ ফেরানো যায়নি (ব্রাউজারের জায়গা ভরে গেছে?)');}
   RS=null;X.rerender();};
 }

 /* ---------- সিস্টেম হেলথ চেক ---------- */
 function chSet(){var o={};(window.CHAPTERS_BASE||window.CHAPTERS||[]).forEach(function(c){o[String(c.file||'').split('/').pop().replace(/\.html.*$/,'')]=1;});return o;}
 function runHealth(){
  var R=[],ok=function(t){R.push(['ok',t]);},wr=function(t){R.push(['warn',t]);},er=function(t){R.push(['err',t]);};
  [['SL','ডেমো সিস্টেম'],['SLLesson','লেসন ভিউয়ার'],['SLQuiz','কুইজ ভিউয়ার'],['ADC','কনটেন্ট ম্যানেজার'],['ADP','লোক ম্যানেজার'],['ADB','পেমেন্ট ম্যানেজার'],['SLPay','পেমেন্ট প্রোভাইডার'],['SLBackend','ব্যাকএন্ড adapter']].forEach(function(x){window[x[0]]?ok(x[1]+' লোড হয়েছে'):er(x[1]+' ('+x[0]+') লোড হয়নি, ফাইল আপলোড হয়েছে কিনা দেখো');});
  var pub=window.SL_CONTENT,dr=lsJson('sl_content_draft'),C=dr||pub||{},CS=chSet(),ids,dup=function(a,k){var s={},d=0;(a||[]).forEach(function(x){var v=x&&x[k];if(s[v])d++;s[v]=1;});return d;};
  if(!pub)er('js/content.js পাওয়া যাচ্ছে না');
  else if(dr&&JSON.stringify(dr)!==JSON.stringify(pub))wr('কনটেন্টে অপ্রকাশিত পরিবর্তন আছে (ড্রাফট ≠ লাইভ content.js)। লাইভ করতে content.js নামিয়ে বসাও।');else ok('ড্রাফট ও লাইভ content.js মিলছে');
  var d1=dup(C.classes,'id')+dup(C.subjects,'k')+dup(C.lessons,'id')+dup(C.labs,'id')+dup(C.questions,'id')+dup(C.quizzes,'id')+dup(C.plans,'key')+dup(C.announcements,'id');
  d1?er(X.bn(d1)+'টি ডুপ্লিকেট ID পাওয়া গেছে'):ok('কোনো ডুপ্লিকেট ID নেই');
  var bc=(C.classes||[]).filter(function(c){return !c.name||!(+c.from>=1)||+c.to<+c.from;}).length;bc?er(X.bn(bc)+'টি ক্লাসের নাম/সীমা ঠিক নয়'):ok('ক্লাস ঠিক আছে ('+X.bn((C.classes||[]).length)+'টি)');
  var bl=(C.lessons||[]).filter(function(l){return !l.title||!(l.sections||[]).length;}).length,ml=(C.lessons||[]).filter(function(l){return l.chapter&&!CS[l.chapter];}).length;
  bl?wr(X.bn(bl)+'টি লেসনে শিরোনাম বা সেকশন নেই'):ok('লেসন ঠিক আছে ('+X.bn((C.lessons||[]).length)+'টি)');if(ml)er(X.bn(ml)+'টি লেসন এমন অধ্যায় দেখাচ্ছে যা chapters.js এ নেই');
  var ql=window.SLQuiz?(C.questions||[]).filter(function(q){return SLQuiz.validate(q);}).length:0;ql?er(X.bn(ql)+'টি প্রশ্নে ভুল আছে (প্রশ্নব্যাংকে গিয়ে ঠিক করো)'):ok('প্রশ্ন ঠিক আছে ('+X.bn((C.questions||[]).length)+'টি)');
  ids={};(C.questions||[]).forEach(function(q){ids[q.id]=1;});var dead=0,emp=0;(C.quizzes||[]).forEach(function(z){(z.qids||[]).forEach(function(i){if(!ids[i])dead++;});if(z.state==='published'&&!(z.qids||[]).length)emp++;});
  dead?er(X.bn(dead)+'টি কুইজ-প্রশ্ন মুছে যাওয়া প্রশ্নের দিকে ইঙ্গিত করছে'):ok('কুইজের প্রশ্ন-সংযোগ ঠিক আছে');if(emp)wr(X.bn(emp)+'টি প্রকাশিত কুইজে কোনো প্রশ্ন নেই');
  var lb=(C.labs||[]).filter(function(l){return l.chapter&&!CS[l.chapter];}).length;if(lb)er(X.bn(lb)+'টি ল্যাব রেকর্ড অজানা অধ্যায় দেখাচ্ছে');
  var pl=C.plans||[];if(pl.length){var np=pl.filter(function(p){return !(p.price&&+p.price.month>=0&&+p.price.week>=0);}).length;np?er(X.bn(np)+'টি প্ল্যানের দাম ঠিক নয়'):ok('প্ল্যান ঠিক আছে');if(!pl.some(function(p){return p.active!==false;}))er('সব প্ল্যান বন্ধ! কেউ কিনতে পারবে না');}
  var fc=(C.freeChapters||[]).filter(function(f){return !CS[f];}).length;if(fc)er(X.bn(fc)+'টি ফ্রি-অধ্যায়ের নাম chapters.js এ নেই');var tc=(C.trialChapters||[]).filter(function(f){return !CS[f];}).length;if(tc)er(X.bn(tc)+'টি ট্রায়াল-অধ্যায়ের নাম chapters.js এ নেই');
  var ct=(C.site||{}).contact||{};if(ct.email&&!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(ct.email))er('সাইটের যোগাযোগ ইমেইল ঠিক নয়');
  if(!(ct.phone||ct.email))wr('সাইটে কোনো যোগাযোগের তথ্য দেওয়া নেই (ওয়েবসাইট সেটিংস)');
  if((C.site||{}).maintenance&&C.site.maintenance.on)wr('মেইন্টেন্যান্স মোড চালু আছে, শিক্ষার্থীরা পর্দা দেখবে');
  var tot=0;try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);tot+=(k.length+(localStorage.getItem(k)||'').length)*2;}}catch(e){}
  var kb=Math.round(tot/1024);kb>3500?er('ব্রাউজার স্টোরেজ প্রায় ভরা ('+X.bn(kb)+' KB / ~৫০০০ KB)। ব্যাকআপ নিয়ে পরিষ্কার করো'):(kb>2000?wr('ব্রাউজার স্টোরেজ '+X.bn(kb)+' KB ব্যবহার হচ্ছে'):ok('ব্রাউজার স্টোরেজ ঠিক আছে ('+X.bn(kb)+' KB)'));
  var last=+lsGet('sl_last_backup')||0,nAcc=X.list().length;(nAcc||dr)&&(!last||Date.now()-last>7*864e5)?wr('ব্যাকআপ নেই বা ৭ দিনের পুরোনো'):ok('ব্যাকআপ হালনাগাদ');
  var bs=window.SLBackend?SLBackend.status():null;if(bs&&bs.danger)er(bs.msg);else ok('ব্যাকএন্ড কনফিগে বিপজ্জনক key নেই');
  if(nAcc>0&&!X.cloud)wr('ডেমো স্টোরেজে '+X.bn(nAcc)+'টি অ্যাকাউন্ট আছে। আসল গ্রাহকের অ্যাকাউন্ট/পেমেন্ট ডেমোতে রাখা নিরাপদ নয় (Phase 9 backend লাগবে)');
  return R;
 }
 var LINKS=null;
 function vHc(tabs){
  var body=X.body,R=runHealth(),c={ok:0,warn:0,err:0};R.forEach(function(r){c[r[0]]++;});
  var ic={ok:'✅',warn:'⚠️',err:'❌'},col={ok:'#2a9d8f',warn:'#e9a23b',err:'#c0392b'};
  body.innerHTML=tabs+'<div class="ad-cards"><div><small>✅ ঠিক</small><b>'+X.bn(c.ok)+'</b></div><div><small>⚠️ সতর্কতা</small><b>'+X.bn(c.warn)+'</b></div><div><small>❌ সমস্যা</small><b>'+X.bn(c.err)+'</b></div></div>'
  +'<div class="sl-box"><h2>🩺 সিস্টেম চেক</h2>'+R.sort(function(a,b){var o={err:0,warn:1,ok:2};return o[a[0]]-o[b[0]];}).map(function(r){return '<div style="padding:7px 0;border-bottom:1px solid var(--line);color:'+(r[0]==='ok'?'var(--ink)':col[r[0]])+'">'+ic[r[0]]+' '+E(r[1])+'</div>';}).join('')+'</div>'
  +'<div class="sl-box"><h2>🔗 অধ্যায়-পেজ লিংক চেক</h2><p style="color:var(--mut);margin-top:0">chapters.js এর প্রতিটা পেজ সত্যিই খোলে কিনা দেখে (ইন্টারনেটে/লোকাল সার্ভারে চালালে কাজ করে)।</p><div class="ad-inl"><button class="slb s" data-a="lk">🔗 চেক শুরু করো</button></div><div id="lkr" style="margin-top:10px">'+(LINKS||'')+'</div></div>'
  +'<div class="sl-note">ℹ️ এই চেক শুধু ডেটার গঠন ও লোড হওয়া দেখে। সিমুলেশনের বিজ্ঞান ঠিক কিনা বা পেজ দেখতে সুন্দর কিনা, সেটা এটা বলতে পারে না।</div>';
  tabsBind();
  body.querySelector('[data-a="lk"]').onclick=function(){
   var A=(window.CHAPTERS_BASE||window.CHAPTERS||[]),bad=[],done=0,box=document.getElementById('lkr'),i=0;
   if(location.protocol==='file:'){box.textContent='❌ file:// এ চলে না। GitHub Pages বা লোকাল সার্ভারে খোলো।';return;}
   box.textContent='চেক চলছে… ০/'+A.length;
   function next(){if(i>=A.length)return;var c=A[i++],u=String(c.file||'').split('?')[0];
    fetch(u,{method:'HEAD',cache:'no-store'}).then(function(r){if(!r.ok)bad.push(u+' ('+r.status+')');}).catch(function(){bad.push(u+' (নেটওয়ার্ক)');}).then(function(){done++;box.textContent='চেক চলছে… '+X.bn(done)+'/'+X.bn(A.length);if(done===A.length){LINKS=bad.length?'':'';box.innerHTML=bad.length?'<div style="color:#c0392b">❌ '+X.bn(bad.length)+'টি পেজ খোলেনি:<br>'+bad.map(E).join('<br>')+'</div>':'<div style="color:#2a9d8f;font-weight:700">✅ '+X.bn(A.length)+'টি পেজই ঠিকমতো পাওয়া গেছে</div>';}else next();});}
   for(var w=0;w<6;w++)next();
  };
 }
 window.ADO={log:log,count:function(){return rd().length;},view:function(n,ctx){X=ctx;({an:vAn,aud:vAud,st:vBk})[n]();}};
})();
