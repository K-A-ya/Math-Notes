// topic 4: probability. binomial bars + normal curve with shaded area
// Phi = area under the standard normal up to z. uses an erf approximation (good to about 1e-7), plenty for us
const Phi=z=>{const t=1/(1+.3275911*Math.abs(z)/Math.SQRT2),y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-z*z/2);return .5*(1+(z<0?-y:y))};
PAGES.stats={t:'Probability',n:'4',h:()=>`<h1>Probability &amp; statistics</h1>
<div class="f">P(A | B) = ${fr('P(A ∩ B)','P(B)')} &nbsp;&nbsp; P(A | B) = ${fr('P(B | A)P(A)','P(B)')} <small>Bayes</small></div>
<div class="f">E(X) = Σ x·P(X = x) &nbsp;&nbsp; Var(X) = E(X²) − [E(X)]²</div>
<h2>Binomial</h2>
<p>Fixed number of trials n, two outcomes, same p each time, trials independent.</p>
<div class="f">X ~ B(n, p): &nbsp; P(X = r) = <sup>n</sup>C<sub>r</sub> p<sup>r</sup>(1 − p)<sup>n−r</sup> &nbsp;&nbsp; E(X) = np &nbsp;&nbsp; Var(X) = np(1 − p)</div>
<div class="card">${rng('bn','n',1,40,12)}${rng('bp','p',0.01,0.99,0.35,.01)}<div class="out" id="o1"></div><canvas id="cb" width="720" height="360"></canvas>
<small>Pink bars sit within one standard deviation of the mean.</small></div>
<h2>Normal</h2>
<div class="f">X ~ N(μ, σ²) &nbsp;&nbsp; z = ${fr('x − μ','σ')}</div>
<div class="card">${rng('nm','mean μ',0,100,50)}${rng('ns','std dev σ',1,20,10)}${rng('na','lower bound a',0,100,40)}${rng('nb','upper bound b',0,100,65)}
<div class="out" id="o2"></div><canvas id="cn" width="720" height="360"></canvas>
<small>About 68% lies within 1σ of μ, 95% within 2σ, 99.7% within 3σ. Set a and b to μ ± σ to see it.</small></div>`,
go(){
  // --- binomial ---
  const n=N('bn'),p=N('bp'),sd=Math.sqrt(n*p*(1-p));
  const C=(n,r)=>{let c=1;for(let i=1;i<=r;i++)c*=(n-r+i)/i;return c};      // nCr built up step by step so nothing overflows
  const pm=[...Array(n+1)].map((_,r)=>C(n,r)*p**r*(1-p)**(n-r)),mx=Math.max(...pm);
  $('#o1').innerHTML=`E(X) = np = <b>${f2(n*p)}</b> &nbsp; Var(X) = <b>${f2(sd*sd)}</b> &nbsp; σ = <b>${f2(sd)}</b>`;
  plot($('#cb'),[-1,n+1,-mx*.1,mx*1.15],[],(c,X,Y)=>pm.forEach((v,r)=>{
    c.fillStyle=Math.abs(r-n*p)<=sd?css('--p'):css('--b');c.fillRect(X(r-.4),Y(v),X(.8)-X(0),Y(0)-Y(v))}));
  // --- normal ---
  const mu=N('nm'),sg=N('ns'),a=Math.min(N('na'),N('nb')),b=Math.max(N('na'),N('nb'));
  const pdf=x=>Math.exp(-0.5*((x-mu)/sg)**2)/(sg*Math.sqrt(2*Math.PI)),pk=pdf(mu);
  $('#o2').innerHTML=`z-scores: <b>${f2((a-mu)/sg)}</b> to <b>${f2((b-mu)/sg)}</b> &nbsp; P(${a} &lt; X &lt; ${b}) = Φ(z<sub>b</sub>) − Φ(z<sub>a</sub>) = <b>${f2((Phi((b-mu)/sg)-Phi((a-mu)/sg))*100)}%</b>`;
  plot($('#cn'),[mu-4*sg,mu+4*sg,-pk*.1,pk*1.15],[{f:pdf,col:css('--y')}],(c,X,Y)=>{
    c.fillStyle=css('--y');c.globalAlpha=.3;c.beginPath();c.moveTo(X(a),Y(0));
    for(let x=a;x<=b;x+=sg/50)c.lineTo(X(x),Y(pdf(x)));      // walk along the curve, then drop back down to the axis
    c.lineTo(X(b),Y(pdf(b)));c.lineTo(X(b),Y(0));c.fill();c.globalAlpha=1})}};
