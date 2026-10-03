// shared toolbox, load this FIRST
const $=q=>document.querySelector(q), N=id=>parseFloat($('#'+id).value)||0, f2=x=>(+x).toFixed(2);
// canvas can't see css variables, so we grab the colours by hand
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const rad=d=>d*Math.PI/180, deg=r=>r*180/Math.PI;
const inp=(id,l,v,s=1)=>`<label>${l}<input id=${id} type=number value=${v} step=${s}></label>`;
const rng=(id,l,a,b,v,s=1)=>`<label>${l}: <b id=${id}O>${v}</b><input id=${id} type=range min=${a} max=${b} value=${v} step=${s}></label>`;
const fr=(a,b)=>`<span class=fr><span>${a}</span><span>${b}</span></span>`; // stacked fraction
const sq=x=>`√<span class=sq>${x}</span>`;
const PAGES={}; // every file in js/pages/ adds itself in here

// turns "2x^2 - 3x" into a real js function. new Function is fine here, it only runs in the student's own browser
function parse(s){
  s=s.replace(/(^|[(,])\s*-/g,'$1-1*')            // js throws a fit at -x**2, this dodges it
     .replace(/\^/g,'**')
     .replace(/(\d)\s*([a-zA-Z(])/g,'$1*$2')      // 2x -> 2*x
     .replace(/\)\s*([a-zA-Z(\d])/g,')*$1')       // (x)(x+1) -> (x)*(x+1)
     .replace(/\bx\s*\(/g,'x*(')
     .replace(/\bln\(/g,'LN(').replace(/\blog\(/g,'log10(').replace(/LN\(/g,'log('); // IB: ln is natural, log is base 10
  try{const g=new Function('x','e','pi','with(Math){return '+s+'}');g(1,Math.E,Math.PI);return x=>g(x,Math.E,Math.PI)}
  catch(_){return null}
}

// samples the curve to pick a y-range that actually shows it
function autoY(f,x0,x1){let lo=1e9,hi=-1e9;
  for(let i=0;i<=200;i++){let y;try{y=f(x0+(x1-x0)*i/200)}catch(_){continue}
    if(isFinite(y)&&Math.abs(y)<1e3){lo=Math.min(lo,y);hi=Math.max(hi,y)}}
  if(lo>hi)return[-5,5];lo=Math.min(lo,0);hi=Math.max(hi,0);const p=(hi-lo)*.1||1;return[lo-p,hi+p]}

// mini graphing engine: grid, axes, any number of curves. extra() lets a page draw its own stuff on top
function plot(cv,v,items,extra){
  const c=cv.getContext('2d'),W=cv.width,H=cv.height,[x0,x1,y0,y1]=v;
  const X=x=>(x-x0)/(x1-x0)*W, Y=y=>H-(y-y0)/(y1-y0)*H;      // maths coords -> pixels (y flipped)
  const nice=r=>{const p=10**Math.floor(Math.log10(r/6)),m=r/6/p;return p*(m<1.5?1:m<3.5?2:m<7.5?5:10)}; // grid step of 1, 2 or 5 x 10^k
  c.clearRect(0,0,W,H);c.font='13px sans-serif';c.lineWidth=1;
  for(const[a,b,ax]of[[x0,x1,0],[y0,y1,1]]){const s=nice(b-a);
    for(let t=Math.ceil(a/s)*s;t<=b;t+=s){const p=ax?Y(t):X(t);
      c.strokeStyle=css('--bd');c.beginPath();ax?(c.moveTo(0,p),c.lineTo(W,p)):(c.moveTo(p,0),c.lineTo(p,H));c.stroke();
      if(Math.abs(t)>1e-9){c.fillStyle=css('--mut');ax?c.fillText(+t.toFixed(4),X(0)+4,p-3):c.fillText(+t.toFixed(4),p+3,Y(0)+14)}}}
  c.strokeStyle=css('--fg');c.lineWidth=2;c.beginPath();c.moveTo(0,Y(0));c.lineTo(W,Y(0));c.moveTo(X(0),0);c.lineTo(X(0),H);c.stroke();
  for(const{f,col}of items){c.strokeStyle=col;c.lineWidth=3;c.beginPath();let up=false,py=0;
    for(let i=0;i<=W;i+=2){let y;try{y=f(x0+(x1-x0)*i/W)}catch(_){y=NaN}
      if(!isFinite(y)){up=false;continue}
      const p=Y(y);
      (up&&Math.abs(p-py)<H)?c.lineTo(i,p):c.moveTo(i,p); // huge jump = asymptote, so lift the pen
      up=true;py=p}
    c.stroke()}
  extra&&extra(c,X,Y);
}
