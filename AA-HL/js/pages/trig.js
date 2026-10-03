// topic 3: trig. unit circle on the left, sin/cos waves on the right, all hand-drawn on canvas
const EX=[['0°','0','1','0'],['30°',fr(1,2),fr(sq(3),2),fr(sq(3),3)],['45°',fr(sq(2),2),fr(sq(2),2),'1'],['60°',fr(sq(3),2),fr(1,2),sq(3)],['90°','1','0','—']];
PAGES.trig={t:'Trigonometry',n:'3',h:()=>`<h1>Trigonometry</h1>
<p>π radians = 180°. Arc length is l = rθ and sector area is ½r²θ, but only when θ is in radians.</p>
<div class="f">sin²θ + cos²θ = 1 &nbsp;&nbsp; tan θ = ${fr('sin θ','cos θ')}</div>
<div class="f">sin 2θ = 2 sin θ cos θ &nbsp;&nbsp; cos 2θ = cos²θ − sin²θ = 2cos²θ − 1 = 1 − 2sin²θ</div>
<div class="f">sin(A ± B) = sin A cos B ± cos A sin B &nbsp;&nbsp; cos(A ± B) = cos A cos B ∓ sin A sin B</div>
<h2>Triangles</h2>
<div class="f">${fr('a','sin A')} = ${fr('b','sin B')} = ${fr('c','sin C')} &nbsp;&nbsp; c² = a² + b² − 2ab cos C &nbsp;&nbsp; Area = ½ab sin C</div>
<h2>Exact values (learn these, Paper 1 loves them)</h2>
<table><tr><th>θ</th><th>sin θ</th><th>cos θ</th><th>tan θ</th></tr>${EX.map(r=>`<tr><td>${r.join('</td><td>')}</td></tr>`).join('')}</table>
<div class="card">${rng('td','θ (degrees)',0,360,50)}<div class="out" id="o"></div><canvas id="cv" width="720" height="420"></canvas>
<small>Blue = cos θ (the x-coordinate), pink = sin θ (the y-coordinate). The waves on the right are the same numbers unrolled.</small></div>`,
go(){const d=N('td'),t=rad(d),s=Math.sin(t),co=Math.cos(t),c=$('#cv').getContext('2d'),cx=190,cy=210,R=140;
  const px=cx+R*co,py=cy-R*s;                                  // minus because canvas y goes DOWN
  const wx=a=>400+a/360*300, wy=v=>cy-v*R;
  c.clearRect(0,0,720,420);c.lineWidth=1.5;c.strokeStyle=css('--bd');
  c.beginPath();c.moveTo(30,cy);c.lineTo(350,cy);c.moveTo(cx,50);c.lineTo(cx,370);c.moveTo(400,cy);c.lineTo(700,cy);c.stroke();
  c.setLineDash([5,5]);c.beginPath();c.moveTo(wx(d),40);c.lineTo(wx(d),380);c.stroke();c.setLineDash([]);
  c.strokeStyle=css('--fg');c.lineWidth=2;c.beginPath();c.arc(cx,cy,R,0,7);c.stroke();
  c.lineWidth=4;c.strokeStyle=css('--b');c.beginPath();c.moveTo(cx,cy);c.lineTo(px,cy);c.stroke();
  c.strokeStyle=css('--p');c.beginPath();c.moveTo(px,cy);c.lineTo(px,py);c.stroke();
  c.strokeStyle=css('--y');c.lineWidth=3;c.beginPath();c.moveTo(cx,cy);c.lineTo(px,py);c.stroke();
  c.fillStyle=css('--y');c.beginPath();c.arc(px,py,8,0,7);c.fill();
  for(const[f,col]of[[Math.sin,'--p'],[Math.cos,'--b']]){          // one loop draws both waves + their dots
    c.strokeStyle=css(col);c.lineWidth=2.5;c.beginPath();
    for(let a=0;a<=360;a+=3){const X=wx(a),Y=wy(f(rad(a)));a?c.lineTo(X,Y):c.moveTo(X,Y)}c.stroke();
    c.fillStyle=css(col);c.beginPath();c.arc(wx(d),wy(f(t)),6,0,7);c.fill()}
  $('#o').innerHTML=`θ = <b>${d}°</b> = <b>${f2(t/Math.PI)}π</b> rad<br>sin θ = <b>${f2(s)}</b> &nbsp; cos θ = <b>${f2(co)}</b> &nbsp; tan θ = <b>${Math.abs(co)<1e-9?'undefined':f2(s/co)}</b><br>sin²θ + cos²θ = <b>${f2(s*s+co*co)}</b> &nbsp; sin 2θ = <b>${f2(Math.sin(2*t))}</b> = 2 sin θ cos θ = <b>${f2(2*s*co)}</b>`}};
