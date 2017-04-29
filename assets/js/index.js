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
function nextPage(text){
  page_index++;
  ques_index=0;
  clearQuestion();
  if(text!=undefined){
    addText(text,"red");
  }
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
  //J.select("#title .l-title").txt(str);
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
    btnEvent(appendCheck);
  }
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
    list:(transType=="car")?dis.remove("不太清楚"):dis,
    id:"distantce"
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
    case "single":s=geneSingle(opt.title,opt.list,opt.id,opt.add,opt.indexs,opt.size,opt.subTitle,opt.answerId);break;
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
function geneSingle(title,list,id,add,indexs,size,sub,answer){
  sub=J.checkArg(sub,"");
  id=" id='"+J.checkArg(id,"")+"' ";//+letter[page_index]+ques_index+'. '
  var s='<div class="q-w" >\
          <div class="q-t question" '+id+' a-type="single">'+sub+title +'<span class="require">*</span></div>';
  s+=geneSingleItem(list,indexs,size,answer);
  if(add!=undefined){
    s+=add;
  }
  s+='</div>';
  return s;
}
function geneSingleItem(list,indexs,size,answer){
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
    var answerId=(answer==false)?'':(i+1)+')';
    s+='<div class="s-q-i '+t+'">\
          <span class="s-q-c" onclick="checkSingle(this,'+showAdd+')"><span class="s-q-cc"></span></span>\
          '+answerId+'<span onclick="checkSingle(this.prev(),'+showAdd+')">'+item+'</span>\
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
  id=" id='"+J.checkArg(id,"")+"' ";//+letter[page_index]+ques_index+'. '
  var s='<div class="q-w"'+id+'>\
          <div class="q-t question" a-type="select">'+title+'\
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
  title=title.replaceAll("_",'<input class="q-num" type="number" />');//+letter[page_index]+ques_index+'. '
  var s='<div class="q-w"'+id+'>\
        <div class="q-t question" a-type="number">'+title+'\
          <span class="require">*</span>\
        </div>\
      </div>';
  return s;
}
function geneNumberItem(title,all){
  var input="";
  if(all==true){
    input='id="money2" oninput="changeAllMoney()"';
  }
  return '<div class="q-t question add" a-type="number">'+title.replaceAll("_",'<input '+input+' class="q-num"  type="number" />')+'\
          <span class="require">*</span>\
        </div>';
}
function changeAllMoney(){
  var m2=parseFloat((J.id("money2").val()=="")?0:J.id("money2").val());
  J.id("moneyLu").txt(Math.round(m2));
  var m1=parseFloat(getDistanceByStr(getsingle(J.id("distantce")))*0.7);
  J.id("moneyYou").txt(Math.round(m1));
  J.id("allMoney").txt(Math.round(m1+m2));
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
    var Tup=convertNum(answer[4][1]);
    var Tlow=convertNum(answer[4][0]);
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
    var x=generateSenrio(RP_mean,RP_SD,Tup,Tlow);
    var cost=getCost();
    nextPage();
    addQuestion({
      type:"single",
      title:"根据那您之前所填信息，您现在采用的上班方式信息大概如下。是否符合您的实际情况？",
      list:["基本符合","很不符合"]
    });
    addCheck(x,cost,RP_mean);
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
    return convertNum(getCarMoney())+convertNum(answer[7]);
  }else{
    return convertNum(answer[4][2]);
  }
}
function convertNum(str){
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
function addCheck(x,cost,RP_mean){
  var s='<div class="s-wrapper clearfix">\
          <div class="s-left">\
            <div class="s-head"><span>您的原选择：</span><img src="assets/images/'+transType+'.png"/></div>\
            <div class="s-title">费用</div>\
            <div class="s-content">原费用：'+cost+'元</div>\
            <div class="s-title">时间范围</div>\
            <div class="s-content">每天上班的实际时间由于情况不同，在一定范围内变动。根据您之前描述，预估实际出行时间情况大概如下：\
              <div class="s-item-wrapper clearfix">';
              x.each(function(a){
                s+='<div class="new-time">'+Math.round(a[0])+'~'+Math.round(a[1])+'分钟 到达的可能性是 '+Math.round(a[2]*100)+'%</div>';
              });
              s+='</div>\
            </div>\
            <div class="s-content">平均时间：'+Math.round(RP_mean)+'分钟</div>';
            
          if(transType!="car"){
            var i;
            if(answer[5].length==3){
              i=0;
            }else if(answer[5].length==7){
              i=1;
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
  J.class("s-right").child(0).onload=function(){
    var l=J.class("s-right").prev().hei();
    J.class("s-right").css("height",l+"px");
    J.select(".s-right img").css("height",l+"px");
  }
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
}

function getCostText(cb,ca,type){
  if(ca==undefined||ca<0){
    if(type=="car"||type=="taxi"){
      return "费用："+cb+"元";
    }
    return "票价："+cb+"元";
  }else{
    if(type=="car"||type=="taxi"){
      return "原费用："+cb+"元;增加："+(ca-cb)+"元</br>共：" +ca+"元";
    }
    return "原票价："+cb+"元;增加："+(ca-cb)+"元</br>共：" +ca+"元";
  }
}

function getDistance(){
  return getDistanceByStr(answer[3]);
}
function getDistanceByStr(str){
  var d=0;
  switch(str){
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

function getSenarioTimeText(type){
  var text="";
  switch(type){
    case "bus":text="由于发车频率、路况不确定等因素， 实际时间：";break;
    case "metro":text="由于发车频率等因素， 实际时间：";break;
    default:text="由于实际路况不确定，实际时间：";break;
  }
  return text;
}
var ctext=["有座位","站立，不拥挤","","站立，很拥挤"];
function geneSenario(costText,type,x,i,index,mean){
  var text=(type==transType)?"您的原选择:":"新选择:";
  if(index!=undefined){
    text="新选择:"
  }
  
  var s='<div class="s-wrapper sena">\
      <div class="s-head"><span>'+text+'</span><img src="assets/images/'+type+'.png"/></div>\
      <div class="s-title">费用</div>\
      <div class="s-content cost">'+costText+'</div>\
      <div class="s-title">时间范围</div>\
      <div class="s-content time">'+getSenarioTimeText(type)+'\
        <div class="s-item-wrapper clearfix">';
        x.each(function(item){
          s+='<div class="new-time">'+Math.round(item[0])+'~'+Math.round(item[1])+'分钟 到达的可能性是 '+Math.round(item[2]*100)+'%</div>';
        })
        s+='</div>\
      </div>\
      <div class="s-content">平均时间：'+Math.round(mean)+'分钟</div>';
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
function addText(str,red){
  J.id("quesWrapper").append(geneText(str,red))
}
function geneText(str,red){
  red=J.checkArg(red,"")
  var s='<div class="q-w '+red+'">\
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
    if(item.next().child().length==3){
      if(ans.has("公交")){
        ans=2;
      }else if(ans.has("地铁")){
        ans=1;
      }else{
        ans=0;
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

function arrayToString(arr){
  if(arr[0].constructor==Array){
    var s="[[";
    arr.each(function(a,i){
      if(a.constructor==Array){
        a.each(function(item,i){
          if(item.constructor==Array&&item[0].length==3){
            s+=item.toString()+',"",';
          }else{
            if(i==a.length-1){
              s+=item.toString();
            }else{
              s+=item.toString()+",";
            }
          }
        })
      }else{
        s+=a.toString()+","
      }
      if(i==arr.length-1){
        s+="]]"
      }else{
        s+="],["
      }
    });
    return s;
  }else{
    return "["+arr.toString+"]";
  }
}
function changeLength(){
  var a=J.class("middle").last();
  if(a!=undefined){
    a.child(0).onload=function(){
      J.class("middle").each(function(item){
        var l=item.prev().hei();
        item.css("height",l+"px");
        item.child(0).css("height",l+"px");
      });
    }
  }
  var b=J.select(".s-content img").last();
  if(b!=undefined){
    b.onload=function(){
      J.class("middle").each(function(item){
        var l=item.prev().hei();
        item.css("height",l+"px");
        item.child(0).css("height",l+"px");
      });
    }
  }
}
function allEnd(){
  J.class("lotter-wrapper").hide();
  var result=dealAnswer();
  var acc=0,mon=0;
  if(lot){
    acc=J.id("account").val();
    mon=last_money;
  }
  J.ajax({
    type: "POST", 
    url: "http://10.60.45.44:8080/traffic/api/wenjuan/add",
    data:{
      "content":result,
      "phone":acc,
      "money":last_money
    },
    dataType:"json",
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    success: function(data){
      if(data.data==1){
        J.show("请不要重复提交","warn");
      }else{
        J.showWait("提交成功！奖金24小时内到账","success");
      }
    },
    error: function (err) {
      alert(err.toString());
    }
  });
  alert(result);
}
var _lot_num=0;
var canLot=true;
var last_money=0;
var lot=false;

var lottetNext=null;
function showLotter(fun){
  J.id("paper").hide();
  J.class("lotter-wrapper").show();
  J.class("lotter").child(1).txt("点击抽奖").show();
  J.class("lotter").child(2).empty();
  lottetNext=fun;
}
function lotter(obj){
  if(J.cookie("can_lotter")!="false"){
    if(canLot){
      canLot=false;
      if(_lot_num>=2){
        J.show("抽奖资格已用完","error");
        return;
      }
      obj.txt("抽取中...")
      setTimeout(function(){
        _lot_num++;
        var money=0;
        var num=J.random(0,1000)*0.1;
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
        if(_lot_num==1){
          canLot=true;
          if(money>0){
            obj.next().html('恭喜您中奖了！本次您中了<span class="red money">'+money+'</span>元！</br>\
            <span class="lotter-warn">(完成所有内容后另有一次抽奖，需完成所有内容才能获取红包)</span>\
            <div class="button m-s" onclick="'+lottetNext+'()">下一步</div>');
            lot=true;
          }else{
            obj.next().html('很遗憾您没有中奖</br>\
            (完成所有内容后还有一次抽奖)\
            <div class="button m-s" onclick="'+lottetNext+'()">下一步</div>');
          }
        }else{
          if(money>0){
            obj.next().html('恭喜您中奖了！本次您中了<span class="red money">'+money+'</span>元！共'+(money+last_money)+'元。请填写您的支付宝账号方便转账</br>\
            <span class="lotter-warn">(注：本调查为科研项目，只能采用人工后期转账，最晚隔天24:00前到账)</span></br>\
            <input placeholder="支付宝账号" id="account"/>\
            <div class="button m-s" onclick="allEnd()">提交</div>');
            lot=true;
            J.cookie("can_lotter","false");
          }else{
            if(last_money>0){
              obj.next().html('本次您没有中奖！奖金共'+(money+last_money)+'元。请填写您的支付宝账号方便转账</br>\
              <span class="lotter-warn">(注：本调查为科研项目，只能采用人工后期转账，最晚隔天24:00前到账)</span></br>\
              <input placeholder="支付宝账号" id="account"/>\
              <div class="button m-s" onclick="allEnd()">提交</div>');
              lot=true;
              J.cookie("can_lotter","false");
            }else{
              obj.next().html('很遗憾您没有中奖');
              setTimeout(function(){
                J.class("lotter-wrapper").fadeOut();
              },1500);
              allEnd();
              J.cookie("can_lotter","false");
            }
          }
        }
        last_money+=money;
      },1500);
    }
  }
}
function active(obj){
  obj.parent().findClass("active").removeClass("active");
  obj.addClass("active");
}
function appendMetroRest(){
  appendMAndBRest();
  addQuestion({
    type:"single",
    title:"请您回想过去一个月的上班过程：</br>其中您上班过程中采用地铁的频率是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中您上班过程中采用公交车的频率是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中你开车上班过程中的频率是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  
  addTable(
    ["我出行时会习惯性选择地铁出行。"
      ,"我会下意识地采用地铁出行。"
      ,"如果不乘坐地铁上班，我会感觉有些奇怪。"
      ,"我不会考虑其他出行选择，就会选择地铁出行 选择1时间可能为30~60分钟，选择2可能为40~50分钟，我更偏向于选择1."
      ,"采用地铁上班已经是我的一个日常习惯。"
      ,"我很难不选择乘坐地铁上班。"
      ,"我已经采用地铁上班很长一段时间了。"],
    ["非常符合","较为符合","中立","不大符合","完全不符合"],
    "请选择所描述内容是否符合您的实际或您是否同意"
  );
  
  addPeopleFactor();
  addRestCommon();
}
function appendBusRest(){
  appendMAndBRest();
  
  addQuestion({
    type:"single",
    title:"请您回想过去一个月的上班过程：</br>其中您上班过程中采用公交的频率是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中您上班过程中采用地铁的频率是：",
    list:["从不","少于1周一次","一周1次","一周2次","一周3次","一周4次","一周5次或更多"]
  });
  addQuestion({
    type:"single",
    title:"其中你开车上班过程中的频率是：",
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
    "请选择所描述内容是否符合您的实际或您是否同意"
  );
  addPeopleFactor();
  addRestCommon();
}
function addPeopleFactor(){
  addQuestion({
    type:"single",
    title:"性别：",
    list:["男","女"]
  });
  addQuestion({
    type:"single",
    title:"年龄：",
    list:["20岁以下","21~30岁","31~40岁","41~50岁","51岁以上"]
  });
  addQuestion({
    type:"single",
    title:"教育程度：",
    list:["专科及以下","本科","硕士","博士及以上"]
  });
  addQuestion({
    type:"single",
    title:"您的职业：",
    list:["非国企公司职员","国企公司职员","公务员","事业单位(教师等)","学生","个体经营","自由职业","军人 ","其他"]
  });
  addQuestion({
    type:"single",
    title:"您车牌是：",
    list:["在上海没有小汽车","沪牌","沪C","外地牌照"]
  });
  addQuestion({
    type:"single",
    title:"是否为弹性工作制？（弹性工作制是指没有严格的早上上班时间，只需要满足一定工作时间即可）",
    list:["是","否"]
  });
  addQuestion({
    type:"single",
    title:"平均税前总收入（每月）：",
    list:["3000以下","3000~6000","6000~1万","1万~2万","2~3万","3万以上"]
  });
}
function addRestCommon(){
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
}



function addTable(ques,opt,title){
  if(isMobile){
    if(title!=undefined){
      addText(title);
    }
    ques.each(function(item){
      addQuestion({
        type:"single",
        title:item,
        list:opt
      });
    });
  }else{
    var optStr="";
    opt.each(function(str){
      optStr+='<td class="table-l-item" onclick="active(this)">'+str+'</td>'
    });
    var s='<div class="q-w">';
    if(title!=undefined){
      s+='<div class="q-text">'+title+'</div>'
    }
        s+='<table class="table-wrapper">\
            <tr class="table-item">\
              <td class="table-l-item">题目</td>'+optStr+"</tr>";
            ques.each(function(str){
              s+='<tr class="table-item question" a-type="table">\
              <td class="table-l-item">'+str+'</td>'+optStr+"</tr>";
            });
          s+='</table></div>';
    J.id("quesWrapper").append(s);
  }
}
function gettable(obj){
  var res=obj.findClass("active");
  if(res.length==0){
    return "";
  }else{
    return res.txt();
  }
}
function end(){
  if(checkInput()){
    addAnswer();
    if(J.cookie("can_lotter")!="false"){
      showLotter(allEnd);
      J.id("paper").hide();
      J.id("start").child(0).hide();
      J.id("start").child(1).show();
      J.id("start").fadeIn();
    }else{
      J.id("paper").hide();
      J.id("start").child(1).hide();
      J.id("start").child(0).show();
      J.id("start").fadeIn();
      allend();
    }
  }
}
function dealAnswer(){
  for(var i=0;i<answer.length;i++){
    if(answer[i].constructor==Array){
      var temp=answer[i];
      answer.remove(answer[i]);
      for(var j=0;j<temp.length;j++){
        answer.insert(temp[j],i+j);
      }
      i--;
    }
  }
  return answer.join(";")
}
function getTUp(){
  return parseFloat(answer[4][1]);
}
function getTLow(){
  return parseFloat(answer[4][0]);
}
function getMean(){
  return Math.round((getTUp()+getTLow())/2)
}
function geneTUp(M,SD){
  var sigma=Math.sqrt(Math.log((SD/M)^2+1))
  var mu=Math.log(M)-(sigma^2)/2;
  return Math.exp(mu+1.8*sigma);
}
function geneTLow(M,SD){
  var sigma=Math.sqrt(Math.log((SD/M)^2+1))
  var mu=Math.log(M)-(sigma^2)/2;
  return Math.exp(mu-1.8*sigma);
}



function hideLotter(){
  J.class("lotter-wrapper").hide();
  J.id("paper").show();
}








