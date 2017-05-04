/*addGeneral
check
appendBusSenario1
appendBusSenario2 or taxi
rest1 47. 我自己的思想和观念会很长一段时间保持不变。
lotter
appendBusCarNewWork or appendBusTaxiNewWork
appendBusRest
*/


function addBusGeneral(){
  addQuestion({
    type:"number",
    title:"您早上乘坐公交车上班，单程：</br>\
      <span class='bold-normal'>较快情况下大概_分钟</br>较慢情况下大概_分钟</br>\
    票价是_元"
  });
  addQuestion({
    type:"single",
    title:"通常情况车内是否拥挤？",
    list:["有座位","需站立不太拥挤","需站立拥挤"]
  });
  addQuestion({
    type:"single",
    title:"您是否在上海市居住地拥有小汽车？",
    list:["是","否"],
    add:wrpperAdd(geneNumberItem("若采用小汽车上班：</br>\
      <span class='bold-normal'>较快情况大概需要_分钟</br>\
      较慢情况概需要_分钟")),
    indexs:[0]
  });
  addQuestion({
    type:"single",
    title:"从您家到公司，是否方便采用地铁？",
    list:["可以","可以但不方便（家或公司离地铁站远/需要多次换乘/时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果采用地铁上班，单程：</br>较快情况大概_分钟</br>较慢情况下大概_分钟")+
          wrpperAddTitle("通常情况下地铁内是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
}
var busSen;
function appendBusSenario1(){
  if(checkInput()){
    busSen=new Bus(convertNum(answer[4][1]),convertNum(answer[4][0]),getCrow());
    var subTitle="公交与地铁场景题<br/>（请综合考虑场景中费用、时间范围、车内拥挤等因素做出选择）";
    addText("部分1："+subTitle,"red");
    //setLittleTitle(subTitle);
    senario.append(busSen.getSenario1());
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设现在有新地铁线路"+(i+1)+"开通（信息如下），您会选择？",
        list:["原选择（公交车）","新地铁线路"+(i+1)],
        size:"two",
        subTitle:"场景"+(i+1)+"：<span class='red'>"+((i+1>1)?"(此场景不同于以上场景)":"")+"<br/></span>",
          answerId:false
      });
      if(i==0){
        times=generateSenrio(item[2],item[1],getTUp(),getTLow());
      }
      item.append(times.clone());
      var a="地铁线路"+(i+1);
      var ctimes=generateSenrio(item[6],item[5],geneTUp(item[6],item[5]),geneTLow(item[6],item[5]));
      item.append(ctimes);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost()),transType,times,item[3],undefined,getMean(),a)
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[4]),"metro",ctimes,item[7],undefined,item[6],a)));
    });
    btnEvent(appendBusSenario2);
    times=undefined;
    changeLength();
  }
}
function appendBusSenario2(){
  if(checkInput()){
    addSenaAnswer();
    if(hasCar){
      nextPage();
      var subTitle="公交与自驾场景题<br/>（请综合考虑场景中费用、时间范围、车内拥挤等因素做出选择）";
      addText("部分2："+subTitle,"red");
      //setLittleTitle(subTitle);
      senario.append(busSen.getSenario2());
      senario.last().each(function(item,i){
        addQuestion({
          type:"single",
          title:"从您家到工作地点，有新开车线路"+(i+1)+"开通（信息如右侧），您上班是否会放弃公交车选择自驾？",
          list:["原选择（公交车）","新自驾路线"+(i+1)],
          size:"two",
          subTitle:"场景"+(i+1)+":<span class='red'>"+((i+1>1)?"(此场景不同于以上场景)":"")+"<br/></span>",
          answerId:false
        });
        if(i==0){
          times=generateSenrio(item[2],item[1],getTUp(),getTLow());
        }
        item.append(times.clone());
		    var a="自驾线路"+(i+1);
        var ctimes=generateSenrio(item[6],item[5],geneTUp(item[6],item[5]),geneTLow(item[6],item[5]));
        item.append(ctimes);
        J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost()),transType,times,item[3],undefined,getMean(),a)
          +'<div class="middle">\
            <img src="assets/images/home_work.png" alt="" />\
          </div>'+geneSenario(getCostText(item[4],-1,"car"),"car",ctimes,undefined,undefined,item[6],a)));
      });
    }else{
      //taxi
      nextPage();
      var subTitle="公交与打车场景题<br/>（请综合考虑场景中费用、时间范围、车内拥挤等因素做出选择）";
      addText("部分2："+subTitle,"red");
      //setLittleTitle(subTitle);
      senario.append(busSen.getSenario2());
      senario.last().each(function(item,i){
        addQuestion({
          type:"single",
          title:"从您家到工作地点，有新开车线路"+(i+1)+"开通（信息如右侧），您上班是否会放弃公交车选择打车？",
          list:["原选择（公交车）","新打车方式"+(i+1)],
          size:"two",
          subTitle:"场景"+(i+1)+":<span class='red'>"+((i+1>1)?"(此场景不同于以上场景)":"")+"<br/></span>",
          answerId:false
        });
        if(i==0){
          times=generateSenrio(item[2],item[1],getTUp(),getTLow());
        }
        item.append(times.clone());
		    var a="打车方式"+(i+1);
        var ctimes=generateSenrio(item[6],item[5],geneTUp(item[6],item[5]),geneTLow(item[6],item[5]));
        item.append(ctimes);
        J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost()),transType,times,item[3],undefined,getMean(),a)
          +'<div class="middle">\
            <img src="assets/images/home_work.png" alt="" />\
          </div>'+geneSenario(getCostText(item[4],-1,"taxi"),"taxi",ctimes,undefined,undefined,item[6],a)));
      });
    }
    btnEvent(function(){
      setLittleTitle("");
      addSenaAnswer();
      appendBusRest1();
    });
    times=undefined;
    changeLength();
  }
}
function appendBusRest1(){
  if(checkInput()){
    nextPage();
    addQuestion({
      type:"single",
      title:"请您回想过去一个月的早上上班过程：</br></br>其中您采用公交车上班的次数大概是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"],
      answerId:false
    });
    addQuestion({
      type:"single",
      title:"采用地铁上班的次数是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"],
      answerId:false
    });
    addQuestion({
      type:"single",
      title:"开车/打车上班的次数是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"],
      answerId:false
    });
    addTable(
      ["我已经采用公交车上班很长一段时间了。"
	    ,"我出行时会习惯性选择公交车。"
        ,"我会下意识地采用公交车出行。"
        ,"不采用公交车上班，我会感觉有些奇怪。"
        ,"我不会考虑其他选择，就会选择公交车上班。"
        ,"采用公交车上班已经是我的一个日常习惯。"
        ,"我很难不选择公交车上班。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "以下有八项描述，请选择所描述内容是否符合您的实际"
    );
    addPeopleFactor();
    addTable(
      ["听说有新的上班出行选择，我愿意尝试一下，看看是否比现在的好。"
        ,"我愿意绕行一段，避开交通状况不清楚的路段（可能拥堵）。"
        ,"我愿意为追求更多的利益而承担较大风险。"
        ,"对于不太熟悉的上班出行选择/路线，我一般不会去尝试。"
        ,"从地点A到地点B， 选择1时间可能为30~60分钟，选择2时间可能为40~50分钟，我更偏向于选择1"
        ,"我不喜欢做有风险的决定，尽管它有可能带来较多利益。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "请选择所描述内容是否符合您的实际或您是否同意"
    );
    btnEvent(function(){
      if(checkInput()){
        addAnswer();
        if(J.cookie("can_lotter")!="false"){
          showLotter('appendBusSenarioNew');
        }else{
          appendBusSenarioNew();
        }
      }
    });
  }
}
function appendBusSenarioNew(){
  hideLotter();
  nextPage();
  addText("部分3：新工作情景题","red");
  senario.append(busSen.getSenario_new());
  senario.last().each(function(item,i){
    appendBusAndSenarioNewContent(item,i);
  });
  btnEvent(appendBusRest2);
  times=undefined;
}
function appendBusRest2(){
  if(checkInput()){
    addSenaAnswer();
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
      ["从家到工作地，我更愿意使用公共交通上下班。"
        ,"从家到工作地，我更愿意使用小汽车（自驾/打车）上下班"
        ,"我身边重要的人都希望我多采用小汽车（自驾/打车）上下班"
        ,"在我家或工作地点附近，有比较方便的公交站点，采用公交上班会较为方便。"
        ,"在我家或工作地点附近，没有比较方便的地铁站点，采用地铁上班会不太方便。"
        ,"总体上，我觉得地铁出行要比公交车好。"
        ,"相对于地铁，我更喜欢选择公交车出行。"																				   																																						   
        ,"上班过程中，小汽车出行更加舒适、自由与方便。"
        ,"小汽车仅仅是一种代步工具，与公共交通没有什么区别。"],
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
    if(J.cookie("can_lotter")!="false"){
      btnEvent(end,"抽奖");
    }else{
      btnEvent(end,"完成");
    }
  }
}
function appendBusAndSenarioNewContent(item,i){
  var t="";
  var type="";
  if(hasCar){
    t="自驾";
    type="car";
  }else{
    t="打车";
    type="taxi";
  }
  addQuestion({
    type:"single",
    title:"假设您工作地点更换到新地点"+(i+1)+"，上班选择发生了很大改变，新的可选择三种交通方式情况如下，您会选择？",
    list:[t,"地铁","公交车"],
    size:"three",
    subTitle:"场景"+(i+1)+":<span class='red'>"+((i+1>1)?"(此场景不同于以上场景)":"")+"<br/></span>",
          answerId:false
  });
  var c0times=generateSenrio(item[2],item[1],geneTLow(item[2],item[1]),geneTLow(item[2],item[1]));
  item.append(c0times);
  var ctimes=generateSenrio(item[5],item[4],geneTUp(item[5],item[4]),geneTLow(item[5],item[4]));
  item.append(ctimes);
  var c2times=generateSenrio(item[9],item[8],geneTUp(item[9],item[8]),geneTLow(item[9],item[8]));
  item.append(c2times);
  J.id("quesWrapper").child().last().append(wrapperSena3(
    geneSenario3(item[0],type,c0times,undefined,item[2])
    +geneSenario3(item[3],"metro",ctimes,item[6],item[5])
    +geneSenario3(item[7],"bus",c2times,item[10],item[9])
  ));
  //setLittleTitle("新工作情景题");
}