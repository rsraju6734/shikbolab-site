/* ShikboLab লেসন রেন্ডারার: শিক্ষার্থীর পেজ ও অ্যাডমিন প্রিভিউ একই কোড ব্যবহার করে।
   নিরাপত্তা: সব লেখা textContent দিয়ে বসে, কোনো HTML/JavaScript চলে না। */
(function(){
 var st=document.createElement('style');
 st.textContent='.lv{font-family:"Hind Siliguri",sans-serif;color:#22303c;max-width:820px;margin:0 auto;line-height:1.8;font-size:17.5px}.lv h1{color:#1f3a5f;font-size:clamp(26px,4vw,38px);line-height:1.25;margin:4px 0 8px}.lv h2{color:#1f3a5f;font-size:22px;margin:26px 0 6px}.lv .mt{color:#5b6b78;font-size:15px;margin-bottom:14px}.lv .ob{background:#e1f5ee;border-radius:16px;padding:12px 18px;margin:14px 0}.lv .ob b{color:#16705f}.lv .in{background:#f3f8fc;border-left:5px solid #3f6fd1;border-radius:12px;padding:10px 16px;margin:12px 0}.lv img{max-width:100%;height:auto;border-radius:14px;border:1px solid #e3eaf0}.lv figure{margin:14px 0;text-align:center}.lv figcaption{color:#5b6b78;font-size:14.5px}.lv .vd{position:relative;padding-top:56.25%;border-radius:14px;overflow:hidden;margin:14px 0;background:#000}.lv .vd iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.lv .ac{display:inline-block;background:linear-gradient(135deg,#e76f51,#e9a23b);color:#fff;font-weight:700;padding:11px 22px;border-radius:999px;text-decoration:none;margin:10px 0}.lv .bad{color:#b5391f}';
 st.textContent+='.lv .qz{background:#fff;border:1px solid #e3eaf0;border-radius:16px;padding:12px 16px;margin:12px 0}.lv .qz button{display:block;width:100%;text-align:left;margin:6px 0;padding:9px 14px;border-radius:12px;border:2px solid #e3eaf0;background:#fff;font:600 16px \'Hind Siliguri\',sans-serif;cursor:pointer}.lv .qz button.ok{background:#e1f5ee;border-color:#2a9d8f}.lv .qz button.no{background:#fde7e1;border-color:#e76f51}.lv .qz .ex{color:#5b6b78;font-size:15px;margin-top:6px}.lv table.tm{border-collapse:collapse;width:100%;margin:10px 0}.lv table.tm td,.lv table.tm th{border:1px solid #e3eaf0;padding:7px 12px;text-align:left}.lv table.tm th{background:#1f3a5f;color:#fff}.lv textarea{width:100%;border:2px solid #e3eaf0;border-radius:12px;padding:8px;font:16px \'Hind Siliguri\',sans-serif}.lv .bg{display:inline-block;padding:2px 12px;border-radius:999px;font-size:13.5px;font-weight:700;background:#e1f5ee;color:#16705f;margin-right:6px}.lv .bg.p{background:#fff1d6;color:#9a6a12}';
 document.head.appendChild(st);
 function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
 function inl(p,t){String(t).split(/(\*\*[^*]+\*\*)/).forEach(function(s){if(/^\*\*[^*]+\*\*$/.test(s))p.appendChild(el('b',null,s.slice(2,-2)));else if(s)p.appendChild(document.createTextNode(s));});}
 function text(box,body){String(body||'').split(/\n\s*\n/).forEach(function(par){var ls=par.split('\n').filter(function(l){return l.trim();});if(!ls.length)return;
  if(ls.every(function(l){return /^\s*[-•]\s+/.test(l);})){var u=el('ul');ls.forEach(function(l){var li=el('li');inl(li,l.replace(/^\s*[-•]\s+/,''));u.appendChild(li);});box.appendChild(u);}
  else{var p=el('p');ls.forEach(function(l,i){if(i)p.appendChild(el('br'));inl(p,l);});box.appendChild(p);}});}
 function okImg(u){u=String(u||'').trim();return /^https:\/\/[^\s"'<>]+$/.test(u)||/^[\w\-\/.]+\.(png|jpe?g|gif|webp|svg)$/i.test(u);}
 function ytId(u){var m=String(u||'').match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);return m?m[1]:null;}
 function fig(box,u,cap){if(!okImg(u)){box.appendChild(el('p','bad','⚠️ ছবির ঠিকানা গ্রহণযোগ্য নয় (শুধু https:// বা ফোল্ডারের ছবি)।'));return;}
  var f=el('figure'),i=el('img');i.src=u.trim();i.alt=cap||'';i.loading='lazy';f.appendChild(i);if(cap)f.appendChild(el('figcaption',null,cap));box.appendChild(f);}
 function baseList(){return window.CHAPTERS_BASE||window.CHAPTERS||[];}
 function chFile(c){return String(c.file||'').split('/').pop().replace(/\.html.*$/,'');}
 window.SLLesson={
  okImg:okImg,
  render:function(L,C,box){
   box.innerHTML='';var w=el('div','lv'),S={};(C.subjects||[]).forEach(function(s){S[s.k]=s.name;});
   w.appendChild(el('h1',null,L.title||'(নাম নেই)'));
   var ch=null;baseList().forEach(function(c){if(chFile(c)===L.chapter)ch=c;});
   w.appendChild(el('div','mt',(S[L.subject]||'')+(ch?' · '+ch.title:'')+(L.difficulty?' · কঠিনতা: '+L.difficulty:'')));
   var meta=(C.chapters||{})[L.chapter]||{};
   if(meta.intro){var i=el('div','in');text(i,meta.intro);w.appendChild(i);}
   var ob=(meta.objectives||[]).concat(L.objectives||[]).filter(Boolean);
   if(ob.length){var d=el('div','ob');d.appendChild(el('b',null,'🎯 এই লেসনে যা শিখবে'));var u=el('ul');ob.forEach(function(x){u.appendChild(el('li',null,x));});d.appendChild(u);w.appendChild(d);}
   (L.sections||[]).forEach(function(s){
    if(s.h)w.appendChild(el('h2',null,s.h));
    if(s.type==='image')fig(w,s.url,s.body);
    else if(s.type==='video'){var id=ytId(s.url);if(!id)w.appendChild(el('p','bad','⚠️ শুধু YouTube লিংক চলবে।'));else{var v=el('div','vd'),f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+id;f.title=s.h||'ভিডিও';f.setAttribute('allowfullscreen','');f.setAttribute('loading','lazy');v.appendChild(f);w.appendChild(v);if(s.body)w.appendChild(el('p',null,s.body));}}
    else if(s.type==='activity'){var t=null;baseList().forEach(function(c){if(chFile(c)===s.url)t=c;});
     if(!t)w.appendChild(el('p','bad','⚠️ ল্যাবটি পাওয়া যায়নি।'));else{if(s.body){var p=el('p');inl(p,s.body);w.appendChild(p);}var a=el('a','ac','🧪 ল্যাব খোলো: '+t.title);a.href=t.file;w.appendChild(a);}}
    else text(w,s.body);
   });
   (meta.images||[]).forEach(function(x){var a=String(x).split('|');fig(w,a[0],(a[1]||'').trim());});
   box.appendChild(w);
  }
 };

 function okLink(u){u=String(u||'').trim();return /^https:\/\/[^\s"'<>]+$/.test(u)||/^[\w\-\/.]+\.(html|png|jpe?g|gif|webp|svg|glb|mp4)$/i.test(u);}
 window.SLLesson.renderLab=function(L,C,box){
  box.innerHTML='';var w=el('div','lv'),S={};(C.subjects||[]).forEach(function(s){S[s.k]=s.name;});
  w.appendChild(el('h1',null,L.title||'(নাম নেই)'));
  var m=el('div','mt');m.appendChild(el('span','bg',(S[L.subject]||'')));m.appendChild(el('span','bg'+(L.access==='premium'?' p':''),L.access==='premium'?'💳 প্রিমিয়াম':'🎁 ফ্রি'));m.appendChild(document.createTextNode('কঠিনতা: '+(L.difficulty||'—')));w.appendChild(m);
  var meta=(C.chapters||{})[L.chapter]||{};
  if(meta.intro){var i=el('div','in');text(i,meta.intro);w.appendChild(i);}
  var ob=(L.objectives||[]).filter(Boolean);if(ob.length){var d=el('div','ob');d.appendChild(el('b',null,'🎯 এই ল্যাবে যা শিখবে'));var u=el('ul');ob.forEach(function(x){u.appendChild(el('li',null,x));});d.appendChild(u);w.appendChild(d);}
  var ch=null;baseList().forEach(function(c){if(chFile(c)===L.chapter)ch=c;});
  if(L.instructions){w.appendChild(el('h2',null,'📋 নির্দেশনা'));text(w,L.instructions);}
  if(ch){var a=el('a','ac','🧪 সিমুলেশন খোলো');a.href=ch.file;w.appendChild(a);}
  var tm=(meta.terms||[]).map(function(x){return String(x).split('|');}).filter(function(a){return a.length>1;});
  if(tm.length){w.appendChild(el('h2',null,'🔤 বৈজ্ঞানিক শব্দ'));var t=el('table','tm'),tr=el('tr');tr.appendChild(el('th',null,'English'));tr.appendChild(el('th',null,'বাংলা'));t.appendChild(tr);tm.forEach(function(a){var r=el('tr');r.appendChild(el('td',null,a[0].trim()));r.appendChild(el('td',null,a.slice(1).join('|').trim()));t.appendChild(r);});w.appendChild(t);}
  (meta.images||[]).forEach(function(x){var a=String(x).split('|');fig(w,a[0],(a[1]||'').trim());});
  var md=(meta.media||[]).map(function(x){return String(x).split('|').map(function(y){return y.trim();});}).filter(function(a){return a.length>1;});
  if(md.length){w.appendChild(el('h2',null,'🎞️ মডেল ও অ্যানিমেশন'));var IC={'2d':'🖼️ ২ডি','3d':'🧊 ৩ডি','animation':'🎬 অ্যানিমেশন','video':'📹 ভিডিও','diagram':'🗺️ ডায়াগ্রাম'};md.forEach(function(a){if(!okLink(a[1])){w.appendChild(el('p','bad','⚠️ লিংক গ্রহণযোগ্য নয়'));return;}var p=el('p'),l=el('a',null,(IC[a[0]]||'🔗')+' '+(a[2]||a[1]));l.href=a[1];l.target='_blank';l.rel='noopener';p.appendChild(l);w.appendChild(p);});}
  var ob2=(L.observations||[]).filter(Boolean);
  if(ob2.length){w.appendChild(el('h2',null,'🔎 পর্যবেক্ষণ প্রশ্ন'));ob2.forEach(function(q,n){var b=el('div','in');b.appendChild(el('b',null,(n+1)+'. '+q));var t=el('textarea');t.rows=2;t.placeholder='তোমার উত্তর (শুধু তোমার স্ক্রিনে থাকে, সেভ হয় না)';b.appendChild(t);w.appendChild(b);});}
  var Q=(L.quiz||[]).filter(function(q){return q&&q.q&&(q.opts||[]).filter(Boolean).length>1;});
  if(Q.length){w.appendChild(el('h2',null,'🏆 মিনি কুইজ'));var sc=0,dn=0,res=el('p',null,'');
   Q.forEach(function(q,n){var b=el('div','qz'),done=false;b.appendChild(el('b',null,(n+1)+'. '+q.q));var ex=el('div','ex');
    (q.opts||[]).forEach(function(o,k){if(!o)return;var bt=el('button',null,o);bt.type='button';bt.onclick=function(){if(done)return;done=true;dn++;var right=k===+q.ans;if(right)sc++;bt.className=right?'ok':'no';if(!right){var bs=b.querySelectorAll('button');if(bs[+q.ans])bs[+q.ans].className='ok';}ex.textContent=(right?'✅ ঠিক। ':'❌ ভুল। ')+(q.exp||'');res.textContent='স্কোর: '+sc+' / '+dn+' (মোট '+Q.length+'টি)';};b.appendChild(bt);});
    b.appendChild(ex);w.appendChild(b);});w.appendChild(res);}
  box.appendChild(w);
 };
})();
