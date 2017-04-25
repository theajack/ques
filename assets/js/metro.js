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
      btnEvent(end,"完成");
    }
  });
}
var metroSen;
function appendMetroSenario1(){
  if(checkInput()){
    metroSen=new Metro(cnum(answer[4][1]),cnum(answer[4][0]),getCrow(),cnum(answer[4][2]));
    senario.append(metroSen.getSenario1());
    var subTitle="地铁与公交场景题";
    setLittleTitle(subTitle);
    senario.last().each(function(item,i){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设现在地铁票价提高，并有新的公交车线路"+(i+1)+"开通（信息如下），您是否上班会放弃地铁选择公交车？",
        list:["我仍然会选择地铁","我会放弃地铁转向新公交"],
        size:"two",
        subTitle:subTitle+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):":"")+"</span>"
      });
      if(i==0){
        times=get10Nums(item[2],item[1]);
      }
      item.appendArray(times);
      var ctimes=get10Nums(item[6],item[5]);
      item.appendArray(ctimes);
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost(),item[0],transType),transType,times,item[3])
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[4],-1,"bus"),"bus",ctimes,item[7])));
    });
    btnEvent(appendMetroSenario2);
    times=undefined;
  }
}
function appendMetroSenario2(){
  if(checkInput()){
    addSenaAnswer();
    if(hasCar){
      nextPage();
      var subTitle="地铁与自驾场景题";
      setLittleTitle(subTitle);
      senario.append(metroSen.getSenario2());
      senario.last().each(function(item,i){
        addQuestion({
          type:"single",
          title:"从您家到工作地点，假设现在地铁票价提高，并有新的开车线路1开通（信息如下），您上班是否会放弃地铁选择自驾？",
          list:["我仍然会选择地铁","我会放弃地铁转向自驾"],
          size:"two",
          subTitle:subTitle+(i+1)+"<span class='red'>"+((i+1>1)?"(此场景不同于以上场景):":"")+"</span>"
        });
        if(i==0){
          times=get10Nums(item[2],item[1]);
        }
        item.appendArray(times);
        var ctimes=get10Nums(item[6],item[5]);
        item.appendArray(ctimes);
        J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost(),item[0],transType),transType,times,item[3])
          +'<div class="middle">\
            <img src="assets/images/home_work.png" alt="" />\
          </div>'+geneSenario(getCostText(item[4],-1,"car"),"car",ctimes)));
      });
      btnEvent(function(){
        addSenaAnswer();
        setLittleTitle("");
        appendMetroRest();
      });
      times=undefined;
    }else{
      answer.append("");
      setLittleTitle("");
      appendMetroRest();
    }
  }
}
function appendMetroRest(){
  if(checkInput()){
    nextPage();
    addQuestion({
      type:"single",
      title:"请您回想过去一个月的上班过程：</br>其中您上班过程中采用地铁的次数是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
    });
    addQuestion({
      type:"single",
      title:"其中您上班过程中采用公交车的次数是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
    });
    addQuestion({
      type:"single",
      title:"其中你开车上班过程中的次数是：",
      list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
    });
    
    addTable(
      ["我出行时会习惯性选择地铁出行。"
        ,"我会下意识地采用地铁出行。"
        ,"如果不乘坐地铁上班，我会感觉有些奇怪。"
        ,"我不会考虑其他出行选择，就会选择地铁出行。"
        ,"采用地铁上班已经是我的一个日常习惯。"
        ,"我很难不选择乘坐地铁上班。"
        ,"我已经采用地铁上班很长一段时间了。"],
      ["非常符合","较为符合","中立","不大符合","完全不符合"],
      "以下有八项描述，请选择所描述内容是否符合您的实际"
    );
    addPeopleFactor();
    addRestCommon();
    btnEvent(end,"完成");
  }
}