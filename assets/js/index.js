var ques_num=1;
var answer=new Array();
var transTypes=["全程自驾","全程地铁","全程公交车","公交车+地铁","自驾/出租车+地铁","非机动车+地铁","非机动车+公交","全程出租车","非机动车/步行"];
var area=["黄浦","徐汇","杨浦","闸北","宝山","虹口","嘉定","青浦","松江","奉贤","金山","静安","闵行","普陀","长宁","浦东新区"];
var dis=["5公里以内","5~10公里","10~15公里","15~20公里","20~30公里","30公里以上","不太清楚"];
var transType="";
var hasCar=false;
var isMobile=false;
var w,h;
J.ready(function(){
  if(J.tag("html").wid()<1000){
    isMobile=true;
  }
  resize();
  J.select("#start .button").clk(function(){
    addQuestion({
      type:"single",
      title:"您通常采用的上班交通方式是",
      list:transTypes
    });
    J.id("start").hide();
    J.id("paper").fadeIn();
    btnEvent(appendGeneralItems);
  });
})

window.onresize=resize;
function resize(){
  w=J.tag("html").wid();
  h=J.tag("html").hei();
  J.body().css({
    width:w+"px",
    height:h+"px"
  });
}
function appendGeneralItems(){
  if(checkInput()){
    addAnswer();
    var i=transTypes.indexOf(answer.last())+1;
    clearQuestion();
    if(i==1||i==5||i==8){
      transType="car";
      J.select("#title .l-title").txt("针对小汽车用户");
      addGeneralComm();
      addCarGeneral();
    }else if(i==2||i==4||i==6){
      transType="metro";
      J.select("#title .l-title").txt("针对地铁用户");
      addGeneralComm();
      addMetroGenral();
    }else{
      transType="bus";
      J.select("#title .l-title").txt("针对公交车用户");
      addGeneralComm();
      addBusGeneral();
    }
    btnEvent(appendCheck);
  }
}
function addCarGeneral(){
  addQuestion({
    type:"number",
    title:"根据您早上开车上班的经历：</br>\
    当交通较为通畅，上班较快情况下，大概需要_分钟[向上取整]</br>\
    当交通较为拥堵，上班较慢情况下，大概需要_分钟[向下取整]"
  });
  addQuestion({
    type:"number",
    title:"您过去一个月早上上班的平均出行时间约为_分钟"
  });
  addQuestion({
    type:"number",
    title:"预估您的出行油费为（距离乘以0.7）_[向上取整]"
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
    add:wrpperAdd(geneNumberItem("如果采用公交，通常情况下上班过程出行时间范围大概为：_分钟到_分钟")+
          wrpperAddTitle("通常情况下是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
  addQuestion({
    type:"single",
    title:"除了自驾，从您家到公司，是否可以采用地铁?",
    list:["可以","可以但很不方便（由于需要多次换乘/家或公司离地铁站远/时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果采用地铁，通常情况下上班过程出行时间范围大概为：_分钟到_分钟")+
          wrpperAddTitle("通常情况下是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
}
function addMetroGenral(){
  addQuestion({
    type:"number",
    title:"根据您早上乘坐地铁的经历：</br>\
    如果采用地铁，通常情况下上班过程出行时间范围大概为：_分钟到_分钟</br>\
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
      当交通较为通畅，上班较快情况下，大概需要_分钟</br>\
      当交通较为拥堵，上班较慢情况下，大概需要_分钟")),
    indexs:[0]
  });
  addQuestion({
    type:"single",
    title:"从您家到公司，是否可以采用公交车？",
    list:["可以","可以但很不方便（由于需要多次换乘/家或公司离公交站远/时间太长等原因）","不可以"],
    add:wrpperAdd(geneNumberItem("如果采用公交，通常情况下上班过程出行时间范围大概为：_分钟到_分钟")+
          wrpperAddTitle("通常情况下是否拥挤？")+
          geneSingleItem(["有座位","需站立不太拥挤","需站立拥挤"])),
    indexs:[0,1]
  });
}
function addBusGeneral(){
  addQuestion({
    type:"number",
    title:"根据您早上乘坐公交车上班的经历：</br>\
      当交通较为通畅，上班较快情况下，大概需要_分钟</br>\
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
      当交通较为通畅，上班较快情况下，大概需要_分钟</br>\
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
function wrpperAdd(str){
  return '<div class="hide">'+str+"</div>";
}
function wrpperAddTitle(str){
  return '<div class="q-t question add" a-type="single">'+str+'<span class="require">*</span></div>';
}

function addGeneralComm(){
  addQuestion({
    type:"select",
    title:"您居住的区域？",
    list:area
  });
  addQuestion({
    type:"select",
    title:"您工作的区域？",
    list:area
  });
  addQuestion({
    type:"single",
    title:"上班距离大概为？",
    list:(transType=="car")?dis.remove("不太清楚"):dis
  });
}
function clearQuestion(){
  J.id("quesWrapper").empty();
}
function addQuestion(opt){
  var s="";
  switch(opt.type){
    case "single":s=geneSingle(opt.title,opt.list,opt.num,opt.id,opt.add,opt.indexs,opt.car);break;
    case "select":s=geneSelect(opt.title,opt.list,opt.num,opt.id);break;
    case "number":s=geneNumber(opt.title,opt.num,opt.id);break;
    default:break;
  }
  J.id("quesWrapper").append(s);
}
function addAnswer(){
  J.id("quesWrapper").findClass("question").each(function(item){
    if(item.parent().css("display")=="none"){
      answer.append("");
    }else{
      answer.append(getAnswer(item));
    }
  });
}
function getAnswer(obj){
  //return eval("get"+obj.attr("a-type")+"(obj)");
  return (new Function("obj","return get"+obj.attr("a-type")+"(obj)"))(obj);
}
function geneSingle(title,list,num,id,add,indexs,isCarSena){
  num=J.checkArg(num,ques_num++);
  id=" id='"+J.checkArg(id,"")+"' ";
  var t=(isCarSena==true)?"car-":'';
  var s='<div class="q-w" '+id+'>\
          <div class="q-t '+t+'question" a-type="single">'+num+'. '+ title +'<span class="require">*</span></div>';
  s+=geneSingleItem(list,indexs);
  if(add!=undefined){
    s+=add;
  }
  s+='</div>';
  return s;
}
function geneSingleItem(list,indexs){
  var s="<div class='q-i-w'>"
  list.each(function(item,i){
    var showAdd;
    if(indexs==undefined){
      showAdd="null";
    }else{
      if(indexs.indexOf(i)>=0){
        showAdd="true";
      }else{
        showAdd="false";
      }
    }
    s+='<div class="s-q-i">\
          <span class="s-q-c" onclick="checkSingle(this,'+showAdd+')"><span class="s-q-cc"></span></span>\
          '+(i+1)+')<span onclick="checkSingle(this.prev(),'+showAdd+')">'+item+'</span>\
        </div>';
  })
  s+='</div>';
  return s;
}
function checkSingle(obj,showAdd){
  obj.parent(2).findClass("active").removeClass("active");
  obj.addClass("active");
  if(showAdd==true){
    obj.parent(2).next().slideDown();
  }else if(showAdd==false){
    obj.parent(2).next().slideUp();
  }
}
function getsingle(obj){
  var act=obj.next().findClass("active");
  if(act==undefined||act.length==0){
    //J.show("请选择","error");
    return "";
  }else{
    return act.next().txt();
  }
}
function checkInput(){
  var list=J.class("question");
  if(list.length==undefined){
    var res=getAnswer(list);
    if(res==""||res==undefined){
      J.show("请将信息填写完整","error");
      return false;
    }
  }else{
    for(var i=0;i<list.length;i++){
      if(list[i].parent().css("display")!="none"){
        var res=getAnswer(list[i]);
        if(res.constructor==Array){
          for(var j=0;j<res.length;j++){
            if(res[j]==""||res[j]==undefined){
              J.show("请将信息填写完整","error");
              return false;
            }
          }
        }else{
          if(res==""||res==undefined){
            J.show("请将信息填写完整","error");
            return false;
          }
        }
      }
    }
  }
  return true;
}
function geneSelect(title,list,num,id){
  num=J.checkArg(num,ques_num++);
  id=" id='"+J.checkArg(id,"")+"' ";
  var s='<div class="q-w"'+id+'>\
          <div class="q-t question" a-type="select">'+num+'. '+title+'\
            <select class="q-select">';
  list.each(function(item,i){
    s+='<option value="'+item+'">'+item+'</option>';
  })
  s+='</select>\
      <span class="require">*</span>\
    </div></div>';
  return s;
}
function getselect(obj){
  var val=obj.findClass("q-select").val();
  if(val==""){
    //J.show("请填写答案","error");
  }
  return val;
}

function geneNumber(title,num,id){
  num=J.checkArg(num,ques_num++);
  id=" id='"+J.checkArg(id,"")+"' ";
  title=title.replaceAll("_",'<input class="q-num" type="number" />');
  var s='<div class="q-w"'+id+'>\
        <div class="q-t question" a-type="number">'+num+'. '+title+'\
          <span class="require">*</span>\
        </div>\
      </div>';
  return s;
}
function geneNumberItem(title){
  return '<div class="q-t question add" a-type="number">'+title.replaceAll("_",'<input class="q-num" type="number" />')+'\
          <span class="require">*</span>\
        </div>';
}
function getnumber(obj){
  var val=obj.findClass("q-num").val();
  if(val==""){
    //J.show("请填写答案","error");
  }else if(val.constructor==Array){
    val.each(function(item){
      if(item==""){
        //J.show("请填写答案","error");
      }
    });
  }
  return val;
}
function appendCheck(){
  if(checkInput()){
    addAnswer();
    var Tup=cnum(answer[4][1]);
    var Tlow=cnum(answer[4][0]);
    if(Tlow<=0){
      Tlow=1;
      answer[4][1]=1;
    }
    if(Tup<=0){
      Tup=1;
      answer[4][0]=1;
    }
    if(Tlow==Tup){
      Tup++;
      answer[4][0]=Tup;
    }
    var RP_mean=(Tup+Tlow)/2;
    var a=Math.log(Tup/Tlow)/3.3;
    var u=Math.log(RP_mean)-Math.pow(a,2)/2;
    var RP_SD=Math.sqrt((Math.exp(Math.pow(a,2))-1)*Math.exp(2*u+Math.pow(a,2)));
    var x=get10Nums(RP_mean,RP_SD);
    var cost=getCost();
    clearQuestion();
    addQuestion({
      type:"single",
      title:"根据那您之前所填信息，您现在采用的上班方式信息大概如下。是否符合您的实际情况？",
      list:["基本符合","很不符合"]
    });
    addCheck(x,cost);
    btnEvent(function(){
      if(checkInput()){
        addAnswer();
        if(answer.last()!="基本符合"){
          rechoose();
        }else{
          hasCar=(answer[6]=="是")?true:false;
          appendSenario();
        }
      }
    });
  }
}
function getCost(){
  if(transType=="car"){
    return cnum(answer[6])+cnum(answer[8]);
  }else{
    return cnum(answer[4][2]);
  }
}
function cnum(str){
  if(str==""){
    return 0;
  }else{
    return parseFloat(str);
  }
}
function rechoose(){
  answer.length=1;
  ques_num=2;
  clearQuestion();
  appendGeneralItems();
  J.show("请重新填写","info");
}
function addCheck(x,cost){
  var s='<div class="s-wrapper clearfix">\
          <div class="s-left">\
            <div class="s-head"><span>您的原选择：</span><img src="assets/images/'+transType+'.png"/></div>\
            <div class="s-title">费用</div>\
            <div class="s-content">原费用：'+cost+'元</div>\
            <div class="s-title">时间范围</div>\
            <div class="s-content">每次出行实际时间由于实际情况不同，存在一定变动性。因此出行时间应该为一定范围。根据您之前的描述，有相等可能是以下10种情况：\
              <div class="s-item-wrapper clearfix">';
  x.each(function(a){
    s+='<div class="s-c-item">'+Math.round(a)+'分钟</div>';
  });
  s+='</div>\
            </div>\
          </div>\
          <div class="s-right">\
            <img src="assets/images/home_work.png"/>\
          </div>\
        </div>';
  J.id("quesWrapper").append(s);
}
var senario=new Array();
function appendSenario(){
  clearQuestion();
  if(transType=="bus"){
    appendBusSenario();
    btnEventCommon();
  }else if(transType=="car"){
    appendCarSenario();
  }else{
    appendMetroSenario();
    btnEventCommon();
  }
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
      J.id("nextBtn").txt("完成");
      btnEvent(end);
    }
  });
}
function appendBusSenario(){
  var sen=new Bus(cnum(answer[4][1]),cnum(answer[4][0]),getCrow());
  senario.append(sen.getSenario1());
  senario.last().each(function(item){
    addQuestion({
      type:"single",
      title:"从您家到工作地点，假设现在有新的地铁线路1开通（信息如下），您是否上班会放弃公交车选择地铁？",
      list:["我仍然会选择公交车","我会放弃公交车转向地铁"]
    });
    J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost()),transType,get10Nums(item[2],item[1]),item[3])
      +'<div class="middle">\
        <img src="assets/images/home_work.png" alt="" />\
      </div>'+geneSenario(getCostText(item[4]),"metro",get10Nums(item[6],item[5]),item[7])));
  });
  if(hasCar){
    senario.append(sen.getSenario2());
    senario.last().each(function(item){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，有新的开车线路1开通（信息如右侧），您上班是否会放弃公交车选择自驾？",
        list:["我仍然会选择公交车","我会放弃公交车转向自驾"]
      });
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost()),transType,get10Nums(item[2],item[1]),item[3])
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[4]),"car",get10Nums(item[6],item[5]))));
    });
  }
}
function getCostText(cb,ca){
  if(ca==undefined){
    return "票价："+cb+"元";
  }else{
    return "原票价："+cb+"元 ; 增加："+(ca-cb)+"元</br>共：" +ca+"元";
  }
}
function appendMetroSenario(){
  var sen=new Metro(cnum(answer[4][1]),cnum(answer[4][0]),getCrow(),cnum(answer[4][2]));
  senario.append(sen.getSenario1());
  senario.last().each(function(item){
    addQuestion({
      type:"single",
      title:"从您家到工作地点，假设现在地铁票价提高，并有新的公交车线路1开通（信息如下），您是否上班会放弃地铁选择公交车？",
      list:["我仍然会选择地铁","我会放弃地铁转向新公交"]
    });
    J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost(),item[0]),transType,get10Nums(item[2],item[1]),item[3])
      +'<div class="middle">\
        <img src="assets/images/home_work.png" alt="" />\
      </div>'+geneSenario(getCostText(item[4]),"bus",get10Nums(item[6],item[5]),item[7])));
  });
  if(hasCar){
    senario.append(sen.getSenario2());
    senario.last().each(function(item){
      addQuestion({
        type:"single",
        title:"从您家到工作地点，假设现在地铁票价提高，并有新的开车线路1开通（信息如下），您上班是否会放弃地铁选择自驾？",
        list:["我仍然会选择地铁","我会放弃地铁转向自驾"]
      });
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(getCostText(getCost(),item[0]),transType,get10Nums(item[2],item[1]),item[3])
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[4]),"car",get10Nums(item[6],item[5]))));
    });
  }
}

function appendCarSenario(){
  
  J.id("nextBtn").txt("完成");
  btnEvent(carEnd);
  /*加全部题目*/
  
  var sen=new Car(cnum(answer[4][1]),cnum(answer[4][0]),cnum(answer[6])+cnum(answer[8]),0,0);
  
  
  senario.append(sen.getSenario1());
  senario.last().each(function(item){
    addQuestion({
        type:"single",
        car:true,
        title:"从您家到工作地点，假设现在对自驾进行政策性收费，并有新的地铁线路1开通（信息如下），您上班是否会放弃自驾选择地铁？",
        list:["我仍然会选择自驾","我会放弃自驾转向新地铁"]
      });
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
        getCostText(getCost(),item[0]),transType,get10Nums(item[2],item[1]))
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[3]),"metro",get10Nums(item[5],item[4]),item[6])));
  });
  
  senario.append(sen.getSenario2());
  senario.last().each(function(item){
    addQuestion({
        type:"single",
        car:true,
        title:"从您家到工作地点，假设现在对自驾进行政策性收费，并有新的公交车线路1开通（信息如下），您是否上班会放弃自驾选择公交车？",
        list:["我仍然会选择自驾","我会放弃自驾转向新公交"]
      });
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
        getCostText(getCost(),item[0]),transType,get10Nums(item[2],item[1]))
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[3]),"bus",get10Nums(item[5],item[4]),item[6])));
  });
  
  
  addQuestion({
    type:"single",
    title:"请您回想过去一个月的上班过程：</br>其中您上班过程中开车上班的频率是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中您上班过程中采用地铁的频率是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中您采用公交的频率是：",
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
    "习惯强度度量指标"
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
  
  senario.append(sen.getSenario3());
  senario.last().each(function(item){
    appendCarSenario3(item);
  });
  
  
  addTable(
    ["从我居住的地方，我愿意尝试使用公共交通上下班。"
      ,"我愿意减少小汽车出行，更多的使用公共交通。"],
    ["非常同意","较为同意","不一定","不太同意","完全不同意"],
    "公共交通工具选择一项"
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
    "对小汽车和公共交通的态度"
  );
  
  senario.append(sen.getSenario4(getDistance(),0));
  senario.last().each(function(item){
    addQuestion({
        type:"single",
        car:true,
        title:"从您家到工作地点，假设现在对您现在自驾的路线进行收费，并有新开通的线路1（信息如下），您是否会选择新的路线？",
        list:["我仍然会选择我的原路径","我会放弃原路径选择新路径"]
      });
      J.id("quesWrapper").child().last().append(wrapperSena(geneSenario(
        getCostText(getCost(),item[0]),transType,get10Nums(item[2],item[1]))
        +'<div class="middle">\
          <img src="assets/images/home_work.png" alt="" />\
        </div>'+geneSenario(getCostText(item[3]),"car",get10Nums(item[5],item[4]))));
  });
  
  
  addTable(
    ["使用小汽车会增加尾气排放、环境污染和城市交通等社会问题。"
      ,"减少小汽车出行，多使用公共交通有利于帮助缓解交通拥堵与环境问题。"
      ,"我不太清楚公共交通是否比小汽车更加环保和有利于城市交通"
      ,"我觉得每个人都应该为减少城市交通拥堵、污染与能源消耗负一定责任"
      ,"一个人的贡献对缓解交通拥堵的效果是微不足道的。"
      ,"个人行为对交通拥堵与环境污染等改善是微不足道的，只能靠政府。"],
    ["非常同意","较为同意","不一定","不太同意","完全不同意"],
    "环境意识"
  );
  addTable(
    ["我觉得我有责任为减少交通问题奉献一份力，不管别人怎么做。"
      ,"我不会为过分使用小汽车造成城市交通问题而有负罪感。"
      ,"在生活中我正在尽量采用更加绿色的出行方式。"],
    ["非常符合","较为符合","中立","不大符合","完全不符合"],
    "足够的改善交通意识"
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
    "出行注重因素"
  );

}
function getDistance(){
  var d=0;
  switch(answer[3]){
    case "5公里以内":d=5;break;
    case "5~10公里":d=15;break;
    case "10~15公里":d=25;break;
    case "15~20公里":d=35;break;
    case "20~30公里":d=50;break;
    case "30公里以上":d=70;break;
  }
  return d;
}
function appendCarSenario3(item){
  addQuestion({
    type:"single",
    car:true,
    title:"假设您工作地点更换到新的地点，您的上班选择发生了很大改变，新的可选择三种交通方式情况如下，您会选择哪种交通方式。",
    list:["我选择自驾","我选择地铁","我选择公交"]
  });
  J.id("quesWrapper").child().last().append(wrapperSena3(
    geneSenario3(item[0],transType,get10Nums(item[2],item[1]))
    +geneSenario3(item[3],"metro",get10Nums(item[5],item[4]),item[6])
    +geneSenario3(item[7],"bus",get10Nums(item[9],item[8]),item[10])
  ));
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
function getCrow(){
  var crow=answer[4];
  if(crow=="有座位"){
    crow=0;
  }else if(crow=="需站立不太拥挤"){
    crow=1;
  }else{
    crow=3;
  }
  return crow;
}
function wrapperSena(str){
  return '<div class="sena-wrapper clearfix">'+str+'</div>';
}
function geneSenario(costText,type,x,i){
  var ctext=["有座位","站立，不拥挤","","站立，很拥挤"];
  var text=(type==transType)?"您的原选择：":"新选择";
  var s='<div class="s-wrapper sena">\
      <div class="s-head"><span>'+text+'</span><img src="assets/images/'+type+'.png"/></div>\
      <div class="s-title">费用</div>\
      <div class="s-content">'+costText+'</div>\
      <div class="s-title">时间范围</div>\
      <div class="s-content">实际时间有相等可能是以下10种情况：\
        <div class="s-item-wrapper clearfix">';
        x.each(function(item){
          s+='<div class="s-c-item">'+Math.round(item)+'分钟</div>';
        })
        s+='</div>\
      </div>\
      <div class="s-title">车厢内拥挤程度</div>';
      if(i==undefined){
        s+='<div class="s-content car">舒适\
          </div>'
      }else{
        s+='<div class="s-content">'+ctext[i]+'\
            <img src="assets/images/'+type+i+'.jpg" alt="" />\
          </div>'
      }
      
    s+='</div>'
  return s;
}
function addText(str){
  J.id("quesWrapper").append(geneText(str))
}
function geneText(str){
  var s='<div class="q-w">\
        <div class="q-text">'+str+'\
        </div>\
      </div>';
  return s;
}
function btnEvent(fun){
  J.id("nextBtn").clk(fun);
  J.id("nextBtn").clk("J.body().scrollTop=0",true);
}