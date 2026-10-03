// topic 2: functions + transformations (uses parse() and plot() from helpers)
PAGES.functions={t:'Functions',n:'2',h:()=>`<h1>Functions</h1>
<p>A function sends every input x to exactly one output f(x). <b>Domain</b> = allowed inputs, <b>range</b> = outputs you actually get.</p>
<div class="f">(f ∘ g)(x) = f(g(x))</div>
<p>To find the inverse f<sup>−1</sup>: swap x and y, then solve for y. On a graph it's f reflected in the line y = x.</p>
<h2>Quadratics</h2>
<div class="f">x = ${fr('−b ± '+sq('b² − 4ac'),'2a')} &nbsp;&nbsp; Δ = b² − 4ac</div>
<p>Δ &gt; 0 gives two real roots, Δ = 0 one repeated root, Δ &lt; 0 no real roots. Vertex form is f(x) = a(x − h)² + k with vertex (h, k).</p>
<h2>Transformations</h2>
<div class="f">y = a · f( b(x − c) ) + d</div>
<p><b>a</b> stretches vertically (negative flips over the x-axis). <b>b</b> stretches horizontally by factor 1/b (negative flips over the y-axis). <b>c</b> slides right. <b>d</b> slides up.</p>
<div class="card"><label>f(x) = <input id="fx" type="text" value="x^3 - 3x"></label>
${rng('ta','a',-3,3,1,.1)}${rng('tb','b',-3,3,1,.1)}${rng('tc','c',-5,5,0,.5)}${rng('td','d',-5,5,0,.5)}
<div class="out" id="o"></div><canvas id="cv" width="720" height="420"></canvas>
<small>Grey is your f(x), yellow is the transformed one. Try f(x) = 1/(x-1) to see how asymptotes move too.</small></div>`,
go(){const f=parse($('#fx').value),a=N('ta'),b=N('tb'),c=N('tc'),d=N('td');
  if(!f){$('#o').textContent="can't read that function, check the brackets";return}
  $('#o').innerHTML=`y = <b>${a}</b> · f( <b>${b}</b>(x − <b>${c}</b>) ) + <b>${d}</b>`;
  plot($('#cv'),[-8,8,-6,6],[{f,col:css('--mut')},{f:x=>a*f(b*(x-c))+d,col:css('--y')}])}};
