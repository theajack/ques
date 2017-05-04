
/*addCarGeneral
check
appendCarSenario1
appendCarSenario2
appendCarSenario4
appendBeforeFirstLotter
lotter
appendCarSenario3
appendCarRest1
appendCarRest2
*/
function addCarGeneral(){
  addQuestion({
    type:"number",
    title:"您早上开车上班，单程：</br>\
    <span class='bold-normal'>较快情况下，大概需要_分钟<br/>\
    较慢情况下，大概需要_分钟</span> "
  });
  addQuestion({
    type:"number",
    title:"您过去一个月早上开车上班，单程平均出行时间大概_分钟"
  });
  addQuestion({
    type:"single",
    title:"是否需要停车费、过路费？",
    list:["是","否"],
    add:wrpperAdd(geneNumberItem("停车费、过路费共为_元.",true)),
    indexs:[0]
  });
  J.id("money2").parent(3).append(J.new("div#allMoneyDiv").html("预估您现在开车上班的花费为 <span id='allMoney'>0</span> 元<span class='hide'>,（油费<span id='moneyYou'>0</span>元+停车/过路费<span id='moneyLu'>0</span>元）</span>"))
  addQuestion({
    type:"single",
    title:"从您家到公司，是否方便采用地铁?",
    list:["较为方便","可以但不太方便（家或公司离地铁站远/需要多次换乘//时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果早上采用地铁上班，单程：较快情况需要_分钟；较慢情况需要_分钟")+
          wrpperAddTitle("<br/>\通常情况下，地铁内是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
  addQuestion({
    type:"single",
    title:"从您家到公司，是否方便采用公交?",
    list:["较为方便","可以但不太方便（家或公司离公交站远/多次换乘//时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果早上采用公交车上班，单程：较快情况需要_分钟；较慢情况需要_分钟")+
          wrpperAddTitle("<br/>\通常情况下，公交内是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
  
  J.id("distantce").next().child().clk(changeAllMoney,true);
}

var carSen;
var times;
function appendCarSenario1(){
  if(checkInput()){
    //setLittleTitle("自驾与地铁情景题");
    carSen=new Car(convertNum(answer[4][1]),convertNum(answer[4][0]),getCost(),0,0);
    addText("部分1：自驾与地铁情景题<br/>（请综合考虑费用、时间范围、车内拥挤程度等因素做出选择）","red");
    senario.append(carSen.getSenario1());
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设对自驾进行政策性收费"+(item[0]-getCost())+"元，并有新地铁线路"+(i+1)+"开通（信息如下），您会选择？",
        list:["原选择（自驾）","选择新地铁"+(i+1)],
        size:"two",
        subTitle:"场景"+(i+1)+"：<span class='red'>"+((i+1>1)?"(此场景不同于以上场景)":"")+"<br/></span>",
        answerId:false
      });
      if(i==0){
        times=generateSenrio(item[2],item[1],getTUp(),getTLow());
      }
      item.append(times.clone());
      var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
      item.append(ctimes);
	  	var a="地铁线路"+(i+1);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
        getCostText(getCost(),item[0],transType),transType,times,undefined,undefined,getMean(),a)
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[3],-1,"metro"),"metro",ctimes,item[6],undefined,item[5],a)));
    });
    btnEvent(appendCarSenario2);
    changeLength();
  }
}
function appendCarSenario2(){
  if(checkInput()){
    //setLittleTitle("自驾与公交情景题<br/>（请综合考虑费用、时间范围、车内拥挤程度等因素做出选择）");
    addSenaAnswer();
    nextPage();
    addText("部分2：自驾与公交情景题<br/>（请综合考虑费用、时间范围、车内拥挤程度等因素做出选择）","red");
    senario.append(carSen.getSenario2());
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设对自驾进行政策性收费"+(item[0]-getCost())+"元，并有新公交车线路"+(i+1)+"开通（信息如下），您会选择?",
        list:["原选择（自驾）","选择新公交"+(i+1)],
        size:"two",
        subTitle:"场景"+(i+1)+"：<span class='red'>"+((i+1>1)?"(此场景不同于以上场景)":"")+"<br/></span>",
        answerId:false
      });
      if(i==0){
        times=generateSenrio(item[2],item[1],getTUp(),getTLow());
      }
      item.append(times.clone());
      var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
      item.append(ctimes);
      var a="公交车线路"+(i+1);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
        getCostText(getCost(),item[0],transType),transType,times,undefined,undefined,getMean(),a)
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[3],-1,"bus"),"bus",ctimes,item[6],undefined,item[5],a)));
    });
    btnEvent(appendCarSenario4);
    times=undefined;
    changeLength();
  }
}
function appendCarSenario4(){
  if(checkInput()){
    addSenaAnswer();
    nextPage();
    addText("部分3：新路线情景题<br/>（请综合考虑费用、时间范围等因素做出选择）","red");
    senario.append(carSen.getSenario4(2*getDistance(),0));
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设现在对您现在的自驾路线进行收费"+(item[0]-getCost())+"元，并有新线路"+(i+1)+"开通（信息如下），您会选择？",
        list:["原路径","新路径"+(i+1)],
        size:"two",
        subTitle:"场景"+(i+1)+"：<span class='red'>"+((i+1>1)?"(此场景不同于以上场景)":"")+"<br/></span>",
          answerId:false
      });
      if(i==0){
        times=generateSenrio(item[2],item[1],getTUp(),getTLow());
      }
      item.append(times.clone());
      var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
      item.append(ctimes);
      var a="路径"+(i+1)+":";
      var a1=Math.round(item[3]/0.07)/10;
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenarioroute(
        getCostText(getCost(),item[0],transType),transType,times,"none","none",getMean(),null,getDistance())
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenarioroute(getCostText(item[3],-1,"car"),"car",ctimes,"none","new",item[5],a,a1)));
    });
    //setLittleTitle("新路线情景题");
    times=undefined;
    btnEvent(appendBeforeFirstLotter);
    changeLength();
  }
}
function appendBeforeFirstLotter(){
  if(checkInput()){
    addSenaAnswer();
    nextPage();
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
      ["听说有新的上班出行选择，我愿意尝试一下，看看是否比现在的好。"
        ,"开车上班时，我愿意绕行一段，避开交通状况不清楚的路段（可能拥堵）。"
        ,"我愿意为追求更多的利益而承担较大风险。"
        ,"对于不太熟悉的上班出行选择/路线，我一般不会去尝试。"
        ,"从地点A到地点B， 选择1时间可能为30~60分钟，选择2时间可能为40~50分钟，我更偏向于选择1"
        ,"我不喜欢做有风险的决定，尽管它有可能带来较多利益。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "以下有6项描述，请选择所描述内容是否符合您的实际"
    );
    if(J.cookie("can_lotter")!="false"){
      btnEvent(function(){
        if(checkInput()){
          addAnswer();
          showLotter('appendCarSenario3');
        }
      });
    }else{
      addAnswer();
      showLotter('appendCarSenario3');
    }
  }
}
function appendCarSenario3(){
  hideLotter()
  //addSenaAnswer();
  nextPage();
  addText("部分4：新工作情景题<br/>（请综合考虑费用、时间范围、车内拥挤程度等因素做出选择","red");
  senario.append(carSen.getSenario3());
  senario.last().each(function(item,i){
    appendCarSenario3Content(item,i);
  });
  btnEvent(appendCarRest1);
  times=undefined;
  changeLength();
}
function appendCarRest1(){
  if(checkInput()){
    addSenaAnswer();
    nextPage();
    addQuestion({
      type:"single",
      title:"请您回想过去一个月的早上上班过程：</br></br>其中您开车上班的次数大概是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
    });
    addQuestion({
      type:"single",
      title:"其中采用地铁上班的次数大概是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
    });
    addQuestion({
      type:"single",
      title:"其中采用公交上班的次数大概是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
    });
    
    addTable(
      ["我已经开车上班很长一段时间了。"
        ,"我出行时会习惯性选择小汽车。"
        ,"我会下意识地采用小汽车出行。"
        ,"不开车上班会让我感觉有些奇怪。"
        ,"我不会考虑其他选择，只会选择开车上班"
        ,"我很难不开车上班。"
        ,"开车上班已经是我的一个日常习惯。"
        ,"我不需要思考就会直接选择开车上班"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "以下有八项描述，请选择所描述内容是否符合您的实际"
    );
    addTable(
      ["从家到工作地，我愿意尝试使用公共交通上下班。"
        ,"我愿意减少小汽车出行，更多地使用公共交通。"
        ,"我身边重要的人希望我多采用公共交通方式，而不是小汽车出行。"
        ,"在我居住或者工作地点附近，没有比较方便的公共交通站点，采用公共交通上班不太方便。"
        ,"我在工作中需要经常使用小汽车，因此只能采用小汽车上下班"
        ,"我上下班过程中需要做其他事情（例如接送孩子上下学或购物），因此必须使用小汽车上下班。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "请选择所描述内容是否符合您的实际或您是否同意"
    );
    addTable(
      ["公共交通主要为低收入人群服务。"
        ,"小汽车出行是一种身份的象征。"
        ,"一般收入高/有身份的人不大会使用公共交通。"
        ,"我喜欢使用小汽车上班来自由选择出行时间/路径"
        ,"采用小汽车上班比公共交通更加舒适、安全。"
        ,"上班过程中，小汽车出行比公共交通更加快捷、自由与方便。"],
      ["非常同意","较为同意","不一定","不太同意","完全不同意"],
      "请选择所描述内容是否符合您的实际或您是否同意"
    );
    setLittleTitle("");
    btnEvent(appendCarRest2);
  }
}
function appendCarRest2(){
  if(checkInput()){
    addAnswer();
    nextPage();
    addText("此为本次调查的最后一部分内容","red");
    addTable(
      ["通常我认为改变是一个不好的事情。"
        ,"我喜欢做习惯的事情而不愿意尝试新事物。"
        ,"当生活没有变化时，我会试图改变它。"
        ,"我宁愿平淡无聊也不愿有太多新的刺激。"
        ,"当被告知我工作职位变动需要做不熟悉的工作，我会感到紧张。"
        ,"当我被告知原计划改变了，我会感到一点紧张。"
        ,"当事情没有按照原有计划进行，我会感到紧张。"
        ,"我不喜欢改变自己的原有计划。"
        ,"我不喜欢改变，即使有时候改变是好的"
        ,"有时候我发现自己不愿做对自己有益的改变。"
        ,"我很容易受影响而改变自己想法"
        ,"一旦我决定了，别人就很难改变我的想法"
        ,"我自己的思想和观念很长一段时间保持不变。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "请选择所描述内容是否符合您的实际或您是否同意"
    );
    addTable(
      ["过多使用小汽车会增加尾气排放、环境污染和拥堵等问题。"
        ,"减少小汽车出行、多使用公共交通有利于缓解交通问题。"
        ,"公共交通并不比小汽车更加环保。"
        ,"每个人都应该为减少城市交通问题负一定责任"
        ,"一个人的贡献对缓解交通问题是微不足道的。"
        ,"改善交通问题只能靠政府，个人行为不起作用。"],
      ["非常同意","较为同意","不一定","不太同意","完全不同意"],
      "请选择所描述内容是否符合您的实际或您是否同意"
    );
    addTable(
      ["我有责任为减少交通问题奉献一份力，不管别人怎么做。"
        ,"我不会为过分使用小汽车造成城市交通问题而有负罪感。"
        ,"我正在生活中尽量采用更加绿色的出行方式。"],
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
        ,"车内是否拥挤、嘈杂"
        ,"运行过程中是否颠簸与舒适"],
      ["非常重要","较为重要","一般","不大重要","完全不重要"],
      "在上班过程出行方式选择中，您认为以下因素的重要性是？"
    );
    setLittleTitle("");
    
    if(J.cookie("can_lotter")!="false"){
      btnEvent(end,"抽奖");
    }else{
      btnEvent(end,"完成");
    }
  }
}

function getCarMoney(){
  return Math.ceil(getDistance()*0.7);
}

function appendCarSenario3Content(item,i){
  addQuestion({
    type:"single",
    title:"假设您工作地点更换到新地点"+(i+1)+"，上班选择发生改变，新的可选择的三种交通方式情况如下，您会选择？",
    list:["自驾","地铁","公交车"],
    size:"three",
    subTitle:"场景"+(i+1)+"：<span class='red'>"+((i+1>1)?"(此场景不同于以上场景)":"")+"<br/></span>",
    answerId:false
  });
  var c0times=generateSenrio(item[2],item[1],geneTUp(item[2],item[1]),geneTLow(item[2],item[1]));
  item.append(c0times);
  var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
  item.append(ctimes);
  var c2times=generateSenrio(item[9],item[8],geneTUp(item[9],item[8]),geneTLow(item[9],item[8]));
  item.append(c2times);
  J.id("quesWrapper").child().last().append(wrapperSena3(
    geneSenario3(item[0],transType,c0times,undefined,item[2])
    +geneSenario3(item[3],"metro",ctimes,item[6],item[5])
    +geneSenario3(item[7],"bus",c2times,item[10],item[9])
  ));
  //setLittleTitle("新工作情景题");
}



function geneSenario3(cost,type,x,i,mean){
  var ctext=["有座位","站立，不拥挤","","站立，很拥挤"];
  var costText=(type=="car")?"费用":"票价";
 
  var n=0;
  if(type=="car"||type=="taxi"){
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
              <div class="s-content">'+getSenarioTimeText(type);
              s+=geneTimeEle(x);
              s+='</div>\
              <div class="s-content">平均时间：'+Math.round(mean)+'分钟</div>\
            </div>\
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




