(function(){var H=SLDRAW;var d=H.reg['bio-heredity-evolution'];
if(!d){return;}
var pick=d.filter(function(x){return x.id==='mendel'||x.id==='sex'||x.id==='thal';});
H.add('bio-heredity-mendel',pick);})();
