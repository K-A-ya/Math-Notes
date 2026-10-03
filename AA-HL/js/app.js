// router + sidebar + theme toggle, load this LAST
// the hash (#trig etc) picks the page so no server is needed
function route(keepScroll){
  const k=PAGES[location.hash.slice(1)]?location.hash.slice(1):'home',p=PAGES[k];
  $('#app').innerHTML=p.h();
  document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.hash=='#'+k));
  // keeps the little number next to each slider in sync, then redraws the page's graphs
  const run=()=>{document.querySelectorAll('input[type=range]').forEach(r=>{const o=$('#'+r.id+'O');if(o)o.textContent=r.value});p.go&&p.go()};
  $('#app').oninput=run;run();
  if(!keepScroll)scrollTo(0,0);
}
$('#nav').innerHTML='<div class="brand">AA HL<small>IB maths notes</small></div>'+
  Object.entries(PAGES).map(([k,p])=>`<a href="#${k}"><i>${p.n||''}</i>${p.t}</a>`).join('')+
  '<button id="th" aria-label="Toggle light and dark">Light / dark</button>';
// if nobody picked a theme yet, ask the OS what it's using, then flip it
$('#th').onclick=()=>{const d=document.documentElement,
  dark=d.dataset.theme?d.dataset.theme=='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  d.dataset.theme=dark?'light':'dark';route(true)};
addEventListener('hashchange',()=>route());route();
