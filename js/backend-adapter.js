/* ShikboLab ব্যাকএন্ড adapter (Phase 9 কিট)
   ⚠️ এখন শুধু "অবস্থা জানানো" কাজ করে। লগইন/ডেটা সংযোগ এখনও লেখা হয়নি, তাই কিছুই সংযুক্ত নয়।
   Supabase প্রজেক্ট খোলার পর এখানে supabase-js দিয়ে signIn, রোল-চেক ও অ্যাকশন যোগ হবে।
   নিয়ম: শুধু anon (public) key এখানে বসবে। service_role key কখনো না। */
(function(){
 var cfg=window.SL_BACKEND||{url:'',anonKey:''};
 var okUrl=/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(String(cfg.url||''));
 var looksService=false;
 try{var p=JSON.parse(atob(String(cfg.anonKey||'').split('.')[1]||''));looksService=p&&p.role==='service_role';}catch(e){}
 window.SLBackend={
  status:function(){
   if(!cfg.url&&!cfg.anonKey)return {connected:false,msg:'কোনো ব্যাকএন্ড সেট করা নেই'};
   if(looksService)return {connected:false,danger:true,msg:'🚨 এটা service_role key! এটা ব্রাউজারে কখনো বসানো যায় না। এখনই সরাও।'};
   if(!okUrl||!cfg.anonKey)return {connected:false,msg:'URL বা anon key ঠিক নেই'};
   return {connected:false,msg:'কনফিগ আছে, কিন্তু লগইন/ডেটা সংযোগ এখনও লেখা হয়নি (adapter অসম্পূর্ণ)'};
  },
  signIn:function(){return Promise.reject(new Error('ব্যাকএন্ড সংযোগ এখনও তৈরি হয়নি'));}
 };
})();
