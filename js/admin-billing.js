/* ShikboLab অ্যাডমিন: পেমেন্ট ম্যানেজমেন্ট (Phase 7, ডেমো মোড)
   ⚠️ এখানকার "নিশ্চিত" মানে অ্যাডমিন হাতে মিলিয়ে নিশ্চিত করেছে। কোনো পেমেন্ট প্রোভাইডার দিয়ে সার্ভারে যাচাই হয়নি।
   কার্ডের তথ্য এখানে কখনো নেওয়া বা রাখা হয় না। */
(function(){
 var X=null,f={q:'',s:'',p:'',a:'',b:''};
 var ST={pending:['🔔 অপেক্ষমাণ','bdg t'],confirmed:['✅ ম্যানুয়ালি নিশ্চিত','bdg'],failed:['❌ ব্যর্থ/বাতিল','bdg x'],refunded:['↩️ রিফান্ড','bdg s']};
 function E(s){return X.esc(s);}
 function rr(){X.rerender();}
 function v(id){var e=document.getElementById(id);return e?e.value:'';}
 function csvCell(x){x=String(x==null?'':x);if(/^[=+\-@\t\r]/.test(x))x="'"+x;return '"'+x.replace(/"/g,'""')+'"';}
 function rows(){
  var R=[];
  X.list().forEach(function(a){
   (a.pays||[]).forEach(function(p,i){R.push({a:a,k:'pay',i:i,t:p.t,plan:p.plan,period:p.period,price:+p.price||0,trx:p.trx||'',method:p.method||'',st:p.refund?'refunded':'confirmed',refund:p.refund||null,src:p.req?'অনুরোধ থেকে':(p.period==='manual'?'হাতে এন্ট্রি':'ডেমো পেমেন্ট')});});
   (a.reqs||[]).forEach(function(r){if(r.status==='approved')return;R.push({a:a,k:'req',id:r.id,t:r.t||r.created||0,plan:r.plan,period:r.period,price:+r.price||0,trx:r.trx||'',method:r.method||'',st:r.status==='rejected'?'failed':'pending',src:'গ্রাহকের অনুরোধ'});});
  });
  R.sort(function(a,b){return (b.t||0)-(a.t||0);});return R;
 }
 function pname(k){var p=X.cfg.PLANS[k];return p?p.name:k;}
 function vPm(){
  var body=X.body,all=rows(),q=(f.q||'').toLowerCase(),from=f.a?new Date(f.a+'T00:00:00').getTime():0,to=f.b?new Date(f.b+'T23:59:59').getTime():0;
  var R=all.filter(function(r){return (!q||(r.a.name+' '+(r.a.school||'')+' '+r.a.email+' '+r.trx).toLowerCase().indexOf(q)>-1)&&(!f.s||r.st===f.s)&&(!f.p||r.plan===f.p)&&(!from||(r.t>=from))&&(!to||(r.t<=to));});
  var conf=all.filter(function(r){return r.st==='confirmed';}),rev=conf.reduce(function(s,r){return s+r.price;},0),ref=all.filter(function(r){return r.st==='refunded';}).reduce(function(s,r){return s+r.price;},0),pend=all.filter(function(r){return r.st==='pending';}).length;
  var now=new Date(),mo=conf.filter(function(r){var d=new Date(r.t);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce(function(s,r){return s+r.price;},0);
  var pv=window.SLPay?SLPay.info():{name:'ম্যানুয়াল',serverVerified:false};
  var h='<div class="ad-cards">'+(all.length?'<div><small>💰 রেকর্ড করা আয়</small><b>'+X.money(rev)+'</b><em>সার্ভার-যাচাই নয়</em></div><div><small>📅 এই মাসের রেকর্ড</small><b>'+X.money(mo)+'</b></div><div><small>↩️ রিফান্ড</small><b>'+X.money(ref)+'</b></div>':'<div class="off"><small>💰 আয়</small><b>—</b><em>এখনও কোনো পেমেন্ট রেকর্ড নেই</em></div>')+'<div><small>🔔 অপেক্ষমাণ</small><b>'+X.bn(pend)+'</b></div><div><small>🧾 মোট এন্ট্রি</small><b>'+X.bn(all.length)+'</b></div></div>'
  +'<div class="sl-note">🔐 <b>পেমেন্ট পদ্ধতি:</b> '+E(pv.name)+' · সার্ভার-যাচাই: <b>'+(pv.serverVerified?'আছে':'নেই')+'</b>। "ম্যানুয়ালি নিশ্চিত" মানে তুমি bKash/Nagad এ টাকা এসেছে দেখে নিশ্চিত করেছ। কোনো গেটওয়ে জোড়া নেই, কার্ডের তথ্য নেওয়া হয় না।</div>'
  +'<div class="sl-box"><h2>🧾 পেমেন্ট ইতিহাস</h2><div class="ad-fil"><input id="fq" placeholder="🔍 গ্রাহক/ইমেইল/TrxID" value="'+E(f.q)+'" style="flex:1;min-width:150px"><select id="fs"><option value="">সব স্ট্যাটাস</option>'+Object.keys(ST).map(function(k){return '<option value="'+k+'"'+(f.s===k?' selected':'')+'>'+ST[k][0]+'</option>';}).join('')+'</select><select id="fp"><option value="">সব প্ল্যান</option>'+Object.keys(X.cfg.PLANS).map(function(k){return '<option value="'+k+'"'+(f.p===k?' selected':'')+'>'+E(pname(k))+'</option>';}).join('')+'</select><input id="fa" type="date" value="'+E(f.a)+'" title="থেকে"><input id="fb" type="date" value="'+E(f.b)+'" title="পর্যন্ত"><button class="slb s ad-sm" data-a="ex">⬇️ CSV</button></div>'
  +(R.length?'<div class="sl-scroll"><table class="sl-tbl"><tr><th>তারিখ</th><th>গ্রাহক</th><th>প্ল্যান</th><th>টাকা</th><th>TrxID</th><th>স্ট্যাটাস</th><th>কাজ</th></tr>'+R.map(function(r,n){return '<tr><td>'+X.fd(r.t)+'</td><td>'+E(r.a.school||r.a.name)+'<br><small style="color:var(--mut)">'+E(r.src)+'</small></td><td>'+E(pname(r.plan))+'<br><small style="color:var(--mut)">'+(r.period==='week'?'সাপ্তাহিক':r.period==='month'?'মাসিক':E(r.period||''))+'</small></td><td>'+X.money(r.price)+'</td><td>'+E(r.trx)+'</td><td><span class="'+ST[r.st][1]+'">'+ST[r.st][0]+'</span>'+(r.refund?'<br><small style="color:var(--mut)">'+X.fd(r.refund.t)+(r.refund.reason?' · '+E(r.refund.reason):'')+'</small>':'')+'</td><td>'
   +(r.st==='pending'?'<button class="slb o ad-sm" data-a="ap" data-i="'+n+'">✅</button> <button class="slb r ad-sm" data-a="rj" data-i="'+n+'">❌</button>':r.st==='confirmed'?'<button class="slb s ad-sm" data-a="rf" data-i="'+n+'">↩️ রিফান্ড</button>':'—')+'</td></tr>';}).join('')+'</table></div>':'<p style="color:var(--mut)">'+(all.length?'কিছু পাওয়া যায়নি।':'এখনও কোনো পেমেন্ট নেই।')+'</p>')+'</div>'
  +'<div class="sl-note">ℹ️ অপেক্ষমাণ অনুরোধ ✅ করলে গ্রাহকের মেয়াদ বাড়ে। ↩️ রিফান্ড শুধু রেকর্ডে চিহ্নিত করে, আসল টাকা তুমি নিজে bKash/Nagad এ ফেরত দেবে। রিফান্ডে মেয়াদও বাতিল করার অপশন আসে।</div>';
  body.innerHTML=h;
  function rf(i){var n=document.getElementById(i);if(n){n.focus();try{n.setSelectionRange(n.value.length,n.value.length);}catch(e){}}}
  document.getElementById('fq').oninput=function(){f.q=this.value;vPm();rf('fq');};
  [['fs','s'],['fp','p'],['fa','a'],['fb','b']].forEach(function(x){document.getElementById(x[0]).onchange=function(){f[x[1]]=this.value;vPm();};});
  body.onclick=function(e){var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a,r=R[+b.dataset.i];
   if(a==='ex'){var H=['তারিখ','গ্রাহক','ইমেইল','প্ল্যান','মেয়াদ ধরন','টাকা','TrxID','স্ট্যাটাস','রিফান্ডের তারিখ','কারণ'],o=[H.map(csvCell).join(',')];R.forEach(function(r2){o.push([X.fd(r2.t),r2.a.school||r2.a.name,r2.a.email,pname(r2.plan),r2.period,r2.price,r2.trx,ST[r2.st][0],r2.refund?X.fd(r2.refund.t):'',r2.refund?r2.refund.reason:''].map(csvCell).join(','));});var bl=new Blob(['﻿'+o.join('\r\n')],{type:'text/csv;charset=utf-8'}),l=document.createElement('a');l.href=URL.createObjectURL(bl);l.download='payments.csv';l.click();return;}
   if(!r)return;
   if(a==='ap'){X.approve(r.a.email,r.id);rr();}
   else if(a==='rj'){X.reject(r.a.email,r.id);rr();}
   else if(a==='rf'){var why=prompt('রিফান্ডের কারণ লেখো (ঐচ্ছিক)');if(why===null)return;if(!confirm('"'+(r.a.school||r.a.name)+'" এর '+X.money(r.price)+' রিফান্ড হিসেবে চিহ্নিত করবে?'))return;var cut=confirm('গ্রাহকের চালু মেয়াদও এখনই বাতিল করবে? (OK = বাতিল, Cancel = মেয়াদ থাকুক)');
    X.mut(r.a.email,function(ac){var p=(ac.pays||[])[r.i];if(!p||p.refund)return;p.refund={t:Date.now(),reason:String(why||'').slice(0,120)};if(cut){ac.paidUntil=Math.min(ac.paidUntil||0,Date.now());}});X.toast('↩️ রিফান্ড চিহ্নিত হয়েছে');rr();}
  };
 }
 window.ADB={view:function(name,ctx){X=ctx;({pm:vPm})[name]();}};
})();
