/* 第一關：黃昏的巷子 */
(function(){
const SITES={A:{name:'陳阿嬤家'},B:{name:'空屋'},C:{name:'公寓地下室'}};
const ITEMS={
 A1:{site:'A',label:'盆栽',name:'盆栽底盤',desc:'院子裡的大盆栽，下面墊著一個底盤。',water:1,larvae:'aedes',pupae:1,result:'手電筒一照，底盤的積水裡有東西迅速往下鑽。撈起來，是幼蟲，還有一隻蛹。',learn:'盆栽底盤是最常見的孳生源之一。蛹也算陽性。',
  acts:[{t:'倒掉積水、刷洗底盤，建議移除底盤或填入細沙',ok:1,fb:'填沙之後澆水不會留下積水，可以長期解決。'},{t:'等下雨水會自己溢出來，不用處理',fb:'積水一直都在，蛹一兩天內就會羽化成蚊子。'},{t:'請阿嬤把盆栽全部丟掉',fb:'處理底盤就夠了。要求太激烈，民眾不會配合。'}]},
 A2:{site:'A',label:'水缸',name:'儲水的水缸',desc:'阿嬤存雨水澆花用的大水缸，沒有蓋子。',water:1,larvae:null,result:'水很清。撈了好幾杓，沒有幼蟲。',learn:'有使用需求的儲水容器，重點是不讓蚊子進去產卵。',
  acts:[{t:'沒有幼蟲，不用處理',fb:'開口的儲水容器隨時可能被產卵，現在陰性不代表下週也是。'},{t:'保留水缸，建議加上密合的蓋子或紗網，並定期刷洗',ok:1,fb:'儲水容器不用丟，只要讓蚊子進不去。'},{t:'把水倒光，叫阿嬤以後不准存水',fb:'不合理的禁止，民眾不會遵守。'}]},
 A3:{site:'A',label:'水桶',name:'倒放的水桶',desc:'牆角一個倒扣的塑膠水桶。',water:0,larvae:null,result:'翻起來看，裡面是乾的。',learn:'沒有積水的容器不計入積水容器。',
  acts:[{t:'看完把它放正',fb:'放正之後下雨就會積水，等於你自己製造了一個孳生源。'},{t:'放回倒扣的狀態，提醒阿嬤不用的容器都這樣收',ok:1,fb:'倒放的容器不會積水，是正確的收納方式。'},{t:'列為陽性容器',fb:'沒有積水也沒有幼蟲，不能列為陽性。'}]},
 A4:{site:'A',label:'花瓶',name:'神明桌旁的花瓶',desc:'屋內桌上的玻璃花瓶，插著富貴竹。紅色的神明燈照在水面上。',water:1,larvae:'aedes',result:'瓶子裡的水很清，有好幾隻幼蟲貼著瓶壁上下扭動。',learn:'室內的花瓶、水耕植物是埃及斑蚊典型的孳生源。埃及斑蚊偏好室內。',
  acts:[{t:'把水倒掉，換上新的水',fb:'卵黏在瓶子內壁上，換了水會再孵化。'},{t:'往花瓶裡噴殺蟲劑',fb:'殺蟲劑不是處理積水容器的方法，在室內噴灑對人也不安全。'},{t:'倒掉水、刷洗瓶子內壁，之後每週換水並刷洗',ok:1,fb:'斑蚊把卵產在水面上方的容器內壁，只換水不刷，卵會留下來。'}]},
 B1:{site:'B',label:'輪胎',name:'廢輪胎',desc:'空屋客廳角落疊著三個舊輪胎。屋頂漏水，剛好滴在上面。',water:1,larvae:'aedes',result:'輪胎內圈積了一圈黑水。用撈杓伸進去，撈出不少幼蟲。',learn:'輪胎內圈很難自然乾燥，也很難倒乾淨，是斑蚊的重要孳生源。',
  acts:[{t:'在輪胎外面噴殺蟲劑',fb:'噴在外表，對內圈積水裡的幼蟲沒有效果。'},{t:'倒乾內圈積水，通報清運；無法清運前先移到不會淋雨的地方',ok:1,fb:'空屋裡的廢棄物沒有人會管，要清除並通報清運，不能只記錄。'},{t:'記錄下來就好，空屋的東西不要動',fb:'只記錄不處理，幾天後這裡會飛出一批新的蚊子。'}]},
 B2:{site:'B',label:'水桶',name:'接漏水的水桶',desc:'有人曾經放了一個水桶接天花板的漏水。水桶早就滿了。',water:1,larvae:'aedes',pupae:1,result:'水面上浮著好幾個蛹殼，水裡還有幼蟲和蛹。這裡已經羽化過不只一批了。',learn:'蛹殼表示已經有成蚊從這裡飛出去。',
  acts:[{t:'把水倒掉，水桶放回原位繼續接水',fb:'漏水還在，水桶一週內又會變成孳生源。'},{t:'倒掉並刷洗，水桶倒扣收起，通報漏水的來源',ok:1,fb:'容器處理完，還要處理水的來源，否則會重複發生。'},{t:'投藥後留在原地',fb:'這個容器可以直接清除，就不需要靠投藥。'}]},
 B3:{site:'B',label:'馬桶',name:'沒在使用的馬桶',desc:'後面房間的馬桶，很久沒人用了。水箱蓋不見了。',water:1,larvae:'aedes',result:'馬桶和水箱裡的水都是靜止的。照下去，兩邊都有幼蟲。',learn:'空屋、閒置房間的馬桶和水箱，是很容易被漏掉的室內孳生源。',
  acts:[{t:'沖水並刷洗，蓋上馬桶蓋和水箱蓋，沒有蓋子就用紗網或塑膠布封住',ok:1,fb:'長期不用的馬桶要封住，不讓蚊子進去產卵。'},{t:'沖一次水就好',fb:'沖完水又會存一池靜止的水，而且卵還黏在壁上。'},{t:'馬桶的水是髒的，不會有斑蚊',fb:'閒置馬桶裡的水其實相當乾淨，是斑蚊會利用的地方。'}]},
 B4:{site:'B',label:'塑膠桶',name:'裝污水的大塑膠桶',desc:'一個大塑膠桶，水又黑又臭，泡著腐爛的東西。水面漂著幾團像小船的黑色東西。',water:1,larvae:'culex',result:'水裡密密麻麻都是幼蟲。水面那幾團黑色的東西，是上百顆卵黏在一起的卵塊。',learn:'有機質多的污水常見家蚊。家蚊的卵黏成一團浮在水面；斑蚊的卵是一顆一顆黏在容器壁上。',
  acts:[{t:'列為斑蚊陽性容器',fb:'這是家蚊幼蟲，不計入斑蚊陽性容器，否則指數會失真。'},{t:'家蚊不傳登革熱，不用處理',fb:'家蚊會叮人，也可能傳播其他疾病，應該一併清除。'},{t:'倒掉污水並清洗，水桶倒扣；不列入斑蚊陽性',ok:1,fb:'不列入斑蚊指數，但孳生源還是要清除。'}]},
 C1:{site:'C',label:'水桶',name:'冷氣接水桶',desc:'管理室冷氣的排水管下面接著一個水桶。',water:1,larvae:'aedes',result:'水桶半滿，冷凝水還在一滴一滴落下。水裡有很多幼蟲。',learn:'冷氣、除濕機的接水容器是常被忽略的孳生源。',
  acts:[{t:'倒掉就好',fb:'沒有刷洗會留下卵，而且冷氣一直滴水，很快又滿了。'},{t:'倒掉並刷洗，建議把排水管直接接到排水孔',ok:1,fb:'讓冷凝水直接排掉，就不會再積水。'},{t:'請管理員不要開冷氣',fb:'不合理的要求。改善接水方式就可以了。'}]},
 C2:{site:'C',label:'積水',name:'地下室積水',clear:'treat',clearWhy:'地下室積水面積太大，沒辦法馬上抽乾。先投藥，再請管委會抽水、處理滲漏。',desc:'停車場最深處，地面低了一塊，整片都是水。日光燈在這裡一直閃。',water:1,larvae:'aedes',pupae:1,result:'水深到腳踝。手電筒貼著水面照，光圈裡到處都是往下鑽的幼蟲，還有蛹。',learn:'南部的大樓地下室積水，是埃及斑蚊的重要孳生源，蚊子會順著樓梯間往上飛。',
  acts:[{t:'用水桶把水舀乾',fb:'面積太大，舀不乾。'},{t:'記錄下來，等管委會處理',fb:'已經有蛹，等不了。幾天內就會羽化。'},{t:'現場投放殺幼蟲劑（如蘇力菌），並通報管委會抽水、處理滲漏',ok:1,fb:'無法立即清除的大面積積水，由防疫人員投藥，並找管理單位從源頭解決。'}]},
 C3:{site:'C',label:'拖把桶',name:'拖把桶',desc:'牆邊的拖把桶，還有半桶水。',water:1,larvae:null,result:'水有點濁。撈了幾次，沒有幼蟲。',learn:'清潔用具的積水也算積水容器，用完要倒掉。',
  acts:[{t:'沒有幼蟲，不用處理',fb:'水放著就可能被產卵，要請管理員改掉習慣。'},{t:'倒掉，請管理員每次用完把水倒掉、桶子倒扣',ok:1,fb:'順手就能做到的習慣，最有效。'},{t:'把拖把桶沒收',fb:'沒有必要，也沒有這個權限。'}]}
};
const DLG={
 A:{who:'陳阿嬤',again:'（阿嬤還站在門口，看著你。）',nodes:[
  {say:'（阿嬤站在門口，沒有讓開）……少年仔，天都要黑了，你要做什麼？',ch:[
   {t:'「阿嬤您好，我是衛生所的防疫人員，這是我的證件。附近有登革熱病例，想幫您看看家裡有沒有積水、會讓蚊子產卵的地方，大概十分鐘。」',ok:1,fb:'先表明身分、出示證件，再說明目的和時間。'},
   {t:'「我們要檢查你家，麻煩讓一下。」',tone:'angry',re:'（阿嬤往後退一步，把紗門拉上）「你是誰？我不認識你。不要亂來。」',fb:'沒有表明身分和目的，對方不知道你是誰。'},
   {t:'「附近有人得登革熱，不給檢查會被罰錢喔。」',tone:'angry',re:'「罰錢？你們是來騙錢的吧！我要打給我兒子。」（紗門關上了。）',fb:'一開口就提罰則，等於威脅。罰則是最後手段。'}]},
  {say:'我家很乾淨，每天都有掃。前幾天才來噴過藥，哪裡還有蚊子。',ch:[
   {t:'「噴藥只能殺掉當時在飛的蚊子，水裡的幼蟲和容器壁上的卵都還在。看得出來您很用心整理，我們一起看一下花瓶、底盤這些小地方，以後您自己也知道要看哪裡。」',ok:1,fb:'先肯定對方，說明噴藥的限制，再邀請一起檢查。'},
   {t:'「乾淨不代表沒有，每一戶都這樣說。」',tone:'angry',re:'「我每天掃，你說我家不乾淨？」（阿嬤把門關了一半，不再看你。）',fb:'直接反駁會讓對方覺得被否定。'},
   {t:'「好，那不打擾了。」',tone:'silent',re:'（阿嬤點點頭，轉身進屋。院子裡的花瓶和底盤，你一樣都沒看到。）',fb:'屋主有疑慮時，說明清楚通常就能取得同意。'}]}],
  done:'阿嬤往旁邊讓了一步。「……好啦，你看。裡面比較暗，小心。」'},
 B:{who:'無線電・學長',again:'（你又回到空屋門口。無線電響了。）',retryHint:'再到空屋門口，就能重新回報。',nodes:[
  {say:'（門牌旁貼著褪色的法拍公告。鐵門半掩，裡面一片黑。無線電響了。）到空屋了？你打算怎麼做？',ch:[
   {t:'「推開門，直接進去看。」',tone:'locked',re:'（你推了推門。門後被東西卡住，推不開。）學長：「停，手放開。沒有同意不能進去。」',fb:'沒有屋主同意或依程序會同，不能擅自進入私人住宅，就算是空屋。'},
   {t:'「空屋沒人，跳過，去下一戶。」',tone:'radio',re:'學長：「跳過？病例就在這條巷子。你再想一次。」',fb:'病例周邊的空屋沒有人清理，往往是最嚴重的地方，不能跳過。'},
   {t:'「先記錄門牌，請里長聯絡屋主或管理人。取得同意、有人會同，我再進去。」',ok:1,fb:'空屋要依程序處理：找到所有權人或管理人，取得同意並會同進入；聯絡不到時由主管機關依法處理。'}]}],
  done:'學長：「里長剛回電，屋主同意了，里長在巷口會同。你進去吧。……裡面很久沒人了。」'},
 C:{who:'管理員',again:'（管理員又擋在車道口）「又是你。」',nodes:[
  {say:'（管理員擋在車道口）地下室？那是社區的公共區域，要檢查你去找主委，我不能作主。',ch:[
   {t:'「這是法定防疫工作，你不讓我進去就是妨礙公務。」',tone:'angry',re:'「妨礙公務？好啊，你去告。」（他雙手抱胸，站回車道中間。）',fb:'一開始就搬出法條，會把對方推到對立面。'},
   {t:'「了解，您有您的職責。能不能麻煩您現在打給主委？我可以直接跟他說明，您陪我一起下去看，十分鐘就好。」',ok:1,fb:'尊重對方的權責，請他聯絡有權決定的人，並邀請會同。'},
   {t:'「那我自己下去，你當作沒看到。」',tone:'angry',re:'「出事是我要負責欸。」（他把車道的鐵捲門拉了下來。）',fb:'要對方違反職責，還沒有人會同，出了事沒有人能負責。'}]},
  {say:'（他掛上電話）主委說可以。不過下面常常積水啦，抽了又滲出來，那個沒辦法。而且水那麼髒，蚊子不會生在那裡吧？',ch:[
   {t:'「髒水就不會有登革熱的蚊子，那我看一下就走。」',tone:'silent',re:'（管理員聳聳肩）「那下面就不用看了嘛。」（他把鑰匙收回口袋。）',fb:'地下室積水是埃及斑蚊的重要孳生源，不能預設沒有。'},
   {t:'「地下室積水在南部常常就是斑蚊的來源，蚊子會順著樓梯間往上飛到住戶家。抽不乾的話我們可以先投藥，再請管委會處理滲漏。」',ok:1,fb:'說明風險，並提供對方做得到的解法。'},
   {t:'「積水就是違規，你們社區等著被開單。」',tone:'angry',re:'「主委才剛答應你，你就要開單？」（他把鑰匙收回口袋，轉身走回管理室。）',fb:'威脅無法解決滲水的問題，只會讓對方不再配合。'}]}],
  done:'管理員拿起鑰匙。「跟我來。……下面的燈壞很久了，自己小心。」'}
};


LEVELS.alley={id:'alley',name:'第一關　黃昏的巷子',blurb:'陳阿嬤家、空屋、公寓地下室。',
 start:{x:0,y:0,z:5,yaw:0},bg:0x150d18,fog:.05,doorKey:'B',SITES,ITEMS,DLG,
 intro:['學長：「聽得到嗎？黃昏是斑蚊最活躍的時候，動作快。」','學長：「右手邊第一戶是陳阿嬤家。先敲門，取得同意才能進去。」','學長：「聽到蚊子聲變大，附近就有孳生源。不要在旁邊站太久。」'],
 npcLine:{A:'陳阿嬤：「你慢慢看。……晚上不要在外面待太久。」',C:'管理員：「我在這裡等你。下面我不想下去。」'},
 objective(S){const u=S.unlocked;return !u.A?'目標：和右手邊第一戶的陳阿嬤說話':(!u.B&&!u.C)?'目標：檢查陳阿嬤家的院子和屋內。覺得沒有遺漏，就往巷子深處走':'目標：找出每個地點的積水容器。結束後回巷口的機車回報';},
 ambient(p){const Z=[[9,17,-17,-5],[-15,-3,-36,-22],[3,17,-57,-41]];return Z.some(z=>p.x>z[0]&&p.x<z[1]&&p.z>z[2]&&p.z<z[3])?.13:.5;},
 takeaways:['先表明身分、出示證件、說明目的；罰則不拿來開場。空屋和公共區域要找到有權決定的人，會同進入。','噴藥只殺成蚊。水裡的幼蟲和容器壁上的卵要靠清除孳生源。','斑蚊幼蟲的呼吸管短而粗、呼吸管毛一對；家蚊的細長、多對。家蚊不計入斑蚊指數，但仍要清除。','容易漏掉的地方：室內花瓶、閒置馬桶、冷氣接水、地下室積水、空屋裡的廢棄物。','只倒水不刷洗，黏在容器壁上的卵會留下來，能耐乾燥好幾個月。'],
 build(K){
  const {THREE,scene,col,anim,items,npcs,G,M,C,box,wallX,wallZ,mesh,interact,signTex}=K;
  /* 地面、巷子、填充建築 */
  box(44,.2,84,0,-.1,-27,M.asphalt,{collide:false,uv:3});
  wallZ(8,-3,3,6,M.brick);wallZ(-62,-3,3,6,M.brick);
  const fill=(x,z,w,d,h,m)=>box(w,h,d,x,h/2,z,m,{uv:3});
  fill(-9,-7,12,30,8,M.plaster);fill(-9,-49,12,26,9,M.concrete);
  fill(10,1.5,14,13,8,M.concrete);fill(10,-29,14,24,9,M.plaster);fill(10,-59.5,14,5,8,M.brick);
  // 空屋與地下室、阿嬤家上方的量體
  box(12,5,14,-9,5.8,-29,M.old,{collide:false,uv:3});box(14,6,16,10,6.4,-49,M.concrete,{collide:false,uv:3});
  // 窗戶
  const winOn=new THREE.MeshBasicMaterial({color:0xc9a25a}),winOff=new THREE.MeshBasicMaterial({color:0x0c0b10});
  [[-3.01,-4,5,1],[-3.01,-12,5.2,0],[-3.01,-18,4.6,0],[-3.01,-42,5.5,0],[-3.01,-52,6,1],[3.01,2,5,0],[3.01,-22,5.5,0],[3.01,-30,6.2,1],[3.01,-36,5,0],[3.01,-45,6.5,0],[3.01,-53,6.5,0],[-3.01,-26,5.6,0],[-3.01,-32,5.6,0]].forEach(w=>{
    const m=mesh(new THREE.BoxGeometry(.06,1.1,1.3),w[3]?winOn:winOff,w[0],w[2],w[1]);});
  // 路燈
  function lamp(x,z,fl){mesh(new THREE.BoxGeometry(.12,4.4,.12),C(0x2a2a2a),x,2.2,z);mesh(new THREE.BoxGeometry(.5,.12,.2),new THREE.MeshBasicMaterial({color:0xffb060}),x-Math.sign(x)*.3,4.3,z);
    const l=new THREE.PointLight(0xff9a45,1.1,15,1.6);l.position.set(x-Math.sign(x)*.4,4.1,z);scene.add(l);if(fl)anim.push(t=>{l.intensity=(Math.sin(t*23)+Math.sin(t*7.3)>1.2)?.1:1.1;});}
  lamp(-2.7,-14,false);lamp(2.7,-37,true);
  // 告示、封鎖線、機車
  const sg=mesh(new THREE.PlaneGeometry(2.2,2.2),new THREE.MeshPhongMaterial({map:signTex(['登革熱','防治區','請配合調查'],'#b8a13a','#1a1408')}),-2.83,1.9,2);sg.rotation.y=Math.PI/2;
  const sc=new THREE.Group();mesh(new THREE.BoxGeometry(.45,.5,1.3),C(0x2f5d50),0,.65,0,sc);mesh(new THREE.CylinderGeometry(.27,.27,.12,8),C(0x111111),0,.27,.6,sc).rotation.z=Math.PI/2;mesh(new THREE.CylinderGeometry(.27,.27,.12,8),C(0x111111),0,.27,-.6,sc).rotation.z=Math.PI/2;mesh(new THREE.BoxGeometry(.5,.4,.1),C(0x2f5d50),0,1.05,-.55,sc);mesh(new THREE.BoxGeometry(.5,.35,.45),C(0xd8d0b8),0,1.05,.5,sc);
  sc.position.set(2,0,6.2);scene.add(sc);col.push({x0:1.6,x1:2.4,z0:5.5,z1:6.9});interact(sc,{type:'van',label:'回報：防疫機車'});
  // 水溝蓋（裝飾互動）
  const dr=mesh(new THREE.BoxGeometry(.7,.04,5),M.metal,-2.4,.02,-20);interact(dr,{type:'deco',label:'查看：水溝',text:'水溝裡的水在流動，而且很髒。這種地方就算有幼蟲，多半是家蚊，不是斑蚊容器調查的對象。'});
  const mb=mesh(new THREE.BoxGeometry(.1,.4,.5),C(0x7a2a22),-2.9,1.3,-27.2);interact(mb,{type:'deco',label:'查看：信箱',text:'信箱塞滿了泛黃的傳單和催繳單。這裡很久沒有人住了。'});

  /* NPC */
  const LOOK={A:{sex:'f',skin:0xc49a7c,shirt:0x7a4a6a,shirt2:0xd8a0b8,pattern:'floral',pants:0x3a3440,hair:0x8e8a84,style:'bun',age:.95,hunch:.6,pose:'behind',sleeves:'long'},
   C:{shirt:0x55667a,shirt2:0xc8c0a0,pattern:'uniform',pants:0x2a2c34,hair:0x3a3a38,style:'cap',cap:0x283248,age:.6,pose:'cross',glasses:true,mood:'tired'}};
  function npc(x,z,h,color,key,label){const g=K.body(h/(key==='A'?1:1),key?LOOK[key]:{shirt:color});g.position.set(x,0,z);scene.add(g);if(key){interact(g,{type:'npc',key,label});npcs[key]=g;}return g;}
  /* 容器模型 */
  function swarm(x,y,z){const n=36,p=new Float32Array(n*3),g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));
    const pts=new THREE.Points(g,new THREE.PointsMaterial({color:0x9a9488,size:.035}));pts.userData={c:[x,y,z],ph:Array.from({length:n},()=>[Math.random()*6.3,Math.random()*6.3,.6+Math.random()*1.6,.25+Math.random()*.8])};scene.add(pts);return pts;}
  function item(id,grp,x,z,r,sy){grp.position.set(x,0,z);scene.add(grp);interact(grp,{type:'item',id,label:'檢查：'+ITEMS[id].label});
    items[id]={grp,x,z,swarm:ITEMS[id].larvae==='aedes'?swarm(x,sy||.9,z):null};if(r)col.push({x0:x-r,x1:x+r,z0:z-r,z1:z+r});}
  const cyl=(rt,rb,h,mat,y,p,seg)=>mesh(new THREE.CylinderGeometry(rt,rb,h,seg||9),mat,0,y,0,p);
  const bucket=(color,water,y0)=>{const g=new THREE.Group();cyl(.2,.15,.36,C(color),.18+(y0||0),g);if(water)cyl(.185,.185,.01,water,.34+(y0||0),g);return g;};

  /* ===== A 陳阿嬤家 ===== */
  wallX(3,-17,-5,1.4,M.brick,[[-12,-10]]);col.push({x0:2.8,x1:3.2,z0:-12,z1:-10,id:'gateA'});
  box(6,.06,12,6,.03,-11,M.concrete,{collide:false});
  wallX(9,-17,-5,3.2,M.plaster,[[-12,-10]]);wallX(17,-17,-5,3.2,M.plaster);wallZ(-5,9,17,3.2,M.plaster);wallZ(-17,9,17,3.2,M.plaster);
  box(8.4,.2,12.4,13,3.3,-11,M.dark,{collide:false});box(8,.06,12,13,.03,-11,M.tile,{collide:false});
  box(9,.25,13,12.6,3.55,-11,M.brick,{collide:false});
  npc(3.5,-11,.86,0x5a4a5e,'A','交談：陳阿嬤');col.push({x0:3.2,x1:3.8,z0:-11.3,z1:-10.7,id:'npcA'});
  { // 盆栽
    const g=new THREE.Group();cyl(.36,.36,.06,C(0x6b3f2a),.03,g);cyl(.33,.33,.01,M.water,.062,g);cyl(.27,.2,.42,C(0x8a4a2c),.27,g);
    [[0,.75,0,.3],[.14,.95,.05,.22],[-.12,1,-.06,.2]].forEach(s=>mesh(new THREE.SphereGeometry(s[3],6,5),C(0x24401f),s[0],s[1],s[2],g));item('A1',g,7.2,-7,.35,.5);
    [[4.4,-6.2],[8.2,-8.6]].forEach(p=>{const d=new THREE.Group();cyl(.2,.15,.3,C(0x7a4228),.15,d);mesh(new THREE.SphereGeometry(.22,6,5),C(0x2a4a22),0,.5,0,d);d.position.set(p[0],0,p[1]);scene.add(d);});}
  {const g=new THREE.Group();cyl(.42,.3,.9,C(0x3e2e24),.45,g,10);cyl(.38,.38,.01,M.water,.88,g,10);item('A2',g,4.6,-15.6,.42);}
  {const g=new THREE.Group();cyl(.15,.2,.36,C(0x2f5f96),.18,g);item('A3',g,8.2,-15.9,.2);}
  { // 屋內：桌、花瓶、神明桌、紅燈、椅
    box(1.6,.08,.9,13,.78,-7.2,M.wood,{collide:false});[[12.3,-7.5],[13.7,-7.5],[12.3,-6.9],[13.7,-6.9]].forEach(p=>box(.08,.76,.08,p[0],.38,p[1],M.wood,{collide:false}));col.push({x0:12.2,x1:13.8,z0:-7.65,z1:-6.75});
    const g=new THREE.Group();cyl(.07,.09,.26,new THREE.MeshPhongMaterial({color:0x7fb0b8,transparent:true,opacity:.6,shininess:90}),.95,g);cyl(.06,.07,.16,M.water,.9,g);
    [[-.02,0],[.03,.02],[0,-.03]].forEach((p,i)=>{mesh(new THREE.BoxGeometry(.02,.5+i*.08,.02),C(0x2f5a28),p[0],1.3+i*.04,p[1],g);});item('A4',g,13,-7.2,0,1.15);
    box(2.2,1.1,.7,15.6,.55,-16.4,M.wood);box(.5,.5,.3,15.6,1.35,-16.5,C(0x7a5a22),{collide:false});
    [-.7,.7].forEach(dx=>mesh(new THREE.BoxGeometry(.08,.22,.08),new THREE.MeshBasicMaterial({color:0xff2a1a}),15.6+dx,1.22,-16.35));
    const rl=new THREE.PointLight(0xff1a10,.9,7,1.5);rl.position.set(15.6,1.5,-15.7);scene.add(rl);anim.push(t=>{rl.intensity=.8+Math.sin(t*3.1)*.08;});
    box(.6,.9,.6,10,.45,-15.8,C(0x4a3a40));box(1.9,.5,.8,15.9,.25,-10,C(0x3f3a4a));
    const tv=mesh(new THREE.BoxGeometry(.7,.5,.5),C(0x1a1a1c),10,1.15,-15.8);}

  /* ===== B 空屋 ===== */
  wallX(-3,-36,-22,3.2,M.old,[[-30,-28]]);wallX(-15,-36,-22,3.2,M.old);wallZ(-22,-15,-3,3.2,M.old);wallZ(-36,-15,-3,3.2,M.old);wallX(-9,-36,-22,3.2,M.old,[[-34,-32]]);
  box(12.4,.2,14.4,-9,3.3,-29,M.dark,{collide:false});box(12,.06,14,-9,.03,-29,M.concrete,{collide:false});
  const door=box(.12,2.2,2,-3,1.1,-29,M.wood,{id:'doorB'});interact(door,{type:'door',label:'查看：空屋的門'});G.door=door;
  const no=mesh(new THREE.PlaneGeometry(.45,.6),new THREE.MeshPhongMaterial({color:0xb8ad92}),-2.93,1.5,-29.3);no.rotation.y=Math.PI/2;door.attach(no);
  {const g=new THREE.Group();[0,1,2].forEach(i=>{const t=mesh(new THREE.TorusGeometry(.36,.14,6,10),C(0x141414),(i-1)*.04,.14+i*.27,0,g);t.rotation.x=Math.PI/2;});cyl(.22,.22,.01,M.water,.2,g);item('B1',g,-5,-23.6,.5,1);}
  {const g=bucket(0x8a8468,M.water);item('B2',g,-7.6,-34.6,.2,.8);mesh(new THREE.BoxGeometry(.9,.03,.9),C(0x1a1612),-7.6,3.19,-34.6);}
  {const g=new THREE.Group();mesh(new THREE.BoxGeometry(.4,.4,.55),C(0xa8a496),0,.2,0,g);cyl(.2,.17,.1,C(0xb8b4a6),.44,g);cyl(.16,.16,.01,M.water,.47,g);mesh(new THREE.BoxGeometry(.46,.42,.2),C(0xa8a496),0,.62,-.34,g);mesh(new THREE.BoxGeometry(.4,.01,.14),M.water,0,.835,-.34,g);item('B3',g,-13.8,-23,.35,1.1);
    box(.1,2,1.2,-12.9,1,-23.1,M.old);}
  {const g=new THREE.Group();cyl(.4,.36,.9,C(0x1f3f6a),.45,g,10);cyl(.37,.37,.01,M.foul,.88,g,10);[[.1,.05],[-.15,-.1],[.02,-.2]].forEach(p=>mesh(new THREE.BoxGeometry(.07,.012,.03),C(0x050505),p[0],.89,p[1],g));item('B4',g,-13.6,-34.6,.4);}
  // 空屋雜物
  box(1.8,.45,.8,-5,.23,-34.8,C(0x3a3430));box(.8,1.7,.5,-14.4,.85,-28,C(0x4a4640));box(1.2,.05,1.9,-11,.05,-29,C(0x4a4038),{collide:false});
  [[-6.5,-26],[-10.5,-33],[-12,-25.5]].forEach(p=>{const m=mesh(new THREE.BoxGeometry(.5,.02,.4),C(0x8a8470),p[0],.07,p[1]);m.rotation.y=p[0];});
  const fig=npc(-12,-33.4,1.05,0x050505,null);fig.traverse(o=>{if(o.isMesh)o.material=new THREE.MeshBasicMaterial({color:0x020202});});fig.visible=false;G.figure=fig;

  /* ===== C 公寓地下室 ===== */
  wallX(3,-57,-41,3.2,M.concrete,[[-50,-48]]);col.push({x0:2.8,x1:3.2,z0:-50,z1:-48,id:'gateC'});
  wallX(17,-57,-41,3.2,M.concrete);wallZ(-41,3,17,3.2,M.concrete);wallZ(-57,3,17,3.2,M.concrete);
  box(14.4,.2,16.4,10,3.3,-49,M.dark,{collide:false});box(14,.06,16,10,.03,-49,M.concrete,{collide:false,uv:3});
  [[8,-45],[8,-53],[13,-45]].forEach(p=>box(.6,3.2,.6,p[0],1.6,p[1],M.concrete));
  const ps=mesh(new THREE.PlaneGeometry(2.4,.8),new THREE.MeshBasicMaterial({map:signTex(['B1 停車場'],'#1c2a3a','#c8d0d8')}),2.83,2.75,-49);ps.rotation.y=-Math.PI/2;
  npc(2.45,-49,1,0x3a4a5a,'C','交談：管理員');col.push({x0:2.2,x1:2.7,z0:-49.3,z1:-48.7,id:'npcC'});
  const fl=new THREE.PointLight(0xa8c8d8,.8,13,1.4);fl.position.set(11,2.9,-51);scene.add(fl);const tube=mesh(new THREE.BoxGeometry(1.4,.06,.12),new THREE.MeshBasicMaterial({color:0xcfe6f0}),11,3.15,-51);
  anim.push(t=>{const on=(Math.sin(t*31)+Math.sin(t*4.7)+Math.sin(t*1.3))>.4;fl.intensity=on?.8:.02;tube.material.color.setHex(on?0xcfe6f0:0x1a2226);});
  {const g=bucket(0xa88a2a,M.water);mesh(new THREE.BoxGeometry(.04,1.7,.04),C(0x8a8a88),.0,1.3,-.22,g);item('C1',g,4.4,-41.7,.2,.8);box(.9,.5,.3,4.4,2.4,-41.3,C(0xb8b8b0),{collide:false});}
  {const g=new THREE.Group();mesh(new THREE.BoxGeometry(7,.05,6.6),M.water,0,.07,0,g);item('C2',g,13.4,-53.6,0,.7);
    items.C2.swarm.userData.ph.forEach(p=>{p[3]=1+Math.random()*2.4;});}
  {const g=bucket(0x7a2a22,M.water);mesh(new THREE.BoxGeometry(.04,1.4,.04),C(0x6a5a3a),.1,.75,.05,g).rotation.z=-.25;item('C3',g,16.3,-42,.2);}
  // 機車與雜物
  [[6,-55.6],[7.4,-55.6]].forEach(p=>{const s=new THREE.Group();mesh(new THREE.BoxGeometry(1.3,.5,.4),C(0x4a2a2a),0,.6,0,s);mesh(new THREE.BoxGeometry(.3,.5,.3),C(0x111111),.5,.27,0,s);mesh(new THREE.BoxGeometry(.3,.5,.3),C(0x111111),-.5,.27,0,s);s.position.set(p[0],0,p[1]);s.rotation.y=Math.PI/2;scene.add(s);col.push({x0:p[0]-.3,x1:p[0]+.3,z0:p[1]-.7,z1:p[1]+.7});});
  box(1,1,1,16.2,.5,-46,C(0x5a4a32));


  items.C2.r=3;
 },
 onUnlock(key,K){const G=K.G;
  if(key==='A'){G.col=G.col.filter(c=>c.id!=='gateA'&&c.id!=='npcA');G.npcs.A.position.set(4.4,0,-9);G.col.push({x0:4.1,x1:4.7,z0:-9.3,z1:-8.7});K.sub('學長：「院子看完，屋裡也要看。埃及斑蚊喜歡待在室內。」',5,true);}
  if(key==='B'){G.col=G.col.filter(c=>c.id!=='doorB');G.door.position.set(-4,1.1,-28.02);G.door.rotation.y=Math.PI/2;K.burst(.5,300,.2);}
  if(key==='C'){G.col=G.col.filter(c=>c.id!=='gateC'&&c.id!=='npcC');G.npcs.C.position.set(4,0,-47.3);G.col.push({x0:3.7,x1:4.3,z0:-47.6,z1:-47});}
 },
 tick(K,dt,p){const G=K.G,S=G.S;
  if(!S.ev.scare&&S.unlocked.B&&p.x<-5.6&&p.x>-9&&p.z<-22&&p.z>-36){S.ev.scare=true;G.flick=1.3;G.figure.visible=true;K.burst(.9,160,.5);
   K.sub('……',1.5);K.sub('學長：「怎麼了？……那間屋子沒有別人，里長在巷口。專心找水。」',5.5,true);}
 }
};
})();
