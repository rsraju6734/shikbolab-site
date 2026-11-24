/* ShikboLab পেমেন্ট প্রোভাইডার ইন্টারফেস (js/pay-provider.js)
   উদ্দেশ্য: ভবিষ্যতে সত্যিকারের গেটওয়ে (যেমন SSLCommerz, bKash PGW) জোড়া লাগানোর জন্য একটা নির্দিষ্ট জায়গা।
   এখন শুধু "manual" আছে: গ্রাহক bKash/Nagad এ টাকা পাঠিয়ে TrxID দেয়, অ্যাডমিন হাতে মিলিয়ে নিশ্চিত করে।
   ⚠️ যেকোনো গেটওয়ে যাচাই (verify) অবশ্যই সার্ভারে হতে হবে। ব্রাউজার থেকে "পেমেন্ট হয়েছে" ধরা নিরাপদ নয়।
   কার্ডের তথ্য কখনো এই সাইটে নেওয়া বা রাখা যাবে না। */
(function(){
 window.SLPay={
  active:'manual',
  providers:{
   manual:{name:'ম্যানুয়াল (bKash/Nagad + TrxID)',serverVerified:false,
    verify:function(){return Promise.resolve({ok:false,verified:false,err:'ম্যানুয়াল পদ্ধতিতে সার্ভার-যাচাই নেই। অ্যাডমিন হাতে মিলিয়ে নিশ্চিত করে।'});}}
  },
  // নতুন গেটওয়ে যোগ করতে: SLPay.providers.নাম = {name:'..', serverVerified:true, verify:function(txn){ /* backend API কল */ }}
  info:function(){var p=this.providers[this.active];return {key:this.active,name:p.name,serverVerified:!!p.serverVerified};}
 };
})();
