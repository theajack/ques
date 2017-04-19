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
  addText("个人属性：");
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
              <td class="table-l-item">'+(ques_num++)+'. '+str+'</td>'+optStr+"</tr>";
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
    showLotter();
    J.id("paper").hide();
    J.id("start").child(0).hide();
    J.id("start").child(1).show();
    J.id("start").fadeIn();
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
function arrayToString(arr){
  if(arr[0].constructor==Array){
    var s="[[";
    arr.each(function(a,i){
      s+=a.toString();
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