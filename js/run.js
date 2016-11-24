window.onload=function(){
    var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    var canvas=document.querySelector("canvas");
    canvas.width=clientW;
    canvas.height=clientH;
    var cobj=canvas.getContext("2d");

    var runs=document.querySelectorAll(".run");
    var jumps=document.querySelectorAll(".jump");//得到的结果是一个集合
    var hinderImg = document.querySelectorAll(".hinder");

    var gameObj = new game(canvas,cobj,runs,jumps,hinderImg);
/*获取选项卡*/
    var start = $(".start");
    //获取遮罩
    var mas = $(".mas");
    //开始按钮
    var startButton = $(".btn");
    //one方法，一个事件只触发一次
    startButton.one("click",function(){
        gameObj.play(start,mas);
    })
    /*生命值*/
    var lifes = $(".life");
    var lifevalue = $("span",lifes);
    //alert(lifevalue.html());

    }



