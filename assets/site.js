
document.querySelectorAll('.mnav .panel a').forEach(function(a){a.addEventListener('click',function(){var d=a.closest('details');if(d)d.removeAttribute('open');});});
var hv=document.querySelector('.hero-video');if(hv){hv.muted=true;var pp=hv.play();if(pp&&pp.catch)pp.catch(function(){});}
(function(){
if (window.__jmQuote) return; window.__jmQuote = true;
var files = [];
function $(id){ return document.getElementById(id); }
function render(){
  var list=$('q-thumbs'), msg=$('q-msg'); if(!list) return;
  list.innerHTML='';
  files.forEach(function(f,i){
    var li=document.createElement('li'), im=document.createElement('img'), b=document.createElement('button');
    im.alt='Photo '+(i+1)+' preview'; im.src=URL.createObjectURL(f);
    b.type='button'; b.className='q-remove'; b.setAttribute('data-i',String(i)); b.setAttribute('aria-label','Remove photo '+(i+1)); b.textContent='×';
    li.appendChild(im); li.appendChild(b); list.appendChild(li);
  });
  if(msg) msg.textContent = files.length ? files.length+' of 5 photos added' : 'Up to 5 photos. JPG or PNG.';
}
document.addEventListener('change',function(e){
  var el=e.target; if(!el || el.id!=='q-photos') return;
  Array.prototype.forEach.call(el.files,function(f){ if(files.length<5 && f.type.indexOf('image/')===0) files.push(f); });
  el.value=''; render();
});
document.addEventListener('click',function(e){
  var t=e.target; if(!t || !t.closest) return;
  var rm=t.closest('.q-remove');
  if(rm){ files.splice(parseInt(rm.getAttribute('data-i'),10),1); render(); return; }
  var a=t.closest('[data-service]');
  if(a){
    var s=$('q-service'), n=$('q-notes');
    if(s) s.value=a.getAttribute('data-service');
    var p=a.getAttribute('data-plan'); if(n) n.value = p ? 'Plan: '+p : '';
    return;
  }
  if(t.closest('#q-again')){
    var f=$('quote-form'); if(f){ f.reset(); files=[]; render(); f.classList.remove('sent'); }
  }
});
document.addEventListener('submit',function(e){
  var f=e.target; if(!f || f.id!=='quote-form') return;
  e.preventDefault();
  if(f.checkValidity && !f.checkValidity()){ f.reportValidity(); return; }
  /* Front-end only: wire this to the real form handler (Gravity Forms, WPForms, etc.) in production. */
  f.classList.add('sent');
  var d=$('q-done'); if(d && d.focus) d.focus();
});
})();

(function(){
var T='+14037977145',D='(403) 797-7145',m=document.createElement('div');m.className='ctm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','Call or text The Junk Man');
var ph='<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';
var tx='<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
m.innerHTML='<div class="ctm-box"><h3>Call or text</h3><p>'+D+'. Text us photos for a fast quote.</p><a class="btn btn-lime" href="tel:'+T+'">'+ph+'Call '+D+'</a><a class="btn btn-ghost" href="sms:'+T+'">'+tx+'Text '+D+'</a><button type="button" class="ctm-x">Cancel</button></div>';
document.body.appendChild(m);
var last=null;
function open(a){last=a;m.classList.add('on');var b=m.querySelector('.btn');if(b)b.focus();}
function close(){m.classList.remove('on');if(last&&last.focus)last.focus();}
document.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;
 var a=t.closest('a.ct');if(a){e.preventDefault();open(a);return;}
 if(t===m||t.closest('.ctm-x')){close();return;}
 if(t.closest('.ctm-box a')){setTimeout(close,50);}
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('on'))close();});
})();

(function(){
var j=document.getElementById('jobs');if(!j)return;
var figs=[].slice.call(j.querySelectorAll('.ba'));if(!figs.length)return;
var nav=document.createElement('div');nav.className='jobs-nav';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Recent jobs');
var btns=figs.map(function(f,i){
  var sp=f.querySelector('figcaption>span');var title=(sp.querySelector('.cap')||sp).childNodes[0].textContent.trim();var sm=sp.querySelector('small');
  var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-selected','false');
  b.innerHTML=title+(sm?'<small>'+sm.textContent+'</small>':'')+'<i></i>';
  b.addEventListener('click',function(){stop();show(i);});
  nav.appendChild(b);return b;
});
j.insertBefore(nav,j.firstChild);j.classList.add('js-on');
var cur=0,t=null,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function show(i){cur=i;figs.forEach(function(f,k){f.classList.toggle('on',k===i)});
 btns.forEach(function(b,k){b.setAttribute('aria-selected',k===i?'true':'false');var bar=b.querySelector('i');bar.style.transition='none';bar.style.width=k===i?'0':'';});
 void nav.offsetWidth;var bar=btns[i].querySelector('i');bar.style.transition='';bar.style.width='';
 if(nav.scrollWidth>nav.clientWidth&&nav.scrollHeight<=nav.clientHeight+20){var b=btns[i];nav.scrollTo({left:b.offsetLeft-12,behavior:'smooth'});}
}
function start(){if(reduce||t)return;t=setInterval(function(){show((cur+1)%figs.length)},5000)}
function stop(){if(t){clearInterval(t);t=null}btns.forEach(function(b){var bar=b.querySelector('i');bar.style.transition='none';});}
show(0);
if('IntersectionObserver' in window){new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){start()}else if(t){clearInterval(t);t=null}})},{threshold:.3}).observe(j);}
})();

(function(){
var btn=document.getElementById('mega-btn'),mg=document.getElementById('mega');if(!btn||!mg)return;
var t=null,hov=window.matchMedia&&matchMedia('(hover:hover)').matches;
function open(){clearTimeout(t);mg.hidden=false;btn.setAttribute('aria-expanded','true');}
function close(){clearTimeout(t);mg.hidden=true;btn.setAttribute('aria-expanded','false');}
function later(){clearTimeout(t);t=setTimeout(close,180);}
btn.addEventListener('click',function(e){if(hov&&e.detail>0){open();return;}mg.hidden?open():close();});
if(hov){[btn,mg].forEach(function(e){e.addEventListener('mouseenter',open);e.addEventListener('mouseleave',later);});}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!mg.hidden){close();btn.focus();}});
document.addEventListener('click',function(e){if(mg.hidden)return;if(!e.target.closest('#mega')&&!e.target.closest('#mega-btn'))close();if(e.target.closest('#mega a'))close();});
window.addEventListener('resize',function(){if(window.innerWidth<1000)close();});
})();

(function(){
document.addEventListener('click',function(e){
 var o=e.target.closest&&e.target.closest('[data-open]');
 if(o){var d=document.getElementById(o.getAttribute('data-open'));if(d&&d.showModal){d.showModal();}return;}
 var d2=e.target.closest&&e.target.closest('.sdlg');
 if(d2){ if(e.target.closest('[data-close]')||e.target===d2){ d2.close(); } }
});
document.addEventListener('click',function(e){var d=e.target.closest&&e.target.closest('.sdlg');if(d&&!e.target.closest('.sd-box'))d.close();});
})();
