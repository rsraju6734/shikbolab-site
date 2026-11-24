/* ShikboLab কুইজ রেন্ডারার: শিক্ষার্থীর পেজ ও অ্যাডমিন প্রিভিউ একই কোড। সব লেখা textContent দিয়ে বসে, কোনো HTML/JS চলে না। */
(function(){
 var TYPES={mcq:'বহুনির্বাচনি',tf:'সত্য/মিথ্যা',fill:'শূন্যস্থান',match:'মিলকরণ',image:'ছবি শনাক্ত',short:'সংক্ষিপ্ত উত্তর',concept:'ধারণামূলক'};
 var st=document.createElement('style');
 st.textContent='.qv{font-family:"Hind Siliguri",sans-serif;color:#22303c;max-width:820px;margin:0 auto;line-height:1.7;font-size:17px}.qv h1{color:#1f3a5f;font-size:clamp(24px,4vw,34px);margin:4px 0 6px}.qv .mt{color:#5b6b78;font-size:15px;margin-bottom:12px}.qv .q{background:#fff;border:1px solid #e3eaf0;border-radius:18px;padding:14px 18px;margin:14px 0;box-shadow:0 8px 20px rgba(31,58,95,.05)}.qv .q.ok{border-color:#2a9d8f}.qv .q.no{border-color:#e76f51}.qv .q .tg{display:inline-block;font-size:12.5px;font-weight:700;background:#eef3f9;color:#1f3a5f;border-radius:999px;padding:1px 10px;margin-right:6px}.qv .q b.t{display:block;margin:6px 0}.qv .q button.o{display:block;width:100%;text-align:left;margin:6px 0;padding:9px 14px;border-radius:12px;border:2px solid #e3eaf0;background:#fff;font:600 16px "Hind Siliguri",sans-serif;cursor:pointer}.qv .q button.o.sel{border-color:#3f6fd1;background:#eef3ff}.qv .q button.o.ok{background:#e1f5ee;border-color:#2a9d8f}.qv .q button.o.no{background:#fde7e1;border-color:#e76f51}.qv input.f,.qv textarea.f,.qv select{width:100%;border:2px solid #e3eaf0;border-radius:12px;padding:8px 12px;font:16px "Hind Siliguri",sans-serif;box-sizing:border-box;margin:4px 0}.qv .fb{margin-top:8px;font-size:15.5px;color:#444}.qv .btn{background:linear-gradient(135deg,#3f6fd1,#2a9d8f);color:#fff;border:0;border-radius:999px;padding:11px 26px;font:700 17px "Hind Siliguri",sans-serif;cursor:pointer;margin:8px 8px 8px 0}.qv .res{background:#e1f5ee;border-radius:16px;padding:12px 18px;font-weight:700;margin:10px 0}.qv .res.bad{background:#fde7e1}.qv img{max-width:100%;border-radius:12px;border:1px solid #e3eaf0}.qv .tm{position:sticky;top:0;background:#fff3d6;border-radius:999px;padding:4px 14px;display:inline-block;font-weight:700;z-index:5}.qv .mr{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;margin:4px 0}';
 document.head.appendChild(st);
 function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
 function norm(s){return String(s==null?'':s).replace(/[০-৯]/g,function(c){return '০১২৩৪৫৬৭৮৯'.indexOf(c);}).trim().toLowerCase().replace(/\s+/g,' ');}
 function okImg(u){u=String(u||'').trim();return /^https:\/\/[^\s"'<>]+$/.test(u)||/^[\w\-\/.]+\.(png|jpe?g|gif|webp|svg)$/i.test(u);}
 function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
 function validate(q){
  if(!q||typeof q!=='object')return 'প্রশ্ন ঠিক নয়';
  if(!TYPES[q.type])return 'প্রশ্নের ধরন ঠিক নয়';
  if(!String(q.q||'').trim())return 'প্রশ্ন লেখো';
  if(!(+q.marks>0))return 'নম্বর ০ এর বেশি হতে হবে';
  var t=q.type,o=(q.opts||[]);
  if(t==='mcq'||t==='image'){if(o.filter(function(x){return String(x||'').trim();}).length<2)return 'কমপক্ষে ২টা অপশন লাগবে';if(!String(o[+q.ans]||'').trim())return 'সঠিক উত্তরের অপশন ফাঁকা';if(t==='image'&&!okImg(q.image))return 'ছবির ঠিকানা ঠিক নয় (https:// বা ফোল্ডারের ছবি)';}
  else if(t==='tf'){if(+q.ans!==0&&+q.ans!==1)return 'সত্য/মিথ্যা বাছো';}
  else if(t==='fill'){if(!(q.answers||[]).filter(function(x){return String(x).trim();}).length)return 'কমপক্ষে একটা সঠিক উত্তর লাগবে';}
  else if(t==='match'){var p=(q.pairs||[]).filter(function(x){return x&&String(x[0]||'').trim()&&String(x[1]||'').trim();});if(p.length<2)return 'কমপক্ষে ২টা জোড়া লাগবে';}
  else{if(!String(q.answer||'').trim())return 'আদর্শ উত্তর লেখো';}
  return '';
 }
 function mk(q){
  var box=el('div','q'),h=el('div');h.appendChild(el('span','tg',TYPES[q.type]));if(q.difficulty)h.appendChild(el('span','tg',q.difficulty));h.appendChild(el('span','tg',(q.marks||1)+' নম্বর'));box.appendChild(h);
  box.appendChild(el('b','t',q.q));
  if(q.type==='image'&&okImg(q.image)){var im=el('img');im.src=String(q.image).trim();im.alt='প্রশ্নের ছবি';im.loading='lazy';box.appendChild(im);}
  var sel=-1,btns=[],inp=null,sels=[],R=[],fb=el('div','fb'),opts=q.opts||[];
  if(q.type==='mcq'||q.type==='image'||q.type==='tf'){
   var L=q.type==='tf'?['সত্য','মিথ্যা']:opts;
   L.forEach(function(o,k){if(!String(o||'').trim())return;var b=el('button','o',o);b.type='button';b.onclick=function(){if(box.getAttribute('data-done'))return;sel=k;btns.forEach(function(x){x.b.className='o';});b.className='o sel';};btns.push({b:b,k:k});box.appendChild(b);});
  }else if(q.type==='fill'){inp=el('input','f');inp.placeholder='উত্তর লেখো';box.appendChild(inp);}
  else if(q.type==='match'){var P=(q.pairs||[]).filter(function(x){return x&&x[0]&&x[1];}),rs=shuf(P.map(function(x){return x[1];}));
   P.forEach(function(x){var r=el('div','mr');r.appendChild(el('span',null,x[0]));var s=document.createElement('select');var d0=el('option',null,'— বাছো —');d0.value='';s.appendChild(d0);rs.forEach(function(y){var o=el('option',null,y);o.value=y;s.appendChild(o);});r.appendChild(s);box.appendChild(r);sels.push({s:s,a:x[1]});});}
  else{inp=el('textarea','f');inp.rows=3;inp.placeholder='নিজের ভাষায় লেখো';box.appendChild(inp);}
  box.appendChild(fb);
  function correctText(){
   if(q.type==='tf')return +q.ans===0?'সত্য':'মিথ্যা';
   if(q.type==='mcq'||q.type==='image')return opts[+q.ans]||'';
   if(q.type==='fill')return (q.answers||[]).join(' / ');
   if(q.type==='match')return (q.pairs||[]).map(function(x){return x[0]+' → '+x[1];}).join('; ');
   return q.answer||'';
  }
  return {node:box,marks:+q.marks||1,graded:q.type!=='short'&&q.type!=='concept',
   grade:function(){
    if(q.type==='mcq'||q.type==='image'||q.type==='tf')return sel===+q.ans;
    if(q.type==='fill')return (q.answers||[]).map(norm).indexOf(norm(inp.value))>-1&&norm(inp.value)!=='';
    if(q.type==='match')return sels.length>0&&sels.every(function(x){return x.s.value===x.a;});
    return null;},
   reveal:function(ok){
    box.setAttribute('data-done','1');if(ok===true)box.className='q ok';else if(ok===false)box.className='q no';
    if(q.type==='mcq'||q.type==='image'||q.type==='tf'){btns.forEach(function(x){if(x.k===+q.ans)x.b.className='o ok';else if(x.k===sel)x.b.className='o no';});}
    if(inp)inp.disabled=true;sels.forEach(function(x){x.s.disabled=true;});
    fb.textContent=(ok===true?'✅ ঠিক। ':ok===false?'❌ ভুল। ':'📝 নিজে মিলিয়ে দেখো। ')+((ok===true&&q.type!=='short'&&q.type!=='concept')?'':'সঠিক উত্তর: '+correctText()+'। ')+(q.exp||'');
   }};
 }
 var SLQuiz={TYPES:TYPES,validate:validate,norm:norm,okImg:okImg,
  preview:function(q,box){box.innerHTML='';var w=el('div','qv'),m=mk(q);w.appendChild(m.node);var b=el('button','btn','উত্তর দেখাও');b.type='button';b.onclick=function(){m.reveal(m.grade());};w.appendChild(b);box.appendChild(w);},
  render:function(Z,C,box){
   box.innerHTML='';var w=el('div','qv'),QS={};(C.questions||[]).forEach(function(q){QS[q.id]=q;});
   var list=(Z.qids||[]).map(function(id){return QS[id];}).filter(Boolean);if(Z.shuffle)list=shuf(list);
   w.appendChild(el('h1',null,Z.title||'(নাম নেই)'));
   var tot=list.reduce(function(a,q){return a+((q.type==='short'||q.type==='concept')?0:(+q.marks||1));},0);
   var best=null;try{best=localStorage.getItem('sl_quiz_'+Z.id);}catch(e){}
   w.appendChild(el('div','mt',list.length+'টি প্রশ্ন · স্বয়ংক্রিয় নম্বর '+tot+' · পাস '+(Z.pass||0)+'%'+(Z.time?' · সময় '+Z.time+' মিনিট':'')+(best?' · তোমার সেরা: '+best+'%':'')));
   if(!list.length){w.appendChild(el('p',null,'এই কুইজে এখনও প্রশ্ন নেই।'));box.appendChild(w);return;}
   var tmEl=null,left=(+Z.time||0)*60,timer=null;if(left){tmEl=el('span','tm','⏱ '+Math.floor(left/60)+':'+('0'+left%60).slice(-2));w.appendChild(tmEl);}
   var items=list.map(function(q){var m=mk(q);w.appendChild(m.node);return m;});
   var res=el('div'),done=false;
   var b=el('button','btn','✅ জমা দাও');b.type='button';
   function submit(){if(done)return;done=true;clearInterval(timer);var got=0;
    items.forEach(function(m){var g=m.grade();if(g===true)got+=m.marks;m.reveal(m.graded?!!g:null);});
    var pc=tot?Math.round(got*100/tot):0,ok=pc>=(+Z.pass||0);
    res.className='res'+(ok?'':' bad');res.textContent=(ok?'🎉 পাস! ':'আবার চেষ্টা করো। ')+'স্কোর: '+got+' / '+tot+' ('+pc+'%)';
    try{var o=+(localStorage.getItem('sl_quiz_'+Z.id)||0);if(pc>o)localStorage.setItem('sl_quiz_'+Z.id,String(pc));}catch(e){}
    b.disabled=true;}
   b.onclick=submit;w.appendChild(b);w.appendChild(res);
   if(left){timer=setInterval(function(){if(!box.isConnected){clearInterval(timer);return;}left--;if(tmEl)tmEl.textContent='⏱ '+Math.floor(Math.max(0,left)/60)+':'+('0'+Math.max(0,left)%60).slice(-2);if(left<=0)submit();},1000);}
   box.appendChild(w);
  }};
 window.SLQuiz=SLQuiz;
})();
