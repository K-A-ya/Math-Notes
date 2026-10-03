// topic 1: sequences, series, binomial theorem
PAGES.series={t:'Sequences & series',n:'1',h:()=>`<h1>Sequences &amp; series</h1>
<p>A <b>sequence</b> is a list that follows a rule. A <b>series</b> is what you get when you add the terms up.</p>
<h2>Arithmetic: add the same d each time</h2>
<div class="f">u<sub>n</sub> = u<sub>1</sub> + (n − 1)d</div>
<div class="f">S<sub>n</sub> = ${fr('n','2')}(2u<sub>1</sub> + (n − 1)d)</div>
<h2>Geometric: multiply by the same r each time</h2>
<div class="f">u<sub>n</sub> = u<sub>1</sub>r<sup>n−1</sup></div>
<div class="f">S<sub>n</sub> = ${fr('u<sub>1</sub>(1 − r<sup>n</sup>)','1 − r')} &nbsp;&nbsp; S<sub>∞</sub> = ${fr('u<sub>1</sub>','1 − r')} &nbsp;(only if |r| &lt; 1)</div>
<h2>Binomial theorem</h2>
<div class="f">(a + b)<sup>n</sup> = Σ<sub>r=0</sub><sup>n</sup> <sup>n</sup>C<sub>r</sub> a<sup>n−r</sup>b<sup>r</sup> &nbsp;&nbsp; <sup>n</sup>C<sub>r</sub> = ${fr('n!','r!(n − r)!')}</div>
<div class="card"><div class="row">${inp('s1','u₁',3,.5)}${inp('sd','d (AP)',2,.5)}${inp('sr','r (GP)',0.6,.1)}</div>${rng('sn','n (number of terms)',2,30,10)}
<div class="out" id="o"></div><canvas id="cv" width="720" height="420"></canvas>
<small>Bars are the GP's partial sums S<sub>n</sub>. Dashed line is S<sub>∞</sub>, where they're heading when |r| &lt; 1. Try r = 1.2 and watch it never settle.</small></div>`,
go(){const u=N('s1'),d=N('sd'),r=N('sr'),n=N('sn'),conv=Math.abs(r)<1;
  const an=u+(n-1)*d, sa=n/2*(2*u+(n-1)*d), gn=u*r**(n-1), sg=r==1?u*n:u*(1-r**n)/(1-r); // r=1 breaks the formula (divide by 0), so special case
  $('#o').innerHTML=`<b>AP</b>: u<sub>${n}</sub> = ${f2(an)}, S<sub>${n}</sub> = ${f2(sa)}<br><b>GP</b>: u<sub>${n}</sub> = ${f2(gn)}, S<sub>${n}</sub> = ${f2(sg)}`+(conv?`, S<sub>∞</sub> = <b>${f2(u/(1-r))}</b>`:' (no S∞ since |r| ≥ 1)');
  let s=0;const S=[...Array(n)].map((_,i)=>s+=u*r**i);                    // running total = partial sums
  const lo=Math.min(0,...S),hi=Math.max(0,...S,conv?u/(1-r):0),p=(hi-lo)*.1||1;
  plot($('#cv'),[0,n+1,lo-p,hi+p],[],(c,X,Y)=>{
    c.fillStyle=css('--b');c.globalAlpha=.8;
    S.forEach((v,i)=>c.fillRect(X(i+.65),Y(Math.max(v,0)),X(.7)-X(0),Math.abs(Y(v)-Y(0))));c.globalAlpha=1;
    if(conv){c.setLineDash([8,6]);c.strokeStyle=css('--y');c.lineWidth=3;c.beginPath();c.moveTo(0,Y(u/(1-r)));c.lineTo(9999,Y(u/(1-r)));c.stroke();c.setLineDash([])}})}};
