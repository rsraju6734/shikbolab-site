/* ShikboLab: এনক্রিপ্ট করা পেইড অধ্যায় খোলার কোড।
   পেজের আসল লেখা এনক্রিপ্ট করা থাকে। সার্ভার যাচাই করে প্ল্যান ঠিক থাকলে চাবি দেয়, তারপর এখানে খুলে পেজ দেখানো হয়। */
(function(){
 var file=decodeURIComponent(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
 var box=document.getElementById('sl-payload');
 if(!box)return;
 var payload=(box.textContent||'').trim();
 function b64(s){var bin=atob(s),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
 function say(html){var s=document.getElementById('sl-st');if(s)s.innerHTML=html;}
 function open(keyB64){
  if(!window.crypto||!crypto.subtle)throw new Error('nocrypto');
  var raw=b64(payload);
  return crypto.subtle.importKey('raw',b64(keyB64),{name:'AES-GCM'},false,['decrypt']).then(function(k){
   return crypto.subtle.decrypt({name:'AES-GCM',iv:raw.slice(0,12)},k,raw.slice(12));
  }).then(function(buf){
   var html=new TextDecoder('utf-8').decode(buf);
   /* খোলস থেকে আসল পেজে যাওয়ার আগে পুরনো SL মুছি, যাতে আসল পেজের demo-saas.js নতুন করে চালু হয় */
   try{delete window.SL;}catch(e){window.SL=undefined;}
   window.SL_SHELL=0;
   document.open();document.write(html);document.close();
  });
 }
 function deny(r){
  var why=(r&&r.why)||'',msg=(r&&r.err)||'এই অধ্যায় খোলা যায়নি।',btn;
  if(why==='noacc'||why==='dev')btn='<a class="slb o" href="../account.html#login">লগইন</a><a class="slb s" href="../plans.html">💳 প্ল্যান দেখো</a>';
  else if(why==='band'||why==='subj'||why==='trial'||why==='expired')btn='<a class="slb o" href="../account.html#pay">💳 প্ল্যান নাও / যোগ করো</a><a class="slb s" href="../plans.html">প্ল্যান দেখো</a>';
  else btn='<a class="slb s" href="../account.html">অ্যাকাউন্ট দেখো</a>';
  var g=document.createElement('div');g.className='sl-gate';
  g.innerHTML='<div class="card"><span class="lk">🔒</span><h2>এই অধ্যায়টি প্ল্যানের অন্তর্ভুক্ত</h2><p></p><div class="row">'+btn+'</div><p style="margin:16px 0 0"><a href="../index.html" style="color:#1f3a5f;font-weight:600">← সব অধ্যায়</a></p></div>';
  g.querySelector('p').textContent=msg;
  document.body.appendChild(g);say('');
 }
 function fromServer(){
  if(!window.SL||!SL.unlockKey){say('⚠️ পেজ ঠিকমতো লোড হয়নি। রিলোড করো।');return;}
  SL.unlockKey(file).then(function(r){
   if(!r||!r.ok){if(r&&r.net){say('⚠️ '+(r.err||'ইন্টারনেটে সমস্যা')+' <a href="">আবার চেষ্টা</a>');return;}return deny(r);}
   try{sessionStorage.setItem('sl_ck_'+file,JSON.stringify({k:r.key,t:Date.now()}));}catch(e){}
   open(r.key).catch(function(){say('⚠️ অধ্যায় খুলতে সমস্যা হয়েছে। ব্রাউজার আপডেট করে আবার চেষ্টা করো।');});
  });
 }
 var c=null;try{c=JSON.parse(sessionStorage.getItem('sl_ck_'+file)||'null');}catch(e){}
 if(c&&c.k&&Date.now()-c.t<20*60*1000){open(c.k).catch(function(){try{sessionStorage.removeItem('sl_ck_'+file);}catch(e){}fromServer();});}
 else fromServer();
})();
