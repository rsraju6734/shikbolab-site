/* নতুন chapter যোগ করতে শুধু নিচের list-এ একটা নতুন লাইন যোগ করবে।
   subject: chemistry / physics / math / biology
   status : 'live' (খোলা যাবে) অথবা 'soon' (শীঘ্রই আসছে)
   extra  : true দিলে সেটা নিচের 'বোনাস এক্সট্রা ল্যাব' অংশে যাবে (না দিলে বিষয়ের ভেতরের অধ্যায় হবে)  */
window.CHAPTERS = [
  { subject:'chemistry', title:'রসায়নের ধারণা (অধ্যায় ১)', desc:'রসায়নের ইতিহাস, দৈনন্দিন জীবনে রসায়ন, গবেষণা ও ল্যাবের নিরাপত্তা: নিজে করে শেখো।', file:'chapters/chem-concepts-of-chemistry.html', status:'live' },
  { subject:'chemistry', title:'পদার্থের অবস্থা (অধ্যায় ২)', desc:'কণার গতি দেখো, ব্যাপন ও নিঃসরণ পরীক্ষা করো, বরফ থেকে বাষ্পের লেখচিত্র নিজে আঁকো।', file:'chapters/chem-states-of-matter.html', status:'live' },
  { subject:'chemistry', title:'পদার্থের গঠন (অধ্যায় ৩)', desc:'প্রোটন-নিউট্রন-ইলেকট্রন দিয়ে পরমাণু গড়ো, রাদারফোর্ড ও বোর মডেল দেখো, ইলেকট্রন বিন্যাস ভরাও, আইসোটোপ ও আপেক্ষিক ভর হিসাব করো।', file:'chapters/chem-structure-of-matter.html', status:'live' },
  { subject:'chemistry', title:'পর্যায় সারণি (অধ্যায় ৪)', desc:'সব ১১৮টি মৌলের ঠিকানা খুঁজো: ইলেকট্রন ঘুরতে দেখো, পর্যায় ও গ্রুপ বের করো।', file:'chapters/chem-periodic-table.html', status:'live' },
  { subject:'chemistry', title:'রাসায়নিক বন্ধন (অধ্যায় ৫)', desc:'যোজ্যতা ইলেকট্রন গুনো, সংকেত বানাও, আয়নিক ও সমযোজী বন্ধন তৈরি হতে দেখো, দ্রাব্যতা ও বিদ্যুৎ পরিবাহিতা পরীক্ষা করো।', file:'chapters/chem-chemical-bond.html', status:'live' },
  { subject:'chemistry', title:'মোলের ধারণা ও রাসায়নিক গণনা (অধ্যায় ৬)', desc:'গ্রাম-মোল-কণা-আয়তন কনভার্টার, ২২.৪ লিটার গ্যাসের বাক্স, মোলার দ্রবণ বানানো, শতকরা সংযুতি, সমীকরণের সমতা ও লিমিটিং বিক্রিয়ক।', file:'chapters/chem-mole-concept.html', status:'live' },
  { subject:'chemistry', title:'রাসায়নিক বিক্রিয়া (অধ্যায় ৭)', desc:'বিক্রিয়ার ধরন চেনো, ইলেকট্রন স্থানান্তর ও জারণ সংখ্যা নিজে করে দেখো।', file:'chapters/chem-chemical-reactions.html', status:'live' },
  { subject:'chemistry', title:'রসায়ন ও শক্তি (অধ্যায় ৮)', desc:'ΔH ও বন্ধন শক্তির হিসাব, জ্বালানির ক্ষতি, তড়িৎ বিশ্লেষণ, ইলেকট্রোপ্লেটিং, গ্যালভানিক কোষ ও নিউক্লিয়ার চেইন বিক্রিয়া।', file:'chapters/chem-chemistry-energy.html', status:'live' },
  { subject:'chemistry', title:'এসিড-ক্ষারক সমতা (অধ্যায় ৯)', desc:'pH স্কেলে রং বদলাও, এসিডের বিক্রিয়া ও চুনের পানি দেখো, সবল-দুর্বল এসিডে বাল্ব জ্বালাও, প্রশমন, এসিড বৃষ্টি, পানির খরতা ও বিশুদ্ধকরণ।', file:'chapters/chem-acid-base-balance.html', status:'live' },
  { subject:'chemistry', title:'খনিজ সম্পদ: ধাতু-অধাতু (অধ্যায় ১০)', desc:'আকরিকের ঘনীকরণ, ভস্মীকরণ-তাপজারণ, সক্রিয়তা সিরিজ, Al ও Cu-এর তড়িৎ বিশ্লেষণ, বাত্যা চুল্লি, সংকর ধাতু, মরিচা এবং সালফার ও H₂SO₄ তৈরি দেখো।', file:'chapters/chem-metals-nonmetals.html', status:'live' },
  { subject:'chemistry', title:'খনিজ সম্পদ: জীবাশ্ম (অধ্যায় ১১)', desc:'পেট্রোলিয়ামের আংশিক পাতন দেখো, হাইড্রোকার্বনের গঠন নিজে বানাও।', file:'chapters/chem-fossil-hydrocarbon.html', status:'live' },
  { subject:'chemistry', title:'আমাদের জীবনে রসায়ন (অধ্যায় ১২)', desc:'লবণ চাষ, বেকিং পাউডার, ভিনেগার, সাবান ও ডিটারজেন্ট, ব্লিচিং পাউডার, অ্যামোনিয়ার হেবার পদ্ধতি, ইউরিয়া সার, আম পাকানো ও প্রিজারভেটিভ নিজে চালিয়ে দেখো।', file:'chapters/chem-life-chemistry.html', status:'live' },
  { subject:'chemistry', title:'⚗️ মৌল মেশানোর ল্যাব (বিশেষ)', desc:'১১৮টা মৌলের যেকোনো ২ থেকে ২০টা মিশিয়ে দেখো: আগুন, রং, বিস্ফোরণ আর ব্যবহার।', file:'chapters/chem-element-mixer.html', status:'live', extra:true },
  { subject:'chemistry', title:'অম্ল-ক্ষার ও নিরপেক্ষকরণ', desc:'অম্ল ও ক্ষার মিশিয়ে pH বদলাতে দেখো, কণার নড়াচড়া দেখো।', file:'chapters/chem-acid-base.html', status:'live' },
  { subject:'chemistry', title:'⚗️ টাইট্রেশন ল্যাব (বিশেষ)', desc:'বুরেট থেকে ফোঁটা ফোঁটা NaOH দিয়ে অজানা এসিডের ঘনমাত্রা বের করো, সাথে pH বক্ররেখা দেখো।', file:'chapters/chem-x-titration.html', status:'live', extra:true },
  { subject:'chemistry', title:'🌈 pH ও নির্দেশক ল্যাব (বিশেষ)', desc:'লেবুর রস থেকে সাবান-পানি পর্যন্ত ১৩টি জিনিসে ৪ রকম নির্দেশক ও pH মিটার ব্যবহার করে দেখো।', file:'chapters/chem-x-ph-indicator.html', status:'live', extra:true },
  { subject:'chemistry', title:'🔥 শিখা পরীক্ষা ল্যাব (বিশেষ)', desc:'৭টি ধাতব লবণ শিখায় ধরে রং ও বর্ণালি রেখা দেখো, তারপর অজানা লবণ চিনে নাও।', file:'chapters/chem-x-flame-test.html', status:'live', extra:true },
  { subject:'chemistry', title:'🧪 দ্রবণ তৈরি ও লঘুকরণ ল্যাব (বিশেষ)', desc:'নির্দিষ্ট মোলারিটির দ্রবণ ধাপে ধাপে বানাও এবং M₁V₁ = M₂V₂ দিয়ে লঘু করো।', file:'chapters/chem-x-solution-dilution.html', status:'live', extra:true },
  { subject:'chemistry', title:'🥽 ল্যাব নিরাপত্তা ও যন্ত্রপাতি (বিশেষ)', desc:'১০টি যন্ত্র চেনো, মেনিসকাস পড়া শেখো এবং ল্যাবে নিরাপদ থাকার নিয়ম খেলায় খেলায় শেখো।', file:'chapters/chem-x-lab-safety.html', status:'live', extra:true },
  { subject:'physics',   title:'ভৌত রাশি এবং তাদের পরিমাপ (অধ্যায় ১)', desc:'পদার্থবিজ্ঞানের সময়রেখা, SI-এর সাত একক, উপসর্গ ও মাত্রা, স্লাইড ক্যালিপার্স, স্ক্রু-গেজ আর পরিমাপের ত্রুটি নিজে হাতে করে দেখো।', file:'chapters/phy-physical-quantities.html', status:'live' },
  { subject:'physics',   title:'গতি (অধ্যায় ২)', desc:'আপেক্ষিক গতি, দূরত্ব-সরণ, দ্রুতি-বেগ, ত্বরণ, গতির সমীকরণ, পড়ন্ত বস্তু ও লেখচিত্র — ১০টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-motion.html', status:'live' },
  { subject:'physics', title:'বল (অধ্যায় ৩)', desc:'জড়তা, চার মৌলিক বল, ভরবেগ ও সংঘর্ষ, F = ma, মহাকর্ষ, ক্রিয়া-প্রতিক্রিয়া ও ঘর্ষণ — অ্যানিমেটেড ল্যাব', file:'chapters/phy-force.html', status:'live' },
  { subject:'physics', title:'কাজ, ক্ষমতা ও শক্তি (অধ্যায় ৪)', desc:'কাজ W = Fs, গতিশক্তি ও বিভব শক্তি, শক্তির নিত্যতা ও রূপান্তর, শক্তির উৎস, E = mc², ক্ষমতা ও কর্মদক্ষতা — ১১টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-energy.html', status:'live' },
  { subject:'physics', title:'পদার্থের অবস্থা ও চাপ (অধ্যায় ৫)', desc:'চাপ P = F/A, ঘনত্ব, তরলের চাপ, আর্কিমিডিসের সূত্র ও প্লবতা, প্যাসকেলের সূত্র, বায়ুচাপ ও টরিসেলি, হুকের সূত্র, কঠিন-তরল-গ্যাস-প্লাজমা — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-matter-pressure.html', status:'live' },
  { subject:'physics', title:'বস্তুর ওপর তাপের প্রভাব (অধ্যায় ৬)', desc:'তাপ ও তাপমাত্রা, সেলসিয়াস-কেলভিন-ফারেনহাইট, দৈর্ঘ্য-ক্ষেত্রফল-আয়তন প্রসারণ, গলন ও বাষ্পীভবন, আপেক্ষিক তাপ, ক্যালোরিমিতি, চাপের প্রভাব — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-heat-matter.html', status:'live' },
  { subject:'physics', title:'তরঙ্গ ও শব্দ (অধ্যায় ৭)', desc:'সরল দোলক, স্প্রিং, পর্যায়কাল-কম্পাঙ্ক-বিস্তার-দশা, অনুদৈর্ঘ্য ও অনুপ্রস্থ তরঙ্গ, v = fλ, শব্দের বেগ, প্রতিধ্বনি, শ্রাব্যতা, শব্দদূষণ — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-waves-sound.html', status:'live' },
  { subject:'physics', title:'আলোর প্রতিফলন (অধ্যায় ৮)', desc:'আলোর প্রকৃতি, প্রতিফলনের সূত্র, সমতল দর্পণ, প্রতিবিম্ব, উত্তল ও অবতল দর্পণ, দর্পণের সূত্র, বিবর্ধন, দর্পণের ব্যবহার — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-light-reflection.html', status:'live' },
  { subject:'physics', title:'আলোর প্রতিসরণ (অধ্যায় ৯)', desc:'প্রতিসরণাঙ্ক, স্নেলের সূত্র, পূর্ণ অভ্যন্তরীণ প্রতিফলন, রংধনু, মরীচিকা, অপটিক্যাল ফাইবার, প্রিজম, উত্তল ও অবতল লেন্স, লেন্সের ক্ষমতা — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-light-refraction.html', status:'live' },
  { subject:'physics', title:'স্থির বিদ্যুৎ (অধ্যায় ১০)', desc:'আধান, ঘর্ষণ ও আবেশ, তড়িৎবীক্ষণ যন্ত্র, কুলম্বের সূত্র, তড়িৎ ক্ষেত্র ও বলরেখা, তড়িৎ বিভব, ধারক, ভ্যান ডি গ্রাফ, বজ্রপাত — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-static-electricity.html', status:'live' },
  { subject:'physics', title:'চল বিদ্যুৎ (অধ্যায় ১১)', desc:'বিদ্যুৎপ্রবাহ, ইএমএফ, ওহমের সূত্র, রোধ ও আপেক্ষিক রোধ, শ্রেণি ও সমান্তরাল সংযোগ, তড়িৎ ক্ষমতা ও বিল, সিস্টেম লস, লোডশেডিং, নিরাপদ ব্যবহার — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-current-electricity.html', status:'live' },
  { subject:'physics', title:'বিদ্যুতের চৌম্বক ক্রিয়া (অধ্যায় ১২)', desc:'চুম্বক ও চৌম্বক ক্ষেত্র, ডান হাতের নিয়ম, সলিনয়েড ও তড়িৎচুম্বক, স্পিকার, মোটর, তড়িৎ চুম্বকীয় আবেশ, জেনারেটর, ট্রান্সফর্মার — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-magnetic-effects.html', status:'live' },
  { subject:'physics', title:'তেজস্ক্রিয়তা ও ইলেকট্রনিকস (অধ্যায় ১৩)', desc:'তেজস্ক্রিয়তা, আলফা-বিটা-গামা রশ্মি, অর্ধায়ু, ভ্যাকুয়াম টিউব, ট্রানজিস্টর ও IC, অ্যানালগ-ডিজিটাল, বাইনারি, সেমিকন্ডাক্টর — ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/phy-radioactivity-electronics.html', status:'live' },
  { subject:'biology', title:'জীবনপাঠ (অধ্যায় ১)', desc:'জীবের শ্রেণিবিন্যাস, পাঁচ রাজ্য, দ্বিপদ নামকরণ: ১৩টি ফিউচারিস্টিক ভার্চুয়াল ল্যাব', file:'chapters/bio-life-study.html', status:'live' },
  { subject:'biology', title:'জীবকোষ ও টিস্যু (অধ্যায় ২)', desc:'কোষ, অঙ্গাণু, উদ্ভিদ ও প্রাণী টিস্যু, অঙ্গতন্ত্র, অণুবীক্ষণ যন্ত্র: ১৩টি ফিউচারিস্টিক ভার্চুয়াল ল্যাব', file:'chapters/bio-cell-tissue.html', status:'live' },
  { subject:'biology', title:'কোষ বিভাজন (অধ্যায় ৩)', desc:'মাইটোসিসের পাঁচ ধাপ, মিয়োসিস, হ্যাপ্লয়েড-ডিপ্লয়েড, জিনগত বৈচিত্র্য: ১৩টি ফিউচারিস্টিক ভার্চুয়াল ল্যাব', file:'chapters/bio-cell-division.html', status:'live' },
  { subject:'biology', title:'জীবনীশক্তি (অধ্যায় ৪)', desc:'ATP, সালোকসংশ্লেষণ, শ্বসন: ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/bio-bioenergy.html', status:'live' },
  { subject:'biology', title:'খাদ্য, পুষ্টি ও পরিপাক (অধ্যায় ৫)', desc:'উদ্ভিদের খনিজ পুষ্টি, ক্যালরি, BMI-BMR, পরিপাকতন্ত্র ও এনজাইম: ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/bio-food-digestion.html', status:'live' },
  { subject:'biology', title:'জীবে পরিবহণ (অধ্যায় ৬)', desc:'অভিস্রবণ, প্রস্বেদন, রক্ত, ব্লাড গ্রুপ, হৃৎপিণ্ড ও রক্তচাপ: ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/bio-transport.html', status:'live' },
  { subject:'biology', title:'গ্যাসীয় বিনিময় (অধ্যায় ৭)', desc:'শ্বসনতন্ত্র, শ্বাসক্রিয়া, অ্যালভিওলাস, শ্বাসতন্ত্রের রোগ: ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/bio-gas-exchange.html', status:'live' },
  { subject:'biology', title:'রেচন প্রক্রিয়া (অধ্যায় ৮)', desc:'বৃক্ক, নেফ্রন, মূত্র তৈরি, ডায়ালাইসিস ও প্রতিস্থাপন: ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/bio-excretion.html', status:'live' },
  { subject:'biology', title:'দৃঢ়তা প্রদান ও চলন (অধ্যায় ৯)', desc:'কঙ্কাল, অস্থিসন্ধি, পেশি, টেনডন-লিগামেন্ট, অস্টিওপোরোসিস ও আর্থ্রাইটিস: ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/bio-skeleton-movement.html', status:'live' },
  { subject:'biology', title:'সমন্বয় (অধ্যায় ১০)', desc:'উদ্ভিদ হরমোন, নিউরন, মস্তিষ্ক, প্রতিবর্তী ক্রিয়া, নালিবিহীন গ্রন্থি, ডায়াবেটিস, স্ট্রোক: ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/bio-coordination.html', status:'live' },
  { subject:'biology', title:'জীবের প্রজনন (অধ্যায় ১১)', desc:'ফুল, পরাগায়ন, দ্বিনিষেক, মানব ভ্রূণ, অমরা ও এইডস: ১৩টি অ্যানিমেটেড ল্যাব', file:'chapters/bio-reproduction.html', status:'live' },
  { subject:'biology', title:'বংশগতি ও জৈব অভিব্যক্তি (অধ্যায় ১২)', desc:'DNA, মেন্ডেল, লিঙ্গ নির্ধারণ, থ্যালাসেমিয়া ও ডারউইনবাদ — ১৩টি ল্যাব', file:'chapters/bio-heredity-evolution.html', status:'live' },
  { subject:'biology', title:'জীবের পরিবেশ (অধ্যায় ১৩)', desc:'বাস্তুতন্ত্র, খাদ্যশিকল, খাদ্যজাল, শক্তি পিরামিড ও জীববৈচিত্র্য — ১৩টি ল্যাব', file:'chapters/bio-environment.html', status:'live' },
  { subject:'biology', title:'জীবপ্রযুক্তি (অধ্যায় ১৪)', desc:'টিস্যু কালচার, রিকম্বিনেন্ট DNA, GMO ও জিন প্রকৌশলের ব্যবহার — ১৩টি ল্যাব', file:'chapters/bio-biotechnology.html', status:'live' },
  { subject:'physics',   title:'⚡ বৈদ্যুতিক সার্কিট (বিশেষ)', desc:'ওহমের সূত্র পরীক্ষা করো, শ্রেণি ও সমান্তরাল সংযোগে বাল্ব জ্বালাও।', file:'chapters/phy-electric-circuits.html', status:'live', extra:true },
  { subject:'math', title:'🔢 সেট ও ফাংশন (উচ্চতর গণিত অধ্যায় ১)', desc:'ভেন ডায়াগ্রাম, পাওয়ার সেট, ফাংশন, এক-এক, বিপরীত ফাংশন ও লেখচিত্র: ধাপে ধাপে সমাধান, ৫টি টুল, প্র্যাকটিস ও ৩০টি কুইজ', file:'chapters/math-sets-functions.html', status:'live' },
  { subject:'math', title:'🧮 বীজগাণিতিক রাশি (উচ্চতর গণিত অধ্যায় ২)', desc:'বহুপদী, ভাগশেষ ও উৎপাদক উপপাদ্য, প্রতিসম-চক্রক্রমিক রাশি, বিশেষ সূত্র ও আংশিক ভগ্নাংশ: ৬টি টুল, ৭টি ধাপে ধাপে উদাহরণ, ৩০টি কুইজ', file:'chapters/math-algebraic-expr.html', status:'live' },
  { subject:'math', title:'📐 জ্যামিতি (উচ্চতর গণিত অধ্যায় ৩)', desc:'পিথাগোরাস, অ্যাপোলোনিয়াস, ভরকেন্দ্র-পরিকেন্দ্র-লম্ববিন্দু, সদৃশতা, ব্রহ্মগুপ্ত ও টলেমি: টেনে দেখার ৬টি ল্যাব, ৫টি প্রমাণ, ৩০টি কুইজ', file:'chapters/math-geometry.html', status:'live' },
  { subject:'math', title:'✏️ জ্যামিতিক অঙ্কন (উচ্চতর গণিত অধ্যায় ৪)', desc:'কম্পাস-রুলারে ত্রিভুজ ও বৃত্ত আঁকা, স্পর্শক, পরিবৃত্ত-অন্তর্বৃত্ত: ধাপে ধাপে ৩টি অঙ্কন ল্যাব, ৫টি প্রমাণ, ৩০টি কুইজ', file:'chapters/math-geometric-drawing.html', status:'live' },
  { subject:'math', title:'⚖️ সমীকরণ (উচ্চতর গণিত অধ্যায় ৫)', desc:'দ্বিঘাত সূত্র ও নিশ্চায়ক, বর্গমূলযুক্ত ও সূচক সমীকরণ, দুই চলকের জোট, ঘড়ির কাঁটা: ৫টি ল্যাব, ৬টি ধাপে ধাপে, ৩০টি কুইজ', file:'chapters/math-equations.html', status:'live' },
  { subject:'math', title:'⚖️ অসমতা (উচ্চতর গণিত অধ্যায় ৬)', desc:'অসমতার বিধি, সংখ্যারেখা, বাস্তব সমস্যা, দুই চলকের অসমতার ছায়াচিত্র: টেনে দেখার ৪টি ল্যাব, ৫টি ধাপে ধাপে, ৩০টি কুইজ', file:'chapters/math-inequality.html', status:'live' },
  { subject:'math', title:'♾️ অসীম ধারা (উচ্চতর গণিত অধ্যায় ৭)', desc:'অনুক্রম, আংশিক সমষ্টি, অসীম গুণোত্তর ধারা, আবৃত্ত দশমিক থেকে ভগ্নাংশ: ৪টি ল্যাব, ৫টি ধাপে ধাপে, ৩০টি কুইজ', file:'chapters/math-infinite-series.html', status:'live' },
  { subject:'math', title:'📐 ত্রিকোণমিতি (উচ্চতর গণিত অধ্যায় ৮)', desc:'রেডিয়ান, s = rθ, ছয়টি অনুপাত, ইউনিট বৃত্ত, nπ/2 ± θ নিয়ম, সমীকরণ: ৫টি ল্যাব, ৭টি ধাপে ধাপে, ৩০টি কুইজ', file:'chapters/math-trigonometry.html', status:'live' },
  { subject:'math', title:'📈 সূচকীয় ও লগারিদমীয় ফাংশন (উচ্চতর গণিত অধ্যায় ৯)', desc:'সূচক সূত্র, মূল, লগারিদম ও ভিত্তি পরিবর্তন, লেখচিত্র, ডোমেন-রেঞ্জ: ৫টি ল্যাব, ৭টি ধাপে ধাপে, ৩০টি কুইজ', file:'chapters/math-exp-log.html', status:'live' },
  { subject:'math', title:'🔺 দ্বিপদী বিস্তৃতি (উচ্চতর গণিত অধ্যায় ১০)', desc:'প্যাসকেলের ত্রিভুজ, n!, ⁿCᵣ, (x+y)ⁿ, সাধারণ পদ ও x মুক্ত পদ: ৫টি ল্যাব, ৬টি ধাপে ধাপে, ৩০টি কুইজ', file:'chapters/math-binomial.html', status:'live' },
  { subject:'math', title:'📍 স্থানাঙ্ক জ্যামিতি (উচ্চতর গণিত অধ্যায় ১১)', desc:'দূরত্ব, ত্রিভুজ-চতুর্ভুজের ক্ষেত্রফল, ঢাল ও সরলরেখার সমীকরণ — টেনে দেখার ৬টি ল্যাব।', file:'chapters/math-coordinate-geometry.html', status:'live' },
  { subject:'math', title:'➡️ সমতলীয় ভেক্টর (উচ্চতর গণিত অধ্যায় ১২)', desc:'ভেক্টরের যোগ-বিয়োগ, সংখ্যা-গুণিতক, অবস্থান ভেক্টর ও জ্যামিতির প্রমাণ — টেনে দেখার ৬টি ল্যাব।', file:'chapters/math-planar-vector.html', status:'live' },
  { subject:'math', title:'🧊 ঘন জ্যামিতি (উচ্চতর গণিত অধ্যায় ১৩)', desc:'আয়তাকার ঘনবস্তু, প্রিজম, পিরামিড, কোণক, গোলক ও গলিয়ে ঢালাই — ঘুরিয়ে দেখার ৬টি ল্যাব।', file:'chapters/math-solid-geometry.html', status:'live' },
  { subject:'math', title:'🎲 সম্ভাবনা (উচ্চতর গণিত অধ্যায় ১৪)', desc:'বলের থলে, ছক্কা, মুদ্রা, probability tree ও তথ্যভিত্তিক সম্ভাবনার ৬টি ল্যাব।', file:'chapters/math-probability.html', status:'live' },
  { subject:'math',      title:'📈 ফাংশন ও গ্রাফ (বিশেষ)', desc:'স্লাইডার নেড়ে সরলরেখা ও দ্বিঘাত ফাংশনের গ্রাফ বদলাতে দেখো, সমীকরণ সমাধান করো।', file:'chapters/math-functions-graphs.html', status:'live', extra:true },
  { subject:'biology',   title:'🧬 বংশগতি: মেন্ডেলের ল্যাব (বিশেষ)', desc:'পানেট বর্গ বানাও, ৩ : ১ ও ৯ : ৩ : ৩ : ১ অনুপাত নিজে বের করো, রক্তের গ্রুপ ও লিঙ্গ নির্ধারণ দেখো।', file:'chapters/bio-heredity-mendel.html', status:'live', extra:true }
];

/* ===== কনটেন্ট ওভাররাইড (js/content.js থেকে)। content.js না থাকলে কিছুই বদলায় না ===== */
(function(){
 var base=(window.CHAPTERS||[]).slice();window.CHAPTERS_BASE=base;
 var C=window.SL_CONTENT;if(!C||!C.chapters)return;
 var hid={};(C.subjects||[]).forEach(function(s){if(s&&s.visible===false)hid[s.k]=1;});
 var off={};(C.labs||[]).forEach(function(l){if(l&&l.chapter&&l.active===false)off[l.chapter]=1;});
 var out=[];
 base.forEach(function(c,i){
  var f=String(c.file||'').split('/').pop().replace(/\.html.*$/,''),o=C.chapters[f]||{};
  if(o.hidden||hid[c.subject]||off[f])return;
  var n={};for(var k in c)n[k]=c[k];
  if(typeof o.title==='string'&&o.title.trim())n.title=o.title.trim();
  if(typeof o.desc==='string'&&o.desc.trim())n.desc=o.desc.trim();
  if(o.state==='draft')n.status='soon';
  n._o=typeof o.order==='number'?o.order:(i+1)*10;n._i=i;out.push(n);
 });
 out.sort(function(a,b){return a._o-b._o||a._i-b._i;});
 window.CHAPTERS=out;
})();
