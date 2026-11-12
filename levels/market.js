/* 第一關：廢棄市場與民宅調查
   一樓：收掉的市場　二樓：住家　頂樓：花園
   場景依現場照片製作；門牌、車牌、人物均為虛構。 */
(function(){
const SITES={M:{name:'一樓市場'},R:{name:'二樓之5'},G:{name:'頂樓花園'}};
const ITEMS={
 M1:{site:'M',label:'水塔下的積水',name:'水塔下的積水',clear:'treat',clearWhy:'凹槽是砌在地上的，積水倒不掉，排水孔也一時清不通。只能投藥，再通報修理漏水和排水。',desc:'不鏽鋼水塔立在磁磚砌的凹槽裡。水塔底部在滴水，凹槽的地面積了一片。排水孔被落葉和泥堵住了。',water:1,larvae:'aedes',result:'手電筒貼著地面照，淺淺的積水裡有幼蟲在扭動。',learn:'設施漏水加上排水孔阻塞，會形成長期積水。水很淺也能孳生斑蚊。',
  acts:[{t:'投過藥了，這處就算處理完成',fb:'藥效有期限。水塔還在漏、排水孔不通，過一陣子又是一片積水。'},{t:'記錄位置，通報管理機關修理漏水、清通排水孔',ok:1,fb:'投藥只是暫時壓住。根本的處理是讓水塔不再漏、排水孔排得掉，設施修繕要通報管理機關。'},{t:'順便往水塔裡也投一些藥',fb:'問題在地面的積水，不在水塔裡面。而且水塔的水是給人用的，不能隨便投藥。'}]},
 M2:{site:'M',label:'攤台水槽',name:'攤台水槽',clear:'treat',clearWhy:'水槽是砌在攤台上的，排水口早就堵死，水倒不掉。只能投藥，再通報管理機關處理。',desc:'魚攤留下的磁磚水槽，砌死在攤台上。排水口早就被水泥和垃圾堵死，裡面是從天花板滴下來的水。',water:1,larvae:'aedes',pupae:1,result:'水槽裡有幼蟲，也有蛹。水面漂著好幾個空的蛹殼。',learn:'蛹殼表示已經有成蚊從這裡飛出去了。',
  acts:[{t:'記錄位置，通報管理機關打通排水口或把水槽填平',ok:1,fb:'固定的容器倒不掉，只能從源頭讓它不再積水：恢復排水，或直接填平。投藥只是暫時的。'},{t:'投過藥了，這處就算處理完成',fb:'藥效有期限。天花板還在滴水，水槽還會再積水。'},{t:'找一塊木板把水槽蓋起來',fb:'木板蓋不密，蚊子還是進得去，而且這裡沒有人會維護。'}]},
 M3:{site:'M',label:'油漆桶',name:'垃圾堆的油漆桶',desc:'垃圾堆旁邊的舊油漆桶，桶底有一層混濁的水。',water:1,larvae:null,result:'水很濁。撈了幾次，沒有幼蟲。',learn:'廢棄容器就算這次是陰性，留著就會繼續積水。',
  acts:[{t:'沒有幼蟲，不用處理',fb:'容器還在、水還在，下次來就可能是陽性。'},{t:'列為陽性容器',fb:'沒有幼蟲或蛹，不能列為陽性。'},{t:'把水倒掉，桶子倒扣，並通報清運這堆廢棄物',ok:1,fb:'廢棄容器的處理方式是清除，不是留著觀察。'}]},
 M4:{site:'M',label:'紅色水桶',name:'廁所的紅色水桶',desc:'廁所裡的紅色大水桶，水管接在裡面。隔間門上貼著「故障」，要人自己提水沖。',water:1,larvae:null,result:'水是滿的，看起來常有人用。撈了幾次，沒有幼蟲。',learn:'還在使用的儲水桶因為水常更換，不一定有幼蟲，但仍然是積水容器，要記錄。',
  acts:[{t:'把水倒光，把水桶收走',fb:'樓上的住戶還在用這間廁所。收走之後，只會換成另一個沒人管的桶子。'},{t:'保留，建議加蓋，每週把水用完並刷洗桶壁',ok:1,fb:'有使用需求的儲水容器：加蓋、定期用完、刷洗。'},{t:'沒有幼蟲，不用處理',fb:'開口的儲水容器隨時可能被產卵。'}]},
 M5:{site:'M',label:'高處的水箱',name:'廁所的高位水箱',desc:'蹲式廁所隔間的牆頂上有兩個舊式的高位水箱，蓋子都不見了。要把手電筒舉高才看得到裡面。',water:1,larvae:'aedes',result:'水箱裡有半箱不動的水。踮腳把撈杓伸進去，撈到了幼蟲。',learn:'高於視線的容器最容易被漏掉。調查時要抬頭看。',
  acts:[{t:'太高了，記錄「無法檢查」',fb:'你剛剛已經檢查到了。看到了卻不處理，等於把它留在那裡。'},{t:'關掉進水、把水放乾；放不乾就加蓋封住，並通報管理機關',ok:1,fb:'故障設備裡的水沒有用途，放乾或封住，並通報修繕。'},{t:'丟一顆樟腦丸進去',fb:'這不是有根據的防治方法。'}]},
 M6:{site:'M',label:'蹲式馬桶',name:'蹲式馬桶',desc:'門開著的那一間。蹲式馬桶，地上都是剝落的小磁磚。',water:0,larvae:null,result:'存水彎早就乾了，裡面只有灰塵和碎磁磚。',learn:'沒有積水就不計入積水容器。看過、確認是乾的，才算檢查過。',
  acts:[{t:'列為積水容器',fb:'沒有積水，不能計入。'},{t:'倒一桶水進去測試排水',fb:'如果排水是壞的，你就親手製造了一個積水處。'},{t:'記錄為無積水，不列入積水容器',ok:1,fb:'確認過是乾的，如實記錄。'}]},
 M7:{site:'M',label:'排水溝',name:'市場的排水溝',clear:'treat',clearWhy:'排水溝堵住、水不會流，又沒辦法馬上清乾淨。先投藥，再通報清淤。',desc:'牆邊的排水溝，蓋板缺了好幾塊。溝裡的水不會流，表面浮著一層油膜，很臭。',water:1,larvae:'culex',result:'水裡密密麻麻都是幼蟲。水面上有好幾團黏在一起的卵塊。',learn:'有機質多的污水常見家蚊。家蚊的卵黏成一團浮在水面；斑蚊的卵是一顆一顆黏在容器壁上。',
  acts:[{t:'列為斑蚊陽性容器',fb:'這是家蚊幼蟲，不計入斑蚊陽性容器，否則指數會失真。'},{t:'通報清淤疏通，讓水能流動；不列入斑蚊陽性',ok:1,fb:'不計入斑蚊指數，但堵塞的水溝仍然要通報處理。'},{t:'家蚊不傳登革熱，不用處理',fb:'家蚊會叮人，也可能傳播其他疾病，還是要處理。'}]},
 R1:{site:'R',label:'走廊積水',name:'二樓走廊的積水',desc:'走廊靠近盡頭的地磚上有一攤水。正上方的天花板有水痕。',water:1,larvae:null,result:'水很淺，只有薄薄一層。沒有幼蟲。',learn:'淺而短暫的積水不一定有幼蟲。但滲漏不處理，就會變成長期積水。',
  acts:[{t:'太淺了，不算積水，不用記錄',fb:'現在有水，就要記錄為積水處。'},{t:'灑漂白水',fb:'漂白水不能解決滲漏，水還是會回來。'},{t:'掃除積水，記錄下來，請住戶或管理人找出滲漏的來源',ok:1,fb:'清掉現在的水，並處理水的來源。'}]},
 R2:{site:'R',label:'燒金桶',name:'走廊的燒金桶',desc:'走廊上的燒金桶，桶身開了一圈通風孔。',water:0,larvae:null,result:'桶底只有紙灰，是乾的。桶身有孔，就算進了水也留不住。',learn:'同樣的桶子如果沒有孔、放在戶外淋雨，就會積水。判斷的依據是能不能留住水。',
  acts:[{t:'記錄為無積水，不列入積水容器',ok:1,fb:'確認過是乾的，如實記錄。'},{t:'列為積水容器',fb:'沒有積水，不能計入。'},{t:'請住戶把桶子丟掉',fb:'沒有積水的問題，沒有理由要求丟棄。'}]},
 R3:{site:'R',label:'冰箱',name:'冰箱的除霜水盤',desc:'林先生的舊冰箱，壓縮機的聲音很大。冰箱背面下方有一個接除霜水的水盤。',water:1,larvae:'aedes',result:'把冰箱往前拉開一點，手電筒照進去。水盤裡有水，水裡有幼蟲。林先生站在你背後，沒有說話。',learn:'冰箱底部或背面的除霜水盤，是室內最常被忽略的孳生源之一。',
  acts:[{t:'往冰箱後面噴殺蟲劑',fb:'殺蟲劑殺不了水盤裡的幼蟲，在室內噴灑也不安全。'},{t:'取出水盤，倒掉並刷洗，請他每週檢查一次',ok:1,fb:'讓住戶知道這個位置，之後他才會自己檢查。'},{t:'請他把舊冰箱丟掉換新的',fb:'不合理的要求。每週清一次水盤就能解決。'}]},
 R4:{site:'R',label:'儲水桶',name:'浴室的儲水桶',desc:'浴室裡的藍色大水桶，上面蓋著蓋子，蓋子上還壓了一塊磚頭。',water:1,larvae:null,result:'蓋子蓋得很密。打開來看，水是清的，沒有幼蟲。',learn:'密合加蓋的儲水容器是正確的做法。住戶做對的地方要說出來。',
  acts:[{t:'還是倒掉比較保險',fb:'你在門口答應過不倒。而且密合加蓋本來就是正確做法。'},{t:'有蓋子就不用記錄',fb:'有水就是積水容器，要記錄為陰性。'},{t:'肯定他的做法：維持加蓋，每週把水用完並刷洗一次',ok:1,fb:'肯定做對的事，再補上「定期刷洗」這一點。'}]},
 G1:{site:'G',label:'雨水桶',name:'接雨水的塑膠桶',algae:1,desc:'牆邊排了一整排接雨水的白色塑膠桶，上面掛著一支水瓢。水是綠的，桶壁長滿青苔。（實務上每一桶分開計數，這裡簡化為一處）',water:1,larvae:'aedes',pupae:1,result:'每一桶都有幼蟲。其中兩桶有蛹，水面浮著蛹殼。',learn:'接雨水澆花是頂樓和菜園最常見的孳生源。',
  acts:[{t:'只倒掉有蛹的那兩桶',fb:'其他桶裡的幼蟲幾天後也會變成蛹。'},{t:'每一桶都投藥，然後留著',fb:'可以清除或加蓋的容器不靠投藥，而且這些水她要拿來澆花。'},{t:'倒掉並刷洗桶壁；之後接水時蓋上細紗網，一週內用完',ok:1,fb:'保留她用雨水的習慣，但縮短儲水時間，並讓蚊子進不去。'}]},
 G2:{site:'G',label:'大水桶',name:'粉紅色大水桶',clear:'treat',clearWhy:'這桶水很深，阿滿姨還要拿來澆花，不能直接倒掉。可以投放蘇力菌，它對人和植物的毒性很低；之後再和她商量加蓋或養魚。',desc:'粉紅色的大塑膠桶。水很深，顏色是黑的，看不到底。',water:1,larvae:'aedes',result:'手電筒照下去，光被吃掉了，什麼都看不到。等了一下，再把撈杓沿著桶壁往上刮，撈到了幼蟲。',learn:'幼蟲受到光和震動驚擾會往下鑽。水深的容器要等一下，或沿著桶壁撈。',
  acts:[{t:'水太深看不到，記錄為陰性',fb:'看不到不等於沒有。水深的容器要換方法檢查。'},{t:'和阿滿姨商量：加上密合的蓋子，或養孔雀魚、大肚魚吃孑孓',ok:1,fb:'大型儲水容器不容易倒掉重來，加蓋或養魚是可以長期維持的做法。'},{t:'直接把整桶推倒',fb:'你在門口答應過會和她商量。失去信任之後，下一次沒有人會讓你上來。'}]},
 G3:{site:'G',label:'花瓶',name:'青花大花瓶',desc:'角落一只沒有種東西的青花大花瓶，瓶口朝上。',water:1,larvae:'aedes',result:'瓶子裡積了半瓶雨水。倒出來，裡面有幼蟲。',learn:'閒置的容器只要開口朝上放在戶外，就會積水。',
  acts:[{t:'倒掉、刷洗，瓶口朝下放，或收進室內',ok:1,fb:'沒在用的容器，讓它裝不了水。'},{t:'插一束花進去',fb:'那會變成一個有水的花瓶，問題還在。'},{t:'放著，雨水會自己蒸發',fb:'在蒸發完之前，幼蟲早就羽化了。'}]},
 G4:{site:'G',label:'疊放的底盤',name:'疊起來的花盆底盤',desc:'一疊沒在用的花盆和底盤，疊得很高。',water:1,larvae:null,result:'最上面那個底盤積了雨水，底盤和底盤之間也夾著水。沒有幼蟲。',learn:'疊放的容器，夾層裡的水很容易漏看。',
  acts:[{t:'只倒最上面那一個',fb:'夾層裡的水還在。'},{t:'把水全部倒掉，底盤倒扣，或收到淋不到雨的地方',ok:1,fb:'每一層都要處理，並改變收納方式。'},{t:'沒有幼蟲，不用處理',fb:'積水還在，隨時可能被產卵。'}]},
 G5:{site:'G',label:'盆栽',name:'石斛蘭的底盤',desc:'一大盆石斛蘭，釉盆下面墊著底盤。阿滿姨說這盆跟了她二十年。',water:1,larvae:'aedes',result:'底盤裡的水是滿的，有幼蟲。',learn:'盆栽底盤是最常見的孳生源之一。',
  acts:[{t:'請她以後少澆水',fb:'下雨一樣會積水。'},{t:'倒掉底盤的水並刷洗，建議拿掉底盤，或在底盤裡填滿粗砂',ok:1,fb:'不用動到她的蘭花，只處理底盤。'},{t:'把這盆搬走',fb:'處理底盤就夠了。'}]}
};
const DLG={
 M:{who:'回收阿伯',again:'（阿伯還蹲在攤台邊，頭也沒抬。）',nodes:[
  {say:'（一個阿伯蹲在攤台邊綁紙箱，頭也沒抬）這市場收十幾年了啦，沒人管。你們又要來貼單子？',ch:[
   {t:'「阿伯您好，我是衛生所的。這裡是公有市場，堆回收物其實不太合規定喔。」',tone:'angry',re:'「又要說違規？那你去叫警察啊。」（阿伯把封鎖線拉緊，背對你繼續綁紙箱。）',fb:'一開口就談違規，他會以為你是來開單的。他是最清楚這裡哪裡積水的人，現在什麼都不會說了。'},
   {t:'「阿伯您好，這是我的證件。附近有登革熱病例，我是來找積水的，不是來開單。」',ok:1,fb:'表明身分、說明目的，並先解除他「又要被開單」的疑慮。'},
   {t:'「阿伯您好，不好意思打擾。反正這裡沒人管，我自己進去看看，您忙您的。」',tone:'silent',re:'（阿伯沒抬頭）「隨便你。」（他沒有要告訴你哪裡有水的意思。）',fb:'略過在場的人，會失去最重要的情報來源。廢棄的市場也仍然有管理機關，不是「沒人管」。'}]},
  {say:'積水喔……水塔那邊一直在漏，廁所也壞很久了。啊這個是要找誰處理？我是沒辦法。',ch:[
   {t:'「您每天在這裡進出，積水就麻煩您有空時幫忙清一下，大家都比較安心。」',tone:'angry',re:'「水塔漏水關我什麼事！」（阿伯把繩子丟在地上，不再理你。）',fb:'設施漏水不是他能解決的。把責任推給在場的人，問題不會被處理。'},
   {t:'「這裡已經沒人管了，我先把看到的積水記錄下來，回去再寫進報告裡。」',tone:'silent',re:'（阿伯看了你一眼）「……你們每次都這樣。」（他低頭繼續綁紙箱。）',fb:'收掉的公有市場還是有管理機關。只記錄、不處理也不通報，孳生源會一直在。'},
   {t:'「現場能處理的我今天先處理，漏水我通報管理機關修。瓶罐麻煩開口朝下。」',ok:1,fb:'把責任分清楚：現場能做的先做；設施問題通報管理機關；使用者做得到的事請他配合。'}]}],
  done:'阿伯把封鎖線解開。「你要看就看。裡面的燈早就不會亮了。……樓梯在最裡面右手邊，樓上還有住人。」'},
 R:{who:'二樓之5・林先生',again:'（你又按了一次門鈴。過了很久，木門才又開了一條縫。）',retryHint:'再按一次門鈴，就能重新開始。',nodes:[
  {say:'（鐵門後面的木門開了一條縫，電視的光在他臉上閃）……誰？這麼晚了。衛生所？我家沒有積水，不用看。',ch:[
   {t:'「這是我的證件。很多住戶都說沒有積水，但檢查後幾乎都有，麻煩開個門。」',tone:'angry',re:'「我說沒有就沒有。」（木門關上，門鎖轉了兩圈。）',fb:'等於直接否定他的說法，門只會關上。'},
   {t:'「這是我的證件。依傳染病防治法，這次調查住戶要配合，麻煩開個門。」',tone:'angry',re:'「你在威脅我？」（木門用力關上。門後的電視被轉大聲。）',fb:'法條和罰則是最後手段，不適合用來開場。'},
   {t:'「這是我的證件。樓下積水多，蚊子會往上飛。我只看冰箱水盤幾處，您可以在旁邊看。」',ok:1,fb:'給出具體的理由（樓下的孳生源會影響他）和具體的檢查範圍，讓認為「家裡沒有積水」的人願意開門。'}]},
  {say:'冰箱底下？那裡會有水？……（他把鐵門打開）不過浴室那桶水是我存的，停水的時候要用，你不要給我倒掉。',ch:[
   {t:'「了解。不過開口的儲水都可能長孑孓，為了安全，今天還是先倒掉比較好。」',tone:'angry',re:'「停水的時候你要幫我送水嗎？」（他站到浴室門口，不讓你過去。）',fb:'有使用需求、蓋得密的儲水容器不需要倒掉。'},
   {t:'「好，不會倒。有加蓋就很好，我看一下蓋子密不密、桶壁有沒有定期刷。」',ok:1,fb:'尊重使用需求，並確認做法是否正確。加蓋的儲水是對的，要讓他知道他做對了。'},
   {t:'「好，那桶是您要用的，我就不看了。其他地方我很快看一下就好。」',tone:'silent',re:'（林先生點點頭，把浴室門關上。那桶水的蓋子有沒有蓋緊，你沒有看到。）',fb:'還是要看：蓋子有沒有密合，桶子有沒有定期刷洗。'}]}],
  done:'鐵門開了。屋裡只有電視亮著，沒有聲音。'},
 X:{who:'二樓之2・住戶',again:'（你又敲了二樓之2的門。）',retryHint:'再敲二樓之2的門，就能重新開始。',btn:'離開門口',nodes:[
  {say:'（門被猛然拉開，一個男人衝出來，指著你的臉大吼）又是你們！一天到晚敲門，吵死人了！你們這是擾民！我要找立委告你們！',ch:[
   {t:'「先生請冷靜。我們是依法執行公務，要找立委反映也可以，但今天要先檢查。」',tone:'angry',re:'「依法？好，你給我記住！」（他拿手機對著你拍了幾張，把門甩上。）',fb:'「依法」「今天要先檢查」是在跟對方對抗。現場的任務是讓情緒降下來，不是贏過對方。'},
   {t:'「先生，打擾到您很抱歉。我是衛生所防疫人員，附近有病例，所以逐戶檢查。」',ok:1,fb:'先為打擾道歉、表明身分、簡短說明原因。不反駁「擾民」，讓對方的情緒先降下來。'},
   {t:'「先生請冷靜。立委其實管不到防疫，不讓我們檢查的話，衛生局可能會開罰。」',tone:'angry',re:'「你敢威脅我？」（他一拳打在門框上，把門甩上。門後還在罵。）',fb:'拿罰則威脅會讓對方更激動，也可能引發投訴。是否依法處理，由衛生局依程序決定，不在門口拿來嚇人。'}]},
  {say:'我不管！我家沒有積水！你們不准進來！再不走我就叫警察！',ch:[
   {t:'「好，我先不進去。我在門口等您冷靜一點，再跟您說明為什麼要檢查。」',tone:'angry',re:'「你要等就等！」（門被甩上，門鎖連轉了好幾圈。）',fb:'對方已經拒絕，守在門口會被當成騷擾，衝突只會擴大。'},
   {t:'「先生，只要五分鐘就好。我看完馬上走，不會打擾太久，拜託讓我進去。」',tone:'angry',re:'「我說不准就是不准！」（門被用力甩上。）',fb:'對方已經明確拒絕，繼續要求進入會讓衝突升高。不要強行進入。'},
   {t:'「好，我不會進去。這張單子有自我檢查方法和衛生所電話，方便時再約。」',ok:1,fb:'尊重對方的拒絕、保持距離，同時留下自我檢查的方法和聯絡方式，讓之後還有機會。'}]}],
  done:'（門被用力甩上。門後還在罵：「我一定會去找立委！」）'},
 X2:{who:'無線電・學長',retryHint:'在二樓之2門口用無線電重新回報。',btn:'繼續',nodes:[
  {say:'（無線電）剛剛那戶怎麼這麼大聲？你還好嗎？怎麼處理？',ch:[
   {t:'「我沒事。他拒絕入內，我留了通知單，記為『拒絕入戶』，回去再跟您討論。」',ok:1,fb:'先確認自身安全，再如實記錄，交給主管、里長和衛生局依程序後續處理。拒絕入戶不計入調查戶數，但要追蹤。'},
   {t:'「我沒事。他說家裡沒有積水，我就在調查表記成『已檢查、無積水』。」',tone:'radio',re:'學長：「你根本沒進去，怎麼能記無積水？再想想。」',fb:'拒絕入戶不代表沒有孳生源，沒看過的住家不能當作陰性。'},
   {t:'「我沒事。我有錄到他罵人的影片，可以傳到里民群組，讓大家知道他不配合。」',tone:'radio',re:'學長：「千萬不要，影片刪掉。想清楚再回報。」',fb:'公開民眾的影像會侵害隱私，也會讓衝突擴大。'}]}],
  done:'學長：「好。這種狀況不要一個人硬撐，人沒事最重要。」'},
 N:{who:'無線電・學長',again:'（你又站到二樓之3門口。）',retryHint:'再敲一次門，就能重新開始。',btn:'繼續',nodes:[
  {say:'（二樓之3。你按了門鈴，也敲了門。沒有人應。門縫底下沒有光。）沒人應門？你怎麼處理？',ch:[
   {t:'「轉轉看門把。如果沒鎖，就進去很快看一下有沒有積水再出來。」',tone:'locked',re:'（你轉了門把。門鎖著，轉不動。）學長：「手放開。住家的門不能自己開。」',fb:'不能擅自進入住家。'},
   {t:'「留下通知單、記錄『未入戶』，問鄰居或里長住戶狀況，再約時間複查。」',ok:1,fb:'未入戶要留下紀錄並追蹤。這一戶不計入調查戶數，也不能當作沒有孳生源。'},
   {t:'「沒人應門，就在調查表記錄為『已檢查、無積水』，繼續去下一戶。」',tone:'radio',re:'學長：「你根本沒看到裡面，怎麼會是無積水？再想想。」',fb:'沒看過的住家不能當作陰性。'}]}],
  done:'你把通知單夾進門縫，在調查表上寫下「未入戶」。'},
 G:{who:'頂樓・阿滿姨',again:'（阿滿姨還提著水瓢，擋在網門前）「又要說什麼？」',nodes:[
  {say:'（她提著水瓢，擋在花園的網門前）這頂樓的花我種三十年了。上次你們的人來，把我接的雨水全部倒光，蘭花差點死掉。今天又要倒？',ch:[
   {t:'「阿姨，上次的事很抱歉。不過積水依規定都要清除，今天還是要麻煩您配合。」',tone:'angry',re:'「又是規定！」（她把網門的鐵鍊扣上，站在門口不動。）',fb:'她擔心的是花又要死了。只講規定，沒有回應她的擔心。'},
   {t:'「阿姨，上次的事很抱歉。這次只處理有孑孓的桶子，怎麼處理我們一起商量。」',ok:1,fb:'先回應上次的不愉快，再說明這次只處理陽性容器，並承諾一起決定處置方式。'},
   {t:'「阿姨，上次的事很抱歉。既然您這麼在意，花園今天就不看了，您自己多注意。」',tone:'silent',re:'（阿滿姨點點頭，轉身回去澆花。網門沒有打開。）',fb:'頂樓花園的儲水桶常常是整棟樓最嚴重的孳生源，不能因為對方不高興就放棄。'}]},
  {say:'雨水比自來水好，我都是接了慢慢用。你說有蟲……不然是要怎樣？',ch:[
   {t:'「我幫您每一桶都投藥，這樣雨水可以繼續放著，也不用常常倒。」',tone:'angry',re:'「投藥？那些水我要拿來澆花欸！」（她把手上的水瓢摔在地上。）',fb:'可以清除或加蓋的容器不靠投藥，而且這些水她要拿來澆花。'},
   {t:'「雨水最容易長蚊子，以後改用自來水澆花，就不用再接雨水了。」',tone:'angry',re:'「不接雨水，水費你要幫我付？」（她放下水瓢，擋回網門前。）',fb:'她不會接受。等你離開，一切就恢復原狀。'},
   {t:'「小桶一週內用完再刷，接水時蓋細紗網；大桶加蓋，或養幾條孔雀魚。」',ok:1,fb:'給她做得到、又保留用水需求的做法：縮短儲水時間、加網加蓋、大型容器養魚。'}]}],
  done:'阿滿姨把網門打開。「……好啦，你看。腳邊小心，盆子很多。」'}
};
const F2=3.6,F3=7.2;
/* 二樓之2：開門、對話、失敗時甩門，可以再敲門重來 */
function openX(K){const G=K.G,e=G.S.ev,dr=G.doorX;if(e.xBusy)return;e.xBusy=1;
  G.setDoorX(1);K.moveNpc('X',5.45,F2,-23.3);G.npcs.X.visible=true;G.npcs.X.rotation.y=Math.PI/2;
  K.burst(.6,140,.55);K.burst(.3,900,.25,'bandpass');K.sub('（二樓之2的門猛然打開。）',2.5);
  const shut=()=>{G.npcs.X.visible=false;K.unblock('npcX');G.setDoorX(0);K.burst(.5,120,.6);e.xBusy=0;};
  const radio=()=>K.talk('X2',()=>{e.angryDone=1;K.interact(dr,{type:'deco',label:'查看：二樓之2',text:'門後傳來電視開得很大聲的聲音。通知單還夾在門把上。'});K.setObj();},
    ()=>K.interact(dr,{type:'fn',label:'無線電回報：二樓之2',fn:radio}));
  setTimeout(()=>{if(G!==K.G)return;K.talk('X',()=>{shut();K.interact(dr,{type:'deco',label:'查看：二樓之2',text:'門後還在罵。'});setTimeout(()=>{if(G!==K.G)return;radio();},700);},
    ()=>{shut();K.sub('（門被用力甩上。）',3);K.interact(dr,{type:'fn',label:'敲門：二樓之2',fn:()=>openX(K)});});},900);}
LEVELS.market={id:'market',name:'第一關　廢棄市場與民宅調查',blurb:'一樓是收掉的市場，二樓還住著人，頂樓有人種花。',
 start:{x:3.9,y:0,z:5.2,yaw:0},bg:0x140f1a,fog:.05,SITES,ITEMS,DLG,
 BRIEF:{S:{who:'學長',btn:'了解，出發',ask:'還有什麼要問的？',after:'學長：「先去找市場入口那個阿伯。」',
  pages:[
   {h:'為什麼要來',t:'這附近有一個登革熱本土病例。本土病例代表他是在這附近被叮的，病毒可能已經在這一帶的蚊子身上。所以要在病例周邊做孳生源調查，把會讓埃及斑蚊產卵的積水找出來、清掉。'},
   {h:'為什麼要逐戶看',t:'埃及斑蚊飛不遠，大多在住家裡面和附近活動，在人工容器的積水裡產卵。噴藥只能殺掉當時在飛的成蚊，水裡的孑孓和容器壁上的卵都還在。不把容器找出來，過一兩個禮拜又是一批新的蚊子。'},
   {h:'這棟樓：一樓',t:'一樓是收掉的公有市場，水塔一直在漏，廁所也壞很久了。有個回收阿伯每天在這裡出入，先找他問。在場的人最清楚哪裡有水。'},
   {h:'這棟樓：二樓',t:'二樓還住了幾戶。之前有住戶對我們來敲門很不滿，口氣放軟，不要跟人起衝突。沒人應門的，留通知單、做紀錄。'},
   {h:'這棟樓：頂樓',t:'頂樓有位阿姨種了很多花，會接雨水澆花。上次有同仁把她的雨水全部倒掉，她到現在還在不高興。'},
   {h:'調查流程',t:'先表明身分、取得同意，再找積水容器。有孑孓就用滴管採樣，在瓶子裡分清楚是斑蚊還是家蚊。能倒的倒掉、把容器刷乾淨；倒不掉的才投藥。最後跟住戶說以後怎麼預防。'},
   {h:'注意安全',t:'黃昏是斑蚊最活躍的時候，長袖穿好、防蚊液擦了。有狀況用無線電叫我，不要一個人硬撐。三層都看完，回機車這邊跟我回報。'}],
  topics:[
   {t:'為什麼要來這裡調查？',pages:[0,1]},
   {t:'這棟樓的狀況？',pages:[2,3,4]},
   {t:'調查的流程？',pages:[5,6]},
   {t:'我查完了，回報結果。',report:1}]}},
 reportNote:'二樓之2拒絕入戶、二樓之3未入戶，都不計入',
 surfaces:[
  {x0:-40,x1:40,z0:-40,z1:20,y:0},
  {x0:7.15,x1:9.85,z0:-23.5,z1:-16.5,axis:'z',ya:0,yb:F2},
  {x0:-12,x1:7.15,z0:-28,z1:0,y:F2},{x0:7,x1:10,z0:-16.5,z1:-14,y:F2},
  {x0:-2.2,x1:4.8,z0:-27.85,z1:-25.65,axis:'x',ya:F3,yb:F2},
  {x0:-12,x1:7,z0:-25.5,z1:0,y:F3},{x0:-12,x1:-2.2,z0:-28,z1:-25.5,y:F3},{x0:4.8,x1:7,z0:-28,z1:-25.5,y:F3}],
 ambient(p,foot){return foot>6.6?.5:foot>3?.07:(p.z>.2?.5:.12);},
 intro:['學長：「到了？我在機車這邊，先過來。跟你說一下這裡的狀況。」'],
 npcLine:{M:'回收阿伯：「樓梯在最裡面右手邊。……晚上我是不會上去的。」',R:'林先生：「……你看快一點。」',G:'阿滿姨：「那盆石斛不要碰到。」'},
 objective(S){const u=S.unlocked;return !S.ev.brief_S?'目標：到入口的機車旁邊找學長':!u.M?'目標：和市場入口的阿伯說話':!S.ev.up?'目標：檢查一樓市場。樓梯在最裡面的右手邊':'目標：市場、二樓住家、頂樓花園都要查。結束後回到入口的機車回報';},
 takeaways:['收掉的公共場所仍然有管理機關。現場能清的先清，設施問題要通報，不能以「沒人管」結案。','沒人應門的住家：留通知單、記錄「未入戶」、安排複查。不計入調查戶數，也不能當作陰性。','容易漏掉的位置：高處（水箱）、底部（冰箱水盤）、夾層（疊放的底盤）、深水（大水桶）。','有使用需求的儲水：加蓋、加細網、縮短儲水時間，大型容器可以養魚。住戶已經做對的事要給予肯定。','家蚊（排水溝）不計入斑蚊指數，但堵塞的水溝仍要通報清淤。','民眾激動、揚言投訴時：先道歉、表明身分，不爭辯、不威脅、不強行進入；留下說明和聯絡方式，記錄拒絕入戶，交給主管和衛生局依程序處理。自身安全優先。'],
 extraEnding(S){return `<h3>拒絕入戶</h3><p>${S.ev.angryDone?'二樓之2：住戶拒絕入內，已留下通知單和自我檢查說明，記錄為拒絕入戶，交由主管和里長後續處理。不計入調查戶數。':'你沒有經過二樓之2，或沒有完成處理。'}</p><h3>未入戶</h3><p>${S.unlocked.N?'二樓之3：已留通知單並記錄，待複查。不計入調查戶數。':'二樓之3你沒有去敲門。病例周邊的每一戶都要嘗試入戶；沒人應門，也要留下通知單和紀錄。'}</p>`;},

 build(K){
  const {THREE,scene,col,rayList,anim,G,M,C,box,wX,wZ,mesh,interact,signTex,P,photo,tex,stains,noise,cyl,person,figure,addItem,scooter}=K;
  const Pr=makeProps(K),HD=makeMarketHD(K,Pr),MT=HD.MT;
  const sp=(g,x0,y0,w,h,r,gg,b,v)=>{for(let y=y0;y<y0+h;y++)for(let x=x0;x<x0+w;x++){const k=(Math.random()-.5)*v;g.fillStyle=`rgb(${r+k|0},${gg+k|0},${b+k|0})`;g.fillRect(x,y,1,1);}};
  const grid=(g,n,sx,sy,c)=>{g.fillStyle=c;for(let x=0;x<n;x+=sx)g.fillRect(x,0,1,n);for(let y=0;y<n;y+=sy)g.fillRect(0,y,n,1);};
  const T=window.MARKET_TEX||{};
  const terr=MT.terr;
  const tile=MT.tile;
  const tileD=MT.tileD;
  const mosa=MT.mosa;
  const ceil=MT.ceil;
  const plast=MT.wall2;
  const floor2=MT.floor20;
  const roofM=MT.roof,para=MT.parapet;
  const shut=MT.shut;
  const rust=P(tex((g,n)=>{sp(g,0,0,n,n,84,58,42,34);}),{},1);
  const steel=new THREE.MeshPhongMaterial({color:0x8e959c,shininess:80,specular:0xaaaaaa,flatShading:true});
  const algae=T.algae?new THREE.MeshPhongMaterial({map:photo(T.algae),shininess:50}):M.water;
  const conc=MT.conc,B=c=>new THREE.MeshBasicMaterial({color:c});
  const bars=(()=>{const t=tex((g,n)=>{g.clearRect(0,0,n,n);g.fillStyle='#26262a';for(let x=2;x<n;x+=8)g.fillRect(x,0,3,n);g.fillRect(0,0,n,4);g.fillRect(0,n-4,n,4);g.fillRect(0,n/2-2,n,4);});return new THREE.MeshPhongMaterial({map:t,transparent:true,alphaTest:.4,side:THREE.DoubleSide});})();
  const wire=(()=>{const t=tex((g,n)=>{g.clearRect(0,0,n,n);g.fillStyle='#8a8f8a';for(let i=0;i<n;i+=16){g.fillRect(i,0,2,n);g.fillRect(0,i,n,2);}});return t;})();
  const plane=(w,h,mat,x,y,z,ry)=>{const m=mesh(new THREE.PlaneGeometry(w,h),mat,x,y,z);m.rotation.y=ry||0;return m;};
  const sign=(lines,bg,fg,w,h,x,y,z,ry,px)=>plane(w,h,new THREE.MeshPhongMaterial({map:signTex(lines,bg,fg,px)}),x,y,z,ry);
  const nb={collide:false};
  const deco=(o,label,text)=>interact(o,{type:'deco',label,text});
  const bag=(x,y,z,s,c)=>{const m=mesh(new THREE.IcosahedronGeometry(s,0),new THREE.MeshPhongMaterial({color:c,shininess:40,flatShading:true}),x,y+s*.75,z);m.scale.y=.8;m.rotation.y=x*3;return m;};
  const step=(g,m)=>{g.traverse(o=>{if(o.isMesh)o.material=m;});};

  /* ===== 街道與外觀 ===== */
  box(60,.2,13,0,-.1,6.5,M.asphalt,nb);
  box(40,9,2,0,4.5,13,M.plaster,{uv:3});box(2,9,14,-17,4.5,6,M.brick,{uv:3});box(2,9,14,17,4.5,6,M.brick,{uv:3});
  box(4,9,30,-14.2,4.5,-14,M.plaster,{uv:3});box(6,9,30,13.2,4.5,-14,M.plaster,{uv:3});
  [[-9,5.5,12.02],[4,6,12.02],[10,5,12.02]].forEach(w=>mesh(new THREE.BoxGeometry(1.3,1.1,.06),B(0xc9a25a),w[0],w[1],w[2]));
  {mesh(new THREE.BoxGeometry(.12,4.4,.12),C(0x2a2a2a),9.5,2.2,1.2);mesh(new THREE.BoxGeometry(.5,.12,.2),B(0xffb060),9.2,4.3,1.2);const l=new THREE.PointLight(0xff9a45,1,15,1.6);l.position.set(9,4.1,1.6);scene.add(l);}
  scooter(1.2,6.4,.3);
  {const s=person(2.05,0,5.5,1,{shirt:0x4a6a8a,shirt2:0x8aa0b4,pattern:'uniform',vest:0xb8a034,pants:0x2a2c34,shoes:0x2a2a2a,hair:0x1a1816,style:'short',age:.35,pose:'hold',sleeves:'long'},'S','交談：學長');interact(s,{type:'brief',key:'S',label:'交談：學長'});}
  sign(['登革熱','防治區','請配合調查'],'#b8a13a','#1a1408',1.8,1.8,-3,1.7,.17,0);

  /* ===== 一樓：市場 ===== */
  box(19,.2,28,-2.5,-.1,-14,terr,nb);
  box(19,.2,28,-2.5,3.5,-14,ceil,nb);
  wZ(0,-12,7,0,3.4,shut,[[1.8,6]],3.0);
  wX(-12,-28,0,0,3.4,tileD);wZ(-28,-12,7,0,3.4,tileD);
  wX(7,-28,0,0,3.4,shut,[[-25.7,-24.1]]);
  // 正面上方
  box(19,3.6,.3,-2.5,5.4,0,M.old,{collide:false,uv:3});
  const pillar=(x,z,m)=>HD.pillar(x,z,m?{meter:m}:null);
  HD.stall(-5,1.5,-7,-2.5,{label:[1.53,-4.2,Math.PI/2]});HD.stall(-5,1.5,-14,-9);HD.stall(-5,1.5,-21,-16,{green:true});HD.stall(-12,-8.5,-21,-15);
  [[1.15,-6.65,[0,.37,0]],[-4.65,-6.65],[1.15,-13.65],[-4.65,-13.65,[.37,0,Math.PI/2]],[1.15,-20.65,[0,.37,0]],[-4.65,-20.65],[-8.85,-15.35],[1.45,-.5],[6.4,-.5]].forEach(p=>pillar(p[0],p[1],p[2]));
  // 入口：封鎖線、三角錐、阿伯
  const rope=box(4.2,.07,.03,3.9,.95,-.5,B(0xc9a020),nb);G.rope=rope;
  col.push({x0:1.8,x1:6,z0:-.6,z1:-.4,y0:0,y1:3,id:'gateM'});
  [[1.95,-.5],[5.85,-.5],[2.6,1.4]].forEach(p=>{const g=new THREE.Group();cyl(.03,.17,.6,C(0xc8521e),.3,g,7);cyl(.06,.09,.12,C(0xe8e0d0),.42,g,7);mesh(new THREE.BoxGeometry(.4,.04,.4),C(0x8a3a16),0,.02,0,g);g.position.set(p[0],0,p[1]);scene.add(g);});
  person(3.4,0,-1.5,.95,{shirt:0xd8d4c8,vest:0x5a6a3a,pants:0x4a4438,shoes:0x3a5a8a,hair:0x8a8880,style:'bald',age:.85,hunch:.4,pose:'hold',beard:true},'M','交談：回收阿伯');
  {const l=new THREE.PointLight(0x8a7a9a,.8,15,1.5);l.position.set(4,2.7,-1.2);scene.add(l);}
  sign(['社區環境','大家維持','乾淨整潔','共享共榮'],'#e8e8e0','#2a4a9a',.9,1.2,6.83,2.1,-2,-Math.PI/2,40);
  // 車
  {const g=new THREE.Group();mesh(new THREE.BoxGeometry(1.8,.7,4.2),C(0xcfd0cc),0,.7,0,g);mesh(new THREE.BoxGeometry(1.6,.55,2.2),C(0x1c2024),0,1.3,-.2,g);mesh(new THREE.BoxGeometry(1.62,.08,2.24),C(0xcfd0cc),0,1.6,-.2,g);
   [[-.9,1.3],[.9,1.3],[-.9,-1.3],[.9,-1.3]].forEach(p=>{mesh(new THREE.CylinderGeometry(.32,.32,.2,8),C(0x101010),p[0],.32,p[1],g).rotation.z=Math.PI/2;});
   mesh(new THREE.BoxGeometry(.4,.16,.05),B(0x7a1010),-.6,.85,2.11,g);mesh(new THREE.BoxGeometry(.4,.16,.05),B(0x7a1010),.6,.85,2.11,g);
   g.position.set(4.9,0,-8.5);scene.add(g);col.push({x0:4,x1:5.8,z0:-10.6,z1:-6.4,y0:0,y1:1.7});deco(g,'查看：汽車','有人把收掉的市場當成停車場。車頂積了一層灰，很久沒動過了。');}
  // 攤台上的雜物
  HD.sofa(-2.4,.88,-4.75,0);HD.cabinet(-1,.88,-12.6,0);
  {const g=new THREE.Group();HD.add(HD.rbox(1.6,.5,.5,.04),HD.MT.dark,g,0,.25,0);HD.add(new THREE.BoxGeometry(1.4,.3,.01),C(0x2a2a2c),g,0,.25,.255);g.position.set(-3.2,.88,-13);scene.add(g);
   const mt=box(1.9,1.1,.25,-2.4,1.5,-20.3,P(tex((g,n)=>{sp(g,0,0,n,n,40,60,120,20);g.fillStyle='#c8d0e0';for(let i=0;i<26;i++)g.fillRect(Math.random()*n,Math.random()*n,5,5);}),{},1),nb);mt.rotation.x=.25;
   const gl=box(.05,1.2,1,-9.2,1.5,-20,new THREE.MeshPhongMaterial({color:0x8fb0a8,transparent:true,opacity:.35,shininess:90}),nb);gl.rotation.z=.2;
   [[-10.8,-19.6,.5,0],[-9.6,-18.8,.42,1],[-10.9,-17.6,.55,1],[-9.5,-16.6,.4,0],[-10.4,-16,.45,1]].forEach((b,i)=>{const t=HD.trashBag(b[2],b[3]?MT.bagWhite:MT.bagClear,false,i+1);t.position.set(b[0],.88,b[1]);t.rotation.y=i;scene.add(t);});}
  {const ex=HD.extinguisher(1.75,-9.3,-.6);deco(ex,'查看：滅火器','壓力表的指針落在紅色區。這裡的東西已經很久沒有人檢查過了。');}
  HD.cables();HD.ceilingStuff();
  // 水塔凹槽 M1
  wX(-8.5,-7,-.15,0,.9,tileD,[[-4.6,-3.2]]);wZ(-7,-12,-8.35,0,.9,tileD);
  [[-8.5,-5.8,.34,2.4],[-8.5,-1.675,.34,3.05]].forEach(q=>box(q[2],.05,q[3],q[0],.925,q[1],MT.mosa,nb));box(3.65,.05,.34,-10.18,.925,-7,MT.mosa,nb);
  HD.waterTower(-10.7,-4);col.push({x0:-11.75,x1:-9.65,z0:-5.05,z1:-2.95,y0:0,y1:1.7});
  HD.stool(-11.5,-6.4,.3);col.push({x0:-11.75,x1:-11.25,z0:-6.65,z1:-6.15,y0:0,y1:.5});
  {const g=new THREE.Group();const pd=HD.puddle(2.8,5.2);pd.position.set(-.4,.025,.6);g.add(pd);const dr=mesh(new THREE.CircleGeometry(.09,12),MT.dark,.9,.03,-1.2,g);dr.rotation.x=-Math.PI/2;
   [[.2,-1.0],[-.6,1.4],[.6,2.2],[-.9,-.4]].forEach(q=>{const lf=mesh(new THREE.PlaneGeometry(.09,.05),C(0x5a4a2a),q[0],.032,q[1],g);lf.rotation.x=-Math.PI/2;lf.rotation.z=q[0]*5;});
   addItem('M1',g,-10,0,-4,0,.5,1.6);G.items.M1.r=1.5;}
  // 攤台水槽 M2
  {box(2.4,.7,2.4,-10.6,.35,-11.8,tileD);const g=new THREE.Group();[[0,1.14,2.4,.12],[0,-1.14,2.4,.12],[1.14,0,.12,2.4],[-1.14,0,.12,2.4]].forEach(r=>mesh(new THREE.BoxGeometry(r[2],.2,r[3]),tile,r[0],.8,r[1],g));
   mesh(new THREE.BoxGeometry(2.16,.02,2.16),M.water,0,.78,0,g);addItem('M2',g,-10.6,0,-11.8,0,1.2);}
  // 廁所
  wZ(-22.5,-12,-7.35,0,3.4,tile,[[-9.7,-8.3]]);wX(-7.5,-28,-22.35,0,3.4,tile);
  wX(-9.8,-28,-25,0,2.3,tile,[[-27.75,-26.85]],1.95);wZ(-26.5,-12,-9.65,0,2.3,tile);wZ(-25,-12,-9.65,0,2.3,tile);
  box(4.5,.02,5.5,-9.75,.012,-25.25,MT.toiletFloor,nb);
  {const d=HD.door(.9,1.9);d.position.set(-9.6,0,-26.2);scene.add(d);const f=HD.frame(.9,1.9);f.position.set(-9.62,0,-26.2);scene.add(f);}
  {const d=HD.door(.9,1.9);d.position.set(-9.78,0,-27.75);d.rotation.y=1.15;scene.add(d);const f=HD.frame(.9,1.9);f.position.set(-9.66,0,-27.75);scene.add(f);}
  sign(['故障'],'#e8e6dc','#1a1a1a',.4,.4,-9.55,1.35,-25.75,Math.PI/2,90);
  sign(['請自行','提水沖洗'],'#e8e6dc','#1a1a1a',.5,.36,-9.55,1.75,-25.75,Math.PI/2,56);
  {const g=new THREE.Group();const c1=HD.cistern(false);c1.position.set(0,2.31,-.8);g.add(c1);const c2=HD.cistern(true);c2.position.set(0,2.31,.75);g.add(c2);
   const w=mesh(new THREE.PlaneGeometry(.28,.52),M.water,0,2.57,-.8,g);w.rotation.x=-Math.PI/2;addItem('M5',g,-9.8,0,-26.5,0,2.75);}
  {const g=HD.squat();addItem('M6',g,-10.9,0,-27.3,0);}
  {const g=new THREE.Group();g.add(Pr.C.redBucket({water:M.water,level:.92}));mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(.1,.58,0),new THREE.Vector3(.25,1.1,-.2),new THREE.Vector3(.2,.95,-.75)]),10,.025,5,false),C(0xb8743a),0,0,0,g);addItem('M4',g,-8.05,0,-23.5,.33);}
  {const sk=HD.sink();sk.position.set(-7.86,.74,-24.4);sk.rotation.y=-Math.PI/2;scene.add(sk);box(.28,.74,.28,-7.82,.37,-24.4,MT.tileSq);}
  {const w=HD.window(.9,1.0);w.position.set(-7.64,2.25,-26.9);w.rotation.y=-Math.PI/2;scene.add(w);const l=new THREE.PointLight(0x8a9ab0,.45,5,1.6);l.position.set(-8.2,2.2,-26.9);scene.add(l);}
  {const l=new THREE.PointLight(0xa8c8d8,.7,8,1.4);l.position.set(-8.7,3,-24.3);scene.add(l);const tb=box(1.2,.06,.1,-8.7,3.34,-24.3,B(0xcfe6f0),nb);
   anim.push(t=>{const on=(Math.sin(t*29)+Math.sin(t*4.1)+Math.sin(t*1.7))>.5;l.intensity=on?.7:.02;tb.material.color.setHex(on?0xcfe6f0:0x1a2226);});}
  // 垃圾角落 M3
  {[[-3.5,-27.25,.5,MT.bagBlack,1,.3],[-4.4,-27.45,.55,MT.bagClear,0,0],[-.35,-27.55,.36,MT.bagBlack,0,1],[-1.05,-26.95,.28,MT.bagBlue,0,2],[-.6,-27.2,.26,MT.bagPink,0,1.5]].forEach((q,i)=>{const b=HD.trashBag(q[2],q[3],!!q[4],i+2);b.position.set(q[0],0,q[1]);b.rotation.y=q[5];scene.add(b);});
   [[-4.35,.22,-27.4,.22,MT.bagWhite],[-4.55,.4,-27.5,.18,MT.bagPink],[-4.25,.5,-27.55,.17,MT.bagWhite]].forEach((q,i)=>{const b=HD.trashBag(q[3],q[4],false,i+9);b.position.set(q[0],q[1],q[2]);scene.add(b);});
   const t=HD.tire();t.position.set(-5.05,.31,-27.78);t.rotation.y=.25;scene.add(t);
   const br=HD.broom();br.position.set(-.95,.08,-27.66);br.rotation.set(-.12,0,.2);scene.add(br);
   [[-.75,MT.handleOrange,1.45,-.24],[-1.15,MT.handleRed,1.3,.06],[-.6,MT.handlePink,1.2,-.4]].forEach(q=>{const h=HD.handle(q[2],q[1],true);h.position.set(q[0],0,-27.7);h.rotation.set(-.1,0,q[3]);scene.add(h);});
   scene.add(HD.hose([[-1.75,.04,-27.35],[-1.45,.32,-27.45],[-1.15,.48,-27.3],[-1.2,.25,-27.0],[-1.5,.05,-26.95],[-1.9,.04,-27.15]]));
   const dp=HD.dustpan();dp.position.set(-2.15,0,-26.15);dp.rotation.y=.8;scene.add(dp);const ld=HD.lid();ld.position.set(-4.75,0,-26.55);scene.add(ld);
   col.push({x0:-5.4,x1:-2.9,z0:-28,z1:-26.8,y0:0,y1:1.2});col.push({x0:-1.6,x1:0,z0:-28,z1:-26.7,y0:0,y1:1.2});}
  {const g=Pr.C.pail({water:M.foul,level:.35,label:false,ha:1.1});const dm=Pr.MAT.plastic(0x8e8c84),pm=Pr.MAT.pail();g.traverse(o=>{if(o.isMesh&&o.material===pm)o.material=dm;});g.rotation.y=2;addItem('M3',g,-1.7,0,-26.7,.2);}
  // 排水溝 M7
  {const g=new THREE.Group();mesh(new THREE.BoxGeometry(.6,.02,9),M.foul,0,.015,0,g);for(let i=0;i<9;i++){if(i===2||i===3||i===6)continue;mesh(new THREE.BoxGeometry(.64,.04,.9),M.metal,0,.04,-4+i,g);}
   addItem('M7',g,6.42,0,-16.5,0);}
  // 機車、往二樓指示
  [[-7,-1.2],[-6,-1.2]].forEach(p=>{const s=new THREE.Group();mesh(new THREE.BoxGeometry(.4,.5,1.3),C(0x22262a),0,.6,0,s);mesh(new THREE.BoxGeometry(.3,.5,.3),C(0x0c0c0c),0,.27,.5,s);mesh(new THREE.BoxGeometry(.3,.5,.3),C(0x0c0c0c),0,.27,-.5,s);s.position.set(p[0],0,p[1]);scene.add(s);col.push({x0:p[0]-.3,x1:p[0]+.3,z0:p[1]-.7,z1:p[1]+.7,y0:0,y1:1.2});});
  sign(['2F 住家','→'],'#1c2a3a','#c8d0d8',.9,.6,6.83,2.6,-23.4,-Math.PI/2,48);

  /* ===== 樓梯間 1→2 ===== */
  wX(10,-26,-14,0,7,conc);wZ(-26,7.15,10,0,7,conc);wZ(-14,7.15,10,0,7,conc);
  box(3,.2,2.5,8.5,3.5,-15.25,conc,nb);box(3.3,.2,12.3,8.5,7.1,-20,conc,nb);
  for(let i=0;i<18;i++)box(2.7,.2,7/18+.02,8.5,(i+1)*.2-.1,-23.5+(i+.5)*7/18,conc,nb);
  box(2.7,.2,2.5,8.5,-.1,-24.75,conc,nb);
  {const l=new THREE.PointLight(0x80603a,.5,7,1.5);l.position.set(8.5,6.2,-15.4);scene.add(l);anim.push(t=>{l.intensity=.4+Math.sin(t*2.3)*.1;});}

  /* ===== 二樓：住家 ===== */
  wX(7,-28,0,F2,3.4,plast,[[-16.1,-14.5]]);
  wX(4.8,-25.5,0,F2,3.4,plast,[[-23.78,-22.82],[-9.4,-8]]);
  wX(-12,-28,0,F2,3.6,MT.wall2o);wZ(-28,-12,7,F2,3.6,MT.wall2o);
  box(2.05,.04,28,5.83,F2+.02,-14,floor2,nb);
  [4.97,6.83].forEach(x=>box(.03,.26,27.6,x,F2+.15,-14,C(0x18161a),nb));
  // 走廊盡頭的窗
  box(2.05,1,.2,5.83,F2+.5,-.1,plast);col.push({x0:4.8,x1:7,z0:-.25,z1:0,y0:F2,y1:F3});
  mesh(new THREE.PlaneGeometry(2.05,2.4),B(0xaab2c8),5.83,F2+2.2,.02);
  {const b=mesh(new THREE.PlaneGeometry(2.05,2.4),bars,5.83,F2+2.2,-.04);b.material=bars.clone();b.material.map=bars.map.clone();b.material.map.needsUpdate=true;b.material.map.repeat.set(3,1);}
  {const l=new THREE.PointLight(0xa0aac8,1.1,17,1.4);l.position.set(5.83,F2+2.2,-1);scene.add(l);}
  // 鐵窗（裝飾）
  [-4,-12.2,-18.5,-22.5].forEach(z=>{box(.04,1.1,1.5,6.84,F2+2,z,C(0x0c0c10),nb);const b=mesh(new THREE.PlaneGeometry(1.5,1.1),bars,6.8,F2+2,z);b.rotation.y=-Math.PI/2;});
  [-2,-14.5].forEach(z=>{box(.04,1.1,1.5,4.96,F2+2,z,C(0x0c0c10),nb);const b=mesh(new THREE.PlaneGeometry(1.5,1.1),bars,5,F2+2,z);b.rotation.y=Math.PI/2;});
  const redM=t=>new THREE.MeshPhongMaterial({map:signTex(t,'#a01c14','#e8c040',70)});
  const doorDeco=(z,no)=>{const dd=box(.06,2.05,.95,4.98,F2+1.03,z,M.wood,nb);const b=mesh(new THREE.PlaneGeometry(.95,2.05),bars,5.03,F2+1.03,z);b.rotation.y=Math.PI/2;
    sign(['康樂市場','2樓之'+no],'#2a8a5a','#f0f0e8',.42,.3,4.96,F2+2.45,z+.2,Math.PI/2,46);b.userData.door=dd;return b;};
  doorDeco(-5.6+2,1);
  // 二樓之2：會打開的木門與鐵門，門後是一個小客廳
  {const zh=-22.825,pw=new THREE.Group(),pg=new THREE.Group();pw.position.set(4.9,F2,zh);pg.position.set(5.0,F2,-23.775);scene.add(pw);scene.add(pg);
   const wood=new THREE.Mesh(new THREE.BoxGeometry(.05,2.05,.95),M.wood);wood.position.set(0,1.03,-.475);pw.add(wood);
   const knob=new THREE.Mesh(new THREE.SphereGeometry(.03,6,5),C(0xb0a070));knob.position.set(.05,1.0,-.85);pw.add(knob);
   const gate=new THREE.Mesh(new THREE.PlaneGeometry(.95,2.05),bars);gate.rotation.y=Math.PI/2;gate.position.set(.02,1.03,.475);pg.add(gate);
   const gf=new THREE.Mesh(new THREE.BoxGeometry(.03,2.05,.03),C(0x26262a));gf.position.set(.02,1.03,.94);pg.add(gf);
   rayList.push(wood);gate.userData.door=wood;G.doorX=gate;
   sign(['康樂市場','2樓之2'],'#2a8a5a','#f0f0e8',.42,.3,4.96,F2+2.45,-22.5,Math.PI/2,46);
   col.push({x0:4.6,x1:5.0,z0:-23.8,z1:-22.8,y0:F2,y1:F2+2.2});
   let tgt=0,cur=0;G.setDoorX=o=>{tgt=o?1:0;};
   anim.push(()=>{if(cur===tgt)return;cur+=Math.sign(tgt-cur)*(tgt?.12:.25);cur=Math.max(0,Math.min(1,cur));pw.rotation.y=1.55*cur;pg.rotation.y=1.75*cur;});
   // 門框
   box(.12,.08,1.1,4.85,F2+2.12,-23.3,C(0x2a2622),nb);[-23.83,-22.77].forEach(z=>box(.12,2.1,.06,4.85,F2+1.05,z,C(0x2a2622),nb));
   // 房間
   const r0=1.8,r1=4.65,z0=-25.35,z1=-21.6;
   wX(r0,z0,z1,F2,3.4,plast);wZ(z1,r0,r1,F2,3.4,plast);
   box(r1-r0,.04,z1-z0,(r0+r1)/2,F2+.02,(z0+z1)/2,MT.floor40,nb);box(r1-r0,3.4,.04,(r0+r1)/2,F2+1.7,z0+.03,plast,nb);
   HD.sofa(2.35,F2,-23.4,Math.PI/2);col.push({x0:1.9,x1:2.8,z0:-24.6,z1:-22.2,y0:F2,y1:F2+.9});
   box(.55,.42,1,3.2,F2+.21,-23.4,M.wood,nb);
   box(.12,.03,.18,3.15,F2+.44,-23.2,C(0x2a2a2a),nb);mesh(new THREE.CylinderGeometry(.04,.035,.11,8),C(0xd8d4c8),3.25,F2+.48,-23.65);
   box(.45,.55,1.2,4.35,F2+.28,-24.65,M.wood,nb);box(.08,.6,.95,4.3,F2+.86,-24.65,C(0x121214),nb);
   {const scr=box(.01,.52,.86,4.25,F2+.86,-24.65,new THREE.MeshBasicMaterial({color:0x8fa8ff}),nb);const l=new THREE.PointLight(0x8fa8ff,.9,6,1.5);l.position.set(3.7,F2+1,-24.5);scene.add(l);
    anim.push(t=>{const k=.7+.3*Math.sin(t*7.3)*Math.sin(t*2.1+1);l.intensity=.9*k;scr.material.color.setRGB(.45*k+.1,.55*k+.12,.9*k+.1);});}
   box(.3,.9,.6,4.45,F2+.45,-22.2,M.wood,nb);for(let i=0;i<3;i++)box(.22,.08,.26,4.45,F2+.2+i*.28,-22.2+(i%2?.1:-.1),C([0x2a2a2e,0x5a4a3a,0x7a2a2a][i]),nb);
   {const cal=mesh(new THREE.PlaneGeometry(.36,.5),new THREE.MeshPhongMaterial({map:signTex(['','11月',''],'#f0ece0','#a01c14',40)}),1.82,F2+1.6,-22.6);cal.rotation.y=Math.PI/2;}
   box(.5,.02,.5,1.7+.4,F2+1.0,-25.3,C(0x6a6458),nb);
   const lamp=new THREE.PointLight(0xffb070,.25,4,1.6);lamp.position.set(2.2,F2+2.6,-23.5);scene.add(lamp);
  }
  {const x=person(5.35,F2,-23.3,1.02,{shirt:0xe4ded2,pants:0x2a3a5a,shoes:0x6a6a6a,hair:0x1a1816,style:'short',age:.5,mood:'angry',pose:'angry',beard:true},'X','交談：二樓之2的住戶');x.visible=false;x.rotation.y=Math.PI/2;K.unblock('npcX');}
  // 二樓之3（未入戶）
  {const d=box(.06,2.05,.95,4.98,F2+1.03,-20,M.wood,nb);const b=doorDeco(-20,3);const it={type:'talk',key:'N',label:'敲門：二樓之3',after:'門後沒有聲音了。通知單還夾在門縫裡。'};interact(d,it);interact(b,it);}
  // 二樓之5
  wZ(-5,-3,4.65,F2,3.4,plast);wZ(-12,-3,4.65,F2,3.4,plast);wX(-3,-12,-5,F2,3.4,plast);
  box(7.6,.04,6.8,.9,F2+.02,-8.5,MT.floor40,nb);
  {const d=box(.06,2.1,1.38,4.8,F2+1.05,-8.7,bars,{id:'gateR'});G.doorR=d;interact(d,{type:'talk',key:'R',label:'按門鈴：二樓之5',hideAfter:true});
   sign(['康樂市場','2樓之5'],'#2a8a5a','#f0f0e8',.42,.3,4.96,F2+2.45,-7.9,Math.PI/2,46);
   const p1=mesh(new THREE.PlaneGeometry(.5,1.1),new THREE.MeshPhongMaterial({map:signTex(['迎','春','納','福'],'#a01c14','#e8c040',46)}),4.96,F2+1.4,-7.75);p1.rotation.y=Math.PI/2;p1.material.map.repeat.set(1,1);
   const p2=mesh(new THREE.PlaneGeometry(.4,.4),redM(['福']),4.96,F2+1.5,-9.75);p2.rotation.y=Math.PI/2;p2.rotation.z=Math.PI/4;
   person(4.1,F2,-8.7,1,{shirt:0x4a5a6a,shirt2:0x6a7a8a,pattern:'stripe',pants:0x3a3a44,hair:0x1a1816,style:'side',age:.45,glasses:true,mood:'tired'},'R','交談：林先生');}
  // 屋內
  {const g=new THREE.Group();mesh(new THREE.BoxGeometry(.75,1.7,.7),C(0xb8b8ae),0,.85,0,g);mesh(new THREE.BoxGeometry(.77,.02,.72),C(0x3a3a38),0,1.15,0,g);mesh(new THREE.BoxGeometry(.6,.05,.5),C(0x2a2a28),0,.06,-.2,g);addItem('R3',g,-2.3,F2,-11.3,.42,.9);}
  box(1.4,.5,.5,1.4,F2+.25,-11.55,M.wood);box(.8,.55,.45,1.4,F2+.8,-11.55,C(0x161618),nb);
  {const scr=box(.62,.4,.02,1.4,F2+.82,-11.31,B(0x8fa8ff),nb);const l=new THREE.PointLight(0x8fa8ff,.8,8,1.4);l.position.set(1.4,F2+1,-10.6);scene.add(l);
   anim.push(t=>{const k=.55+.45*Math.abs(Math.sin(t*7.3)*Math.sin(t*2.1+1)*Math.sin(t*13));l.intensity=k*.9;scr.material.color.setRGB(.45*k+.1,.55*k+.1,.9*k+.1);});}
  box(1.1,.45,2,-2.3,F2+.23,-6.3,C(0x4a4038));box(1.1,.12,2,-2.3,F2+.5,-6.3,C(0x6a6458),nb);
  box(.8,.72,.8,1.5,F2+.36,-8.9,M.wood);box(.4,.45,.4,1.5,F2+.23,-9.9,C(0x7a2a22));
  wZ(-7.3,2.4,4.65,F2,3.4,tile,[[2.6,3.9]]);wX(2.4,-7.3,-5.15,F2,3.4,tile);
  {const g=Pr.C.lidBucket();addItem('R4',g,4.1,F2,-5.75,.3);}
  // 走廊：燒金桶、積水
  {const g=Pr.C.burnBarrel();addItem('R2',g,6.4,F2,-11.3,.3);}
  {const g=new THREE.Group();mesh(new THREE.BoxGeometry(1.6,.02,1.5),M.water,0,.045,0,g);addItem('R1',g,5.8,F2,-3.2,0);box(1.4,.02,1.2,5.8,F3-.21,-3.2,C(0x0c0c0e),nb);}
  figure(5.83,F2,-1.3);
  // 天花板（二樓）＝屋頂樓板
  box(19,.2,25.5,-2.5,F3-.1,-12.75,ceil,nb);box(9.8,.2,2.5,-7.1,F3-.1,-26.75,conc,nb);box(2.2,.2,2.5,5.9,F3-.1,-26.75,conc,nb);

  /* ===== 樓梯 2→頂樓 ===== */
  wZ(-25.5,-5,4.65,F2,3.6,conc);wX(-5,-28,-25.35,F2,6.2,conc);
  for(let i=0;i<18;i++)box(7/18+.02,.2,2.2,4.8-(i+.5)*7/18,F2+(i+1)*.2-.1,-26.75,conc,nb);
  wZ(-25.5,-5,4.95,F3,2.6,conc,[[-4.5,-3.1]],2.1);wX(4.8,-28,-25.35,F3,2.6,conc);wZ(-28,-5,4.95,F3,2.6,conc);
  box(10.2,.2,3,-.1,F3+2.7,-26.75,conc,nb);

  /* ===== 頂樓（依現場照片） ===== */
  box(19,.03,25.5,-2.5,F3+.015,-12.75,roofM,nb);box(7,.03,2.5,-8.5,F3+.015,-26.75,roofM,nb);box(2.2,.03,2.5,5.9,F3+.015,-26.75,roofM,nb);
  wX(-12,-28,0,F3,1.1,para);wX(7,-28,0,F3,1.1,para);wZ(0,-11.85,6.85,F3,1.1,para);wZ(-28,-11.85,-5.15,F3,1.1,para);wZ(-28,4.95,6.85,F3,1.1,para);
  const Y=F3,PC=Pr.C,PT=Pr.potted,rnd=Math.random,GX0=-4.6,GX1=4.6,GZ1=-2.2;
  const place=(g,x,z,r,y,ry)=>{g.position.set(x,Y+(y||0),z);if(ry)g.rotation.y=ry;scene.add(g);if(r)col.push({x0:x-r,x1:x+r,z0:z-r,z1:z+r,y0:Y,y1:Y+1.2});return g;};
  const frameM=C(0x34302c),rustM=C(0x6a4a34);
  const fence=(x0,z0,x1,z1,h,solid)=>{const L=Math.hypot(x1-x0,z1-z0),cx=(x0+x1)/2,cz=(z0+z1)/2,ry=-Math.atan2(z1-z0,x1-x0);
    const m=mesh(new THREE.PlaneGeometry(L,h),Pr.B.netMat('w','#9aa09a',8,1,L/.45,h/.45),cx,Y+h/2,cz);m.rotation.y=ry;
    const n=Math.max(1,Math.round(L/1.3));for(let i=0;i<=n;i++){const f=i/n;box(.045,h,.045,x0+(x1-x0)*f,Y+h/2,z0+(z1-z0)*f,frameM,nb);}
    [.03,h*.5,h].forEach(yy=>{const b=mesh(new THREE.BoxGeometry(L,.035,.035),frameM,cx,Y+yy,cz);b.rotation.y=ry;});
    if(solid!==false)col.push({x0:Math.min(x0,x1)-.05,x1:Math.max(x0,x1)+.05,z0:Math.min(z0,z1)-.05,z1:Math.max(z0,z1)+.05,y0:Y,y1:Y+h});};
  // 入口的網籬（中間是網門）
  fence(-12,-14,-.7,-14,2.4);fence(.7,-14,7,-14,2.4);
  col.push({x0:-.7,x1:.7,z0:-14.08,z1:-13.92,y0:Y,y1:Y+2.4,id:'gateG'});
  {const gate=new THREE.Group();const gn=mesh(new THREE.PlaneGeometry(1.4,2),Pr.B.netMat('w','#9aa09a',8,1,3.1,4.4),.7,1,0,gate);
   [[0,1,.04,2],[1.4,1,.04,2],[.7,0,1.4,.04],[.7,2,1.4,.04],[.7,1,1.4,.03]].forEach(b=>mesh(new THREE.BoxGeometry(b[2],b[3],.04),frameM,b[0],b[1],0,gate));
   gate.position.set(-.7,Y,-14);scene.add(gate);G.gateG=gate;interact(gate,{type:'talk',key:'G',label:'交談：阿滿姨',hideAfter:true});}
  person(0,F3,-14.6,.9,{sex:'f',shirt:0x8a5a7a,shirt2:0xe0c070,pattern:'floral',pants:0x3a3a4a,hair:0x2a2220,style:'perm',age:.7,apron:0x6a8aa8,pose:'hold',sleeves:'long'},'G','交談：阿滿姨');
  // 左右與後方圍籬
  fence(GX0,-14,GX0,GZ1,2.7);fence(GX1,-14,GX1,GZ1,2.7);fence(GX0,GZ1,GX1,GZ1,2.7);
  // 黑色遮陽網（右側）
  {const m=mesh(new THREE.PlaneGeometry(7.2,2.7),Pr.B.netMat('shade','#070707',4,3,40,14),GX1-.06,Y+1.35,-5.8);m.rotation.y=-Math.PI/2;m.material.opacity=.92;
   const m2=mesh(new THREE.PlaneGeometry(2.2,1.6),Pr.B.netMat('shade2','#0a0a0a',4,3,12,8),GX1-.3,Y+2.0,-2.9);m2.rotation.set(0,-1.2,.1);
   anim.push(t=>{m2.rotation.y=-1.2+Math.sin(t*.8)*.06;});}
  // 木柱、橫梁、塑膠布頂棚
  [[GX0,-14],[GX1,-14],[GX0,GZ1],[GX1,GZ1],[GX0,-8],[GX1,-8],[-.75,-14],[.75,-14],[-1.6,GZ1]].forEach(p=>box(.1,2.95,.1,p[0],Y+1.47,p[1],M.wood,nb));
  [-14,-8,GZ1].forEach(z=>box(9.3,.08,.08,0,Y+2.92,z,M.wood,nb));[GX0,0,GX1].forEach(x=>box(.08,.08,11.9,x,Y+2.94,-8.1,M.wood,nb));
  [[-1.9,-11,5.4,6.2,.05],[2.8,-11.2,3.6,5.4,-.06],[0,-4.6,9.2,4.6,.04]].forEach((t,i)=>{const m=mesh(new THREE.PlaneGeometry(t[2],t[3]),Pr.B.tarp(),t[0],Y+3.0,t[1]);m.rotation.set(-Math.PI/2+t[4],0,i*.03);});
  [[1.1,-7.6,.7,.9],[-3.2,-7.4,.5,1.1],[3.6,-3.3,.6,.7]].forEach((t,i)=>{const m=mesh(new THREE.PlaneGeometry(t[2],t[3]),Pr.B.tarp(),t[0],Y+2.98-t[3]/2,t[1]);anim.push(tt=>{m.rotation.x=Math.sin(tt*1.1+i*2)*.18;m.rotation.y=Math.sin(tt*.7+i)*.2;});});
  // 鄰棟的鏽浪板屋頂與背景建築
  {const m=box(6.6,.04,10,-8.3,Y+1.15,-8,Pr.B.corr(0x8a5a3c),{collide:false,uv:1});m.rotation.z=.16;[-11.2,-5.4].forEach(x=>[-12.5,-3.5].forEach(z=>box(.07,1.2,.07,x,Y+.6,z,rustM,nb)));
   const m2=box(2.2,.04,8,5.8,Y+1.0,-7,Pr.B.corr(0x7a6a5a),{collide:false,uv:1});m2.rotation.z=-.12;}
  [[-6,8.5,6,3.6],[2,9.5,7,4.6],[9,8,4,3]].forEach((b,i)=>{box(b[2],b[3],3,b[0],Y+b[3]/2-1,b[1],M.plaster,{collide:false,uv:3});
    for(let k=0;k<3;k++){const w=box(.9,.7,.05,b[0]-b[2]/3+k*b[2]/3,Y+b[3]-2,b[1]-1.53,B(k===1&&i===1?0xb89a5a:0x16161a),nb);const br=mesh(new THREE.PlaneGeometry(.9,.7),bars,b[0]-b[2]/3+k*b[2]/3,Y+b[3]-2,b[1]-1.56);br.rotation.y=Math.PI;}});
  // 地上的白色漆帶
  scene.add(Pr.ribbon([[-1.0,-13.9],[-.55,-12.2],[.2,-10.4],[1.1,-8.4],[1.9,-6.4],[2.5,-4.6],[2.75,-3.4]],.62,Y+.04,Pr.B.stripe()));
  scene.add(Pr.ribbon([[-2.3,-13.9],[-2.45,-12.9],[-2.5,-12.3]],.55,Y+.04,Pr.B.stripe()));
  /* 背牆：浪板、層架 */
  box(4.0,1.05,.03,-1.2,Y+.53,GZ1-.04,Pr.B.corr(0xb0905c),{collide:false,uv:1});
  box(3.75,1.05,.03,2.72,Y+.53,GZ1-.04,Pr.B.corr(0xd6d4ca),{collide:false,uv:1});
  {const ply=box(1.1,1.4,.03,-4.0,Y+.7,-2.45,P(tex((g,n)=>{noise(g,n,196,180,150,16);stains(g,n,'#7a6a50',6);}),{},1),{collide:false});ply.rotation.set(-.12,.15,0);}
  {const sz=-2.62,sy=1.12;box(9.0,.03,.8,0,Y+sy,sz,frameM,nb);const top=mesh(new THREE.PlaneGeometry(9,.8),Pr.B.netMat('rack','#5a5650',6,1,40,4),0,Y+sy+.02,sz);top.rotation.x=-Math.PI/2;
   [-4.45,-1.6,1.4,4.45].forEach(x=>[sz-.38,sz+.38].forEach(z=>box(.04,sy,.04,x,Y+sy/2,z,frameM,nb)));
   const cs=box(1.7,.02,.85,-3.4,Y+sy+.05,sz,Pr.B.corr(0x8a6040),{collide:false,uv:1});cs.rotation.z=.04;
   box(1.3,.02,.85,2.6,Y+sy+.05,sz,Pr.B.corr(0xb8b4aa),{collide:false,uv:1});
   [[-2.3,'terraS','strap'],[-1.7,'terraS','strap'],[-1.05,'bowl','strap'],[-.45,'terraS','succulent'],[.15,'bowl','strap'],[.7,'terraS','strap'],[1.25,'terraS','succulent'],[3.6,'bowl','strap']].forEach(q=>place(PT(q[1],q[2],{s:1,ps:1.1}),q[0],sz+(rnd()-.5)*.25,0,sy+.03));
   // 右上方鉸鏈鐵網門
   const dg=new THREE.Group();mesh(new THREE.PlaneGeometry(1.8,1.3),Pr.B.netMat('w','#9aa09a',8,1,4,3),-.9,.65,0,dg);[[0,.65,.04,1.3],[-1.8,.65,.04,1.3],[-.9,0,1.8,.04],[-.9,1.3,1.8,.04],[-.9,.65,1.8,.03]].forEach(b=>mesh(new THREE.BoxGeometry(b[2],b[3],.04),rustM,b[0],b[1],0,dg));
   dg.position.set(4.4,Y+sy+.15,GZ1-.1);dg.rotation.y=-.45;scene.add(dg);}
  /* 層架下的一排容器 */
  const BZ=-2.78;
  {const g=new THREE.Group();[0,.08].forEach(y=>{const p=PC.pail({handle:false,lk:'r',l1:'#7a2a38',l2:'#7a2a38'});p.rotation.x=Math.PI;p.position.y=.37+y;g.add(p);});place(g,-3.12,BZ,.19);}
  {const g=new THREE.Group();const xs=[-.81,-.27,.27,.81],lv=[.86,.78,.82,.72];xs.forEach((x,i)=>{const p=PC.pail({water:algae,level:lv[i],ha:i%2?.5:-.6,lk:'g'+i,l1:i%2?'#8a2a3a':'#2a4a9a',l2:'#2a4a9a'});p.position.set(x,0,(rnd()-.5)*.06);p.rotation.y=rnd()*6;g.add(p);});
   const sc=PC.scoop();sc.position.set(-.1,.37,.03);sc.rotation.set(.0,.4,-.5);g.add(sc);
   addItem('G1',g,-1.62,Y,BZ,0,.85,1.3);col.push({x0:-2.65,x1:-.6,z0:BZ-.2,z1:BZ+.2,y0:Y,y1:Y+1});G.items.G1.r=.8;}
  {const g=PC.pinkBarrel({water:Pr.MAT.dark(),level:.92});addItem('G2',g,.0,Y,BZ-.02,.33,1.1);}
  {const g=new THREE.Group();[0,.07,.14].forEach((y,i)=>{const p=PC.pail({handle:i===2,label:i===0,lk:'s'});p.position.y=y;g.add(p);});const rb=PC.basinStack(1,{hex:0xb0342a,s:.6});rb.position.y=.51;g.add(rb);place(g,.62,BZ,.19);}
  {const g=new THREE.Group();g.add(PC.basinStack(3,{s:1}));const j=PC.jar();j.position.y=.37;j.rotation.x=.08;g.add(j);
   const d=mesh(new THREE.CircleGeometry(.27,16),M.water,0,.33,0,g);d.rotation.x=-Math.PI/2;addItem('G4',g,1.22,Y,BZ,.37);}
  {const g=PC.vase({water:M.water,level:.7});addItem('G3',g,1.92,Y,BZ,.2,.95);}
  {const g=new THREE.Group();g.add(PC.jar());const j=PC.jar();j.position.y=.16;j.scale.setScalar(.85);g.add(j);place(g,2.42,BZ,.2);}
  place(PT('bowl','succulent',{s:1}),2.9,BZ,.22);place(PT('terraS','strap'),3.32,BZ+.05,.13);
  [[3.75,0],[4.2,.05]].forEach(q=>{box(.24,.1,.12,q[0],Y+.05,BZ,Pr.B.brick(),nb);place(PT('terraS','succulent',{s:.9}),q[0],BZ+q[1],.13,.1);});
  /* 左側：鐵網盆架 */
  {const x0=-4.55,x1=-3.55,z0=-12.6,z1=-4.3,h=.62,cx=(x0+x1)/2,cz=(z0+z1)/2;
   const top=mesh(new THREE.PlaneGeometry(x1-x0,z1-z0),Pr.B.netMat('rack','#5a5650',6,1,5,40),cx,Y+h,cz);top.rotation.x=-Math.PI/2;
   [x0,x1].forEach(x=>[z0,cz,z1].forEach(z=>box(.04,h,.04,x,Y+h/2,z,frameM,nb)));box(.03,.03,z1-z0,x1,Y+h,cz,frameM,nb);box(.03,.03,z1-z0,x0,Y+h,cz,frameM,nb);
   col.push({x0:x0-.05,x1:x1+.08,z0:z0,z1:z1,y0:Y,y1:Y+1.2});
   [[-12,'basin','strap',1],[-10.9,'deep','dendrobium',.75],[-9.7,'basin','hosta',.8],[-8.5,'basin','strap',1],[-7.3,'bowl','strap',1.1],[-6.2,'basin','silver',.9],[-5.1,'bowl','caladium',.9]].forEach(q=>place(PT(q[1],q[2],{s:q[1]==='deep'?.85:1,ps:q[3]}),cx,q[0],0,h+.01));
   {const r=PC.basinStack(2,{hex:0xa8402e,s:.9});place(r,cx+.05,-4.75,0,h);}
   [[-11.4,5],[-9,4],[-6.6,6],[-5.2,3]].forEach(q=>place(PC.saucerStack(q[1],{s:1.1}),cx,q[0],0));
   const bs=PC.saucerStack(1,{s:1.5});bs.traverse(o=>{if(o.isMesh)o.material=Pr.MAT.glaze(0x3a5aa0);});place(bs,cx+.5,-12.9,0);}
  /* 石斛蘭 G5（水泥磚上的大釉盆） */
  {const g=new THREE.Group();mesh(new THREE.BoxGeometry(.4,.24,.4),conc,0,.12,0,g);const pt=PT('deep','dendrobium',{s:1.05,saucer:true,water:M.water,glaze:0x7ab4a8});pt.position.y=.24;g.add(pt);
   addItem('G5',g,-2.7,Y,-11.1,.44,1.3);}
  place(PT('terra','moss',{s:1.35}),-2.0,-10.25,.24);place(PT('terra','moss',{s:.9}),-1.95,-9.55,.16);place(PT('terraS','strap'),-2.6,-9.4,.12);
  // 白色水桶裡的波士頓蕨
  {const g=new THREE.Group();g.add(PC.pail({handle:false,lk:'f',l1:'#2a4a9a',l2:'#2a4a9a'}));const sd=mesh(new THREE.CircleGeometry(.15,14),Pr.MAT.soil(),0,.33,0,g);sd.rotation.x=-Math.PI/2;
   const fg=new THREE.Group();Pr.PLANT.fern(fg,1.1);Pr.flatten(fg);fg.position.y=.33;g.add(fg);place(g,-3.55,-13.25,.2);}
  /* 右側：磚上的一排釉盆 */
  [[3.95,-12.6,'basin','moss',1],[3.95,-11.5,'deep','hosta',1.1],[3.95,-10.35,'basin','hosta',1],[3.3,-9.6,'terra','caladium',1],[3.95,-9.2,'basin','hosta',1.05],[3.3,-8.55,'terra','caladium',.9],
   [3.95,-8.0,'basin','hosta',1],[3.95,-6.85,'basin','silver',1],[3.3,-6.2,'basin','silver',.9],[3.95,-5.7,'basin','hosta',.95],[3.95,-4.55,'terra','strap',1],[3.35,-4.0,'bowl','succulent',1]].forEach(q=>{
    const onB=q[0]>3.6;if(onB)[-.13,.13].forEach(dz=>box(.24,.1,.11,q[0],Y+.05,q[1]+dz,Pr.B.brick(),nb));
    place(PT(q[2],q[3],{s:q[2]==='deep'?.9:1,ps:q[4]*1.25}),q[0],q[1],q[2]==='terra'||q[2]==='bowl'?.2:.36,onB?.1:0,rnd()*6);});
  {const sd=PT('basin','strap',{s:.8});place(sd,3.95,-3.3,.3);}
  // 頂樓北側：水塔、晒衣線
  {const t=HD.waterTower(-8.5,-20,{y:F3,drip:false,ry:2.2});col.push({x0:-9.5,x1:-7.5,z0:-21,z1:-19,y0:F3,y1:F3+3.5});deco(t,'查看：頂樓水塔','水塔的蓋子是蓋好的，人孔蓋也鎖著。水塔要定期確認蓋子密合。');}
  box(.06,2,.06,-2,F3+1,-17,C(0x3a3c40),nb);box(.06,2,.06,5,F3+1,-17,C(0x3a3c40),nb);box(7,.02,.02,1.5,F3+1.9,-17,C(0x888888),nb);
  [[-.5,.8],[1,1.1],[2.8,.7]].forEach((c,i)=>{const m=mesh(new THREE.PlaneGeometry(c[1],1),new THREE.MeshPhongMaterial({color:[0x9a9a92,0x6a5a6a,0x8a8a7a][i],side:THREE.DoubleSide}),c[0],F3+1.38,-17);anim.push(t=>{m.rotation.x=Math.sin(t*1.3+i)*.12;});});
  box(.9,.6,.4,3.8,F3+.3,-25.1,C(0xa8a8a0));
 },

 onUnlock(key,K){const G=K.G;
  if(key==='M'){K.unblock('gateM');G.rope.visible=false;K.moveNpc('M',2.15,0,-1.6);}
  if(key==='R'){K.unblock('gateR');G.doorR.position.set(4.05,F2+1.05,-9.45);G.doorR.rotation.y=Math.PI/2;K.moveNpc('R',.2,F2,-6.2);K.burst(.4,400,.15);}
  if(key==='N'){K.burst(.5,170,.2);K.sub('（門後有拖著腳步的聲音，停在門邊。沒有開門。）',4.5);K.sub('學長：「里長說那戶是獨居的阿公，重聽，晚上不開門。記下來，白天請里長陪你再來。」',6.5,true);}
  if(key==='G'){K.unblock('gateG');G.gateG.rotation.y=-1.35;K.moveNpc('G',1.75,F3,-12.9);}
 },
 tick(K,dt,p){const G=K.G,S=G.S,e=S.ev;
  if(!e.bang&&S.unlocked.M&&G.foot<1&&p.z<-7.5&&p.x<6.8){e.bang=1;K.burst(.7,220,.45);K.sub('（鐵捲門響了一聲。）',3);K.sub('學長：「風吧。那一排店面十幾年沒開過了。」',4.5,true);}
  if(!e.up&&G.foot>3){e.up=1;K.setObj();K.sub('學長：「二樓還有住戶。按門鈴，等人來開。沒人應門的也要記錄。」',5.5,true);}
  if(!e.fig&&G.foot>3.4&&G.foot<4&&p.x>4.95&&p.x<6.85&&p.z<-6&&p.z>-17&&-Math.cos(G.yaw)>.75){e.fig=1;G.flick=1.3;G.figure.visible=true;K.burst(.9,150,.5);
   K.sub('……',1.6);K.sub('學長：「走廊盡頭是窗戶，那邊沒有路。……你看到什麼？」',5,true);}
  if(!e.angry&&!G.paused&&G.foot>3.4&&G.foot<4&&p.x>4.95&&p.z<-20.6&&p.z>-25.8){e.angry=1;openX(K);}
  if(!e.roof&&G.foot>7){e.roof=1;K.sub('（天快黑了。風裡有泥土和青苔的味道。）',4);K.sub('學長：「頂樓是最後一個點。黃昏斑蚊最兇，不要在水桶旁邊站太久。」',5.5,true);}
 }
};
})();
