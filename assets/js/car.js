
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
    title:"根据您早上开车上班的经历：</br>\
    <span class='bold-normal'>当交通较为通畅，上班较快情况下，大概需要_分钟<br/>\
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
    add:wrpperAdd(geneNumberItem("停车费、过路费共为_元，<br/>预估您上班费用为 <span id='allMoney'>0</span> 元,（油费<span id='moneyYou'>0</span>元+停车/过路费<span id='moneyLu'>0</span>元）",true)),
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
  
  J.id("distantce").next().child().clk(changeAllMoney,true);
}

var carSen;
var times;
function appendCarSenario1(){
  if(checkInput()){
    //setLittleTitle("自驾与地铁情景题");
    carSen=new Car(cnum(answer[4][1]),cnum(answer[4][0]),getCost(),0,0);
    addText("部分1：自驾与地铁情景题","red");
    senario.append(carSen.getSenario1());
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设现在对自驾进行政策性收费，并有新的地铁线路"+(i+1)+"开通（信息如下），您上班是否会放弃自驾选择地铁？",
        list:["仍选择自驾","放弃自驾转向新地铁"+(i+1)],
        size:"two",
        subTitle:"自驾与地铁情景题"+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):<br/>":"")+"</span>",
        answerId:false
      });
      if(i==0){
        times=generateSenrio(item[2],item[1],getTUp(),getTLow());
      }
      item.append(times);
      var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
      item.append(times);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
        getCostText(getCost(),item[0],transType),transType,times,undefined,undefined,getMean())
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[3],-1,"metro"),"metro",ctimes,item[6],undefined,item[5])));
    });
    btnEvent(appendCarSenario2);
    changeLength();
  }
}
function appendCarSenario2(){
  if(checkInput()){
    setLittleTitle("自驾与公交情景题");
    addSenaAnswer();
    nextPage();
    addText("部分2：自驾与公交情景题","red");
    senario.append(carSen.getSenario2());
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设现在对自驾进行政策性收费，并有新的公交车线路"+(i+1)+"开通（信息如下），您是否上班会放弃自驾选择公交车？",
        list:["仍选择自驾","放弃自驾转向新公交"+(i+1)],
        size:"two",
        subTitle:"自驾与公交情景题"+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):<br/>":"")+"</span>",
        answerId:false
      });
      if(i==0){
        times=generateSenrio(item[2],item[1],getTUp(),getTLow());
      }
      item.append(times);
      var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
      item.append(times);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
        getCostText(getCost(),item[0],transType),transType,times,undefined,undefined,getMean())
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[3],-1,"bus"),"bus",ctimes,item[6],undefined,item[5])));
    });
    btnEvent(appendCarSenario4);
    times=undefined;
    changeLength();
  }
}
function appendCarSenario4(){
  if(checkInput()){
    addAnswer();
    nextPage();
    addText("部分3：新路线情景题","red");
    senario.append(carSen.getSenario4(getDistance(),0));
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设现在对您现在自驾的路线进行收费，并有新开通的线路"+(i+1)+"（信息如下），您是否会选择新的路线？",
        list:["仍选择原路径","放弃原路径选择新路径"+(i+1)],
        size:"two",
        subTitle:"新路线情景题"+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):<br/>":"")+"</span>",
          answerId:false
      });
      if(i==0){
        times=generateSenrio(item[2],item[1],getTUp(),getTLow());
      }
      item.append(times);
      var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
      item.append(ctimes);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
        getCostText(getCost(),item[0],transType),transType,times,"none",undefined,getMean())
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[3],-1,"car"),"car",ctimes,"none","new",item[5])));
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
    addTable(
      ["听说有一种新的上班出行选择，我愿意尝试一下，看看是否比现在的好。"
        ,"上班过程中，我倾向于增加一定路程，绕开交通状况不清楚的路段（可能拥堵）。"
        ,"我喜欢为追求更多的利益而承担较大风险。"
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
  addText("部分4：新工作情景题","red");
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
        ,"我愿意减少小汽车出行，更多的使用公共交通。"
        ,"我身边对我重要的人都希望我多采用公共交通方式而不是小汽车出行。"
        ,"在我居住或者工作地点的附近，没有比较方便的公共交通站点，采用公共交通上班不太方便。"
        ,"我在工作中需要经常使用小汽车进行，因此只能采用小汽车上下班而不是公共交通"
        ,"在我上下班过程中需要做其他的事情（例如接送孩子上下学或购物），因此必须使用小汽车上下班。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "请选择所描述内容是否符合您的实际或您是否同意"
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
    btnEvent(appendCarRest2);
  }
}
function appendCarRest2(){
  if(checkInput()){
    addSenaAnswer();
    nextPage();
    addText("此为本次调查的最后一部分内容","red");
    
    addTable(
      ["通常我认为改变是一个不好的事情。"
        ,"我喜欢做习惯的事情而不愿意尝试新的不同事物。"
        ,"当我的生活没有较多变化时，我会试图尝试改变它。"
        ,"我宁愿平淡无聊也不愿有太多新的刺激。"
        ,"当我突然被告知我工作职位变动需要做不熟悉的工作，我会感到紧张。"
        ,"当我被告知原有的计划改变了，我会感到一点紧张。"
        ,"当事情没有按照原有的计划进行时，我会感到紧张。"
        ,"我不喜欢改变我自己的原有计划。"
        ,"虽然改变可以让我生活更好，但我还是对改变有一些不舒服。"
        ,"有时候我发现自己不愿做对自己有益处的改变。"
        ,"我很容易受影响而改变自己想法"
        ,"一旦我决定了，别人就很难改变自己的想法"
        ,"我自己的思想和观念会很长一段时间保持不变。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "请选择所描述内容是否符合您的实际或您是否同意"
    );
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
    title:"假设您工作地点更换到新的地点"+(i+1)+"，您的上班选择发生了很大改变，新的可选择三种交通方式情况如下，您会选择哪种交通方式。",
    list:["我选择自驾","我选择地铁","我选择公交"],
    size:"three",
    subTitle:"新工作情景题"+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):<br/>":"")+"</span>",
    answerId:false
  });
  if(i==0){
    times=generateSenrio(item[2],item[1],getTUp(),getTLow());
  }
  item.append(times);
  var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
  item.append(ctimes);
  var c2times=generateSenrio(item[9],item[8],geneTUp(item[9],item[8]),geneTLow(item[9],item[8]));
  item.append(c2times);
  J.id("quesWrapper").child().last().append(wrapperSena3(
    geneSenario3(item[0],transType,times,undefined,getMean())
    +geneSenario3(item[3],"metro",ctimes,item[6],item[5])
    +geneSenario3(item[7],"bus",c2times,item[10],item[9])
  ));
  //setLittleTitle("新工作情景题");
}



function geneSenario3(cost,type,x,i,mean){
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
              <div class="s-content">'+getSenarioTimeText(type)+'\
                <div class="s-item-wrapper clearfix">';
                x.each(function(item){
                  s+='<div class="new-time">'+Math.round(item[0])+'~'+Math.round(item[1])+'分钟 到达的可能性是 '+Math.round(item[2]*100)+'%</div>';
                })
                s+='</div>\
              </div>\
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




