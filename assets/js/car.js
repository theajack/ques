

function addCarGeneral(){
  addQuestion({
    type:"number",
    title:"根据您早上开车上班的经历：</br>\
    <span class='bold-normal'>当交通较为通畅，上班较快情况下，大概需要_分钟</br>\
    当交通较为拥堵，上班较慢情况下，大概需要_分钟</span> "
  });
  addQuestion({
    type:"number",
    title:"您过去一个月早上上班的平均出行时间约为_分钟"
  });
  addQuestion({
    type:"single",
    title:"是否需要停车费、过路费？",
    list:["是","否"],
    add:wrpperAdd(geneNumberItem("停车费、过路费共为_元")),
    indexs:[0]
  });
  addQuestion({
    type:"single",
    title:"除了自驾，从您家到公司，是否可以采用地铁?",
    list:["可以","可以但很不方便（由于需要多次换乘/家或公司离地铁站远/时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果采用地铁，通常情况下上班单程出行时间大概范围为：_分钟到_分钟")+
          wrpperAddTitle("通常情况下，地铁内是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
  addQuestion({
    type:"single",
    title:"除了自驾，从您家到公司，是否可以采用公交?",
    list:["可以","可以但很不方便（由于需要多次换乘/家或公司离地铁站远/时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果采用公交，通常情况下上班单程出行时间大概范围为：_分钟到_分钟")+
          wrpperAddTitle("通常情况下，公交内是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
}

var carSen;
var times;
function appendCarSenario1(){
  setLittleTitle("自驾与地铁情景题");
  carSen=new Car(cnum(answer[4][1]),cnum(answer[4][0]),getCost(),0,0);
  senario.append(carSen.getSenario1());
  senario.last().each(function(item,i){
    addQuestion({
      type:"single",
      title:"从您家到工作地点，假设现在对自驾进行政策性收费，并有新的地铁线路"+(i+1)+"开通（信息如下），您上班是否会放弃自驾选择地铁？",
      list:["我仍然会选择自驾","我会放弃自驾转向新地铁"],
      size:"two",
      subTitle:"自驾与地铁情景题"+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):":"")+"</span>"
    });
    if(i==0){
      times=get10Nums(item[2],item[1]);
    }
    item.appendArray(times);
    var ctimes=get10Nums(item[5],item[4]);
    item.appendArray(times);
    J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
      getCostText(getCost(),item[0],transType),transType,times)
      +'<div class="middle">\
        <img src="assets/images/home_work.png" alt="" />\
      </div>'+geneSenario(getCostText(item[3],-1,"metro"),"metro",ctimes,item[6])));
  });
  btnEvent(appendCarSenario2);
  changeLength();
}
function appendCarSenario2(){
  setLittleTitle("自驾与公交情景题");
  addSenaAnswer();
  nextPage();
  senario.append(carSen.getSenario2());
  senario.last().each(function(item,i){
    addQuestion({
      type:"single",
      title:"从您家到工作地点，假设现在对自驾进行政策性收费，并有新的公交车线路"+(i+1)+"开通（信息如下），您是否上班会放弃自驾选择公交车？",
      list:["我仍然会选择自驾","我会放弃自驾转向新公交"],
      size:"two",
      subTitle:"自驾与公交情景题"+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):":"")+"</span>"
    });
    if(i==0){
      times=get10Nums(item[2],item[1]);
    }
    item.appendArray(times);
    var ctimes=get10Nums(item[5],item[4]);
    item.appendArray(times);
    J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
      getCostText(getCost(),item[0],transType),transType,times)
      +'<div class="middle">\
        <img src="assets/images/home_work.png" alt="" />\
      </div>'+geneSenario(getCostText(item[3],-1,"bus"),"bus",ctimes,item[6])));
  });
  btnEvent(function(){
    showLotter();
    btnEvent(function(){})
  });
  times=undefined;
}
function appendCarSenario3(){
  J.cls("lotter-wrapper").hide();
  J.id("paper").show();
  addSenaAnswer();
  nextPage();
  senario.append(carSen.getSenario3());
  senario.last().each(function(item,i){
    appendCarSenario3Content(item,i);
  });
  btnEvent(appendCarRest1);
  times=undefined;
}
function appendCarRest1(){
  addSenaAnswer();
  nextPage();
  addQuestion({
    type:"single",
    title:"请您回想过去一个月的上班过程：</br>其中您上班过程中开车上班的次数是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中您上班过程中采用地铁的次数是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中您采用公交的次数是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  
  addTable(
    ["我已经采用开车上班很长一段时间了。"
      ,"我出行时会习惯性选择小汽车出行。"
      ,"我会下意识地采用小汽车出行。"
      ,"如果不开车上班，我会感觉有些奇怪。"
      ,"我不会考虑其他出行选择，就会选择开车出行"
      ,"我很难不选择开车上班。"
      ,"开车上班已经是我的一个日常习惯。"
      ,"我不需要思考就会直接选择开车上班"],
    ["非常符合","较为符合","中立","不大符合","完全不符合"],
    "以下有八项描述，请选择所描述内容是否符合您的实际"
  );
  addPeopleFactor();
  addQuestion({
    type:"single",
    title:"是否已婚",
    list:["是","否"]
  });
  addQuestion({
    type:"single",
    title:"是否有小孩",
    list:["是","否"]
  });
  addTable(
    ["从我居住的地方，我愿意尝试使用公共交通上下班。"
      ,"我愿意减少小汽车出行，更多的使用公共交通。"],
    ["非常同意","较为同意","不一定","不太同意","完全不同意"],
    "请选择所描述内容是否符合您的实际或您是否同意"
  );
  addTable(
    ["我身边对我重要的人都希望我多采用公共交通方式而不是小汽车出行。"
      ,"在我居住或者工作地点的附近，没有比较方便的公共交通站点，采用公共交通上班不太方便。"
      ,"我在工作中需要经常使用小汽车进行，因此只能采用小汽车上下班而不是公共交通"
      ,"在我上下班过程中需要做其他的事情（例如接送孩子上下学或购物），因此必须使用小汽车上下班。"],
    ["非常符合","较为符合","中立","不大符合","完全不符合"]
  );
  
  
  addTable(
    ["公共交通主要是为低收入人群服务的。"
      ,"小汽车出行是一种身份的象征。"
      ,"一般收入高或者有一定身份的人不会使用公共交通。"
      ,"我习惯使用小汽车上班来自由的选择出行时间或路径"
      ,"上班过程中，小汽车出行比公共交通更加舒适。"
      ,"上班过程中，小汽车出行比公共交通更加安全。"
      ,"上班过程中，小汽车出行比公共交通更加快捷、自由与方便。"],
    ["非常同意","较为同意","不一定","不太同意","完全不同意"],
    "请选择所描述内容是否符合您的实际或您是否同意"
  );
  setLittleTitle("");
  btnEvent(appendCarSenario4);
}
function appendCarSenario4(){
  addAnswer();
  nextPage();
  senario.append(carSen.getSenario4(getDistance(),0));
  senario.last().each(function(item,i){
    addQuestion({
      type:"single",
      title:"从您家到工作地点，假设现在对您现在自驾的路线进行收费，并有新开通的线路"+i+"（信息如下），您是否会选择新的路线？",
      list:["我仍然会选择我的原路径","我会放弃原路径选择新路径"],
      size:"two",
      subTitle:"新路线情景题"+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):":"")+"</span>"
    });
    if(i==0){
      times=get10Nums(item[2],item[1]);
    }
    item.appendArray(times);
    var ctimes=get10Nums(item[5],item[4]);
    item.appendArray(ctimes);
    J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
      getCostText(getCost(),item[0],transType),transType,times,"none")
      +'<div class="middle">\
        <img src="assets/images/home_work.png" alt="" />\
      </div>'+geneSenario(getCostText(item[3],-1,"car"),"car",ctimes,"none")));
  });
  setLittleTitle("新路线情景题");
  btnEvent(appendCarRest2);
  times=undefined;
}
function appendCarRest2(){
  addSenaAnswer();
  nextPage();
  addTable(
    ["使用小汽车会增加尾气排放、环境污染和城市交通等社会问题。"
      ,"减少小汽车出行，多使用公共交通有利于帮助缓解交通拥堵与环境问题。"
      ,"我不太清楚公共交通是否比小汽车更加环保和有利于城市交通"
      ,"我觉得每个人都应该为减少城市交通拥堵、污染与能源消耗负一定责任"
      ,"一个人的贡献对缓解交通拥堵的效果是微不足道的。"
      ,"个人行为对交通拥堵与环境污染等改善是微不足道的，只能靠政府。"],
    ["非常同意","较为同意","不一定","不太同意","完全不同意"],
    "请选择所描述内容是否符合您的实际或您是否同意"
  );
  addTable(
    ["我觉得我有责任为减少交通问题奉献一份力，不管别人怎么做。"
      ,"我不会为过分使用小汽车造成城市交通问题而有负罪感。"
      ,"在生活中我正在尽量采用更加绿色的出行方式。"],
    ["非常符合","较为符合","中立","不大符合","完全不符合"],
    "请选择所描述内容是否符合您的实际或您是否同意"
  );

  addTable(
    ["准时性和发车频率"
      ,"费用"
      ,"灵活的出行时间/路线选择"
      ,"少出现拥堵或者意外的耽误时间"
      ,"总行程时间"
      ,"不易发生交通事故"
      ,"避免偷盗、抢劫和潜在的人身安全问题"
      ,"车内是否拥挤"
      ,"环境是否干净与嘈杂"
      ,"运行过程中是否颠簸与舒适"],
    ["非常重要","较为重要","一般","不大重要","完全不重要"],
    "在上班过程出行方式选择中，您认为以下因素的重要性是？"
  );
  btnEvent(end,"完成");
}

function getCarMoney(){
  return Math.ceil(getDistance()*0.7);
}

function appendCarSenario3Content(item,i){
  addQuestion({
    type:"single",
    title:"假设您工作地点更换到新的地点"+(i+1)+"，您的上班选择发生了很大改变，新的可选择三种交通方式情况如下，您会选择哪种交通方式。",
    list:["我选择自驾","我选择地铁","我选择公交"],
    size:"three",
    subTitle:"新工作情景题"+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):":"")+"</span>"
  });
  if(i==0){
    times=get10Nums(item[2],item[1]);
  }
  item.appendArray(times);
  var ctimes=get10Nums(item[5],item[4]);
  item.appendArray(ctimes);
  var c2times=get10Nums(item[9],item[8]);
  item.appendArray(c2times);
  J.id("quesWrapper").child().last().append(wrapperSena3(
    geneSenario3(item[0],transType,times)
    +geneSenario3(item[3],"metro",ctimes,item[6])
    +geneSenario3(item[7],"bus",c2times,item[10])
  ));
  setLittleTitle("新工作情景题");
  changeLength();
}



function geneSenario3(cost,type,x,i){
  var ctext=["有座位","站立，不拥挤","","站立，很拥挤"];
  var costText=(type=="car")?"费用":"票价";
 
  var n=0;
  if(type=="car"){
    n=1;
  }else if(type=="metro"){
    n=2;
  }else{
    n=3;
  }
  var s='<div class="s-wrapper sena">\
            <div class="s-head">\
            <span>选择'+n+'：</span><img src="assets/images/'+type+'.png">\
            </div>\
            <div class="s-title specia">时间范围\
              <div class="s-content">实际时间有相等可能是以下10种情况：\
                <div class="s-item-wrapper clearfix">';
                x.each(function(item){
                  s+='<div class="s-c-item">'+Math.round(item)+'分钟</div>';
                })
                s+='</div>\
              </div>\
            </div>\
            <div class="s-title">平均时间</div>\
            <div class="s-content">'+ave(x)+'分钟</div>\
            <div class="s-content"><span class="red">'+costText+'：</span> '+cost+'元</div>\
            <div class="s-title">车厢内拥挤程度</div>';
            if(i==undefined){
              s+='<div class="s-content car">舒适\
                </div>'
            }else{
              s+='<div class="s-content">'+ctext[i]+'\
                  <img src="assets/images/'+type+i+'.jpg" alt="" />\
                </div>'
            }
          s+='</div>';
  return s;
}
function wrapperSena3(str){
  return '<div class="sena-wrapper three clearfix">'+str+'</div>';
}




