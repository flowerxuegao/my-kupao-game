function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=200;
    this.y=220;
    this.width=100;
    this.height=118;
    this.speedx=5;
    this.speedy=2;
    this.zhongli=0.4;//重力加速度
    this.status="runs";
    this.state=0;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,82,118,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
function game(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.height=canvas.height;
    this.width=canvas.width;
    this.person=new person(canvas,cobj,runs,jumps);
}
game.prototype={
    play:function(){
        var that=this;
        var num=0;
        var top=0;
        var num2=0;
        setInterval(function(){
            that.cobj.clearRect(0,0,that.width,that.height);
            num++;
            num2+=15;
            that.person.state=num%8;
           // that.person.x+=thta.person.speedx;
            that.person.speedy+=that.person.zhongli;
            top+=that.person.speedy;
            if(top>=220){
                top=220;
            }
            that.person.y=top;
            that.person.draw();
            that.canvas.style.backgroundPosition=-num2+"px";
        },50)
    }
}