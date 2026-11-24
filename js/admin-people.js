/* ShikboLab অ্যাডমিন: শিক্ষার্থী, শিক্ষক, স্টাফ ও রোল-পারমিশন (Phase 6, ডেমো মোড)
   ⚠️ এই অংশ কিছুই নিরাপদভাবে এনফোর্স করে না। রোল ও পারমিশন এখন শুধু নকশা + মেনু প্রিভিউ।
   আসল লগইন, পারমিশন যাচাই ও স্টাফ অ্যাকাউন্ট Phase 9-এ backend এ হবে।
   গোপনীয়তা: স্টাফের নাম/ইমেইল শুধু এই ব্রাউজারে থাকে, কখনো content.js বা GitHub এ যায় না। */
(function(){
 var RK='sl_rbac_v1',SK='sl_staff_v1',X=null,ed={},tabP='st',sf={q:'',c:'',s:''};
 var PERMS=[['content.view','কনটেন্ট দেখা'],['content.edit','কনটেন্ট এডিট'],['content.publish','কনটেন্ট প্রকাশ'],['labs.manage','ল্যাব ম্যানেজ'],['questions.manage','প্রশ্নব্যাংক'],['quizzes.manage','কুইজ ম্যানেজ'],['students.view','শিক্ষার্থী দেখা'],['students.manage','শিক্ষার্থী/অ্যাকাউন্ট ম্যানেজ'],['teachers.manage','শিক্ষক ম্যানেজ'],['staff.manage','স্টাফ ও রোল ম্যানেজ'],['plans.manage','প্ল্যান ও দাম'],['payments.view','পেমেন্ট দেখা'],['payments.manage','পেমেন্ট ম্যানেজ'],['notifications.send','নোটিফিকেশন'],['analytics.view','অ্যানালিটিক্স'],['audit.view','অডিট লগ'],['settings.manage','ওয়েবসাইট সেটিংস'],['security.manage','সিকিউরিটি'],['backup.manage','ব্যাকআপ ও রিস্টোর']];
 var ALL=PERMS.map(function(p){return p[0];});
 var DEF=[
  {id:'super_admin',name:'সুপার অ্যাডমিন',desc:'পুরো প্ল্যাটফর্মের নিয়ন্ত্রণ',fixed:true,perms:ALL.slice()},
  {id:'admin',name:'অ্যাডমিন',desc:'নির্দিষ্ট অপারেশনাল কাজ',perms:['content.view','content.edit','content.publish','labs.manage','questions.manage','quizzes.manage','students.view','students.manage','teachers.manage','payments.view','notifications.send','analytics.view']},
  {id:'teacher',name:'শিক্ষক',desc:'নিজের ক্লাসের লেসন, কুইজ ও শিক্ষার্থী',perms:['content.view','content.edit','questions.manage','quizzes.manage','students.view','analytics.view']},
  {id:'editor',name:'কনটেন্ট এডিটর',desc:'কনটেন্ট বানায় ও এডিট করে, ইউজার/পেমেন্ট/সিকিউরিটি নয়',perms:['content.view','content.edit','labs.manage','questions.manage','quizzes.manage']},
  {id:'student',name:'শিক্ষার্থী',desc:'শুধু শেখার কনটেন্ট ও নিজের অগ্রগতি (অ্যাডমিন প্যানেলে ঢোকে না)',fixed:true,perms:[]}
 ];
 var NP={cls:'content.view',sbj:'content.view',chp:'content.view',les:'content.view',lab:'labs.manage',s_biology:'content.view',s_physics:'content.view',s_chemistry:'content.view',s_math:'content.view',qb:'questions.manage',qz:'quizzes.manage',stu:'students.view',ac:'students.manage',nw:'students.manage',tch:'teachers.manage',adm:'staff.manage',pr:'plans.manage',pm:'payments.view',ntf:'notifications.send',an:'analytics.view',aud:'audit.view',web:'settings.manage',sec:'security.manage',st:'backup.manage'};
 function clone(o){return JSON.parse(JSON.stringify(o));}
 function rb(){var r=null;try{r=JSON.parse(localStorage.getItem(RK)||'null');}catch(e){}if(!r||!r.roles){r={roles:clone(DEF),viewAs:'super_admin'};}
  r.roles.forEach(function(x){if(x.id==='super_admin')x.perms=ALL.slice();if(x.id==='student')x.perms=[];});return r;}
 function rsave(r){try{localStorage.setItem(RK,JSON.stringify(r));}catch(e){}}
 function staff(){try{var s=JSON.parse(localStorage.getItem(SK)||'[]');return Array.isArray(s)?s:[];}catch(e){return [];}}
 function ssave(a){try{localStorage.setItem(SK,JSON.stringify(a));}catch(e){}}
 function uid(p){return p+Date.now().toString(36)+Math.floor(Math.random()*99);}
 function E(s){return X.esc(s);}
 function rr(){X.rerender();}
 function mask(e){e=String(e||'');var i=e.indexOf('@');if(i<2)return '***'+e.slice(i);return e.slice(0,2)+'***'+e.slice(i);}
 function roleName(id){var r=rb().roles.filter(function(x){return x.id===id;})[0];return r?r.name:id;}
 function v(id){var e=document.getElementById(id);return e?e.value:'';}
 function dl(name,text){var b=new Blob([text],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();}
 function onClick(body,fn){body.onclick=function(e){var b=e.target.closest('[data-a]');if(!b||b.disabled)return;fn(b.dataset.a,b.dataset.i,b);};}
 function demoNote(){return '<div class="sl-note">🧪 <b>ডেমো মোড:</b> এখানকার রোল/পারমিশন কিছুই সত্যিকারভাবে আটকায় না, কারণ সবই ব্রাউজারে। আসল পারমিশন যাচাই সার্ভারে (Phase 9) হবে।</div>';}
 /* ---------- শিক্ষার্থী ---------- */
 function students(){
  var out=[];X.list().forEach(function(a){X.profiles(a).forEach(function(p){if(p.role!=='student')return;
   out.push({a:a,p:p,cls:p.id==='owner'?(a.cls||0):(p.cls||0)});});});return out;
 }
 function vStu(){
  var body=X.body,S=students(),q=(sf.q||'').toLowerCase();
  var R=S.filter(function(r){var st=X.stat(r.a).state;return (!q||(r.p.name+' '+r.a.name+' '+(r.a.school||'')).toLowerCase().indexOf(q)>-1)&&(!sf.c||String(r.cls)===sf.c)&&(!sf.s||(sf.s==='sus'?st==='suspended':sf.s==='act'?(st==='active'||st==='trial'):st==='expired'));});
  var h='<div class="ad-cards"><div><small>🎓 মোট শিক্ষার্থী</small><b>'+X.bn(S.length)+'</b><em>এই ব্রাউজারের ডাটা</em></div><div><small>✅ চালু</small><b>'+X.bn(S.filter(function(r){var s=X.stat(r.a).state;return s==='active'||s==='trial';}).length)+'</b></div><div><small>🚫 বন্ধ</small><b>'+X.bn(S.filter(function(r){return X.stat(r.a).state==='suspended';}).length)+'</b></div><div><small>🏷️ ক্লাস দেওয়া নেই</small><b>'+X.bn(S.filter(function(r){return !r.cls;}).length)+'</b></div></div>'
  +'<div class="sl-box"><div class="ad-fil"><input id="sq" placeholder="🔍 নাম বা স্কুল খোঁজো" value="'+E(sf.q)+'" style="flex:1;min-width:160px"><select id="sc"><option value="">সব ক্লাস</option><option value="0"'+(sf.c==='0'?' selected':'')+'>ক্লাস নেই</option>'+[6,7,8,9,10,11,12].map(function(c){return '<option value="'+c+'"'+(sf.c===String(c)?' selected':'')+'>'+X.bn(c)+' শ্রেণি</option>';}).join('')+'</select><select id="ss"><option value="">সব অবস্থা</option><option value="act"'+(sf.s==='act'?' selected':'')+'>চালু/ট্রায়াল</option><option value="exp"'+(sf.s==='exp'?' selected':'')+'>মেয়াদ শেষ</option><option value="sus"'+(sf.s==='sus'?' selected':'')+'>বন্ধ</option></select></div>';
  h+=R.length?R.map(function(r){
   var key=r.a.email+'|'+r.p.id,open=ed.stu===key,pg=(X.prog(r.a.email)||{})[r.p.id]||{},ks=Object.keys(pg),avg=ks.length?Math.round(ks.reduce(function(s,k){return s+pg[k].pc;},0)/ks.length):0,perf=ks.filter(function(k){return pg[k].pc>=100;}).length;
   var row='<div class="ad-row"><div class="nm">'+E(r.p.name)+'<small>'+E(r.a.school||r.a.name)+' · '+(r.cls?X.bn(r.cls)+' শ্রেণি':'ক্লাস নেই')+'</small></div>'+X.badge(r.a)+'<span style="color:var(--mut);font-size:14px">📈 '+X.bn(ks.length)+'টি কুইজ'+(ks.length?' · গড় '+X.bn(avg)+'%':'')+'</span><button class="slb s ad-sm" data-a="op" data-i="'+E(key)+'">'+(open?'বন্ধ':'প্রোফাইল')+'</button></div>';
   if(!open)return row;
   var tb=ks.length?'<div class="sl-scroll"><table class="sl-tbl"><tr><th>অধ্যায়</th><th>স্কোর</th><th>%</th></tr>'+ks.map(function(k){var c=(window.CHAPTERS_BASE||[]).filter(function(x){return String(x.file).indexOf(k+'.html')>-1;})[0];return '<tr><td>'+E(c?c.title:k)+'</td><td>'+X.bn(pg[k].s)+'/'+X.bn(pg[k].t)+'</td><td>'+X.bn(pg[k].pc)+'%</td></tr>';}).join('')+'</table></div>':'<small style="color:var(--mut)">এখনও কুইজ দেয়নি</small>';
   return row+'<div class="ad-panel"><div class="ad-f"><div><label>অ্যাকাউন্ট (মাস্ক করা)</label><input value="'+E(mask(r.a.email))+'" disabled></div><div><label>অ্যাকাউন্ট খোলার তারিখ</label><input value="'+E(X.fd(r.a.created))+'" disabled></div><div><label>ক্লাস</label><select id="cl"><option value="0">— নেই —</option>'+[6,7,8,9,10,11,12].map(function(c){return '<option value="'+c+'"'+(r.cls===c?' selected':'')+'>'+X.bn(c)+' শ্রেণি</option>';}).join('')+'</select></div></div>'
   +'<div><h4>📈 অগ্রগতি ও অর্জন</h4><p style="margin:0 0 8px;color:var(--mut)">কুইজ দেওয়া: <b>'+X.bn(ks.length)+'</b> · গড় স্কোর: <b>'+X.bn(avg)+'%</b> · ১০০% পাওয়া: <b>'+X.bn(perf)+'</b>টি অধ্যায়'+(perf>=3?' 🏅':'')+'</p>'+tb+'</div>'
   +'<div class="ad-inl"><button class="slb o ad-sm" data-a="sc" data-i="'+E(key)+'">💾 ক্লাস সেভ</button><button class="slb '+(X.stat(r.a).state==='suspended'?'o':'r')+' ad-sm" data-a="su" data-i="'+E(key)+'">'+(X.stat(r.a).state==='suspended'?'♻️ অ্যাকাউন্ট চালু/রিস্টোর':'🚫 অ্যাকাউন্ট বন্ধ করো')+'</button><button class="slb s ad-sm" data-a="rs" data-i="'+E(key)+'">🔑 অ্যাক্সেস রিসেট</button></div>'
   +'<div class="ad-inl" style="margin-top:8px"><label style="font-weight:700">🎁 ম্যানুয়াল ফ্রি অ্যাক্সেস (সব অধ্যায়):</label> <input id="cd" type="number" min="1" max="3650" value="30" style="width:90px"> দিন <button class="slb o ad-sm" data-a="cg" data-i="'+E(key)+'">🎁 দাও</button>'+(r.a.compUntil&&r.a.compUntil>Date.now()?'<button class="slb r ad-sm" data-a="cr" data-i="'+E(key)+'">✖️ ফ্রি অ্যাক্সেস বাতিল</button> <small>আছে: '+E(X.fd(r.a.compUntil))+' পর্যন্ত</small>':'')+'</div><small style="color:var(--mut)">এটা পেমেন্ট নয়, আয়ের হিসাবে ঢুকবে না। শুধু এই ব্রাউজারের demo ডাটায় কাজ করে।</small>'
   +'<small style="color:var(--mut)">⚠️ বন্ধ/চালু পুরো অ্যাকাউন্টে প্রযোজ্য (ফ্যামিলি/স্কুলে সবাইকে)। পাসওয়ার্ড বা হ্যাশ কখনো এখানে দেখানো হয় না। নিরাপদ রিসেট (ইমেইল লিংক) backend ছাড়া সম্ভব না, তাই এখন অ্যাকাউন্ট পেজে গিয়ে নতুন পাসওয়ার্ড বসাতে হয়।</small></div>';
  }).join(''):'<p style="color:var(--mut)">'+(S.length?'কিছু পাওয়া যায়নি।':'এই ব্রাউজারে কোনো শিক্ষার্থী নেই। অ্যাকাউন্ট ইমপোর্ট/তৈরি করলে এখানে আসবে।')+'</p>';
  h+='</div>'+demoNote();body.innerHTML=h;
  function rf(i){var n=document.getElementById(i);if(n){n.focus();try{n.setSelectionRange(n.value.length,n.value.length);}catch(e){}}}
  document.getElementById('sq').oninput=function(){sf.q=this.value;vStu();rf('sq');};document.getElementById('sc').onchange=function(){sf.c=this.value;vStu();};document.getElementById('ss').onchange=function(){sf.s=this.value;vStu();};
  onClick(body,function(a,key){
   var em=(key||'').split('|')[0],pid=(key||'').split('|')[1];
   if(a==='op'){ed.stu=ed.stu===key?null:key;rr();}
   else if(a==='sc'){var c=+v('cl')||0;X.mut(em,function(ac){if(pid==='owner')ac.cls=c;else{var m=(ac.members||[]).filter(function(x){return x.id===pid;})[0];if(m){m.cls=c;ac.mv=Date.now();}}});X.toast('✅ ক্লাস সেভ হয়েছে');rr();}
   else if(a==='su'){var cur=X.list().filter(function(x){return x.email===em;})[0],now=X.stat(cur).state==='suspended';if(!now&&!confirm('এই অ্যাকাউন্টের সবাই লগইন/কনটেন্ট থেকে বন্ধ হয়ে যাবে। নিশ্চিত?'))return;X.mut(em,function(ac){ac.suspended=!now;});X.toast(now?'✅ চালু হয়েছে':'🚫 বন্ধ হয়েছে');rr();}
   else if(a==='cg'){var dd=Math.round(+v('cd'));if(!(dd>=1&&dd<=3650))return X.toast('❌ ১–৩৬৫০ দিনের মধ্যে দাও');if(!confirm('এই অ্যাকাউন্টকে '+dd+' দিন সব অধ্যায় ফ্রি দেবে। নিশ্চিত?'))return;X.mut(em,function(ac){ac.compUntil=Date.now()+dd*864e5;});X.toast('✅ ফ্রি অ্যাক্সেস দেওয়া হয়েছে ('+dd+' দিন)');rr();}
   else if(a==='cr'){if(!confirm('ফ্রি অ্যাক্সেস বাতিল করবে? (পেমেন্টের মেয়াদ থাকলে সেটা থাকবে)'))return;X.mut(em,function(ac){ac.compUntil=0;});X.toast('✅ ফ্রি অ্যাক্সেস বাতিল');rr();}
   else if(a==='rs'){X.goAcc(em);}
  });
 }
 /* ---------- শিক্ষক ---------- */
 function vTch(){
  var body=X.body,T=[],sch=[];
  X.list().forEach(function(a){var L=X.limits(a);if(L.isSchool)sch.push(a);(a.members||[]).forEach(function(m){if(m.role==='teacher')T.push({a:a,m:m});});});
  var h='<div class="ad-cards"><div><small>👩‍🏫 মোট শিক্ষক</small><b>'+X.bn(T.length)+'</b><em>এই ব্রাউজারের ডাটা</em></div><div><small>🏫 স্কুল অ্যাকাউন্ট</small><b>'+X.bn(sch.length)+'</b></div></div><div class="sl-box"><h2>👩‍🏫 শিক্ষক তালিকা</h2>';
  h+=T.length?T.map(function(r){var key=r.a.email+'|'+r.m.id,open=ed.tch===key,cids=r.m.cids||[];
   var row='<div class="ad-row"><div class="nm">'+E(r.m.name)+'<small>'+E(r.a.school||r.a.name)+' · ক্লাস: '+(cids.length?cids.join(', '):'দেওয়া নেই')+'</small></div>'+X.badge(r.a)+'<div class="ad-inl"><button class="slb s ad-sm" data-a="te" data-i="'+E(key)+'">'+(open?'বন্ধ':'ক্লাস দাও')+'</button><button class="slb r ad-sm" data-a="td" data-i="'+E(key)+'">🗑️</button></div></div>';
   if(!open)return row;
   var CL=[['৬–৮','6-8'],['৯–১০','9-10'],['১১–১২','11-12'],['১–৫','1-5']];
   return row+'<div class="ad-panel"><label style="font-weight:700">কোন কোন ক্লাস পড়াবে</label><div>'+[6,7,8,9,10,11,12].map(function(c){return '<label style="display:inline-flex;gap:5px;margin:0 12px 4px 0;font-weight:600"><input type="checkbox" class="tcb" value="'+c+'"'+(cids.indexOf(c)>-1?' checked':'')+'> '+X.bn(c)+'</label>';}).join('')+'</div><div class="ad-inl"><button class="slb o ad-sm" data-a="ts" data-i="'+E(key)+'">💾 সেভ</button></div></div>';
  }).join(''):'<p style="color:var(--mut)">কোনো শিক্ষক নেই।</p>';
  h+='</div><div class="sl-box"><h2>➕ শিক্ষক যোগ করো (স্কুল অ্যাকাউন্টে)</h2>'+(sch.length?'<div class="ad-f"><div><label>স্কুল</label><select id="ts">'+sch.map(function(a){return '<option value="'+E(a.email)+'">'+E(a.school||a.name)+'</option>';}).join('')+'</select></div><div><label>শিক্ষকের নাম</label><input id="tn"></div></div><div class="ad-inl" style="margin-top:10px"><button class="slb o" data-a="tn">➕ যোগ করো</button></div>':'<p style="color:var(--mut)">শিক্ষক যোগ করতে আগে একটা স্কুল প্ল্যানের অ্যাকাউন্ট লাগবে (নতুন অ্যাকাউন্ট → স্কুল)।</p>')+'</div>'
   +'<div class="sl-note">ℹ️ শিক্ষকের সংখ্যা স্কুল প্ল্যানের লিমিট মেনে চলে। শিক্ষক "শুধু নিজের ক্লাসের তথ্য দেখবে" নিয়মটা আসল লগইন (Phase 9) ছাড়া এনফোর্স হয় না।</div>';
  body.innerHTML=h;
  onClick(body,function(a,key){
   var em=(key||'').split('|')[0],mid=(key||'').split('|')[1];
   if(a==='te'){ed.tch=ed.tch===key?null:key;rr();}
   else if(a==='ts'){var c=[].map.call(document.querySelectorAll('.tcb:checked'),function(x){return +x.value;});X.mut(em,function(ac){var m=(ac.members||[]).filter(function(x){return x.id===mid;})[0];if(m){m.cids=c;ac.mv=Date.now();}});X.toast('✅ সেভ হয়েছে');rr();}
   else if(a==='td'){if(!confirm('এই শিক্ষককে মুছবে?'))return;X.mut(em,function(ac){ac.members=(ac.members||[]).filter(function(x){return x.id!==mid;});ac.mv=Date.now();});rr();}
   else if(a==='tn'){var s=v('ts'),n=v('tn').trim();if(!n)return X.toast('❌ নাম লেখো');var ac=X.list().filter(function(x){return x.email===s;})[0],L=X.limits(ac),c=X.counts(ac);if(c.teachers>=L.teachers)return X.toast('❌ শিক্ষকের লিমিট ('+X.bn(L.teachers)+' জন) শেষ');X.mut(s,function(a2){a2.members=a2.members||[];a2.members.push({id:'m'+Date.now().toString(36)+Math.floor(Math.random()*99),name:n,role:'teacher'});a2.mv=Date.now();});X.toast('✅ শিক্ষক যোগ হয়েছে');rr();}
  });
 }
 /* ---------- স্টাফ ও রোল ---------- */
 function vAdm(){
  var body=X.body,r=rb(),h='<div class="ad-tabs"><button data-p="st" class="'+(tabP==='st'?'on':'')+'">🛡️ স্টাফ তালিকা</button><button data-p="rl" class="'+(tabP==='rl'?'on':'')+'">🔑 রোল ও পারমিশন</button></div>';
  if(tabP==='rl'){
   h+='<div class="sl-box"><h2>🔑 পারমিশন ম্যাট্রিক্স</h2><div class="sl-scroll"><table class="sl-tbl"><tr><th>পারমিশন</th>'+r.roles.map(function(x){return '<th>'+E(x.name)+'</th>';}).join('')+'</tr>'
   +PERMS.map(function(p){return '<tr><td>'+p[1]+'<br><small style="color:var(--mut)">'+p[0]+'</small></td>'+r.roles.map(function(x){return '<td>'+(x.fixed?(x.perms.indexOf(p[0])>-1?'✅':'—'):'<input type="checkbox" class="pm" data-r="'+x.id+'" data-p="'+p[0]+'"'+(x.perms.indexOf(p[0])>-1?' checked':'')+'>')+'</td>';}).join('')+'</tr>';}).join('')+'</table></div>'
   +'<div class="ad-inl" style="margin-top:10px"><button class="slb o" data-a="rsv">💾 সেভ</button><button class="slb s" data-a="rdf">↩️ ডিফল্টে ফেরো</button><button class="slb s" data-a="rex">⬇️ JSON এক্সপোর্ট</button></div></div>'
   +'<div class="sl-note">🔒 সুপার অ্যাডমিন সবসময় সব পারমিশন পায়, কমানো যায় না। শিক্ষার্থী অ্যাডমিন প্যানেলে ঢোকেই না। 👁️ উপরের "রোল প্রিভিউ" দিয়ে দেখতে পারো কোন রোলে কোন মেনু থাকত।</div>'+demoNote();
  }else{
   var S=staff();
   h+='<div class="sl-box"><h2>🛡️ স্টাফ তালিকা</h2>'+(S.length?S.map(function(x){return '<div class="ad-row"><div class="nm">'+E(x.name)+'<small>'+E(x.email)+'</small></div><span class="bdg s">'+E(roleName(x.role))+'</span>'+(x.status==='suspended'?'<span class="bdg x">🚫 বন্ধ</span>':'<span class="bdg">✅ সক্রিয়</span>')+'<div class="ad-inl"><select data-rid="'+x.id+'">'+r.roles.filter(function(y){return y.id!=='student';}).map(function(y){return '<option value="'+y.id+'"'+(x.role===y.id?' selected':'')+'>'+E(y.name)+'</option>';}).join('')+'</select><button class="slb s ad-sm" data-a="sst" data-i="'+x.id+'">'+(x.status==='suspended'?'চালু':'বন্ধ')+'</button><button class="slb r ad-sm" data-a="sdl" data-i="'+x.id+'">🗑️</button></div></div>';}).join(''):'<p style="color:var(--mut)">কোনো স্টাফ নেই।</p>')+'</div>'
   +'<div class="sl-box"><h2>➕ স্টাফ/শিক্ষক যোগ করো</h2><div class="ad-f"><div><label>নাম</label><input id="xn"></div><div><label>ইমেইল</label><input id="xe" type="email"></div><div><label>রোল</label><select id="xr">'+r.roles.filter(function(y){return y.id!=='student'&&y.id!=='super_admin';}).map(function(y){return '<option value="'+y.id+'">'+E(y.name)+'</option>';}).join('')+'</select></div></div><div class="ad-inl" style="margin-top:10px"><button class="slb o" data-a="sad">➕ যোগ করো</button><button class="slb s" data-a="sex">⬇️ JSON এক্সপোর্ট (Phase 9 এর জন্য)</button></div></div>'
   +'<div class="sl-note">🔐 <b>এখানে কোনো পাসওয়ার্ড বা লগইন নেই।</b> এটা শুধু তালিকা। সুপার অ্যাডমিন অ্যাকাউন্ট backend এ নিরাপদে বানানো হবে (কোডে পাসওয়ার্ড লেখা হবে না)। নাম/ইমেইল শুধু এই ব্রাউজারে থাকে, GitHub এ যায় না।</div>'+demoNote();
  }
  body.innerHTML=h;
  [].forEach.call(body.querySelectorAll('[data-p]:not(input)'),function(b){if(b.tagName==='BUTTON')b.onclick=function(){tabP=b.dataset.p;rr();};});
  [].forEach.call(body.querySelectorAll('[data-rid]'),function(s){s.onchange=function(){var S2=staff();S2.forEach(function(x){if(x.id===s.dataset.rid)x.role=s.value;});ssave(S2);X.toast('✅ রোল বদলেছে');rr();};});
  onClick(body,function(a,id){
   if(a==='rsv'){var R=rb();R.roles.forEach(function(x){if(x.fixed)return;x.perms=[].filter.call(document.querySelectorAll('.pm[data-r="'+x.id+'"]'),function(c){return c.checked;}).map(function(c){return c.dataset.p;});});rsave(R);X.toast('✅ পারমিশন সেভ হয়েছে');rr();}
   else if(a==='rdf'){if(confirm('সব রোলের পারমিশন ডিফল্টে ফিরবে?')){var R2=rb();R2.roles=clone(DEF);rsave(R2);rr();}}
   else if(a==='rex'){dl('roles.json',JSON.stringify({v:1,roles:rb().roles},null,1));}
   else if(a==='sex'){dl('staff.json',JSON.stringify({v:1,note:'ব্যক্তিগত তথ্য, GitHub এ রেখো না',staff:staff()},null,1));}
   else if(a==='sad'){var n=v('xn').trim(),e=v('xe').trim().toLowerCase();if(!n)return X.toast('❌ নাম লেখো');if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e))return X.toast('❌ সঠিক ইমেইল লেখো');var S3=staff();if(S3.some(function(x){return x.email===e;}))return X.toast('❌ এই ইমেইল আগেই আছে');S3.push({id:uid('s'),name:n,email:e,role:v('xr'),status:'active',created:Date.now()});ssave(S3);rr();}
   else if(a==='sst'){var S4=staff();S4.forEach(function(x){if(x.id===id)x.status=x.status==='suspended'?'active':'suspended';});ssave(S4);rr();}
   else if(a==='sdl'){if(!confirm('এই স্টাফকে তালিকা থেকে মুছবে?'))return;ssave(staff().filter(function(x){return x.id!==id;}));rr();}
  });
 }
 window.ADP={
  PERMS:PERMS,NP:NP,
  roles:function(){return rb().roles;},
  viewAs:function(){return rb().viewAs||'super_admin';},
  setViewAs:function(id){var r=rb();r.viewAs=id;rsave(r);},
  can:function(role,perm){if(!perm)return true;var r=rb().roles.filter(function(x){return x.id===role;})[0];return !!(r&&r.perms.indexOf(perm)>-1);},
  staffCount:function(){return staff().length;},
  view:function(name,ctx){X=ctx;({stu:vStu,tch:vTch,adm:vAdm})[name]();}
 };
})();
