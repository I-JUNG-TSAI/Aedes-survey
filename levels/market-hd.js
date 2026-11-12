/* 第二關一樓：高解析度材質與精細物件
   依現場照片：紅綠磨石子地磚、直式白牆磚、灰色小馬賽克、發霉天花板、
   有孔角鋼架、不鏽鋼水塔、廁所、垃圾角落。 */
window.makeMarketHD=function(K,Pr){
const THREE=K.THREE,R=Math.random,DS=THREE.DoubleSide,PI=Math.PI;
const {scene,mesh,box,anim}=K;
/* ---------- 可無縫重複的雜訊 ---------- */
function vnoise(p){const a=new Float32Array(p*p);for(let i=0;i<a.length;i++)a[i]=R();const s=t=>t*t*(3-2*t);
  return (x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),u=s(x-xi),v=s(y-yi),A=(i,j)=>a[(((j%p)+p)%p)*p+(((i%p)+p)%p)];
    return (A(xi,yi)*(1-u)+A(xi+1,yi)*u)*(1-v)+(A(xi,yi+1)*(1-u)+A(xi+1,yi+1)*u)*v;};}
function fbm(base,oct){const L=[];for(let o=0;o<oct;o++)L.push([vnoise(base<<o),base<<o,Math.pow(.5,o)]);
  return (u,v)=>{let s=0,t=0;for(let i=0;i<L.length;i++){const q=L[i];s+=q[0](u*q[1],v*q[1])*q[2];t+=q[2];}return s/t;};}
function makeTex(w,h,draw,rep){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=THREE.NearestFilter;t.minFilter=THREE.LinearMipmapLinearFilter;t.anisotropy=4;if(rep)t.repeat.set(rep[0],rep[1]);return t;}
function fill(g,w,h,f){const im=g.createImageData(w,h),d=im.data;let i=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++,i+=4){const c=f(x,y);d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=c.length>3?c[3]:255;}g.putImageData(im,0,0);}
const cl=v=>v<0?0:v>255?255:v;
function wrapped(w,h,x,y,fn){for(const dx of[-w,0,w])for(const dy of[-h,0,h])fn(x+dx,y+dy);}
function glow(g,w,h,x,y,r,c0){wrapped(w,h,x,y,(X,Y)=>{const gr=g.createRadialGradient(X,Y,0,X,Y,r);gr.addColorStop(0,c0);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(X-r,Y-r,r*2,r*2);});}
function drips(g,w,h,n,c,y0,y1,l0,l1){for(let i=0;i<n;i++){const x=R()*w,y=h*(y0+R()*(y1-y0)),l=l0+R()*(l1-l0),gr=g.createLinearGradient(0,y,0,y+l);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x,y,1+R()*2.5,l);}}

/* ---------- 材質 ---------- */
const TX={
 // 紅綠相間的磨石子磚：512px＝8×8 塊，每塊約 30cm
 terrazzo(){const S=512,T=64,st=fbm(4,4);return makeTex(S,S,g=>{
   fill(g,S,S,(x,y)=>{const ti=x/T|0,tj=y/T|0,red=(ti+tj)%2===0,tv=((ti*7+tj*13)%5)*3,n=(R()-.5)*24,k=1-Math.max(0,st(x/S,y/S)-.45)*1.0;
     return red?[cl((126+tv+n)*k),cl((80+n)*k),cl((72+n)*k)]:[cl((116+n)*k),cl((128+tv*.6+n)*k),cl((120+n)*k)];});
   const pr=['#c47c6e','#5a2c28','#e4d8ca','#2a2220','#9e4c42','#dca494'],pg=['#b6c4b8','#44544e','#ececE4','#262c28','#7a8a80','#cad6ce'];
   for(let i=0;i<22000;i++){const x=R()*S,y=R()*S,p=((x/T|0)+(y/T|0))%2===0?pr:pg;g.fillStyle=p[R()*p.length|0];g.globalAlpha=.5+R()*.5;const s=R()<.82?1:2+R()*2.5;g.fillRect(x|0,y|0,s,s*(.5+R()));}
   g.globalAlpha=1;for(let i=0;i<S;i+=T){g.fillStyle='rgba(184,178,164,.95)';g.fillRect(i,0,2,S);g.fillRect(0,i,S,2);g.fillStyle='rgba(30,26,22,.4)';g.fillRect(i+2,0,1,S);g.fillRect(0,i+2,S,1);}
   for(let i=0;i<70;i++)glow(g,S,S,R()*S,R()*S,6+R()*36,'rgba(18,14,10,.22)');
   for(let i=0;i<30;i++){g.strokeStyle='rgba(230,226,215,.12)';g.lineWidth=1;g.beginPath();const x=R()*S,y=R()*S;g.moveTo(x,y);g.lineTo(x+(R()-.5)*60,y+(R()-.5)*20);g.stroke();}
 });},
 // 直式白牆磚；256×1024 代表 1m 寬 × 4m 高（下方會積髒污）
 wall(o){const W=256,H=1024,st=fbm(3,4),dr=fbm(8,3);return makeTex(W,H,g=>{
   fill(g,W,H,(x,y)=>{const ti=x/o.tw|0,tj=y/o.th|0,tv=((ti*31+tj*17)%7)*2.4,gx=(x%o.tw)/o.tw,hl=(1-Math.abs(gx-.32)*1.5)*7,n=(R()-.5)*7,b=o.base;
     const fy=y/H,s=st(x/W,y/H),dv=dr(x/W*4,y/H*.5);let d=o.dirt*(Math.max(0,(fy-.7)/.3)*.85*(.45+s)+Math.max(0,s-.57)*1.7+Math.max(0,dv-.63)*1.3);d=Math.min(.82,d);
     return [cl((b[0]+tv+hl+n)*(1-d)+22*d),cl((b[1]+tv+hl+n)*(1-d)+18*d),cl((b[2]+tv*.8+hl+n)*(1-d)+12*d)];});
   g.fillStyle=o.grout;for(let x=0;x<W;x+=o.tw)g.fillRect(x,0,2,H);for(let y=0;y<H;y+=o.th)g.fillRect(0,y,W,2);
   g.fillStyle='rgba(255,255,255,.25)';for(let x=2;x<W;x+=o.tw)g.fillRect(x,0,1,H);
   drips(g,W,H,o.dirt*55,'rgba(78,56,30,.35)',0,.9,20,140);
   for(let i=0;i<o.dirt*900;i++){g.fillStyle=`rgba(18,22,14,${.2+R()*.45})`;g.fillRect(R()*W,H*(.72+R()*.28),1+R()*2,1+R()*2);}
   for(let i=0;i<o.dirt*30;i++){g.fillStyle='rgba(132,120,100,.85)';g.fillRect(R()*W,R()*H,2+R()*5,1+R()*3);}
   if(o.blue)for(let i=0;i<3;i++){g.fillStyle='rgba(240,240,236,.5)';g.fillRect(R()*W,H*(.75+R()*.15),20+R()*40,6+R()*10);}
 },[1,.25]);},
 // 小馬賽克
 mosaic(o){const S=256,T=8,st=fbm(3,3);return makeTex(S,S,g=>{
   const cols={};for(let j=0;j<S/T;j++)for(let i=0;i<S/T;i++)cols[i+','+j]=o.pick(i,j);
   fill(g,S,S,(x,y)=>{const c=cols[(x/T|0)+','+(y/T|0)],ex=x%T,ey=y%T,e=(ex===1||ey===1)?14:(ex===T-1||ey===T-1)?-26:0,n=(R()-.5)*10,k=1-Math.max(0,st(x/S,y/S)-.48)*o.dirt*1.8;
     return [cl((c[0]+n+e)*k),cl((c[1]+n+e)*k),cl((c[2]+n+e)*k)];});
   g.fillStyle=o.grout;for(let x=0;x<S;x+=T)g.fillRect(x,0,1,S);for(let y=0;y<S;y+=T)g.fillRect(0,y,S,1);
   for(let m=0;m<(o.missing||0);m++){const cx=R()*S,cy=R()*S,r=8+R()*22;for(let j=-r;j<r;j+=T)for(let i=-r;i<r;i+=T)if(i*i+j*j<r*r&&R()<.85){const x=((Math.floor((cx+i)/T)*T)%S+S)%S,y=((Math.floor((cy+j)/T)*T)%S+S)%S;const v=70+R()*24;g.fillStyle=`rgb(${v|0},${v-2|0},${v-8|0})`;g.fillRect(x,y,T,T);}}
   for(let i=0;i<o.dirt*40;i++)glow(g,S,S,R()*S,R()*S,4+R()*20,'rgba(16,14,10,.25)');
 });},
 // 發霉的天花板：深灰底、淺色黴斑與水漬圈
 ceiling(){const S=512,b=fbm(4,5),m=fbm(6,4),sp=fbm(16,2);return makeTex(S,S,g=>{
   fill(g,S,S,(x,y)=>{const u=x/S,v=y/S,c=44+b(u,v)*44,mm=m(u,v),p=Math.min(1,Math.max(0,(mm-.55)*6)),s=sp(u,v),edge=mm>.53&&mm<.56,n=(R()-.5)*14;
     let r=c*(1-p)+(146+s*46)*p,gg=(c+2)*(1-p)+(148+s*46)*p,bb=(c+4)*(1-p)+(142+s*40)*p;if(edge){r*=.55;gg*=.55;bb*=.55;}return [cl(r+n),cl(gg+n),cl(bb+n)];});
   for(let i=0;i<160;i++){const x=R()*S,y=R()*S,r=2+R()*10,a=.2+R()*.35;wrapped(S,S,x,y,(X,Y)=>{g.strokeStyle=`rgba(205,205,196,${a})`;g.lineWidth=1.2;g.beginPath();g.arc(X,Y,r,0,7);g.stroke();g.fillStyle=`rgba(26,26,24,${a*.7})`;g.beginPath();g.arc(X,Y,r*.55,0,7);g.fill();});}
   drips(g,S,S,30,'rgba(20,18,14,.4)',0,1,10,60);
 });},
 concrete(){const S=256,b=fbm(4,5),m=fbm(8,3);return makeTex(S,S,g=>{
   fill(g,S,S,(x,y)=>{const u=x/S,v=y/S,c=108+b(u,v)*72,k=Math.min(.8,Math.max(0,m(u,v)-.54)*2.6),n=(R()-.5)*12;return [cl(c*(1-k)+34*k+n),cl(c*(1-k)+36*k+n),cl(c*(1-k)+32*k+n)];});
   drips(g,S,S,45,'rgba(36,32,26,.38)',0,1,30,110);
 });},
 shutter(){const W=256,H=256,b=fbm(4,4);return makeTex(W,H,g=>{
   fill(g,W,H,(x,y)=>{const sy=y%10,sh=sy<1?-55:sy<3?20:sy>8?-28:0,c=104+b(x/W,y/H)*44+sh+(R()-.5)*8;return [cl(c),cl(c+3),cl(c+9)];});
   drips(g,W,H,34,'rgba(116,62,24,.5)',0,.75,30,100);g.fillStyle='rgba(28,24,20,.4)';g.fillRect(0,H-26,W,26);
 });},
 // 有孔角鋼（透明孔）
 slotted(){return makeTex(256,32,g=>{fill(g,256,32,(x,y)=>{const n=(R()-.5)*34;return [cl(92+n),cl(60+n*.8),cl(40+n*.6)];});
   g.fillStyle='rgba(160,100,56,.55)';for(let i=0;i<50;i++)g.fillRect(R()*256,R()*32,2+R()*7,1+R()*3);
   g.globalCompositeOperation='destination-out';g.fillStyle='#000';for(let x=4;x<256;x+=23){g.beginPath();g.ellipse(x+6,16,7,3.4,0,0,7);g.fill();g.beginPath();g.arc(x+17.5,16,2.6,0,7);g.fill();}g.globalCompositeOperation='source-over';
 },[1,11]);},
 // 不鏽鋼：直向拉絲＋假反射帶
 steel(){const W=256,H=256;return makeTex(W,H,g=>{
   fill(g,W,H,(x,y)=>{const u=x/W,rf=Math.sin(u*PI*4+.6)*30+Math.sin(u*PI*10)*9,c=150+rf+(R()-.5)*7+((x*7)%5);return [cl(c-6),cl(c),cl(c+7)];});
   for(let i=0;i<70;i++){g.fillStyle=`rgba(${R()<.5?255:20},${R()<.5?255:20},${R()<.5?255:20},.06)`;g.fillRect(R()*W,R()*H,1,10+R()*90);}
   drips(g,W,H,26,'rgba(96,84,60,.32)',.55,1,20,70);
 });},
 fu(){return makeTex(256,256,g=>{g.clearRect(0,0,256,256);g.fillStyle='#b01e18';g.strokeStyle='#b01e18';g.lineWidth=2;g.font='700 210px "Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif';g.textAlign='center';g.textBaseline='middle';g.strokeText('富',128,136);g.fillText('富',128,136);
   g.globalCompositeOperation='destination-out';for(let i=0;i<260;i++){g.fillStyle=`rgba(0,0,0,${R()*.7})`;g.fillRect(R()*256,R()*256,1+R()*6,1+R()*3);}g.globalCompositeOperation='source-over';});},
 wood(){const W=64,H=256,f=fbm(2,3);return makeTex(W,H,g=>{fill(g,W,H,(x,y)=>{const w=Math.sin(x*.55+f(x/W,y/H)*9)*14,n=(R()-.5)*8;return [cl(86+w+n),cl(56+w*.7+n),cl(36+w*.4+n)];});drips(g,W,H,10,'rgba(20,12,6,.35)',.6,1,20,60);});},
 fabric(){const S=128,f=fbm(4,4);return makeTex(S,S,g=>{fill(g,S,S,(x,y)=>{const s=f(x/S,y/S),n=(R()-.5)*10+((x+y)%3?0:-6),k=Math.max(0,s-.55)*1.4;return [cl(214-90*k+n),cl(204-92*k+n),cl(170-80*k+n)];});});},
 plasticBag(base,a){const S=128,f=fbm(3,4);return makeTex(S,S,g=>{fill(g,S,S,(x,y)=>{const s=f(x/S,y/S),wr=Math.abs(Math.sin(x*.12+s*14+y*.03)),hl=wr>.96?60:wr<.1?-14:0;return [cl(base[0]+hl+s*20),cl(base[1]+hl+s*20),cl(base[2]+hl+s*20),a===undefined?255:a];});});},
 stripes(c1,c2,n){return makeTex(16,64,g=>{for(let i=0;i<n;i++){g.fillStyle=i%2?c2:c1;g.fillRect(0,i*64/n,16,64/n);}});},
 ribbed(){return makeTex(64,16,g=>{for(let x=0;x<64;x++){const v=x%4<2?226:176;g.fillStyle=`rgb(${v},${v},${v-6})`;g.fillRect(x,0,1,16);}},[14,1]);},
 tread(){return makeTex(64,8,g=>{g.fillStyle='#141414';g.fillRect(0,0,64,8);g.fillStyle='#262626';for(let x=0;x<64;x+=4)g.fillRect(x,1,2,6);});},
 puddle(){const S=256,f=fbm(3,4);return makeTex(S,S,g=>fill(g,S,S,(x,y)=>{const u=x/S-.5,v=y/S-.5,d=Math.sqrt(u*u*1.2+v*v)*2,k=f(x/S,y/S)-d*.6;return [255,255,255,k>.1?255:0];}));},
 porcelain(){const S=64;return makeTex(S,S,g=>{fill(g,S,S,(x,y)=>{const n=(R()-.5)*6;return [cl(226+n),cl(228+n),cl(224+n)];});drips(g,S,S,10,'rgba(120,100,70,.3)',0,.8,8,30);for(let i=0;i<6;i++)glow(g,S,S,R()*S,R()*S,5,'rgba(60,50,40,.25)');});}
};
const ph=(t,o,uv)=>{const m=new THREE.MeshPhongMaterial(Object.assign({map:t,shininess:10},o||{}));if(uv)m.userData.uv=uv;return m;};
/* ---------- 二樓與頂樓（高解析度） ---------- */
function crack(g,x,y,len,ang,w,c){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x,y);let a=ang;for(let i=0;i<len;i+=4){a+=(R()-.5)*.28+(R()<.08?(R()-.5)*1.2:0);x+=Math.cos(a)*4;y+=Math.sin(a)*4;g.lineTo(x,y);if(R()<.04&&w>.6){g.stroke();crack(g,x,y,len*.4,a+(R()<.5?.9:-.9),w*.6,c);g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x,y);}}g.stroke();}
Object.assign(TX,{
 // 走廊牆：上半米白油漆、下半灰綠色油漆護牆；1024px＝3.4m 見方，下方 1.05m 是護牆
 wall2(o){o=o||{};const S=1024,PX=S/3.4,DH=S-Math.round(1.05*PX),big=fbm(2,3),pl=fbm(8,3),pe=fbm(9,4),dm=fbm(6,3),fine=fbm(64,1);return makeTex(S,S,g=>{
   const dirt=o.dirt||1;
   fill(g,S,S,(x,y)=>{const u=x/S,v=y/S,n=(R()-.5)*7+(fine(u,v)-.5)*14,b=big(u,v),p=pl(u,v),fy=(S-y)/PX;
     let c=y>=DH?[84+b*14,102+b*12,92+b*10]:[206-b*26+p*10,196-b*28+p*10,168-b*34+p*6];
     if(y>=DH-7&&y<DH)c=[46,58,52];
     // 剝落：露出灰色水泥粉刷層
     const pk=pe(u,v)+(fy<.5?.12:0)+(y>=DH?.04:0);
     if(pk>.71){const e=pk<.72?.6:1;c=[(150+p*20)*e,(146+p*20)*e,(136+p*18)*e];}
     else if(pk>.695){c=c.map(q=>q*.92);}
     // 壁癌：地面往上的潮濕水痕
     const wet=.42+dm(u,v*.5)*.5-fy;if(wet>0){const k=Math.min(.6,wet*2.2)*dirt;c=[c[0]*(1-k)+70*k,c[1]*(1-k)+58*k,c[2]*(1-k)+40*k];if(wet<.025)c=c.map(q=>q*.93);}
     // 天花板下方的灰
     if(fy>2.9){const k=(fy-2.9)*.5*dirt;c=c.map(q=>q*(1-k));}
     return [cl(c[0]+n),cl(c[1]+n),cl(c[2]+n)];});
   // 手和包包磨出的污痕
   for(let i=0;i<26*dirt;i++){const y=S-PX*(.85+R()*.35),x=R()*S;g.fillStyle=`rgba(30,26,20,${.05+R()*.08})`;g.fillRect(x,y,30+R()*120,2+R()*7);}
   drips(g,S,S,90*dirt,'rgba(70,50,28,.32)',0,.15,40,420);
   drips(g,S,S,40*dirt,'rgba(20,20,16,.3)',0,.05,20,200);
   for(let i=0;i<7;i++)crack(g,R()*S,R()*S*.8,30+R()*90,R()*PI*2,.9,'rgba(40,34,26,.45)');
   // 黑黴點
   for(let i=0;i<14*dirt;i++){const cx=R()*S,cy=R()<.6?S-R()*PX*.5:R()*PX*.4;for(let j=0;j<60;j++){g.fillStyle=`rgba(16,18,12,${.2+R()*.4})`;const r=R()*40;g.fillRect(cx+(R()-.5)*r*2,cy+(R()-.5)*r,1+R()*2.5,1+R()*2.5);}}
   // 撕掉的海報殘膠
   for(let i=0;i<3;i++){const x=R()*(S-120),y=S-PX*(1.4+R()*.6),w=60+R()*70,h=80+R()*60;g.fillStyle='rgba(214,206,186,.5)';for(let k=0;k<30;k++)g.fillRect(x+R()*w,y+R()*h,4+R()*16,3+R()*10);
     g.fillStyle='rgba(180,160,110,.75)';[[0,0],[w,0],[0,h],[w,h]].forEach(q=>g.fillRect(x+q[0]-6,y+q[1]-3,14,7));}
   // 釘孔、電線卡榫
   for(let i=0;i<12;i++){g.fillStyle='rgba(20,18,14,.7)';g.fillRect(R()*S,R()*S*.6,3,3);}
 });},
 // 舊式 20cm 米色地磚；512px＝1.6m
 floor20(){const S=512,T=64,b=fbm(3,4),w=fbm(8,3),sp=fbm(48,2);return makeTex(S,S,g=>{
   const tc={};const tcol=(i,j)=>tc[i+'_'+j]||(tc[i+'_'+j]=[R()*14-7,R()<.07,R()<.1?R()*4|0:-1]);
   fill(g,S,S,(x,y)=>{const ti=x/T|0,tj=y/T|0,t=tcol(ti,tj),u=x/S,v=y/S,lx=x%T,ly=y%T,n=(R()-.5)*16+(sp(u,v)-.5)*20;
     let c=[170+t[0],160+t[0],134+t[0]*.8];if(t[1])c=[150+t[0],138+t[0],112+t[0]];
     const d=Math.min(.7,Math.max(0,b(u,v)-.4)*1.5+Math.max(0,w(u,v)-.6)*1.4);c=c.map((q,k)=>q*(1-d)+[34,30,24][k]*d);
     // 邊角破損
     if(t[2]>=0){const cx=t[2]&1?T:0,cy=t[2]&2?T:0;if(Math.abs(lx-cx)+Math.abs(ly-cy)<14)c=[92,88,80];}
     // 磚緣微微下凹的陰影
     if(lx<3||ly<3)c=c.map(q=>q*.88);
     return [cl(c[0]+n),cl(c[1]+n),cl(c[2]+n)];});
   for(let i=0;i<26000;i++){const x=R()*S,y=R()*S;g.fillStyle=R()<.5?'rgba(60,50,40,.5)':'rgba(230,220,200,.35)';g.fillRect(x|0,y|0,1,1);}
   g.fillStyle='rgba(54,48,38,.95)';for(let i=0;i<S;i+=T){g.fillRect(i,0,2,S);g.fillRect(0,i,S,2);}
   g.fillStyle='rgba(20,16,12,.35)';for(let i=0;i<S;i+=T){g.fillRect(i+2,0,1,S);g.fillRect(0,i+2,S,1);}
   for(let i=0;i<10;i++)crack(g,R()*S,R()*S,20+R()*50,R()*PI*2,1,'rgba(30,26,20,.6)');
   for(let i=0;i<40;i++)glow(g,S,S,R()*S,R()*S,8+R()*40,'rgba(30,22,14,.2)');
   for(let i=0;i<6;i++){const x=R()*S,y=R()*S,r=10+R()*24;g.strokeStyle='rgba(40,30,20,.3)';g.lineWidth=2;g.beginPath();g.ellipse(x,y,r,r*.8,R()*3,0,PI*2);g.stroke();}
 });},
 // 室內 40cm 抛光石英磚；512px＝1.6m
 floor40(){const S=512,T=128,vn=fbm(3,5),d=fbm(5,3);return makeTex(S,S,g=>{
   const tv={};const tcol=(i,j)=>tv[i+'_'+j]||(tv[i+'_'+j]=[R()*10-5,R()*9]);
   fill(g,S,S,(x,y)=>{const t=tcol(x/T|0,y/T|0),u=x/S,v=y/S,vein=Math.abs(Math.sin((u*3+v*1.2)*PI*2+vn(u,v)*9+t[1])),n=(R()-.5)*5;
     let c=[206+t[0],202+t[0],192+t[0]];if(vein<.05)c=c.map(q=>q-30*(1-vein/.05));
     const k=Math.max(0,d(u,v)-.55)*.9;c=c.map((q,i)=>q*(1-k)+[60,54,44][i]*k);return [cl(c[0]+n),cl(c[1]+n),cl(c[2]+n)];});
   g.fillStyle='rgba(120,112,98,.9)';for(let i=0;i<S;i+=T){g.fillRect(i,0,1,S);g.fillRect(0,i,S,1);}
   for(let i=0;i<20;i++)glow(g,S,S,R()*S,R()*S,10+R()*30,'rgba(40,34,26,.12)');
   for(let i=0;i<40;i++){g.strokeStyle='rgba(255,255,255,.08)';g.beginPath();const x=R()*S,y=R()*S;g.moveTo(x,y);g.lineTo(x+(R()-.5)*80,y+(R()-.5)*30);g.stroke();}
 });},
 // 頂樓樓板：水泥地上殘留的綠色防水漆、黑色填縫膠、水漬、青苔；1024px＝4m
 roof(){const S=1024,b=fbm(3,4),pt=fbm(4,4),wr=fbm(32,2),st=fbm(6,3),ms=fbm(10,3),fine=fbm(96,1);return makeTex(S,S,g=>{
   fill(g,S,S,(x,y)=>{const u=x/S,v=y/S,bb=b(u,v),n=(R()-.5)*16+(fine(u,v)-.5)*24;
     let c=[118+bb*46,116+bb*44,108+bb*40];
     const p=pt(u,v)-(wr(u,v)-.5)*.35;if(p>.5){const e=p<.52?.7:1;c=[(70+bb*24)*e,(98+bb*22)*e,(80+bb*18)*e];}
     const s=st(u,v);if(s>.58){const k=Math.min(.75,(s-.58)*3.4);c=c.map((q,i)=>q*(1-k)+[24,24,20][i]*k);if(s<.6)c=c.map(q=>q*.8);}
     const m=ms(u,v);if(m>.66){const k=Math.min(.85,(m-.66)*5);c=c.map((q,i)=>q*(1-k)+[44,62,26][i]*k);}
     return [cl(c[0]+n),cl(c[1]+n),cl(c[2]+n)];});
   // 碎石粒與孔洞
   for(let i=0;i<60000;i++){const x=R()*S,y=R()*S;g.fillStyle=R()<.6?`rgba(30,28,24,${.3+R()*.4})`:`rgba(200,196,184,${.2+R()*.3})`;g.fillRect(x|0,y|0,R()<.9?1:2,R()<.9?1:2);}
   // 黑色瀝青填縫（修補過的裂縫）
   for(let i=0;i<4;i++){const x=R()*S,y=R()*S,a=R()*PI*2;crack(g,x,y,160+R()*260,a,3+R()*2,'rgba(14,14,12,.88)');crack(g,x,y,100+R()*160,a+PI,3,'rgba(14,14,12,.88)');}
   for(let i=0;i<12;i++)crack(g,R()*S,R()*S,40+R()*120,R()*PI*2,1,'rgba(26,24,20,.55)');
   // 盆底和水桶留下的圓形水漬、鏽漬
   for(let i=0;i<22;i++){const x=R()*S,y=R()*S,r=16+R()*50;g.strokeStyle=`rgba(30,28,22,${.1+R()*.15})`;g.lineWidth=1.5+R()*2;g.beginPath();g.arc(x,y,r,0,PI*2);g.stroke();if(R()<.5)glow(g,S,S,x,y,r,'rgba(30,26,20,.25)');}
   for(let i=0;i<10;i++)glow(g,S,S,R()*S,R()*S,14+R()*40,'rgba(120,58,20,.35)');
   // 落葉碎屑
   for(let i=0;i<220;i++){g.fillStyle=['#5a4a2a','#3a3a1e','#6a5a36','#2a2a1a'][R()*4|0];g.save();g.translate(R()*S,R()*S);g.rotate(R()*PI);g.fillRect(-3,-1.5,4+R()*6,2+R()*3);g.restore();}
 });},
 // 女兒牆：灰白漆面、上緣往下的黑色雨痕、牆腳青苔；512px＝2m
 parapet(){const S=512,PX=S/2,b=fbm(3,4),p=fbm(6,4),fine=fbm(64,2);return makeTex(S,S,g=>{
   fill(g,S,S,(x,y)=>{const u=x/S,v=y/S,fy=(S-y)/PX,bb=b(u,v),n=(R()-.5)*12+(fine(u,v)-.5)*20;
     let c=[176-bb*30,172-bb*30,160-bb*32];const pk=p(u,v);if(pk>.64)c=[130+bb*20,128+bb*20,120+bb*18];
     if(fy<.18+bb*.1){const k=Math.min(.85,(.28-fy)*4);c=c.map((q,i)=>q*(1-k)+[34,50,22][i]*k);}
     return [cl(c[0]+n),cl(c[1]+n),cl(c[2]+n)];});
   drips(g,S,S,140,'rgba(26,24,20,.42)',.43,.47,40,240);
   drips(g,S,S,60,'rgba(60,44,26,.3)',.43,.6,20,140);
   for(let i=0;i<8;i++)crack(g,R()*S,S*(.5+R()*.4),40+R()*120,-PI/2+(R()-.5),1.2,'rgba(30,26,20,.6)');
   for(let i=0;i<30000;i++){g.fillStyle=R()<.6?'rgba(30,28,24,.35)':'rgba(220,216,206,.25)';g.fillRect(R()*S|0,R()*S|0,1,1);}
 });},
 // 清水模混凝土：模板接縫、氣孔、水漬；512px
 concrete2(){const S=512,b=fbm(4,5),m=fbm(8,4),fine=fbm(64,2);return makeTex(S,S,g=>{
   fill(g,S,S,(x,y)=>{const u=x/S,v=y/S,c=110+b(u,v)*66,k=Math.min(.75,Math.max(0,m(u,v)-.55)*2.6),n=(R()-.5)*12+(fine(u,v)-.5)*22;return [cl(c*(1-k)+34*k+n),cl(c*(1-k)+35*k+n),cl(c*(1-k)+31*k+n)];});
   g.fillStyle='rgba(40,38,34,.4)';g.fillRect(0,S/2,S,2);g.fillRect(S/2,0,2,S);
   for(let i=0;i<450;i++){const x=R()*S,y=R()*S,r=.5+R()*R()*1.8;g.fillStyle='rgba(24,22,20,.45)';g.beginPath();g.arc(x,y,r,0,PI*2);g.fill();g.fillStyle='rgba(220,216,206,.25)';g.fillRect(x-r,y+r,r*2,1);}
   drips(g,S,S,70,'rgba(36,32,26,.36)',0,1,30,180);
   for(let i=0;i<6;i++)crack(g,R()*S,R()*S,40+R()*120,R()*PI*2,1,'rgba(30,28,24,.6)');
 });}
});
const MT={
 terr:ph(TX.terrazzo(),{shininess:48,specular:0x3a3a36},2.4),
 tile:ph(TX.wall({tw:32,th:80,base:[226,218,200],grout:'rgba(96,90,78,.9)',dirt:.35}),{shininess:40,specular:0x444444},1),
 tileD:ph(TX.wall({tw:32,th:80,base:[214,206,186],grout:'rgba(70,64,52,.95)',dirt:1.1,blue:true}),{shininess:28,specular:0x333333},1),
 tileSq:ph(TX.wall({tw:28,th:28,base:[224,220,206],grout:'rgba(86,82,72,.9)',dirt:.7}),{shininess:36,specular:0x3a3a3a},1),
 mosa:ph(TX.mosaic({pick:()=>{const v=150+R()*50;return R()<.08?[v-50,v-48,v-44]:[v,v+2,v-4];},grout:'rgba(60,60,56,.9)',dirt:.8,missing:2}),{shininess:30,specular:0x333333},.8),
 mosaG:ph(TX.mosaic({pick:(i,j)=>{const v=R()*20;return (i+j)%5===0?[60+v,110+v,84+v]:[176+v,180+v,170+v];},grout:'rgba(60,60,56,.9)',dirt:.6}),{shininess:30},.8),
 toiletFloor:ph(TX.mosaic({pick:(i,j)=>{const a=i%4,b=j%4,v=R()*16;return (a===1||b===1)&&!(a===1&&b===1)?[118+v,82+v,52+v]:(a===1&&b===1)?[60+v,44+v,30+v]:[196+v,178+v,146+v];},grout:'rgba(52,44,34,.95)',dirt:1.2,missing:6}),{shininess:24},.8),
 ceil:ph(TX.ceiling(),{shininess:4},4),
 conc:ph(TX.concrete2(),{shininess:6},1.6),
 wall2:ph(TX.wall2(),{shininess:14,specular:0x222222},3.4),
 wall2o:null,
 floor20:ph(TX.floor20(),{shininess:34,specular:0x333333},1.6),
 floor40:ph(TX.floor40(),{shininess:70,specular:0x555555},1.6),
 roof:ph(TX.roof(),{shininess:12,specular:0x222222},4),
 parapet:ph(TX.parapet(),{shininess:6},2),
 shut:ph(TX.shutter(),{shininess:30,specular:0x333333},2),
 slot:ph(TX.slotted(),{alphaTest:.5,side:DS,shininess:20},.55),
 steel:ph(TX.steel(),{shininess:110,specular:0xbbbbbb},null),
 fu:new THREE.MeshPhongMaterial({map:TX.fu(),transparent:true,alphaTest:.3,shininess:60,specular:0x999999,polygonOffset:true,polygonOffsetFactor:-2}),
 wood:ph(TX.wood(),{shininess:22},1),
 fabric:ph(TX.fabric(),{shininess:4},1),
 bagBlack:ph(TX.plasticBag([20,20,22]),{shininess:90,specular:0x666666}),
 bagWhite:ph(TX.plasticBag([214,214,208],200),{shininess:70,specular:0x888888,transparent:true,opacity:.9}),
 bagClear:ph(TX.plasticBag([200,204,200],120),{shininess:90,specular:0xaaaaaa,transparent:true,opacity:.55,side:DS,depthWrite:false}),
 bagBlue:ph(TX.plasticBag([60,90,150],220),{shininess:80,specular:0x777777,transparent:true,opacity:.85}),
 bagPink:ph(TX.plasticBag([214,110,160],220),{shininess:80,specular:0x777777,transparent:true,opacity:.85}),
 porc:ph(TX.porcelain(),{shininess:90,specular:0x888888,side:DS}),
 puddle:new THREE.MeshPhongMaterial({map:TX.puddle(),color:0x34444a,alphaTest:.5,shininess:140,specular:0xcccccc,polygonOffset:true,polygonOffsetFactor:-3}),
 dark:new THREE.MeshPhongMaterial({color:0x1a1816,shininess:10}),
 iron:new THREE.MeshPhongMaterial({color:0x2e2c2a,shininess:30,specular:0x333333}),
 pvc:new THREE.MeshPhongMaterial({color:0x9a9c98,shininess:40,specular:0x333333}),
 cable:new THREE.MeshPhongMaterial({color:0x5c4c3c,shininess:20}),
 red:new THREE.MeshPhongMaterial({color:0xa01c16,shininess:60,specular:0x553333}),
 blueTape:new THREE.MeshPhongMaterial({color:0x2a46c8,shininess:40}),
 tread:ph(TX.tread(),{shininess:10}),
 ribbed:ph(TX.ribbed(),{shininess:40}),
 handlePink:ph(TX.stripes('#e8a0b0','#c03050',10)),handleRed:ph(TX.stripes('#d84a3a','#8a2a24',6)),handleOrange:ph(TX.stripes('#f0f0e8','#e06a2a',12)),
 grey:new THREE.MeshPhongMaterial({color:0x8a8e90,shininess:30}),
 beige:new THREE.MeshPhongMaterial({color:0xd8ccb4,shininess:30})
};
MT.terr.map.repeat.set(1,1);
MT.wall2o=ph(MT.wall2.map,{shininess:10,specular:0x1a1a1a,color:0xb8b2a8},3.6);
/* ---------- 幾何工具 ---------- */
const V2=(r,y)=>new THREE.Vector2(r,y),V3=(x,y,z)=>new THREE.Vector3(x,y,z);
function add(geo,mat,p,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);p.add(m);return m;}
function rbox(w,h,d,r,seg){const g=new THREE.BoxGeometry(w,h,d,seg||4,seg||4,seg||4),p=g.attributes.position,hw=w/2-r,hh=h/2-r,hd=d/2-r,v=new THREE.Vector3(),c=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);c.set(Math.max(-hw,Math.min(hw,v.x)),Math.max(-hh,Math.min(hh,v.y)),Math.max(-hd,Math.min(hd,v.z)));v.sub(c);if(v.lengthSq()>1e-9)v.setLength(r);v.add(c);p.setXYZ(i,v.x,v.y,v.z);}
  g.computeVertexNormals();return g;}
function beam(a,b,w,h,mat,p){const d=new THREE.Vector3().subVectors(b,a),L=d.length(),m=add(new THREE.BoxGeometry(w,L,h),mat,p);m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(V3(0,1,0),d.normalize());return m;}
function rod(a,b,r,mat,p,seg){const d=new THREE.Vector3().subVectors(b,a),L=d.length(),m=add(new THREE.CylinderGeometry(r,r,L,seg||6),mat,p);m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(V3(0,1,0),d.normalize());return m;}
function tube(pts,r,mat,p,seg){return add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(q=>V3(q[0],q[1],q[2]))),seg||20,r,6,false),mat,p);}
function flat(g){return Pr.flatten(g);}
/* 垃圾袋：變形的球體，可選開口 */
function bagGeo(s,open,seed){const g=new THREE.SphereGeometry(s,20,16),p=g.attributes.position,v=new THREE.Vector3();seed=seed||1;
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);const a=Math.atan2(v.z,v.x),y=v.y/s;let r=1+.1*Math.sin(a*7+y*9+seed)+.07*Math.sin(a*13-y*17+seed*2)+.04*Math.sin(a*23+y*31)+.05*Math.sin(a*3+seed*3)+(y<0?.18*(-y):0);
    if(y<-.55){v.y=-.55*s+(v.y+.55*s)*.25;r*=1.08;}
    if(open&&y>.45){const k=(y-.45)/.55;v.y=.45*s+(v.y-.45*s)*.7;r*=1-.35*k+.12*Math.sin(a*9+seed)*k;}
    v.x*=r;v.z*=r;v.y*=.78+.06*Math.sin(a*5+seed)+.03*Math.sin(a*11);p.setXYZ(i,v.x,v.y,v.z);}
  g.translate(0,.55*s*.25+.4*s,0);g.computeVertexNormals();return g;}
function trashBag(s,mat,open,seed){const g=new THREE.Group();add(bagGeo(s,open,seed),mat,g);
  if(open){const d=add(new THREE.CircleGeometry(s*.55,12),MT.dark,g,0,s*1.15,0);d.rotation.x=-PI/2;
    [[.0,.0,.3],[.18,.08,.22],[-.15,.05,.24],[.05,-.15,.2]].forEach((q,i)=>{const m=add(bagGeo(s*q[2],false,i+3),i===3?MT.bagPink:MT.bagWhite,g,q[0]*s,s*.95,q[1]*s);m.scale.y=.7;});
    add(new THREE.BoxGeometry(s*.3,s*.06,s*.12),MT.handleOrange,g,s*.1,s*1.18,-s*.05).rotation.z=.6;}
  return flat(g);}

/* ---------- 物件 ---------- */
const F={MT,rbox,beam,rod,tube,trashBag,add,
 // 柱子：上半水泥、下半方磚，有些掛電錶
 pillar(x,z,o){o=o||{};box(.7,3.4,.7,x,1.7,z,MT.conc);box(.74,1.55,.74,x,.775,z,MT.tileSq,{collide:false});
   box(.78,.04,.78,x,1.55,z,MT.mosa,{collide:false});
   if(o.meter){const g=new THREE.Group();add(new THREE.BoxGeometry(.32,.42,.12),MT.grey,g);const gl=add(new THREE.BoxGeometry(.2,.14,.02),new THREE.MeshPhongMaterial({color:0x9ab0b8,shininess:120,specular:0xffffff,transparent:true,opacity:.7}),g,0,.06,.065);
     add(new THREE.CylinderGeometry(.02,.02,.5,6),MT.pvc,g,.1,-.45,0);g.position.set(x+o.meter[0],2.1,z+o.meter[1]);g.rotation.y=o.meter[2]||0;scene.add(g);}},
 // 攤台：髒牆磚側面、灰色馬賽克台面、圓角收邊
 stall(x0,x1,z0,z1,o){o=o||{};const w=x1-x0,d=z1-z0,cx=(x0+x1)/2,cz=(z0+z1)/2;box(w,.82,d,cx,.41,cz,MT.tileD);box(w+.06,.06,d+.06,cx,.85,cz,o.green?MT.mosaG:MT.mosa,{collide:false});
   const e=new THREE.Group();[[cx,z0-.03,w+.06,0],[cx,z1+.03,w+.06,0],[x0-.03,cz,d+.06,1],[x1+.03,cz,d+.06,1]].forEach(q=>{const m=add(new THREE.CylinderGeometry(.04,.04,q[2],8),MT.mosa,e,q[0],.86,q[1]);m.rotation.set(q[3]?PI/2:0,0,q[3]?0:PI/2);});scene.add(e);
   // 有孔角鋼吊架
   const rk=new THREE.Group();[z0+.4,z1-.4].forEach(z=>{const L=w;const a=add(new THREE.BoxGeometry(L,.05,.004),MT.slot,rk,cx,2.4,z);const b=add(new THREE.BoxGeometry(L,.004,.05),MT.slot,rk,cx,2.425,z+.025);
     for(let x=x0+.4;x<=x1-.3;x+=Math.max(1.2,(w-.7)/3)){beam(V3(x-.35,2.4,z),V3(x,3.4,z),.05,.004,MT.slot,rk);beam(V3(x+.35,2.4,z),V3(x,3.4,z),.05,.004,MT.slot,rk);}
     for(let x=x0+.6;x<x1-.3;x+=.9)if(R()<.4){const h=.2+R()*.3;rod(V3(x,2.4,z),V3(x+(R()-.5)*.1,2.4-h,z),.004,MT.iron,rk);add(new THREE.TorusGeometry(.03,.004,4,8,PI*1.4),MT.iron,rk,x,2.4-h-.03,z);}});
   scene.add(rk);
   if(o.label){const s=mesh(new THREE.PlaneGeometry(.08,.16),new THREE.MeshPhongMaterial({map:K.signTex(['肉','攤'],'#e8c820','#a01010',90)}),o.label[0],.6,o.label[1]);s.rotation.y=o.label[2]||0;}},
 // 天花板管線與日光燈
 ceilingStuff(){const g=new THREE.Group();
   [[-7.9,-1,-27.6,.05,MT.pvc],[-.3,-1,-27.6,.03,MT.iron],[3.2,-1,-27.6,.045,MT.pvc]].forEach(q=>rod(V3(q[0],3.28,q[1]),V3(q[0],3.28,q[2]),q[3],q[4],g,8));
   rod(V3(-11.6,3.22,-1.3),V3(6.6,3.22,-1.3),.05,MT.pvc,g,8);rod(V3(-11.6,3.3,-1.6),V3(6.6,3.3,-1.6),.025,MT.iron,g,6);
   for(let z=-3;z>-27;z-=4)[-7.9,3.2].forEach(x=>add(new THREE.BoxGeometry(.08,.08,.04),MT.iron,g,x,3.33,z));
   tube([[-10.7,3.22,-1.3],[-10.7,3.0,-1.3],[-10.7,2.8,-1.7],[-10.6,2.6,-3.4]],.04,MT.pvc,g);
   [[-2,-5,1],[-2,-12,0],[-2,-19,1],[4,-14,0],[4,-22,1],[-7,-18,0]].forEach(q=>{const f=new THREE.Group();add(new THREE.BoxGeometry(1.3,.06,.14),MT.grey,f);
     if(q[2])add(new THREE.CylinderGeometry(.018,.018,1.2,8).rotateZ(PI/2),new THREE.MeshBasicMaterial({color:0x6a7276}),f,0,-.05,0);
     f.position.set(q[0],3.36,q[1]);if(q[1]===-12){f.rotation.z=.35;f.position.y=3.1;}g.add(f);});
   scene.add(flat(g));},
 // 懸吊電線（照片中的粗電纜）
 cables(){const g=new THREE.Group();const C=[
   [[-4,3.35,-16.5],[-2.6,2.2,-18],[-.6,2.9,-17.2],[.6,2.05,-19.4],[1.2,3.35,-20.6]],[[-7,3.35,-9],[-6.4,2.3,-11],[-7.2,2.6,-13],[-6.2,3.35,-14.5]],
   [[-1.2,2.42,-21],[-.5,1.8,-20.2],[.4,2.1,-19.6],[1.4,2.42,-19]],[[-4.9,3.3,-8],[-4.5,2.6,-8.4],[-3.2,2.9,-8.9],[-2,2.4,-9.4]],[[1.4,3.3,-3],[1.0,2.4,-3.6],[.4,2.0,-3.4]]];
   C.forEach((pts,i)=>tube(pts,i<2?.032:.022,MT.cable,g,32));scene.add(flat(g));},
 extinguisher(x,z,ry){const g=new THREE.Group();add(new THREE.LatheGeometry([V2(.001,0),V2(.075,0),V2(.085,.02),V2(.085,.42),V2(.07,.48),V2(.03,.52),V2(.001,.52)],14),MT.red,g);
   add(new THREE.CylinderGeometry(.02,.022,.06,8),MT.iron,g,0,.55,0);add(new THREE.BoxGeometry(.14,.02,.03),MT.iron,g,.04,.6,0).rotation.z=-.2;
   const ga=add(new THREE.CylinderGeometry(.025,.025,.012,10).rotateX(PI/2),MT.porc,g,-.035,.56,.02);
   tube([[.02,.56,0],[.09,.5,.02],[.11,.3,.04],[.09,.18,.05]],.008,MT.dark,g,10);
   const lb=add(new THREE.PlaneGeometry(.11,.15),new THREE.MeshPhongMaterial({map:K.signTex(['滅火器','ABC'],'#e8e0c8','#a01010',60)}),g,0,.27,.087);
   add(new THREE.BoxGeometry(.03,.25,.005),MT.blueTape,g,.05,.6,.03).rotation.z=-.9;
   g.position.set(x,0,z);g.rotation.y=ry||0;scene.add(flat(g));return g;},
 sofa(x,y,z,ry){const g=new THREE.Group();add(rbox(2.3,.32,.85,.07),MT.fabric,g,0,.16,0);add(rbox(2.3,.5,.26,.08),MT.fabric,g,0,.52,-.32);
   [-1.1,1.1].forEach(dx=>add(rbox(.26,.42,.85,.08),MT.fabric,g,dx,.4,0));[-.55,.55].forEach(dx=>add(rbox(1.04,.14,.6,.05),MT.fabric,g,dx,.38,.08));
   g.position.set(x,y,z);g.rotation.y=ry||0;scene.add(flat(g));},
 cabinet(x,y,z,ry){const g=new THREE.Group();add(new THREE.BoxGeometry(.9,1.5,.5),MT.wood,g,0,.75,0);add(new THREE.BoxGeometry(.02,1.3,.01),MT.dark,g,0,.78,.255);
   [-.06,.06].forEach(dx=>add(new THREE.BoxGeometry(.02,.1,.03),MT.grey,g,dx,.8,.27));g.position.set(x,y,z);g.rotation.y=ry||0;scene.add(flat(g));},
 // 不鏽鋼水塔（含支架、管線、滴水）
 waterTower(x,z){const g=new THREE.Group(),R0=.95,yb=1.72,H0=1.45,P=[V2(.001,yb-.12),V2(R0*.6,yb-.1),V2(R0*.92,yb-.05),V2(R0,yb+.04)];
   [.32,.72,1.12].forEach(h=>{P.push(V2(R0,yb+h-.035),V2(R0+.028,yb+h-.015),V2(R0+.028,yb+h+.015),V2(R0,yb+h+.035));});
   P.push(V2(R0,yb+H0),V2(R0*.97,yb+H0+.08),V2(R0*.86,yb+H0+.15),V2(R0*.55,yb+H0+.21),V2(.27,yb+H0+.23),V2(.27,yb+H0+.29),V2(.001,yb+H0+.3));
   add(new THREE.LatheGeometry(P,40),MT.steel,g);
   add(new THREE.CylinderGeometry(R0+.031,R0+.031,.75,20,1,true,PI/2-.32,.64),MT.fu,g,0,yb+.78,0);
   const legM=MT.iron;const tops=[],bots=[];for(let i=0;i<4;i++){const a=PI/4+i*PI/2;tops.push(V3(Math.cos(a)*.72,yb-.06,Math.sin(a)*.72));bots.push(V3(Math.cos(a)*.98,0,Math.sin(a)*.98));}
   for(let i=0;i<4;i++){beam(bots[i],tops[i],.05,.05,legM,g);const j=(i+1)%4;
     const lo=t=>new THREE.Vector3().lerpVectors(bots[i],tops[i],t),lo2=t=>new THREE.Vector3().lerpVectors(bots[j],tops[j],t);
     beam(lo(.12),lo2(.12),.035,.035,legM,g);beam(lo(.96),lo2(.96),.035,.035,legM,g);if(i%2===0){beam(lo(.12),lo2(.9),.025,.025,legM,g);}}
   bots.forEach(b=>add(new THREE.BoxGeometry(.12,.015,.12),legM,g,b.x,.008,b.z));
   // 出水管、浮球閥、PVC 管
   tube([[0,yb-.11,0],[0,yb-.4,0],[.15,yb-.6,.05],[.7,yb-.7,.4],[.95,yb-.75,.55]],.04,MT.steel,g);
   rod(V3(.95,yb-.75,.55),V3(.95,.05,.55),.04,MT.pvc,g,8);add(new THREE.TorusGeometry(.07,.012,5,10),MT.red,g,.95,1.0,.62);rod(V3(.95,1.0,.55),V3(.95,1.0,.63),.008,MT.iron,g);
   add(new THREE.BoxGeometry(.14,.18,.1),MT.grey,g,.95,.7,.55);
   rod(V3(-.5,yb+H0+.18,.3),V3(-.5,yb+H0+.6,.3),.03,MT.pvc,g);
   const tw=flat(g);tw.position.set(x,0,z);scene.add(tw);
   // 滴水
   const drop=new THREE.Mesh(new THREE.SphereGeometry(.018,6,5),new THREE.MeshPhongMaterial({color:0xaac8d0,shininess:120,specular:0xffffff,transparent:true,opacity:.8}));scene.add(drop);
   const ripple=new THREE.Mesh(new THREE.RingGeometry(.02,.04,16),new THREE.MeshBasicMaterial({color:0x9ab0b8,transparent:true,opacity:.6,side:DS}));ripple.rotation.x=-PI/2;scene.add(ripple);
   anim.push(t=>{const ph=(t%1.4)/1.4,dx=x+.12,dz=z+.08;if(ph<.55){drop.visible=true;drop.position.set(dx,yb-.13-(ph/.55)*(yb-.15)*(ph/.55),dz);ripple.visible=false;}else{drop.visible=false;ripple.visible=true;const k=(ph-.55)/.45;ripple.position.set(dx,.04,dz);ripple.scale.setScalar(1+k*5);ripple.material.opacity=.6*(1-k);}});
   return tw;},
 stool(x,z,ry){const g=new THREE.Group();add(rbox(.3,.04,.3,.015),MT.beige,g,0,.42,0);for(let i=0;i<4;i++){const a=PI/4+i*PI/2;beam(V3(Math.cos(a)*.11,.4,Math.sin(a)*.11),V3(Math.cos(a)*.16,0,Math.sin(a)*.16),.04,.025,MT.beige,g);}
   add(new THREE.CylinderGeometry(.03,.03,.012,10),MT.dark,g,0,.445,0);g.position.set(x,0,z);g.rotation.y=ry||0;scene.add(flat(g));},
 puddle(w,d,mat){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),mat||MT.puddle);m.rotation.x=-PI/2;return m;},
 // 廁所的門：木紋、下方百葉、門把
 door(w,h,o){o=o||{};const g=new THREE.Group();add(new THREE.BoxGeometry(.045,h,w),MT.wood,g,0,h/2,w/2);
   for(let i=0;i<6;i++)add(new THREE.BoxGeometry(.02,.012,w*.5),MT.dark,g,.025,.2+i*.035,w/2).rotation.z=.5;
   add(new THREE.BoxGeometry(.01,.24,w*.54),MT.dark,g,.021,.29,w/2);
   [.03,-.03].forEach(dx=>{add(new THREE.SphereGeometry(.03,8,6),MT.steel,g,dx*2.2,1.0,w-.09);add(new THREE.CylinderGeometry(.03,.03,.02,10).rotateZ(PI/2),MT.steel,g,dx*1.3,1.0,w-.09);});
   return flat(g);},
 frame(w,h){const g=new THREE.Group();add(new THREE.BoxGeometry(.08,h+.05,.05),MT.dark,g,0,(h+.05)/2,-.025);add(new THREE.BoxGeometry(.08,h+.05,.05),MT.dark,g,0,(h+.05)/2,w+.025);add(new THREE.BoxGeometry(.08,.05,w+.1),MT.dark,g,0,h+.025,w/2);return flat(g);},
 cistern(withLid){const g=new THREE.Group();add(rbox(.34,.3,.6,.03),MT.porc,g,0,.15,0);add(new THREE.BoxGeometry(.28,.02,.54),MT.dark,g,0,.295,0);
   if(withLid)add(rbox(.36,.04,.62,.015),MT.porc,g,0,.32,0);else{const l=add(new THREE.BoxGeometry(.02,.02,.35),MT.iron,g,0,.36,.05);l.rotation.x=-.3;}
   rod(V3(-.1,0,-.2),V3(-.24,-.95,-.2),.018,MT.iron,g);tube([[0,.22,.3],[0,.22,.42],[0,.6,.45],[0,.62,.9]],.012,MT.iron,g,10);return flat(g);},
 squat(){const g=new THREE.Group();const pan=add(new THREE.LatheGeometry([V2(.001,.02),V2(.1,.03),V2(.17,.09),V2(.19,.11),V2(.21,.11),V2(.21,.06),V2(.2,.0)],16),MT.porc,g);pan.scale.set(1,1,1.9);pan.rotation.y=PI/2;
   const hood=add(new THREE.SphereGeometry(.17,12,8,0,PI*2,0,PI/2),MT.porc,g,-.3,.08,0);hood.scale.set(.8,.75,1.05);
   const inr=add(new THREE.CircleGeometry(.16,16).rotateX(-PI/2),new THREE.MeshPhongMaterial({color:0xb8b8b0,shininess:80}),g,0,.045,0);inr.scale.set(1.75,1,1);
   add(new THREE.CircleGeometry(.05,10).rotateX(-PI/2),MT.dark,g,.2,.05,0);[[-.05,.06],[.08,-.05],[-.15,-.06]].forEach(q=>add(new THREE.CircleGeometry(.025,6).rotateX(-PI/2),new THREE.MeshPhongMaterial({color:0x5a4a2a}),g,q[0],.05,q[1]));return flat(g);},
 sink(){const g=new THREE.Group();add(rbox(.5,.16,.42,.03),MT.porc,g,0,.08,0);add(new THREE.BoxGeometry(.42,.02,.32),new THREE.MeshPhongMaterial({color:0x9a9c98,shininess:80}),g,0,.15,.02);
   rod(V3(0,.18,-.18),V3(0,.32,-.18),.018,MT.steel,g);rod(V3(0,.32,-.18),V3(0,.32,-.06),.015,MT.steel,g);add(new THREE.CylinderGeometry(.04,.04,.02,8),MT.steel,g,0,.36,-.18);return flat(g);},
 window(w,h){const g=new THREE.Group();add(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:0xb4bcc4}),g);
   [[0,h/2,w,.04],[0,-h/2,w,.04],[-w/2,0,.04,h],[w/2,0,.04,h],[0,0,.03,h]].forEach(q=>add(new THREE.BoxGeometry(q[2],q[3],.06),MT.grey,g,q[0],q[1],.02));
   for(let i=1;i<6;i++)add(new THREE.BoxGeometry(.012,h,.012),MT.iron,g,-w/2+i*w/6,0,.06);for(let j=1;j<4;j++)add(new THREE.BoxGeometry(w,.012,.012),MT.iron,g,0,-h/2+j*h/4,.06);return flat(g);},
 /* 垃圾角落 */
 handle(len,mat,top){const g=new THREE.Group();add(new THREE.CylinderGeometry(.013,.013,len,8),mat,g,0,len/2,0);if(top)add(new THREE.SphereGeometry(.018,8,6),mat,g,0,len,0);return g;},
 broom(){const g=F.handle(1.25,MT.handlePink,true);add(new THREE.BoxGeometry(.28,.06,.05),MT.red,g,0,.03,0);for(let i=0;i<14;i++)add(new THREE.BoxGeometry(.008,.12,.03),new THREE.MeshPhongMaterial({color:0xc83a3a}),g,-.13+i*.02,-.05,0);return g;},
 hose(pts){const g=new THREE.Group();const t=tube(pts,.026,MT.ribbed,g,48);t.material=MT.ribbed;return g;},
 dustpan(){const g=new THREE.Group();add(new THREE.BoxGeometry(.3,.015,.26),MT.grey,g,0,.01,0);add(new THREE.BoxGeometry(.3,.12,.015),MT.grey,g,0,.07,-.13);[-1,1].forEach(s=>add(new THREE.BoxGeometry(.015,.08,.24),MT.grey,g,s*.15,.05,0));
   add(new THREE.CylinderGeometry(.015,.015,.5,6).rotateX(PI/2.4),MT.grey,g,0,.2,-.32);return flat(g);},
 tire(){const g=new THREE.Group();add(new THREE.TorusGeometry(.31,.022,8,40),MT.tread,g);add(new THREE.TorusGeometry(.29,.006,4,30),MT.grey,g);return flat(g);},
 lid(){const g=new THREE.Group();add(new THREE.CylinderGeometry(.08,.08,.02,16),MT.porc,g,0,.01,0);add(new THREE.TorusGeometry(.08,.006,4,16).rotateX(PI/2),MT.porc,g,0,.02,0);return flat(g);}
};
return F;};
