var ques_num=0;
var answer=new Array();
var transTypes=["全程自驾","全程地铁","全程公交车","公交车+地铁","自驾/出租车+地铁","非机动车+地铁","非机动车+公交","全程出租车","非机动车/步行"];
var area=["黄浦","徐汇","杨浦","闸北","宝山","虹口","嘉定","青浦","松江","奉贤","金山","静安","闵行","普陀","长宁","浦东新区"];
var dis=["5公里以内","5~10公里","10~15公里","15~20公里","20~30公里","30公里以上","不太清楚"];
var transType="";
var hasCar=false;
var isMobile=false;
var w,h;
var letter=["a","b","c","d","e","f","g","h","i","j","k"]
var page_index=0;
var ques_index=0;
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
function nextPage(){
  page_index++;
  ques_index=0;
  clearQuestion();
}
window.onresize=resize;
function resize(){
  w=J.tag("html").wid();
  h=J.tag("html").hei();
  J.body().css({
    width:w+"px",
    height:h+"px"
  });
}
function setLittleTitle(str){
  J.select("#title .l-title").txt(str);
}
function appendGeneralItems(){
  if(checkInput()){
    addAnswer();
    nextPage();
    var i=transTypes.indexOf(answer.last())+1;
    if(i==1||i==5||i==8){
      transType="car";
      addGeneralComm();
      addCarGeneral();
    }else if(i==2||i==4||i==6){
      transType="metro";
      addGeneralComm();
      addMetroGenral();
    }else{
      transType="bus";
      addGeneralComm();
      addBusGeneral();
    }
  }
  btnEvent(appendCheck);
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
  ques_num++;
  ques_index++;
  switch(opt.type){
    case "single":s=geneSingle(opt.title,opt.list,opt.id,opt.add,opt.indexs,opt.size,opt.subTitle);break;
    case "select":s=geneSelect(opt.title,opt.list,opt.id);break;
    case "number":s=geneNumber(opt.title,opt.id);break;
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
  return (new Function("obj","return get"+obj.attr("a-type")+"(obj)"))(obj);
}
function geneSingle(title,list,id,add,indexs,size,sub){
  sub=J.checkArg(sub,"");
  id=" id='"+J.checkArg(id,"")+"' ";
  var s='<div class="q-w" '+id+'>\
          <div class="q-t question" a-type="single">'+letter[page_index]+ques_index+'. '+sub+title +'<span class="require">*</span></div>';
  s+=geneSingleItem(list,indexs,size);
  if(add!=undefined){
    s+=add;
  }
  s+='</div>';
  return s;
}
function geneSingleItem(list,indexs,size){
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
    var t=J.checkArg(size,"");
    s+='<div class="s-q-i '+t+'">\
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
function geneSelect(title,list,id){
  id=" id='"+J.checkArg(id,"")+"' ";
  var s='<div class="q-w"'+id+'>\
          <div class="q-t question" a-type="select">'+letter[page_index]+ques_index+'. '+title+'\
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

function geneNumber(title,id){
  id=" id='"+J.checkArg(id,"")+"' ";
  title=title.replaceAll("_",'<input class="q-num" type="number" />');
  var s='<div class="q-w"'+id+'>\
        <div class="q-t question" a-type="number">'+letter[page_index]+ques_index+'. '+title+'\
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
    nextPage();
    addQuestion({
      type:"single",
      title:"根据那您之前所填信息，您现在采用的上班方式信息大概如下。是否符合您的实际情况？",
      list:["基本符合","很不符合"]
    });
    addCheck(x,cost);
    btnEvent(function(){
      if(checkInput()){
        addAnswer();
        nextPage();
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
    return cnum(getCarMoney())+cnum(answer[7]);
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
  nextPage();
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
            <div class="s-content">每天上班的实际时间由于实际路况的不同，实际在一定时间范围内变动。根据您之前的时间范围描述，实际出行时间有相同可能是以下10种情况：\
              <div class="s-item-wrapper clearfix">';
  x.each(function(a){
    s+='<div class="s-c-item">'+Math.round(a)+'分钟</div>';
  });
  s+='</div>\
            </div>\
            <div class="s-title">平均时间</div>\
            <div class="s-content">'+ave(x)+'分钟</div>';
            
          if(transType!="car"){
            var i;
            if(answer[5].length==3){
              i=0;
            }else if(answer[5].length==7){
              i=2;
            }else{
              i=3;
            }
            s+='<div class="s-title">车厢内拥挤程度</div>\
            <div class="s-content">'+ctext[i]+'\
              <img src="assets/images/'+transType+i+'.jpg" alt="" />\
            </div>'
          }
          s+='</div><div class="s-right">\
            <img src="assets/images/home_work.png"/>\
          </div>\
        </div>';
  J.id("quesWrapper").append(s);
  setTimeout(function(){
    var l=J.class("s-right").prev().hei();
    J.class("s-right").css("height",l+"px");
    J.select(".s-right img").css("height",l+"px");
  },10)
}
function ave(x){
  var sum=0;
  x.each(function(a){
    sum+=a;
  })
  return Math.round(sum/x.length);
}

var senario=new Array();
function appendSenario(){
  if(transType=="bus"){
    appendBusSenario1();
  }else if(transType=="car"){
    appendCarSenario1();
  }else{
    appendMetroSenario1();
  }
  changeLength();
}

function getCostText(cb,ca,type){
  if(ca==undefined||ca<0){
    if(type=="car"){
      return "费用："+cb+"元";
    }
    return "票价："+cb+"元";
  }else{
    if(type=="car"){
      return "原费用："+cb+"元;增加："+(ca-cb)+"元</br>共：" +ca+"元";
    }
    return "原票价："+cb+"元;增加："+(ca-cb)+"元</br>共：" +ca+"元";
  }
}

function getDistance(){
  var d=0;
  switch(answer[3]){
    case "5公里以内":d=5;break;
    case "5~10公里":d=7.5;break;
    case "10~15公里":d=12.5;break;
    case "15~20公里":d=17.5;break;
    case "20~30公里":d=25;break;
    case "30公里以上":d=30;break;
  }
  return d;
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

var ctext=["有座位","站立，不拥挤","","站立，很拥挤"];
function geneSenario(costText,type,x,i,index){
  var text=(type==transType)?"您的原选择:":"新选择:";
  if(index!=undefined){
    text="新选择:"
  }
  var s='<div class="s-wrapper sena">\
      <div class="s-head"><span>'+text+'</span><img src="assets/images/'+type+'.png"/></div>\
      <div class="s-title">费用</div>\
      <div class="s-content cost">'+costText+'</div>\
      <div class="s-title">时间范围</div>\
      <div class="s-content time">实际时间有相等可能是以下10种情况：\
        <div class="s-item-wrapper clearfix">';
        x.each(function(item){
          s+='<div class="s-c-item">'+Math.round(item)+'分钟</div>';
        })
        s+='</div>\
      </div>\
      <div class="s-title">平均时间</div>\
      <div class="s-content">'+ave(x)+'分钟</div>';
      if(i==undefined){
        s+='<div class="s-title">车厢内拥挤程度</div>\
            <div class="s-content image car">舒适\
          </div>'
      }else{
        if(i!="none"){
          s+='<div class="s-title">车厢内拥挤程度</div>\
              <div class="s-content">'+ctext[i]+'\
              <img src="assets/images/'+type+i+'.jpg" alt="" />\
            </div>'
        }
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
function btnEvent(fun,text){
  if(text!=undefined){
    J.id("nextBtn").txt(text);
  }
  J.id("nextBtn").clk(fun);
  J.id("nextBtn").clk("J.body().scrollTop=0",true);
}

function addSenaAnswer(){
  var anss=[];
  J.id("quesWrapper").findClass("question").each(function(item,i){
    var ans=getAnswer(item);
    if(ans.length<=6){
      if(ans.has("自驾")){
        ans=0;
      }else if(ans.has("地铁")){
        ans=1;
      }else{
        ans=2;
      }
    }else{
      ans=(ans.has("放弃"))?1:0;
    }
    anss.append(ans);
  });
  var k=0;
  senario.last().each(function(a){
    a.append(anss[k]);
    k++;
  })
  answer.append(arrayToString(senario.last()));
}

function changeLength(){
  setTimeout(function(){
    J.class("middle").each(function(item){
      var l=item.prev().hei();
      item.css("height",l+"px");
      item.child(0).css("height",l+"px");
    });
  },10)
}
function allEnd(){
  if(lot){
    answer.append(J.id("account").val(),last_money);
  }else{
    answer.append("",0);
  }
  J.class("lotter-wrapper").hide();
  var result=dealAnswer();
  alert(result);
}
var _lot_num=0;
var canLot=true;
var last_money=0;
var lot=false;
function showLotter(){
  J.id("paper").hide();
  J.class("lotter-wrapper").show();
  J.class("lotter").child(1).txt("点击抽奖").show();
  J.class("lotter").child(2).empty();
}
function lotter(obj){
  if(canLot){
    canLot=false;
    if((transType=="car"&&_lot_num>=2)||(transType!="car"&&_lot_num>=1)){
      J.show("抽奖资格已用完","error");
      return;
    }
    obj.txt("抽取中...")
    setTimeout(function(){
      _lot_num++;
      var money=0;
      var num=J.getRandom(0,1000)*0.1;
      if(num>0&&num<=30){
        money=0.5;
      }else if(num>30&&num<=40){
        money=1;
      }else if(num>50&&num<=58){
        money=2;
      }else if(num>65&&num<=69){
        money=5;
      }else if(num>80&&num<=81){
        money=10;
      }else if(num>90&&num<=90.5){
        money=50;
      }
      obj.hide();
      if(transType=="car"){
        if(_lot_num==1){
          canLot=true;
          if(money>0){
            obj.next().html('恭喜您中奖了！本次您中了<span class="red money">'+money+'</span>元！</br>\
            <span class="lotter-warn">(完成所有内容后另有一次抽奖，需完成所有内容才能获取红包)</span>\
            <div class="button m-s" onclick="appendCarSenario3()">下一步</div>');
            lot=true;
          }else{
            obj.next().html('很遗憾您没有中奖</br>\
            (完成所有内容后还有一次抽奖)\
            <div class="button m-s" onclick="appendCarSenario3()">下一步</div>');
          }
        }else{
          if(money>0){
            obj.next().html('恭喜您中奖了！本次您中了<span class="red money">'+money+'</span>元！共'+(money+last_money)+'元。请填写您的支付宝账号方便转账</br>\
            <span class="lotter-warn">(注：本调查为科研项目，只能采用人工后期转账，最晚隔天24:00前到账)</span></br>\
            <input placeholder="支付宝账号" id="account"/>\
            <div class="button m-s" onclick="allEnd()">提交</div>');
            lot=true;
          }else{
            if(last_money>0){
              obj.next().html('本次您没有中奖！奖金共'+(money+last_money)+'元。请填写您的支付宝账号方便转账</br>\
              <span class="lotter-warn">(注：本调查为科研项目，只能采用人工后期转账，最晚隔天24:00前到账)</span></br>\
              <input placeholder="支付宝账号" id="account"/>\
              <div class="button m-s" onclick="allEnd()">提交</div>');
              lot=true;
            }else{
              obj.next().html('很遗憾您没有中奖');
              setTimeout(function(){
                J.class("lotter-wrapper").fadeOut();
              },1500);
              allEnd();
            }
          }
        }
      }else{
        if(money>0){
          obj.next().html('恭喜您中奖了！本次您中了<span class="red money">'+money+'</span>元！请填写您的支付宝账号方便转账</br>\
          <span class="lotter-warn">(注：本调查为科研项目，只能采用人工后期转账，最晚隔天24:00前到账)</span>\
          <input placeholder="支付宝账号" id="account"/>\
            <div class="button m-s" onclick="allEnd()">提交</div>');
            lot=true;
        }else{
          obj.next().txt('很遗憾您没有中奖');
          setTimeout(function(){
            J.class("lotter-wrapper").fadeOut();
          },1500);
          allEnd();
        }
      }
      last_money+=money;
    },1500);
  }
}

















