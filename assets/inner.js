(function(){
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
// count-up
var cnt=document.querySelectorAll('.cnt');
function run(el){var to=+el.dataset.to,t0=null,d=1100;function f(t){if(!t0)t0=t;var k=Math.min((t-t0)/d,1);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f);}requestAnimationFrame(f);}
if(cnt.length&&!reduce&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target);}});},{threshold:.6});cnt.forEach(function(c){c.textContent='0';io.observe(c);});}
// hero quick quote
var f=document.getElementById('phq');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var s=document.getElementById('q-service'),p=document.getElementById('q-phone');var v=document.getElementById('phq-s').value,ph=document.getElementById('phq-p').value;
 if(s){for(var i=0;i<s.options.length;i++)if(s.options[i].text===v)s.selectedIndex=i;}if(p&&ph)p.value=ph;
 var q=document.getElementById('quote');if(q){q.scrollIntoView({behavior:reduce?'auto':'smooth'});setTimeout(function(){var n=document.getElementById('q-name');if(n)n.focus({preventScroll:true});},700);}});
// estimator
document.querySelectorAll('[data-est]').forEach(function(w){var b=w.querySelectorAll('[role=radio]'),sz=w.querySelector('.est-size'),pr=w.querySelector('.est-price b'),fi=w.querySelector('.truck i');
 function set(x){b.forEach(function(y){y.setAttribute('aria-checked',y===x?'true':'false');y.tabIndex=y===x?0:-1;});sz.textContent=x.dataset.l;pr.textContent=x.dataset.p;w.querySelector('.est-price').firstChild.nodeValue=x.dataset.pre+' ';fi.style.setProperty('--f',x.dataset.f+'%');}
 b.forEach(function(x,i){x.addEventListener('click',function(){set(x);});x.addEventListener('keydown',function(e){var k=e.key,n=null;if(k==='ArrowRight'||k==='ArrowDown')n=b[(i+1)%b.length];if(k==='ArrowLeft'||k==='ArrowUp')n=b[(i-1+b.length)%b.length];if(n){e.preventDefault();n.focus();set(n);}});});});
// item finder
document.querySelectorAll('[data-wt]').forEach(function(w){var q=w.querySelector('input'),ch=w.querySelectorAll('.wt-chips button'),li=w.querySelectorAll('.wt-grid li'),em=w.querySelector('.wt-empty'),cat='all';
 function upd(){var t=q.value.trim().toLowerCase(),n=0;li.forEach(function(x){var ok=(cat==='all'||x.dataset.c===cat)&&(!t||x.dataset.t.indexOf(t)>-1);x.hidden=!ok;if(ok)n++;});em.hidden=n>0;}
 function setc(c){cat=c;ch.forEach(function(b){b.classList.toggle('on',b.dataset.c===c);});upd();}
 ch.forEach(function(b){b.addEventListener('click',function(){setc(b.dataset.c);});});q.addEventListener('input',upd);
 var h=(location.hash||'').slice(1);if(h&&w.querySelector('[data-c="'+h+'"]')){setc(h);var el=document.getElementById('finder');if(el)setTimeout(function(){el.scrollIntoView();},50);}});
// tabs
document.querySelectorAll('[data-tabs]').forEach(function(w){var t=w.querySelectorAll('[role=tab]'),p=w.querySelectorAll('[role=tabpanel]');
 function sel(i){t.forEach(function(x,k){x.setAttribute('aria-selected',k===i?'true':'false');x.tabIndex=k===i?0:-1;p[k].hidden=k!==i;});}
 t.forEach(function(x,i){x.addEventListener('click',function(){sel(i);});x.addEventListener('keydown',function(e){var n=null;if(e.key==='ArrowRight')n=(i+1)%t.length;if(e.key==='ArrowLeft')n=(i-1+t.length)%t.length;if(n!==null){e.preventDefault();t[n].focus();sel(n);}});});});
})();
// generic filter (reviews, gallery) + lightbox
(function(){
document.querySelectorAll('[data-filter]').forEach(function(w){var ch=w.querySelectorAll('.rf-chips button'),it=w.querySelectorAll('[data-tags]'),grid=w.querySelector('.wk-grid');
 ch.forEach(function(b){b.addEventListener('click',function(){var c=b.dataset.c;ch.forEach(function(x){x.classList.toggle('on',x===b);});it.forEach(function(x){x.hidden=!(c==='all'||x.dataset.tags.split(' ').indexOf(c)>-1);});if(grid)grid.classList.toggle('flat',c!=='all');});});});
var lbs=document.querySelectorAll('.lb');if(lbs.length){var d=document.createElement('dialog');d.className='lbx';d.innerHTML='<button type="button" aria-label="Close">×</button><img alt=""><p></p>';document.body.appendChild(d);
 lbs.forEach(function(b){b.addEventListener('click',function(){d.querySelector('img').src=b.dataset.src;d.querySelector('img').alt=b.dataset.cap;d.querySelector('p').textContent=b.dataset.cap;if(d.showModal)d.showModal();});});
 d.addEventListener('click',function(e){if(e.target===d||e.target.tagName==='BUTTON')d.close();});}
})();
