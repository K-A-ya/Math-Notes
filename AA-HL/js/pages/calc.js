// topic 5: calculus. numeric derivative + trapezium rule, both drawn live
PAGES.calc={t:'Calculus',n:'5',h:()=>`<h1>Calculus</h1>
<p>Differentiation gives the gradient at a point. Integration adds up tiny slices to get area or total change. They undo each other.</p>
<div class="f">f′(x) = lim<sub>h→0</sub> ${fr('f(x + h) − f(x)','h')}</div>
<table><tr><th>f(x)</th><th>f′(x)</th><th>∫ f(x) dx</th></tr>
<tr><td>x<sup>n</sup></td><td>nx<sup>n−1</sup></td><td>${fr('x<sup>n+1</sup>','n + 1')} + C <small>(n ≠ −1)</small></td></tr>
<tr><td>e<sup>x</sup></td><td>e<sup>x</sup></td><td>e<sup>x</sup> + C</td></tr>
<tr><td>ln x</td><td>${fr('1','x')}</td><td>x ln x − x + C</td></tr>
<tr><td>${fr('1','x')}</td><td>−${fr('1','x²')}</td><td>ln|x| + C</td></tr>
<tr><td>sin x</td><td>cos x</td><td>−cos x + C</td></tr>
<tr><td>cos x</td><td>−sin x</td><td>sin x + C</td></tr>
<tr><td>tan x</td><td>sec²x</td><td>−ln|cos x| + C</td></tr></table>
<div class="f">Chain: ${fr('dy','dx')} = ${fr('dy','du')} × ${fr('du','dx')}</div>
<div class="f">Product: (uv)′ = uv′ + vu′ &nbsp;&nbsp; Quotient: (${fr('u','v')})′ = ${fr('vu′ − uv′','v²')}</div>
<div class="f">By parts: ∫ u ${fr('dv','dx')} dx = uv − ∫ v ${fr('du','dx')} dx</div>
<div class="f">Area = ∫<sub>a</sub><sup>b</sup> f(x) dx &nbsp;&nbsp; Volume of revolution = π∫<sub>a</sub><sup>b</sup> y² dx</div>
<div class="f">Maclaurin: f(x) = f(0) + f′(0)x + ${fr('f″(0)','2!')}x² + ${fr('f‴(0)','3!')}x³ + …</div>
<h2>Try it</h2>
<div class="card"><label>f(x) = <input id="cf" type="text" value="x^2/4 + sin(x)"></label>
<h2 style="margin-top:.6em">Tangent line</h2>${rng('cx','x',-6,6,1,.1)}<div class="out" id="o1"></div><canvas id="ct" width="720" height="360"></canvas>
<h2>Trapezium rule</h2><div class="row">${rng('ia','lower a',-6,6,0,.5)}${rng('ib','upper b',-6,6,4,.5)}</div>${rng('ik','trapeziums n',1,60,6)}
<div class="out" id="o2"></div><canvas id="ci" width="720" height="360"></canvas>
<small>More trapeziums, smaller error. When f is curving up, the trapezium rule overestimates.</small></div>`,
go(){const f=parse($('#cf').value);if(!f){$('#o1').textContent="can't read that function";return}
  const vy=autoY(f,-6,6);
  // tangent: central difference is a nice cheap derivative, f'(x) ~ (f(x+h) - f(x-h)) / 2h
  const x0=N('cx'),h=1e-5,m=(f(x0+h)-f(x0-h))/(2*h),y0=f(x0),Tg=x=>m*(x-x0)+y0;
  $('#o1').innerHTML=`f(${x0}) = <b>${f2(y0)}</b> &nbsp; f′(${x0}) ≈ <b>${f2(m)}</b><br>tangent: y = ${f2(m)}(x − ${x0}) + ${f2(y0)}`+(Math.abs(m)>1e-6?`<br>normal gradient = <b>${f2(-1/m)}</b>`:'<br><b>flat tangent: a stationary point</b>');
  plot($('#ct'),[-6,6,...vy],[{f,col:css('--y')},{f:Tg,col:css('--p')}],(c,X,Y)=>{c.fillStyle=css('--fg');c.beginPath();c.arc(X(x0),Y(y0),7,0,7);c.fill()});
  // trapezium rule
  let a=N('ia'),b=N('ib'),n=N('ik');if(a>b)[a,b]=[b,a];if(a==b)b=a+1;      // swap if backwards, widen if zero width
  const w=(b-a)/n,xs=[...Array(n+1)].map((_,i)=>a+i*w),Tz=w*((f(a)+f(b))/2+xs.slice(1,-1).reduce((s,x)=>s+f(x),0));
  const K=2000,hs=(b-a)/K;let S=f(a)+f(b);for(let i=1;i<K;i++)S+=f(a+i*hs)*(i%2?4:2);S*=hs/3; // simpson with loads of slices = our "exact" answer
  $('#o2').innerHTML=`trapezium rule: <b>${f2(Tz)}</b> &nbsp; accurate value ≈ <b>${f2(S)}</b> &nbsp; error ${f2(Math.abs(Tz-S))}`;
  plot($('#ci'),[-6,6,...vy],[{f,col:css('--y')}],(c,X,Y)=>{c.fillStyle=css('--b');c.strokeStyle=css('--b');c.lineWidth=1.5;
    for(let i=0;i<n;i++){c.beginPath();c.moveTo(X(xs[i]),Y(0));c.lineTo(X(xs[i]),Y(f(xs[i])));c.lineTo(X(xs[i+1]),Y(f(xs[i+1])));c.lineTo(X(xs[i+1]),Y(0));c.closePath();
      c.globalAlpha=.3;c.fill();c.globalAlpha=.9;c.stroke()}c.globalAlpha=1})}};
