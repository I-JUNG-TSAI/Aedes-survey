/* 共用道具庫：花盆、容器、植物
   容器以旋轉輪廓（LatheGeometry）建模；植物用帶透明葉形的貼圖葉片。
   每個道具建完後會合併成少數幾個網格（flatten），減少繪製負擔。 */
window.makeProps=function(K){
const THREE=K.THREE,DS=THREE.DoubleSide;
const tcache={},mcache={},R=Math.random;
/* ---------- 貼圖 ---------- */
function ctex(key,w,h,draw,rep,mip){if(tcache[key])return tcache[key];const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;if(!mip){t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;}t.wrapS=t.wrapT=THREE.RepeatWrapping;if(rep)t.repeat.set(rep[0],rep[1]);tcache[key]=t;return t;}
const rgb=h=>[(h>>16)&255,(h>>8)&255,h&255];
function px(g,w,h,base,v){const im=g.createImageData(w,h),d=im.data;for(let i=0;i<w*h;i++){const k=(R()-.5)*v;d[i*4]=base[0]+k;d[i*4+1]=base[1]+k;d[i*4+2]=base[2]+k;d[i*4+3]=255;}g.putImageData(im,0,0);}
function blobs(g,w,h,c,n,s){g.fillStyle=c;for(let i=0;i<n;i++){g.beginPath();g.ellipse(R()*w,R()*h,1+R()*s,1+R()*s*.7,R()*3,0,7);g.fill();}}
function streaks(g,w,h,c,n,len){g.fillStyle=c;for(let i=0;i<n;i++)g.fillRect(R()*w,R()*h*.6,1+R()*2,len*(.4+R()));}
const T={
 glaze:hex=>ctex('gl'+hex,64,64,(g,w,h)=>{const b=rgb(hex);px(g,w,h,b,18);
   g.strokeStyle='rgba(255,255,255,.16)';g.lineWidth=1;for(let i=0;i<22;i++){g.beginPath();let x=R()*w,y=R()*h;g.moveTo(x,y);for(let k=0;k<3;k++){x+=(R()-.5)*14;y+=(R()-.5)*14;g.lineTo(x,y);}g.stroke();}
   streaks(g,w,h,'rgba(0,0,0,.14)',8,26);g.fillStyle='rgba(255,255,255,.13)';g.fillRect(w*.28,0,3,h);
   blobs(g,w,h,'rgba(150,96,62,.45)',4,2);blobs(g,w,h,'rgba(40,40,30,.2)',6,4);},[3,1]),
 terra:()=>ctex('terra',64,64,(g,w,h)=>{px(g,w,h,[168,88,58],22);blobs(g,w,h,'rgba(232,222,204,.22)',9,7);blobs(g,w,h,'rgba(56,84,36,.3)',5,5);streaks(g,w,h,'rgba(40,20,10,.18)',6,20);},[3,1]),
 pail:()=>ctex('pail',64,64,(g,w,h)=>{px(g,w,h,[214,212,202],10);streaks(g,w,h,'rgba(70,72,60,.16)',12,30);blobs(g,w,h,'rgba(90,92,78,.22)',14,3);blobs(g,w,h,'rgba(60,70,40,.18)',4,6);},[3,1]),
 pink:()=>ctex('pink',64,64,(g,w,h)=>{px(g,w,h,[196,154,160],12);blobs(g,w,h,'rgba(244,238,236,.5)',10,9);streaks(g,w,h,'rgba(70,60,60,.15)',10,26);},[3,1]),
 porcelain:()=>ctex('porc',128,128,(g,w,h)=>{px(g,w,h,[228,231,238],6);const B='#2c4896';g.strokeStyle=B;g.fillStyle=B;
   [6,12,h-12,h-6].forEach(y=>{g.lineWidth=y%12?2:3;g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();});
   g.lineWidth=2;for(let x=0;x<w;x+=16){g.beginPath();g.arc(x+8,h-20,6,Math.PI,0);g.stroke();}
   for(let i=0;i<5;i++){const cx=12+i*26+(i%2)*6,cy=40+(i%2)*34;g.beginPath();g.arc(cx,cy,5,0,7);g.fill();for(let k=0;k<6;k++){const a=k*1.05;g.beginPath();g.ellipse(cx+Math.cos(a)*10,cy+Math.sin(a)*10,6,3,a,0,7);g.stroke();}
     g.beginPath();g.moveTo(cx+12,cy);g.bezierCurveTo(cx+22,cy-16,cx+28,cy+14,cx+40,cy-4);g.stroke();}},[2,1]),
 steel:()=>ctex('steel',64,64,(g,w,h)=>{px(g,w,h,[150,156,162],8);for(let x=0;x<w;x+=2){g.fillStyle=`rgba(${R()>.5?255:0},${R()>.5?255:0},255,.05)`;g.fillRect(x,0,1,h);}blobs(g,w,h,'rgba(60,50,40,.2)',6,3);},[2,1]),
 barrel:()=>ctex('barrel',64,64,(g,w,h)=>{px(g,w,h,[138,106,110],14);blobs(g,w,h,'rgba(122,62,30,.45)',10,6);streaks(g,w,h,'rgba(30,20,20,.2)',8,24);
   g.fillStyle='#0a0808';for(let r=0;r<3;r++)for(let x=4+(r%2)*8;x<w;x+=16){g.beginPath();g.arc(x,10+r*20,3.2,0,7);g.fill();}g.fillStyle='#e0c030';g.fillRect(44,30,6,4);},[3,1]),
 plastic:hex=>ctex('pl'+hex,64,64,(g,w,h)=>{px(g,w,h,rgb(hex),10);streaks(g,w,h,'rgba(30,30,30,.16)',10,24);blobs(g,w,h,'rgba(255,255,255,.14)',8,5);},[3,1]),
 paint:()=>ctex('paint',64,64,(g,w,h)=>{px(g,w,h,[176,176,170],10);g.fillStyle='#2b5aa0';g.fillRect(0,20,w,22);g.fillStyle='#e8e4d8';for(let x=4;x<w;x+=20)g.fillRect(x,26,10,4);g.fillStyle='#b8302a';g.fillRect(0,40,w,3);
   blobs(g,w,h,'rgba(120,70,30,.35)',10,4);streaks(g,w,h,'rgba(30,30,30,.2)',8,20);},[2,1]),
 label:(key,c1,c2)=>ctex('lb'+key,64,32,(g,w,h)=>{g.fillStyle='#ece8dc';g.fillRect(0,0,w,h);g.fillStyle=c1;g.fillRect(0,0,w,5);g.fillRect(0,h-5,w,5);g.fillStyle=c2;
   for(let i=0;i<4;i++)g.fillRect(6+i*13,9,9,7);g.fillRect(6,19,40,3);g.fillRect(6,24,28,2);blobs(g,w,h,'rgba(80,80,70,.25)',8,3);}),
 soil:()=>ctex('soil',32,32,(g,w,h)=>{px(g,w,h,[44,32,22],18);blobs(g,w,h,'rgba(80,120,40,.55)',10,3);blobs(g,w,h,'rgba(150,130,100,.4)',6,1.5);},[2,2]),
 moss:()=>ctex('moss',32,32,(g,w,h)=>{px(g,w,h,[70,110,40],30);blobs(g,w,h,'rgba(130,170,60,.6)',14,2);},[2,2]),
 corr:hex=>ctex('co'+hex,64,64,(g,w,h)=>{px(g,w,h,rgb(hex),12);for(let x=0;x<w;x+=8){g.fillStyle='rgba(0,0,0,.22)';g.fillRect(x,0,2,h);g.fillStyle='rgba(255,255,255,.12)';g.fillRect(x+4,0,2,h);}blobs(g,w,h,'rgba(120,60,24,.4)',8,5);streaks(g,w,h,'rgba(40,30,20,.25)',10,30);}),
 brick:()=>ctex('brk',32,32,(g,w,h)=>{px(g,w,h,[150,70,52],24);g.fillStyle='rgba(40,20,14,.5)';g.fillRect(0,15,w,2);blobs(g,w,h,'rgba(220,210,190,.25)',4,3);}),
 /* 葉片：底部是葉柄端，頂端是葉尖 */
 leaf:kind=>ctex('lf'+kind,64,128,(g,w,h)=>{g.clearRect(0,0,w,h);
   const shape=(wf,col)=>{g.fillStyle=col;g.beginPath();g.moveTo(w/2,h);g.bezierCurveTo(w/2-w*wf*1.1,h*.78,w/2-w*wf,h*.22,w/2,0);g.bezierCurveTo(w/2+w*wf,h*.22,w/2+w*wf*1.1,h*.78,w/2,h);g.fill();};
   const mid=(c,lw)=>{g.strokeStyle=c;g.lineWidth=lw;g.beginPath();g.moveTo(w/2,h);g.lineTo(w/2,4);g.stroke();};
   if(kind==='hosta'){shape(.47,'#3f7a2e');shape(.36,'#4f8f38');g.strokeStyle='rgba(190,230,150,.35)';g.lineWidth=1.5;for(let k=-3;k<=3;k++){if(!k)continue;g.beginPath();g.moveTo(w/2,h);g.quadraticCurveTo(w/2+k*9,h*.5,w/2+k*1.5,6);g.stroke();}mid('rgba(200,235,160,.6)',2);}
   else if(kind==='strap'){shape(.2,'#527f30');shape(.12,'#629440');mid('rgba(200,230,150,.5)',1.5);}
   else if(kind==='dry'){shape(.2,'#8a6a3a');shape(.1,'#a08048');}
   else if(kind==='caladium'){g.fillStyle='#3e7d34';g.beginPath();g.moveTo(w/2,h*.82);g.bezierCurveTo(w*.02,h*1.02,-w*.05,h*.45,w/2,0);g.bezierCurveTo(w*1.05,h*.45,w*.98,h*1.02,w/2,h*.82);g.fill();
     g.fillStyle='#c4385a';g.beginPath();g.moveTo(w/2,h*.78);g.bezierCurveTo(w*.18,h*.9,w*.15,h*.45,w/2,h*.14);g.bezierCurveTo(w*.85,h*.45,w*.82,h*.9,w/2,h*.78);g.fill();
     g.strokeStyle='#f08aa0';g.lineWidth=2;for(let k=-2;k<=2;k++){g.beginPath();g.moveTo(w/2,h*.8);g.lineTo(w/2+k*12,h*.3+Math.abs(k)*14);g.stroke();}}
   else if(kind==='silver'){g.fillStyle='#c9cfc6';for(let y=h-6;y>6;y-=10){const s=10*(1-y/h*.5)*(y/h+.3);g.beginPath();g.ellipse(w/2-s*.9,y,s,4,.5,0,7);g.ellipse(w/2+s*.9,y,s,4,-.5,0,7);g.fill();}g.fillRect(w/2-2,4,4,h-4);}
   else if(kind==='fern'){g.strokeStyle='#4f8a26';g.lineWidth=2;g.beginPath();g.moveTo(w/2,h);g.lineTo(w/2,2);g.stroke();
     for(let y=h-6;y>4;y-=5){const s=26*Math.sin(Math.PI*(1-y/h)*.9+.25)*(y/h*.7+.3);g.fillStyle=(y/5)%2<1?'#8acb3a':'#7aba30';g.beginPath();g.ellipse(w/2-s/2,y,s/2,2.4,.35,0,7);g.ellipse(w/2+s/2,y,s/2,2.4,-.35,0,7);g.fill();}}
  },null,true),
 net:(key,c,step,lw)=>ctex('nt'+key,64,64,(g,w,h)=>{g.clearRect(0,0,w,h);g.fillStyle=c;for(let i=0;i<w;i+=step){g.fillRect(i,0,lw,h);g.fillRect(0,i,w,lw);}}),
 tarp:()=>ctex('tarp',128,128,(g,w,h)=>{g.fillStyle='#e6e8e6';g.fillRect(0,0,w,h);g.strokeStyle='rgba(120,130,130,.35)';g.lineWidth=2;
   for(let i=0;i<14;i++){g.beginPath();g.moveTo(R()*w,R()*h);g.lineTo(R()*w,R()*h);g.stroke();}blobs(g,w,h,'rgba(90,100,90,.18)',12,10);
   g.clearRect(w*.7,h*.1,18,26);g.clearRect(w*.2,h*.6,10,30);},null,true),
 paintStripe:()=>ctex('stripe',64,64,(g,w,h)=>{px(g,w,h,[226,224,214],10);blobs(g,w,h,'rgba(60,62,58,.55)',40,2.5);streaks(g,w,h,'rgba(120,70,40,.5)',2,10);g.globalCompositeOperation='destination-out';blobs(g,w,h,'#000',10,4);g.globalCompositeOperation='source-over';},null,true)
};
function M(key,make){return mcache[key]||(mcache[key]=make());}
const ph=(key,map,o)=>M(key,()=>new THREE.MeshPhongMaterial(Object.assign({map,shininess:8},o||{})));
const lam=(key,map,o)=>M(key,()=>new THREE.MeshLambertMaterial(Object.assign({map},o||{})));
const flat=hex=>M('c'+hex,()=>new THREE.MeshPhongMaterial({color:hex,shininess:6}));
const MAT={
 glaze:hex=>ph('g'+hex,T.glaze(hex),{shininess:70,specular:0x445555}),
 terra:()=>ph('terra',T.terra()),pail:()=>ph('pail',T.pail(),{shininess:20}),pink:()=>ph('pink',T.pink(),{shininess:20}),
 porcelain:()=>ph('porc',T.porcelain(),{shininess:90,specular:0x888888}),steel:()=>ph('steel',T.steel(),{shininess:90,specular:0xaaaaaa}),
 barrel:()=>ph('barrel',T.barrel()),plastic:hex=>ph('pl'+hex,T.plastic(hex),{shininess:24}),paint:()=>ph('paint',T.paint(),{shininess:30}),
 soil:()=>lam('soil',T.soil()),moss:()=>lam('moss',T.moss()),brick:()=>lam('brick',T.brick()),
 leaf:kind=>lam('lf'+kind,T.leaf(kind),{alphaTest:.45,side:DS}),
 label:(k,a,b)=>ph('lb'+k,T.label(k,a,b),{shininess:20}),
 water:()=>M('water',()=>new THREE.MeshPhongMaterial({color:0x1d3a44,shininess:90,specular:0x99aaaa})),
 dark:()=>M('dkw',()=>new THREE.MeshPhongMaterial({color:0x050806,shininess:90,specular:0x556655})),
 foul:()=>M('foul',()=>new THREE.MeshPhongMaterial({color:0x1c2410,shininess:60,specular:0x556644}))
};
/* ---------- 幾何工具 ---------- */
const V2=(r,y)=>new THREE.Vector2(r,y);
function add(geo,mat,parent,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);parent.add(m);return m;}
/* 旋轉輪廓容器：外壁往上，盆緣，內壁往下 */
function vessel(o){const t=o.t||.012,N=7,P=[V2(.001,0),V2(o.rb*.9,0),V2(o.rb,t*1.6)];const top=o.rim==='none'?o.h:o.h*(o.rimH||.9);
  for(let i=1;i<=N;i++){const f=i/N;let r=o.rb+(o.rt-o.rb)*Math.pow(f,o.curve||1);if(o.belly)r+=o.belly*Math.sin(Math.PI*f);if(o.neck&&f>.8)r-=o.neck*(f-.8)/.2;P.push(V2(r,top*f));}
  const rt=P[P.length-1].x;
  if(o.rim==='roll')P.push(V2(rt+t*1.6,top+o.h*.02),V2(rt+t*2.4,o.h*.96),V2(rt+t*1.4,o.h),V2(rt-t*.4,o.h*.995));
  else if(o.rim==='band')P.push(V2(rt+t*2.2,top),V2(rt+t*2.3,o.h),V2(rt-t*.3,o.h));
  else if(o.rim==='flare')P.push(V2(rt+o.h*.06,o.h*.97),V2(rt+o.h*.075,o.h),V2(rt+o.h*.05,o.h));
  else P.push(V2(rt,o.h),V2(rt-t,o.h));
  for(let i=N;i>=1;i--){const p=P[2+i];P.push(V2(Math.max(.002,p.x-t*1.5),Math.max(t*2.2,p.y)));}P.push(V2(.002,t*2.2));
  return new THREE.LatheGeometry(P,o.seg||18);}
function rAt(o,f){let r=o.rb+(o.rt-o.rb)*Math.pow(f,o.curve||1);if(o.belly)r+=o.belly*Math.sin(Math.PI*f);return r-(o.t||.012)*1.6;}
function disc(o,f,mat,parent){const top=o.rim==='none'?o.h:o.h*(o.rimH||.9),m=add(new THREE.CircleGeometry(rAt(o,f),o.seg||18),mat,parent,0,top*f,0);m.rotation.x=-Math.PI/2;return m;}
function ring(r,y,tube,mat,parent){const m=add(new THREE.TorusGeometry(r,tube,4,o_seg(r)),mat,parent,0,y,0);m.rotation.x=Math.PI/2;return m;}
const o_seg=r=>Math.max(12,Math.round(r*60));
function tube(pts,rad,mat,parent){return add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(p[0],p[1],p[2]))),12,rad,4,false),mat,parent);}
function band(r,y,h,mat,parent,a0,len){return add(new THREE.CylinderGeometry(r,r,h,16,1,true,a0||0,len||2.2),mat,parent,0,y,0);}
/* 合併同材質網格 */
function flatten(g){g.updateMatrixWorld(true);const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(),by=new Map(),kill=[];
  g.traverse(o=>{if(!o.isMesh)return;const m=new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld);const geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();geo.applyMatrix4(m);
    if(!by.has(o.material))by.set(o.material,[]);by.get(o.material).push(geo);kill.push(o);});
  while(g.children.length)g.remove(g.children[0]);
  by.forEach((list,mat)=>{let n=0;list.forEach(q=>n+=q.attributes.position.count);const pos=new Float32Array(n*3),nor=new Float32Array(n*3),uv=new Float32Array(n*2);let k=0;
    list.forEach(q=>{pos.set(q.attributes.position.array,k*3);if(q.attributes.normal)nor.set(q.attributes.normal.array,k*3);if(q.attributes.uv)uv.set(q.attributes.uv.array,k*2);k+=q.attributes.position.count;q.dispose();});
    const b=new THREE.BufferGeometry();b.setAttribute('position',new THREE.BufferAttribute(pos,3));b.setAttribute('normal',new THREE.BufferAttribute(nor,3));b.setAttribute('uv',new THREE.BufferAttribute(uv,2));
    const mm=new THREE.Mesh(b,mat);g.add(mm);});
  return g;}
/* ---------- 葉片與植物 ---------- */
function leafGeo(w,l,bend,fold){const g=new THREE.PlaneGeometry(w,l,2,6);g.translate(0,l/2,0);const p=g.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i),f=p.getY(i)/l;p.setZ(i,bend*f*f*l-Math.abs(x)*(fold||0));}g.computeVertexNormals();return g;}
function leaf(parent,kind,w,l,yaw,tilt,bend,x,y,z,fold){const pv=new THREE.Group();pv.position.set(x||0,y||0,z||0);pv.rotation.y=yaw;parent.add(pv);
  const m=new THREE.Mesh(leafGeo(w,l,bend,fold===undefined?.25:fold),MAT.leaf(kind));m.rotation.x=tilt;pv.add(m);return pv;}
const PLANT={
 hosta(g,s){const n=12+(R()*4|0);for(let i=0;i<n;i++){const a=i*2.4+R()*.4,inner=i<4,pv=new THREE.Group();pv.rotation.y=a;g.add(pv);const st=new THREE.Group();st.rotation.x=inner?.5:.75+R()*.3;pv.add(st);const L=(inner?.06:.1+R()*.05)*s;
   add(new THREE.CylinderGeometry(.006,.009,L,4).translate(0,L/2,0),flat(0x6a8a4a),st);const lf=new THREE.Mesh(leafGeo(.2*s,(inner?.22:.27)*s,-.12,.35),MAT.leaf('hosta'));lf.position.y=L;lf.rotation.x=inner?.35:.55+R()*.3;st.add(lf);}},
 strap(g,s){const n=9+(R()*4|0);for(let i=0;i<n;i++){const a=i*2.3+R();leaf(g,'strap',.05*s,(.22+R()*.12)*s,a,.35+R()*.6,.35,0,0,0,.2);}},
 caladium(g,s){for(let i=0;i<6;i++){const a=i*1.1+R()*.3,pv=new THREE.Group();pv.rotation.y=a;g.add(pv);const st=new THREE.Group();st.rotation.x=.25+R()*.3;pv.add(st);const L=(.16+R()*.1)*s;
   add(new THREE.CylinderGeometry(.005,.007,L,4).translate(0,L/2,0),flat(0x7a4a48),st);const lf=new THREE.Mesh(leafGeo(.14*s,.17*s,.15,.3),MAT.leaf('caladium'));lf.position.y=L;lf.rotation.x=1.15;st.add(lf);}},
 silver(g,s){for(let i=0;i<14;i++){const a=i*2.4,inner=i<5;leaf(g,'silver',.08*s,(inner?.12:.16)*s,a,inner?.25:.7+R()*.5,.12,Math.sin(a)*.05*s,.02,Math.cos(a)*.05*s,.1);}},
 fern(g,s){for(let i=0;i<18;i++){const a=i*2.4+R()*.3;leaf(g,'fern',.17*s,(.42+R()*.18)*s,a,.7+R()*.75,.55,0,0,0,.05);}},
 moss(g,s,r){const m=add(new THREE.CircleGeometry(r*.98,14),MAT.moss(),g,0,.004,0);m.rotation.x=-Math.PI/2;for(let i=0;i<3;i++)leaf(g,'strap',.03*s,.08*s,i*2,.4,.2,(R()-.5)*r,0,(R()-.5)*r);},
 succulent(g,s){for(let i=0;i<12;i++){const a=i*2.4,r=i<5?.02:.05;const c=add(new THREE.ConeGeometry(.022*s,.08*s,4),flat(i%2?0x6a9a6a:0x7aa878),g,Math.sin(a)*r*s,.04*s,Math.cos(a)*r*s);c.rotation.set(Math.cos(a)*(i<5?.3:1),0,-Math.sin(a)*(i<5?.3:1));}},
 dendrobium(g,s){const cane=(x,z,len,lean,yaw,old)=>{const pv=new THREE.Group();pv.position.set(x,0,z);pv.rotation.order='YXZ';pv.rotation.set(lean,yaw,0);g.add(pv);
     add(new THREE.CylinderGeometry(.011,.016,len,5).translate(0,len/2,0),flat(old?0xc8c0a4:0x6a8a3a),pv);
     for(let y=.06;y<len;y+=.075){const n=add(new THREE.CylinderGeometry(.018,.018,.008,5),flat(old?0x8a7a5a:0x9a8a5a),pv,0,y,0);}
     const nL=old?2:6;for(let k=0;k<nL;k++){const y=len*(.35+k*.11);leaf(pv,old?'dry':'strap',.055*s,(.16+R()*.08)*s,k*Math.PI+R()*.5,.8+R()*.5,.35,0,y,0,.2);}};
   for(let i=0;i<7;i++)cane((R()-.5)*.22*s,(R()-.5)*.22*s,(.95+R()*.45)*s,.15+R()*.55,R()*6.3,true);
   for(let i=0;i<12;i++)cane((R()-.5)*.26*s,(R()-.5)*.26*s,(.5+R()*.55)*s,.1+R()*.75,R()*6.3,false);
   for(let i=0;i<5;i++){const a=R()*6,r=.33*s;tube([[Math.sin(a)*.1,.02,Math.cos(a)*.1],[Math.sin(a)*r,.05,Math.cos(a)*r],[Math.sin(a)*r*1.1,-.12,Math.cos(a)*r*1.1]],.006,flat(0xd8d4c4),g);}}
};
/* ---------- 盆器 ---------- */
const POT={
 basin:{rb:.16,rt:.38,h:.26,curve:.55,rim:'roll',t:.015,fill:.82},
 deep:{rb:.2,rt:.4,h:.34,curve:.6,rim:'roll',t:.016,fill:.85},
 bowl:{rb:.11,rt:.22,h:.17,curve:.6,rim:'roll',t:.012,fill:.8},
 terra:{rb:.11,rt:.17,h:.2,rim:'band',t:.012,fill:.82},
 terraS:{rb:.07,rt:.11,h:.13,rim:'band',t:.01,fill:.8},
 saucer:{rb:.17,rt:.22,h:.05,rim:'roll',t:.008,rimH:.8}
};
const GLAZE=[0x6aa79c,0x5d958c,0x7ab4a8,0x4f8a84];
function potted(pot,plant,o){o=o||{};const g=new THREE.Group(),P=Object.assign({},POT[pot]),s=o.s||1;['rb','rt','h'].forEach(k=>P[k]*=s);P.t*=s;
  const mat=pot.startsWith('terra')?MAT.terra():MAT.glaze(o.glaze||GLAZE[(R()*4)|0]),lift=o.saucer?.03*s:0;add(vessel(P),mat,g,0,lift,0);
  if(o.saucer){const S=Object.assign({},POT.saucer);S.rb=P.rb*1.05;S.rt=P.rb*1.5;S.h=.05*s;add(vessel(S),mat,g);if(o.water){const d=add(new THREE.CircleGeometry(P.rb*1.42,18),o.water,g,0,.035*s,0);d.rotation.x=-Math.PI/2;}}
  const top=P.h*(P.rimH||.9)*P.fill+lift,soilR=rAt(P,P.fill);const sd=add(new THREE.CircleGeometry(soilR,18),MAT.soil(),g,0,top,0);sd.rotation.x=-Math.PI/2;
  if(plant){const pg=new THREE.Group();pg.position.y=top;g.add(pg);if(plant==='moss')PLANT.moss(pg,s,soilR);else PLANT[plant](pg,o.ps||s);}
  g.userData.top=P.h;return flatten(g);}
/* ---------- 容器 ---------- */
const C={
 pail(o){o=o||{};const g=new THREE.Group(),P={rb:.145,rt:.168,h:.37,t:.008,rim:'band',rimH:.93};add(vessel(P),MAT.pail(),g);
   [.27,.3].forEach(y=>ring(.165,y,.005,MAT.pail(),g));
   if(o.label!==false)band(.161,.15,.13,MAT.label(o.lk||'a',o.l1||'#7a2a38',o.l2||'#2a4a9a'),g,R()*6,2.4);
   if(o.handle!==false){const a=o.ha===undefined?R()*.9-.45:o.ha,h=new THREE.Group();h.position.y=.3;h.rotation.z=a;g.add(h);
     tube([[-.172,0,0],[-.15,.16,0],[0,.24,0],[.15,.16,0],[.172,0,0]],.004,flat(0x8a5a38),h);add(new THREE.CylinderGeometry(.012,.012,.1,6).rotateZ(Math.PI/2),flat(0x3a3a3a),h,0,.24,0);}
   if(o.water)disc(P,o.level||.8,o.water,g);g.userData.top=P.h;return flatten(g);},
 pinkBarrel(o){o=o||{};const g=new THREE.Group(),P={rb:.27,rt:.31,h:.74,t:.012,rim:'roll',rimH:.93};add(vessel(P),MAT.pink(),g);
   [.42,.56].forEach(y=>ring(rAt(P,y/.69)+.012,y,.008,MAT.pink(),g));
   const lb=add(new THREE.PlaneGeometry(.12,.08),MAT.label('pk','#2a5aa8','#2a5aa8'),g,0,.55,0);lb.position.set(Math.sin(.6)*.3,.55,Math.cos(.6)*.3);lb.rotation.y=.6;
   if(o.water)disc(P,o.level||.85,o.water,g);return flatten(g);},
 redBucket(o){o=o||{};const g=new THREE.Group(),P={rb:.27,rt:.33,h:.6,t:.012,rim:'roll'};const mt=MAT.plastic(0xb0221c);add(vessel(P),mt,g);ring(rAt(P,.75)+.012,.42,.008,mt,g);
   [-1,1].forEach(sd=>add(new THREE.BoxGeometry(.05,.04,.08),mt,g,sd*.33,.5,0));if(o.water)disc(P,o.level||.9,o.water,g);return flatten(g);},
 lidBucket(){const g=new THREE.Group(),P={rb:.26,rt:.3,h:.58,t:.012,rim:'band'};const mt=MAT.plastic(0x2a4f8a);add(vessel(P),mt,g);
   const lid=new THREE.LatheGeometry([V2(.001,0),V2(.325,0),V2(.33,.035),V2(.31,.05),V2(.12,.055),V2(.1,.07),V2(.001,.07)],20);add(lid,MAT.plastic(0x23406e),g,0,P.h-.01,0);
   add(new THREE.BoxGeometry(.22,.07,.11),MAT.brick(),g,0,P.h+.09,0);return flatten(g);},
 paintCan(o){o=o||{};const g=new THREE.Group(),P={rb:.16,rt:.16,h:.34,t:.006,rim:'band'};add(vessel(P),MAT.paint(),g);ring(.163,.335,.006,MAT.steel(),g);
   tube([[-.165,.3,0],[-.12,.42,.05],[0,.46,.08],[.12,.42,.05],[.165,.3,0]],.003,flat(0x6a5a48),g);if(o.water)disc(P,o.level||.25,o.water,g);return flatten(g);},
 burnBarrel(){const g=new THREE.Group(),P={rb:.3,rt:.3,h:.85,t:.01,rim:'roll',rimH:.96};add(vessel(P),MAT.barrel(),g,0,.06,0);
   [.3,.62].forEach(y=>ring(.305,y+.06,.01,MAT.barrel(),g));const ash=add(new THREE.CircleGeometry(.28,16),flat(0x2a2624),g,0,.2,0);ash.rotation.x=-Math.PI/2;
   for(let i=0;i<4;i++){const a=i*Math.PI/2+.4;add(new THREE.CylinderGeometry(.035,.035,.03,8).rotateZ(Math.PI/2),flat(0x1a1a1a),g,Math.sin(a)*.24,.035,Math.cos(a)*.24);}return flatten(g);},
 vase(o){o=o||{};const g=new THREE.Group(),P={rb:.14,rt:.15,h:.66,belly:.025,rim:'flare',t:.01,seg:20};add(vessel(P),MAT.porcelain(),g);if(o.water)disc(P,o.level||.55,o.water,g);return flatten(g);},
 jar(o){o=o||{};const g=new THREE.Group(),P={rb:.11,rt:.2,h:.2,curve:.5,rim:'roll',t:.01};add(vessel(P),MAT.porcelain(),g);return flatten(g);},
 scoop(){const g=new THREE.Group(),P={rb:.09,rt:.11,h:.09,rim:'roll',t:.004};add(vessel(P),MAT.steel(),g);add(new THREE.BoxGeometry(.03,.012,.22),MAT.steel(),g,0,.075,-.2);return flatten(g);},
 saucerStack(n,o){o=o||{};const g=new THREE.Group();for(let i=0;i<n;i++){const P={rb:.17*(o.s||1),rt:.24*(o.s||1),h:.07*(o.s||1),rim:'roll',t:.008,curve:.7};
     const m=add(vessel(P),o.terra||i%3===2?MAT.terra():MAT.glaze(GLAZE[i%4]),g,(R()-.5)*.02,i*.035*(o.s||1),(R()-.5)*.02);}
   if(o.water){const P={rb:.17*(o.s||1),rt:.24*(o.s||1),h:.07*(o.s||1),rim:'roll',t:.008,curve:.7};const d=disc(P,.7,o.water,g);d.position.y+= (n-1)*.035*(o.s||1);}
   return flatten(g);},
 basinStack(n,o){o=o||{};const g=new THREE.Group();for(let i=0;i<n;i++){const s=(o.s||1)*(1-i*.04),P={rb:.16*s,rt:.36*s,h:.24*s,curve:.55,rim:'roll',t:.014};
     add(vessel(P),o.terra?MAT.terra():MAT.glaze(o.hex||GLAZE[i%4]),g,0,i*.09,0);}return flatten(g);}
};
/* ---------- 建材 ---------- */
const B={
 netMat:(key,c,step,lw,rx,ry)=>{const t=T.net(key,c,step,lw).clone();t.needsUpdate=true;t.repeat.set(rx,ry);return new THREE.MeshLambertMaterial({map:t,transparent:true,alphaTest:.3,side:DS});},
 corr:hex=>lam('co'+hex,T.corr(hex)),
 tarp:()=>lam('tarp',T.tarp(),{transparent:true,opacity:.62,side:DS,alphaTest:.1}),
 stripe:()=>lam('stripe',T.paintStripe(),{alphaTest:.4,side:DS,polygonOffset:true,polygonOffsetFactor:-2}),
 brick:()=>MAT.brick()
};
/* 地上的漆帶：沿著折線鋪一條帶狀網格 */
function ribbon(pts,w,y,mat){const pos=[],uv=[];let acc=0;for(let i=0;i<pts.length;i++){const p=pts[i],q=pts[Math.min(i+1,pts.length-1)],o=pts[Math.max(i-1,0)];
   const dx=q[0]-o[0],dz=q[1]-o[1],L=Math.hypot(dx,dz)||1,nx=-dz/L*w/2,nz=dx/L*w/2;if(i)acc+=Math.hypot(p[0]-pts[i-1][0],p[1]-pts[i-1][1]);
   pos.push(p[0]+nx,y,p[1]+nz,p[0]-nx,y,p[1]-nz);uv.push(0,acc,1,acc);}
  const idx=[];for(let i=0;i<pts.length-1;i++){const a=i*2;idx.push(a,a+2,a+1,a+1,a+2,a+3);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
  return new THREE.Mesh(g,mat);}
return{T,MAT,PLANT,POT,potted,C,B,flatten,vessel,leaf,ribbon,flat};
};
