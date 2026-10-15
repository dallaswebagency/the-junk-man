/* The Junk Man booking: builds a text request, no server */
(function(){
var NUM="+14037977145";
var SVC=[["Junk removal","Homes, garages, yards",1],["Moving and hauling","Local and long distance",0],["Commercial cleanout","Offices, rentals, sites",1],["Garbage pickup","Weekly or monthly",0],["Snow removal","Driveways, walkways",0],["Holiday lighting","Install and takedown",0]];
var SIZE=[["Small load",79,"A few items"],["1/8 truck",149,"A few pieces"],["1/4 truck",229,"A small room"],["1/2 truck",390,"A garage corner"],["3/4 truck",580,"A big cleanout"],["Full truck",699,"A whole house"]];
var ITEMS=["Furniture","Appliances","Mattresses","Yard waste","Construction debris","Electronics","Boxes and bags","Hot tub or heavy item","Estate cleanout"];
var TIME=[["Morning","Before noon"],["Afternoon","Noon to 4"],["Evening","After 4"],["Flexible","Any time"],["ASAP","Same day if possible"]];
var st={svc:-1,size:-1,items:{},biz:false,time:-1},step=1;
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var form=$("#bkForm");if(!form)return;
function radios(host,rows,key,fn){host.innerHTML=rows.map(function(r,i){return fn(r,i)}).join("");host.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;st[key]=+b.dataset.i;$$("button",host).forEach(function(x){x.setAttribute("aria-checked",x===b?"true":"false")});render()})}
radios($("#bkSvc"),SVC,"svc",function(r,i){return'<button type="button" role="radio" aria-checked="false" data-i="'+i+'"><b>'+r[0]+'</b><small>'+r[1]+'</small></button>'});
radios($("#bkSize"),SIZE,"size",function(r,i){return'<button type="button" role="radio" aria-checked="false" data-i="'+i+'"><span>'+r[0]+'</span><b>$'+r[1]+'</b><small>'+r[2]+'</small></button>'});
radios($("#bkTime"),TIME,"time",function(r,i){return'<button type="button" role="radio" aria-checked="false" data-i="'+i+'"><b>'+r[0]+'</b><small>'+r[1]+'</small></button>'});
$("#bkItems").innerHTML=ITEMS.map(function(t){return'<button type="button" aria-pressed="false">'+t+'</button>'}).join("");
$("#bkItems").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);st.items[b.textContent]=on;render()});
$("#bkBiz").addEventListener("change",function(){st.biz=this.checked;render()});
function items(){return Object.keys(st.items).filter(function(k){return st.items[k]})}
function render(){var p=$("#bkPrice"),L=$("#bkLines"),h="";
 if(st.size<0){p.textContent="Pick a size"}else{p.textContent="From $"+SIZE[st.size][1]}
 if(st.svc>=0)h+="<li><span>Service</span><b>"+SVC[st.svc][0]+"</b></li>";
 if(st.size>=0)h+="<li><span>Load</span><b>"+SIZE[st.size][0]+"</b></li>";
 if(items().length)h+="<li><span>Items</span><b>"+items().length+" types</b></li>";
 L.innerHTML=h;$("#bkDisc").hidden=!st.biz;
 $("#bkSub").textContent=st.size<0?"Starting prices include loading and cleanup.":"Includes loading and cleanup. Final price confirmed by text."}
function val(id){return($("#"+id).value||"").trim()}
function bad(id,on){$("#"+id).classList.toggle("bad",on)}
function check(n){var e=$("#e"+n),m="";
 if(n==1){if(st.svc<0)m="Please choose a service.";else if(st.size<0)m="Please pick the closest load size."}
 if(n==2){["fName","fPhone","fAddr"].forEach(function(i){bad(i,!val(i))});
  if(!val("fName")||!val("fPhone")||!val("fAddr"))m="Please fill in your name, phone and address.";
  else if(val("fPhone").replace(/\D/g,"").length<10){m="Please enter a phone number with area code.";bad("fPhone",true)}}
 if(n==3){bad("fDate",!val("fDate"));if(!val("fDate"))m="Please choose a preferred date.";else if(st.time<0)m="Please choose a time of day."}
 e.textContent=m;return!m}
function show(n){step=n;$$(".bk-step").forEach(function(s){s.classList.toggle("on",+s.dataset.step===n)});
 $$("#bkProg li").forEach(function(li,i){li.classList.toggle("on",i+1===n);li.classList.toggle("ok",i+1<n)});
 $("#bkDone").hidden=true;if(n==4)summary();
 var t=$("#bkProg");if(t&&t.getBoundingClientRect().top<0)t.scrollIntoView({behavior:"smooth",block:"start"})}
form.addEventListener("click",function(e){if(e.target.closest("[data-next]")){if(check(step))show(step+1)}else if(e.target.closest("[data-back]"))show(step-1)});
var d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());var today=d.toISOString().slice(0,10);$("#fDate").min=today;$("#fDate2").min=today;
$("#fPhotos").addEventListener("change",function(){var f=this.files;if(f.length>6){this.value="";$("#fCount").textContent="Please pick up to 6 photos.";return}
 $("#fCount").textContent=f.length?f.length+" photo"+(f.length>1?"s":"")+" selected":"Add photos of the pile for a firmer price"});
function fmt(s){if(!s)return"";var p=s.split("-");return new Date(+p[0],p[1]-1,+p[2]).toLocaleDateString("en-CA",{weekday:"short",month:"short",day:"numeric"})}
function rows(){var r=[["Service",SVC[st.svc][0]],["Load size",SIZE[st.size][0]+" (from $"+SIZE[st.size][1]+")"]];
 if(items().length)r.push(["Items",items().join(", ")]);if(st.biz)r.push(["Customer","Realtor, landlord or business"]);
 r.push(["Name",val("fName")],["Phone",val("fPhone")]);if(val("fEmail"))r.push(["Email",val("fEmail")]);
 r.push(["Address",val("fAddr")],["Property",$("#fProp").value],["Access",$("#fAccess").value]);
 r.push(["Preferred date",fmt(val("fDate"))],["Time",TIME[st.time][0]+" ("+TIME[st.time][1]+")"]);if(val("fDate2"))r.push(["Backup date",fmt(val("fDate2"))]);
 var n=$("#fPhotos").files.length;if(n)r.push(["Photos",n+" (attach in your text)"]);if(val("fNotes"))r.push(["Notes",val("fNotes")]);return r}
function text(){return"Booking request for The Junk Man\n"+rows().map(function(r){return r[0]+": "+r[1]}).join("\n")}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function summary(){$("#bkSum").innerHTML="<dl>"+rows().map(function(r){return"<dt>"+esc(r[0])+"</dt><dd>"+esc(r[1])+"</dd>"}).join("")+"</dl>";
 $("#bkSms").href="sms:"+NUM+"?&body="+encodeURIComponent(text())}
$("#bkSms").addEventListener("click",function(){setTimeout(function(){$$(".bk-step").forEach(function(s){s.classList.remove("on")});$("#bkDone").hidden=false;$$("#bkProg li").forEach(function(l){l.classList.add("ok");l.classList.remove("on")})},600)});
$("#bkCopy").addEventListener("click",function(){var b=this,t=text();function ok(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy details"},1800)}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fb);else fb();
 function fb(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy");ok()}catch(e){}a.remove()}});
form.addEventListener("submit",function(e){e.preventDefault()});
/* preselect from ?service= */
var q=new URLSearchParams(location.search).get("service");if(q){SVC.forEach(function(s,i){if(s[0].toLowerCase().indexOf(q.toLowerCase())===0){var b=$("#bkSvc button[data-i='"+i+"']");if(b)b.click()}})}
render();
})();
