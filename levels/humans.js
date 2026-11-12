/* 人物模型（PS1 風格獨立恐怖遊戲）：
   低多邊形、平面著色、低解析度手繪寫實貼圖（陰影畫在貼圖上）、頂點抖動、低飽和度、僵硬緩慢的動作。
   look 參數：skin, shirt, shirt2, pattern(plain|stripe|floral|check|uniform), pants, shoes, hair, style(short|side|bun|perm|bald|cap),
   cap, age(0~1), sleeves(short|long), glasses, apron, vest, beard, hunch(0~1), pose(idle|cross|behind|hold|angry), mood(calm|tired|angry), h, turn */
window.makeHuman=function(THREE){
const R=Math.random,PI=Math.PI,cache={};
/* 低飽和、偏暗 */
function mute(n,k){k=k||.38;const r=(n>>16)&255,g=(n>>8)&255,b=n&255,l=(r*.3+g*.59+b*.11);const f=c=>Math.round((c*(1-k)+l*k)*.88);return (f(r)<<16)|(f(g)<<8)|f(b);}
const css=(n,a)=>`rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a===undefined?1:a})`;
function ctex(key,w,h,draw){if(cache[key])return cache[key];const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.imageSmoothingEnabled=false;draw(g,w,h);
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;t.wrapS=t.wrapT=THREE.RepeatWrapping;cache[key]=t;return t;}
function grain(g,w,h,a){const im=g.getImageData(0,0,w,h),d=im.data;for(let i=0;i<d.length;i+=4){const k=(R()-.5)*a;d[i]+=k;d[i+1]+=k;d[i+2]+=k;}g.putImageData(im,0,0);}
/* PS1 頂點抖動 */
function psx(m){m.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include project_vertex','#include project_vertex\n  { vec4 sn=gl_Position; sn.xy/=sn.w; sn.xy=floor(sn.xy*vec2(170.,128.)+.5)/vec2(170.,128.); sn.xy*=sn.w; gl_Position=sn; }');};m.customProgramCacheKey=()=>'psx';return m;}
const MAT=(o)=>psx(new THREE.MeshPhongMaterial(Object.assign({shininess:0,specular:0x000000,flatShading:true},o)));

/* ---------- 臉部貼圖（64×64，陰影畫進去） ---------- */
function faceTex(L){const key=`f${L.skin}${L.age}${L.mood}${L.style}${L.hair}${L.beard?1:0}`;return ctex(key,64,64,(g,w,h)=>{
  const sk=L.skin,ang=L.mood==='angry';
  // 底色與立體陰影：額頭亮、下巴與兩側暗
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const dx=(x-32)/32,fy=y/h;let k=1.06-Math.abs(dx)*.45-Math.max(0,fy-.7)*.6+(fy<.35?.05:0);
    g.fillStyle=css(sk&0xffffff,1);g.globalAlpha=1;g.fillStyle=`rgb(${((sk>>16)&255)*k|0},${((sk>>8)&255)*k|0},${(sk&255)*k|0})`;g.fillRect(x,y,1,1);}
  const D=(a)=>`rgba(40,22,14,${a})`,H=(a)=>`rgba(255,235,215,${a})`;
  // 髮際線
  if(L.style!=='bald'&&L.style!=='cap'){g.fillStyle=css(mute(L.hair,.2));for(let x=0;x<w;x++){const t=6+Math.sin(x*.5)*1.2+(Math.abs(x-32)>18?4:0)+R()*1.5;g.fillRect(x,0,1,t);}}
  // 眉骨亮面、眼窩
  g.fillStyle=H(.12);g.fillRect(16,19,32,3);
  [-1,1].forEach(s=>{const cx=32+s*9;g.fillStyle=D(.42);g.beginPath();g.ellipse(cx,27,7,4.2,0,0,7);g.fill();g.fillStyle=D(.25);g.beginPath();g.ellipse(cx,31,6,2,0,0,7);g.fill();
    // 眉毛
    g.fillStyle=L.age>.6?'rgba(150,146,138,.9)':'rgba(30,22,16,.9)';for(let i=0;i<9;i++){const xx=cx+s*(i-4)*1.1,yy=21.5+(ang?(s*(4-i)*.35+1):-Math.sin(i/8*PI)*.8);g.fillRect(Math.round(xx-.5),Math.round(yy),1,2);}
    // 眼睛：沒有反光，略顯空洞
    g.fillStyle='rgba(196,186,170,1)';g.fillRect(cx-3,26,6,ang?3:2);g.fillStyle='#120c08';g.fillRect(cx-1,26,2,ang?3:2);
    g.fillStyle=D(.6);g.fillRect(cx-3,25,6,1);g.fillStyle=D(.3);g.fillRect(cx-3,29,6,1);});
  // 鼻子
  g.fillStyle=D(.3);g.fillRect(30,28,1,10);g.fillStyle=H(.15);g.fillRect(32,29,1,8);g.fillStyle=D(.45);g.fillRect(28,38,8,1);g.fillStyle=D(.7);g.fillRect(29,38,2,1);g.fillRect(33,38,2,1);
  g.fillStyle=H(.12);g.fillRect(31,36,2,2);
  // 法令紋、嘴
  g.fillStyle=D(.18+L.age*.25);for(let i=0;i<8;i++){g.fillRect(26-i*.3,38+i,1,1);g.fillRect(38+i*.3,38+i,1,1);}
  if(ang){g.fillStyle='#1a0806';g.fillRect(28,44,8,4);g.fillStyle='rgba(190,180,160,.9)';g.fillRect(29,44,6,1);g.fillStyle=D(.5);g.fillRect(27,43,10,1);}
  else{g.fillStyle='rgba(110,58,50,.9)';g.fillRect(27,45,10,1);g.fillStyle='rgba(150,90,80,.5)';g.fillRect(28,46,8,1);g.fillStyle=D(.35);g.fillRect(27,44,10,1);if(L.mood==='tired'){g.fillStyle=D(.3);g.fillRect(26,46,1,1);g.fillRect(37,46,1,1);}}
  // 下巴陰影、鬍渣
  g.fillStyle=D(.22);g.fillRect(24,52,16,3);
  if(L.beard){for(let i=0;i<220;i++){const x=20+R()*24,y=40+R()*16;g.fillStyle=`rgba(30,26,22,${.15+R()*.25})`;g.fillRect(x|0,y|0,1,1);}}
  // 年紀：額紋、眼袋、魚尾紋
  if(L.age>.4){g.fillStyle=D(.15+L.age*.25);for(let r=0;r<3;r++)for(let x=20;x<44;x++)if(R()<.8)g.fillRect(x,13+r*3+Math.round(Math.sin(x*.4)*.6),1,1);
    [-1,1].forEach(s=>{const cx=32+s*9;g.fillRect(cx-3,32,6,1);g.fillRect(cx+s*5,25,1,1);g.fillRect(cx+s*6,27,1,1);g.fillRect(cx+s*5,29,1,1);});}
  if(ang){g.fillStyle=D(.35);g.fillRect(31,18,1,4);g.fillRect(33,18,1,4);}
  grain(g,w,h,14);
});}
function clothTex(L,base,base2,pattern){const key=`c${base}${base2}${pattern}`;return ctex(key,64,64,(g,w,h)=>{
  const b=mute(base),b2=mute(base2);g.fillStyle=css(b);g.fillRect(0,0,w,h);
  if(pattern==='stripe'){g.fillStyle=css(b2);for(let y=0;y<h;y+=6)g.fillRect(0,y,w,2);}
  else if(pattern==='check'){g.fillStyle=css(b2,.5);for(let x=0;x<w;x+=8)g.fillRect(x,0,3,h);for(let y=0;y<h;y+=8)g.fillRect(0,y,w,3);}
  else if(pattern==='floral'){for(let i=0;i<34;i++){const x=R()*w|0,y=R()*h|0;g.fillStyle=css(b2,.75);g.fillRect(x-1,y,3,1);g.fillRect(x,y-1,1,3);g.fillStyle=css(mute(0x4a6a3a),.6);g.fillRect(x+2,y+1,2,1);}}
  else if(pattern==='uniform'){g.fillStyle=css(b,1);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(1,0,1,h);g.fillStyle='rgba(210,200,170,.7)';for(let y=6;y<h;y+=12)g.fillRect(3,y,1,1);g.fillStyle=css(b2,.8);g.fillRect(8,14,7,6);}
  // 布料皺摺與陰影（u=0 是正面）
  for(let y=0;y<h;y++){const fy=y/h;g.fillStyle=`rgba(0,0,0,${Math.max(0,fy-.75)*.8})`;g.fillRect(0,y,w,1);}
  for(let x=0;x<w;x++){const side=Math.abs(Math.sin(x/w*PI*2));g.fillStyle=`rgba(0,0,0,${side*.22})`;g.fillRect(x,0,1,h);}
  g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=1;for(let i=0;i<10;i++){const x=R()*w,y=h*.3+R()*h*.6;g.beginPath();g.moveTo(x,y);g.lineTo(x+(R()-.5)*8,y+6+R()*8);g.stroke();}
  g.fillStyle='rgba(255,255,255,.07)';for(let i=0;i<6;i++){g.fillRect(R()*w,h*.2+R()*h*.5,1,6+R()*8);}
  for(let i=0;i<5;i++){g.fillStyle=`rgba(40,30,20,${.12+R()*.15})`;g.beginPath();g.ellipse(R()*w,h*.4+R()*h*.6,2+R()*5,1+R()*3,0,0,7);g.fill();}
  grain(g,w,h,18);
});}
function plainTex(n,key,dark){return ctex('p'+key+n,32,32,(g,w,h)=>{g.fillStyle=css(mute(n));g.fillRect(0,0,w,h);for(let y=0;y<h;y++){g.fillStyle=`rgba(0,0,0,${(y/h)*(dark||.3)})`;g.fillRect(0,y,w,1);}grain(g,w,h,20);});}
function hairTex(n){return ctex('h'+n,32,32,(g,w,h)=>{g.fillStyle=css(mute(n,.2));g.fillRect(0,0,w,h);for(let i=0;i<120;i++){g.fillStyle=`rgba(${R()<.5?0:255},${R()<.5?0:255},${R()<.5?0:255},.1)`;g.fillRect(R()*w|0,R()*h|0,1,2+R()*3|0);}});}

/* ---------- 幾何 ---------- */
function seg(r1,r2,len,mat,n){const g=new THREE.CylinderGeometry(r1,r2,len,n||6);g.translate(0,-len/2,0);return new THREE.Mesh(g,mat);}
/* 稜角分明的頭：下巴、平的臉、後腦；臉部用正面投影的 UV */
function headGeo(){const g=new THREE.SphereGeometry(.1,10,8),p=g.attributes.position,uv=g.attributes.uv,v=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);let x=v.x*.84,y=v.y*1.16,z=v.z*.98;
    if(y<-.025){const k=Math.min(1,(-.025-y)/.09);x*=1-.32*k;if(z>0)z+=.012*k;else z*=1-.25*k;}
    if(z>.058)z=.058+(z-.058)*.45;
    if(y>.012&&y<.04&&z>.05)z+=.005;
    if(z<-.02&&y>-.02)z*=1.08;
    p.setXYZ(i,x,y,z);
    if(z>-.035)uv.setXY(i,.5+x/.19,.5+y/.235);else uv.setXY(i,.02,.6);}
  g.computeVertexNormals();return g;}

function human(look){
  const L=Object.assign({skin:0xb08a6c,shirt:0x6a6e74,shirt2:0x9a9ea4,pattern:'plain',pants:0x34363c,shoes:0x1e1c1a,hair:0x1a1714,style:'short',age:.3,sleeves:'short',pose:'idle',mood:'calm',h:1,hunch:0},look||{});
  L.skin=mute(L.skin,.15);
  const g=new THREE.Group(),root=new THREE.Group();g.add(root);root.scale.setScalar(L.h);
  const skinM=MAT({color:L.skin}),shirtM=MAT({map:clothTex(L,L.shirt,L.shirt2,L.pattern)}),pantsM=MAT({map:plainTex(L.pants,'pa',.45)}),shoeM=MAT({color:mute(L.shoes)}),hairM=MAT({map:hairTex(L.hair)}),faceM=MAT({map:faceTex(L)});
  const F=L.sex==='f';
  // 由斷面層層接起來的身體：rings=[y, 半寬, 前後半厚, 胸前前移]
  function loft(rings,seg,a0,a1,mat){const pos=[],uv=[],idx=[];seg=seg||12;a0=a0||0;a1=a1===undefined?PI*2:a1;
    rings.forEach((r,j)=>{for(let i=0;i<=seg;i++){const a=a0+(a1-a0)*i/seg,sx=Math.sin(a),cz=Math.cos(a),e=.78;
      const x=Math.sign(sx)*Math.pow(Math.abs(sx),e)*r[1],z=Math.sign(cz)*Math.pow(Math.abs(cz),e)*r[2]+(r[3]||0)*Math.max(0,cz);pos.push(x,r[0],z);uv.push(i/seg,j/(rings.length-1));}});
    for(let j=0;j<rings.length-1;j++)for(let i=0;i<seg;i++){const q=j*(seg+1)+i,w=q+seg+1;idx.push(q,q+1,w,w,q+1,w+1);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
    return new THREE.Mesh(g,mat);}
  function limb(pts,mat,n){const g=new THREE.LatheGeometry(pts.map(q=>new THREE.Vector2(q[0],q[1])),n||7);return new THREE.Mesh(g,mat);}
  const hipW=F?.188:.168,shW=F?.182:.205;
  // 骨盆（不隨上身彎曲）
  root.add(loft([[.78,.12,.09],[.82,hipW*.97,.11],[.9,hipW,.118,.004],[.98,hipW*.86,.104]],12,0,PI*2,pantsM));
  // 腿：大腿上粗下細，小腿肚隆起
  const legs=[];[-1,1].forEach(s=>{const hip=new THREE.Group();hip.position.set(s*.09,.86,0);root.add(hip);
    hip.add(limb([[.002,.02],[.082,.0],[.084,-.06],[.074,-.2],[.06,-.36],[.054,-.44],[.002,-.44]],pantsM));
    const knee=new THREE.Group();knee.position.y=-.44;hip.add(knee);
    knee.add(limb([[.002,0],[.054,0],[.06,-.09],[.058,-.16],[.046,-.28],[.036,-.38],[.002,-.39]],pantsM));
    const sg=new THREE.BoxGeometry(.092,.07,.25,1,1,2),sp=sg.attributes.position;for(let i=0;i<sp.count;i++){const z=sp.getZ(i);if(z>.05){sp.setX(i,sp.getX(i)*.78);if(sp.getY(i)>0)sp.setY(i,sp.getY(i)-.02);}}sg.computeVertexNormals();
    const shoe=new THREE.Mesh(sg,shoeM);shoe.position.set(0,-.4,.05);knee.add(shoe);legs.push(hip);});
  // 上身：腰→胸廓→肩→斜方肌→脖子
  const spine=new THREE.Group();spine.position.y=.98;spine.rotation.x=L.hunch*.32;root.add(spine);
  const UP=[[0,hipW*.86,.104],[.1,(F?.15:.158),.106,.004],[.2,(F?.16:.176),(F?.118:.114),.012],[.3,shW*.93,(F?.124:.12),.018],[.38,shW*.97,.112,.012],[.44,shW,.098],[.49,shW*.78,.086],[.53,.072,.06]];
  spine.add(loft(UP,12,0,PI*2,shirtM));
  if(L.apron){const ap=new THREE.Mesh(new THREE.PlaneGeometry(.3,.58),MAT({map:clothTex(L,L.apron,0xd8d0c4,'check'),side:THREE.DoubleSide}));ap.position.set(0,.12,.128);ap.rotation.x=-.05;spine.add(ap);}
  if(L.vest){const v=loft(UP.slice(0,7).map(r=>[r[0],r[1]*1.06+.006,r[2]*1.08+.006,r[3]]),12,.55,PI*2-.55,MAT({map:plainTex(L.vest,'ve',.35),side:THREE.DoubleSide}));spine.add(v);}
  // 脖子與頭
  const neck=new THREE.Group();neck.position.y=.52;spine.add(neck);const nk=seg(.045,.052,.09,skinM);nk.position.y=.09;neck.add(nk);
  const head=new THREE.Group();head.position.y=.17;neck.add(head);
  head.add(new THREE.Mesh(headGeo(),faceM));
  [-1,1].forEach(s=>{const e=new THREE.Mesh(new THREE.BoxGeometry(.016,.04,.025),skinM);e.position.set(s*.086,-.002,-.005);head.add(e);});
  const nose=new THREE.Mesh(new THREE.ConeGeometry(.014,.035,4),skinM);nose.rotation.x=PI/2+.25;nose.position.set(0,-.018,.066);head.add(nose);
  // 頭髮（低多邊形塊狀）
  const hairCap=(cov,sc,tilt)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.103,8,5,0,PI*2,0,PI*cov),hairM);m.scale.set(.9*(sc||1),1.18*(sc||1),1.04*(sc||1));m.position.set(0,.012,-.01);m.rotation.x=tilt===undefined?-.32:tilt;head.add(m);return m;};
  if(L.style==='short'){hairCap(.46);const b=new THREE.Mesh(new THREE.BoxGeometry(.15,.08,.04),hairM);b.position.set(0,-.02,-.085);head.add(b);}
  else if(L.style==='side'){hairCap(.5);const f=new THREE.Mesh(new THREE.BoxGeometry(.12,.025,.05),hairM);f.position.set(.02,.09,.05);f.rotation.z=-.3;head.add(f);}
  else if(L.style==='bun'){hairCap(.4,1,-.45);const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.042,0),hairM);b.position.set(0,.06,-.105);head.add(b);}
  else if(L.style==='perm'){hairCap(.55,1.12,-.2);for(let i=0;i<9;i++){const a=i/9*PI*2,m=new THREE.Mesh(new THREE.IcosahedronGeometry(.036,0),hairM);m.position.set(Math.cos(a)*.088,.04+Math.sin(i*1.7)*.02,Math.sin(a)*.08-.02);if(m.position.z>.05)continue;head.add(m);}}
  else if(L.style==='bald'){const t=new THREE.Mesh(new THREE.TorusGeometry(.088,.018,4,10,PI*1.25),hairM);t.rotation.set(PI/2,0,PI*.875);t.position.y=-.005;head.add(t);}
  else if(L.style==='cap'){hairCap(.42);const cm=MAT({map:plainTex(L.cap||0x2a3a5a,'cap',.4)});const cr=new THREE.Mesh(new THREE.CylinderGeometry(.088,.104,.075,8),cm);cr.position.y=.085;cr.scale.z=1.08;head.add(cr);
    const br=new THREE.Mesh(new THREE.BoxGeometry(.15,.012,.09),cm);br.position.set(0,.06,.1);br.rotation.x=-.15;head.add(br);}
  if(L.glasses){const gm=MAT({color:0x141414});[-1,1].forEach(s=>{const r=new THREE.Mesh(new THREE.BoxGeometry(.042,.026,.004),gm);r.position.set(s*.032,.012,.07);head.add(r);const lens=new THREE.Mesh(new THREE.PlaneGeometry(.034,.019),psx(new THREE.MeshBasicMaterial({color:0x9aa8a8,transparent:true,opacity:.35})));lens.position.set(s*.032,.012,.0725);head.add(lens);});}
  // 手臂：三角肌、上臂、前臂往手腕收細、扁手掌加拇指
  const arms=[];[-1,1].forEach(s=>{const sh=new THREE.Group();sh.position.set(s*(shW-.012),.43,-.004);spine.add(sh);
    const del=new THREE.Mesh(new THREE.SphereGeometry(.066,7,5),shirtM);del.scale.set(.95,.8,1);del.position.set(s*.004,-.01,0);sh.add(del);
    sh.add(limb([[.002,.02],[.06,0],[.058,-.07],[.05,-.18],[.043,-.29],[.002,-.3]],shirtM,6));
    const el=new THREE.Group();el.rotation.order='YXZ';el.position.y=-.29;sh.add(el);
    const fm=L.sleeves==='long'?shirtM:skinM;el.add(limb([[.002,.01],[.044,0],[.047,-.06],[.04,-.17],[.031,-.25],[.002,-.26]],fm,6));
    if(L.sleeves!=='long'){sh.add(limb([[.002,-.12],[.064,-.12],[.062,-.17],[.002,-.17]],shirtM,6));}
    const hand=new THREE.Group();hand.position.y=-.26;el.add(hand);
    const palm=new THREE.Mesh(new THREE.BoxGeometry(.028,.085,.07),skinM);palm.position.y=-.045;hand.add(palm);
    const fing=new THREE.Mesh(new THREE.BoxGeometry(.024,.05,.062),skinM);fing.position.set(0,-.1,.004);fing.rotation.x=.2;hand.add(fing);
    const th=new THREE.Mesh(new THREE.BoxGeometry(.02,.045,.02),skinM);th.position.set(-s*.012,-.035,.04);th.rotation.z=s*.35;hand.add(th);
    hand.rotation.y=-s*.25;sh.rotation.z=s*.07;arms.push({sh,el,hand,s});});
  /* 姿勢 */
  const P={
    idle:()=>{},
    behind:()=>arms.forEach(a=>{a.sh.rotation.set(.32,0,a.s*.06);a.el.rotation.set(1.05,a.s*1.05,0);}),
    cross:()=>arms.forEach(a=>{a.sh.rotation.set(-.42,0,a.s*.1);a.el.rotation.set(-1.55,-a.s*1.25,0);a.el.position.z=a.s>0?.012:0;}),
    hold:()=>arms.forEach(a=>{a.sh.rotation.set(-.18,0,a.s*.06);a.el.rotation.set(-.95,-a.s*.7,0);}),
    angry:()=>{const a=arms[1],b=arms[0];a.sh.rotation.set(-1.42,0,-.06);a.el.rotation.set(-.08,0,0);a.hand.rotation.set(.1,0,0);b.sh.rotation.set(.05,0,-.1);b.el.rotation.set(-.35,0,0);spine.rotation.x=L.hunch*.32+.1;neck.rotation.x=.1;}};
  (P[L.pose]||P.idle)();
  const base={};arms.forEach((a,i)=>{base['s'+i]=a.sh.rotation.clone();base['e'+i]=a.el.rotation.clone();});
  g.userData.human={L,root,spine,neck,head,arms,legs,base,t:R()*9,jab:0,
    update(dt,cam){const u=this,t=(u.t+=dt);spine.scale.y=1+Math.sin(t*1.2)*.006;
      if(cam){const p=new THREE.Vector3();g.getWorldPosition(p);const dx=cam.position.x-p.x,dz=cam.position.z-p.z,d=Math.hypot(dx,dz);
        if(d<7){const ang=Math.atan2(dx,dz);let rel=Math.atan2(Math.sin(ang-g.rotation.y),Math.cos(ang-g.rotation.y));
          if(L.turn!==false&&Math.abs(rel)>.9){const k=Math.sign(rel)*Math.min(Math.abs(rel)-.9,dt*1.1);g.rotation.y+=k;rel-=k;}
          const hy=Math.max(-.8,Math.min(.8,rel));head.rotation.y+=(hy-head.rotation.y)*Math.min(1,dt*1.6);
          const dy=cam.position.y-(p.y+1.6*L.h);head.rotation.x+=(Math.max(-.35,Math.min(.35,-Math.atan2(dy,d)))-head.rotation.x)*Math.min(1,dt*1.6);}
        else{head.rotation.y*=.985;head.rotation.x*=.985;}}
      if(L.pose==='angry'){const a=arms[1];u.jab=Math.max(0,u.jab-dt*3);if(R()<dt*.7)u.jab=1;
        a.sh.rotation.x=base.s1.x+Math.sin(t*22)*.012-u.jab*.12;a.sh.rotation.z=base.s1.z+Math.sin(t*19)*.01;neck.rotation.x=.12+u.jab*.06;}
    },
    setPose(p){L.pose=p;arms.forEach(a=>{a.sh.rotation.set(0,0,a.s*.07);a.el.rotation.set(0,0,0);});(P[p]||P.idle)();arms.forEach((a,i)=>{base['s'+i]=a.sh.rotation.clone();base['e'+i]=a.el.rotation.clone();});},
    setMood(m){L.mood=m;faceM.map=faceTex(L);faceM.needsUpdate=true;}};
  return g;}
return human;};
