/* ShikboLab — ✏️ ছবি আঁকার ট্রিক (ধাপে ধাপে আঁকা)
   প্রতিটি ছবি একটার পর একটা ধাপে নিজে নিজে আঁকা হয়। ডেটা থাকে js/draw/bio-*.js ফাইলে। */
(function(){
 if(window.SLDRAW)return;
 var bn=function(n){return String(n).replace(/\d/g,function(d){return '০১২৩৪৫৬৭৮৯'.charAt(d);});};
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 function st(f,o){return ' class="k"'+(f?' fill="'+f+'" fill-opacity=".6"':' fill="none"')+(o?' '+o:'');}
 var H={
  E:function(cx,cy,rx,ry,f,o){return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'"'+st(f,o)+'/>';},
  C:function(cx,cy,r,f,o){return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"'+st(f,o)+'/>';},
  R:function(x,y,w,h,r,f,o){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(r||0)+'"'+st(f,o)+'/>';},
  L:function(x1,y1,x2,y2,o){return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" class="k" fill="none"'+(o?' '+o:'')+'/>';},
  P:function(d,f,o){return '<path d="'+d+'"'+st(f,o)+'/>';},
  A:function(x1,y1,x2,y2,o){var a=Math.atan2(y2-y1,x2-x1),s=9,f=function(v){return v.toFixed(1);};
   return '<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'M'+x2+' '+y2+'L'+f(x2-s*Math.cos(a-.45))+' '+f(y2-s*Math.sin(a-.45))+'M'+x2+' '+y2+'L'+f(x2-s*Math.cos(a+.45))+' '+f(y2-s*Math.sin(a+.45))+'" class="k" fill="none"'+(o?' '+o:'')+'/>';},
  T:function(x,y,t,an,sz,o){return '<text x="'+x+'" y="'+y+'" text-anchor="'+(an||'middle')+'" class="tx"'+(sz?' font-size="'+sz+'"':'')+(o?' '+o:'')+'>'+t+'</text>';},
  /* লেবেল: (x,y) বিন্দু থেকে রেখা টেনে (tx,ty) তে নাম */
  LB:function(x,y,t,tx,ty,an){an=an||(tx<x?'end':'start');var dx=an==='end'?-4:an==='start'?4:0,dy=an==='middle'?(ty<y?-4:13):4;
   return '<g class="lb"><line x1="'+x+'" y1="'+y+'" x2="'+tx+'" y2="'+ty+'"/><circle cx="'+x+'" cy="'+y+'" r="2.4"/><text x="'+(tx+dx)+'" y="'+(ty+dy)+'" text-anchor="'+an+'">'+t+'</text></g>';}
 };
 var CSS='.dg-in{color:#5b6b78;margin:4px 0 10px}.dg-chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 14px}'
 +'.dg-chip{border:2px solid #cfe3ea;background:#fff;border-radius:999px;padding:6px 14px;font:inherit;font-weight:700;cursor:pointer;color:#1f3a5f;transition:.2s}.dg-chip:hover{border-color:#2a9d8f}.dg-chip.on{background:#2a9d8f;color:#fff;border-color:#2a9d8f}'
 +'.dg-chip small{opacity:.75;font-weight:600;margin-left:4px}'
 +'.dg-stage{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:18px;align-items:start}@media(max-width:860px){.dg-stage{grid-template-columns:minmax(0,1fr)}}'
 +'.dg-fig{background:#fffdf6 linear-gradient(rgba(150,130,90,.09) 1px,transparent 1px) 0 0/100% 22px;border:2px dashed #e1d6bd;border-radius:16px;padding:8px}'
 +'.dg-fig svg{display:block;width:100%;height:auto}.dg-ctl{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;margin-top:8px}'
 +'.dg-ctl button{border:0;border-radius:12px;padding:9px 16px;font:inherit;font-weight:700;cursor:pointer;background:#1f3a5f;color:#fff}.dg-ctl button.go{background:linear-gradient(135deg,#2a9d8f,#3a6fd0)}.dg-ctl button:disabled{opacity:.4;cursor:default}.dg-ctl .cnt{font-weight:700;color:#1f3a5f;min-width:70px;text-align:center}'
 +'.dg-ref{font-weight:700;color:#1d7a6f;margin:0 0 6px}.dg-ref b{color:#1f3a5f}'
 +'.dg-steps{list-style:none;margin:0;padding:0;display:grid;gap:6px}.dg-steps li{display:flex;gap:10px;align-items:flex-start;border-radius:12px;padding:8px 10px;background:#f4f7f9;color:#8a98a4;cursor:pointer;transition:.25s;border:2px solid transparent}'
 +'.dg-steps li .n{flex:none;width:26px;height:26px;border-radius:50%;background:#dbe4ea;color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px}.dg-steps li.done{color:#1f3a5f;background:#eef8f5}.dg-steps li.done .n{background:#2a9d8f}'
 +'.dg-steps li.on{color:#1f3a5f;background:#fff7e3;border-color:#f0b429;font-weight:600}.dg-steps li.on .n{background:#f0b429}.dg-steps li .t{flex:1;line-height:1.5}.dg-steps li input{flex:none;width:20px;height:20px;margin-top:3px;accent-color:#2a9d8f;cursor:pointer}'
 +'.dg-trick{margin-top:12px;background:#fff4d6;border-left:5px solid #f0b429;border-radius:12px;padding:10px 14px;line-height:1.6}.dg-lab{margin-top:10px}.dg-lab b{color:#1f3a5f}.dg-lab span{display:inline-block;background:#eaf3ff;color:#1f3a5f;border-radius:999px;padding:3px 11px;margin:3px 4px 0 0;font-size:14.5px;font-weight:600}'
 +'.dg-real{margin:0 0 14px}.dg-realh{font-weight:700;color:#1f3a5f;margin-bottom:6px}.dg-realh small{font-weight:500;color:#7a8794}.dg-realg{display:flex;flex-wrap:wrap;gap:8px}.dg-realg figure{flex:1 1 280px;margin:0;background:#fff;border:2px solid #cfe3ea;border-radius:14px;padding:6px}.dg-realg figcaption{font-size:12px;color:#5b6b78;margin-top:4px;line-height:1.5}.dg-realg a{display:block}.dg-realg figcaption a{display:inline;color:#1d7a6f}.dg-realg img{display:block;width:100%;height:auto;max-height:420px;object-fit:contain;border-radius:8px}'
 +'.dg-done{margin-top:10px;font-weight:700;color:#1d7a6f}'
 +'.dg-svg .k{stroke:#1f3a5f;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}.dg-svg .tx{fill:#1f3a5f;font:700 13px "Hind Siliguri",sans-serif}'
 +'.dg-svg .lb line{stroke:#c0392b;stroke-width:1.3}.dg-svg .lb circle{fill:#c0392b}.dg-svg .lb text{fill:#7b241c;font:700 12.5px "Hind Siliguri",sans-serif}'
 +'.dg-svg .new{animation:dgfade .6s ease both}.dg-svg .new .k{stroke-dasharray:1;stroke-dashoffset:1;animation:dgdraw 1.3s ease forwards}'
 +'@keyframes dgdraw{to{stroke-dashoffset:0}}@keyframes dgfade{from{opacity:0}to{opacity:1}}'
 +'@media(prefers-reduced-motion:reduce){.dg-svg .new,.dg-svg .new .k{animation:none!important;stroke-dasharray:none!important;stroke-dashoffset:0!important}}';
 function inject(){if(document.getElementById('dg-css'))return;var s=document.createElement('style');s.id='dg-css';s.textContent=CSS;document.head.appendChild(s);}
 /* ছবির SVG (upto পর্যন্ত ধাপ) */
 function svg(d,upto,anim){var h='';for(var i=0;i<=upto&&i<d.steps.length;i++){var s=d.steps[i].s;h+='<g class="st'+(anim&&i===upto?' new':'')+'">'+(s.join?s.join(''):s)+'</g>';}
  return '<svg class="dg-svg" viewBox="0 0 480 340" role="img" aria-label="'+esc(d.title)+' ছবির আঁকা">'+h+'</svg>';}
 function getDone(key){try{return +(localStorage.getItem('sl_dw_'+key)||0);}catch(e){return 0;}}
 function setDone(key,v){try{localStorage.setItem('sl_dw_'+key,String(v));}catch(e){}}
 function mount(slug,list){
  inject();var box=document.getElementById('draw');if(!box)return;
  var cur=0,step=0,timer=null;
  box.innerHTML='<h3>✏️ ছবি আঁকার ট্রিক</h3><p class="dg-in">বইয়ের ছবিগুলো ধাপে ধাপে আঁকতে শেখো। <b>পরের ধাপ ▶</b> চাপো, আর খাতায় সাথে সাথে পেনসিলে আঁকো। আঁকা হয়ে গেলে ধাপের পাশের বাক্সে টিক দাও।</p>'
   +'<div class="dg-chips">'+list.map(function(d,i){return '<button class="dg-chip" data-i="'+i+'">'+d.title+(d.ref?'<small>'+d.ref+'</small>':'')+'</button>';}).join('')+'</div>'
   +'<div class="dg-real" id="dgreal"></div><div class="dg-stage"><div><div class="dg-fig" id="dgfig"></div><div class="dg-ctl"><button id="dgp">◀ আগের</button><span class="cnt" id="dgc"></span><button class="go" id="dgn">পরের ধাপ ▶</button><button id="dga">⏵ নিজে নিজে চলুক</button><button id="dgr">↺ আবার</button></div></div>'
   +'<div><div class="dg-ref" id="dgref"></div><ol class="dg-steps" id="dgs"></ol><div class="dg-done" id="dgd"></div><div class="dg-trick" id="dgt"></div><div class="dg-lab" id="dgl"></div></div></div>';
  var $=function(id){return document.getElementById(id);};
  function stop(){if(timer){clearInterval(timer);timer=null;$('dga').textContent='⏵ নিজে নিজে চলুক';}}
  function drawFig(anim){var d=list[cur];$('dgfig').innerHTML=svg(d,step,anim);var nw=$('dgfig').querySelectorAll('.new .k');[].forEach.call(nw,function(e){e.setAttribute('pathLength','1');});
   var g=$('dgfig').querySelector('.new');if(g)g.addEventListener('animationend',function(ev){if(ev.target===g)g.setAttribute('class','st');},{once:true});}
  function paint(anim){var d=list[cur],key=slug+'_'+d.id,mask=getDone(key),n=d.steps.length;
   [].forEach.call(box.querySelectorAll('.dg-chip'),function(b,i){b.classList.toggle('on',i===cur);});
   $('dgc').textContent='ধাপ '+bn(step+1)+' / '+bn(n);$('dgp').disabled=step===0;$('dgn').disabled=step===n-1;
   $('dgref').innerHTML=(d.ref?'📖 বই: <b>'+d.ref+'</b> — ':'')+'<b>'+d.title+'</b>';
   $('dgs').innerHTML=d.steps.map(function(s,i){return '<li data-i="'+i+'" class="'+(i===step?'on':i<step?'done':'')+'"><span class="n">'+bn(i+1)+'</span><span class="t">'+s.t+'</span><input type="checkbox" aria-label="ধাপ '+bn(i+1)+' আঁকা হয়েছে" data-c="'+i+'"'+((mask>>i)&1?' checked':'')+'></li>';}).join('');
   $('dgd').textContent=step===n-1?'🎉 ছবি শেষ! এবার বই বন্ধ করে নিজে একবার আঁকো।':'';
   $('dgt').innerHTML='💡 <b>মনে রাখার ট্রিক:</b> '+d.trick;
   $('dgl').innerHTML=d.labels&&d.labels.length?'<b>🏷️ পরীক্ষায় যা চিহ্নিত করতে হবে:</b><br>'+d.labels.map(function(l){return '<span>'+l+'</span>';}).join(''):'';
   var im=(H.IMG&&H.IMG[slug]&&H.IMG[slug][d.id])||[];
   $('dgreal').innerHTML=im.length?'<div class="dg-realh">🖼️ রেফারেন্স ছবি <small>(ছবিতে ট্যাপ করলে বড় হবে)</small></div><div class="dg-realg">'+im.map(function(o){if(typeof o==='string')o={f:o};var u='../img/bio/'+o.f;
     return '<figure><a href="'+u+'" target="_blank" rel="noopener"><img loading="lazy" src="'+u+'" alt="'+esc(d.title)+' — রেফারেন্স ছবি"></a>'+(o.l?'<figcaption>ছবি: '+esc(o.a||'অজানা')+' • <a href="'+esc(o.lu||o.u||'#')+'" target="_blank" rel="noopener">'+esc(o.l)+'</a> • <a href="'+esc(o.u||'#')+'" target="_blank" rel="noopener">উৎস</a></figcaption>':'')+'</figure>';}).join('')+'</div>':'';
   drawFig(anim);}
  function pick(i){stop();cur=i;step=0;paint(true);}
  box.querySelector('.dg-chips').onclick=function(e){var b=e.target.closest('.dg-chip');if(b)pick(+b.dataset.i);};
  $('dgn').onclick=function(){stop();if(step<list[cur].steps.length-1){step++;paint(true);}};
  $('dgp').onclick=function(){stop();if(step>0){step--;paint(false);}};
  $('dgr').onclick=function(){stop();step=0;paint(true);};
  $('dga').onclick=function(){if(timer){stop();return;}if(step>=list[cur].steps.length-1)step=0;paint(true);$('dga').textContent='⏸ থামাও';timer=setInterval(function(){if(step<list[cur].steps.length-1){step++;paint(true);}else stop();},2600);};
  $('dgs').onclick=function(e){var c=e.target.closest('input[data-c]');if(c){var d=list[cur],key=slug+'_'+d.id,m=getDone(key),b=1<<(+c.dataset.c);setDone(key,c.checked?(m|b):(m&~b));return;}
   var li=e.target.closest('li');if(li){stop();step=+li.dataset.i;paint(true);}};
  paint(true);
 }
 /* ---- সবার কাজের আকৃতি ---- */
 H.labs=function(a){return a.map(function(o){var r=o[3]!=='l';return H.LB(o[0],o[1],o[2],o[5]!==undefined?o[5]:(r?358:122),o[4],o[6]);}).join('');};
 H.mito=function(x,y,s){s=s||1;return H.E(x,y,26*s,14*s,'#f6c28b')+H.E(x,y,20*s,9*s,'#fde9cf','style="stroke-width:1.2"')+'<path class="k" fill="none" style="stroke-width:1.4" d="M'+(x-17*s)+' '+y+'q'+(4*s)+' '+(-8*s)+' '+(8*s)+' 0t'+(8*s)+' 0t'+(8*s)+' 0t'+(8*s)+' 0"/>';};
 H.chl=function(x,y,s){s=s||1;return H.E(x,y,26*s,15*s,'#9bd88a')+H.E(x-10*s,y,5*s,3*s,'#4f9d45','style="stroke-width:1"')+H.E(x,y,5*s,3*s,'#4f9d45','style="stroke-width:1"')+H.E(x+10*s,y,5*s,3*s,'#4f9d45','style="stroke-width:1"');};
 H.nuc=function(x,y,r){return H.C(x,y,r,'#e6cff2')+H.C(x-r*.18,y+r*.12,r*.3,'#b07cc6');};
 H.golgi=function(x,y,s){s=s||1;var o='';for(var i=0;i<4;i++){var w=(26-i*3)*s,yy=y+(i-1.5)*8*s;o+='<path class="k" fill="none" style="stroke-width:3" d="M'+(x-w)+' '+(yy+3*s)+'q'+w+' '+(-9*s)+' '+(2*w)+' 0"/>';}return o+H.C(x+30*s,y-12*s,3.5*s,'#f5a9b8')+H.C(x-30*s,y+14*s,3*s,'#f5a9b8');};
 H.tube=function(d,c,w){w=w||16;return H.P(d,null,'style="stroke-width:'+(w+5)+'"')+H.P(d,null,'style="stroke-width:'+w+';stroke:'+c+'"');};
 H.reg={};H.add=function(slug,list){H.reg[slug]=list;var go=function(){if(document.getElementById('draw'))mount(slug,list);};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();};
 window.SLDRAW=H;H.svg=svg;H.mount=mount;H.bn=bn;
})();
