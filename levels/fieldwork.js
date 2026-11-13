/* 現場操作小遊戲：
   1. 用滴管吸取幼蟲到玻璃瓶
   2. 在玻璃瓶中看游動的幼蟲做鑑定（可用放大鏡）
   3. 選擇清除積水或投藥，並實際操作
   這些函式在面板中的 #fw 區塊裡運作。 */
window.FW=(function(){
const R=Math.random,PI=Math.PI;let token=0;
const $=id=>document.getElementById(id);
const open=()=>$('panel').classList.contains('open');
const snd=(a,b,c,d)=>{try{burst(a,b,c,d);}catch(e){}};
const CANVAS='style="touch-action:none;display:block;border:1px solid #2c3a3d;background:#0b1113;cursor:none"',CANVAS_P=CANVAS.replace('cursor:none','cursor:default');
/* 讓畫布在 .fwc 內等比例填滿 */
function fit(c){const b=c.parentElement;if(!b)return;const W=b.clientWidth,H=b.clientHeight;if(!W||!H)return;const a=c.width/c.height;let w=W,h=W/a;if(h>H){h=H;w=H*a;}w=Math.floor(w)-2;h=Math.floor(h)-2;if(c._w!==w||c._h!==h){c.style.width=w+'px';c.style.height=h+'px';c._w=w;c._h=h;}}
function host(html){$('pn').classList.add('game');$('fw').innerHTML=html;document.querySelectorAll('#fw canvas').forEach(fit);}
function pointer(c,st){
  const pos=e=>{const r=c.getBoundingClientRect(),p=e.touches&&e.touches[0]?e.touches[0]:e;st.x=(p.clientX-r.left)*c.width/r.width;st.y=(p.clientY-r.top)*c.height/r.height;st.seen=true;};
  c.onmousemove=pos;c.onmousedown=e=>{pos(e);st.down=true;st.tap=true;};c.onmouseup=()=>st.down=false;c.onmouseleave=()=>{st.down=false;st.out=true;};c.onmouseenter=()=>st.out=false;
  c.ontouchstart=e=>{e.preventDefault();pos(e);st.down=true;st.tap=true;st.out=false;};c.ontouchmove=e=>{e.preventDefault();pos(e);};c.ontouchend=e=>{e.preventDefault();st.down=false;};
}
function loop(tk,fn){let last=performance.now();(function f(now){if(tk!==token||!open())return;const dt=Math.min(.05,(now-last)/1000);last=now;document.querySelectorAll('#fw canvas').forEach(fit);fn(dt,now/1000);requestAnimationFrame(f);})(last);}
const SP={aedes:{len:.17,w:.075,tufts:1,hang:.25},culex:{len:.38,w:.04,tufts:4,hang:.7}};
/* 幼蟲：原點在呼吸管末端，+x 指向頭部 */
function larva(g,o){const L=o.L,sp=SP[o.sp],sl=sp.len*L,sw=Math.max(1.2,sp.w*L);g.save();g.translate(o.x,o.y);g.rotate(o.ang);
  const N=12,P=[];for(let i=0;i<=N;i++){const f=i/N;P.push([sl+(L-sl)*f,Math.sin(o.t*o.fr-f*4)*o.amp*(1-f*.5)*L*.09]);}
  const body='rgba(122,98,70,.92)',dark='rgba(52,36,22,.95)';
  g.lineCap='round';g.strokeStyle=dark;g.lineWidth=sw;g.beginPath();g.moveTo(0,0);g.lineTo(sl,P[0][1]);g.stroke();
  g.strokeStyle='rgba(230,215,190,.85)';g.lineWidth=Math.max(.8,L*.008);
  for(let k=0;k<sp.tufts;k++){const a=(.32+k*.16)*sl,yy=P[0][1]*(a/sl);g.beginPath();g.moveTo(a,yy-sw/2);g.lineTo(a+L*.02,yy-sw/2-L*.07);g.moveTo(a,yy-sw/2);g.lineTo(a-L*.015,yy-sw/2-L*.065);g.stroke();}
  g.strokeStyle='rgba(220,205,180,.6)';g.beginPath();g.moveTo(P[0][0],P[0][1]);g.lineTo(P[0][0]-L*.06,P[0][1]+L*.07);g.moveTo(P[0][0],P[0][1]);g.lineTo(P[0][0]-L*.04,P[0][1]+L*.09);g.stroke();
  for(let i=0;i<N-2;i++){const f=i/N,r=L*(.03+.035*f);g.fillStyle=body;g.beginPath();g.ellipse(P[i][0],P[i][1],r*1.05,r,0,0,7);g.fill();
    if(i%2===0){g.strokeStyle='rgba(210,195,170,.45)';g.lineWidth=.8;g.beginPath();g.moveTo(P[i][0],P[i][1]-r);g.lineTo(P[i][0]+L*.01,P[i][1]-r-L*.05);g.moveTo(P[i][0],P[i][1]+r);g.lineTo(P[i][0]+L*.01,P[i][1]+r+L*.05);g.stroke();}}
  const th=P[N-2],hd=P[N];g.fillStyle='rgba(140,112,80,.95)';g.beginPath();g.ellipse(th[0],th[1],L*.085,L*.075,0,0,7);g.fill();
  g.fillStyle=dark;g.beginPath();g.ellipse(hd[0],hd[1],L*.055,L*.05,0,0,7);g.fill();g.fillStyle='#000';g.beginPath();g.arc(hd[0]+L*.01,hd[1]-L*.025,L*.012,0,7);g.arc(hd[0]+L*.01,hd[1]+L*.025,L*.012,0,7);g.fill();
  g.strokeStyle='rgba(200,180,150,.6)';g.beginPath();g.moveTo(hd[0]+L*.05,hd[1]);g.lineTo(hd[0]+L*.09,hd[1]-L*.03);g.moveTo(hd[0]+L*.05,hd[1]);g.lineTo(hd[0]+L*.09,hd[1]+L*.03);g.stroke();
  g.restore();}
function pupa(g,o){g.save();g.translate(o.x,o.y);g.rotate(o.ang*.3+Math.sin(o.t*3)*.1);const s=o.L*.32;
  g.fillStyle='rgba(70,52,34,.95)';g.beginPath();g.ellipse(0,s*.6,s*.7,s*.6,0,0,7);g.fill();
  g.strokeStyle='rgba(90,68,44,.95)';g.lineWidth=s*.32;g.lineCap='round';g.beginPath();g.arc(s*.45,s*.9,s*.75,-.6,2.2);g.stroke();
  g.strokeStyle='rgba(40,30,20,.9)';g.lineWidth=2;g.beginPath();g.moveTo(-s*.2,0);g.lineTo(-s*.3,-s*.25);g.moveTo(s*.15,0);g.lineTo(s*.25,-s*.25);g.stroke();g.restore();}
/* 共用的幼蟲行為：倒吊在水面、受驚下潛、在底部停留、再浮上來 */
function mkLarva(sp,x,surf,L){return{sp,x,y:surf,surf,ang:PI/2-SP[sp].hang*(R()<.5?1:-1)*.8,base:0,L,t:R()*9,fr:5+R()*4,amp:.25,state:'hang',timer:2+R()*4,vx:0};}
function stepLarva(l,dt,box){l.t+=dt;const hang=PI/2-SP[l.sp].hang*Math.sign(Math.cos(l.ang)||1);
  if(l.state==='hang'){l.amp+=(.18-l.amp)*dt*3;l.y=l.surf;l.ang+=(hang-l.ang)*dt*2;l.x+=Math.sin(l.t*.7)*dt*4;l.timer-=dt;if(l.timer<0&&R()<.01){l.state='dive';}}
  else if(l.state==='dive'){l.amp=1.1;l.y+=(90+R()*50)*dt;l.ang+=(PI/2+Math.sin(l.t*9)*.5-l.ang)*dt*6;l.x+=Math.sin(l.t*11)*dt*40;if(l.y>box.bot-l.L*.95){l.state='bottom';l.timer=1.2+R()*2.4;}}
  else if(l.state==='bottom'){l.amp=.35;l.x+=Math.sin(l.t*1.3)*dt*12;l.ang+=(PI*.1*Math.sin(l.t*.5)+PI/2-l.ang)*dt;l.timer-=dt;if(l.timer<0)l.state='rise';}
  else if(l.state==='rise'){l.amp=.75;l.y-=(38+R()*24)*dt;l.ang+=(PI/2-l.ang)*dt*3;if(l.y<=l.surf){l.y=l.surf;l.state='hang';l.timer=2+R()*5;}}
  l.x=Math.max(box.x0+l.L*.3,Math.min(box.x1-l.L*.3,l.x));
  // 身體（含頭部與口刷）往下延伸約 1.15 倍體長，不讓牠超出容器底部
  const reach=l.L*(Math.max(.2,Math.sin(l.ang))*1.15+.06);if(l.y>box.bot-reach){l.y=box.bot-reach;if(l.state==='dive'){l.state='bottom';l.timer=1.2+R()*2.4;}}}
function scare(ls,x,y,r){ls.forEach(l=>{const cx=l.x+Math.cos(l.ang)*l.L*.5,cy=l.y+Math.sin(l.ang)*l.L*.5;if(Math.hypot(cx-x,cy-y)<r&&l.state!=='dive')l.state='dive';});}
function waterCol(o){return o.larvae==='culex'?['#2e3218','#1a1c0c']:o.algae?['#3a4a1c','#1e2a10']:['#1e3a44','#0e2028'];}

/* 模糊繪製：支援 canvas filter 的瀏覽器直接模糊，否則用多次錯位繪製模擬 */
/* 模糊繪製。先實際畫一個點測試 canvas filter 是否真的有效（iOS Safari 會接受這個屬性但不套用），
   不支援時改用低解析度的暫存畫布繪製再放大，一樣有模糊效果 */
const CANF=(()=>{try{const c=document.createElement('canvas');c.width=c.height=11;const g=c.getContext('2d');g.filter='blur(2px)';g.fillStyle='#fff';g.fillRect(5,5,1,1);return g.getImageData(2,5,1,1).data[3]>0;}catch(e){return false;}})();
let SOFT=null;
function soft(g,px,fn){
  if(CANF){const f=g.filter;g.filter=`blur(${px}px)`;fn(g);g.filter=f;return;}
  const W=g.canvas.width,H=g.canvas.height,k=Math.max(.1,Math.min(.4,.6/px));
  if(!SOFT)SOFT=document.createElement('canvas');const w=Math.ceil(W*k),h=Math.ceil(H*k);if(SOFT.width!==w||SOFT.height!==h){SOFT.width=w;SOFT.height=h;}
  const o=SOFT.getContext('2d'),T=g.getTransform();o.setTransform(1,0,0,1,0,0);o.clearRect(0,0,w,h);o.globalAlpha=g.globalAlpha;
  o.setTransform(T.a*k,T.b*k,T.c*k,T.d*k,T.e*k,T.f*k);fn(o);
  g.save();g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=true;g.globalAlpha=1;g.drawImage(SOFT,0,0,w,h,0,0,W,H);g.restore();}

/* ---------- 0. 探照：俯視水面，用手電筒找有沒有東西在動 ---------- */
function scan(o,bugs,done){const tk=++token;
  host(`<div class="fwh"><span class="step">探照</span><b>用手電筒照水面，看水裡有沒有孑孓</b></div>
   <div class="fwm"><div class="fwc"><canvas id="fws" width="640" height="420" ${CANVAS}></canvas></div>
   <div class="fws"><p>游標／手指握的是<b>手電筒</b>，光照在它的<b>左上方</b>。<b>慢慢</b>照過水面每一個角落，看清楚在動的是什麼，再決定要不要採樣。</p>
    <div class="col" id="scb"><button data-v="1" disabled>有看到孑孓，要採樣</button><button data-v="0" disabled>沒看到孑孓，不採樣</button></div>
    <button id="schelp" style="border-color:#c9a44e;color:#e0b050;text-align:center">？ 水裡常見的東西</button>
    <div id="sctip" class="mut" style="display:none;font-size:13px;line-height:1.55">・<b>孑孓</b>：細長，常倒吊在水面不動，受驚時會一扭一扭地往下鑽，過一陣子再浮上來。<br>・<b>水蚤</b>：很小的圓點，一跳一跳地前進。<br>・<b>小甲蟲</b>：圓圓的，有腳，在水裡划來划去。<br>・<b>落葉、碎屑</b>：不會自己動。</div></div></div>`);
  const c=$('fws'),g=c.getContext('2d'),st={x:320,y:210,down:false,seen:false};pointer(c,st);
  const coarse=matchMedia('(pointer: coarse)').matches,CX=320,CY=210,RX=o.name.match(/盤|槽|凹槽|水溝|積水/)?250:180,RY=o.name.match(/盤|槽|凹槽|水溝|積水/)?150:175;
  const wc=waterCol(o),inW=(x,y,m)=>((x-CX)/(RX-(m||0)))**2+((y-CY)/(RY-(m||0)))**2<1;
  const rp=m=>{let x,y;do{x=CX+(R()*2-1)*RX;y=CY+(R()*2-1)*RY;}while(!inW(x,y,m||30));return[x,y];};
  const lar=[],fle=[],bee=[],deb=[];
  if(o.larvae)for(let i=0;i<5+(R()*3|0);i++){const p=rp(40);lar.push({x:p[0],y:p[1],a:R()*7,t:R()*9,d:0,st:'hang',tm:1+R()*5,len:o.larvae==='culex'?46:34});}
  if(bugs.flea)for(let i=0;i<9+(R()*6|0);i++){const p=rp(25);fle.push({x:p[0],y:p[1],vx:0,vy:0,tm:R(),d:.2+R()*.6});}
  if(bugs.beetle)for(let i=0;i<1+(R()*2|0);i++){const p=rp(50);bee.push({x:p[0],y:p[1],a:R()*7,va:0,t:R()*9,d:.4});}
  for(let i=0;i<10;i++){const p=rp(20);deb.push({x:p[0],y:p[1],a:R()*7,k:R()<.4?'leaf':'speck',s:.6+R()*.8});}
  let t0=0,moved=0,lx=CX,ly=CY,fin=false;
  $('schelp').onclick=()=>{const t=$('sctip');t.style.display=t.style.display==='none'?'':'none';};
  $('scb').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(fin)return;fin=true;token++;done(b.dataset.v==='1');});
  loop(tk,(dt,now)=>{t0+=dt;
    const BX=110,BY=95,hx=st.seen?st.x:CX+BX+Math.sin(t0*.8)*60,hy=st.seen?st.y:CY+BY+Math.cos(t0*.6)*40,px=Math.max(0,Math.min(640,hx-BX)),py=Math.max(0,Math.min(420,hy-BY)),bsp=Math.hypot(px-lx,py-ly)/Math.max(dt,1e-3);moved+=Math.hypot(px-lx,py-ly);lx=px;ly=py;
    if(t0>2.2&&moved>300)$('scb').querySelectorAll('button').forEach(b=>b.disabled=false);
    // 孑孓：倒吊、受驚往下鑽、再浮上來
    lar.forEach(l=>{l.t+=dt;const near=Math.hypot(l.x-px,l.y-py)<70;
      if(l.st==='hang'){l.d+=(0-l.d)*dt*2;l.tm-=dt;if((near&&bsp>420)||l.tm<0&&R()<.01){l.st='dive';l.tm=1+R()*1.5;l.a+=(R()-.5)*1.5;}}
      else if(l.st==='dive'){l.d=Math.min(1,l.d+dt*1.1);l.x+=Math.cos(l.a)*dt*18;l.y+=Math.sin(l.a)*dt*18;l.tm-=dt;if(l.tm<0){l.st='up';}}
      else{l.d=Math.max(0,l.d-dt*.35);if(l.d<=0){l.st='hang';l.tm=2+R()*5;}}
      if(!inW(l.x,l.y,30)){l.a+=PI;l.x+=Math.cos(l.a)*4;l.y+=Math.sin(l.a)*4;}});
    fle.forEach(f=>{f.tm-=dt;if(f.tm<0){f.tm=.25+R()*.45;const a=R()*7,s=40+R()*50;f.vx=Math.cos(a)*s;f.vy=Math.sin(a)*s;}f.vx*=Math.pow(.02,dt);f.vy*=Math.pow(.02,dt);f.x+=f.vx*dt;f.y+=f.vy*dt;if(!inW(f.x,f.y,20)){f.vx*=-1;f.vy*=-1;f.x+=f.vx*dt*2;f.y+=f.vy*dt*2;}});
    bee.forEach(b=>{b.t+=dt;b.va+=(R()-.5)*dt*6;b.va*=.96;b.a+=b.va*dt;const s=45+Math.sin(b.t*2)*15;b.x+=Math.cos(b.a)*s*dt;b.y+=Math.sin(b.a)*s*dt;if(!inW(b.x,b.y,40)){b.a+=PI*.9;}});
    // 畫面
    g.fillStyle='#07090a';g.fillRect(0,0,640,420);
    g.fillStyle='#3a3a36';g.beginPath();g.ellipse(CX,CY,RX+16,RY+16,0,0,7);g.fill();
    const gr=g.createRadialGradient(CX,CY,10,CX,CY,Math.max(RX,RY));gr.addColorStop(0,wc[0]);gr.addColorStop(1,wc[1]);g.fillStyle=gr;g.beginPath();g.ellipse(CX,CY,RX,RY,0,0,7);g.fill();
    g.save();g.beginPath();g.ellipse(CX,CY,RX,RY,0,0,7);g.clip();
    deb.forEach(d=>{g.save();g.translate(d.x,d.y);g.rotate(d.a);if(d.k==='leaf'){g.fillStyle='rgba(70,52,26,.75)';g.beginPath();g.ellipse(0,0,9*d.s,4*d.s,0,0,7);g.fill();g.strokeStyle='rgba(40,28,14,.7)';g.beginPath();g.moveTo(-9*d.s,0);g.lineTo(9*d.s,0);g.stroke();}else{g.fillStyle='rgba(30,26,20,.7)';g.fillRect(-1.5,-1,3*d.s,2*d.s);}g.restore();});
    bee.forEach(b=>{g.save();g.translate(b.x,b.y);g.rotate(b.a);g.scale(1.5,1.5);g.globalAlpha=.85;g.strokeStyle='rgba(30,22,14,.9)';g.lineWidth=1.2;for(let k=-1;k<=1;k++){const sw=Math.sin(b.t*12+k)*3;g.beginPath();g.moveTo(k*3,-3);g.lineTo(k*3+sw,-9);g.moveTo(k*3,3);g.lineTo(k*3+sw,9);g.stroke();}
      g.fillStyle='#2a1e12';g.beginPath();g.ellipse(0,0,7,4.5,0,0,7);g.fill();g.fillStyle='rgba(120,100,70,.5)';g.beginPath();g.ellipse(-1,-1,4,1.5,0,0,7);g.fill();g.fillStyle='#120c08';g.beginPath();g.arc(6.5,0,2.4,0,7);g.fill();g.restore();});
    lar.forEach(l=>{const sc=1-l.d*.45;g.save();g.translate(l.x,l.y);g.rotate(l.a);g.globalAlpha=.92-l.d*.6;const L=l.len*sc,w=l.st==='dive'?Math.sin(l.t*16)*4.5:Math.sin(l.t*2)*.6;
      g.strokeStyle='rgba(60,44,28,.95)';g.lineCap='round';g.lineWidth=3.8*sc;g.beginPath();g.moveTo(-L/2,0);for(let i=1;i<=8;i++){const f=i/8;g.lineTo(-L/2+L*f,Math.sin(f*PI*1.5+l.t*16*(l.st==='dive'?1:0))*w);}g.stroke();
      g.fillStyle='rgba(50,36,22,.95)';g.beginPath();g.ellipse(L/2,0,5*sc,4.2*sc,0,0,7);g.fill();g.restore();});
    fle.forEach(f=>{g.globalAlpha=.85-f.d*.4;g.fillStyle='rgba(225,210,170,.85)';g.beginPath();g.ellipse(f.x,f.y,3.8,3,Math.atan2(f.vy,f.vx),0,7);g.fill();g.fillStyle='#1a1410';g.fillRect(f.x+1.5,f.y-.8,1.8,1.8);g.globalAlpha=1;});
    g.restore();
    g.strokeStyle='rgba(180,180,170,.35)';g.lineWidth=2;g.beginPath();g.ellipse(CX,CY,RX,RY,0,0,7);g.stroke();
    // 黑暗與手電筒光圈
    const dk=g.createRadialGradient(px,py,30,px,py,coarse?135:120);dk.addColorStop(0,'rgba(0,0,0,0)');dk.addColorStop(.6,'rgba(0,0,0,.18)');dk.addColorStop(1,'rgba(0,0,0,.955)');g.fillStyle=dk;g.fillRect(0,0,640,420);
    const hl=g.createRadialGradient(px,py,0,px,py,60);hl.addColorStop(0,'rgba(255,245,215,.16)');hl.addColorStop(1,'rgba(255,245,215,0)');g.fillStyle=hl;g.fillRect(px-60,py-60,120,120);
    g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(px-14,py-10,9,4,-.4,0,7);g.fill();
    // 手電筒本體：握把在游標／手指的位置，燈頭朝左上方的光圈
    {const dx=px-hx,dy=py-hy,dl=Math.hypot(dx,dy)||1,ux=dx/dl,uy=dy/dl,nx=-uy,ny=ux,headX=hx+ux*58,headY=hy+uy*58,tailX=hx-ux*44,tailY=hy-uy*44;
     const cone=g.createLinearGradient(headX,headY,px,py);cone.addColorStop(0,'rgba(255,245,215,.13)');cone.addColorStop(1,'rgba(255,245,215,.02)');g.fillStyle=cone;
     g.beginPath();g.moveTo(headX+nx*10,headY+ny*10);g.lineTo(px+nx*70,py+ny*70);g.lineTo(px-nx*70,py-ny*70);g.lineTo(headX-nx*10,headY-ny*10);g.fill();
     g.lineCap='round';g.strokeStyle='#1c1d1f';g.lineWidth=20;g.beginPath();g.moveTo(tailX,tailY);g.lineTo(headX-ux*14,headY-uy*14);g.stroke();
     g.strokeStyle='#3a3c40';g.lineWidth=14;g.beginPath();g.moveTo(tailX,tailY);g.lineTo(headX-ux*14,headY-uy*14);g.stroke();
     g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=3;g.beginPath();g.moveTo(tailX+nx*4,tailY+ny*4);g.lineTo(headX-ux*16+nx*4,headY-uy*16+ny*4);g.stroke();
     for(let k=0;k<4;k++){const t=.15+k*.12,gx=tailX+(headX-tailX)*t,gy=tailY+(headY-tailY)*t;g.strokeStyle='#121214';g.lineWidth=2;g.beginPath();g.moveTo(gx+nx*7,gy+ny*7);g.lineTo(gx-nx*7,gy-ny*7);g.stroke();}
     g.strokeStyle='#4a4c50';g.lineWidth=28;g.lineCap='butt';g.beginPath();g.moveTo(headX-ux*16,headY-uy*16);g.lineTo(headX,headY);g.stroke();
     g.fillStyle='#fff6d8';g.beginPath();g.ellipse(headX,headY,4,13,Math.atan2(uy,ux),0,7);g.fill();
     g.fillStyle='#d8302a';g.beginPath();g.arc(hx+nx*8,hy+ny*8,3,0,7);g.fill();
     if(coarse&&st.down)drawFinger(g,hx,hy,true);}
    if(t0<4){g.fillStyle='rgba(224,214,188,.8)';g.font='14px sans-serif';g.fillText(coarse?'手指拖曳的是手電筒，光照在左上方':'游標就是手電筒，光照在左上方',20,404);}
  });}

/* ---------- 1. 吸取幼蟲 ---------- */
/* 手指／游標對應滴管上端的橡皮球，尖端在下方 OFF 像素處 */
const OFF=195;
function drawPipette(g,x,y,down,fill,ghost){g.save();if(ghost)g.globalAlpha=.55;const sq=down?.72:1;
  g.fillStyle='rgba(200,225,235,.22)';g.strokeStyle='rgba(220,235,240,.85)';g.lineWidth=1.5;
  g.beginPath();g.moveTo(x-2,y);g.lineTo(x-7,y-34);g.lineTo(x-7,y-172);g.lineTo(x+7,y-172);g.lineTo(x+7,y-34);g.lineTo(x+2,y);g.closePath();g.fill();g.stroke();
  if(fill){g.fillStyle='rgba(40,70,80,.7)';g.fillRect(x-6,y-34-fill,12,fill);}
  g.fillStyle='#5a1a14';g.fillRect(x-9,y-178,18,8);
  g.fillStyle='#a82e24';g.beginPath();g.ellipse(x,y-OFF,12*sq+4*(1-sq),22*sq+3,0,0,7);g.fill();
  g.fillStyle='rgba(255,200,190,.35)';g.beginPath();g.ellipse(x-4,y-OFF-8,3,8,0,0,7);g.fill();
  g.strokeStyle='rgba(255,230,160,.9)';g.lineWidth=1;g.beginPath();g.moveTo(x+18,y-8);g.lineTo(x+6,y-2);g.stroke();
  g.fillStyle='rgba(255,230,160,.9)';g.font='11px sans-serif';g.fillText('尖端',x+20,y-5);g.restore();}
function drawFinger(g,x,y,down){g.save();g.globalAlpha=.5;g.fillStyle='#e8c8a8';g.strokeStyle='#fff';g.lineWidth=2;
  g.beginPath();g.ellipse(x+6,y+4+(down?3:0),16,20,-.3,0,7);g.fill();g.stroke();g.fillRect(x,y+18,26,60);g.restore();}
function tutorialHTML(){return `<div id="fwtut" class="res" style="display:none">
  <svg viewBox="0 0 600 150" style="width:100%;display:block;background:#0b1113;border:1px solid #2c3a3d">
   <rect x="20" y="70" width="170" height="70" fill="#1e3a44"/><line x1="20" y1="70" x2="190" y2="70" stroke="#9ab" stroke-width="1.5"/>
   <rect x="98" y="26" width="12" height="44" fill="rgba(200,225,235,.3)" stroke="#dde"/><ellipse cx="104" cy="18" rx="10" ry="16" fill="#a82e24"/>
   <ellipse cx="116" cy="24" rx="13" ry="16" fill="#e8c8a8" opacity=".7"/><text x="130" y="22" fill="#e0b050" font-size="12">手指放在橡皮球</text><text x="112" y="62" fill="#e0b050" font-size="12">尖端在下面</text>
   <text x="20" y="14" fill="#cfc7b0" font-size="13">① 握住橡皮球</text>
   <rect x="215" y="70" width="170" height="70" fill="#1e3a44"/><line x1="215" y1="70" x2="385" y2="70" stroke="#9ab" stroke-width="1.5"/>
   <path d="M300 70 l3 10 l-2 10 l3 10 l-2 10" stroke="#9a7a58" stroke-width="5" fill="none" stroke-linecap="round"/><line x1="300" y1="70" x2="300" y2="64" stroke="#3a2a18" stroke-width="3"/>
   <path d="M330 40 Q320 60 312 84" stroke="#e0b050" stroke-dasharray="4 3" fill="none"/><polygon points="308,88 318,84 312,78" fill="#e0b050"/>
   <text x="215" y="14" fill="#cfc7b0" font-size="13">② 慢慢把尖端靠近倒吊的幼蟲</text><text x="325" y="35" fill="#e0b050" font-size="12">慢！</text>
   <rect x="410" y="70" width="170" height="70" fill="#1e3a44"/><line x1="410" y1="70" x2="580" y2="70" stroke="#9ab" stroke-width="1.5"/>
   <rect x="489" y="50" width="12" height="44" fill="rgba(200,225,235,.3)" stroke="#dde"/><ellipse cx="495" cy="38" rx="7" ry="11" fill="#a82e24"/>
   <circle cx="495" cy="104" r="3" fill="none" stroke="#dde"/><circle cx="500" cy="112" r="2" fill="none" stroke="#dde"/>
   <text x="410" y="14" fill="#cfc7b0" font-size="13">③ 按住＝擠壓吸水</text><text x="515" y="45" fill="#e0b050" font-size="12">按住</text>
  </svg>
  <ul style="margin:8px 0 4px">
   <li>手指（或滑鼠游標）對應的是滴管上端的<b>紅色橡皮球</b>，滴管尖端在手指下方，這樣手指才不會擋住尖端。</li>
   <li>幼蟲平常用尾端的呼吸管貼著水面倒吊。把尖端移到幼蟲<b>身體旁邊</b>再按住。</li>
   <li>滴管在水裡會變慢。移動太快、或從上面猛然戳進水裡，附近的幼蟲會受驚潛到水底，等幾秒會再浮上來。</li>
   <li>實際採樣時也一樣：動作越輕，越容易採到。</li>
  </ul>
  <div class="row"><button id="fwdemo" style="text-align:center">看示範</button><button id="fwtutx" style="text-align:center">收起</button></div></div>`;}
function capture(o,done){const tk=++token;
  host(`<div class="fwh"><span class="step">採集幼蟲</span><b>用滴管吸 3 隻幼蟲到玻璃瓶</b></div>
   <div class="fwm"><div class="fwc"><canvas id="fwc" width="640" height="460" ${CANVAS}></canvas>${tutorialHTML()}</div>
   <div class="fws"><p class="mut">${o.result}</p>
    <p>手指（游標）握住滴管上端的<b>紅色橡皮球</b>，尖端在下方。<b>慢慢</b>移到倒吊的幼蟲旁邊，<b>按住</b>吸水。</p>
    <div id="fwn" class="cnt">玻璃瓶：0 / 3</div>
    <button id="fwhelp" style="border-color:#c9a44e;color:#e0b050;text-align:center">？ 怎麼吸幼蟲</button><button id="fwskip" style="display:none;text-align:center">改用撈杓撈</button><div id="fwfb"></div></div></div>`);
  const c=$('fwc'),g=c.getContext('2d'),st={x:320,y:4,down:false};pointer(c,st);
  const coarse=matchMedia('(pointer: coarse)').matches;
  const SURF=210,box={x0:60,x1:580,bot:432},wc=waterCol(o);
  const ls=[];for(let i=0;i<6;i++)ls.push(mkLarva(o.larvae,90+R()*460,SURF,58+R()*10));
  if(o.pupae){const p=mkLarva(o.larvae,120+R()*400,SURF,58);p.pupa=true;ls.push(p);}
  const tip={x:320,y:4+OFF,px:320,py:4+OFF},ripples=[],sucked=[],bubbles=[];let got=0,t0=0,warned=0,fin=false,wasIn=false,demo=null,fastT=0;
  setTimeout(()=>{if(tk===token&&!fin)$('fwskip').style.display='';},25000);
  $('fwskip').onclick=()=>{fin=true;token++;done(true);};
  $('fwhelp').onclick=()=>{const t=$('fwtut');t.style.display=t.style.display==='none'?'':'none';};
  $('fwtutx').onclick=()=>{$('fwtut').style.display='none';};
  $('fwdemo').onclick=()=>{$('fwtut').style.display='none';const L=ls.find(l=>l.state==='hang'&&!l.pupa)||ls[0];demo={L,ph:0,t:0,x:tip.x,y:tip.y-OFF};$('fwfb').innerHTML='<div class="fb good">示範中：手指放在橡皮球上，從上面慢慢下降，停在幼蟲旁邊，再按住吸水。（示範不算數）</div>';};
  loop(tk,(dt,now)=>{t0+=dt;
    let fx=st.x,fy=st.y,down=st.down;
    if(demo){demo.t+=dt;const L=demo.L,cx=L.x+Math.cos(L.ang)*L.L*.45+14,cy=L.y+Math.sin(L.ang)*L.L*.45;
      let gx=cx,gy=demo.ph===0?SURF-20-OFF:cy-OFF;const ddx=gx-demo.x,ddy=gy-demo.y,dd=Math.hypot(ddx,ddy),v=(demo.ph===0?260:70)*dt;if(dd>v){demo.x+=ddx/dd*v;demo.y+=ddy/dd*v;}else{demo.x=gx;demo.y=gy;if(demo.ph<2){demo.ph++;demo.t=0;}}
      if(demo.ph===2&&demo.t>1.4){demo.ph=3;demo.t=0;}if(demo.ph===3){demo.y-=90*dt;if(demo.t>1.2){demo=null;$('fwfb').innerHTML='<div class="fb good">換你試試看。</div>';}}
      if(demo){fx=demo.x;fy=demo.y;down=demo.ph===2;}}
    const tx=fx,ty=fy+OFF,dx=tx-tip.x,dy=ty-tip.y,d=Math.hypot(dx,dy),mv=Math.min(d,(tip.y>SURF?200:650)*dt);if(d>0){tip.x+=dx/d*mv;tip.y+=dy/d*mv;}
    tip.y=Math.max(30,Math.min(box.bot-6,tip.y));const sp=Math.hypot(tip.x-tip.px,tip.y-tip.py)/Math.max(dt,1e-3);tip.px=tip.x;tip.py=tip.y;
    const inW=tip.y>SURF;if(inW&&!wasIn){ripples.push({x:tip.x,r:2,a:.8});if(sp>150&&!demo)scare(ls,tip.x,tip.y,45);}wasIn=inW;
    fastT=(inW&&sp>150&&!demo)?fastT+dt:0;if(fastT>.2){scare(ls,tip.x,tip.y,70);if(!warned&&t0>1){warned=1;$('fwfb').innerHTML='<div class="fb bad">動作太快，幼蟲受驚潛下去了。慢慢靠近，等牠們浮回水面。</div>';}}
    if(down&&inW){if(R()<.3)bubbles.push({x:tip.x+(R()-.5)*6,y:tip.y,v:20+R()*30});}
    if(down&&inW&&!fin&&!demo){
      for(let i=ls.length-1;i>=0;i--){const l=ls[i],cx=l.x+Math.cos(l.ang)*l.L*.45,cy=l.y+Math.sin(l.ang)*l.L*.45;if(Math.hypot(cx-tip.x,cy-tip.y)<26){ls.splice(i,1);sucked.push({l,k:0});got++;snd(.12,1800,.06,'highpass');
          $('fwn').textContent=`玻璃瓶：${Math.min(got,9)} / 3${l.pupa?'（含一隻蛹）':''}`;scare(ls,tip.x,tip.y,50);
          if(got>=3&&!fin){fin=true;$('fwfb').innerHTML='<div class="fb good">採到了。把滴管裡的水擠進玻璃瓶。</div>';setTimeout(()=>{if(tk===token)done(false);},900);}break;}}}
    ls.forEach(l=>{if(demo&&l===demo.L&&l.state!=='hang'){l.state='hang';}stepLarva(l,dt,box);});
    g.fillStyle='#0b1113';g.fillRect(0,0,640,460);
    g.fillStyle='#55574f';g.fillRect(box.x0,150,box.x1-box.x0,SURF-150);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(box.x0+12,150,box.x1-box.x0-24,SURF-150);
    const gr=g.createLinearGradient(0,SURF,0,box.bot);gr.addColorStop(0,wc[0]);gr.addColorStop(1,wc[1]);g.fillStyle=gr;g.fillRect(box.x0,SURF,box.x1-box.x0,box.bot-SURF);
    g.fillStyle='rgba(255,240,200,.06)';g.beginPath();g.moveTo(240,0);g.lineTo(400,0);g.lineTo(470,460);g.lineTo(170,460);g.fill();
    g.strokeStyle='#4a4a44';g.lineWidth=10;g.beginPath();g.moveTo(box.x0-5,150);g.lineTo(box.x0-5,box.bot+5);g.lineTo(box.x1+5,box.bot+5);g.lineTo(box.x1+5,150);g.stroke();
    if(o.larvae==='aedes'){g.fillStyle='#120c08';for(let i=0;i<34;i++){const yy=SURF-6-((i*37)%40),xx=i%2?box.x0+3:box.x1-7;g.beginPath();g.ellipse(xx+2,yy,2.2,1.2,0,0,7);g.fill();}}
    soft(g,2.6,c=>ls.forEach(l=>l.pupa?pupa(c,l):larva(c,l)));
    g.strokeStyle='rgba(200,220,230,.55)';g.lineWidth=1.5;g.beginPath();g.moveTo(box.x0,SURF);for(let x=box.x0;x<=box.x1;x+=8)g.lineTo(x,SURF+Math.sin(x*.05+now*2)*1.2);g.stroke();
    ripples.forEach(r=>{r.r+=dt*60;r.a-=dt*.8;g.strokeStyle=`rgba(200,220,230,${Math.max(0,r.a)})`;g.beginPath();g.ellipse(r.x,SURF,r.r,r.r*.25,0,0,7);g.stroke();});
    for(let i=bubbles.length-1;i>=0;i--){const b=bubbles[i];b.y-=b.v*dt;if(b.y<SURF){bubbles.splice(i,1);continue;}g.strokeStyle='rgba(220,235,240,.6)';g.beginPath();g.arc(b.x,b.y,1.5,0,7);g.stroke();}
    // 玻璃瓶
    g.fillStyle='rgba(200,225,235,.12)';g.strokeStyle='rgba(220,235,240,.7)';g.fillRect(590,290,40,120);g.strokeRect(590,290,40,120);g.fillStyle='#3a2a1a';g.fillRect(588,280,44,12);
    const vl=Math.min(100,got*20);g.fillStyle='rgba(40,80,90,.6)';g.fillRect(591,410-vl,38,vl);
    // 滴管與吸進去的幼蟲
    drawPipette(g,tip.x,tip.y,down,Math.min(130,sucked.length*32),false);
    sucked.forEach((s,i)=>{s.k=Math.min(1,s.k+dt*1.6);const L=s.l;g.save();g.translate(tip.x,tip.y-20-s.k*(18+i*12));g.scale(.22,.22);L.x=0;L.y=0;L.ang=PI/2;L.t+=dt;soft(g,6,c=>larva(c,L));g.restore();});
    if(demo)drawFinger(g,tip.x,tip.y-OFF,down);else if(coarse&&st.down)drawFinger(g,tip.x,tip.y-OFF,true);
    if(demo&&demo.ph===2){g.fillStyle='#e0b050';g.font='bold 15px sans-serif';g.fillText('按住',tip.x+22,tip.y-OFF);}
    if(t0<4&&!demo){g.fillStyle='rgba(224,214,188,.8)';g.font='13px sans-serif';g.fillText(coarse?'手指按在紅色橡皮球上拖曳':'游標就是紅色橡皮球的位置',20,30);}
  });}

/* ---------- 2. 玻璃瓶中鑑定 ---------- */
function vial(o,onWrong,done){const tk=++token;
  host(`<div class="fwh"><span class="step">鑑定</span><b>看呼吸管，判斷是哪一種蚊子的幼蟲</b></div>
   <div class="fwm"><div class="fwc"><canvas id="fwv" width="640" height="420" ${CANVAS}></canvas></div>
   <div class="fws"><p>等幼蟲回到水面倒吊時，把<b>放大鏡</b>移過去，看尾端的<b>呼吸管</b>：長短、粗細，上面的毛有幾對。</p>
    <p class="mut">手指（游標）握的是放大鏡的握把，鏡片在左上方。</p>
    <div class="col" id="idb"><button data-v="aedes">斑蚊幼蟲</button><button data-v="culex">家蚊幼蟲</button></div><div id="idfb"></div></div></div>`);
  const c=$('fwv'),g=c.getContext('2d'),st={x:400,y:240,down:false,seen:false};pointer(c,st);const HO=82,coarse=matchMedia('(pointer: coarse)').matches;
  const VX0=215,VX1=425,SURF=78,BOT=318,box={x0:VX0+8,x1:VX1-8,bot:BOT},wc=waterCol(o);
  const ls=[];for(let i=0;i<3;i++){const l=mkLarva(o.larvae,VX0+40+i*60,SURF,92);l.timer=1+i*2;l.state=i===1?'bottom':'hang';if(i===1)l.y=BOT-90;ls.push(l);}
  if(o.pupae){const p=mkLarva(o.larvae,VX0+150,SURF,92);p.pupa=true;ls.push(p);}
  let first=true,solved=false;
  function scene(now,sharp){
    g.fillStyle='#0a0d0f';g.fillRect(0,0,640,420);
    const bg=g.createRadialGradient(150,180,10,150,180,420);bg.addColorStop(0,'rgba(255,240,210,.18)');bg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=bg;g.fillRect(0,0,640,360);
    const gr=g.createLinearGradient(0,SURF,0,BOT);gr.addColorStop(0,wc[0]);gr.addColorStop(1,wc[1]);g.fillStyle=gr;g.fillRect(VX0,SURF,VX1-VX0,BOT-SURF);
    const lt=g.createLinearGradient(VX0,0,VX1,0);lt.addColorStop(0,'rgba(255,245,220,.22)');lt.addColorStop(.35,'rgba(255,245,220,.04)');lt.addColorStop(1,'rgba(0,0,0,.25)');g.fillStyle=lt;g.fillRect(VX0,SURF,VX1-VX0,BOT-SURF);
    if(sharp)ls.forEach(l=>l.pupa?pupa(g,l):larva(g,l));else soft(g,2.4,c=>ls.forEach(l=>l.pupa?pupa(c,l):larva(c,l)));
    g.strokeStyle='rgba(210,230,236,.6)';g.lineWidth=1.5;g.beginPath();g.moveTo(VX0,SURF+3);g.quadraticCurveTo((VX0+VX1)/2,SURF-2,VX1,SURF+3);g.stroke();
    g.strokeStyle='rgba(225,238,242,.75)';g.lineWidth=3;g.beginPath();g.moveTo(VX0,30);g.lineTo(VX0,BOT+6);g.quadraticCurveTo(VX0,BOT+18,VX0+16,BOT+18);g.lineTo(VX1-16,BOT+18);g.quadraticCurveTo(VX1,BOT+18,VX1,BOT+6);g.lineTo(VX1,30);g.stroke();
    g.fillStyle='rgba(255,255,255,.12)';g.fillRect(VX0+10,40,8,BOT-50);g.fillStyle='#e8e2d0';g.fillRect(VX1-70,BOT-70,56,34);g.fillStyle='#3a3a36';g.font='11px sans-serif';g.fillText(o.label||'樣本',VX1-66,BOT-49);
  }
  $('idb').querySelectorAll('button').forEach(b=>b.onclick=()=>{
    if(b.dataset.v===o.larvae){solved=true;$('idb').querySelectorAll('button').forEach(x=>x.disabled=true);b.classList.add('right');
      $('idb').style.display='none';$('idfb').innerHTML=`<div class="row"><button class="pri" id="fwnext" style="text-align:center">下一步：清除孳生源</button></div><div class="fb good">${o.larvae==='aedes'?'<b>斑蚊幼蟲</b>：呼吸管短而粗，只有一對呼吸管毛。這個容器記為<b>斑蚊陽性</b>。':'<b>家蚊幼蟲</b>：呼吸管細長，有好幾對呼吸管毛。<b>不計入</b>斑蚊陽性容器。'}${o.pupae?'瓶裡還有一隻蛹，表示快要羽化了。':''}</div>
       <div class="lv">${larvaSVG(o.larvae,true)}</div>`;
      $('fwnext').onclick=()=>{token++;done(first);};
    }else{if(first)onWrong();first=false;b.disabled=true;b.classList.add('wrong');
      $('idfb').innerHTML='<div class="fb bad">不對。等幼蟲在水面停下來，用放大鏡看呼吸管：斑蚊的短而粗、毛只有一對；家蚊的細長、毛有好幾對。</div>';}
  });
  loop(tk,(dt,now)=>{ls.forEach(l=>stepLarva(l,dt,box));scene(now);
    if(st.seen&&!st.out){const r=70,z=2.6,lx=st.x-HO,ly=st.y-HO;g.save();g.beginPath();g.arc(lx,ly,r,0,7);g.clip();g.translate(lx,ly);g.scale(z,z);g.translate(-lx,-ly);scene(now,true);g.restore();
      g.strokeStyle='#c9a44e';g.lineWidth=5;g.beginPath();g.arc(lx,ly,r,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=2;g.beginPath();g.arc(lx,ly,r-8,3.6,4.4);g.stroke();
      g.lineCap='round';g.lineWidth=12;g.strokeStyle='#3a2a16';g.beginPath();g.moveTo(lx+r*.72,ly+r*.72);g.lineTo(st.x,st.y);g.stroke();g.lineWidth=8;g.strokeStyle='#6a4e2a';g.beginPath();g.moveTo(lx+r*.74,ly+r*.74);g.lineTo(st.x,st.y);g.stroke();
      if(coarse&&st.down)drawFinger(g,st.x-6,st.y-6,true);}
    else{g.fillStyle='rgba(224,214,188,.75)';g.font='14px sans-serif';g.font='17px sans-serif';g.fillText(coarse?'手指按住放大鏡的握把拖曳':'移動游標＝放大鏡的握把',20,404);}
  });}

/* ---------- 3. 清除積水或投藥 ---------- */
function clear(o,onWrong,done){const tk=++token,want=o.clear||'pour',eggs=o.larvae==='aedes',wc=waterCol(o);
  host(`<div class="fwh"><span class="step">清除孳生源</span><b>現場要怎麼處理這裡的水？</b></div>
   <div class="fwm"><div class="fwc"><canvas id="fwk" width="640" height="320" ${CANVAS_P}></canvas></div>
   <div class="fws"><div class="col" id="cb"><button data-v="pour"><b>清除積水</b><br><span class="mut">倒乾或排掉，刷洗內壁</span></button><button data-v="treat"><b>投藥</b><br><span class="mut">投放殺幼蟲劑</span></button></div>
   <div id="cfb"></div><div id="cg"></div></div></div>`);
  const c=$('fwk'),g=c.getContext('2d'),st={x:0,y:0,down:false};pointer(c,st);
  let mode='idle',first=true;
  // 清除積水的狀態
  let level=1,tilt=0,phase='pour',stream=[];const E=[];if(eggs)for(let i=0;i<40;i++)E.push({s:i%2,y:120+((i*29)%40)+R()*6,on:true});
  // 投藥的狀態
  const tl=[];for(let i=0;i<5;i++)tl.push(mkLarva(o.larvae,140+R()*360,110,44));const gr=[];let drops=0,tfin=false,cloud=0;
  function drawPour(dt){g.fillStyle='#0b1113';g.fillRect(0,0,640,320);
    g.save();g.translate(320,270);g.rotate(tilt*.9);g.translate(-320,-270);
    const top=110,bot=270,x0=230,x1=410,wl=bot-(bot-top-30)*level;
    const iw=g.createLinearGradient(x0,0,x1,0);iw.addColorStop(0,'#8c8c84');iw.addColorStop(.5,'#5c5c56');iw.addColorStop(1,'#8c8c84');g.fillStyle=iw;g.fillRect(x0,top,x1-x0,bot-top);
    g.fillStyle=wc[0];if(level>0)g.fillRect(x0+4,wl,x1-x0-8,bot-wl-4);
    g.strokeStyle='#8a8a84';g.lineWidth=8;g.beginPath();g.moveTo(x0,top);g.lineTo(x0,bot);g.lineTo(x1,bot);g.lineTo(x1,top);g.stroke();
    if(eggs)E.forEach(e=>{if(!e.on)return;g.fillStyle='#100a06';g.beginPath();g.ellipse(e.s?x0+7:x1-7,e.y,3,1.6,0,0,7);g.fill();});
    if(o.larvae==='culex'&&level>.3){g.fillStyle='#120c06';g.beginPath();g.ellipse(300,wl-1,10,3,0,0,7);g.fill();}
    g.restore();
    for(let i=stream.length-1;i>=0;i--){const s=stream[i];s.vy+=400*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;if(s.y>320){stream.splice(i,1);continue;}g.fillStyle=wc[0];g.fillRect(s.x,s.y,3,3);}
    if(phase==='scrub'&&st.down){g.fillStyle='#c84a2a';g.fillRect(st.x-14,st.y-8,28,10);g.fillStyle='#e8d090';for(let i=0;i<7;i++)g.fillRect(st.x-12+i*4,st.y+2,2,8);}
    g.fillStyle='rgba(224,214,188,.85)';g.font='15px sans-serif';
    if(mode==='pour')g.fillText(phase==='pour'?'按住畫面：倒水':phase==='scrub'?`按住拖曳刷掉內壁的卵（還剩 ${E.filter(e=>e.on).length} 顆）`:'',20,30);}
  function drawTreat(dt){cloud=Math.min(1,cloud+(drops/3)*dt*.25);
    g.fillStyle='#0b1113';g.fillRect(0,0,640,320);g.fillStyle=wc[0];g.fillRect(60,110,520,200);
    g.fillStyle=`rgba(210,200,170,${cloud*.25})`;g.fillRect(60,110,520,200);
    tl.forEach(l=>{stepLarva(l,dt,{x0:70,x1:570,bot:305});larva(g,l);});
    for(let i=gr.length-1;i>=0;i--){const p=gr[i];p.y+=p.vy*dt;p.a-=dt*.25;if(p.a<=0){gr.splice(i,1);continue;}g.fillStyle=`rgba(225,210,160,${p.a})`;g.fillRect(p.x,p.y,3,3);}
    g.strokeStyle='rgba(200,220,230,.5)';g.beginPath();g.moveTo(60,110);g.lineTo(580,110);g.stroke();
    g.fillStyle='rgba(224,214,188,.85)';g.font='15px sans-serif';g.fillText(mode==='treat'?`點水面投藥：${drops} / 3 處`:'先在右邊選擇藥劑',20,30);}
  loop(tk,(dt)=>{
    if(mode==='pour'){
      if(phase==='pour'){if(st.down){tilt=Math.min(1,tilt+dt*2.5);if(tilt>.5){level=Math.max(0,level-dt*.32);for(let i=0;i<3;i++)stream.push({x:470,y:170,vx:60+R()*30,vy:R()*20});if(R()<.1)snd(.2,600,.04);}}else tilt=Math.max(0,tilt-dt*2);
        if(level<=0){phase=eggs?'scrub':'done';$('pst').innerHTML=eggs?'<b>內壁還有黑色的小點，是斑蚊的卵。</b>按住拖曳，把它們刷掉。':'';if(!eggs)finishPour();}}
      else if(phase==='scrub'){tilt=Math.max(0,tilt-dt*2);if(st.down)E.forEach(e=>{const ex=e.s?236:404;if(e.on&&Math.hypot(st.x-ex,st.y-e.y)<26){e.on=false;snd(.05,3000,.03,'highpass');}});
        if(!E.some(e=>e.on)){phase='done';finishPour();}}
      drawPour(dt);}
    else if(mode==='treat'||mode==='agent'){
      if(mode==='treat'&&st.tap&&!tfin&&drops<3){st.tap=false;drops++;for(let i=0;i<26;i++)gr.push({x:st.x+(R()-.5)*30,y:Math.min(st.y,110),vy:20+R()*40,a:1});snd(.25,1200,.06,'bandpass');}
      st.tap=false;
      if(drops>=3&&!tfin){tfin=true;setTimeout(()=>{if(tk!==token)return;$('tfb').innerHTML=`<div class="fb good">投藥完成。蘇力菌要被幼蟲吃下去才會有作用，通常一天內見效；它只對蚊、蚋類的幼蟲有效，對人和其他動物的毒性很低。記錄投藥位置，之後回來複查。</div>`;nextBtn();},1500);}
      drawTreat(dt);}
    else drawPour(dt);
  });
  $('cb').querySelectorAll('button').forEach(b=>b.onclick=()=>{
    if(b.dataset.v===want){$('cb').querySelectorAll('button').forEach(x=>x.disabled=true);b.classList.add('right');
      $('cfb').innerHTML=`<div class="fb good">${o.clearWhy||(want==='pour'?'這裡的水可以直接清掉。能清除的孳生源就清除，不需要用藥。':'這裡的水沒辦法馬上清除，先投藥殺幼蟲。')}</div>`;
      if(want==='pour'){mode='pour';c.style.cursor='pointer';$('cg').innerHTML=`<p id="pst"><b>${o.pourHow||'按住畫面把水倒掉'}</b>${eggs?'，倒完再把內壁上的卵刷掉':''}。</p>`;}
      else agent();
    }else{if(first)onWrong(want==='pour'?'選了投藥，但這裡可以直接清除':'選了清除積水，但這裡沒辦法馬上清除');first=false;b.disabled=true;b.classList.add('wrong');
      $('cfb').innerHTML=`<div class="fb bad">${want==='pour'?'這裡的水可以直接倒掉或排掉。能清除的就清除，藥劑留給沒辦法清除的地方。':(o.clearWhy||'這裡沒辦法馬上清除乾淨，要先投藥。')} 再選一次。</div>`;}
  });
  function nextBtn(){const d=document.createElement('div');d.className='row';d.innerHTML='<button class="pri" id="fwdone" style="text-align:center">下一步</button>';$('cg').appendChild(d);$('fwdone').onclick=()=>{token++;done();};}
  function finishPour(){$('pst').innerHTML=`<span class="fb good" style="display:block">清除完成。${eggs?'斑蚊卵黏在水面上方的內壁，能耐乾燥好幾個月，所以一定要刷。':'家蚊的卵塊浮在水面，倒掉就一起清除了。'}</span>`;nextBtn();}
  function agent(){mode='agent';$('cb').style.display='none';
    $('cg').innerHTML=`<p><b>選擇要投放的藥劑：</b></p><div class="col" id="ag">
     <button data-v="bti"><b>蘇力菌（Bti）殺幼蟲劑</b><span class="mut">　顆粒劑</span></button>
     <button data-v="spray"><b>殺蟲噴霧</b><span class="mut">　居家用</span></button>
     <button data-v="bleach"><b>漂白水</b></button></div><div id="agfb"></div><div id="tfb"></div>`;
    const why={spray:'殺蟲噴霧是給飛行的成蚊用的，對水裡的幼蟲效果差，還會污染水。',bleach:'漂白水不是殺幼蟲劑，用量很難控制，也會傷到植物和水裡的生物。'};let f2=true;
    $('ag').querySelectorAll('button').forEach(b=>b.onclick=()=>{
      if(b.dataset.v==='bti'){$('ag').querySelectorAll('button').forEach(x=>{if(x!==b)x.style.display='none';x.disabled=true;});b.classList.add('right');mode='treat';c.style.cursor='pointer';
        $('agfb').innerHTML='<p><b>點左邊的水面三處投藥。</b></p>';}
      else{if(f2)onWrong('選了'+({spray:'殺蟲噴霧',bleach:'漂白水'})[b.dataset.v]);f2=false;b.disabled=true;b.classList.add('wrong');$('agfb').innerHTML=`<div class="fb bad">${why[b.dataset.v]} 再選一次。</div>`;}
    });}
}
return{scan,capture,vial,clear,stop:()=>token++};
})();
