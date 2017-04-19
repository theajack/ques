function addBusGeneral(){
  addQuestion({
    type:"number",
    title:"根据您早上乘坐公交车上班的经历：</br>\
      <span class='bold-normal'>当交通较为通畅，上班较快情况下，大概需要_分钟</br>\
      当交通较为拥堵，上班较慢情况下，大概需要_分钟</br>\
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
      <span class='bold-normal'>当交通较为通畅，上班较快情况下，大概需要_分钟</br>\
      当交通较为拥堵，上班较慢情况下，大概需要_分钟")),
    indexs:[0]
  });
  addQuestion({
    type:"single",
    title:"从您家到公司，是否可以采用地铁？",
    list:["可以","可以但很不方便（由于需要多次换乘/家或公司离地铁站远/时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果采用公交，通常情况下上班过程出行时间范围大概为：_分钟到_分钟")+
          wrpperAddTitle("通常情况下是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
}
var busSen;
function appendBusSenario1(){
  busSen=new Bus(cnum(answer[4][1]),cnum(answer[4][0]),getCrow());
  var subTitle="公交与地铁场景题";
  setLittleTitle(subTitle);
  senario.append(busSen.getSenario1());
  senario.last().each(function(item,i){
    addQuestion({
      type:"single",
      title:"从您家到工作地点，假设现在有新的地铁线路"+(i+1)+"开通（信息如下），您是否上班会放弃公交车选择地铁？",
      list:["我仍然会选择公交车","我会放弃公交车转向地铁"],
      size:"two",
      subTitle:subTitle+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):":"")+"</span>"
    });
    if(i==0){
      times=get10Nums(item[2],item[1]);
    }
    item.appendArray(times);
    var ctimes=get10Nums(item[6],item[5]);
    item.appendArray(ctimes);
    J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost()),transType,times,item[3])
      +'<div class="middle">\
        <img src="assets/images/home_work.png" alt="" />\
      </div>'+geneSenario(getCostText(item[4]),"metro",ctimes,item[7])));
  });
  btnEvent(appendBusSenario2);
  times=undefined;
}
function appendBusSenario2(){
  addSenaAnswer();
  if(hasCar){
    nextPage();
    var subTitle="公交与自驾场景题";
    setLittleTitle(subTitle);
    senario.append(busSen.getSenario2());
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，有新的开车线路"+(i+1)+"开通（信息如右侧），您上班是否会放弃公交车选择自驾？",
        list:["我仍然会选择公交车","我会放弃公交车转向自驾"],
        size:"two",
        subTitle:subTitle+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):":"")+"</span>"
      });
      if(i==0){
        times=get10Nums(item[2],item[1]);
      }
      item.appendArray(times);
      var ctimes=get10Nums(item[6],item[5]);
      item.appendArray(ctimes);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost()),transType,times,item[3])
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[4]),"car",ctimes)));
    });
    btnEvent(function(){
      setLittleTitle("");
      addSenaAnswer();
      appendBusRest();
    });
    times=undefined;
  }else{
    answer.append("");
    setLittleTitle("");
    appendBusRest();
  }
}

function appendBusRest(){
  nextPage();
  addQuestion({
    type:"single",
    title:"请您回想过去一个月的上班过程：</br>其中您上班过程中采用公交的次数是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中您上班过程中采用地铁的次数是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中你开车上班过程中的次数是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
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
  addRestCommon();
  btnEvent(end,"完成");
}