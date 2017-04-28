function addMetroGenral(){
  addQuestion({
    type:"number",
    title:"根据您早上乘坐地铁的经历：</br>\
    <span class='bold-normal'>如果采用地铁，通常情况下上班过程出行时间范围大概为：_分钟到_分钟</br>\
    票价是_元</span>"
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
      <span class='bold-normal'>当交通较为通畅，上班较快情况下，大概需要_分钟</br>\
      当交通较为拥堵，上班较慢情况下，大概需要_分钟</span>")),
    indexs:[0]
  });
  addQuestion({
    type:"single",
    title:"从您家到公司，是否可以采用公交车？",
    list:["可以","可以但很不方便（由于需要多次换乘/家或公司离公交站远/时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果采用公交，通常情况下上班过程出行时间范围大概为：_分钟到_分钟")+
          wrpperAddTitle("通常情况下，公交内是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
}

function btnEventCommon(){
  btnEvent(function(){
    if(checkInput()){
      if(transType=="car"){
        //appendCarRest();
      }else if(transType=="metro"){
        appendMetroRest();
      }else{
        appendBusRest();
      }
      btnEvent(end,"抽奖");
    }
  });
}
var metroSen;
function appendMetroSenario1(){
  if(checkInput()){
    metroSen=new Metro(convertNum(answer[4][1]),convertNum(answer[4][0]),getCrow(),convertNum(answer[4][2]));
    senario.append(metroSen.getSenario1());
    var subTitle="地铁与公交场景题";
    //setLittleTitle(subTitle);
    
    addText("部分1："+subTitle,"red");
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设现在地铁票价提高，并有新的公交车线路"+(i+1)+"开通（信息如下），您是否上班会放弃地铁选择公交车？",
        list:["仍选择地铁","放弃地铁转向新公交"+(i+1)],
        size:"two",
        subTitle:subTitle+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):<br/>":"")+"</span>",
        answerId:false
      });
      if(i==0){//第一个公用
        times=generateSenrio(item[2],item[1],getTUp(),getTLow());
      }
      item.append(times);
      var ctimes=generateSenrio(item[6],item[5],geneTUp(item[6],item[5]),geneTLow(item[6],item[5]));
      item.append(ctimes);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost(),item[0],transType),transType,times,item[3],undefined,getMean())
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[4],-1,"bus"),"bus",ctimes,item[7],undefined,item[6])));
    });
    btnEvent(appendMetroSenario2);
    times=undefined;
    changeLength();
  }
}
function appendMetroSenario2(){
  if(checkInput()){
    addSenaAnswer();
    if(hasCar){
      nextPage();
      var subTitle="地铁与自驾场景题";
      addText("部分2："+subTitle,"red");
      //setLittleTitle(subTitle);
      senario.append(metroSen.getSenario2());
      senario.last().each(function(item,i){
        addQuestion({
          type:"single",
          title:"从您家到工作地点，假设现在地铁票价提高，并有新的开车线路"+(i+1)+"开通（信息如下），您上班是否会放弃地铁选择自驾？",
          list:["仍选择地铁","放弃地铁转向自驾"+(i+1)],
          size:"two",
          subTitle:subTitle+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):<br/>":"")+"</span>",
          answerId:false
        });
        if(i==0){
          times=generateSenrio(item[2],item[1],getTUp(),getTLow());
        }
        item.append(times);
        var ctimes=generateSenrio(item[6],item[5],geneTUp(item[6],item[5]),geneTLow(item[6],item[5]));
        item.append(ctimes);
        J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost(),item[0],transType),transType,times,item[3],undefined,getMean())
          +'<div class="middle">\
            <img src="assets/images/home_work.png" alt="" />\
          </div>'+geneSenario(getCostText(item[4],-1,"car"),"car",ctimes,undefined,undefined,item[6])));
      });
    }else{
      //texi
      nextPage();
      var subTitle="地铁与打车场景题";
      addText("部分2："+subTitle,"red");
      //setLittleTitle(subTitle);
      senario.append(metroSen.getSenario2());
      senario.last().each(function(item,i){
        addQuestion({
          type:"single",
          title:"从您家到工作地点，假设现在地铁票价提高，并有新的开车线路"+(i+1)+"开通（信息如下），您上班是否会放弃地铁选择打车？",
          list:["仍选择地铁","放弃地铁转向打车"+(i+1)],
          size:"two",
          subTitle:subTitle+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):<br/>":"")+"</span>",
          answerId:false
        });
        if(i==0){
          times=generateSenrio(item[2],item[1],geneTUp(item[6],item[5]),geneTLow(item[6],item[5]));
        }
        item.append(times);
        var ctimes=generateSenrio(item[6],item[5],geneTUp(item[6],item[5]),geneTLow(item[6],item[5]));
        item.append(ctimes);
        J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost(),item[0],transType),transType,times,item[3],undefined,getMean())
          +'<div class="middle">\
            <img src="assets/images/home_work.png" alt="" />\
          </div>'+geneSenario(getCostText(item[4],-1,"taxi"),"taxi",ctimes,undefined,undefined,item[6])));
      });
    }
    btnEvent(function(){
      addSenaAnswer();
      setLittleTitle("");
      appendMetroRest1();
    });
    times=undefined;
    changeLength();
  }
}
function appendMetroRest1(){
  if(checkInput()){
    nextPage();
    addQuestion({
      type:"single",
      title:"请您回想过去一个月的上班过程：</br>其中您上班过程中采用公交的次数是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"],
      answerId:false
    });
    addQuestion({
      type:"single",
      title:"其中您上班过程中采用地铁的次数是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"],
      answerId:false
    });
    addQuestion({
      type:"single",
      title:"其中你开车上班过程中的次数是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"],
      answerId:false
    });
    addTable(
      ["我出行时会习惯性选择公交出行。"
        ,"我会下意识地采用公交出行。"
        ,"如果不乘坐公交上班，我会感觉有些奇怪。"
        ,"我不会考虑其他出行选择，就会选择公交出行 选择1时间可能为30~60分钟，选择2可能为40~50分钟，我更偏向于选择1."
        ,"采用公交上班已经是我的一个日常习惯。"
        ,"我很难不选择乘坐公交上班。"
        ,"我已经采用公交上班很长一段时间了。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "以下有八项描述，请选择所描述内容是否符合您的实际"
    );
    addPeopleFactor();
    addTable(
      ["听别人说有一条新的上班出行选择，我乐意尝试新选择来看看是否比我现在好"
        ,"上班过程中，我偏好增加一定时间，绕开可能交通状况不清楚的路段。"
        ,"同事告诉我有一条新的上班路线较好，因为我不大清楚状况，所以不会尝试改变。"
        ,"从地点A到地点B， 选择1时间可能为30~60分钟，选择2可能为40~50分钟，我更偏向于选择1."
        ,"我不喜欢做风险大的决定，尽管这个决定有可能带来较多利益。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "请选择所描述内容是否符合您的实际或您是否同意"
    );
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
    if(J.cookie("can_lotter")!="false"){
      btnEvent(function(){
        if(checkInput()){
          addAnswer();
          showLotter('appendMetroSenarioNew');
        }
      });
    }else{
      if(checkInput()){
        addAnswer();
        appendMetroSenarioNew();
      }
    }
  }
}
function appendMetroSenarioNew(){
  hideLotter();
  nextPage();
  addText("部分3：新工作情景题","red");
  senario.append(metroSen.getSenario_new());
  senario.last().each(function(item,i){
    appendBusAndSenarioNewContent(item,i);
  });
  btnEvent(appendMetroRest2);
  times=undefined;
}

function appendMetroRest2(){
  if(checkInput()){
    addSenaAnswer();
    nextPage();
    addText("此为本次调查的最后一部分内容","red");
    addTable(
      ["从我居住的地方上下班，我更愿意使用公共交通上下班。"
        ,"从我居住的地方上下班，我更愿意使用小汽车（自驾/打车）上下班"
        ,"我身边对我重要的人都希望和支持我在日常中采用公交车上下班。"
        ,"我身边对我重要的人都希望我多采用小汽车（自驾/打车）上下班"
        ,"在我居住和工作地点附近，有比较方便的公交站点，采用公交上班会较为方便。"
        ,"在我居住和工作地点附近，没有比较方便的地铁站点，采用地铁上班会不太方便。"
        ,"根据我的经验，总体上我觉得地铁出行要比公交更好。"
        ,"根据我的经验，相对于地铁，我更喜欢选择公交车出行。"
        ,"我更偏向于采用地铁出行，而不是比公交车。"
        ,"根据我的经验，相对于公共交通，我更喜欢采用小汽车出行。"
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
        ,"车内是否拥挤"
        ,"环境是否干净与嘈杂"
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