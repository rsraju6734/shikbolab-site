/* ShikboLab অ্যাডমিন: ক্লাস, বিষয়, অধ্যায়, লেসন ম্যানেজমেন্ট (Phase 3, ডেমো মোড)
   ড্রাফট থাকে ব্রাউজারে (localStorage: sl_content_draft)। লাইভ করতে "content.js নামাও" চেপে ফাইলটা js/ ফোল্ডারে বসিয়ে push করো।
   ⚠️ এটা নিরাপদ সার্ভার নয়। সিমুলেশন কোড এখানে কখনো চলে না, শুধু লেখা/ছবি/ভিডিও লিংক। */
(function(){
 var KEY='sl_content_draft',D=null,X=null,ed={},LW=null,prev=false,LB=null,lprev=false,pre='',QE=null,qprev=false,qf={q:'',t:'',s:'',d:''},QZ=null,zprev=false,zf={q:'',t:'',s:''},IMP=null,PE=null,PT='plans',NE=null;
 function clone(o){return JSON.parse(JSON.stringify(o));}
 function pubC(){return window.SL_CONTENT||{};}
 function norm(c){c=clone(c||{});c.v=1;c.classes=c.classes||[];c.subjects=c.subjects||[];c.chapters=c.chapters||{};c.lessons=c.lessons||[];c.labs=c.labs||[];c.questions=c.questions||[];c.quizzes=c.quizzes||[];c.plans=c.plans||[];c.announcements=c.announcements||[];c.site=c.site||{};c.freeChapters=c.freeChapters||[];c.trialChapters=c.trialChapters||[];c.trialDays=c.trialDays||0;return c;}
 function load(){if(D)return D;try{var s=localStorage.getItem(KEY);if(s)D=norm(JSON.parse(s));}catch(e){}if(!D)D=norm(pubC());return D;}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(D));}catch(e){}}
 function changed(){return JSON.stringify(load())!==JSON.stringify(norm(pubC()));}
 function uid(p){return p+Date.now().toString(36)+Math.floor(Math.random()*99);}
 function base(){return window.CHAPTERS_BASE||window.CHAPTERS||[];}
 function cf(c){return String(c.file||'').split('/').pop().replace(/\.html.*$/,'');}
 function E(s){return X.esc(s);}
 function rr(){X.rerender();}
 function chg(){save();rr();}
 function sName(k){var s=load().subjects.filter(function(x){return x.k===k;})[0];return s?s.name:k;}
 function cName(id){var c=load().classes.filter(function(x){return x.id===id;})[0];return c?c.name:'';}
 function bar(){
  var c=changed();
  return pre+'<div class="sl-note" style="'+(c?'':'background:#e1f5ee;border-left-color:#2a9d8f')+'">'+(c?'✏️ <b>অপ্রকাশিত পরিবর্তন আছে।</b> সবার জন্য লাইভ করতে নিচের বাটনে <code>content.js</code> নামিয়ে <b>js</b> ফোল্ডারে বসাও, তারপর git push করো।':'✅ ড্রাফট আর লাইভ একই আছে।')
  +'<div class="ad-inl" style="margin-top:8px"><button class="slb o ad-sm" data-g="dl"'+(c?'':' disabled')+'>⬇️ content.js নামাও</button><button class="slb s ad-sm" data-g="rs"'+(c?'':' disabled')+'>↩️ ড্রাফট বাতিল (লাইভে ফেরো)</button></div></div>';
 }
 function bindG(body){
  [].forEach.call(body.querySelectorAll('[data-bt]'),function(b){b.onclick=function(){ed.bt=b.dataset.bt;rr();};});
  [].forEach.call(body.querySelectorAll('[data-g]'),function(b){b.onclick=function(){
   if(b.dataset.g==='dl'){var t='/* ShikboLab কনটেন্ট ডাটা (js/content.js) */\nwindow.SL_CONTENT='+JSON.stringify(load(),null,1)+';\n',bl=new Blob([t],{type:'text/javascript'}),a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='content.js';a.click();X.toast('✅ content.js নেমেছে। js/ ফোল্ডারে বসাও');}
   else if(confirm('ড্রাফটের সব পরিবর্তন বাতিল করে লাইভ ডাটায় ফিরবে। নিশ্চিত?')){try{localStorage.removeItem(KEY);}catch(e){}D=null;ed={};LW=null;rr();}
  };});
 }
 function mv(arr,i,d,key){arr.sort(function(a,b){return (a[key]||0)-(b[key]||0);});var j=i+d;if(j<0||j>=arr.length)return;var t=arr[i];arr[i]=arr[j];arr[j]=t;arr.forEach(function(x,n){x[key]=(n+1)*10;});}
 function onClick(body,fn){body.onclick=function(e){var b=e.target.closest('[data-a]');if(!b||b.disabled)return;fn(b.dataset.a,b.dataset.i,b);};}
 function v(id){var e=document.getElementById(id);return e?e.value:'';}
 /* ---------- ক্লাস ---------- */
 function vCls(){
  var d=load(),body=X.body,L=d.classes.slice().sort(function(a,b){return a.order-b.order;});
  var h=bar()+'<div class="sl-box"><h2>🏫 ক্লাস</h2>'+(L.length?L.map(function(c,i){
   var f=ed.cls===c.id?'<div class="ad-panel"><div class="ad-f"><div><label>নাম</label><input id="cn" value="'+E(c.name)+'"></div><div><label>কোন শ্রেণি থেকে</label><input id="cfm" type="number" min="1" max="12" value="'+c.from+'"></div><div><label>কোন শ্রেণি পর্যন্ত</label><input id="cto" type="number" min="1" max="12" value="'+c.to+'"></div></div><div class="ad-inl"><button class="slb o ad-sm" data-a="sv" data-i="'+c.id+'">✅ সেভ</button><button class="slb s ad-sm" data-a="cx">বাতিল</button></div></div>':'';
   return '<div class="ad-row"><div class="nm">'+E(c.name)+'<small>শ্রেণি '+X.bn(c.from)+' – '+X.bn(c.to)+'</small></div>'+(c.active?'<span class="bdg">✅ চালু</span>':'<span class="bdg s">⏸ বন্ধ</span>')
   +'<div class="ad-inl"><button class="slb s ad-sm" data-a="up" data-i="'+c.id+'"'+(i?'':' disabled')+'>▲</button><button class="slb s ad-sm" data-a="dn" data-i="'+c.id+'"'+(i<L.length-1?'':' disabled')+'>▼</button><button class="slb s ad-sm" data-a="tg" data-i="'+c.id+'">চালু/বন্ধ</button><button class="slb s ad-sm" data-a="ed" data-i="'+c.id+'">✏️</button><button class="slb r ad-sm" data-a="del" data-i="'+c.id+'">🗑️</button></div></div>'+f;}).join(''):'<p style="color:var(--mut)">কোনো ক্লাস নেই।</p>')+'</div>'
  +'<div class="sl-box"><h2>➕ নতুন ক্লাস</h2><div class="ad-f"><div><label>নাম</label><input id="nn" placeholder="যেমন: ৯–১০ শ্রেণি"></div><div><label>থেকে</label><input id="nf" type="number" min="1" max="12" value="9"></div><div><label>পর্যন্ত</label><input id="nt" type="number" min="1" max="12" value="10"></div></div><div class="ad-inl" style="margin-top:10px"><button class="slb o" data-a="add">➕ যোগ করো</button></div></div>'
  +'<div class="sl-note">ℹ️ ক্লাস এখন ডাটা হিসেবে সেভ হয় ও বিষয়/অধ্যায়ে বসানো যায়। হোমপেজের শ্রেণি-বাছাই এখনও আগের মতো চলে।</div>';
  body.innerHTML=h;bindG(body);
  onClick(body,function(a,id){
   var c=d.classes.filter(function(x){return x.id===id;})[0],i=L.indexOf(c);
   if(a==='up'||a==='dn'){mv(L,i,a==='up'?-1:1,'order');d.classes=L;chg();}
   else if(a==='tg'){c.active=!c.active;chg();}
   else if(a==='ed'){ed.cls=id;rr();}else if(a==='cx'){ed.cls=null;rr();}
   else if(a==='sv'){var n=v('cn').trim(),f=+v('cfm'),t=+v('cto');if(!n||f<1||t>12||f>t)return X.toast('❌ নাম ও শ্রেণি ঠিক করো');c.name=n;c.from=f;c.to=t;ed.cls=null;chg();}
   else if(a==='del'){if(!confirm('"'+c.name+'" মুছবে? বিষয়ের তালিকা থেকেও এটা সরে যাবে।'))return;d.classes=d.classes.filter(function(x){return x.id!==id;});d.subjects.forEach(function(s){s.classes=(s.classes||[]).filter(function(x){return x!==id;});});Object.keys(d.chapters).forEach(function(k){var o=d.chapters[k];if(o.classes)o.classes=o.classes.filter(function(x){return x!==id;});});chg();}
   else if(a==='add'){var n2=v('nn').trim(),f2=+v('nf'),t2=+v('nt');if(!n2||f2<1||t2>12||f2>t2)return X.toast('❌ নাম ও শ্রেণি ঠিক করো');d.classes.push({id:uid('c'),name:n2,from:f2,to:t2,active:true,order:(d.classes.length+1)*10});chg();}
  });
 }
 function classBoxes(sel,pre){var d=load();return d.classes.length?d.classes.map(function(c){return '<label style="display:inline-flex;gap:6px;margin:0 12px 4px 0;font-weight:600"><input type="checkbox" class="'+pre+'" value="'+c.id+'"'+((sel||[]).indexOf(c.id)>-1?' checked':'')+'> '+E(c.name)+'</label>';}).join(''):'<small>আগে ক্লাস বানাও</small>';}
 function checked(pre){return [].map.call(document.querySelectorAll('.'+pre+':checked'),function(x){return x.value;});}
 /* ---------- বিষয় ---------- */
 function vSbj(){
  var d=load(),body=X.body,A=base();
  var h=bar()+'<div class="sl-box"><h2>📚 বিষয়</h2>'+d.subjects.map(function(s){
   var n=A.filter(function(c){return c.subject===s.k;}).length,f=ed.sub===s.k?'<div class="ad-panel"><div class="ad-f"><div><label>নাম</label><input id="sn" value="'+E(s.name)+'"></div><div><label>আইকন (ইমোজি)</label><input id="si" maxlength="4" value="'+E(s.icon||'')+'"></div></div><div><label style="font-weight:700">বিবরণ</label><textarea id="sd" rows="2" style="width:100%">'+E(s.desc||'')+'</textarea></div><div><label style="font-weight:700">কোন ক্লাসে থাকবে</label><div>'+classBoxes(s.classes,'scb')+'</div></div><div class="ad-inl"><button class="slb o ad-sm" data-a="sv" data-i="'+s.k+'">✅ সেভ</button><button class="slb s ad-sm" data-a="cx">বাতিল</button></div></div>':'';
   return '<div class="ad-row"><div class="nm">'+E(s.icon||'📘')+' '+E(s.name)+'<small>'+E(s.desc||'')+' · '+X.bn(n)+'টি অধ্যায় · '+(s.classes||[]).map(cName).filter(Boolean).map(E).join(', ')+'</small></div>'+(s.visible!==false?'<span class="bdg">👁️ দেখা যায়</span>':'<span class="bdg s">🙈 লুকানো</span>')+(s.core?'':'<span class="bdg t">কাস্টম</span>')
   +'<div class="ad-inl"><button class="slb s ad-sm" data-a="vis" data-i="'+s.k+'">দেখা/লুকানো</button><button class="slb s ad-sm" data-a="ed" data-i="'+s.k+'">✏️</button>'+(s.core?'':'<button class="slb r ad-sm" data-a="del" data-i="'+s.k+'">🗑️</button>')+'</div></div>'+f;}).join('')+'</div>'
  +'<div class="sl-box"><h2>➕ কাস্টম বিষয়</h2><div class="ad-f"><div><label>নাম</label><input id="xn"></div><div><label>আইকন</label><input id="xi" maxlength="4" value="📘"></div></div><div class="ad-inl" style="margin-top:10px"><button class="slb o" data-a="add">➕ যোগ করো</button></div></div>'
  +'<div class="sl-note">ℹ️ <b>লুকানো</b> দিলে ওই বিষয়ের সব অধ্যায় হোমপেজ থেকে সরে যায়। কাস্টম বিষয় ডাটাতে সেভ হয়, কিন্তু হোমপেজে নতুন বিষয়-কার্ড দেখাতে পরে কোডে সাপোর্ট লাগবে। আইকন এখন ইমোজি, ছবি আপলোড backend ছাড়া সম্ভব না।</div>';
  body.innerHTML=h;bindG(body);bindNavBtns(body);
  onClick(body,function(a,k){
   var s=d.subjects.filter(function(x){return x.k===k;})[0];
   if(a==='vis'){s.visible=s.visible===false;chg();}else if(a==='ed'){ed.sub=k;rr();}else if(a==='cx'){ed.sub=null;rr();}
   else if(a==='sv'){var n=v('sn').trim();if(!n)return X.toast('❌ নাম লেখো');s.name=n;s.icon=v('si').trim();s.desc=v('sd').trim();s.classes=checked('scb');ed.sub=null;chg();}
   else if(a==='del'){if(!confirm('"'+s.name+'" মুছবে?'))return;d.subjects=d.subjects.filter(function(x){return x.k!==k;});chg();}
   else if(a==='add'){var n2=v('xn').trim();if(!n2)return X.toast('❌ নাম লেখো');d.subjects.push({k:uid('x'),name:n2,icon:v('xi').trim()||'📘',desc:'',visible:true,classes:[],core:false});chg();}
  });
 }
 function bindNavBtns(){}
 /* ---------- অধ্যায় ---------- */
 function ovr(f){return load().chapters[f]||{};}
 function eff(){ /* বর্তমান ড্রাফট অনুযায়ী ক্রমে সাজানো */
  var d=load();return base().map(function(c,i){var o=d.chapters[cf(c)]||{};return {c:c,f:cf(c),o:o,ord:typeof o.order==='number'?o.order:(i+1)*10,i:i};}).sort(function(a,b){return a.ord-b.ord||a.i-b.i;});
 }
 function vChp(sub){
  var d=load(),body=X.body,all=eff().filter(function(r){return !sub||r.c.subject===sub;}),q=(ed.q||'').toLowerCase(),
  R=all.filter(function(r){return !q||(r.c.title+' '+r.f).toLowerCase().indexOf(q)>-1;});
  var h=bar()+'<div class="sl-box"><div class="ad-fil"><input id="cq" placeholder="🔍 অধ্যায় খোঁজো" value="'+E(ed.q||'')+'" style="flex:1;min-width:180px"></div>'
  +(R.length?R.map(function(r,i){
   var o=r.o,pos=all.indexOf(r),title=o.title||r.c.title,st=o.hidden?'<span class="bdg x">🚫 সরানো</span>':o.state==='draft'?'<span class="bdg t">📝 ড্রাফট</span>':'<span class="bdg">✅ প্রকাশিত</span>';
   var f='';
   if(ed.ch===r.f){f='<div class="ad-panel"><div class="ad-f"><div><label>শিরোনাম</label><input id="et" value="'+E(title)+'"></div><div><label>অবস্থা</label><select id="es"><option value="published"'+(o.state!=='draft'?' selected':'')+'>প্রকাশিত</option><option value="draft"'+(o.state==='draft'?' selected':'')+'>ড্রাফট (শীঘ্রই আসছে দেখাবে)</option></select></div></div>'
   +'<div><label style="font-weight:700">ছোট বিবরণ (কার্ডে দেখায়)</label><textarea id="ed" rows="2" style="width:100%">'+E(o.desc||r.c.desc||'')+'</textarea></div>'
   +'<div><label style="font-weight:700">বাংলা ভূমিকা</label><textarea id="ei" rows="3" style="width:100%">'+E(o.intro||'')+'</textarea></div>'
   +'<div><label style="font-weight:700">শেখার লক্ষ্য (প্রতি লাইনে একটা)</label><textarea id="eo" rows="3" style="width:100%">'+E((o.objectives||[]).join('\n'))+'</textarea></div>'
   +'<div><label style="font-weight:700">বৈজ্ঞানিক শব্দ (প্রতি লাইনে: English | বাংলা)</label><textarea id="etm" rows="3" style="width:100%" placeholder="Mitochondria | মাইটোকন্ড্রিয়া">'+E((o.terms||[]).join('\n'))+'</textarea></div>'
   +'<div><label style="font-weight:700">২ডি/৩ডি/অ্যানিমেশন লিংক (প্রতি লাইনে: ধরন | ঠিকানা | ক্যাপশন; ধরন = 2d, 3d, animation, video, diagram)</label><textarea id="emd" rows="2" style="width:100%" placeholder="3d | https://... | কোষের ৩ডি মডেল">'+E((o.media||[]).join('\n'))+'</textarea></div>'
   +'<div><label style="font-weight:700">ছবি/ডায়াগ্রাম (প্রতি লাইনে: ঠিকানা | ক্যাপশন)</label><textarea id="eg" rows="2" style="width:100%" placeholder="https://... | ক্যাপশন">'+E((o.images||[]).join('\n'))+'</textarea></div>'
   +'<div><label style="font-weight:700">কোন ক্লাসে</label><div>'+classBoxes(o.classes,'ccb')+'</div></div>'
   +'<div class="ad-inl"><button class="slb o ad-sm" data-a="sv" data-i="'+r.f+'">✅ সেভ</button><button class="slb s ad-sm" data-a="rd" data-i="'+r.f+'">↩️ ডিফল্টে ফেরো</button><button class="slb s ad-sm" data-a="cx">বাতিল</button></div></div>';}
   return '<div class="ad-row"><div class="nm">'+E(title)+'<small>'+E(sName(r.c.subject))+' · '+E(r.f)+((o.classes||[]).length?' · '+o.classes.map(cName).filter(Boolean).map(E).join(', '):'')+'</small></div>'+st
   +'<div class="ad-inl"><button class="slb s ad-sm" data-a="up" data-i="'+r.f+'"'+(pos?'':' disabled')+'>▲</button><button class="slb s ad-sm" data-a="dn" data-i="'+r.f+'"'+(pos<all.length-1?'':' disabled')+'>▼</button><button class="slb s ad-sm" data-a="ed" data-i="'+r.f+'">✏️</button><button class="slb '+(o.hidden?'o':'r')+' ad-sm" data-a="hd" data-i="'+r.f+'">'+(o.hidden?'♻️ ফেরাও':'🗑️ সরাও')+'</button></div></div>'+f;
  }).join(''):'<p style="color:var(--mut)">কিছু পাওয়া যায়নি।</p>')+'</div>'
  +'<div class="sl-note">ℹ️ <b>সরাও</b> মানে সাইটের তালিকা থেকে লুকানো (ফাইল মোছে না, যেকোনো সময় ফেরানো যায়)। ড্রাফট দিলে "শীঘ্রই আসছে" দেখায়, তবে সরাসরি লিংকে পেজ খোলা যায়, কারণ এটা ফ্রন্টএন্ড। নতুন অধ্যায় বানাতে নতুন HTML ফাইল লাগে, তাই নতুন কনটেন্ট এখন <b>📝 লেসন</b> দিয়ে যোগ করো।</div>';
  body.innerHTML=h;bindG(body);
  var qe=document.getElementById('cq');if(qe)qe.oninput=function(){ed.q=this.value;var p=this.selectionStart;vChp(sub);var n=document.getElementById('cq');n.focus();n.setSelectionRange(p,p);};
  onClick(body,function(a,f){
   if(a==='up'||a==='dn'){var j=all.map(function(r){return r.f;}).indexOf(f),k=j+(a==='up'?-1:1);if(k<0||k>=all.length)return;var A=all[j],B=all[k],t=A.ord;d.chapters[A.f]=d.chapters[A.f]||{};d.chapters[B.f]=d.chapters[B.f]||{};d.chapters[A.f].order=B.ord;d.chapters[B.f].order=t;if(B.ord===t){d.chapters[A.f].order=t+(a==='up'?-1:1);}chg();}
   else if(a==='ed'){ed.ch=f;rr();}else if(a==='cx'){ed.ch=null;rr();}
   else if(a==='hd'){var o=d.chapters[f]=d.chapters[f]||{};if(!o.hidden&&!confirm('এই অধ্যায় সাইটের তালিকা থেকে সরাবে? (ফাইল মুছবে না)'))return;o.hidden=!o.hidden;if(!o.hidden)delete o.hidden;chg();}
   else if(a==='rd'){if(confirm('এই অধ্যায়ের সব ড্রাফট পরিবর্তন মুছে ডিফল্টে ফিরবে?')){var keep=d.chapters[f]&&d.chapters[f].order;delete d.chapters[f];if(typeof keep==='number')d.chapters[f]={order:keep};ed.ch=null;chg();}}
   else if(a==='sv'){
    var c=base().filter(function(x){return cf(x)===f;})[0],o2=d.chapters[f]||{},t=v('et').trim(),ds=v('ed').trim(),n={};
    if(o2.order!=null)n.order=o2.order;if(o2.hidden)n.hidden=true;
    if(t&&t!==c.title)n.title=t;if(ds&&ds!==c.desc)n.desc=ds;if(v('es')==='draft')n.state='draft';
    if(v('ei').trim())n.intro=v('ei').trim();
    var ob=v('eo').split('\n').map(function(x){return x.trim();}).filter(Boolean);if(ob.length)n.objectives=ob;
    var im=v('eg').split('\n').map(function(x){return x.trim();}).filter(Boolean),bad=im.filter(function(x){return !window.SLLesson.okImg(x.split('|')[0]);});
    if(bad.length)return X.toast('❌ ছবির ঠিকানা ঠিক নয়: শুধু https:// বা ফোল্ডারের ছবি');if(im.length)n.images=im;
    var tm=v('etm').split('\n').map(function(x){return x.trim();}).filter(Boolean);if(tm.length)n.terms=tm;
    var md=v('emd').split('\n').map(function(x){return x.trim();}).filter(Boolean),badm=md.filter(function(x){var a=x.split('|').map(function(y){return y.trim();});return a.length<2||!/^(https:\/\/[^\s"'<>]+|[\w\-\/.]+\.(html|png|jpe?g|gif|webp|svg|glb|mp4))$/i.test(a[1]);});
    if(badm.length)return X.toast('❌ মিডিয়া লাইন ঠিক নয়: ধরন | https://ঠিকানা | ক্যাপশন');if(md.length)n.media=md;
    var cl=checked('ccb');if(cl.length)n.classes=cl;
    if(Object.keys(n).length)d.chapters[f]=n;else delete d.chapters[f];ed.ch=null;chg();
   }
  });
 }
 /* ---------- লেসন ---------- */
 function blank(){return {id:uid('l'),title:'',subject:'math',chapter:'',difficulty:'মাঝারি',state:'draft',classes:[],objectives:[],sections:[{type:'text',h:'',body:'',url:''}]};}
 function secHTML(s,i,n){
  var ty='<select data-k="type" data-n="'+i+'"><option value="text"'+(s.type==='text'?' selected':'')+'>📝 লেখা</option><option value="image"'+(s.type==='image'?' selected':'')+'>🖼️ ছবি/ডায়াগ্রাম</option><option value="video"'+(s.type==='video'?' selected':'')+'>🎬 ভিডিও (YouTube)</option><option value="activity"'+(s.type==='activity'?' selected':'')+'>🧪 ল্যাব/অ্যাক্টিভিটি লিংক</option></select>';
  var mid='';
  if(s.type==='text')mid='<textarea data-k="body" data-n="'+i+'" rows="5" style="width:100%" placeholder="লেখো। নতুন অনুচ্ছেদে ফাঁকা লাইন, তালিকায় লাইনের শুরুতে - , মোটা লেখায় **শব্দ**">'+E(s.body||'')+'</textarea>';
  else if(s.type==='image')mid='<input data-k="url" data-n="'+i+'" value="'+E(s.url||'')+'" placeholder="https://... বা images/ছবি.png" style="width:100%"><input data-k="body" data-n="'+i+'" value="'+E(s.body||'')+'" placeholder="ক্যাপশন" style="width:100%">';
  else if(s.type==='video')mid='<input data-k="url" data-n="'+i+'" value="'+E(s.url||'')+'" placeholder="YouTube লিংক" style="width:100%"><input data-k="body" data-n="'+i+'" value="'+E(s.body||'')+'" placeholder="ছোট বর্ণনা (ঐচ্ছিক)" style="width:100%">';
  else mid='<select data-k="url" data-n="'+i+'" style="width:100%"><option value="">— ল্যাব বেছে নাও —</option>'+base().map(function(c){return '<option value="'+E(cf(c))+'"'+(s.url===cf(c)?' selected':'')+'>'+E(c.title)+'</option>';}).join('')+'</select><input data-k="body" data-n="'+i+'" value="'+E(s.body||'')+'" placeholder="কী করতে হবে (ঐচ্ছিক)" style="width:100%">';
  return '<div class="ad-panel"><div class="ad-inl">'+ty+'<input data-k="h" data-n="'+i+'" value="'+E(s.h||'')+'" placeholder="অংশের শিরোনাম (ঐচ্ছিক)" style="flex:1;min-width:160px"><button class="slb s ad-sm" data-a="su" data-i="'+i+'"'+(i?'':' disabled')+'>▲</button><button class="slb s ad-sm" data-a="sd" data-i="'+i+'"'+(i<n-1?'':' disabled')+'>▼</button><button class="slb r ad-sm" data-a="sx" data-i="'+i+'">✖</button></div>'+mid+'</div>';
 }
 function vLes(){
  var d=load(),body=X.body;
  if(LW){var L=LW,h=bar()+'<div class="sl-box"><h2>'+(d.lessons.some(function(x){return x.id===L.id;})?'✏️ লেসন এডিট':'➕ নতুন লেসন')+'</h2><div class="ad-f"><div><label>শিরোনাম</label><input id="lt" value="'+E(L.title)+'"></div>'
   +'<div><label>বিষয়</label><select id="ls">'+d.subjects.map(function(s){return '<option value="'+s.k+'"'+(L.subject===s.k?' selected':'')+'>'+E(s.name)+'</option>';}).join('')+'</select></div>'
   +'<div><label>অধ্যায় (ঐচ্ছিক)</label><select id="lc"><option value="">— নেই —</option>'+base().map(function(c){return '<option value="'+E(cf(c))+'"'+(L.chapter===cf(c)?' selected':'')+'>'+E(c.title)+'</option>';}).join('')+'</select></div>'
   +'<div><label>কঠিনতা</label><select id="ld">'+['সহজ','মাঝারি','কঠিন'].map(function(x){return '<option'+(L.difficulty===x?' selected':'')+'>'+x+'</option>';}).join('')+'</select></div>'
   +'<div><label>অবস্থা</label><select id="lst"><option value="draft"'+(L.state!=='published'?' selected':'')+'>ড্রাফট</option><option value="published"'+(L.state==='published'?' selected':'')+'>প্রকাশিত</option></select></div></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">শেখার লক্ষ্য (প্রতি লাইনে একটা)</label><textarea id="lo" rows="2" style="width:100%">'+E((L.objectives||[]).join('\n'))+'</textarea></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">কোন ক্লাসে</label><div>'+classBoxes(L.classes,'lcb')+'</div></div></div>'
   +'<div class="sl-box"><h2>🧩 লেসনের অংশ</h2><div id="secs">'+L.sections.map(function(s,i){return secHTML(s,i,L.sections.length);}).join('')+'</div><div class="ad-inl"><button class="slb s ad-sm" data-a="sa">➕ অংশ যোগ করো</button></div></div>'
   +'<div class="ad-inl"><button class="slb o" data-a="ls">💾 সেভ</button><button class="slb p" data-a="pv">👁️ প্রিভিউ (শিক্ষার্থী যেমন দেখবে)</button><button class="slb s" data-a="lx">← ফিরে যাও</button></div>'
   +(prev?'<div class="sl-box" style="background:#fff;color:#22303c;margin-top:16px"><div id="pvb"></div></div>':'');
   body.innerHTML=h;bindG(body);
   if(prev)window.SLLesson.render(L,d,document.getElementById('pvb'));
   var sync=function(){L.title=v('lt');L.subject=v('ls');L.chapter=v('lc');L.difficulty=v('ld');L.state=v('lst');L.objectives=v('lo').split('\n').map(function(x){return x.trim();}).filter(Boolean);L.classes=checked('lcb');};
   [].forEach.call(body.querySelectorAll('[data-k]'),function(e){e.oninput=e.onchange=function(){var s=L.sections[+e.dataset.n];s[e.dataset.k]=e.value;if(e.dataset.k==='type')sync(),rr();};});
   onClick(body,function(a,i){
    sync();
    if(a==='sa'){L.sections.push({type:'text',h:'',body:'',url:''});rr();}
    else if(a==='sx'){if(L.sections.length<2)return X.toast('কমপক্ষে একটা অংশ থাকতে হবে');L.sections.splice(+i,1);rr();}
    else if(a==='su'||a==='sd'){var j=+i+(a==='su'?-1:1),t=L.sections[+i];L.sections[+i]=L.sections[j];L.sections[j]=t;rr();}
    else if(a==='pv'){prev=!prev;rr();}
    else if(a==='lx'){LW=null;prev=false;rr();}
    else if(a==='ls'){
     if(!L.title.trim())return X.toast('❌ শিরোনাম লেখো');
     var bad=L.sections.filter(function(s){return (s.type==='image'&&s.url&&!window.SLLesson.okImg(s.url))||(s.type==='video'&&s.url&&!/(youtu\.be\/|v=|embed\/)[\w-]{11}/.test(s.url));});
     if(bad.length)return X.toast('❌ কোনো ছবি/ভিডিও লিংক ঠিক নয়');
     var k=d.lessons.map(function(x){return x.id;}).indexOf(L.id);if(k>-1)d.lessons[k]=clone(L);else d.lessons.push(clone(L));
     LW=null;prev=false;chg();X.toast('✅ লেসন ড্রাফটে সেভ হয়েছে');
    }
   });
   return;
  }
  var h2=bar()+'<div class="sl-box"><div class="ad-inl" style="margin-bottom:8px"><button class="slb o" data-a="nw">➕ নতুন লেসন</button><a class="slb s" href="lesson.html" target="_blank" rel="noopener">↗ শিক্ষার্থীর লেসন পেজ</a></div>'
  +(d.lessons.length?d.lessons.map(function(l){return '<div class="ad-row"><div class="nm">'+E(l.title||'(নাম নেই)')+'<small>'+E(sName(l.subject))+' · '+X.bn((l.sections||[]).length)+'টি অংশ · '+E(l.difficulty||'')+'</small></div>'+(l.state==='published'?'<span class="bdg">✅ প্রকাশিত</span>':'<span class="bdg t">📝 ড্রাফট</span>')+'<div class="ad-inl"><button class="slb s ad-sm" data-a="le" data-i="'+l.id+'">✏️ এডিট</button><button class="slb s ad-sm" data-a="lp" data-i="'+l.id+'">'+(l.state==='published'?'আনপাবলিশ':'পাবলিশ')+'</button><a class="slb s ad-sm" href="lesson.html?id='+encodeURIComponent(l.id)+'&draft=1" target="_blank" rel="noopener">👁️</a><button class="slb r ad-sm" data-a="ld" data-i="'+l.id+'">🗑️</button></div></div>';}).join(''):'<p style="color:var(--mut)">এখনও কোনো লেসন নেই। "➕ নতুন লেসন" চাপো।</p>')+'</div>'
  +'<div class="sl-note">ℹ️ <b>প্রিভিউ (👁️)</b> তোমার ড্রাফট দেখায়। শিক্ষার্থীরা শুধু <b>প্রকাশিত</b> লেসন দেখবে, তবে সেটা তখনই যখন তুমি content.js লাইভ করবে। লেসনে শুধু লেখা, ছবি, YouTube ভিডিও ও বিদ্যমান ল্যাবের লিংক চলে। কোনো কোড চালানো যায় না।</div>';
  body.innerHTML=h2;bindG(body);
  onClick(body,function(a,id){
   if(a==='nw'){LW=blank();prev=false;rr();}
   else if(a==='le'){LW=clone(d.lessons.filter(function(x){return x.id===id;})[0]);rr();}
   else if(a==='lp'){var l=d.lessons.filter(function(x){return x.id===id;})[0];l.state=l.state==='published'?'draft':'published';chg();}
   else if(a==='ld'){if(confirm('এই লেসন মুছবে?')){d.lessons=d.lessons.filter(function(x){return x.id!==id;});chg();}}
  });
 }

 /* ---------- ল্যাব ম্যানেজমেন্ট ---------- */
 function blankLab(sub,ch){var c=ch?base().filter(function(x){return cf(x)===ch;})[0]:null;return {id:uid('b'),title:c?c.title:'',subject:sub||(c&&c.subject)||'biology',chapter:ch||'',difficulty:'মাঝারি',access:'premium',active:true,classes:[],objectives:[],instructions:'',observations:[],quiz:[]};}
 function qHTML(q,i){
  var o=q.opts||['','','',''];
  return '<div class="ad-panel"><div class="ad-inl"><input data-q="'+i+'" data-f="q" value="'+E(q.q||'')+'" placeholder="প্রশ্ন" style="flex:1;min-width:200px"><button class="slb r ad-sm" data-a="qx" data-i="'+i+'">✖</button></div>'
  +[0,1,2,3].map(function(k){return '<input data-q="'+i+'" data-f="o'+k+'" value="'+E(o[k]||'')+'" placeholder="অপশন '+(k+1)+'" style="width:100%">';}).join('')
  +'<div class="ad-inl"><label style="font-weight:700">সঠিক উত্তর:</label><select data-q="'+i+'" data-f="a">'+[0,1,2,3].map(function(k){return '<option value="'+k+'"'+(+q.ans===k?' selected':'')+'>অপশন '+(k+1)+'</option>';}).join('')+'</select><input data-q="'+i+'" data-f="e" value="'+E(q.exp||'')+'" placeholder="ব্যাখ্যা" style="flex:1;min-width:180px"></div></div>';
 }
 function vLab(sub){
  var d=load(),body=X.body,A=d.labs.filter(function(l){return !sub||l.subject===sub;});
  if(LB){var L=LB,exist=d.labs.some(function(x){return x.id===L.id;});
   var h=bar()+'<div class="sl-box"><h2>'+(exist?'✏️ ল্যাব এডিট':'➕ নতুন ল্যাব')+'</h2><div class="ad-f"><div><label>ল্যাবের নাম</label><input id="bt" value="'+E(L.title)+'"></div>'
   +'<div><label>বিষয়</label><select id="bs">'+d.subjects.map(function(x){return '<option value="'+x.k+'"'+(L.subject===x.k?' selected':'')+'>'+E(x.name)+'</option>';}).join('')+'</select></div>'
   +'<div><label>সিমুলেশন মডিউল (অনুমোদিত, বিদ্যমান)</label><select id="bc"><option value="">— শুধু গাইড, সিমুলেশন নেই —</option>'+base().map(function(c){return '<option value="'+E(cf(c))+'"'+(L.chapter===cf(c)?' selected':'')+'>'+E(c.title)+'</option>';}).join('')+'</select></div>'
   +'<div><label>কঠিনতা</label><select id="bd">'+['সহজ','মাঝারি','কঠিন'].map(function(x){return '<option'+(L.difficulty===x?' selected':'')+'>'+x+'</option>';}).join('')+'</select></div>'
   +'<div><label>অ্যাক্সেস</label><select id="ba"><option value="free"'+(L.access==='free'?' selected':'')+'>🎁 ফ্রি</option><option value="premium"'+(L.access!=='free'?' selected':'')+'>💳 প্রিমিয়াম</option></select></div>'
   +'<div><label>অবস্থা</label><select id="bv"><option value="1"'+(L.active!==false?' selected':'')+'>চালু</option><option value="0"'+(L.active===false?' selected':'')+'>বন্ধ (সাইট থেকে লুকাবে)</option></select></div></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">শেখার লক্ষ্য (প্রতি লাইনে একটা)</label><textarea id="bo" rows="3" style="width:100%">'+E((L.objectives||[]).join('\n'))+'</textarea></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">নির্দেশনা (ধাপে ধাপে। ফাঁকা লাইনে নতুন অনুচ্ছেদ, - দিয়ে তালিকা)</label><textarea id="bi" rows="5" style="width:100%">'+E(L.instructions||'')+'</textarea></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">পর্যবেক্ষণ প্রশ্ন (প্রতি লাইনে একটা)</label><textarea id="bq" rows="3" style="width:100%">'+E((L.observations||[]).join('\n'))+'</textarea></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">কোন ক্লাসে</label><div>'+classBoxes(L.classes,'bcb')+'</div></div></div>'
   +'<div class="sl-box"><h2>🏆 মিনি কুইজ</h2><div id="qs">'+(L.quiz||[]).map(qHTML).join('')+'</div><div class="ad-inl"><button class="slb s ad-sm" data-a="qa">➕ প্রশ্ন যোগ করো</button></div></div>'
   +'<div class="sl-note">🔒 সিমুলেশন কোড এখানে লেখা বা চালানো যায় না। শুধু প্রজেক্টে থাকা অনুমোদিত মডিউল বেছে নেওয়া যায়।</div>'
   +'<div class="ad-inl"><button class="slb o" data-a="bs">💾 সেভ</button><button class="slb p" data-a="bp">👁️ প্রিভিউ</button><button class="slb s" data-a="bx">← ফিরে যাও</button></div>'
   +(lprev?'<div class="sl-box" style="background:#fff;color:#22303c;margin-top:16px"><div id="pvb"></div></div>':'');
   body.innerHTML=h;bindG(body);
   if(lprev)window.SLLesson.renderLab(L,d,document.getElementById('pvb'));
   var sync=function(){L.title=v('bt');L.subject=v('bs');L.chapter=v('bc');L.difficulty=v('bd');L.access=v('ba');L.active=v('bv')==='1';L.objectives=v('bo').split('\n').map(function(x){return x.trim();}).filter(Boolean);L.instructions=v('bi');L.observations=v('bq').split('\n').map(function(x){return x.trim();}).filter(Boolean);L.classes=checked('bcb');};
   [].forEach.call(body.querySelectorAll('[data-q]'),function(e){e.oninput=e.onchange=function(){var q=L.quiz[+e.dataset.q],f=e.dataset.f;if(f==='q')q.q=e.value;else if(f==='a')q.ans=+e.value;else if(f==='e')q.exp=e.value;else{q.opts=q.opts||['','','',''];q.opts[+f.slice(1)]=e.value;}};});
   onClick(body,function(a,i){
    sync();
    if(a==='qa'){L.quiz=L.quiz||[];L.quiz.push({q:'',opts:['','','',''],ans:0,exp:''});rr();}
    else if(a==='qx'){L.quiz.splice(+i,1);rr();}
    else if(a==='bp'){lprev=!lprev;rr();}
    else if(a==='bx'){LB=null;lprev=false;rr();}
    else if(a==='bs'){
     if(!L.title.trim())return X.toast('❌ ল্যাবের নাম লেখো');
     var badq=(L.quiz||[]).filter(function(q){var n=(q.opts||[]).filter(Boolean).length;return !q.q||n<2||!(q.opts||[])[+q.ans];});
     if(badq.length)return X.toast('❌ কুইজে প্রশ্ন, কমপক্ষে ২ অপশন ও সঠিক উত্তরের অপশন লাগবে');
     var k=d.labs.map(function(x){return x.id;}).indexOf(L.id);if(k>-1)d.labs[k]=clone(L);else d.labs.push(clone(L));
     LB=null;lprev=false;chg();X.toast('✅ ল্যাব ড্রাফটে সেভ হয়েছে');
    }
   });
   return;
  }
  var h2=bar()+'<div class="sl-box"><div class="ad-inl" style="margin-bottom:8px"><button class="slb o" data-a="bn">➕ নতুন ল্যাব</button><a class="slb s" href="lab.html" target="_blank" rel="noopener">↗ শিক্ষার্থীর ল্যাব গাইড পেজ</a></div>'
  +(A.length?A.map(function(l){return '<div class="ad-row"><div class="nm">'+E(l.title||'(নাম নেই)')+'<small>'+E(sName(l.subject))+' · '+E(l.difficulty||'')+(l.chapter?' · মডিউল: '+E(l.chapter):'')+' · '+X.bn((l.quiz||[]).length)+'টি কুইজ প্রশ্ন</small></div>'+(l.access==='free'?'<span class="bdg">🎁 ফ্রি</span>':'<span class="bdg t">💳 প্রিমিয়াম</span>')+(l.active!==false?'<span class="bdg">✅ চালু</span>':'<span class="bdg s">⏸ বন্ধ</span>')
   +'<div class="ad-inl"><button class="slb s ad-sm" data-a="be" data-i="'+l.id+'">✏️</button><button class="slb s ad-sm" data-a="bt" data-i="'+l.id+'">চালু/বন্ধ</button><a class="slb s ad-sm" href="lab.html?id='+encodeURIComponent(l.id)+'&draft=1" target="_blank" rel="noopener">👁️</a><button class="slb r ad-sm" data-a="bd" data-i="'+l.id+'">🗑️</button></div></div>';}).join(''):'<p style="color:var(--mut)">এখনও কোনো ল্যাব রেকর্ড নেই।</p>')+'</div>'
  +'<div class="sl-note">ℹ️ ল্যাব রেকর্ড = ল্যাবের শেখানোর অংশ (লক্ষ্য, নির্দেশনা, প্রশ্ন, কুইজ)। <b>ফ্রি/প্রিমিয়াম</b> বাছলে ওই অধ্যায়ের তালার নিয়ম বদলে যায় (ডেমো তালা)। <b>বন্ধ</b> করলে সিমুলেশন অধ্যায়ও হোমপেজ থেকে সরে যায়।</div>';
  body.innerHTML=h2;bindG(body);
  onClick(body,function(a,id){
   if(a==='bn'){LB=blankLab(sub,'');lprev=false;rr();}
   else if(a==='be'){LB=clone(d.labs.filter(function(x){return x.id===id;})[0]);rr();}
   else if(a==='bt'){var l=d.labs.filter(function(x){return x.id===id;})[0];l.active=l.active===false;chg();}
   else if(a==='bd'){if(confirm('এই ল্যাব রেকর্ড মুছবে? (সিমুলেশন অধ্যায় মুছবে না)')){d.labs=d.labs.filter(function(x){return x.id!==id;});chg();}}
  });
 }
 /* ---------- জীববিজ্ঞান ম্যানেজার ---------- */
 function vBio(){
  var d=load(),bt=ed.bt||'sum';
  pre='<div class="ad-tabs"><button data-bt="sum" class="'+(bt==='sum'?'on':'')+'">📋 সারাংশ</button><button data-bt="ch" class="'+(bt==='ch'?'on':'')+'">📖 অধ্যায় কনটেন্ট</button><button data-bt="lab" class="'+(bt==='lab'?'on':'')+'">🧪 ল্যাব রেকর্ড</button></div>';
  if(bt==='ch'){vChp('biology');return;}
  if(bt==='lab'){vLab('biology');return;}
  var A=eff().filter(function(r){return r.c.subject==='biology';}),body=X.body,tot=0,full=0;
  var rows=A.map(function(r){
   var o=r.o,labs=d.labs.filter(function(l){return l.chapter===r.f;}),lb=labs[0]||null,
   ck=[['ভূমিকা',!!o.intro],['লক্ষ্য',(o.objectives||[]).length>0],['শব্দ',(o.terms||[]).length>0],['ডায়াগ্রাম',(o.images||[]).length>0],['২ডি/৩ডি/অ্যানিমেশন',(o.media||[]).length>0],['পর্যবেক্ষণ',!!(lb&&(lb.observations||[]).length)],['কুইজ',!!(lb&&(lb.quiz||[]).length)],['কঠিনতা',!!lb]];
   var n=ck.filter(function(x){return x[1];}).length;tot+=ck.length;full+=n;
   return '<div class="ad-row"><div class="nm">'+E(o.title||r.c.title)+'<small>'+ck.map(function(x){return (x[1]?'✅ ':'⬜ ')+x[0];}).join(' · ')+'</small></div><b>'+X.bn(n)+'/'+X.bn(ck.length)+'</b><div class="ad-inl"><button class="slb s ad-sm" data-a="bc" data-i="'+r.f+'">✏️ কনটেন্ট</button><button class="slb '+(lb?'s':'o')+' ad-sm" data-a="bl" data-i="'+r.f+'">'+(lb?'🧪 ল্যাব এডিট':'➕ ল্যাব রেকর্ড')+'</button></div></div>';}).join('');
  body.innerHTML=bar()+'<div class="ad-cards"><div><small>🧬 জীববিজ্ঞান অধ্যায়</small><b>'+X.bn(A.length)+'</b></div><div><small>✅ সম্পূর্ণতা</small><b>'+X.bn(tot?Math.round(full*100/tot):0)+'%</b><em>বাকি কাজ নিচে দেখো</em></div><div><small>🧪 ল্যাব রেকর্ড</small><b>'+X.bn(d.labs.filter(function(l){return l.subject==='biology';}).length)+'</b></div></div><div class="sl-box"><h2>📋 অধ্যায়ের প্রস্তুতি</h2>'+rows+'</div>'
  +'<div class="sl-note">এটা আসল ডাটা থেকে গণনা। ⬜ মানে ওই অংশ এখনও ভরা হয়নি। ছবি ও ২ডি/৩ডি ফাইল আপলোড backend ছাড়া সম্ভব না, তাই এখন লিংক দিতে হয়।</div>';
  bindG(body);
  onClick(body,function(a,f){
   if(a==='bc'){ed.bt='ch';ed.ch=f;rr();}
   else if(a==='bl'){var l=d.labs.filter(function(x){return x.chapter===f;})[0];LB=l?clone(l):blankLab('biology',f);ed.bt='lab';lprev=false;rr();}
  });
 }

 /* ---------- প্রশ্নব্যাংক ---------- */
 var DIF=['সহজ','মাঝারি','কঠিন'];
 function blankQ(){return {id:uid('q'),type:'mcq',q:'',opts:['','','',''],ans:0,answers:[],pairs:[],answer:'',image:'',exp:'',difficulty:'মাঝারি',marks:1,time:0,subject:'math',chapter:'',classes:[]};}
 function g(id){var e=document.getElementById(id);return e?e.value:null;}
 function lines(t){return String(t||'').split('\n').map(function(x){return x.trim();}).filter(Boolean);}
 function qSync(){
  var Q=QE,t;
  if((t=g('qtxt'))!=null)Q.q=t;if((t=g('qsub'))!=null)Q.subject=t;if((t=g('qch'))!=null)Q.chapter=t;if((t=g('qdif'))!=null)Q.difficulty=t;if((t=g('qmk'))!=null)Q.marks=+t;if((t=g('qtm'))!=null)Q.time=+t||0;if((t=g('qexp'))!=null)Q.exp=t;
  if((t=g('qimg'))!=null)Q.image=t.trim();
  if(g('qo0')!=null)Q.opts=[0,1,2,3].map(function(k){return g('qo'+k)||'';});
  if((t=g('qans'))!=null)Q.ans=+t;if((t=g('qfill'))!=null)Q.answers=lines(t);
  if((t=g('qpairs'))!=null)Q.pairs=lines(t).map(function(x){var a=x.split('|');return [a[0].trim(),a.slice(1).join('|').trim()];}).filter(function(a){return a[0]&&a[1];});
  if((t=g('qmodel'))!=null)Q.answer=t;
  Q.classes=checked('qcb');
 }
 function qBody(Q){
  var T=Q.type,h='';
  if(T==='image')h+='<div><label style="font-weight:700">ছবির ঠিকানা (https:// বা images/ফাইল.png)</label><input id="qimg" style="width:100%" value="'+E(Q.image||'')+'"></div>';
  if(T==='mcq'||T==='image')h+=[0,1,2,3].map(function(k){return '<input id="qo'+k+'" placeholder="অপশন '+(k+1)+'" style="width:100%;margin-top:6px" value="'+E((Q.opts||[])[k]||'')+'">';}).join('')+'<div class="ad-inl" style="margin-top:6px"><label style="font-weight:700">সঠিক উত্তর:</label><select id="qans">'+[0,1,2,3].map(function(k){return '<option value="'+k+'"'+(+Q.ans===k?' selected':'')+'>অপশন '+(k+1)+'</option>';}).join('')+'</select></div>';
  else if(T==='tf')h+='<div class="ad-inl"><label style="font-weight:700">সঠিক উত্তর:</label><select id="qans"><option value="0"'+(+Q.ans===0?' selected':'')+'>সত্য</option><option value="1"'+(+Q.ans===1?' selected':'')+'>মিথ্যা</option></select></div>';
  else if(T==='fill')h+='<div><label style="font-weight:700">গ্রহণযোগ্য সঠিক উত্তর (প্রতি লাইনে একটা। প্রশ্নে ___ দিয়ে ফাঁকা বোঝাও)</label><textarea id="qfill" rows="3" style="width:100%">'+E((Q.answers||[]).join('\n'))+'</textarea></div>';
  else if(T==='match')h+='<div><label style="font-weight:700">জোড়া (প্রতি লাইনে: বাম | ডান)</label><textarea id="qpairs" rows="4" style="width:100%" placeholder="মাইটোকন্ড্রিয়া | শক্তিঘর">'+E((Q.pairs||[]).map(function(a){return a[0]+' | '+a[1];}).join('\n'))+'</textarea></div>';
  else h+='<div><label style="font-weight:700">আদর্শ উত্তর (শিক্ষার্থী জমা দিলে এটা দেখবে, নম্বর স্বয়ংক্রিয় হয় না)</label><textarea id="qmodel" rows="3" style="width:100%">'+E(Q.answer||'')+'</textarea></div>';
  return h;
 }
 function dupKey(q){return q.type+'|'+window.SLQuiz.norm(q.q);}
 function dl(name,text,mime){var b=new Blob([text],{type:mime}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();}
 function csvCell(x){x=String(x==null?'':x);if(/^[=+\-@\t\r]/.test(x))x="'"+x;return '"'+x.replace(/"/g,'""')+'"';}
 function qAns(q){return q.type==='tf'?(+q.ans===0?'সত্য':'মিথ্যা'):(q.type==='mcq'||q.type==='image')?(q.opts||[])[+q.ans]:q.type==='fill'?(q.answers||[]).join(' / '):q.type==='match'?(q.pairs||[]).map(function(a){return a[0]+'→'+a[1];}).join('; '):q.answer;}
 function vQb(){
  var d=load(),body=X.body,Q=window.SLQuiz;
  if(QE){var q=QE,ex=d.questions.some(function(x){return x.id===q.id;});
   var h=bar()+'<div class="sl-box"><h2>'+(ex?'✏️ প্রশ্ন এডিট':'➕ নতুন প্রশ্ন')+'</h2><div class="ad-f"><div><label>ধরন</label><select id="qtype">'+Object.keys(Q.TYPES).map(function(k){return '<option value="'+k+'"'+(q.type===k?' selected':'')+'>'+Q.TYPES[k]+'</option>';}).join('')+'</select></div>'
   +'<div><label>বিষয়</label><select id="qsub">'+d.subjects.map(function(x){return '<option value="'+x.k+'"'+(q.subject===x.k?' selected':'')+'>'+E(x.name)+'</option>';}).join('')+'</select></div>'
   +'<div><label>অধ্যায় (ঐচ্ছিক)</label><select id="qch"><option value="">— নেই —</option>'+base().map(function(c){return '<option value="'+E(cf(c))+'"'+(q.chapter===cf(c)?' selected':'')+'>'+E(c.title)+'</option>';}).join('')+'</select></div>'
   +'<div><label>কঠিনতা</label><select id="qdif">'+DIF.map(function(x){return '<option'+(q.difficulty===x?' selected':'')+'>'+x+'</option>';}).join('')+'</select></div>'
   +'<div><label>নম্বর</label><input id="qmk" type="number" min="0.5" step="0.5" value="'+(q.marks||1)+'"></div><div><label>সময় (সেকেন্ড, ঐচ্ছিক)</label><input id="qtm" type="number" min="0" value="'+(q.time||0)+'"></div></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">প্রশ্ন (বাংলায়)</label><textarea id="qtxt" rows="3" style="width:100%">'+E(q.q)+'</textarea></div><div style="margin-top:8px">'+qBody(q)+'</div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">ব্যাখ্যা</label><input id="qexp" style="width:100%" value="'+E(q.exp||'')+'"></div><div style="margin-top:10px"><label style="font-weight:700">কোন ক্লাসে</label><div>'+classBoxes(q.classes,'qcb')+'</div></div></div>'
   +'<div class="ad-inl"><button class="slb o" data-a="qs">💾 সেভ</button><button class="slb p" data-a="qp">👁️ প্রিভিউ</button><button class="slb s" data-a="qx">← ফিরে যাও</button></div>'+(qprev?'<div class="sl-box" style="background:#fff;color:#22303c;margin-top:16px"><div id="pvb"></div></div>':'');
   body.innerHTML=h;bindG(body);
   if(qprev){var er=Q.validate(q);if(er)document.getElementById('pvb').textContent='⚠️ '+er;else Q.preview(q,document.getElementById('pvb'));}
   document.getElementById('qtype').onchange=function(){qSync();QE.type=this.value;if(QE.type==='tf')QE.ans=0;rr();};
   onClick(body,function(a){
    qSync();
    if(a==='qp'){qprev=!qprev;rr();}else if(a==='qx'){QE=null;qprev=false;rr();}
    else if(a==='qs'){var er=Q.validate(QE);if(er)return X.toast('❌ '+er);var k=d.questions.map(function(x){return x.id;}).indexOf(QE.id);if(k>-1)d.questions[k]=clone(QE);else d.questions.push(clone(QE));QE=null;qprev=false;chg();X.toast('✅ প্রশ্ন সেভ হয়েছে');}
   });return;
  }
  var tq=(qf.q||'').toLowerCase(),R=d.questions.filter(function(x){return (!tq||x.q.toLowerCase().indexOf(tq)>-1)&&(!qf.t||x.type===qf.t)&&(!qf.s||x.subject===qf.s)&&(!qf.d||x.difficulty===qf.d);});
  var h2=bar()+'<div class="ad-cards"><div><small>❓ মোট প্রশ্ন</small><b>'+X.bn(d.questions.length)+'</b></div>'+['mcq','tf','fill','match','image','short','concept'].map(function(k){var n=d.questions.filter(function(x){return x.type===k;}).length;return '<div><small>'+Q.TYPES[k]+'</small><b>'+X.bn(n)+'</b></div>';}).join('')+'</div>'
  +(IMP?'<div class="sl-box" style="border:2px solid #3f6fd1"><h2>📥 ইমপোর্ট প্রিভিউ</h2><p>✅ নতুন: <b>'+X.bn(IMP.ok.length)+'</b> · 🔁 ডুপ্লিকেট (বাদ যাবে): <b>'+X.bn(IMP.dup)+'</b> · ⚠️ ভুল (বাদ যাবে): <b>'+X.bn(IMP.bad.length)+'</b></p>'
   +(IMP.ok.length?'<div class="sl-scroll"><table class="sl-tbl"><tr><th>প্রশ্ন</th><th>ধরন</th></tr>'+IMP.ok.slice(0,8).map(function(x){return '<tr><td>'+E(x.q.slice(0,70))+'</td><td>'+Q.TYPES[x.type]+'</td></tr>';}).join('')+'</table></div>'+(IMP.ok.length>8?'<small>…আরও '+X.bn(IMP.ok.length-8)+'টি</small>':''):'')
   +(IMP.bad.length?'<ul style="color:#b5391f">'+IMP.bad.slice(0,5).map(function(b){return '<li>'+X.bn(b.i+1)+' নং: '+E(b.err)+'</li>';}).join('')+'</ul>':'')
   +'<div class="ad-inl"><button class="slb o" data-a="ic"'+(IMP.ok.length?'':' disabled')+'>✅ '+X.bn(IMP.ok.length)+'টি যোগ করো</button><button class="slb s" data-a="ix">বাতিল</button></div></div>':'')
  +'<div class="sl-box"><div class="ad-inl" style="margin-bottom:10px"><button class="slb o" data-a="qn">➕ নতুন প্রশ্ন</button><button class="slb s ad-sm" data-a="ej">⬇️ JSON এক্সপোর্ট</button><button class="slb s ad-sm" data-a="ec">⬇️ CSV (Excel) এক্সপোর্ট</button><label class="slb s ad-sm" style="cursor:pointer">📥 JSON ইমপোর্ট<input type="file" id="qimp" accept=".json,application/json" style="display:none"></label></div>'
  +'<div class="ad-fil"><input id="fq" placeholder="🔍 প্রশ্ন খোঁজো" value="'+E(qf.q)+'" style="flex:1;min-width:160px"><select id="ft"><option value="">সব ধরন</option>'+Object.keys(Q.TYPES).map(function(k){return '<option value="'+k+'"'+(qf.t===k?' selected':'')+'>'+Q.TYPES[k]+'</option>';}).join('')+'</select><select id="fs"><option value="">সব বিষয়</option>'+d.subjects.map(function(x){return '<option value="'+x.k+'"'+(qf.s===x.k?' selected':'')+'>'+E(x.name)+'</option>';}).join('')+'</select><select id="fd"><option value="">সব কঠিনতা</option>'+DIF.map(function(x){return '<option'+(qf.d===x?' selected':'')+'>'+x+'</option>';}).join('')+'</select></div>'
  +(R.length?R.map(function(x){return '<div class="ad-row"><div class="nm">'+E(x.q.slice(0,90))+'<small>'+Q.TYPES[x.type]+' · '+E(sName(x.subject))+' · '+E(x.difficulty||'')+' · '+X.bn(x.marks)+' নম্বর</small></div><div class="ad-inl"><button class="slb s ad-sm" data-a="qe" data-i="'+x.id+'">✏️</button><button class="slb s ad-sm" data-a="qd" data-i="'+x.id+'">📄 কপি</button><button class="slb r ad-sm" data-a="qr" data-i="'+x.id+'">🗑️</button></div></div>';}).join(''):'<p style="color:var(--mut)">'+(d.questions.length?'কিছু পাওয়া যায়নি।':'এখনও কোনো প্রশ্ন নেই।')+'</p>')+'</div>'
  +'<div class="sl-note">ℹ️ <b>সংক্ষিপ্ত উত্তর</b> ও <b>ধারণামূলক</b> প্রশ্নে নম্বর স্বয়ংক্রিয় হয় না, শিক্ষার্থী আদর্শ উত্তর মিলিয়ে দেখে। CSV এক্সপোর্ট Excel এ সরাসরি খোলে। ইমপোর্টে আগে প্রিভিউ আসে, ডুপ্লিকেট বাদ যায়।</div>';
  body.innerHTML=h2;bindG(body);
  function refocus(id){var n=document.getElementById(id);if(n){n.focus();try{n.setSelectionRange(n.value.length,n.value.length);}catch(e){}}}
  document.getElementById('fq').oninput=function(){qf.q=this.value;vQb();refocus('fq');};
  ['ft','fs','fd'].forEach(function(i){document.getElementById(i).onchange=function(){qf[{ft:'t',fs:'s',fd:'d'}[i]]=this.value;vQb();};});
  document.getElementById('qimp').onchange=function(){var f=this.files[0];if(!f)return;if(f.size>2e6)return X.toast('❌ ফাইল ২ MB এর বেশি');var r=new FileReader();r.onload=function(){
   var J;try{J=JSON.parse(r.result);}catch(e){return X.toast('❌ JSON ঠিক নয়');}
   var arr=Array.isArray(J)?J:(J&&J.questions);if(!Array.isArray(arr))return X.toast('❌ প্রশ্নের তালিকা পাওয়া যায়নি');
   var seen={};d.questions.forEach(function(x){seen[dupKey(x)]=1;});var ids={};d.questions.forEach(function(x){ids[x.id]=1;});IMP={ok:[],dup:0,bad:[]};
   arr.slice(0,1000).forEach(function(x,i){if(x&&typeof x==='object'){x=clone(x);x.marks=+x.marks||1;x.difficulty=DIF.indexOf(x.difficulty)>-1?x.difficulty:'মাঝারি';x.subject=x.subject||'math';x.classes=x.classes||[];x.time=+x.time||0;}
    var er=Q.validate(x);if(er)return IMP.bad.push({i:i,err:er});var k=dupKey(x);if(seen[k])return IMP.dup++;seen[k]=1;if(!x.id||ids[x.id])x.id=uid('q');ids[x.id]=1;
    var c={id:String(x.id),type:x.type,q:String(x.q),opts:(x.opts||[]).map(String).slice(0,4),ans:+x.ans||0,answers:(x.answers||[]).map(String),pairs:(x.pairs||[]).map(function(a){return [String(a[0]),String(a[1])];}),answer:String(x.answer||''),image:String(x.image||''),exp:String(x.exp||''),difficulty:x.difficulty,marks:x.marks,time:x.time,subject:String(x.subject),chapter:String(x.chapter||''),classes:(x.classes||[]).map(String)};IMP.ok.push(c);});
   rr();};r.readAsText(f);};
  onClick(body,function(a,id){
   if(a==='qn'){QE=blankQ();qprev=false;rr();}
   else if(a==='qe'){QE=clone(d.questions.filter(function(x){return x.id===id;})[0]);rr();}
   else if(a==='qd'){var o=clone(d.questions.filter(function(x){return x.id===id;})[0]);o.id=uid('q');o.q=o.q+' (কপি)';d.questions.push(o);chg();}
   else if(a==='qr'){if(!confirm('প্রশ্নটা মুছবে? কুইজ থেকেও সরে যাবে।'))return;d.questions=d.questions.filter(function(x){return x.id!==id;});d.quizzes.forEach(function(z){z.qids=(z.qids||[]).filter(function(x){return x!==id;});});chg();}
   else if(a==='ej'){dl('questions.json',JSON.stringify({v:1,questions:d.questions},null,1),'application/json');}
   else if(a==='ec'){var H=['id','ধরন','বিষয়','অধ্যায়','কঠিনতা','নম্বর','প্রশ্ন','অপশন','সঠিক উত্তর','ব্যাখ্যা'],rows=[H.map(csvCell).join(',')];d.questions.forEach(function(x){rows.push([x.id,window.SLQuiz.TYPES[x.type],sName(x.subject),x.chapter,x.difficulty,x.marks,x.q,(x.opts||[]).filter(Boolean).join(' | '),qAns(x),x.exp].map(csvCell).join(','));});dl('questions.csv','﻿'+rows.join('\r\n'),'text/csv;charset=utf-8');}
   else if(a==='ic'){IMP.ok.forEach(function(x){d.questions.push(x);});X.toast('✅ '+IMP.ok.length+'টি প্রশ্ন যোগ হয়েছে');IMP=null;chg();}
   else if(a==='ix'){IMP=null;rr();}
  });
 }
 /* ---------- কুইজ ম্যানেজার ---------- */
 function vQz(){
  var d=load(),body=X.body,Q=window.SLQuiz,QS={};d.questions.forEach(function(x){QS[x.id]=x;});
  if(QZ){var Z=QZ,ex=d.quizzes.some(function(x){return x.id===Z.id;}),tot=(Z.qids||[]).reduce(function(a,id){var q=QS[id];return a+(q&&q.type!=='short'&&q.type!=='concept'?(+q.marks||1):0);},0);
   var tq=(zf.q||'').toLowerCase(),avail=d.questions.filter(function(x){return (Z.qids||[]).indexOf(x.id)<0&&(!tq||x.q.toLowerCase().indexOf(tq)>-1)&&(!zf.t||x.type===zf.t)&&(!zf.s||x.subject===zf.s);});
   var h=bar()+'<div class="sl-box"><h2>'+(ex?'✏️ কুইজ এডিট':'➕ নতুন কুইজ')+'</h2><div class="ad-f"><div><label>কুইজের নাম</label><input id="zt" value="'+E(Z.title)+'"></div>'
   +'<div><label>বিষয়</label><select id="zs">'+d.subjects.map(function(x){return '<option value="'+x.k+'"'+(Z.subject===x.k?' selected':'')+'>'+E(x.name)+'</option>';}).join('')+'</select></div>'
   +'<div><label>অধ্যায় (ঐচ্ছিক)</label><select id="zc"><option value="">— নেই —</option>'+base().map(function(c){return '<option value="'+E(cf(c))+'"'+(Z.chapter===cf(c)?' selected':'')+'>'+E(c.title)+'</option>';}).join('')+'</select></div>'
   +'<div><label>পাস মার্ক (%)</label><input id="zp" type="number" min="0" max="100" value="'+(Z.pass==null?40:Z.pass)+'"></div><div><label>সময় (মিনিট, ০ = সীমাহীন)</label><input id="zm" type="number" min="0" value="'+(Z.time||0)+'"></div>'
   +'<div><label>অবস্থা</label><select id="zst"><option value="draft"'+(Z.state!=='published'?' selected':'')+'>ড্রাফট</option><option value="published"'+(Z.state==='published'?' selected':'')+'>প্রকাশিত</option></select></div></div>'
   +'<label style="display:flex;gap:8px;margin-top:10px;font-weight:700"><input type="checkbox" id="zsh"'+(Z.shuffle?' checked':'')+'> প্রশ্নের ক্রম র‍্যান্ডম করো</label><div style="margin-top:10px"><label style="font-weight:700">কোন ক্লাসে</label><div>'+classBoxes(Z.classes,'zcb')+'</div></div></div>'
   +'<div class="sl-box"><h2>📌 বাছাই করা প্রশ্ন ('+X.bn((Z.qids||[]).length)+'টি · স্বয়ংক্রিয় নম্বর '+X.bn(tot)+')</h2>'+((Z.qids||[]).length?Z.qids.map(function(id,i){var q=QS[id];return '<div class="ad-row"><div class="nm">'+X.bn(i+1)+'. '+E(q?q.q.slice(0,80):'(মুছে গেছে)')+'<small>'+(q?Q.TYPES[q.type]+' · '+X.bn(q.marks)+' নম্বর':'')+'</small></div><div class="ad-inl"><button class="slb s ad-sm" data-a="zu" data-i="'+i+'"'+(i?'':' disabled')+'>▲</button><button class="slb s ad-sm" data-a="zd" data-i="'+i+'"'+(i<Z.qids.length-1?'':' disabled')+'>▼</button><button class="slb r ad-sm" data-a="zx" data-i="'+i+'">✖</button></div></div>';}).join(''):'<p style="color:var(--mut)">নিচ থেকে প্রশ্ন যোগ করো।</p>')+'</div>'
   +'<div class="sl-box"><h2>➕ প্রশ্নব্যাংক থেকে যোগ করো</h2><div class="ad-fil"><input id="zq" placeholder="🔍 খোঁজো" value="'+E(zf.q)+'" style="flex:1;min-width:150px"><select id="zft"><option value="">সব ধরন</option>'+Object.keys(Q.TYPES).map(function(k){return '<option value="'+k+'"'+(zf.t===k?' selected':'')+'>'+Q.TYPES[k]+'</option>';}).join('')+'</select><select id="zfs"><option value="">সব বিষয়</option>'+d.subjects.map(function(x){return '<option value="'+x.k+'"'+(zf.s===x.k?' selected':'')+'>'+E(x.name)+'</option>';}).join('')+'</select></div>'
   +(avail.length?avail.slice(0,40).map(function(x){return '<div class="ad-row"><div class="nm">'+E(x.q.slice(0,80))+'<small>'+Q.TYPES[x.type]+' · '+E(x.difficulty||'')+'</small></div><button class="slb o ad-sm" data-a="za" data-i="'+x.id+'">➕</button></div>';}).join(''):'<p style="color:var(--mut)">যোগ করার মতো প্রশ্ন নেই।</p>')+'</div>'
   +'<div class="ad-inl"><button class="slb o" data-a="zs">💾 সেভ</button><button class="slb p" data-a="zp">👁️ প্রিভিউ</button><button class="slb s" data-a="zb">← ফিরে যাও</button></div>'+(zprev?'<div class="sl-box" style="background:#fff;color:#22303c;margin-top:16px"><div id="pvb"></div></div>':'');
   body.innerHTML=h;bindG(body);
   if(zprev)Q.render(Z,d,document.getElementById('pvb'));
   var zsync=function(){var t;if((t=g('zt'))!=null)Z.title=t;Z.subject=g('zs');Z.chapter=g('zc');Z.pass=Math.min(100,Math.max(0,+g('zp')||0));Z.time=Math.max(0,+g('zm')||0);Z.state=g('zst');Z.shuffle=document.getElementById('zsh').checked;Z.classes=checked('zcb');};
   var rf=function(id){var n=document.getElementById(id);if(n){n.focus();try{n.setSelectionRange(n.value.length,n.value.length);}catch(e){}}};
   document.getElementById('zq').oninput=function(){zsync();zf.q=this.value;rr();setTimeout(function(){rf('zq');},0);};
   document.getElementById('zft').onchange=function(){zsync();zf.t=this.value;rr();};document.getElementById('zfs').onchange=function(){zsync();zf.s=this.value;rr();};
   onClick(body,function(a,i){
    zsync();Z.qids=Z.qids||[];
    if(a==='za'){Z.qids.push(i);rr();}else if(a==='zx'){Z.qids.splice(+i,1);rr();}
    else if(a==='zu'||a==='zd'){var j=+i+(a==='zu'?-1:1),t=Z.qids[+i];Z.qids[+i]=Z.qids[j];Z.qids[j]=t;rr();}
    else if(a==='zp'){zprev=!zprev;rr();}else if(a==='zb'){QZ=null;zprev=false;rr();}
    else if(a==='zs'){if(!Z.title.trim())return X.toast('❌ কুইজের নাম লেখো');if(!Z.qids.length)return X.toast('❌ কমপক্ষে একটা প্রশ্ন বাছো');var k=d.quizzes.map(function(x){return x.id;}).indexOf(Z.id);if(k>-1)d.quizzes[k]=clone(Z);else d.quizzes.push(clone(Z));QZ=null;zprev=false;chg();X.toast('✅ কুইজ সেভ হয়েছে');}
   });return;
  }
  body.innerHTML=bar()+'<div class="sl-box"><div class="ad-inl" style="margin-bottom:8px"><button class="slb o" data-a="zn">➕ নতুন কুইজ</button><a class="slb s" href="quiz.html" target="_blank" rel="noopener">↗ শিক্ষার্থীর কুইজ পেজ</a></div>'
  +(d.quizzes.length?d.quizzes.map(function(z){return '<div class="ad-row"><div class="nm">'+E(z.title)+'<small>'+E(sName(z.subject))+' · '+X.bn((z.qids||[]).length)+'টি প্রশ্ন · পাস '+X.bn(z.pass||0)+'%'+(z.time?' · '+X.bn(z.time)+' মিনিট':'')+(z.shuffle?' · র‍্যান্ডম':'')+'</small></div>'+(z.state==='published'?'<span class="bdg">✅ প্রকাশিত</span>':'<span class="bdg t">📝 ড্রাফট</span>')+'<div class="ad-inl"><button class="slb s ad-sm" data-a="ze" data-i="'+z.id+'">✏️</button><button class="slb s ad-sm" data-a="zt" data-i="'+z.id+'">'+(z.state==='published'?'আনপাবলিশ':'পাবলিশ')+'</button><a class="slb s ad-sm" href="quiz.html?id='+encodeURIComponent(z.id)+'&draft=1" target="_blank" rel="noopener">👁️</a><button class="slb r ad-sm" data-a="zr" data-i="'+z.id+'">🗑️</button></div></div>';}).join(''):'<p style="color:var(--mut)">এখনও কোনো কুইজ নেই। আগে 📝 প্রশ্নব্যাংকে প্রশ্ন বানাও।</p>')+'</div>'
  +'<div class="sl-note">ℹ️ শিক্ষার্থীরা শুধু <b>প্রকাশিত</b> কুইজ দেখবে, আর সেটা content.js লাইভ করার পর। কুইজের ফলাফল শুধু তার নিজের ব্রাউজারে সেভ হয়, সার্ভারে যায় না। তাই অ্যানালিটিক্সে কুইজ অ্যাটেম্পট গোনা Phase 9 এর পর সম্ভব।</div>';
  bindG(body);
  onClick(body,function(a,id){
   if(a==='zn'){QZ={id:uid('z'),title:'',subject:'math',chapter:'',classes:[],qids:[],shuffle:true,pass:40,time:0,state:'draft'};zprev=false;rr();}
   else if(a==='ze'){QZ=clone(d.quizzes.filter(function(x){return x.id===id;})[0]);rr();}
   else if(a==='zt'){var z=d.quizzes.filter(function(x){return x.id===id;})[0];z.state=z.state==='published'?'draft':'published';chg();}
   else if(a==='zr'){if(confirm('কুইজটা মুছবে? (প্রশ্নব্যাংকের প্রশ্ন থাকবে)')){d.quizzes=d.quizzes.filter(function(x){return x.id!==id;});chg();}}
  });
 }

 /* ---------- সাবস্ক্রিপশন প্ল্যান ---------- */
 function fromCfg(k){var p=X.cfg.PLANS[k];return {key:k,name:p.name,emoji:p.emoji,desc:p.desc,students:p.students,teachers:p.teachers,devices:p.devices,color:p.color,isSchool:!!p.isSchool,custom:!!p.custom,big:!!p.big,price:{month:p.price.month,week:p.price.week},days:p.days||{month:30,week:7},disc:p.disc||0,label:p.dlabel||'',until:p.duntil||0,active:!p.off,features:(p.features||[]).slice()};}
 function curPlans(){var d=load();return d.plans.length?d.plans:Object.keys(X.cfg.PLANS).map(fromCfg);}
 function seedPlans(){var d=load();if(!d.plans.length)d.plans=Object.keys(X.cfg.PLANS).map(fromCfg);return d;}
 function dstr(t){if(!t)return '';var x=new Date(t);return x.getFullYear()+'-'+('0'+(x.getMonth()+1)).slice(-2)+'-'+('0'+x.getDate()).slice(-2);}
 function vPlans(){
  var d=load(),body=X.body,tabs='<div class="ad-tabs"><button data-pt="plans" class="'+(PT==='plans'?'on':'')+'">🏷️ প্ল্যান</button><button data-pt="free" class="'+(PT==='free'?'on':'')+'">🎁 ফ্রি/ট্রায়াল কনটেন্ট</button><button data-pt="legacy" class="'+(PT==='legacy'?'on':'')+'">🗂️ পুরোনো prices.js পদ্ধতি</button></div>';
  function tabBind(){[].forEach.call(body.querySelectorAll('[data-pt]'),function(b){b.onclick=function(){PT=b.dataset.pt;PE=null;rr();};});}
  if(PT==='legacy'){X.legacy();body.insertAdjacentHTML('afterbegin',tabs+'<div class="sl-note">এটা আগের পদ্ধতি (প্রাইস ফাইল নামিয়ে বসানো)। নতুন প্ল্যান ম্যানেজার (content.js) এর দাম এটাকে ছাপিয়ে যায়, তাই একটা পদ্ধতিই ব্যবহার করো।</div>');tabBind();return;}
  if(PT==='free'){
   var fr=d.freeChapters.length?d.freeChapters:(X.cfg.FREE||[]),A=base(),td=d.trialDays||X.cfg.TRIAL_DAYS;
   body.innerHTML=tabs+bar()+'<div class="sl-box"><h2>🎁 ফ্রি ট্রায়াল</h2><div class="ad-f"><div><label>ট্রায়ালের দিন (১–৯০)</label><input id="td" type="number" min="1" max="90" value="'+td+'"></div></div><p style="color:var(--mut)">নতুন অ্যাকাউন্ট এই কয়দিন নিচের "ট্রায়ালে খোলা অধ্যায়" গুলো পাবে (কিছু না বাছলে সব অধ্যায় খোলা)।</p></div>'
   +'<div class="sl-box"><h2>🎁 ট্রায়ালে খোলা অধ্যায় ('+X.bn(d.trialChapters.length)+'টি বাছা)</h2><p style="color:var(--mut);margin-top:0">শুধু টিক দেওয়া অধ্যায়গুলো ট্রায়ালে খুলবে, বাকিগুলো প্ল্যান লাগবে। <b>কিছুই টিক না দিলে ট্রায়ালে বাড়তি কোনো অধ্যায় খোলে না, শুধু ফ্রি অধ্যায়গুলো খোলা থাকে।</b> (নিচের "ফ্রি অধ্যায়" তালিকার অধ্যায় সবসময় সবার জন্য খোলা।)</p><div style="columns:2 280px">'+A.map(function(c){return '<label style="display:block;font-weight:600;margin:2px 0"><input type="checkbox" class="tcb" value="'+E(cf(c))+'"'+(d.trialChapters.indexOf(cf(c))>-1?' checked':'')+'> '+E(c.title)+'</label>';}).join('')+'</div></div>'
   +'<div class="sl-box"><h2>📖 ফ্রি অধ্যায় ('+X.bn(fr.length)+'টি) ও প্রিমিয়াম ('+X.bn(A.length-A.filter(function(c){return fr.indexOf(cf(c))>-1;}).length)+'টি)</h2><p style="color:var(--mut);margin-top:0">টিক দেওয়াগুলো সবাই লগইন ছাড়াই পাবে, বাকিগুলো প্রিমিয়াম। (ল্যাব রেকর্ডে আলাদা ফ্রি/প্রিমিয়াম দিলে সেটা এটাকে ছাপিয়ে যায়।)</p><div style="columns:2 280px">'
   +A.map(function(c){return '<label style="display:block;font-weight:600;margin:2px 0"><input type="checkbox" class="fcb" value="'+E(cf(c))+'"'+(fr.indexOf(cf(c))>-1?' checked':'')+'> '+E(c.title)+'</label>';}).join('')+'</div><div class="ad-inl" style="margin-top:12px"><button class="slb o" data-a="fs">💾 সেভ</button></div></div>';
   tabBind();bindG(body);
   onClick(body,function(a){if(a!=='fs')return;var t=Math.round(+v('td'));if(!(t>=1&&t<=90))return X.toast('❌ ট্রায়াল ১–৯০ দিনের মধ্যে হতে হবে');var f=checked('fcb');if(!f.length)return X.toast('❌ কমপক্ষে ১টা ফ্রি অধ্যায় রাখো');d.trialDays=t;d.freeChapters=f;d.trialChapters=checked('tcb');chg();X.toast('✅ সেভ হয়েছে');});
   return;
  }
  var L=curPlans();
  if(PE){var P=PE,isNew=!L.some(function(x){return x.key===P.key;});
   body.innerHTML=tabs+bar()+'<div class="sl-box"><h2>'+(isNew?'➕ নতুন প্ল্যান':'✏️ প্ল্যান এডিট')+'</h2><div class="ad-f"><div><label>নাম</label><input id="pn" value="'+E(P.name)+'"></div><div><label>ইমোজি</label><input id="pe" maxlength="4" value="'+E(P.emoji||'')+'"></div><div><label>সংক্ষিপ্ত বিবরণ</label><input id="pd" value="'+E(P.desc||'')+'"></div>'
   +'<div><label>সর্বোচ্চ শিক্ষার্থী</label><input id="ps" type="number" min="1" value="'+P.students+'"></div><div><label>সর্বোচ্চ শিক্ষক</label><input id="pt" type="number" min="0" value="'+P.teachers+'"></div><div><label>ডিভাইস লিমিট</label><input id="pv" type="number" min="1" value="'+P.devices+'"></div>'
   +'<div><label>মাসিক দাম (৳)</label><input id="pm" type="number" min="0" value="'+P.price.month+'"></div><div><label>সাপ্তাহিক দাম (৳)</label><input id="pw" type="number" min="0" value="'+P.price.week+'"></div><div><label>"মাস" কত দিনের</label><input id="pmd" type="number" min="1" value="'+P.days.month+'"></div><div><label>"সপ্তাহ" কত দিনের</label><input id="pwd" type="number" min="1" value="'+P.days.week+'"></div>'
   +'<div><label>ছাড় (%)</label><input id="pdc" type="number" min="0" max="90" value="'+P.disc+'"></div><div><label>ছাড়ের লেবেল</label><input id="pdl" value="'+E(P.label||'')+'"></div><div><label>ছাড় শেষ হবে (ঐচ্ছিক)</label><input id="pdu" type="date" value="'+dstr(P.until)+'"></div></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">ফিচার তালিকা (প্রতি লাইনে একটা, প্ল্যান পেজে দেখাবে)</label><textarea id="pft" rows="4" style="width:100%">'+E((P.features||[]).join('\n'))+'</textarea></div>'
   +'<div class="ad-inl" style="margin-top:10px"><label style="font-weight:700;display:flex;gap:6px"><input type="checkbox" id="pis"'+(P.isSchool?' checked':'')+'> স্কুল/প্রতিষ্ঠান ধরনের প্ল্যান</label><label style="font-weight:700;display:flex;gap:6px"><input type="checkbox" id="pac"'+(P.active!==false?' checked':'')+'> চালু (নতুন গ্রাহক কিনতে পারবে)</label></div></div>'
   +'<div class="ad-inl"><button class="slb o" data-a="ps">💾 সেভ</button><button class="slb s" data-a="px">← ফিরে যাও</button></div>';
   tabBind();bindG(body);
   onClick(body,function(a){
    if(a==='px'){PE=null;rr();return;}
    var o={key:P.key,custom:P.custom,big:P.big,color:P.color||'#3f6fd1',name:v('pn').trim(),emoji:v('pe').trim()||'📦',desc:v('pd').trim(),students:Math.round(+v('ps')),teachers:Math.round(+v('pt')),devices:Math.round(+v('pv')),price:{month:+v('pm'),week:+v('pw')},days:{month:Math.round(+v('pmd')),week:Math.round(+v('pwd'))},disc:Math.round(+v('pdc')||0),label:v('pdl').trim(),until:v('pdu')?new Date(v('pdu')+'T23:59:59').getTime():0,active:document.getElementById('pac').checked,isSchool:document.getElementById('pis').checked,features:lines(v('pft'))};
    if(!o.name)return X.toast('❌ নাম লেখো');if(!(o.students>=1)||!(o.teachers>=0)||!(o.devices>=1))return X.toast('❌ লিমিটের সংখ্যা ঠিক করো');
    if(!(o.price.month>=0)||!(o.price.week>=0))return X.toast('❌ দাম ০ বা তার বেশি হতে হবে');if(!(o.days.month>=1)||!(o.days.week>=1))return X.toast('❌ দিনের সংখ্যা ১ বা বেশি হতে হবে');if(o.disc<0||o.disc>90)return X.toast('❌ ছাড় ০–৯০% এর মধ্যে');
    seedPlans();var k=d.plans.map(function(x){return x.key;}).indexOf(o.key);if(k>-1)d.plans[k]=o;else d.plans.push(o);PE=null;chg();X.toast('✅ প্ল্যান ড্রাফটে সেভ হয়েছে');
   });return;
  }
  body.innerHTML=tabs+bar()+'<div class="sl-box"><div class="ad-inl" style="margin-bottom:8px"><button class="slb o" data-a="pn">➕ নতুন প্ল্যান</button><a class="slb s" href="plans.html" target="_blank" rel="noopener">↗ শিক্ষার্থীর প্ল্যান পেজ</a></div>'
  +L.map(function(p){var n=X.list().filter(function(a){return a.kind===p.key;}).length;return '<div class="ad-row"><div class="nm">'+E(p.emoji)+' '+E(p.name)+'<small>'+E(p.desc||'')+' · শিক্ষার্থী '+X.bn(p.students)+', শিক্ষক '+X.bn(p.teachers)+' · মাস='+X.bn(p.days.month)+' দিন, সপ্তাহ='+X.bn(p.days.week)+' দিন · ব্যবহারকারী '+X.bn(n)+'টি অ্যাকাউন্ট</small></div><b>৳'+X.bn(p.price.month)+'/মাস · ৳'+X.bn(p.price.week)+'/সপ্তাহ</b>'+(p.disc?'<span class="bdg t">🔥 '+X.bn(p.disc)+'% ছাড়</span>':'')+(p.active!==false?'<span class="bdg">✅ চালু</span>':'<span class="bdg s">⏸ বন্ধ</span>')
   +'<div class="ad-inl"><button class="slb s ad-sm" data-a="pe" data-i="'+E(p.key)+'">✏️</button><button class="slb s ad-sm" data-a="pa" data-i="'+E(p.key)+'">চালু/বন্ধ</button><button class="slb r ad-sm" data-a="pdl" data-i="'+E(p.key)+'">🗑️</button></div></div>';}).join('')+'</div>'
  +'<div class="sl-note">ℹ️ প্ল্যান বন্ধ করলে নতুন গ্রাহক কিনতে পারবে না, কিন্তু যাদের আছে তারা চালিয়ে যেতে পারবে। কোনো অ্যাকাউন্ট যে প্ল্যানে আছে সেটা মোছা যায় না। এখন প্ল্যানের মেয়াদ <b>মাসিক ও সাপ্তাহিক</b> এই দুই ধরনে (দিনের সংখ্যা বদলানো যায়)। ত্রৈমাসিক/বার্ষিক আলাদা মেয়াদ এখনও নেই।</div>';
  tabBind();bindG(body);
  onClick(body,function(a,k){
   if(a==='pn'){PE={key:'p'+Date.now().toString(36).slice(-6),name:'',emoji:'📦',desc:'',students:1,teachers:0,devices:2,color:'#3f6fd1',isSchool:false,price:{month:0,week:0},days:{month:30,week:7},disc:0,label:'',until:0,active:true,features:[]};rr();}
   else if(a==='pe'){PE=clone(L.filter(function(x){return x.key===k;})[0]);rr();}
   else if(a==='pa'){seedPlans();var p=d.plans.filter(function(x){return x.key===k;})[0];p.active=p.active===false;chg();}
   else if(a==='pdl'){if(X.list().some(function(x){return x.kind===k;}))return X.toast('❌ এই প্ল্যানে অ্যাকাউন্ট আছে, মোছা যাবে না। চাইলে বন্ধ করো');if(!confirm('প্ল্যানটা মুছবে?'))return;seedPlans();d.plans=d.plans.filter(function(x){return x.key!==k;});chg();}
  });
 }

 /* ---------- ঘোষণা / নোটিফিকেশন ---------- */
 var LV={info:'ℹ️ সাধারণ',warn:'⚠️ জরুরি',good:'🎉 সুখবর'};
 function dts(t){return t?dstr(t):'';}
 function annState(a,now){if(a.active===false)return ['⏸ বন্ধ','bdg s'];if(a.from&&a.from>now)return ['🕒 নির্ধারিত','bdg t'];if(a.until&&a.until<now)return ['⌛ মেয়াদ শেষ','bdg s'];return ['✅ চলছে','bdg'];}
 function vNtf(){
  var d=load(),body=X.body,now=Date.now();
  if(NE){var P=NE,isNew=!d.announcements.some(function(x){return x.id===P.id;});
   body.innerHTML=bar()+'<div class="sl-box"><h2>'+(isNew?'➕ নতুন ঘোষণা':'✏️ ঘোষণা এডিট')+'</h2><div class="ad-f"><div><label>শিরোনাম (৮০ অক্ষর)</label><input id="nt" maxlength="80" value="'+E(P.title)+'"></div><div><label>ধরন</label><select id="nl">'+Object.keys(LV).map(function(k){return '<option value="'+k+'"'+(P.level===k?' selected':'')+'>'+LV[k]+'</option>';}).join('')+'</select></div><div><label>শুরু (ঐচ্ছিক)</label><input id="nf" type="date" value="'+dts(P.from)+'"></div><div><label>শেষ (ঐচ্ছিক)</label><input id="nu" type="date" value="'+dts(P.until)+'"></div></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">বার্তা (৩০০ অক্ষর, শুধু লেখা)</label><textarea id="nb" rows="3" maxlength="300" style="width:100%">'+E(P.body)+'</textarea></div>'
   +'<div style="margin-top:10px"><label style="font-weight:700">কাদের জন্য?</label><div class="ad-inl"><label style="display:flex;gap:6px"><input type="checkbox" id="nall"'+(!P.classes.length?' checked':'')+'> সবাই</label>'+d.classes.map(function(c){return '<label style="display:flex;gap:6px"><input type="checkbox" class="ncb" value="'+E(c.id)+'"'+(P.classes.indexOf(c.id)>-1?' checked':'')+'> '+E(c.name)+'</label>';}).join('')+'</div></div>'
   +'<label style="font-weight:700;display:flex;gap:6px;margin-top:10px"><input type="checkbox" id="na"'+(P.active!==false?' checked':'')+'> চালু</label></div>'
   +'<div class="ad-inl"><button class="slb o" data-a="ns">💾 সেভ</button><button class="slb s" data-a="nx">← ফিরে যাও</button></div>';
   bindG(body);
   onClick(body,function(a){
    if(a==='nx'){NE=null;rr();return;}
    var o={id:P.id,title:v('nt').trim(),body:v('nb').trim(),level:v('nl'),from:v('nf')?new Date(v('nf')+'T00:00:00').getTime():0,until:v('nu')?new Date(v('nu')+'T23:59:59').getTime():0,active:document.getElementById('na').checked,classes:document.getElementById('nall').checked?[]:checked('ncb')};
    if(!o.title)return X.toast('❌ শিরোনাম লেখো');if(!o.body)return X.toast('❌ বার্তা লেখো');if(!LV[o.level])return;if(o.from&&o.until&&o.until<o.from)return X.toast('❌ শেষের তারিখ শুরুর আগে হতে পারে না');
    var k=d.announcements.map(function(x){return x.id;}).indexOf(o.id);if(k>-1)d.announcements[k]=o;else d.announcements.unshift(o);NE=null;chg();X.toast('✅ ঘোষণা ড্রাফটে সেভ হয়েছে');
   });return;
  }
  body.innerHTML=bar()+'<div class="sl-box"><div class="ad-inl" style="margin-bottom:8px"><button class="slb o" data-a="nn">➕ নতুন ঘোষণা</button></div>'
  +(d.announcements.length?d.announcements.map(function(a){var st=annState(a,now);return '<div class="ad-row"><div class="nm">'+E(LV[a.level]||'')+' '+E(a.title)+'<small>'+E(a.body.slice(0,90))+(a.body.length>90?'…':'')+' · '+(a.classes.length?a.classes.map(cName).map(E).join(', '):'সবাই')+(a.from?' · শুরু '+dstr(a.from):'')+(a.until?' · শেষ '+dstr(a.until):'')+'</small></div><span class="'+st[1]+'">'+st[0]+'</span><div class="ad-inl"><button class="slb s ad-sm" data-a="ne" data-i="'+E(a.id)+'">✏️</button><button class="slb s ad-sm" data-a="nt2" data-i="'+E(a.id)+'">চালু/বন্ধ</button><button class="slb r ad-sm" data-a="nd" data-i="'+E(a.id)+'">🗑️</button></div></div>';}).join(''):'<p style="color:var(--mut)">কোনো ঘোষণা নেই।</p>')+'</div>'
  +'<div class="sl-note">ℹ️ ঘোষণা শিক্ষার্থীর সাইটে ওপরে একটা স্ট্রিপে দেখায় (বন্ধ করার ✕ বাটন আছে)। এটা <b>পাবলিক</b> ঘোষণা, তাই ব্যক্তিগত তথ্য লিখো না। এখন ইমেইল/SMS/পুশ যায় না, আর "কে পড়ল" ট্র্যাকও নেই। এসব ব্যাকএন্ড (Phase 9) লাগবে। লাইভ করতে ওপরের বাটনে content.js নামিয়ে বসাও।</div>';
  bindG(body);
  onClick(body,function(a,k){
   if(a==='nn'){NE={id:uid('n'),title:'',body:'',level:'info',from:0,until:0,active:true,classes:[]};rr();}
   else if(a==='ne'){NE=clone(d.announcements.filter(function(x){return x.id===k;})[0]);rr();}
   else if(a==='nt2'){var x=d.announcements.filter(function(y){return y.id===k;})[0];x.active=x.active===false;chg();}
   else if(a==='nd'){if(!confirm('ঘোষণাটা মুছবে?'))return;d.announcements=d.announcements.filter(function(x){return x.id!==k;});chg();}
  });
 }
 /* ---------- ওয়েবসাইট সেটিংস ---------- */
 function vWeb(){
  var d=load(),S=d.site,body=X.body,ct=S.contact||{},bn=S.banner||{},mt=S.maintenance||{};
  body.innerHTML=bar()+'<div class="sl-box"><h2>🏷️ সাইটের পরিচয়</h2><div class="ad-f"><div><label>সাইটের নাম (৪০)</label><input id="wn" maxlength="40" value="'+E(S.name||'')+'" placeholder="ShikboLab"></div><div><label>ট্যাগলাইন (১২০)</label><input id="wt" maxlength="120" value="'+E(S.tagline||'')+'"></div></div></div>'
  +'<div class="sl-box"><h2>☎️ যোগাযোগ (সাইটের নিচে দেখাবে)</h2><div class="ad-f"><div><label>ফোন/WhatsApp</label><input id="wp" maxlength="20" value="'+E(ct.phone||'')+'" placeholder="01XXXXXXXXX"></div><div><label>ইমেইল</label><input id="we" maxlength="80" value="'+E(ct.email||'')+'"></div><div><label>ঠিকানা (১২০)</label><input id="wa" maxlength="120" value="'+E(ct.address||'')+'"></div></div><p style="color:var(--mut);margin:6px 0 0">ফাঁকা রাখলে কিছু দেখাবে না। আসল নম্বর/ইমেইল তুমি নিজে বসাও, আমি বানিয়ে দিইনি।</p></div>'
  +'<div class="sl-box"><h2>📢 সাইটজোড়া ব্যানার</h2><div class="ad-f"><div><label>লেখা (১৫০)</label><input id="bt" maxlength="150" value="'+E(bn.text||'')+'"></div><div><label>ধরন</label><select id="bl">'+Object.keys(LV).map(function(k){return '<option value="'+k+'"'+(bn.level===k?' selected':'')+'>'+LV[k]+'</option>';}).join('')+'</select></div></div><label style="font-weight:700;display:flex;gap:6px;margin-top:8px"><input type="checkbox" id="ba"'+(bn.on?' checked':'')+'> ব্যানার চালু</label></div>'
  +'<div class="sl-box"><h2>🛠️ মেইন্টেন্যান্স মোড</h2><div class="ad-f"><div><label>শিক্ষার্থীকে যা দেখাবে (২০০)</label><input id="mm" maxlength="200" value="'+E(mt.message||'')+'" placeholder="সাইটে কাজ চলছে, একটু পরে আসো 🙏"></div></div><label style="font-weight:700;display:flex;gap:6px;margin-top:8px"><input type="checkbox" id="mo"'+(mt.on?' checked':'')+'> মেইন্টেন্যান্স চালু</label><div class="sl-note">⚠️ এটা শুধু একটা পর্দা। সরাসরি লিংকে গেলে বা JavaScript বন্ধ করলে কেউ ঢুকতে পারবে। আসল তালা সার্ভার ছাড়া সম্ভব নয়। অ্যাডমিন পেজ এর আওতায় পড়ে না, আর <code>?preview=1</code> দিলে পর্দা সরে যায়।</div></div>'
  +'<div class="ad-inl"><button class="slb o" data-a="ws">💾 সেভ</button></div>';
  bindG(body);
  onClick(body,function(a){
   var o={name:v('wn').trim(),tagline:v('wt').trim(),contact:{phone:v('wp').trim(),email:v('we').trim(),address:v('wa').trim()},banner:{text:v('bt').trim(),level:v('bl'),on:document.getElementById('ba').checked},maintenance:{message:v('mm').trim(),on:document.getElementById('mo').checked}};
   if(o.contact.phone&&!/^[+0-9\-\s()]{6,20}$/.test(o.contact.phone))return X.toast('❌ ফোন নম্বর ঠিক নয়');
   if(o.contact.email&&!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(o.contact.email))return X.toast('❌ ইমেইল ঠিক নয়');
   if(o.banner.on&&!o.banner.text)return X.toast('❌ ব্যানার চালু করতে লেখা দাও');if(!LV[o.banner.level])o.banner.level='info';
   if(o.maintenance.on&&!o.maintenance.message)o.maintenance.message='সাইটে কাজ চলছে, একটু পরে আবার চেষ্টা করো।';
   if(o.maintenance.on&&!confirm('মেইন্টেন্যান্স পর্দা চালু করবে? content.js লাইভ করলে সব শিক্ষার্থী পর্দা দেখবে।'))return;
   d.site=o;chg();X.toast('✅ সেটিংস ড্রাফটে সেভ হয়েছে');
  });
 }
 window.ADC={
  view:function(name,ctx,sub){X=ctx;load();pre='';({cls:vCls,sbj:vSbj,chp:function(){vChp('');},sub:function(){vChp(sub);},les:vLes,lab:function(){vLab('');},bio:vBio,qb:vQb,qz:vQz,plans:vPlans,ntf:vNtf,web:vWeb,labsub:function(){vLab(sub);}})[name]();},
  changed:changed
 };
})();
