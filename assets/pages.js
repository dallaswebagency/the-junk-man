(function(){
document.querySelectorAll('form[data-dpform]').forEach(function(f){
  f.addEventListener('submit',function(e){e.preventDefault();if(!f.checkValidity()){f.reportValidity();return;}f.classList.add('sent');var d=f.querySelector('.dpf-done');if(d){d.setAttribute('tabindex','-1');d.focus();}});
  var again=f.querySelector('[data-again]');if(again)again.addEventListener('click',function(){f.reset();f.classList.remove('sent');});
});
document.querySelectorAll('a[data-pick]').forEach(function(a){
  a.addEventListener('click',function(){var r=document.querySelector('input[name="plan"][value="'+a.dataset.pick+'"]');if(r)r.checked=true;});
});
})();
