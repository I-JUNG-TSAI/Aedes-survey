/* 第二關：藝術家的工寮 —— 鐵皮工寮、防火巷雜物、隔壁有狗的空屋 */
(function(){
const SITES={W:{name:'藝術家的工寮'},D:{name:'隔壁的空屋'}};
const ITEMS={
 W1:{site:'W',label:'飲水機',name:'飲水機的接水底盤',desc:'工作室門邊的落地型飲水機。出水口下方有一個接水的底盤，要抽出來才看得到裡面。',water:1,larvae:'aedes',
  resP:'把底盤抽出來，裡面積了半盤水和一層灰。水裡有幼蟲。',resN:'把底盤抽出來，裡面積了半盤水和一層灰。沒有幼蟲。',
  learn:'飲水機、開飲機的接水底盤藏在機身裡，不抽出來就看不到，是室內很常被漏掉的位置。',
  acts:[{t:'往底盤裡投藥，之後就不用再清',fb:'能倒掉刷洗的容器不靠投藥，而且這是飲水設備。'},{t:'倒掉並刷洗底盤，請他每週抽出來清一次',ok:1,fb:'讓使用的人知道這個位置，之後他才會自己清。'},{t:'請他拔掉插頭，這台飲水機不要再用',fb:'不合理的要求。每週清一次底盤就能解決。'}]},
 W2:{site:'W',label:'碟形鐵雕',name:'門口的碟形鐵雕',clear:'treat',clearWhy:'這件作品重好幾百公斤，不能搬、也倒不了，而且沒有經過他同意不能動。先投藥，再和他商量怎麼讓它不再積水。',
  desc:'門口左邊一件碟形的大型鐵雕，凹面朝上，鏽得很厚。',water:1,larvae:'aedes',
  resP:'凹面最低的地方積了一灘雨水，水是鐵鏽色的。撈了一下，有幼蟲。',resN:'凹面最低的地方積了一灘雨水，水是鐵鏽色的。撈了幾次，沒有幼蟲。',
  learn:'戶外的雕塑和裝置，只要有朝上的凹面就會積雨水。作品不能擅自移動，處理方式要和所有人商量。',
  acts:[{t:'請他這幾天把作品搬進室內放',fb:'作品重好幾百公斤，要求搬動不切實際，只會讓他拒絕配合。'},{t:'投過藥了，這一處就算處理完成',fb:'藥效有期限。凹面還在，下一場雨又會積水。'},{t:'和他商量：鑽排水孔，或下雨前蓋帆布',ok:1,fb:'讓凹面留不住水，才是長期的做法。怎麼改，由作品的主人決定。'}]},
 W3:{site:'W',label:'洗筆桶',name:'畫架旁的洗筆桶',desc:'畫架旁邊一個洗筆用的桶子，裡面是混著顏料的水。',water:1,larvae:null,
  result:'水是灰紫色的，有松節油的味道。撈了幾次，沒有幼蟲。',learn:'還在使用、常更換的洗筆水不一定有幼蟲，但仍然是積水容器，要記錄。',
  acts:[{t:'記錄為陰性，請他洗完筆當天就倒掉',ok:1,fb:'陰性也要記錄。提醒他不要讓洗筆水放過夜。'},{t:'有顏料的水不會有蚊子，不用記錄',fb:'有水就是積水容器。顏料沉澱之後，一樣可能被產卵。'},{t:'水很混濁看不清楚，列為陽性容器',fb:'沒有幼蟲或蛹，不能列為陽性。'}]},
 W4:{site:'W',label:'陶甕',name:'木箱上的陶甕',desc:'木箱上擺著幾個陶甕，是他的收藏。甕口朝上。',water:0,larvae:null,
  result:'用手電筒往甕裡照，裡面是乾的，只有灰塵。',learn:'室內淋不到雨的容器通常是乾的，但要看過才能確認。同樣的甕放到戶外就會積水。',
  acts:[{t:'甕口朝上就算，列為積水容器',fb:'沒有積水，不能計入。'},{t:'請他把每個甕都倒過來放',fb:'室內乾燥的收藏品沒有積水問題，沒有理由這樣要求。'},{t:'記錄為無積水，不列入積水容器',ok:1,fb:'確認過是乾的，如實記錄。'}]},
 W5:{site:'W',label:'藍色水桶',name:'接漏水的藍色水桶',desc:'後面棚子的鐵皮屋頂破了好幾個洞。破洞正下方放著一個藍色水桶接漏水。',water:1,larvae:'aedes',
  resP:'桶裡有大半桶雨水，水面漂著鏽屑。水裡有幼蟲。',resN:'桶裡有大半桶雨水，水面漂著鏽屑。撈了幾次，沒有幼蟲。',
  learn:'接漏水的容器會一直有水。根本的處理是修屋頂；修好之前，接到的水要常倒。',
  acts:[{t:'倒掉刷洗；屋頂修好前，每週倒一次',ok:1,fb:'容器有用途就保留，但要縮短積水的時間，並處理漏水的來源。'},{t:'把水桶收走，讓雨水直接流到地上',fb:'地面低窪的地方會變成另一灘積水，而且更難清。'},{t:'往桶裡投藥，讓它繼續接漏水',fb:'可以倒掉刷洗的容器不靠投藥。'}]},
 W6:{site:'W',label:'帆布',name:'雜物上的帆布',desc:'棚子角落的雜物上蓋著一塊藍色帆布。帆布中間凹下去一塊。',water:1,larvae:'aedes',
  resP:'凹下去的地方積了一窪雨水，裡面有落葉。水裡有幼蟲。',resN:'凹下去的地方積了一窪雨水，裡面有落葉。沒有幼蟲。',
  learn:'帆布、塑膠布的凹陷和皺褶會積水，不是容器的東西也可能是孳生源。',
  acts:[{t:'在帆布凹下去的地方戳幾個洞',fb:'水會漏到底下的雜物裡，在看不到的地方積起來。'},{t:'把水抖掉，帆布拉平綁成斜面',ok:1,fb:'讓水留不住，帆布還是可以繼續用。'},{t:'把帆布整塊拿掉，丟到垃圾堆',fb:'底下的雜物會直接淋雨，變成更多的積水容器。'}]},
 Y1:{site:'W',label:'油漆桶',name:'防火巷的油漆桶',desc:'防火巷的雜物堆裡有一個油漆桶，蓋子生鏽了，沒有蓋緊。',water:1,larvae:'aedes',
  resP:'掀開蓋子，桶裡有半桶雨水。水裡有幼蟲。',resN:'掀開蓋子，桶裡有半桶雨水。撈了幾次，沒有幼蟲。',
  learn:'蓋子沒蓋緊的桶子，雨水進得去、蚊子也進得去，從外面卻看不出來。要打開來看。',
  acts:[{t:'把蓋子壓緊，桶子留在原地就好',fb:'生鏽的蓋子蓋不密，下一場雨還是會進水。'},{t:'投藥之後，把蓋子照原樣蓋回去',fb:'沒有用途的廢棄容器不靠投藥，直接清除。'},{t:'倒掉後倒扣，請他清運這堆雜物',ok:1,fb:'廢棄容器的處理方式是清除。整堆雜物都要處理，不只是這一個桶子。'}]},
 Y2:{site:'W',label:'輪圈蓋',name:'牆邊的輪圈蓋',desc:'一個汽車輪圈蓋平放在地上，凹面朝上，有一半埋在落葉裡。',water:1,larvae:'aedes',
  resP:'凹面裡有一層淺淺的雨水和爛葉子。撥開葉子，水裡有幼蟲。',resN:'凹面裡有一層淺淺的雨水和爛葉子。撥開葉子，沒有幼蟲。',
  learn:'只要能盛住一點水，再淺、再小的東西都可能孳生斑蚊。',
  acts:[{t:'倒掉，立起來靠牆放，或收進屋內',ok:1,fb:'讓它裝不了水。'},{t:'水這麼淺很快就乾了，不用處理',fb:'在水乾掉之前，幼蟲可能已經羽化；下一場雨又會積水。'},{t:'把旁邊的落葉撥過來蓋住凹面',fb:'落葉擋不住雨水，也擋不住蚊子。'}]},
 Y3:{site:'W',label:'半埋的桶子',name:'半埋在土裡的塑膠桶',desc:'巷子深處有一個破掉的白色塑膠桶，半截埋在土裡，周圍長了草。',water:1,larvae:'aedes',
  resP:'桶底積著一層泥水。撈了一下，有幼蟲。',resN:'桶底積著一層泥水。撈了幾次，沒有幼蟲。',
  learn:'半埋在土裡的容器不容易被注意到，也倒不乾淨，要整個挖出來。',
  acts:[{t:'把周圍的草拔掉，讓太陽曬得到',fb:'曬不乾。桶子還在，雨後一樣積水。'},{t:'用旁邊的土把桶子整個埋起來',fb:'很難埋得密實，雨後土會下陷，又形成積水。'},{t:'挖出來倒掉並清運，凹洞用土填平',ok:1,fb:'把容器移走，並處理留下來的凹洞。'}]},
 T1:{site:'W',label:'紅色水桶',name:'廁所的紅色水桶',desc:'廁所角落一個紅色水桶，裡面裝著水，上面漂著一支水瓢。',water:1,larvae:'aedes',
  resP:'水桶裡的水很久沒動過，桶壁水線上方有一圈黑點。撈了一下，有幼蟲。',resN:'水桶裡的水是清的，看得出來常在用。撈了幾次，沒有幼蟲。',
  learn:'廁所裡備用的水桶常常一放就是好幾天。水線上方的黑點可能是斑蚊卵。',
  acts:[{t:'倒掉刷洗桶壁，之後加蓋，每週用完再接',ok:1,fb:'有使用需求的儲水容器：倒掉刷洗去卵，之後加蓋、定期用完。'},{t:'往桶裡投藥，水繼續留著沖廁所',fb:'可以倒掉刷洗的容器不靠投藥。'},{t:'把水桶收走，不准再放水',fb:'他需要用水。收走只會換成另一個沒人管的容器。'}]},
 D1:{site:'D',label:'黃色水桶',name:'空屋裡的黃色水桶',desc:'空屋房間地上的黃色水桶。屋頂的鐵皮破了，雨水滴得進來。',water:1,larvae:'aedes',
  resP:'桶裡有小半桶水。手電筒一照，水裡有幼蟲。',resN:'桶裡有小半桶水。手電筒照了一圈，沒有幼蟲。',
  learn:'沒有人住的空屋，容器沒有人倒，是社區裡最容易被忽略的孳生源。',
  acts:[{t:'空屋沒人住，不會有人被叮，不用處理',fb:'斑蚊會飛到附近有人住的地方。空屋正是要處理的地方。'},{t:'倒掉後倒扣，通報里長列管這間空屋',ok:1,fb:'現場先清除，空屋本身要通報，由里長和主管機關聯絡屋主處理。'},{t:'把水倒掉，水桶照原樣擺回原位',fb:'桶口朝上，下一場雨又會積水。'}]},
 D2:{site:'D',label:'陶盆',name:'空屋裡的陶盆',desc:'黃色水桶旁邊一個陶製的大花盆。',water:0,larvae:null,
  result:'盆底有排水孔，裡面只有乾掉的泥土，沒有積水。',learn:'底部有孔的花盆本身留不住水。要注意的是下面有沒有墊底盤。',
  acts:[{t:'記錄為無積水，不列入積水容器',ok:1,fb:'確認過是乾的，如實記錄。'},{t:'花盆都算積水容器，列入計算',fb:'沒有積水，不能計入。'},{t:'保險起見，往盆裡投一點藥',fb:'沒有水的地方不需要投藥。'}]},
 D3:{site:'D',label:'紫色水桶',name:'門邊的紫色水桶',desc:'空屋房間門邊的紫色水桶，裡面有半桶水。',water:1,larvae:'aedes',
  resP:'水是清的。蹲下來看，有幼蟲貼在水面下。',resN:'水是清的。蹲下來看了一陣子，沒有幼蟲。',
  learn:'同一間屋子裡的容器要逐一檢查，不能看了一個就推論其他的。',
  acts:[{t:'把水直接倒在屋內的地上',fb:'屋內地面不平，會積成水灘。水要倒到屋外排得掉的地方。'},{t:'投藥之後，水桶留在原地',fb:'沒有人使用的容器不靠投藥，直接清除。'},{t:'水倒到屋外，水桶倒扣放好',ok:1,fb:'清除積水，並讓容器不再裝水。'}]},
 D4:{site:'D',label:'狗的水盆',name:'鐵籠旁的不鏽鋼盆',desc:'鐵籠旁邊一個不鏽鋼盆，是餵狗的人放的水盆。',water:1,larvae:null,
  result:'水是清的，盆壁摸起來不滑，看得出來常換。沒有幼蟲。',learn:'寵物的水盆每天換水、刷洗就不會孳生。這是容易被忽略的積水容器，要記錄，也要提醒飼主。',
  acts:[{t:'把水倒掉，請她不要再放水盆',fb:'狗需要喝水。每天換水、刷洗就可以，不需要禁止。'},{t:'記錄為陰性，請她每天換水並刷洗',ok:1,fb:'陰性也要記錄，並讓飼主知道水盆要每天換洗。'},{t:'往水盆裡投藥，預防蚊子產卵',fb:'這是動物的飲用水，不能投藥。'}]},
 D5:{site:'D',label:'藍色大桶',name:'鐵門邊的藍色大桶',desc:'鐵門內側一個藍色的大塑膠桶，沒有蓋子。',water:1,larvae:'aedes',
  resP:'桶底積了十幾公分深的雨水，有落葉。水裡有幼蟲。',resN:'桶底積了十幾公分深的雨水，有落葉。撈了幾次，沒有幼蟲。',
  learn:'沒在使用的大型容器要倒扣或加蓋，否則每一場雨都會積水。',
  acts:[{t:'倒掉刷洗後倒扣，請里長聯絡屋主',ok:1,fb:'清除、倒扣，並把空屋的問題交給里長和屋主。'},{t:'桶子太大不好倒，記錄後留在原地',fb:'記錄不等於處理。積水還在，孳生源就還在。'},{t:'找一塊木板，蓋在桶口上面',fb:'木板蓋不密，蚊子還是進得去，而且沒有人會維護。'}]}
};
const CAND=['W1','W2','W5','W6','T1','Y1','Y2','Y3','D1','D3','D5'],NPOS=6;
function shuffle(){const ids=CAND.slice();for(let i=ids.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[ids[i],ids[j]]=[ids[j],ids[i]];}
  ids.forEach((id,k)=>{const o=ITEMS[id],pos=k<NPOS;o.larvae=pos?'aedes':null;o.result=pos?o.resP:o.resN;});}

const DLG={
 W:{who:'工寮主人',again:'（他還站在門口，手上拿著焊槍。）',nodes:[
  {say:'（一個男人在門口焊東西，頭也不回）我在趕展覽的作品，沒空。這裡是工作室，又不是住家，哪來的蚊子？',ch:[
   {t:'「老師好，我衛生所的啦。您工作室東西這麼多，很容易積水欸，要整理一下喔。」',tone:'angry',re:'「你是在說我這裡很亂？」（他把面罩拉下來，繼續焊他的東西。）',fb:'一開口就批評他的工作環境，他不會讓你進去。'},
   {t:'「老師好，我衛生所的啦。附近有登革熱，我只看積水，您的作品我們不會碰啦！」',ok:1,fb:'表明身分、說明原因，並先回應他最在意的事：作品不會被動到。'},
   {t:'「老師好，我衛生所的啦。您先忙沒關係，我自己進去繞一圈，看完就走喔。」',tone:'angry',re:'「裡面都是作品，誰准你自己進去？」（他站到門口中間，把路擋住。）',fb:'沒有得到同意、沒有人陪同就進入，是不行的。在工作室裡，碰壞東西也說不清楚。'}]},
  {say:'（他關掉焊槍）外面那些鐵雕會積雨水，我知道。但那是作品，你不要給我搬，也不要亂倒東西進去。',ch:[
   {t:'「放心啦，作品我們不會動到！有積水的地方我先指給您看，再一起想怎麼處理。」',ok:1,fb:'尊重他對作品的決定權，同時讓他參與處理。之後他才會自己維持。'},
   {t:'「放心啦，作品我們不會動到！那外面的鐵雕就不用看了，今天只看裡面就好。」',tone:'silent',re:'（他點點頭，轉身回去焊東西。門口那件碟形鐵雕，你沒有看。）',fb:'戶外會積水的作品正是要檢查的地方。不動作品，不等於不檢查。'},
   {t:'「放心啦，作品我們不會動到！不過會積水的作品，一個禮拜內要請您搬進室內喔。」',tone:'angry',re:'「幾百公斤的東西，你來搬？」（他重新點起焊槍，不再理你。）',fb:'提出做不到的要求，等於逼他拒絕。要找的是他做得到的處理方式。'}]}],
  done:'他把焊槍掛回架上。「你要看就看。東西不要碰亂。」'},
 D:{who:'空屋門口',again:'（你又走近鐵門。狗馬上站了起來。）',retryHint:'先退回巷子，再走近鐵門，就能重新開始。',btn:'繼續',nodes:[
  {say:'（一隻黑狗從鐵籠後面衝出來，隔著半開的鐵門對你狂吠，背上的毛都豎起來了。）',ch:[
   {t:'趕快轉身跑開，先拉開距離，再用無線電回報。',tone:'bite',bite:1,re:'（你一轉身，狗就追了出來，一口咬在你的小腿上。）',fb:'背對著狗跑，會引發牠追咬。被咬傷要立刻沖洗傷口、就醫，並通報主管。'},
   {t:'先停下來，不要盯著牠看，側身慢慢退到門外。',ok:1,fb:'不跑、不直視、不背對，慢慢拉開距離。讓狗知道你沒有要進入牠的地盤。'},
   {t:'瞪著牠的眼睛大聲兇回去，慢慢往前把牠逼退。',tone:'bite',bite:1,re:'（狗壓低身體，撲上來咬住你的褲管，撕破了一塊。）',fb:'直視和喝斥對狗是挑釁。護地盤的狗被逼近時會攻擊。'}]},
  {say:'（你退到巷子上。狗停在門內，還在低吼。無線電響了）學長：「我聽到狗叫了。這一戶你打算怎麼辦？」',ch:[
   {t:'「有狗進不去啦，這一戶就先記已檢查、沒有積水好了。」',tone:'radio',re:'學長：「你連門都沒進去，怎麼知道沒有積水？再想想。」',fb:'沒看過的地方不能當作陰性。'},
   {t:'「可以請里長找飼主或餵狗的人把狗牽好嗎？我再進去。」',ok:1,fb:'有動物威脅時先確保安全：找到能控制動物的人，再進行調查。找不到人，就記錄未入戶並通報。'},
   {t:'「我拿個東西把狗引開，趁牠不注意趕快溜進去看一下。」',tone:'radio',re:'學長：「不行。你進去之後牠回頭，你就被堵在裡面了。」',fb:'狗沒有被控制住，就不要進入。'}]}],
  done:'學長：「好，我打給里長。……餵狗的人就住在隔壁，她現在過來。」過了幾分鐘，一位阿姨走過來，把狗牽到門外抱住。'}
};
const LOOKS={W:{shirt:0x3a3a3c,pants:0x4a4a52,shoes:0x2a2622,apron:0x5a4630,hair:0x8a8880,style:'side',age:.7,beard:true,glasses:true,pose:'hold',mood:'tired'},
 F:{sex:'f',shirt:0x6a7a5a,shirt2:0xc8b070,pattern:'floral',pants:0x3a3440,shoes:0x8a3a4a,hair:0x4a4640,style:'perm',age:.65,pose:'hold',sleeves:'long'},
 S:{shirt:0x4a6a8a,shirt2:0x8aa0b4,pattern:'uniform',vest:0xb8a034,pants:0x2a2c34,shoes:0x2a2a2a,hair:0x1a1816,style:'short',age:.35,pose:'hold',sleeves:'long'}};

function build(K){
  shuffle();
  const {THREE,scene,col,rayList,anim,G,M,C,box,wX,wZ,mesh,interact,signTex,P,tex,person,figure,addItem,scooter}=K;
  const Pr=makeProps(K),PI=Math.PI,R=Math.random,nb={collide:false},V=(a,b)=>new THREE.Vector2(a,b);
  const deco=(o,label,text)=>interact(o,{type:'deco',label,text});
  const ph=(c,o)=>new THREE.MeshPhongMaterial(Object.assign({color:c,shininess:10},o||{}));
  /* ---------- 材質 ---------- */
  const fbm=(()=>{const N=64,g=new Float32Array(N*N);for(let i=0;i<N*N;i++)g[i]=R();const s=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,a=g[(yi&63)*N+(xi&63)],b=g[(yi&63)*N+((xi+1)&63)],c=g[((yi+1)&63)*N+(xi&63)],d=g[((yi+1)&63)*N+((xi+1)&63)],u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v;};
    return (x,y,o)=>{let t=0,a=.5,f=1;for(let i=0;i<(o||4);i++){t+=a*s(x*f,y*f);a*=.5;f*=2;}return t;};})();
  const cl=v=>v<0?0:v>255?255:v|0;
  function mk(S,fn,after){const c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),im=g.createImageData(S,S),d=im.data;
    for(let y=0;y<S;y++)for(let x=0;x<S;x++){const q=fn(x,y,x/S,y/S),i=(y*S+x)*4;d[i]=cl(q[0]);d[i+1]=cl(q[1]);d[i+2]=cl(q[2]);d[i+3]=255;}g.putImageData(im,0,0);if(after)after(g,S);
    const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;}
  const drips=(g,S,n,c,y0,y1)=>{for(let i=0;i<n;i++){const x=R()*S,y=S*(y0+R()*(y1-y0)),l=20+R()*120,w=1+R()*4,gr=g.createLinearGradient(0,y,0,y+l);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x,y,w,l);}};
  const crack=(g,x,y,len,a,w,c)=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(x,y);for(let i=0;i<len;i+=5){a+=(R()-.5)*.35;x+=Math.cos(a)*5;y+=Math.sin(a)*5;g.lineTo(x,y);}g.stroke();};
  const corrTex=(base,rust)=>mk(256,(x,y,u,v)=>{const rib=Math.sin(x/256*PI*2*16),b=fbm(u*3,v*3),r=fbm(u*6+9,v*2+4),n=(R()-.5)*10;let c=[base[0]+rib*26-b*30,base[1]+rib*26-b*30,base[2]+rib*26-b*28];
      const k=Math.max(0,Math.min(1,(r-(1-rust))*5));c=[c[0]*(1-k)+(110+rib*14)*k,c[1]*(1-k)+(58+rib*8)*k,c[2]*(1-k)+30*k];return [c[0]+n,c[1]+n,c[2]+n];},
    (g,S)=>{drips(g,S,40,'rgba(96,50,22,.4)',0,.6);drips(g,S,30,'rgba(20,20,18,.3)',0,.8);g.fillStyle='rgba(20,20,20,.5)';for(let i=0;i<5;i++)g.fillRect(0,i*52+3,S,1);for(let i=0;i<40;i++)g.fillRect(R()*S,(R()*5|0)*52+2,2,2);});
  const MT={
   corr:P(corrTex([158,160,156],.28),{shininess:30,specular:0x333333},2.4),
   corrRust:P(corrTex([120,112,100],.6),{shininess:8},2.4),
   ground:P(mk(512,(x,y,u,v)=>{const b=fbm(u*4,v*4,5),p=fbm(u*2+7,v*2+3),n=(R()-.5)*18;let c=118+b*50;if(p>.56)c-=22;const o=fbm(u*9+2,v*9+5);if(o>.66)c-=(o-.66)*160;return [c+n,c+n-1,c+n-5];},
     (g,S)=>{for(let i=0;i<12;i++)crack(g,R()*S,R()*S,80+R()*240,R()*6.3,1.4,'rgba(26,24,20,.7)');for(let i=0;i<5000;i++){g.fillStyle=R()<.5?'rgba(30,28,24,.4)':'rgba(210,205,195,.3)';g.fillRect(R()*S|0,R()*S|0,1+R()*2|0,1+R()*2|0);}
       for(let i=0;i<8;i++){const x=R()*S,y=R()*S,r=20+R()*50,gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(20,16,12,.4)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);}}),{shininess:10,specular:0x1a1a1a},4),
   dirt:P(mk(256,(x,y,u,v)=>{const b=fbm(u*5,v*5,5),n=(R()-.5)*26,m=fbm(u*3+4,v*3+8);let c=[62+b*40,50+b*34,36+b*26];if(m>.6)c=[c[0]*.7,c[1]*.95,c[2]*.6];return [c[0]+n,c[1]+n,c[2]+n];},
     (g,S)=>{for(let i=0;i<300;i++){g.fillStyle=['#3a2a1a','#5a4a2a','#2a2a1a','#6a6a5a'][R()*4|0];g.save();g.translate(R()*S,R()*S);g.rotate(R()*3);g.fillRect(-3,-1,3+R()*7,1+R()*3);g.restore();}}),{},2),
   rust:P(mk(256,(x,y,u,v)=>{const b=fbm(u*8,v*8,5),s=fbm(u*30,v*30,2),n=(R()-.5)*22;const k=b*.7+s*.3;return [70+k*70+n,36+k*36+n*.7,22+k*16+n*.5];},
     (g,S)=>{for(let i=0;i<900;i++){g.fillStyle=R()<.5?'rgba(20,10,6,.6)':'rgba(170,90,40,.4)';g.beginPath();g.arc(R()*S,R()*S,.5+R()*2.5,0,7);g.fill();}}),{shininess:14,specular:0x2a1a10},1.2),
   brickRed:P(mk(256,(x,y,u,v)=>{const row=y/21.33|0,off=row%2?32:0,bx=(x+off)%64,by=y%21.33,mortar=bx<3||by<3,b=fbm(u*6,v*6),n=(R()-.5)*20,id=fbm((((x+off)/64|0)*7.3),row*3.1);
       if(mortar)return [196+n-b*40,192+n-b*40,184+n-b*40];const peel=fbm(u*14,v*14)>.68;return peel?[120+n,66+n,52+n]:[168+id*40+n-b*30,34+id*16+n*.5-b*10,30+id*14+n*.5-b*10];},
     (g,S)=>{drips(g,S,26,'rgba(20,18,14,.35)',0,.7);}),{shininess:8},1.5),
   wallOld:P(mk(256,(x,y,u,v)=>{const b=fbm(u*3,v*3),p=fbm(u*7+3,v*7+9),n=(R()-.5)*14,fy=1-v;let c=[150-b*36,146-b*36,128-b*38];if(p>.62)c=[196-b*20,192-b*20,176-b*20];
       const wet=.3+fbm(u*5,7)*.25-fy;if(wet>0){const k=Math.min(.7,wet*2.5);c=[c[0]*(1-k)+40*k,c[1]*(1-k)+52*k,c[2]*(1-k)+30*k];}return [c[0]+n,c[1]+n,c[2]+n];},
     (g,S)=>{drips(g,S,40,'rgba(24,22,16,.35)',0,.5);for(let i=0;i<5;i++)crack(g,R()*S,R()*S*.7,40+R()*100,PI/2+(R()-.5),1,'rgba(30,26,20,.6)');}),{},3),
   yellow:P(mk(128,(x,y,u,v)=>{const b=fbm(u*4,v*4),n=(R()-.5)*14,p=fbm(u*10,v*10)>.7;return p?[150+n,140+n,120+n]:[204-b*46+n,170-b*46+n,62-b*20+n];},(g,S)=>drips(g,S,14,'rgba(40,30,14,.4)',0,.6)),{},1.5),
   panel:P(mk(256,(x,y,u,v)=>{const b=fbm(u*3,v*3),n=(R()-.5)*8;const c=150-b*18+n;return [c,c+4,c+10];},
     (g,S)=>{g.strokeStyle='rgba(60,64,72,.6)';g.lineWidth=1;[0,S/2].forEach(q=>{g.beginPath();g.moveTo(q+.5,0);g.lineTo(q+.5,S);g.stroke();});g.beginPath();g.moveTo(0,S*.38);g.lineTo(S,S*.38);g.stroke();
       for(let i=0;i<90;i++){g.strokeStyle=`rgba(40,40,44,${.1+R()*.25})`;g.lineWidth=1+R()*2;const x=R()*S,y=R()*S;g.beginPath();g.moveTo(x,y);g.lineTo(x+(R()-.5)*26,y+(R()-.5)*14);g.stroke();}}),{shininess:16},2.4),
   floorIn:P(mk(256,(x,y,u,v)=>{const b=fbm(u*4,v*4,5),n=(R()-.5)*12;const c=168-b*40+n;return [c,c,c-4];},
     (g,S)=>{for(let i=0;i<7;i++)crack(g,R()*S,R()*S,60+R()*160,R()*6.3,1,'rgba(40,38,34,.6)');for(let i=0;i<30;i++){g.fillStyle=`rgba(${R()*200|0},${R()*160|0},${R()*140|0},.35)`;g.beginPath();g.arc(R()*S,R()*S,1+R()*5,0,7);g.fill();}}),{shininess:22,specular:0x222222},4),
   woodD:P(mk(128,(x,y,u,v)=>{const gr=fbm(u*2,v*40,3),n=(R()-.5)*10;return [74+gr*40+n,44+gr*26+n,30+gr*16+n];}),{shininess:18},1),
   woodL:P(mk(128,(x,y,u,v)=>{const gr=fbm(u*2+5,v*40,3),n=(R()-.5)*10;return [180+gr*40+n,140+gr*36+n,84+gr*26+n];}),{shininess:18},1),
   steel:ph(0xa8acb0,{shininess:80,specular:0x999999}),dark:ph(0x161618),white:ph(0xd8d6cc,{shininess:30}),truss:ph(0x7a3a26,{shininess:10}),
   bars:(()=>{const t=tex((g,n)=>{g.clearRect(0,0,n,n);g.fillStyle='#5a3220';for(let x=2;x<n;x+=7)g.fillRect(x,0,2,n);g.fillRect(0,0,n,4);g.fillRect(0,n-4,n,4);g.fillRect(0,n*.45,n,3);});return new THREE.MeshPhongMaterial({map:t,transparent:true,alphaTest:.4,side:THREE.DoubleSide});})(),
   cage:(()=>{const t=tex((g,n)=>{g.clearRect(0,0,n,n);g.fillStyle='#2a2a2c';for(let x=0;x<n;x+=6){g.fillRect(x,0,1,n);g.fillRect(0,x,n,1);}});return new THREE.MeshPhongMaterial({map:t,transparent:true,alphaTest:.4,side:THREE.DoubleSide});})()
  };
  const grassM=[0,1].map(i=>new THREE.MeshLambertMaterial({map:tex((g,n)=>{g.clearRect(0,0,n,n);for(let k=0;k<26;k++){const x=n/2+(R()-.5)*n*.7,h=n*(.4+R()*.55),bd=(R()-.5)*n*.35;g.strokeStyle=[['#4a7a2a','#6a9a3a'],['#7a8a3a','#3a6a2a']][i][k%2];g.lineWidth=1+R()*1.5;g.beginPath();g.moveTo(x,n);g.quadraticCurveTo(x+bd*.3,n-h*.6,x+bd,n-h);g.stroke();}},64),transparent:true,alphaTest:.45,side:THREE.DoubleSide}));
  const tuft=(g,x,y,z,s)=>{const m=grassM[R()*2|0],a=R()*3;for(let k=0;k<2;k++){const p=new THREE.Mesh(new THREE.PlaneGeometry(s,s),m);p.position.set(x,y+s*.45,z);p.rotation.y=a+k*PI/2;g.add(p);}};
  const pail=(hex,rb,rt,h,lvl,wm)=>{const g=new THREE.Group(),m=Pr.MAT.plastic(hex);m.side=THREE.DoubleSide;g.add(new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(rb,0),V(rt,h),V(rt+.012,h+.006),V(rt+.012,h-.012)],18),m));
    if(lvl){const w=new THREE.Mesh(new THREE.CircleGeometry(rb+(rt-rb)*lvl-.004,16),wm||M.water);w.rotation.x=-PI/2;w.position.y=h*lvl;g.add(w);}return g;};
  const light=(c,i,d,x,y,z)=>{const l=new THREE.PointLight(c,i,d,1.6);l.position.set(x,y,z);scene.add(l);return l;};
  const G2=()=>new THREE.Group();
  const put=(g,x,y,z,ry)=>{g.position.set(x,y||0,z);if(ry)g.rotation.y=ry;scene.add(g);return g;};

  /* ---------- 地面與外圍 ---------- */
  box(90,.2,70,0,-.32,-8,M.dark,nb);
  box(50,.2,14,0,-.1,5,MT.ground,nb);                 // 巷道 z -2..12
  box(18,.2,18,0,-.1,-11,MT.floorIn,nb);              // 工作室
  box(18,.2,10,0,-.1,-25,MT.ground,nb);               // 後棚
  box(1.9,.2,18,10.1,-.1,-11,MT.dirt,nb);             // 防火巷
  box(10,.2,12,-16,-.1,-8,MT.ground,nb);              // 空屋
  wZ(12,-25,25,0,7,M.plaster);box(.3,7,14,-25,3.5,5,M.old);box(.3,7,14,25,3.5,5,M.old);
  [[-14,4.6],[2,5.2],[15,4.2]].forEach(w=>mesh(new THREE.BoxGeometry(1.3,1.1,.06),new THREE.MeshBasicMaterial({color:0xc9a25a}),w[0],w[1],11.8));
  {mesh(new THREE.BoxGeometry(.12,5,.12),C(0x2a2a2a),9.2,2.5,9.5);const l=light(0xff9a45,1.1,17,9,4.6,9);mesh(new THREE.BoxGeometry(.5,.12,.2),new THREE.MeshBasicMaterial({color:0xffb060}),9.2,4.9,9.2);}
  wZ(-2,11.35,25,0,6,M.plaster);wX(11.2,-20.3,-2,0,6,MT.wallOld);       // 東鄰
  wZ(-2,-25,-21.15,0,4,MT.brickRed);                                    // 西側
  box(1.7,6.4,.3,-10,3.2,-2,MT.wallOld);
  scooter(-1.9,8.2,.5);
  {const s=person(-1.0,0,7.2,1,LOOKS.S,'S','交談：學長');interact(s,{type:'brief',key:'S',label:'交談：學長'});}

  /* ---------- 工寮外觀 ---------- */
  const H=6.4;
  wZ(-2,-9,9,0,H,MT.corr,[[-1.15,1.15]],2.7);wX(-9,-30,-2.15,0,H,MT.corr);wX(9,-30,-2.15,0,H,MT.corr);
  box(18.6,.25,18.3,0,H+.12,-11,MT.corrRust,nb);
  // 捲門箱、遮雨棚、鐵窗
  box(2.9,.5,.5,0,2.95,-1.7,MT.steel,nb);
  [[0,3.5,4.2],[-5.6,3.1,3.6],[5.8,3.1,4.4]].forEach(a=>{const m=box(a[2],.06,1.5,a[0],a[1],-1.1,MT.corrRust,nb);m.rotation.x=.22;[-1,1].forEach(s=>{const r=box(.04,.04,1.3,a[0]+s*a[2]*.45,a[1]-.32,-1.2,MT.dark,nb);r.rotation.x=-.5;});});
  [[-5.6,1.6],[5.8,1.6],[-5,4.9],[1,4.9],[6,4.9]].forEach(w=>{box(1.9,1.3,.08,w[0],w[1],-1.83,ph(0x23282c,{shininess:60}),nb);const b=mesh(new THREE.PlaneGeometry(1.9,1.3),MT.bars,w[0],w[1],-1.76);b.material=MT.bars;});
  box(7.85,.6,.06,-5.075,.3,-1.82,ph(0xc8c6bc),nb);box(7.85,.6,.06,5.075,.3,-1.82,ph(0xc8c6bc),nb);
  [-8.6,3.2,8.6].forEach(x=>mesh(new THREE.CylinderGeometry(.05,.05,H,8),MT.white,x,H/2,-1.78));
  {const l=light(0xa8b0c8,.5,10,0,2.4,1.5);}
  // 門口的鐵雕
  {const g=G2(),bowl=new THREE.Mesh(new THREE.SphereGeometry(1.5,18,8,0,PI*2,PI*.66,PI*.34),MT.rust);bowl.material=MT.rust.clone();bowl.material.side=THREE.DoubleSide;bowl.position.y=1.62;g.add(bowl);
   const w=new THREE.Mesh(new THREE.CircleGeometry(.62,16),new THREE.MeshPhongMaterial({color:0x4a2a16,shininess:90,specular:0x886644,transparent:true,opacity:.85}));w.rotation.x=-PI/2;w.position.y=.25;g.add(w);
   const base=new THREE.Mesh(new THREE.BoxGeometry(1.6,.08,1.2),MT.rust);base.position.y=.04;g.add(base);g.rotation.z=.06;
   addItem('W2',g,-4.6,0,-.2,0);col.push({x0:-5.7,x1:-3.5,z0:-1.2,z1:.8,y0:0,y1:1});}
  {const g=G2();const shard=(x,z,h,w,lean)=>{const m=new THREE.Mesh(new THREE.ConeGeometry(w,h,5,4),MT.rust);const p=m.geometry.attributes.position;for(let i=0;i<p.count;i++)p.setX(i,p.getX(i)*(1+Math.sin(p.getY(i)*5+i)*.25));m.geometry.computeVertexNormals();m.scale.z=.35;m.position.set(x,h/2,z);m.rotation.z=lean;m.rotation.y=R();g.add(m);};
   shard(-7.6,-1.2,3.1,.42,.08);shard(-7.0,-1.0,2.6,.3,-.1);shard(2.0,-1.2,3.0,.34,.05);shard(2.7,-1.1,2.2,.26,-.12);
   const cres=new THREE.Mesh(new THREE.TorusGeometry(1.25,.3,5,14,PI*1.15),MT.rust);cres.scale.z=.3;cres.position.set(-2.6,1.2,-1.35);cres.rotation.z=.9;g.add(cres);
   [[-7.3,-1.1],[2.3,-1.15]].forEach(q=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.5,.55,.12,12),MT.rust);b.position.set(q[0],.06,q[1]);g.add(b);});
   scene.add(Pr.flatten(g));col.push({x0:-8.1,x1:-6.5,z0:-1.7,z1:-.5,y0:0,y1:2});col.push({x0:1.6,x1:3.1,z0:-1.7,z1:-.6,y0:0,y1:2});col.push({x0:-3.6,x1:-1.5,z0:-1.8,z1:-1,y0:0,y1:2});
   deco(g,'查看：鐵雕','用鐵板燒焊出來的作品，表面全是鏽。這幾件都是直立的，留不住水。');}
  // 木棧平台、塑膠椅、桌子
  {const g=G2();const dk=new THREE.Mesh(new THREE.BoxGeometry(4.6,.22,2.2),MT.woodD);dk.position.set(0,.11,0);g.add(dk);
   const chair=(x,z,ry)=>{const c=G2();[[.2,.2],[-.2,.2],[.2,-.2],[-.2,-.2]].forEach(q=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.04,.42,.04),MT.white);l.position.set(q[0],.21,q[1]);c.add(l);});
     const s=new THREE.Mesh(new THREE.BoxGeometry(.48,.04,.46),MT.white);s.position.y=.43;c.add(s);const b=new THREE.Mesh(new THREE.BoxGeometry(.48,.42,.04),MT.white);b.position.set(0,.66,-.22);b.rotation.x=-.12;c.add(b);c.position.set(x,.22,z);c.rotation.y=ry;g.add(c);};
   chair(-1.4,-.3,.4);chair(.9,-.5,-.2);chair(1.7,.3,-1.2);const tb=new THREE.Mesh(new THREE.BoxGeometry(1.2,.05,.7),MT.white);tb.position.set(.1,.95,.2);g.add(tb);[[-.5,-.25],[.5,-.25],[-.5,.25],[.5,.25]].forEach(q=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.04,.72,.04),MT.steel);l.position.set(.1+q[0],.58,.2+q[1]);g.add(l);});
   put(g,6.2,0,-.6);scene.remove(g);scene.add(Pr.flatten(g));col.push({x0:3.9,x1:8.5,z0:-1.7,z1:.5,y0:0,y1:1});}
  // 休旅車、腳踏車、推車、梯子
  {const g=K.carModel(0xb8ae94,{two:true,rails:true,plate:'BKR-5170'});g.position.set(7.4,0,4.2);g.rotation.y=-.25;scene.add(g);col.push({x0:6.2,x1:8.6,z0:2,z1:6.4,y0:0,y1:1.9});deco(g,'查看：休旅車','車停在這裡很久了，輪胎旁邊長了草。車身沒有會積水的地方。');}
  {const g=G2();const bike=(x,z,ry,c)=>{const b=G2(),m=ph(c,{shininess:40});[-.5,.5].forEach(s=>{const w=new THREE.Mesh(new THREE.TorusGeometry(.32,.02,5,16),MT.dark);w.position.set(s,.34,0);b.add(w);});
     [[[-.5,.34,0],[-.1,.75,0]],[[-.1,.75,0],[.4,.8,0]],[[.4,.8,0],[.5,.34,0]],[[-.1,.75,0],[0,.34,0]],[[0,.34,0],[.4,.8,0]],[[.4,.8,0],[.38,1.0,0]],[[-.1,.75,0],[-.14,.9,0]]].forEach(q=>{const A=new THREE.Vector3(...q[0]),B=new THREE.Vector3(...q[1]),t=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,A.distanceTo(B),5),m);t.position.copy(A).add(B).multiplyScalar(.5);t.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),B.clone().sub(A).normalize());b.add(t);});
     const sd=new THREE.Mesh(new THREE.BoxGeometry(.22,.05,.12),ph(0x6a4a2a));sd.position.set(-.14,.92,0);b.add(sd);const hb=new THREE.Mesh(new THREE.BoxGeometry(.04,.04,.46),MT.steel);hb.position.set(.38,1.0,0);b.add(hb);b.position.set(x,0,z);b.rotation.y=ry;b.rotation.z=.12;g.add(b);};
   bike(3.3,.9,1.3,0x9ad0c0);bike(3.0,1.5,1.1,0x8a8a90);scene.add(Pr.flatten(g));col.push({x0:2.7,x1:3.7,z0:.3,z1:2.1,y0:0,y1:1});}
  {const g=G2(),gm=ph(0x2f7a3a);[[-.2],[.2]].forEach(q=>{const t=new THREE.Mesh(new THREE.BoxGeometry(.03,1.3,.03),gm);t.position.set(q[0],.75,0);g.add(t);});[.4,.8,1.2].forEach(y=>{const t=new THREE.Mesh(new THREE.BoxGeometry(.42,.03,.03),gm);t.position.set(0,y,0);g.add(t);});
   [-.26,.26].forEach(x=>{const w=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.06,10),MT.dark);w.rotation.z=PI/2;w.position.set(x,.13,.06);g.add(w);});const pl=new THREE.Mesh(new THREE.BoxGeometry(.44,.02,.3),gm);pl.position.set(0,.06,.18);g.add(pl);
   g.rotation.x=-.25;put(g,-8.3,0,-.9,.3);}

  /* ---------- 工作室內部 ---------- */
  // 鋼架、吊燈
  {const g=G2();for(let z=-4;z>=-18;z-=3.5){const b=new THREE.Mesh(new THREE.BoxGeometry(17.6,.16,.12),MT.truss);b.position.set(0,5.2,z);g.add(b);const b2=b.clone();b2.position.y=5.9;g.add(b2);for(let x=-8;x<8;x+=1.6){const d=new THREE.Mesh(new THREE.BoxGeometry(1.75,.05,.05),MT.truss);d.position.set(x+.8,5.55,z);d.rotation.z=(Math.round(x/1.6)%2?.42:-.42);g.add(d);}}
   [-6,-1].forEach(x=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.14,.2,16),ph(0xc86a2a));b.position.set(x,4.6,-11);g.add(b);});
   [[-4,-6],[-4,-14]].forEach(q=>{const s=new THREE.Mesh(new THREE.ConeGeometry(.28,.3,10,1,true),ph(0x2a3a34,{side:THREE.DoubleSide}));s.position.set(q[0],4.3,q[1]);g.add(s);const w=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,1.2,4),MT.dark);w.position.set(q[0],5,q[1]);g.add(w);});
   scene.add(Pr.flatten(g));light(0xc8b890,.55,11,-4,3.9,-6);const l2=light(0xc8b890,.4,10,-4,3.9,-14);anim.push(t=>{l2.intensity=(Math.sin(t*23)+Math.sin(t*3.7))>1.2?.05:.4;});}
  // 灰色隔間牆、小房門、廁所
  wX(3,-16,-2.15,0,3.3,MT.panel,[[-11.68,-10.78]],2.05);wZ(-16,3.15,8.85,0,3.3,MT.panel);
  box(.06,2,.85,2.82,1,-6.2,MT.woodL,nb);mesh(new THREE.SphereGeometry(.03,6,5),MT.steel,2.77,1,-5.9);
  {const fr=ph(0x8a6a44);box(.12,2.1,.06,2.9,1.05,-11.71,fr,nb);box(.12,2.1,.06,2.9,1.05,-10.75,fr,nb);box(.12,.08,1.02,2.9,2.08,-11.23,fr,nb);
   const dr=G2();const leaf=new THREE.Mesh(new THREE.BoxGeometry(.85,2,.04),MT.woodL);leaf.position.set(.43,1,0);dr.add(leaf);const kn=new THREE.Mesh(new THREE.SphereGeometry(.03,6,5),MT.steel);kn.position.set(.78,1,.04);dr.add(kn);
   put(dr,3.05,0,-11.66,-1.25);
   const sl=ph(0x3a6aa8);[[-0.12],[0.12]].forEach(q=>{const s=new THREE.Mesh(new THREE.BoxGeometry(.26,.03,.11),sl);s.position.set(2.45,.015,-11.2+q[0]);s.rotation.y=.2+q[0];scene.add(s);});}
  {const tw=P(tex((g,n)=>{g.fillStyle='#c8c8c0';g.fillRect(0,0,n,n);for(let y=0;y<n;y+=8)for(let x=0;x<n;x+=8){const k=200+(R()*18|0);g.fillStyle=`rgb(${k},${k},${k-6})`;g.fillRect(x+1,y+1,7,7);}g.fillStyle='rgba(70,60,40,.25)';for(let i=0;i<14;i++)g.fillRect(R()*n,n*.6+R()*n*.4,2+R()*8,2+R()*10);}),{shininess:60,specular:0x444444},.8);
   const tf=P(tex((g,n)=>{g.fillStyle='#6a6a64';g.fillRect(0,0,n,n);for(let y=0;y<n;y+=16)for(let x=0;x<n;x+=16){const k=150+(R()*20|0);g.fillStyle=`rgb(${k},${k-4},${k-12})`;g.fillRect(x+1,y+1,15,15);}g.fillStyle='rgba(30,26,20,.3)';for(let i=0;i<10;i++){g.beginPath();g.arc(R()*n,R()*n,2+R()*8,0,7);g.fill();}}),{shininess:40},.8);
   wZ(-9.3,3.15,5.8,0,3.3,tw);wZ(-13.1,3.15,5.8,0,3.3,tw);wX(5.8,-13.1,-9.3,0,3.3,tw);
   box(2.6,.02,3.7,4.5,.012,-11.2,tf,nb);
   const por=ph(0xeceae2,{shininess:90,specular:0x888888});
   const tl=G2();tl.add(new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.12,0),V(.14,.15),V(.2,.36),V(.21,.4),V(.16,.4),V(.12,.3),V(.001,.28)],18),por));tl.children[0].scale.z=1.25;
   const ws=new THREE.Mesh(new THREE.CircleGeometry(.11,12),new THREE.MeshPhongMaterial({color:0xb0c4c0,shininess:90,transparent:true,opacity:.8}));ws.rotation.x=-PI/2;ws.position.y=.31;ws.scale.y=1.3;tl.add(ws);
   const seat=new THREE.Mesh(new THREE.TorusGeometry(.17,.03,6,18),ph(0xf0eee8));seat.rotation.x=PI/2;seat.position.y=.41;seat.scale.y=1.25;tl.add(seat);
   const tank=new THREE.Mesh(new THREE.BoxGeometry(.42,.38,.18),por);tank.position.set(0,.62,-.3);tl.add(tank);const btn=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.01,10),MT.steel);btn.position.set(0,.815,-.3);tl.add(btn);
   tl.rotation.y=-PI/2;put(tl,5.3,0,-12.2);col.push({x0:4.8,x1:5.8,z0:-12.6,z1:-11.8,y0:0,y1:.9});
   deco(tl,'查看：馬桶','坐式馬桶每天都在用，存水彎的水會一直更換。很少使用的馬桶，水封裡的水放久了也可能長孑孓。');
   const sk=G2();const bs=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.08,0),V(.2,.12),V(.22,.14),V(.2,.14)],16),por);bs.material=por.clone();bs.material.side=THREE.DoubleSide;bs.scale.z=.7;bs.position.y=.72;sk.add(bs);
   const ped=new THREE.Mesh(new THREE.CylinderGeometry(.07,.1,.72,10),por);ped.position.y=.36;sk.add(ped);const tap=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.14,6),MT.steel);tap.rotation.x=.9;tap.position.set(0,.92,-.12);sk.add(tap);
   const mir=new THREE.Mesh(new THREE.PlaneGeometry(.4,.55),new THREE.MeshPhongMaterial({color:0x8a9aa0,shininess:120,specular:0xffffff}));mir.position.set(0,1.5,-.15);sk.add(mir);const mf=new THREE.Mesh(new THREE.BoxGeometry(.44,.59,.01),ph(0x8a6a44));mf.position.set(0,1.5,-.16);sk.add(mf);
   const cup=new THREE.Mesh(new THREE.CylinderGeometry(.03,.025,.09,8),ph(0x5aa0d0));cup.position.set(.14,.89,-.05);sk.add(cup);[0,1].forEach(i=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.01,.16,.015),ph([0xd84a3a,0x3a8ad8][i]));b.position.set(.13+i*.015,.97,-.05);b.rotation.z=.15-i*.3;sk.add(b);});
   sk.rotation.y=-PI/2;put(sk,5.55,0,-10.1);col.push({x0:5.2,x1:5.8,z0:-10.4,z1:-9.8,y0:0,y1:1});
   const rl=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,.1,10),ph(0xf4f2ec));rl.rotation.x=PI/2;rl.position.set(5.68,.75,-11.6);scene.add(rl);
   const tc=G2();tc.add(new THREE.Mesh(new THREE.CylinderGeometry(.13,.11,.3,10,1,true),ph(0x9ab0c8,{side:THREE.DoubleSide})));tc.children[0].position.y=.15;const bg=new THREE.Mesh(new THREE.CylinderGeometry(.14,.13,.06,10,1,true),new THREE.MeshPhongMaterial({color:0xe8e8e0,transparent:true,opacity:.7,side:THREE.DoubleSide}));bg.position.y=.29;tc.add(bg);put(tc,3.5,0,-12.8);
   const mop=G2();const mh=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,1.3,5),MT.woodL);mh.position.y=.75;mop.add(mh);for(let i=0;i<10;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(.02,.22,.02),ph(0xb8b0a0));s.position.set((R()-.5)*.12,.1,(R()-.5)*.12);s.rotation.z=(R()-.5)*.6;mop.add(s);}mop.rotation.z=.15;put(mop,3.4,0,-9.55);
   const lb=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),new THREE.MeshBasicMaterial({color:0xfff2c8}));lb.position.set(4.5,3.0,-11.2);scene.add(lb);const tlL=light(0xf0e0b0,.6,5,4.5,2.8,-11.2);anim.push(t=>{tlL.intensity=(Math.sin(t*17)+Math.sin(t*2.9))>1.4?.08:.6;});
   const tb=G2();const b=pail(0xc83a2a,.19,.24,.42,.8);tb.add(b);const sc=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.07,0),V(.09,.08),V(.095,.09)],12),ph(0x3a8ad8,{side:THREE.DoubleSide}));sc.position.set(.05,.32,.05);sc.rotation.z=.4;tb.add(sc);
   addItem('T1',tb,3.6,0,-10.0,.25);}
  {const g=G2(),ct=P(tex((g,n)=>{g.fillStyle='#a8865a';g.fillRect(0,0,n,n);for(let i=0;i<400;i++){g.fillStyle=R()<.5?'rgba(80,60,30,.25)':'rgba(220,190,140,.2)';g.fillRect(R()*n,R()*n,1,1);}g.fillStyle='rgba(200,180,140,.7)';g.fillRect(0,n*.45,n,n*.1);g.fillStyle='rgba(40,30,20,.6)';g.font='bold 9px sans-serif';g.fillText('易碎',4,14);}),{},1);
   for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.6+R()*.3,.35+R()*.2,.45+R()*.2),ct);b.position.set(3.6+R()*4.6,3.48+b.geometry.parameters.height/2,-3.5-R()*11);b.rotation.y=R()*.6;g.add(b);}scene.add(Pr.flatten(g));}
  // 沿牆堆疊的木箱和收藏
  {const g=G2();let z=-3.4;const tops=[];for(let i=0;i<9;i++){const w=.7+R()*.5,d=.55+R()*.2;let y=0;if(z>-12.15&&z-w<-10.25)z=-12.15;col.push({x0:2.82-d-.1,x1:2.85,z0:z-w,z1:z,y0:0,y1:1.4});const n=1+(R()*3|0);for(let k=0;k<n;k++){const h=.32+R()*.3,b=new THREE.Mesh(new THREE.BoxGeometry(d,h,w),R()<.5?MT.woodD:MT.woodL);b.position.set(2.82-d/2-.08-(k?R()*.06:0),y+h/2,z-w/2);g.add(b);
       if(R()<.6){const hd=new THREE.Mesh(new THREE.BoxGeometry(.02,.03,.12),MT.dark);hd.position.set(2.82-d-.09,y+h*.5,z-w/2);g.add(hd);}y+=h;}tops.push([2.82-d/2-.08,y,z-w/2]);z-=w+.04;}
   for(let i=0;i<5;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.5+R()*.3,.3+R()*.2,.6+R()*.4),R()<.5?MT.woodD:MT.woodL);const bz=-4-i*2.1+(i===3?.8:0)+(i===4?-1:0);b.position.set(1.5+R()*.3,b.geometry.parameters.height/2,bz);col.push({x0:1.2,x1:2.1,z0:bz-.5,z1:bz+.5,y0:0,y1:.6});b.rotation.y=(R()-.5)*.4;g.add(b);}
   tops.forEach((t,i)=>{if(i===4)return;if(i%3===0){const f=new THREE.Mesh(new THREE.BoxGeometry(.04,.5,.6),MT.dark);f.position.set(t[0]+.2,t[1]+.25,t[2]);f.rotation.z=-.15;g.add(f);const pic=new THREE.Mesh(new THREE.PlaneGeometry(.44,.34),ph(0xd8d4c8));pic.rotation.y=-PI/2;pic.position.set(t[0]+.17,t[1]+.25,t[2]);pic.rotation.z=.15;g.add(pic);}
     else if(i%3===1){[0xa83a2a,0x2a4a7a,0x5a6a3a,0xd8c8a0].forEach((c,k)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.2,.035,.28),ph(c));b.position.set(t[0],t[1]+.018+k*.036,t[2]);b.rotation.y=(R()-.5)*.3;g.add(b);});}
     else{const tp=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.06,0),V(.085,.05),V(.08,.1),V(.045,.13),V(.05,.14),V(.001,.15)],14),ph(0x3a6a5a,{shininess:70}));tp.position.set(t[0],t[1],t[2]);g.add(tp);const sp=new THREE.Mesh(new THREE.CylinderGeometry(.01,.016,.1,6),ph(0x3a6a5a));sp.rotation.x=.9;sp.position.set(t[0],t[1]+.08,t[2]+.1);g.add(sp);}});
   scene.add(Pr.flatten(g));
   const t=tops[4],jg=G2(),clay=ph(0x5a4234,{shininess:30});[[0,0,1],[.05,-.3,.75]].forEach(q=>{const j=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.07,0),V(.15,.1),V(.16,.2),V(.1,.3),V(.06,.34),V(.075,.37),V(.055,.37),V(.05,.33)],14),clay);j.scale.setScalar(q[2]);j.position.set(q[0],0,q[1]);jg.add(j);});
   addItem('W4',jg,t[0],t[1],t[2],0);}
  // 靠牆的畫布、畫架、洗筆桶
  {const g=G2();[[-8.55,-7.2,2.2,1.6,.2],[-8.5,-7.8,1.8,1.4,.16],[-8.45,-9.6,2.4,1.9,.22],[-8.5,-15,1.5,1.2,.18]].forEach((q,i)=>{const c=new THREE.Mesh(new THREE.BoxGeometry(.05,q[3],q[2]),i%2?ph(0xd8d2c0):MT.woodL);c.position.set(q[0]+q[4]*q[3]*.5,q[3]/2,q[1]);c.rotation.z=-q[4];g.add(c);});
   const ez=G2();[[-.3,0,.1],[.3,0,.1],[0,-.5,-.14]].forEach(q=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.04,1.9,.04),MT.woodL);l.position.set(q[0],.95,q[1]);l.rotation.x=q[2];ez.add(l);});
   const cv=new THREE.Mesh(new THREE.BoxGeometry(.9,1.1,.03),new THREE.MeshPhongMaterial({map:tex((g,n)=>{g.fillStyle='#2a2622';g.fillRect(0,0,n,n);for(let i=0;i<30;i++){g.fillStyle=['#6a1a14','#1a1a1c','#8a7a5a','#3a2a4a'][R()*4|0];g.fillRect(R()*n,R()*n,R()*30,R()*40);}g.fillStyle='#0a0a0a';g.beginPath();g.ellipse(n*.5,n*.4,n*.1,n*.14,0,0,7);g.fill();g.fillRect(n*.42,n*.5,n*.16,n*.4);})}));cv.position.set(0,1.25,.08);cv.rotation.x=-.1;ez.add(cv);
   ez.position.set(-6.6,0,-12);ez.rotation.y=.9;g.add(ez);scene.add(g);col.push({x0:-8.85,x1:-8.1,z0:-11,z1:-6,y0:0,y1:2});col.push({x0:-7,x1:-6.2,z0:-12.4,z1:-11.6,y0:0,y1:1.8});
   const pb=Pr.C.paintCan({water:new THREE.MeshPhongMaterial({color:0x5a4a6a,shininess:60}),level:.6});const br=G2();br.add(pb);[0,1,2].forEach(i=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.42,5),MT.woodL);b.position.set(-.05+i*.05,.3,.02*i);b.rotation.z=.25-i*.2;br.add(b);});
   addItem('W3',br,-5.9,0,-12.6,.2);}
  // 鷹架、蓋著布的大件作品、保麗龍、椅子
  {const g=G2();[[-.6,-.6],[.6,-.6],[-.6,.6],[.6,.6]].forEach(q=>{const p=new THREE.Mesh(new THREE.BoxGeometry(.05,4.2,.05),MT.white);p.position.set(q[0],2.1,q[1]);g.add(p);});
   [1,2.2,3.4,4.2].forEach(y=>{[[0,-.6,1.2,.04],[0,.6,1.2,.04],[-.6,0,.04,1.2],[.6,0,.04,1.2]].forEach(q=>{const b=new THREE.Mesh(new THREE.BoxGeometry(q[2],.04,q[3]),MT.white);b.position.set(q[0],y,q[1]);g.add(b);});});
   const pf=new THREE.Mesh(new THREE.BoxGeometry(1.2,.04,1.2),MT.woodD);pf.position.y=3.42;g.add(pf);put(g,-5.6,0,-5.2);scene.remove(g);scene.add(Pr.flatten(g));col.push({x0:-6.3,x1:-4.9,z0:-5.9,z1:-4.5,y0:0,y1:4});}
  {const g=G2();const sh=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),new THREE.MeshPhongMaterial({color:0x3a4a5a,shininess:50,flatShading:true}));const p=sh.geometry.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i);p.setXYZ(i,p.getX(i)*(1+Math.sin(i*1.7)*.15)*(y<0?1.15:1),y<-.2?-.2:y*1.5+Math.sin(i)*.06,p.getZ(i)*(1+Math.cos(i*2.3)*.15)*(y<0?1.15:1));}sh.geometry.computeVertexNormals();sh.position.y=.25;sh.scale.set(1.1,1.3,.9);g.add(sh);
   put(g,-2.2,0,-9.5);col.push({x0:-3.3,x1:-1.1,z0:-10.4,z1:-8.6,y0:0,y1:2});deco(g,'查看：蓋著布的作品','用帆布蓋起來的大件作品，看不出底下是什麼形狀。布是乾的。');
   const styro=P(tex((q,n)=>{q.fillStyle='#ecece6';q.fillRect(0,0,n,n);for(let i=0;i<500;i++){q.fillStyle=R()<.5?'rgba(180,180,170,.5)':'rgba(255,255,255,.6)';q.beginPath();q.arc(R()*n,R()*n,1+R()*1.5,0,7);q.fill();}}),{},.6);
   const st=G2();[[-3.6,.4,-15.5,1.2,.8,.7],[-2.6,.3,-16.2,.9,.6,1],[-3.2,1.05,-15.7,.7,.5,.6]].forEach(q=>{const b=new THREE.Mesh(new THREE.BoxGeometry(q[3],q[4],q[5]),styro);b.position.set(q[0],q[1],q[2]);b.rotation.y=R()*.5;st.add(b);});scene.add(st);deco(st,'查看：保麗龍','一疊做作品剩下的保麗龍塊，上面有切割的痕跡。');col.push({x0:-4.3,x1:-2,z0:-16.8,z1:-15,y0:0,y1:1.2});}
  // 飲水機 W1 與旁邊的生活角落（冰箱、小烤箱、木板桌）
  {const ss=ph(0x8a8e90,{shininess:70,specular:0x777777}),blk=ph(0x18181a,{shininess:50,specular:0x333333}),wh=ph(0xe8e6de,{shininess:30});
   const fr=G2();const fb=new THREE.Mesh(new THREE.BoxGeometry(.66,1.75,.62),ss);fb.position.y=.875;fr.add(fb);const gp=new THREE.Mesh(new THREE.BoxGeometry(.67,.01,.63),blk);gp.position.y=1.12;fr.add(gp);
   [[1.4],[.6]].forEach(q=>{const h=new THREE.Mesh(new THREE.BoxGeometry(.02,.25,.03),MT.dark);h.position.set(.3,q[0],.32);fr.add(h);});
   [[.62,1.5,0x2a8ad8],[.62,1.0,0x3aa8c8]].forEach(q=>{const s=new THREE.Mesh(new THREE.PlaneGeometry(.06,.1),ph(q[2]));s.position.set(-.2,q[1],.312);fr.add(s);});
   const ov=G2();const ob=new THREE.Mesh(new THREE.BoxGeometry(.42,.24,.3),ph(0xe8a8a8,{shininess:40}));ob.position.y=.14;ov.add(ob);const gl=new THREE.Mesh(new THREE.PlaneGeometry(.26,.15),blk);gl.position.set(-.04,.14,.151);ov.add(gl);
   const oh=new THREE.Mesh(new THREE.BoxGeometry(.02,.15,.03),MT.steel);oh.position.set(-.2,.14,.17);ov.add(oh);[[.15,.19],[.15,.09]].forEach(q=>{const k=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.02,8),wh);k.rotation.x=PI/2;k.position.set(q[0],q[1],.155);ov.add(k);});
   [[-.17,-.12],[.17,-.12],[-.17,.12],[.17,.12]].forEach(q=>{const f=new THREE.Mesh(new THREE.BoxGeometry(.03,.03,.03),blk);f.position.set(q[0],.015,q[1]);ov.add(f);});
   ov.position.y=1.75;ov.rotation.y=.1;fr.add(ov);fr.rotation.y=PI/2;put(fr,-8.5,0,-2.6);scene.remove(fr);scene.add(Pr.flatten(fr));fr.position.set(-8.5,0,-2.6);fr.rotation.y=PI/2;col.push({x0:-8.85,x1:-8.1,z0:-2.95,z1:-2.25,y0:0,y1:2});
   deco(fr,'查看：冰箱','雙門冰箱，上面放著一台粉紅色的小烤箱。這台是新型的，底下沒有接除霜水的水盤。');
   // 飲水機
   const g=G2();const bd=new THREE.Mesh(new THREE.BoxGeometry(.34,1.05,.36),blk);bd.position.y=.525;g.add(bd);
   const fp=new THREE.Mesh(new THREE.BoxGeometry(.3,.38,.02),ss);fp.position.set(0,.78,.18);g.add(fp);const rec=new THREE.Mesh(new THREE.BoxGeometry(.24,.2,.06),blk);rec.position.set(0,.66,.17);g.add(rec);
   [[-.09,0xff4a2a],[-.03,0xffffff],[.03,0x2a8aff],[.09,0xffffff]].forEach(q=>{const d=new THREE.Mesh(new THREE.BoxGeometry(.035,.02,.01),new THREE.MeshBasicMaterial({color:q[1]}));d.position.set(q[0],1.0,.181);g.add(d);});
   const dr=new THREE.Mesh(new THREE.BoxGeometry(.28,.05,.12),ph(0x2a2a2c,{shininess:60}));dr.position.set(0,.2,.2);g.add(dr);const gr=new THREE.Mesh(new THREE.PlaneGeometry(.24,.09),ph(0x0e0e10));gr.rotation.x=-PI/2;gr.position.set(0,.226,.2);g.add(gr);
   const lw=new THREE.Mesh(new THREE.BoxGeometry(.3,.02,.2),ss);lw.position.set(0,.16,.17);g.add(lw);
   const bo=new THREE.Mesh(new THREE.LatheGeometry([V(.03,-.06),V(.03,0),V(.06,.03),V(.14,.06),V(.145,.12),V(.14,.18),V(.145,.24),V(.14,.3),V(.145,.36),V(.12,.4),V(.06,.43),V(.001,.44)],16),new THREE.MeshPhongMaterial({color:0xc8dcec,transparent:true,opacity:.42,shininess:120,specular:0xffffff,depthWrite:false}));bo.position.y=1.06;g.add(bo);
   const lab=new THREE.Mesh(new THREE.CylinderGeometry(.147,.147,.1,16,1,true),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#d8d4a0';q.fillRect(0,0,n,n);q.fillStyle='#4a7a2a';q.fillRect(0,n*.2,n,n*.6);q.fillStyle='#e8e0c0';q.fillRect(n*.3,n*.35,n*.4,n*.3);}),side:THREE.DoubleSide}));lab.position.y=1.28;g.add(lab);
   const wq=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.2,14),new THREE.MeshPhongMaterial({color:0x9ac0d8,transparent:true,opacity:.3,depthWrite:false}));wq.position.y=1.2;g.add(wq);
   g.rotation.y=PI/2;addItem('W1',g,-8.6,0,-3.3,.25);
   // 電暖器
   const ht=G2();const hp=new THREE.Mesh(new THREE.BoxGeometry(.75,.48,.08),wh);hp.position.y=.34;ht.add(hp);const gri=new THREE.Mesh(new THREE.PlaneGeometry(.6,.1),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#d8d6ce';q.fillRect(0,0,n,n);q.fillStyle='#6a6a68';for(let x=0;x<n;x+=4)q.fillRect(x,0,2,n);})}));gri.position.set(0,.5,.041);ht.add(gri);
   [-.3,.3].forEach(x=>{const f=new THREE.Mesh(new THREE.BoxGeometry(.05,.1,.3),wh);f.position.set(x,.05,0);ht.add(f);});ht.rotation.set(-.08,PI/2+.35,0);put(ht,-8.15,0,-3.75);
   // 木板桌（縫紉機鐵腳）
   const tb=G2();const top=new THREE.Mesh(new THREE.BoxGeometry(.5,.07,1.55),MT.woodL);top.position.y=.88;tb.add(top);const edge=new THREE.Mesh(new THREE.BoxGeometry(.12,.07,1.55),MT.woodD);edge.position.set(.3,.88,0);edge.rotation.x=.04;tb.add(edge);
   const iron=ph(0x1e1e20,{shininess:30});[-.62,.62].forEach(z=>{const l=new THREE.Mesh(new THREE.TorusGeometry(.26,.022,5,14,PI),iron);l.rotation.set(0,PI/2,PI);l.position.set(0,.6,z);tb.add(l);const ft=new THREE.Mesh(new THREE.BoxGeometry(.4,.04,.05),iron);ft.position.set(0,.02,z);tb.add(ft);const st=new THREE.Mesh(new THREE.BoxGeometry(.04,.85,.04),iron);st.position.set(0,.43,z);tb.add(st);});
   const wheel=new THREE.Mesh(new THREE.TorusGeometry(.18,.02,5,16),iron);wheel.rotation.y=PI/2;wheel.position.set(-.05,.4,-.6);tb.add(wheel);
   const pad=new THREE.Mesh(new THREE.BoxGeometry(.42,.01,.5),ph(0xd8c8a0));pad.position.set(0,.92,.35);tb.add(pad);
   // 桌上：橘色籃子疊在白色架上、紙杯、蜂蜜罐、玻璃罐、遙控器、衛生紙
   const rk=new THREE.Mesh(new THREE.BoxGeometry(.3,.22,.4),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.clearRect(0,0,n,n);q.fillStyle='#e8e4dc';q.fillRect(0,0,n,6);q.fillRect(0,n-6,n,6);q.fillRect(0,0,6,n);q.fillRect(n-6,0,6,n);for(let x=10;x<n-6;x+=10)q.fillRect(x,0,3,n);}),transparent:true,alphaTest:.4,side:THREE.DoubleSide}));rk.position.set(-.05,1.03,-.45);tb.add(rk);
   const bk=new THREE.Mesh(new THREE.BoxGeometry(.32,.2,.42),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.clearRect(0,0,n,n);q.fillStyle='#e0702a';q.fillRect(0,0,n,8);q.fillRect(0,n-6,n,6);q.fillRect(0,0,5,n);q.fillRect(n-5,0,5,n);for(let y=12;y<n-6;y+=7)for(let x=8;x<n-6;x+=7)q.fillRect(x,y,4,3);}),transparent:true,alphaTest:.4,side:THREE.DoubleSide}));bk.position.set(-.05,1.25,-.45);tb.add(bk);
   [[0xd8c8a0,.1,.12,-.52],[0xe8e0c8,.08,.15,-.4],[0x8a4a2a,.06,.1,-.32]].forEach(q=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.12,q[2],q[1]),ph(q[0]));b.position.set(-.05,1.22+q[2]/2,q[3]);tb.add(b);});
   const tag=new THREE.Mesh(new THREE.PlaneGeometry(.12,.08),ph(0xf4f2ec,{side:THREE.DoubleSide}));tag.position.set(-.05,1.4,-.38);tb.add(tag);
   for(let i=0;i<6;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.04,.03,.09,10,1,true),ph(0xf0ece4,{side:THREE.DoubleSide}));c.position.set(-.1,.96+i*.018,-.12);tb.add(c);}
   const c2=new THREE.Mesh(new THREE.CylinderGeometry(.04,.03,.09,10,1,true),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#f0ece4';q.fillRect(0,0,n,n);q.fillStyle='#c84a5a';for(let i=0;i<5;i++){q.beginPath();q.arc(R()*n,R()*n,3+R()*4,0,7);q.fill();}}),side:THREE.DoubleSide}));c2.rotation.z=PI/2-.2;c2.position.set(.02,1.03,-.02);tb.add(c2);
   const jar=(x,z,h,r,body,cap)=>{const j=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,12),new THREE.MeshPhongMaterial({color:body,transparent:true,opacity:.85,shininess:90}));j.position.set(x,.92+h/2,z);tb.add(j);const c=new THREE.Mesh(new THREE.CylinderGeometry(r*.85,r*.85,.03,12),ph(cap));c.position.set(x,.935+h,z);tb.add(c);};
   jar(-.1,-.75,.12,.045,0x7a3a10,0xc82a1a);jar(.02,.08,.12,.045,0x5a2a10,0xc82a1a);jar(.1,.2,.14,.06,0x8a7a3a,0x9a8a3a);
   const tote=new THREE.Mesh(new THREE.BoxGeometry(.18,.13,.22),wh);tote.position.set(.05,.99,.15);tb.add(tote);
   const rc=new THREE.Mesh(new THREE.BoxGeometry(.06,.02,.17),ph(0xe8e4d8));rc.position.set(.08,.935,.42);rc.rotation.y=.3;tb.add(rc);const rs=new THREE.Mesh(new THREE.PlaneGeometry(.035,.04),ph(0x8a9a8a));rs.rotation.x=-PI/2;rs.position.set(.08,.946,.39);tb.add(rs);
   const ts=new THREE.Mesh(new THREE.IcosahedronGeometry(.05,0),ph(0xf8f6f0,{flatShading:true}));ts.scale.y=.5;ts.position.set(.1,.94,.55);tb.add(ts);
   // 桌下：保溫瓶、籃子裡的礦泉水、紅色地墊
   const fl=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.26,12),ph(0x9ad06a,{shininess:60}));fl.position.set(-.05,.13,-.35);tb.add(fl);const fc=new THREE.Mesh(new THREE.CylinderGeometry(.062,.062,.06,12),ph(0xe8e8e0));fc.position.set(-.05,.29,-.35);tb.add(fc);
   const bsk=new THREE.Mesh(new THREE.BoxGeometry(.3,.16,.4),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.clearRect(0,0,n,n);q.fillStyle='#e8e8e0';q.fillRect(0,0,n,6);q.fillRect(0,n-5,n,5);q.fillRect(0,0,5,n);q.fillRect(n-5,0,5,n);for(let y=10;y<n-5;y+=8)for(let x=8;x<n-5;x+=8)q.fillRect(x,y,5,4);}),transparent:true,alphaTest:.4,side:THREE.DoubleSide}));bsk.position.set(-.02,.08,.15);tb.add(bsk);
   [[.05,0x2a6ad8],[-.08,0xc8dce8]].forEach(q=>{const w=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.24,10),ph(q[1],{transparent:true,opacity:.75}));w.rotation.x=PI/2-.3;w.position.set(-.02,.14,.15+q[0]);tb.add(w);});
   const mat=new THREE.Mesh(new THREE.CircleGeometry(.35,14),ph(0xa82a2a));mat.rotation.x=-PI/2;mat.position.set(.1,.006,.25);tb.add(mat);
   put(tb,-8.55,0,-4.75);scene.remove(tb);scene.add(Pr.flatten(tb));tb.position.set(-8.55,0,-4.75);col.push({x0:-8.85,x1:-8.2,z0:-5.55,z1:-3.95,y0:0,y1:1.2});
   deco(tb,'查看：木板桌','用舊縫紉機腳架和一塊原木板拼成的桌子。上面放著茶包、紙杯、蜂蜜和冷氣遙控器，是他泡茶吃飯的地方。');
   // 牆上的插座
   [[-3.75,1.25],[-3.75,.5]].forEach(q=>{const o=mesh(new THREE.BoxGeometry(.02,.12,.07),wh,-8.84,q[1],q[0]);mesh(new THREE.BoxGeometry(.02,.03,.04),MT.dark,-8.83,q[1],q[0]);});}
  // 吃飯兼工作的鐵桌、焊接機、生活雜物
  {const g=G2();const t=new THREE.Mesh(new THREE.BoxGeometry(1.8,.06,.8),MT.steel);t.position.y=.85;g.add(t);[[-.8,-.3],[.8,-.3],[-.8,.3],[.8,.3]].forEach(q=>{const l=new THREE.Mesh(new THREE.BoxGeometry(.05,.85,.05),MT.dark);l.position.set(q[0],.42,q[1]);g.add(l);});
   const bowlM=new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#f2f0e8';q.fillRect(0,0,n,n);q.fillStyle='#2a5aa8';q.fillRect(0,4,n,3);q.fillRect(0,n-12,n,2);for(let x=4;x<n;x+=12){q.beginPath();q.arc(x,n/2,3,0,7);q.fill();}}),shininess:80,specular:0x666666,side:THREE.DoubleSide});
   const bowl=(x,z,s)=>{const b=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.035,0),V(.04,.012),V(.07,.045),V(.075,.06)],16),bowlM);b.scale.setScalar(s||1);b.position.set(x,.88,z);g.add(b);const r=new THREE.Mesh(new THREE.CircleGeometry(.055*(s||1),12),ph(0xe8e0c8));r.rotation.x=-PI/2;r.position.set(x,.88+.035*(s||1),z);g.add(r);};
   bowl(-.4,.05);bowl(-.15,.18,.8);
   [[-.52,.2],[-.5,.22]].forEach(q=>{const c=new THREE.Mesh(new THREE.BoxGeometry(.006,.006,.23),ph(0xc8a060));c.position.set(q[0],.885,q[1]);c.rotation.y=.4;g.add(c);});
   const tbx=new THREE.Mesh(new THREE.BoxGeometry(.24,.09,.12),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#f4f0ea';q.fillRect(0,0,n,n);q.fillStyle='#e88aa8';for(let i=0;i<7;i++){q.beginPath();q.arc(R()*n,R()*n,4+R()*5,0,7);q.fill();}q.fillStyle='#6ab06a';for(let i=0;i<5;i++)q.fillRect(R()*n,R()*n,6,3);})}));tbx.position.set(.4,.925,-.2);g.add(tbx);
   const tis=new THREE.Mesh(new THREE.ConeGeometry(.04,.08,4),ph(0xffffff,{flatShading:true}));tis.position.set(.4,1.0,-.2);g.add(tis);
   const mug=new THREE.Mesh(new THREE.CylinderGeometry(.04,.038,.1,12),MT.steel);mug.position.set(.1,.93,.15);g.add(mug);const mh=new THREE.Mesh(new THREE.TorusGeometry(.025,.006,5,10,PI),MT.steel);mh.rotation.z=-PI/2;mh.position.set(.145,.93,.15);g.add(mh);
   const pot=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.06,0),V(.08,.05),V(.075,.1),V(.04,.12),V(.045,.13),V(.001,.14)],14),ph(0x5a3a2a,{shininess:50}));pot.position.set(.35,.88,.18);g.add(pot);const sp=new THREE.Mesh(new THREE.CylinderGeometry(.01,.015,.09,6),ph(0x5a3a2a));sp.rotation.z=-.9;sp.position.set(.44,.95,.18);g.add(sp);
   const np=new THREE.Mesh(new THREE.PlaneGeometry(.38,.28),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#d8d4c4';q.fillRect(0,0,n,n);q.fillStyle='#3a3a3a';q.fillRect(4,4,n-8,8);for(let y=16;y<n-4;y+=4)q.fillRect(4+(y%12?0:20),y,(y%12?n-8:n-28),1.5);q.fillStyle='#6a6a6a';q.fillRect(6,18,18,14);})}));np.rotation.set(-PI/2,0,.2);np.position.set(.6,.881,.12);g.add(np);
   const ash=new THREE.Mesh(new THREE.CylinderGeometry(.06,.05,.03,10),ph(0x7a8a8a,{shininess:60}));ash.position.set(-.7,.895,-.25);g.add(ash);
   const bag=new THREE.Mesh(new THREE.SphereGeometry(.1,7,5),new THREE.MeshPhongMaterial({color:0xe8e8e0,transparent:true,opacity:.75,flatShading:true}));bag.scale.set(1.1,.7,.9);bag.position.set(-.65,.93,.15);g.add(bag);
   put(g,-3.8,0,-3.2);col.push({x0:-4.8,x1:-2.4,z0:-3.7,z1:-2.7,y0:0,y1:1.2});deco(g,'查看：鐵桌','桌上有吃剩的便當、兩個碗、一雙筷子、面紙盒和一份舊報紙。他在這裡吃飯，也在這裡畫草圖。');
   // 紅色塑膠椅凳
   [[-4.3,-2.4],[-3.1,-3.95]].forEach(q=>{const s=G2(),rm=ph(0xc83a2a);const tp=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.03,12),rm);tp.position.y=.45;s.add(tp);const lg=new THREE.Mesh(new THREE.CylinderGeometry(.14,.18,.44,8,1,true),rm.clone());lg.material.side=THREE.DoubleSide;lg.position.y=.22;s.add(lg);put(s,q[0],0,q[1]);});
   // 焊接機和氣瓶（門口內側）
   {const w=G2(),or=ph(0xd8701a,{shininess:40});const bd=new THREE.Mesh(new THREE.BoxGeometry(.5,.36,.28),or);bd.position.y=.18;w.add(bd);const fp=new THREE.Mesh(new THREE.PlaneGeometry(.3,.2),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#2a2a2c';q.fillRect(0,0,n,n);q.fillStyle='#e8e8e0';q.font='bold 13px sans-serif';q.fillText('電焊機',6,18);q.fillStyle='#c8c8c0';q.beginPath();q.arc(20,44,10,0,7);q.fill();q.beginPath();q.arc(44,44,10,0,7);q.fill();q.fillStyle='#d82a1a';q.fillRect(28,30,8,4);})}));fp.position.set(-.14,.2,.141);w.add(fp);
     const hd=new THREE.Mesh(new THREE.TorusGeometry(.12,.015,5,10,PI),MT.dark);hd.position.y=.36;w.add(hd);
     const cb=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-.2,.1,.15),new THREE.Vector3(-.3,0,.5),new THREE.Vector3(.2,0,.8),new THREE.Vector3(.5,.02,.6)]),16,.015,4),MT.dark);w.add(cb);
     const cy=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,1.2,12),ph(0x2a6a3a,{shininess:40}));cy.position.set(.45,.6,-.1);w.add(cy);const cv=new THREE.Mesh(new THREE.CylinderGeometry(.03,.04,.12,8),MT.steel);cv.position.set(.45,1.26,-.1);w.add(cv);
     const mk=new THREE.Mesh(new THREE.BoxGeometry(.26,.3,.14),ph(0x1a1a1c));mk.position.set(-.05,.52,-.05);mk.rotation.x=-.3;w.add(mk);const mg=new THREE.Mesh(new THREE.PlaneGeometry(.12,.05),ph(0x3a5a2a,{shininess:120}));mg.position.set(-.05,.55,.03);mg.rotation.x=-.3;w.add(mg);
     put(w,-1.9,0,-2.7);col.push({x0:-2.25,x1:-1.3,z0:-3,z1:-2.4,y0:0,y1:1.3});deco(w,'查看：電焊機','電焊機和氣瓶，旁邊擱著一頂焊接面罩。地上散著焊渣。');}
   // 電風扇、垃圾桶、掛在牆上的工作服、掃把
   {const f=G2(),m=ph(0xd8d0b8);const p=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,1.1,6),m);p.position.y=.55;f.add(p);const b=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,.04,12),m);b.position.y=.02;f.add(b);
     const cg=new THREE.Mesh(new THREE.TorusGeometry(.26,.012,5,20),m);cg.position.set(0,1.2,.05);f.add(cg);const bl=new THREE.Mesh(new THREE.CircleGeometry(.24,16),new THREE.MeshPhongMaterial({color:0x6a9ac8,transparent:true,opacity:.45,side:THREE.DoubleSide}));bl.position.set(0,1.2,.04);f.add(bl);
     const mo=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.14,10),m);mo.rotation.x=PI/2;mo.position.set(0,1.2,-.06);f.add(mo);put(f,-5.2,0,-2.6,.9);}
   {const tc=G2();tc.add(new THREE.Mesh(new THREE.CylinderGeometry(.16,.14,.42,12,1,true),ph(0x3a6a3a,{side:THREE.DoubleSide})));tc.children[0].position.y=.21;const lb=new THREE.Mesh(new THREE.CylinderGeometry(.17,.16,.08,12,1,true),new THREE.MeshPhongMaterial({color:0x1a1a1a,side:THREE.DoubleSide}));lb.position.y=.41;tc.add(lb);put(tc,-2.3,0,-4.3);}
   {const cl=G2(),jm=ph(0x3a4a6a);const bd=new THREE.Mesh(new THREE.BoxGeometry(.05,.62,.48),jm);bd.position.y=-.32;cl.add(bd);[-1,1].forEach(s=>{const sl=new THREE.Mesh(new THREE.BoxGeometry(.05,.5,.12),jm);sl.position.set(0,-.3,s*.3);sl.rotation.x=s*.12;cl.add(sl);});const hk=new THREE.Mesh(new THREE.TorusGeometry(.04,.006,4,8,PI),MT.steel);hk.position.y=.02;hk.rotation.y=PI/2;cl.add(hk);put(cl,2.83,1.95,-8.6);}
   {const br=G2();const h=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,1.2,5),MT.woodL);h.position.y=.65;br.add(h);const hd=new THREE.Mesh(new THREE.BoxGeometry(.25,.08,.05),ph(0x2a5aa8));hd.position.y=.06;br.add(hd);for(let i=0;i<10;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(.008,.1,.03),ph(0xc8b070));s.position.set(-.11+i*.024,-.03,0);br.add(s);}br.rotation.z=-.12;put(br,2.7,0,-3.15,PI/2);}
   // 牆上的月曆、時鐘
   {const cal=mesh(new THREE.PlaneGeometry(.4,.56),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#f4f0e6';q.fillRect(0,0,n,n);q.fillStyle='#b02a1a';q.fillRect(0,0,n,n*.32);q.fillStyle='#f4f0e6';q.font='bold 14px sans-serif';q.fillText('十一月',12,15);q.fillStyle='#3a3a3a';for(let r=0;r<5;r++)for(let c=0;c<7;c++)q.fillRect(4+c*8.5,26+r*7,4,3);q.fillStyle='#c82a1a';q.fillRect(4,26,4,3);})}),2.84,1.75,-13.2);cal.rotation.y=-PI/2;
    const ck=mesh(new THREE.CircleGeometry(.16,18),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.fillStyle='#f0ece0';q.fillRect(0,0,n,n);q.strokeStyle='#2a2a2a';q.lineWidth=3;q.beginPath();q.arc(n/2,n/2,n/2-3,0,7);q.stroke();for(let i=0;i<12;i++){const a=i/12*6.283;q.fillStyle='#2a2a2a';q.fillRect(n/2+Math.sin(a)*24-1,n/2-Math.cos(a)*24-1,3,3);}q.lineWidth=2.5;q.beginPath();q.moveTo(n/2,n/2);q.lineTo(n/2+12,n/2+6);q.moveTo(n/2,n/2);q.lineTo(n/2-3,n/2-20);q.stroke();})}),2.84,2.55,-9.6);ck.rotation.y=-PI/2;}
  }
  /* ---------- 後棚（廚房） ---------- */
  wZ(-20,-9,9,0,H,MT.corr,[[-4.2,-2.6]],2.5);
  wZ(-30,-9,9,0,4.2,M.brick);
  // 破洞的鐵皮屋頂
  [[-9,9,-30,-27.4],[-9,2.6,-27.4,-25.4],[5.2,9,-27.4,-25.4],[-9,9,-25.4,-23.6],[-9,-3,-23.6,-22],[-.8,9,-23.6,-22],[-9,9,-22,-20]].forEach(q=>box(q[1]-q[0],.08,q[3]-q[2],(q[0]+q[1])/2,3.7,(q[2]+q[3])/2,MT.corrRust,nb));
  [[3.9,-26.4],[-1.9,-22.8]].forEach(q=>{const sky=mesh(new THREE.PlaneGeometry(2.8,2.2),new THREE.MeshBasicMaterial({color:0xc87a4a}),q[0],3.9,q[1]);sky.rotation.x=PI/2;light(0xffa060,.9,7,q[0],3.3,q[1]);});
  {const g=G2();for(let x=-8;x<=8;x+=4)for(const z of[-21,-29]){const p=new THREE.Mesh(new THREE.BoxGeometry(.12,3.7,.12),MT.truss);p.position.set(x,1.85,z);g.add(p);}for(let z=-21;z>=-29;z-=2){const b=new THREE.Mesh(new THREE.BoxGeometry(17.6,.08,.08),MT.truss);b.position.set(0,3.6,z);g.add(b);}scene.add(Pr.flatten(g));}
  // 磚屋立面的鐵窗和門
  [[-6,1.6,2.2,1.4],[2.5,1.6,2,1.4],[6.5,1.2,1.2,2.2]].forEach(q=>{box(q[2],q[3],.06,q[0],q[1],-29.82,MT.dark,nb);mesh(new THREE.PlaneGeometry(q[2],q[3]),MT.bars,q[0],q[1],-29.76);});
  box(.9,2,.08,-2.2,1,-29.82,ph(0x0a0a0c),nb);box(1.1,.12,.2,-2.2,2.06,-29.8,ph(0x8a8a82),nb);
  // 冰箱、洗衣機、瓦斯桶、置物架、電扇、梯子
  {const g=G2(),a=(geo,m,x,y,z)=>{const q=new THREE.Mesh(geo,m);q.position.set(x,y,z);g.add(q);return q;};
   a(new THREE.BoxGeometry(.7,1.7,.65),ph(0xa8d0c8,{shininess:50}),-7.9,.85,-21.2);a(new THREE.BoxGeometry(.72,.02,.02),MT.dark,-7.9,1.15,-20.86);a(new THREE.BoxGeometry(.75,1.5,.65),ph(0xd8d8d0,{shininess:50}),-7.0,.75,-21.3);
   [[-7.8,1.45,0xd83a2a],[-7.95,1.3,0xe8c030],[-7.7,1.3,0xd83a2a]].forEach(q=>a(new THREE.BoxGeometry(.08,.08,.01),ph(q[2]),q[0],q[1],-20.87));
   a(new THREE.BoxGeometry(.65,.9,.6),ph(0xc8c4b8),-6.0,.45,-22.1);
   a(new THREE.CylinderGeometry(.16,.16,.7,12),ph(0x9aa8b8,{shininess:50}),-4.7,.35,-22.3);a(new THREE.SphereGeometry(.16,10,6,0,PI*2,0,PI/2),ph(0x9aa8b8,{shininess:50}),-4.7,.7,-22.3);a(new THREE.CylinderGeometry(.04,.04,.1,6),MT.dark,-4.7,.88,-22.3);
   [0,.4,.8].forEach(y=>a(new THREE.BoxGeometry(1.3,.04,.45),MT.woodD,-3,y+.25,-29.3));[[-3.6],[-2.4]].forEach(q=>a(new THREE.BoxGeometry(.05,1.1,.45),MT.woodD,q[0],.55,-29.3));
   [[-3.3,.33,0x8a8a90],[-2.8,.33,0x3a3a3c],[-3.1,.73,0xb04a2a],[-2.7,1.13,0x8a8a90]].forEach(q=>a(new THREE.CylinderGeometry(.1,.08,.12,10),ph(q[2],{shininess:60}),q[0],q[1],-29.3));
   a(new THREE.CylinderGeometry(.03,.03,1.4,6),MT.dark,7.6,.7,-21.4);a(new THREE.CylinderGeometry(.3,.3,.04,8),MT.dark,7.6,.02,-21.4);const fan=a(new THREE.TorusGeometry(.4,.02,5,18),ph(0xc8b070),7.6,1.5,-21.4);a(new THREE.CircleGeometry(.4,14),new THREE.MeshPhongMaterial({color:0x8a8070,transparent:true,opacity:.35,side:THREE.DoubleSide}),7.6,1.5,-21.4);
   [[-.2],[.2]].forEach(q=>{const l=a(new THREE.BoxGeometry(.05,2.6,.05),MT.woodD,1.2+q[0],1.3,-29.2);l.rotation.x=.2;});for(let i=0;i<6;i++){const s=a(new THREE.BoxGeometry(.4,.03,.05),MT.woodD,1.2,.3+i*.4,-29.42+i*.08);}
   {const cr=a(new THREE.BoxGeometry(.5,.3,.36),new THREE.MeshPhongMaterial({map:tex((q,n)=>{q.clearRect(0,0,n,n);q.fillStyle='#e8b020';q.fillRect(0,0,n,8);q.fillRect(0,n-6,n,6);q.fillRect(0,0,6,n);q.fillRect(n-6,0,6,n);for(let y=12;y<n-6;y+=9)for(let x=10;x<n-6;x+=9)q.fillRect(x,y,4,5);}),transparent:true,alphaTest:.4,side:THREE.DoubleSide}),3.2,.15,-28.6);}a(new THREE.CylinderGeometry(.16,.16,.04,14),ph(0xc8a070),-1,.62,-29.3);
   scene.add(Pr.flatten(g));col.push({x0:-8.3,x1:-5.6,z0:-22.5,z1:-20.8,y0:0,y1:1.8});col.push({x0:-4.95,x1:-4.45,z0:-22.55,z1:-22.05,y0:0,y1:1});col.push({x0:-3.7,x1:-2.3,z0:-29.6,z1:-29,y0:0,y1:1.2});col.push({x0:7.3,x1:7.9,z0:-21.7,z1:-21.1,y0:0,y1:1.6});
   deco(g,'查看：棚子裡的東西','冰箱、洗衣機、瓦斯桶。他平常就在這個棚子底下煮飯。冰箱是新型的，沒有接水盤。');}
  {const g=G2();g.add(Pr.C.basinStack?new THREE.Group():new THREE.Group());const rb=pail(0xc83a3a,.2,.3,.12,0);rb.rotation.x=PI;rb.position.set(-1.8,.13,-26.2);scene.add(rb);deco(rb,'查看：倒扣的臉盆','紅色臉盆是倒扣著放的，不會積水。這是對的放法。');}
  addItem('W5',pail(0x2a5ab8,.17,.21,.36,.72),4.1,0,-26.6,.25);
  {const g=G2();[[0,.3,0,1.2,.6,.9],[.5,.75,.1,.6,.3,.5],[-.5,.7,-.1,.5,.3,.6]].forEach(q=>{const b=new THREE.Mesh(new THREE.BoxGeometry(q[3],q[4],q[5]),MT.woodD);b.position.set(q[0],q[1],q[2]);g.add(b);});
   const geo=new THREE.PlaneGeometry(2,1.6,8,6),p=geo.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),d=Math.hypot(x-.1,y);p.setZ(i,-Math.max(0,.22-d*.4)+Math.sin(x*5)*.03+(Math.abs(x)>.8||Math.abs(y)>.6?-.25:0));}geo.computeVertexNormals();
   const tp=new THREE.Mesh(geo,new THREE.MeshPhongMaterial({color:0x2a5aa0,shininess:50,side:THREE.DoubleSide,flatShading:true}));tp.rotation.x=-PI/2;tp.position.y=1.0;g.add(tp);
   const w=new THREE.Mesh(new THREE.CircleGeometry(.3,14),M.water);w.rotation.x=-PI/2;w.position.set(.1,.86,0);g.add(w);addItem('W6',g,7.2,0,-27.6,0);col.push({x0:6.2,x1:8.2,z0:-28.4,z1:-26.8,y0:0,y1:1.2});}
  {const l=light(0x9a8a70,.35,9,-5,2.8,-25);}

  /* ---------- 防火巷 ---------- */
  box(1.9,6,.3,10.1,3,-20.3,MT.wallOld);
  {const g=G2(),a=(geo,m,x,y,z,rx,ry,rz)=>{const q=new THREE.Mesh(geo,m);q.position.set(x,y,z);q.rotation.set(rx||0,ry||0,rz||0);g.add(q);return q;};
   const pvc=ph(0xb8b8b0,{shininess:30});a(new THREE.CylinderGeometry(.05,.05,5,8),pvc,9.6,.5,-7,PI/2-.12,.05,0);a(new THREE.CylinderGeometry(.07,.07,3.2,8),pvc,9.75,.15,-5.4,PI/2,.1,0);a(new THREE.CylinderGeometry(.04,.04,3,8),pvc,9.5,.9,-9,PI/2-.3,0,0);
   for(let i=0;i<22;i++)a(new THREE.BoxGeometry(.1+R()*.14,.03+R()*.03,.5+R()*1.1),R()<.6?ph(0x2a221c):MT.woodD,9.6+R()*1.1,.04+R()*.22,-6-R()*8,(R()-.5)*.3,R()*3,(R()-.5)*.3);
   a(new THREE.BoxGeometry(.05,1.7,.75),MT.woodD,9.42,.85,-4.2,0,0,-.12);a(new THREE.BoxGeometry(.03,1.5,.6),ph(0x6a6a62),9.47,.8,-4.2,0,0,-.12);
   [[10.3,-8.6,0xd88a8a],[10.5,-8.9,0xd88a8a],[10.1,-9.0,0x9ac0b0]].forEach(q=>a(new THREE.CircleGeometry(.15,10),ph(q[2],{side:THREE.DoubleSide}),q[0],.3,q[1],-1.2,R(),0));
   for(let i=0;i<6;i++)a(new THREE.CylinderGeometry(.035,.035,.22,6),ph([0x5a2a0e,0x1e4a22,0xc8d8e0][i%3],{transparent:true,opacity:.8}),9.5+R()*1.3,.06,-5-R()*10,PI/2,R()*3,0);
   a(new THREE.BoxGeometry(.5,.42,.45),ph(0x6a5a48),9.7,.24,-6.4,0,.3,.05);a(new THREE.PlaneGeometry(.34,.28),ph(0x1a2a2a,{shininess:120,specular:0x666666}),9.7+Math.sin(.3)*.23,.26,-6.4+Math.cos(.3)*.23,0,.3,0);a(new THREE.BoxGeometry(.06,.06,.02),ph(0x2a2a2a),9.85,.12,-6.2,0,.3,0);
   for(let i=0;i<40;i++)tuft(g,9.3+R()*1.6,0,-15-R()*5,.25+R()*.5);for(let i=0;i<16;i++)tuft(g,9.3+R()*1.6,0,-3-R()*12,.12+R()*.2);
   scene.add(Pr.flatten(g));
   const tree=G2();const tk=new THREE.Mesh(new THREE.CylinderGeometry(.03,.05,3.6,6),ph(0x4a3a2a));tk.position.y=1.8;tree.add(tk);for(let i=0;i<14;i++){const lf=new THREE.Mesh(new THREE.PlaneGeometry(.5,.5),Pr.MAT.leaf('hosta'));lf.position.set((R()-.5)*1.1,1.4+R()*2.6,(R()-.5)*1.1);lf.rotation.set(R()*3,R()*3,R()*3);tree.add(lf);}put(tree,10.3,0,-18.6);
   col.push({x0:9.2,x1:9.9,z0:-9.5,z1:-4.5,y0:0,y1:1});col.push({x0:9.2,x1:11.1,z0:-20.2,z1:-17.6,y0:0,y1:2});
   deco(g,'查看：雜物堆','水管、爛掉的木板、舊電扇的葉片、空瓶。很久沒有人整理過了。會裝水的東西要一個一個翻開來看。');}
  {const pc=Pr.C.paintCan({water:M.foul,level:.5}),g=G2();g.add(pc);const lid=new THREE.Mesh(new THREE.CylinderGeometry(.165,.165,.015,14),MT.rust);lid.position.set(.05,.35,0);lid.rotation.z=.25;g.add(lid);addItem('Y1',g,10.55,0,-7.6,.2);}
  {const g=G2();const hc=new THREE.Mesh(new THREE.LatheGeometry([V(.001,.02),V(.07,.02),V(.09,.0),V(.17,.0),V(.2,.03),V(.205,.05)],16),ph(0xb0b4b8,{shininess:90,specular:0x999999,side:THREE.DoubleSide}));g.add(hc);
   const w=new THREE.Mesh(new THREE.RingGeometry(.08,.17,14),M.foul);w.rotation.x=-PI/2;w.position.y=.022;g.add(w);[[.1,.1],[-.12,.05]].forEach(q=>{const lf=new THREE.Mesh(new THREE.PlaneGeometry(.1,.06),ph(0x5a4a2a,{side:THREE.DoubleSide}));lf.rotation.x=-PI/2;lf.position.set(q[0],.03,q[1]);g.add(lf);});
   addItem('Y2',g,10.7,.02,-11.4,0);}
  {const g=G2(),b=pail(0xd0cec4,.15,.18,.32,.3,M.foul);b.position.y=-.14;b.rotation.z=.12;g.add(b);for(let i=0;i<6;i++)tuft(g,(R()-.5)*.6,0,(R()-.5)*.6,.2+R()*.2);addItem('Y3',g,10.2,0,-15.6,0);}
  figure(10.1,0,-17.4);

  /* ---------- 空屋 ---------- */
  const HB=3.4;
  wX(-11,-14.15,-2.15,0,HB,MT.brickRed);wX(-21,-14.15,-2.15,0,HB,MT.brickRed);wZ(-14.3,-21.15,-10.85,0,HB,MT.wallOld);
  wZ(-8,-21,-14,0,HB,MT.brickRed,[[-19.1,-17.9]],2.1);wX(-14,-14.15,-8.15,0,HB,MT.wallOld);box(3,HB,6.3,-12.5,HB/2,-11.15,MT.wallOld);
  // 黃色門框
  [[-19.02],[-17.98]].forEach(q=>box(.16,1.95,.36,q[0],.975,-8,MT.yellow,nb));box(1.2,.15,.36,-18.5,2.025,-8,MT.yellow,nb);
  // 前廊的木條棚頂
  {const g=G2();for(let x=-20.6;x<-11.2;x+=.22){if(R()<.12)continue;const s=new THREE.Mesh(new THREE.BoxGeometry(.16,.03,6),MT.woodD);s.position.set(x,2.95,-5);g.add(s);}[-3,-5,-7].forEach(z=>{const b=new THREE.Mesh(new THREE.BoxGeometry(9.8,.12,.1),MT.woodD);b.position.set(-16,2.85,z);g.add(b);});
   const fall=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,3.4),MT.woodD);fall.position.set(-12.2,2.2,-4.4);fall.rotation.x=.5;g.add(fall);scene.add(Pr.flatten(g));}
  box(7,.1,6.2,-17.5,HB+.05,-11.2,MT.corrRust,nb);
  // 鏽鐵柵欄與半開的鐵門
  [[-21,-17],[-15.4,-11]].forEach(q=>{const w=q[1]-q[0],b=mesh(new THREE.PlaneGeometry(w,2),MT.bars.clone(),(q[0]+q[1])/2,1,-2);b.material.map=MT.bars.map.clone();b.material.map.needsUpdate=true;b.material.map.wrapS=THREE.RepeatWrapping;b.material.map.repeat.set(w/1.2,1);col.push({x0:q[0],x1:q[1],z0:-2.1,z1:-1.9,y0:0,y1:2.2});
    box(.08,2.1,.08,q[0]===-21?-17:-15.4,1.05,-2,MT.rust,nb);});
  const leaf=(x,ry)=>{const g=G2(),b=new THREE.Mesh(new THREE.PlaneGeometry(.8,2),MT.bars);b.position.x=.4*(ry>0?1:-1)*-1;g.add(b);put(g,x,1,-2,ry);return g;};
  const gateL=leaf(-17,-1.15),gateR=leaf(-15.4,1.0);G.gateD=gateL;G.gateD2=gateR;
  col.push({x0:-17,x1:-15.4,z0:-2.2,z1:-1.8,y0:0,y1:2.2,id:'gateD'});
  {const m=mesh(new THREE.BoxGeometry(.3,.4,.2),ph(0x6a7a62),-13.6,2.5,-8.05);mesh(new THREE.CylinderGeometry(.09,.09,.03,10),ph(0xc8c8c0),-13.6,2.5,-7.93).rotation.x=PI/2;}
  // 鐵籠、水管、臉盆
  {const g=G2();[[-13,-7.2],[-15.6,-7.2]].forEach(q=>{[[0,.45,.6,2.2,.9,0],[0,.45,-.6,2.2,.9,0],[1.1,.45,0,1.2,.9,PI/2],[-1.1,.45,0,1.2,.9,PI/2]].forEach(s=>{const p=new THREE.Mesh(new THREE.PlaneGeometry(s[3],s[4]),MT.cage);p.position.set(q[0]+s[0],s[1],q[1]+s[2]);p.rotation.y=s[5];g.add(p);});
     const top=new THREE.Mesh(new THREE.BoxGeometry(2.3,.04,1.3),MT.woodD);top.position.set(q[0],.92,q[1]);g.add(top);});
   const hose=new THREE.Mesh(new THREE.TorusGeometry(.32,.04,6,16),MT.dark);hose.position.set(-14.3,1.5,-7.8);g.add(hose);const hose2=hose.clone();hose2.scale.setScalar(.85);hose2.position.z=-7.74;g.add(hose2);
   for(let i=0;i<4;i++){const b=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.14,0),V(.3,.14)],12),ph(0xc8623a,{side:THREE.DoubleSide}));b.position.set(-13.2+(R()-.5)*.1,.96+i*.05,-7.2);g.add(b);}
   scene.add(g);col.push({x0:-16.8,x1:-11.8,z0:-7.9,z1:-6.5,y0:0,y1:1});deco(g,'查看：鐵籠','餵狗的人放的鐵籠，裡面鋪著舊毯子。籠子上疊著幾個花盆底盤，是乾的。');
   const rb=pail(0xc83a3a,.22,.34,.14,0);rb.rotation.x=PI;rb.position.set(-18.6,.15,-4.6);scene.add(rb);
   const sb=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.2,0),V(.36,.14),V(.37,.15)],16),ph(0xa8acb0,{shininess:90,specular:0x999999,side:THREE.DoubleSide}));sb.rotation.x=PI;sb.position.set(-19.6,.16,-3.6);scene.add(sb);}
  {const g=G2(),b=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.16,0),V(.26,.11),V(.27,.12)],16),ph(0xa8acb0,{shininess:90,specular:0x999999,side:THREE.DoubleSide}));g.add(b);const w=new THREE.Mesh(new THREE.CircleGeometry(.22,14),M.water);w.rotation.x=-PI/2;w.position.y=.08;g.add(w);addItem('D4',g,-17.2,0,-6.6,0);}
  {const g=pail(0x2a4f9a,.3,.34,.9,.14,M.foul);addItem('D5',g,-12.1,0,-3.1,.36);}
  // 房間內
  {const g=G2();const bd=new THREE.Mesh(new THREE.BoxGeometry(1.1,.05,.7),ph(0x3a3a38));bd.position.set(-17.4,.03,-10.6);bd.rotation.y=.2;g.add(bd);for(let i=0;i<24;i++){const r=new THREE.Mesh(new THREE.BoxGeometry(.1+R()*.2,.06,.08+R()*.12),ph(R()<.5?0x7a3a2a:0x8a8a82));r.position.set(-20.5+R()*6,.03,-13.8+R()*1.2);r.rotation.y=R()*3;g.add(r);}
   const hole=new THREE.Mesh(new THREE.PlaneGeometry(.9,.7),new THREE.MeshBasicMaterial({color:0x8a7a9a}));hole.position.set(-15.6,2.2,-14.12);g.add(hole);const tb=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,2),MT.woodD);tb.position.set(-15.4,1.7,-13.5);tb.rotation.x=.7;g.add(tb);scene.add(g);light(0x8a7a9a,.5,6,-15.8,2,-13.2);}
  addItem('D1',pail(0xd8b830,.16,.2,.3,.4),-19.6,0,-10.6,.22);
  {const g=G2(),pot=new THREE.Mesh(new THREE.LatheGeometry([V(.001,0),V(.14,0),V(.3,.2),V(.32,.21),V(.3,.19),V(.14,.03),V(.02,.03)],16),ph(0xb86a4a,{side:THREE.DoubleSide}));g.add(pot);const so=new THREE.Mesh(new THREE.CircleGeometry(.15,10),ph(0x3a2a1e));so.rotation.x=-PI/2;so.position.y=.04;g.add(so);addItem('D2',g,-18.9,0,-11.3,.3);}
  addItem('D3',pail(0x9a5ab8,.15,.19,.28,.5),-17.2,0,-8.9,.2);

  /* ---------- 狗 ---------- */
  const makeDog=(c1,c2)=>{const g=G2(),bk=ph(c1,{flatShading:true}),tn=ph(c2,{flatShading:true});
   const a=(geo,m,x,y,z,p)=>{const q=new THREE.Mesh(geo,m);q.position.set(x,y,z);(p||g).add(q);return q;};
   a(new THREE.BoxGeometry(.26,.26,.62),bk,0,.46,0);a(new THREE.BoxGeometry(.24,.22,.2),bk,0,.5,.3);
   const hd=G2();hd.position.set(0,.62,.42);g.add(hd);const legs=[];a(new THREE.BoxGeometry(.2,.19,.22),bk,0,0,.04,hd);a(new THREE.BoxGeometry(.11,.09,.16),tn,0,-.04,.2,hd);a(new THREE.BoxGeometry(.11,.02,.14),ph(0x8a2a2a),0,-.1,.19,hd);
   [-1,1].forEach(s=>{a(new THREE.BoxGeometry(.05,.1,.04),bk,s*.08,.13,-.02,hd);a(new THREE.BoxGeometry(.025,.025,.01),new THREE.MeshBasicMaterial({color:0xd8c060}),s*.055,.03,.151,hd);});
   [[-.09,.22],[.09,.22],[-.09,-.24],[.09,-.24]].forEach(q=>{const l=a(new THREE.BoxGeometry(.07,.34,.07),q[1]>0?tn:bk,q[0],.17,q[1]);legs.push(l);});g.userData.legs=legs;
   const tl=a(new THREE.BoxGeometry(.04,.04,.26),bk,0,.6,-.4);tl.rotation.x=.7;g.userData.hd=hd;g.userData.tl=tl;return g;};
  {const g=makeDog(0x1a1614,0x6a4a2a),hd=g.userData.hd,tl=g.userData.tl;
   g.position.set(-15.9,0,-5.6);g.rotation.y=0;scene.add(g);g.traverse(o=>{if(o.isMesh)rayList.push(o);});
   const D=G.dog={g,hd,state:'lie',tx:-15.9,tz:-5.6,bark:0};g.scale.y=.6;
   anim.push((t)=>{const p=G.camera.position,dt=.016;
     if(D.state==='lie'){g.scale.y=.6;hd.rotation.x=.2;return;}
     g.scale.y=D.state==='sit'?.85:1;
     const dx=D.tx-g.position.x,dz=D.tz-g.position.z,d=Math.hypot(dx,dz);if(d>.05){const s=Math.min(d,.12);g.position.x+=dx/d*s;g.position.z+=dz/d*s;}
     const ang=Math.atan2(p.x-g.position.x,p.z-g.position.z);let dr=ang-g.rotation.y;while(dr>PI)dr-=PI*2;while(dr<-PI)dr+=PI*2;g.rotation.y+=dr*.2;
     if(D.state==='bark'){const b=Math.sin(t*15);hd.rotation.x=b>.3?-.35:.05;g.position.y=Math.max(0,Math.sin(t*7.5))*.05;tl.rotation.x=1.1;
       if(t-D.bark>.5+R()*.35){D.bark=t;K.bark(.55,1,1.8);if(R()<.6)setTimeout(()=>K.bark(.45,1.06,2.2),190+R()*60);if(R()<.25)setTimeout(()=>K.growl(.6,.3),420);}}
     else{hd.rotation.x=.1;g.position.y=0;tl.rotation.x=.4+Math.sin(t*9)*.25;}});
   deco(g,'查看：狗','黑色的米克斯，脖子上有項圈。牠一直盯著你。');}
  // 空屋房間裡的第二隻狗：玩家進門時從黑暗中衝出去
  {const g=makeDog(0x7a5a36,0xc8a070),U=g.userData;g.position.set(-14.6,0,-8.75);g.rotation.y=-PI/2;g.scale.y=.55;scene.add(g);
   const path=[[-16.4,-9.5],[-18.5,-9.1],[-18.5,-6.2],[-16.2,-3.4],[-16.2,-1.4],[-15.2,4],[-11,10.5]];
   const D2=G.dog2={g,run:0,i:0,last:0};
   anim.push(t=>{const dt=Math.min(.05,t-(D2.last||t));D2.last=t;if(!D2.run||D2.i>=path.length){if(D2.i>=path.length)g.visible=false;return;}
     g.scale.y=1;if(D2.wait>0){D2.wait-=dt;U.hd.rotation.x=Math.sin(t*18)>.2?-.4:.05;g.position.y=Math.abs(Math.sin(t*9))*.04;return;}const q=path[D2.i],dx=q[0]-g.position.x,dz=q[1]-g.position.z,d=Math.hypot(dx,dz),sp=11*dt;
     if(d<=sp){g.position.x=q[0];g.position.z=q[1];D2.i++;}else{g.position.x+=dx/d*sp;g.position.z+=dz/d*sp;}
     g.rotation.y=Math.atan2(dx,dz);g.position.y=Math.abs(Math.sin(t*22))*.09;U.legs.forEach((l,k)=>l.rotation.x=Math.sin(t*22+(k%2?0:PI))*.9);U.hd.rotation.x=Math.sin(t*15)>.2?-.35:.05;
     if(t-(D2.bk||0)>.3){D2.bk=t;K.bark(.6,1.25,2.6);}});}
  {const f=person(-13.6,-50,-.7,.92,LOOKS.F,'F','交談：餵狗的阿姨');f.visible=false;f.rotation.y=.4;K.unblock('npcF');}
  light(0x8a7a9a,.35,8,-16,2.4,-5);

  /* ---------- 工寮主人 ---------- */
  person(.2,0,-1.25,.98,LOOKS.W,'W','交談：工寮主人');G.col.push({x0:-1.15,x1:1.15,z0:-2.2,z1:-1.9,y0:0,y1:2.6,id:'gateW'});
  {const wl=light(0x9ac8ff,0,6,.1,1.1,-1.6),sp=mesh(new THREE.SphereGeometry(.04,6,5),new THREE.MeshBasicMaterial({color:0xd8ecff}),.25,.95,-1.65);G.weld={wl,sp};
   anim.push(t=>{if(!G.weld)return;const on=(Math.sin(t*37)+Math.sin(t*5.3)+Math.sin(t*1.1))>.4;wl.intensity=on?1.6+R()*.8:0;sp.visible=on;});}
}

function dogEvent(K){const G=K.G,S=G.S,e=S.ev,D=G.dog;if(e.dogBusy)return;e.dogBusy=1;
  D.state='bark';D.tx=-16.2;D.tz=-2.75;K.sub('（鐵門裡有東西衝了出來。）',2.5);
  const gate=G.gateD;
  setTimeout(()=>{if(G!==K.G)return;K.talk('D',()=>{e.dogBusy=0;S.unlocked.D=true;K.unblock('gateD');D.state='sit';D.tx=-13.1;D.tz=-.45;
      const f=G.npcs.F;f.visible=true;K.moveNpc('F',-13.6,0,-.7);S.unlocked.F=true;[gate,G.gateD2].forEach(q=>K.interact(q,{type:'deco',label:'查看：鐵門',text:'鐵門是半開的，鉸鏈鏽死了，關不起來。'}));
      K.sub('餵狗的阿姨：「牠只是顧家啦。我抓著，你進去看。」',5);K.setObj();},
    c=>{e.dogBusy=0;e.dog=0;e.dogAway=1;D.tx=-16.2;D.tz=-3.6;K.interact(G.gateD2,{type:'fn',label:'靠近：空屋的鐵門',fn:()=>dogEvent(K)});if(c&&c.bite){e.dogBite=(e.dogBite||0)+1;const fl=document.getElementById('flash');fl.style.transition='none';fl.style.opacity=.7;setTimeout(()=>{fl.style.transition='opacity 1.4s';fl.style.opacity=0;},80);K.burst(.3,200,.5);}
      K.interact(gate,{type:'fn',label:'靠近：空屋的鐵門',fn:()=>dogEvent(K)});});},1700);}

LEVELS.studio={id:'studio',name:'第二關　藝術家的工寮',blurb:'巷子走到底的一間鐵皮屋。',
 start:{x:1.2,y:0,z:9,yaw:0},bg:0x140f1a,fog:.045,SITES,ITEMS,DLG,ambientMosq:true,
 biteHint:'你被叮了，血量下降。蚊子在身邊時不要停在原地，蚊子太多也會讓你的理智下降。陽性容器處理得越多，蚊子會越少。',
 intro:['學長：「到了？我在機車這邊，先過來。」'],
 BRIEF:{S:{who:'學長',btn:'了解，出發',ask:'還有什麼要問的？',after:'學長：「先去門口打聲招呼。」',
  pages:[
   {h:'為什麼要來',t:'上一個點的病例，平常會走這條巷子。巷子底那間鐵皮屋有人在用，被叮的機會不低。'},
   {h:'這個點',t:'屋主是做藝術的，聽說脾氣不太好。我也只來過一次，裡面長什麼樣子不太清楚。周圍還有什麼，你自己繞一圈看。'},
   {h:'注意安全',t:'這一帶有流浪狗。自己小心，有狀況用無線電叫我。'},
   {h:'回報',t:'看完回機車這邊跟我說。'}],
  topics:[
   {t:'為什麼要來這裡？',pages:[0]},
   {t:'這個點的狀況？',pages:[1,2]},
   {t:'我查完了，回報結果。',report:1}]}},
 scoreTasks(S){return [{name:'空屋的狗',done:!!S.unlocked.D}];},
 npcLine:{W:'工寮主人：「看完跟我說一聲。作品不要碰。」',F:'餵狗的阿姨：「牠只是顧家啦。我抓著，你進去看。」'},
 objective(S){const u=S.unlocked;return !S.ev.brief_S?'目標：到機車旁邊找學長':!u.W?'目標：和鐵皮屋門口的人說話':'目標：把這一帶會積水的地方找出來。結束後回到機車回報';},
 takeaways:['工作室、倉庫不是住家，但只要有人活動、有積水，就要調查。','別人的作品和收藏不能擅自移動。會積水的地方照樣要檢查，處理方式和所有人一起決定。','容易漏掉的位置：飲水機的接水底盤、沒蓋緊的桶子、帆布的凹陷、半埋在土裡的容器。','廢棄雜物堆的處理是整堆清運，不是只處理看到的那一個容器。','空屋沒有人倒水，是社區裡的重點。現場先清除，空屋本身要通報里長列管。','遇到狗：不跑、不直視、不背對，慢慢退開。動物沒有被控制住之前不進入，請里長找飼主或餵養的人到場。被咬傷要立刻沖洗傷口、就醫並通報。'],
 extraEnding(S){const e=S.ev;return `<h3>空屋的狗</h3><p>${S.unlocked.D?'你退到安全的距離，請里長找來餵狗的人把狗牽住之後才進入空屋。':'你沒有完成空屋的調查。空屋要查；有狗的時候，先請里長找到能控制狗的人。'}${e.dogBite?` 過程中你被狗攻擊了 ${e.dogBite} 次。實際調查時被咬傷，要立刻用清水和肥皂沖洗傷口、就醫，並通報主管。`:''}</p>`;},
 build,
 onUnlock(key,K){const G=K.G;if(key==='W'){K.unblock('gateW');K.moveNpc('W',1.9,0,-3.4);G.weld.wl.intensity=0;G.weld.sp.visible=false;G.weld=null;K.setObj();}},
 tick(K,dt,p){const G=K.G,S=G.S,e=S.ev;
  if(e.dogAway&&(p.z>3||p.x<-19.8||p.x>-11.8)){e.dogAway=0;K.sub('（狗還在鐵門後面盯著你。）',3);}
  if(!e.dog&&!e.dogAway&&!e.dogBusy&&!S.unlocked.D&&p.z<1.6&&p.x>-19&&p.x<-12.6){e.dog=1;dogEvent(K);}
  if(!e.growl&&!e.dog&&p.x<-8&&p.z<5){e.growl=1;K.growl(1.6,.4);K.sub('（左邊的空屋裡有低低的吼聲。）',3.5);}
  if(!e.dog2&&S.unlocked.D&&p.x>-21&&p.x<-14.2&&p.z<-8.5){e.dog2=1;const D2=G.dog2;D2.run=1;D2.wait=.25;K.burst(.25,180,.6);K.growl(.4,.5);setTimeout(()=>K.bark(.75,1.2,3),120);
    G.shake=.6;K.sub('（黑暗裡有東西撞開空桶，從你腳邊衝了出去！）',3.5);K.sub('餵狗的阿姨：「啊，還有一隻在裡面，牠很怕人啦。」',5);}
  if(G.shake>0){G.shake-=dt;G.camera.position.x+=(Math.random()-.5)*G.shake*.06;}
  if(!e.inW&&p.z<-3&&p.x>-9&&p.x<9){e.inW=1;K.sub('（工作室裡很暗。到處是木箱，還有蓋著布的東西。）',4);K.sub('學長：「箱子上的東西不要碰。先找會裝水的。」',4.5,true);}
  if(!e.shed&&p.z<-20.5){e.shed=1;K.burst(.6,240,.4);K.sub('（頭上的鐵皮被風掀了一下，鏽屑掉下來。）',4);}
  if(!e.fig&&p.x>9.2&&p.x<11&&p.z<-5&&p.z>-12&&-Math.cos(G.yaw)>.7){e.fig=1;G.flick=1.3;G.figure.visible=true;K.burst(.9,150,.5);K.sub('……',1.6);K.sub('學長：「巷子底是死路，只有一棵樹。……怎麼了？」',5,true);}
 }
};
})();
