// topic 1: complex numbers
PAGES.complex={t:'Complex numbers',n:'1',h:()=>`<h1>Complex numbers</h1>
<p>i is defined by i² = −1. A complex number lives on a plane called the <b>Argand diagram</b>: real part across, imaginary part up.</p>
<div class="f">z = a + bi = r(cos θ + i sin θ) = r cis θ = re<sup>iθ</sup></div>
<div class="f">r = |z| = ${sq('a² + b²')} &nbsp;&nbsp; θ = arg z = tan<sup>−1</sup>${fr('b','a')} <small>(check the quadrant)</small></div>
<div class="f">z<sup>n</sup> = r<sup>n</sup> cis(nθ) &nbsp;&nbsp; <small>de Moivre</small></div>
<div class="f">z<sup>1/n</sup> = r<sup>1/n</sup> cis ${fr('θ + 2πk','n')} &nbsp;, k = 0, 1, …, n−1</div>
<div class="card"><div class="row">${inp('za','a (real)',1,.5)}${inp('zb','b (imaginary)',1.5,.5)}</div>${rng('zn','n',1,8,3)}
<div class="out" id="o"></div><canvas id="cv" width="720" height="420"></canvas>
<small>Yellow is z. Pink dots are its n-th roots: always evenly spaced, 2π/n apart, on a circle of radius r<sup>1/n</sup>.</small></div>`,
go(){const a=N('za'),b=N('zb'),n=N('zn'),r=Math.hypot(a,b),t=Math.atan2(b,a); // atan2 sorts the quadrant out for us
  const zr=r**n*Math.cos(n*t),zi=r**n*Math.sin(n*t);
  $('#o').innerHTML=`r = <b>${f2(r)}</b>, θ = <b>${f2(t)}</b> rad (${f2(deg(t))}°)<br>z<sup>${n}</sup> = <b>${f2(zr)} ${zi<0?'−':'+'} ${f2(Math.abs(zi))}i</b>`;
  const R=r**(1/n),m=Math.max(r,R,.5)*1.35,asp=720/420;                       // same scale on both axes so the circle is round
  const roots=[...Array(n)].map((_,k)=>{const g=(t+2*Math.PI*k)/n;return[R*Math.cos(g),R*Math.sin(g)]});
  plot($('#cv'),[-m*asp,m*asp,-m,m],[],(c,X,Y)=>{
    c.strokeStyle=css('--mut');c.setLineDash([5,5]);c.lineWidth=1.5;c.beginPath();c.ellipse(X(0),Y(0),X(R)-X(0),Y(0)-Y(R),0,0,7);c.stroke();c.setLineDash([]);
    c.strokeStyle=css('--p');c.lineWidth=2;c.beginPath();roots.forEach(([x,y],i)=>i?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y)));c.closePath();c.stroke();
    c.fillStyle=css('--p');roots.forEach(([x,y])=>{c.beginPath();c.arc(X(x),Y(y),6,0,7);c.fill()});
    c.strokeStyle=css('--y');c.lineWidth=3;c.beginPath();c.moveTo(X(0),Y(0));c.lineTo(X(a),Y(b));c.stroke();
    c.fillStyle=css('--y');c.beginPath();c.arc(X(a),Y(b),7,0,7);c.fill();c.font='bold 16px serif';c.fillText('z',X(a)+10,Y(b)-8)})}};
