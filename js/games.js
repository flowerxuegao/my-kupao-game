function lizi(cobj){
    this.cobj=cobj;
                this.x = 300;
                this.y = 200;
                this.r = 3+3*Math.random();
                this.color = "red";
                this.speedy = -8;
                this.speedx = Math.random()*16-3;
                this.zhongli = 0.3;
                this.speedr = 0.1;
            }
            lizi.prototype = {
                draw:function(){
                    var cobj=this.cobj;
                    cobj.save();
                    cobj.translate(this.x,this.y);
                    cobj.beginPath();
                    cobj.fillStyle = this.color;
                    cobj.arc(0,0,this.r,0,2*Math.PI);
                    cobj.fill();
                    cobj.restore();
                },
                update:function(){
                    this.x+=this.speedx;
                    this.speedy+=this.zhongli;
                    this.y+=this.speedy;
                    this.r-=this.speedr;
                }
            }

            function xue(cobj,x,y){
                var arr = [];
                /*创造雪*/
                for(var i = 0;i<30;i++)
                {
                    var obj = new lizi(cobj);
                    obj.x = x;
                    obj.y = y;
                    arr.push(obj);
                }
                var t = setInterval(function(){
                    for(var i = 0;i<arr.length;i++)
                    {

                        arr[i].draw();
                        arr[i].update();

                        if(arr[i].r<0){
                            arr.splice(i,1);
                        }
                    }
                    if(arr.length==0){
                        clearInterval(t);
                    }
                })
            }
//人
function person(canvas,cobj,runs,jumps,hinderImg){
    this.canvas = canvas;
    this.cobj = cobj;
    this.runs = runs;
    this.jumps = jumps;
    this.status = "runs";//定义人的状态
    this.state = 0;
    this.x = 0;
    this.y = 400;
    this.width = 200;
    this.height = 200;
    this.num = 0;
    this.speedx = 5;
    this.life = 3;
}
person.prototype = {
    //this[this.status][this.state] zhuagtai  zhangshu
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,300,400,0,0,this.width,this.height);
        //this.runs[0]~this.runs[7]
        this.cobj.restore();
    }
}
/*障碍物类*/
function hinder(canvas,cobj,hinderImg){
    this.canvas = canvas;
    this.cobj = cobj;
    this.hinderImg = hinderImg;
    this.state = 0;//默认的障碍物第0张
    this.x = canvas.width-20;
    //this.x = 0;
    this.y = 350; //调整
    this.width =250;//障碍物的宽高
    this.height = 240;
    this.speedx = 6;
}
hinder.prototype = {
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderImg[this.state],0,0,1000,952,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
//游戏的主类
function game(canvas,cobj,runs,jumps,hinderImg){

    this.person = new person(canvas,cobj,runs,jumps,hinderImg);
    this.canvas = canvas;
    this.cobj = cobj;
    this.hinderImg = hinderImg;
    this.width = canvas.width;
    this.height = canvas.height;
    this.backx =0;
    this.score = 0;//积分
    this.backSpeed = 8;
    this.hinderArr = [];//用数组保存障碍物
    //new hinder(canvas,cobj,hinderImg).draw();
    this.isfire = false;
    this.zidan = new zidan(canvas,cobj);
}
game.prototype = {
    play:function(start,mas){

        start.css("animation","start1 2s ease forwards");
        mas.css("animation","mas1 2s ease forwards");

        this.run();
        this.key();
        this.mouse();

    },
    run:function(){
        var that = this;
        var num = 0;
        var rand = (2+Math.ceil(6*Math.random()))*1000;
        setInterval(function(){
            num+=50;
            that.cobj.clearRect(0,0,that.width,that.height);
            that.person.num++; /*计算显示的图片*/
            //that.person.speedx=0;
            //that.backSpeed=6;
            if(that.person.status=="runs"){
                that.person.state =that.person.num%8;///控制第几张
            }
            else{
                that.person.state = 0;
            }
            /*让人物的x轴发生变化*/
            that.person.x+=that.person.speedx;
            if(that.person.x>that.width/3){

                that.person.x=that.width/3;
                //that.backx-=that.backSpeed;

            }
            that.person.draw();
            /*障碍物*/

            if(num%rand==0) //5000时间必须能够被50整除
            {
                rand = (2+Math.ceil(6*Math.random()))*1000;
                num=0;
                var obj = new hinder(that.canvas,that.cobj,that.hinderImg);
                obj.state = Math.floor(Math.random()*that.hinderImg.length);
               that.hinderArr.push(obj);

            }
            for(var i = 0;i<that.hinderArr.length;i++)
            {
                that.hinderArr[i].x-=that.hinderArr[i].speedx;
                that.hinderArr[i].draw();
                if(hit(that.canvas,that.cobj,that.person,that.hinderArr[i])){

                    if(!that.hinderArr[i].flag){
                        //记录碰撞
                        xue(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                        that.person.life--;
                        //console.log(that.person.life);//生命值
                        document.getElementsByTagName("span")[0].innerHTML = that.person.life;
                        //document.getElemntsByTagName
                        if(that.person.life<0){
                            alert("game over");
                            location.reload();//重新加载
                        }
                        that.hinderArr[i].flag = true;
                    }


                }
                /**/
                if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                    //既不是碰撞过的，也不是
                    if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
                        that.score++;
                        document.getElementsByTagName("span")[1].innerHTML = that.score;
                        that.hinderArr[i].flag1 = true;
                    }



                }
            }
            /*caozuo zidan*/
            if(that.isfire){
                that.zidan.speedx+=that.zidan.jia;
                that.zidan.x+=that.zidan.speedx;

                that.zidan.draw();
            }
            /*操作背景*/
            that.backx-=that.backSpeed;
            that.canvas.style.backgroundPositionX = that.backx+"px";
        },40)
    },
    /*跳跃*/
    key:function(){
        var that = this;
        var flag = true;
        document.onkeydown = function(e){
            that.person.status = "jumps";
            if(!flag){
                return;
            }
            flag = false;
            if(e.keyCode==32){  //空格
               var inita = 0;
                var speeda = 5;

                var r= 180;
                var y = that.person.y//记录

                /*跳跃动画*/
                var t = setInterval(function(){
                    inita+=speeda;
                    if(inita>=180){
                        that.person.y = y;
                        clearInterval(t);
                        flag = true;
                        that.person.status = "runs";
                    }
                    else{
                        var top = Math.sin(inita*Math.PI/180)*r;
                        that.person.y=y-top;
                        //that.person.y=y;
                    }



                },50)
            }
        }
    },
    mouse:function(){
        var that = this;
        document.querySelector(".mas").onclick = function(){
            that.zidan.x=that.person.x+that.person.width/2;
            that.zidan.y = that.person.y+that.person.height/2;
            that.zidan.speedx =5;
            that.isfire = true;
        }

    }


}
/*zidan*/
function zidan(canvas,cobj){
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 10;
    this.color = "green";
    this.speedx = 5;
    this.jia = 1;
    this.cobj = cobj;
    this.canvas = canvas;

}
zidan.prototype = {
    draw:function(){
        var cobj = this.cobj;
        cobj.save();
        cobj.fillStyle = this.color;
        cobj.translate(this.x,this.y);
        cobj.fillRect(0,-50,this.width,this.height);

        cobj.restore();
    }

}