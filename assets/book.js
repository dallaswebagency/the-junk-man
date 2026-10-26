/* The Junk Man booking wizard: builds a text request, no server */
(function(){
var NUM="+14037977145";
var CATS=[
 {id:"loads",title:"Junk Removal Loads",ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h14v10H1zM15 9h4l3 3v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',qty:1,items:[["SINGLE ITEM","minimum service charge",99],["1/8 LOAD","a few pieces",149],["1/4 LOAD","a small room",229],["1/2 LOAD","a garage corner",390],["3/4 LOAD","a big cleanout",580],["FULL LOAD","a whole house",699]]},
 {id:"more",title:"More Services",ic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/></svg>',qty:0,items:[["Moving and Hauling","local and long distance","Free photo quote"],["Commercial Cleanout","realtors, landlords, businesses","Up to 15% off"],["Recurring Garbage Pickup","every second week","Starting At $36 a month"],["Snow Removal","driveways and walkways","Free quote"],["Holiday Lighting","install and takedown","Free quote"]]}];
var SLOTS={morning:"Morning (before noon)",afternoon:"Afternoon (noon to 4)",evening:"Evening (after 4)",flex:"Flexible (any time)",asap:"As soon as possible"};
var qty={},step=1,photos=[];
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var host=$("#bkCats");if(!host)return;
var money=function(n){return"$"+n.toLocaleString("en-CA")};
host.innerHTML=CATS.map(function(c){return'<section class="bk-cat" id="'+c.id+'"><header><i>'+c.ic+'</i><h3>'+c.title+'</h3><span class="cnt"></span></header>'+c.items.map(function(it,i){var k=c.id+"|"+i;
 if(c.qty)return'<div class="bk-row" data-p="'+it[2]+'"><div class="bk-nm"><b>'+it[0]+'</b><small>'+it[1]+'</small><em><small>Starting At</small> '+money(it[2])+'</em></div>'+["std","hvy"].map(function(t){return'<div class="bk-qty"><span class="lb">'+(t=="std"?"Standard<small>Household items</small>":"Specialty Handling &amp; Disposal<small>Custom quote required.</small>")+'</span><span class="bk-stp" data-k="'+k+"|"+t+'"><button type="button" class="m" aria-label="Remove one '+it[0]+" "+t+'" disabled>&minus;</button><output>0</output><button type="button" class="p" aria-label="Add one '+it[0]+" "+t+'">+</button></span></div>'}).join("")+'</div>';
 return'<div class="bk-row one" data-add="'+k+'"><div class="bk-nm"><b>'+it[0]+'</b><small>'+it[1]+'</small><em>'+it[2]+'</em></div><div><button type="button" class="bk-add" aria-pressed="false" data-k="'+k+'">Add to request</button></div></div>'}).join("")+'</section>'}).join("");
host.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
 if(b.classList.contains("bk-add")){var k=b.dataset.k,on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);qty[k]=on?1:0;b.closest(".bk-row").classList.toggle("sel",on);b.textContent=on?"Added":"Add to request";return render()}
 var s=b.closest(".bk-stp");if(!s)return;var k=s.dataset.k,n=qty[k]||0;n=b.classList.contains("p")?Math.min(n+1,12):Math.max(n-1,0);qty[k]=n;$("output",s).textContent=n;$(".m",s).disabled=n===0;rowState(s.closest(".bk-row"));render()});
function rowState(row){var n=0,p=+row.dataset.p;$$(".bk-stp",row).forEach(function(s){n+=qty[s.dataset.k]||0});row.classList.toggle("sel",n>0);var t=$(".bk-rt",row);if(!t){t=document.createElement("span");t.className="bk-rt";row.appendChild(t)}t.textContent=n?n+" selected = "+money(n*p):""}
function lines(){var out=[];CATS.forEach(function(c){c.items.forEach(function(it,i){if(c.qty)["std","hvy"].forEach(function(t){var n=qty[c.id+"|"+i+"|"+t]||0;if(n)out.push({n:n,name:it[0],kind:t=="std"?"Standard":"Heavy",cat:c.title,price:it[2],line:n*it[2],q:1})});else if(qty[c.id+"|"+i])out.push({n:1,name:it[0],kind:it[2],cat:c.title,price:0,line:0,q:0})})});return out}
function totals(){var L=lines(),sub=L.reduce(function(a,l){return a+l.line},0);return{L:L,total:sub,hvy:L.some(function(l){return l.kind=="Heavy"}),loads:L.some(function(l){return l.q})}}
function val(id){return($("#"+id).value||"").trim()}
function render(){var T=totals(),h="";
 if(!T.L.length)h='<div class="bk-empty"><b>No items selected yet.</b>Choose a load size or a service to see pricing here.</div>';
 else{h="<ul>"+T.L.map(function(l){return"<li><span>"+(l.q?l.n+" &times; ":"")+l.name+"<small>"+(l.kind=="Heavy"?"Specialty Handling &amp; Disposal":l.kind)+" &middot; "+l.cat+"</small></span><span>"+(l.q?money(l.line):"Quote")+"</span></li>"}).join("")+"</ul>";
  if(T.loads)h+='<div class="bk-tot"><span>Estimated Total</span><b>'+money(T.total)+"</b></div>"}
 h+='<div class="bk-min">Pricing shown is an estimate based on your selections. Your final price will be confirmed after we review your photos and job details. No hidden fees or surprises!'+(T.hvy?" Heavy items require a custom quote.":"")+($("#d-biz")&&$("#d-biz").checked?" Commercial discount of up to 15% applies.":"")+"</div>";
 $("#bkSumBody").innerHTML=h;$("#bkBt").textContent=T.loads?"Estimated Total "+money(T.total):(T.L.length?T.L.length+" selected":"No items yet");
 CATS.forEach(function(c){var n=0;$$("#"+c.id+" .bk-row").forEach(function(r){});L2(c)});
 function L2(c){var n=T.L.filter(function(l){return l.cat==c.title}).reduce(function(a,l){return a+l.n},0),b=$("#"+c.id+" .cnt");b.textContent=n?n+" added":"";b.classList.toggle("on",n>0)}}
var panels=$$(".bk-panel"),items=$$(".bk-stepper li");
function show(n,quiet){step=n;panels.forEach(function(p,i){p.classList.toggle("on",i===n-1)});items.forEach(function(li,i){li.classList.toggle("cur",i===n-1);li.classList.toggle("done",i<n-1)});
 $("#bkBnext").textContent=n===4?"Send booking":"Continue";$(".bk-bbar").style.visibility=n===5?"hidden":"";
 if(n===4)review();if(!quiet)window.scrollTo({top:$("#wizard").getBoundingClientRect().top+pageYOffset-90,behavior:"smooth"})}
function mark(id,bad){$("#"+id).closest(".bk-fld").classList.toggle("bad",bad);return!bad}
function valid(n){if(n===1){var ok=totals().L.length>0;$("#bkNeed").hidden=ok;return ok}
 if(n===2){var a=mark("d-name",!val("d-name")),b=mark("d-phone",val("d-phone").replace(/\D/g,"").length<10),c=mark("d-addr",!val("d-addr"));return a&&b&&c}
 if(n===3){var dv=val("d-date"),early=dv&&dv<today,al=val("d-alt");if(al&&al<today){$("#d-alt").value=""}$("#d-date-err").textContent=early?"Online booking needs at least 24 hours notice. For same-day service, call (403) 797-7145.":"Please pick a date";var d=mark("d-date",!dv||early),t=!!$('input[name="slot"]:checked');$("#slot-fld").classList.toggle("bad",!t);return d&&t}return true}
function next(){if(step===4){$("#bkSend").click();return}if(valid(step))show(step+1)}
$$("[data-next]").forEach(function(b){b.addEventListener("click",next)});$$("[data-back]").forEach(function(b){b.addEventListener("click",function(){show(Math.max(1,step-1))})});$("#bkBnext").addEventListener("click",next);
items.forEach(function(li,i){li.addEventListener("click",function(){if(li.classList.contains("done"))show(i+1)})});
document.addEventListener("input",function(e){var w=e.target.closest&&e.target.closest(".bk-fld");if(w)w.classList.remove("bad")});
$("#d-biz").addEventListener("change",render);
var d=new Date();d.setHours(d.getHours()+24);d.setMinutes(d.getMinutes()-d.getTimezoneOffset());var today=d.toISOString().slice(0,10);$("#d-date").min=today;$("#d-alt").min=today;
var pin=$("#d-photos"),pth=$("#d-thumbs"),perr=$("#d-photo-err");
function thumbs(){pth.innerHTML="";photos.forEach(function(f,i){var li=document.createElement("li"),im=document.createElement("img"),bt=document.createElement("button");im.alt="Selected photo "+(i+1);im.src=URL.createObjectURL(f);bt.type="button";bt.setAttribute("aria-label","Remove photo "+(i+1));bt.innerHTML="&times;";bt.onclick=function(){photos.splice(i,1);thumbs()};li.appendChild(im);li.appendChild(bt);pth.appendChild(li)})}
pin.addEventListener("change",function(){perr.style.display="none";[].forEach.call(pin.files,function(f){var m="";if(!/^image\//.test(f.type))m="Only image files can be added.";else if(f.size>12*1048576)m="Each photo must be under 12 MB.";else if(photos.length>=6)m="You can add up to 6 photos.";if(m){perr.textContent=m;perr.style.display="block";return}photos.push(f)});pin.value="";thumbs()});
function pretty(s){try{return new Date(s+"T12:00:00").toLocaleDateString("en-CA",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}catch(e){return s}}
function message(withPh){var T=totals(),s=$('input[name="slot"]:checked');
 return"Hi The Junk Man! I'd like to submit a booking request.\n\nSERVICES\n"+T.L.map(function(l){return(l.q?l.n+" x ":"")+l.name+" ("+(l.kind=="Heavy"?"Specialty Handling & Disposal":l.kind)+")"}).join("\n")+(T.loads?"\nEstimated total: "+money(T.total)+" (estimate only, final quote to be confirmed)":"")+"\n\nDETAILS\nName: "+val("d-name")+"\nPhone: "+val("d-phone")+(val("d-email")?"\nEmail: "+val("d-email"):"")+"\nAddress: "+val("d-addr")+"\nProperty: "+val("d-type")+"\nJunk location: "+val("d-access")+($("#d-biz").checked?"\nCustomer: Realtor, landlord or business":"")+"\n\nREQUESTED APPOINTMENT (to be confirmed)\n"+pretty(val("d-date"))+", "+(s?SLOTS[s.value]:"")+(val("d-alt")?"\nBackup date: "+pretty(val("d-alt")):"")+(val("d-notes")?"\n\nNOTES\n"+val("d-notes"):"")+(withPh&&photos.length?"\n\nPHOTOS\nI have "+photos.length+" photo"+(photos.length>1?"s":"")+" to send in this chat.":"")}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function sms(m){return"sms:"+NUM+"?&body="+encodeURIComponent(m)}
function copy(t,b){var o=b.textContent;function ok(){b.textContent="Copied";setTimeout(function(){b.textContent=o},1800)}function fb(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy");ok()}catch(e){}a.remove()}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fb);else fb()}
function review(){var T=totals(),s=$('input[name="slot"]:checked');
 $("#rv-serv").innerHTML=T.L.map(function(l){return"<dt>"+(l.q?l.n+" &times; ":"")+esc(l.name)+"</dt><dd>"+(l.kind=="Heavy"?"Specialty Handling &amp; Disposal":l.kind)+(l.q?" &middot; "+money(l.line):"")+"</dd>"}).join("")+(T.loads?"<dt>Estimated Total</dt><dd>"+money(T.total)+"</dd>":"");
 $("#rv-det").innerHTML="<dt>Name</dt><dd>"+esc(val("d-name"))+"</dd><dt>Phone</dt><dd>"+esc(val("d-phone"))+"</dd>"+(val("d-email")?"<dt>Email</dt><dd>"+esc(val("d-email"))+"</dd>":"")+"<dt>Address</dt><dd>"+esc(val("d-addr"))+"</dd><dt>Property</dt><dd>"+esc(val("d-type"))+"</dd><dt>Junk is</dt><dd>"+esc(val("d-access"))+"</dd><dt>When</dt><dd>"+esc(pretty(val("d-date")))+", "+(s?SLOTS[s.value]:"")+"</dd>"+(val("d-notes")?"<dt>Notes</dt><dd>"+esc(val("d-notes"))+"</dd>":"")+(photos.length?"<dt>Photos</dt><dd>"+photos.length+" added</dd>":"");
 var m=message(true);$("#bkSend").href=sms(m);$("#bkCopy").onclick=function(){copy(m,this)};$("#bkCopy2").onclick=function(){copy(m,this)}}
$("#bkSend").addEventListener("click",function(e){var body=message(false),can=photos.length&&navigator.canShare&&navigator.share&&navigator.canShare({files:photos});
 if(can){e.preventDefault();navigator.share({title:"The Junk Man booking request",text:body,files:photos}).then(thanks).catch(function(err){if(err&&err.name==="AbortError")return;location.href=sms(message(true));thanks()})}else thanks()});
function thanks(){setTimeout(function(){show(5,true);var p=$("#p5");scrollTo({top:$("#wizard").getBoundingClientRect().top+pageYOffset-80,behavior:"smooth"});try{p.focus({preventScroll:true})}catch(e){}},400)}
var q=new URLSearchParams(location.search).get("service");
render();show(1,true);
})();
