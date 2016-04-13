/**
 * Created by tqy on 2016/4/11.
 */
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=500;
var MARGIN_LEFT=30;
var MARGIN_TOP=60;
var RADIUS=5;
var time=new Date();
var curHours=time.getHours();
var curMinutes=time.getMinutes();
var curSeconds=time.getSeconds();
var balls=new Array();
var colors=[
    "#33B5E5","#0099CC","#AA66CC","#9933CC	","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"
]

window.onload=function(){
    function playBGM(){
        document.getElementById("player").play();
    }

    setTimeout(playBGM,43);

    WINDOW_HEIGHT=document.body.clientHeight;
    WINDOW_WIDTH=document.body.clientWidth;
    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
    RADIUS=Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;

    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");

    context.width=WINDOW_WIDTH;
    context.height=WINDOW_HEIGHT;

    console.log(WINDOW_HEIGHT);
    console.log(WINDOW_WIDTH);

    console.log(canvas.width);
    console.log(canvas.height);

    function timeClock(){
        var date=new Date();

        render(context,date,canvas);
        update();

        setTimeout(timeClock,50);
    }

    timeClock();
}

function render(cxt,date,canvas){

    WINDOW_HEIGHT=document.body.clientHeight;
    WINDOW_WIDTH=document.body.clientWidth;
    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
    RADIUS=Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    var r=RADIUS;
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();

    if(curHours!=hours)
    {
        if(parseInt(curHours/10)!=parseInt(hours/10))
        {
            addBall(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),r);
        }
        if(parseInt(curHours%10)!=parseInt(hours%10)){
            addBall((r+1)*15+MARGIN_LEFT,MARGIN_TOP,parseInt(hours%10),r)
        }
        curHours=hours;
    }
    if(curMinutes!=minutes)
    {
        if(parseInt(curMinutes/10)!=parseInt(minutes/10))
        {
            addBall((r+1)*39+MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),r);
        }
        if(parseInt(curMinutes%10)!=parseInt(minutes%10)){
            addBall((r+1)*54+MARGIN_LEFT,MARGIN_TOP,parseInt(hours%10),r);
        }
        curMinutes=minutes;
    }
    if(curSeconds!=seconds)
    {
        if(parseInt(curSeconds/10)!=parseInt(seconds/10))
        {
            addBall((r+1)*78+MARGIN_LEFT,MARGIN_TOP,parseInt(seconds/10),r);
        }
        if(parseInt(curSeconds%10)!=parseInt(seconds%10)){
            addBall((r+1)*93+MARGIN_LEFT,MARGIN_TOP,parseInt(seconds%10),r);
        }
        curSeconds=seconds;
    }

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt,r);
    renderDigit((r+1)*15+MARGIN_LEFT,MARGIN_TOP,parseInt(hours%10),cxt,r);
    renderDigit((r+1)*30+MARGIN_LEFT,MARGIN_TOP,10,cxt,r);
    renderDigit((r+1)*39+MARGIN_LEFT,MARGIN_TOP,parseInt(minutes/10),cxt,r);
    renderDigit((r+1)*54+MARGIN_LEFT,MARGIN_TOP,parseInt(minutes%10),cxt,r);
    renderDigit((r+1)*69+MARGIN_LEFT,MARGIN_TOP,10,cxt,r);
    renderDigit((r+1)*78+MARGIN_LEFT,MARGIN_TOP,parseInt(seconds/10),cxt,r);
    renderDigit((r+1)*93+MARGIN_LEFT,MARGIN_TOP,parseInt(seconds%10),cxt,r);


    for(var i=0;i<balls.length;i++)
    {
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI);
        cxt.closePath();
        cxt.fill();
    }

    //console.log(balls.length);
}

function addBall(x ,y , num, r){
    for(var i=0;i<digit[num].length;i++)
    {
        for(var j=0;j<digit[num][i].length;j++)
        {
            if(digit[num][i][j]==1)
            {
                var aBall={
                    x:x+(r+1)+j*2*(r+1),
                    y:y+(r+1)+i*2*(r+1),
                    r:r,
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    g:1.5+Math.random(),
                    color:colors[parseInt(Math.random()*10)]
                }
                balls.push(aBall);
            }
        }
    }
}

function renderDigit(x ,y , num , cxt ,r){
    cxt.fillStyle="rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++)
    {
        for(var j=0;j<digit[num][i].length;j++)
        {
            if(digit[num][i][j]==1)
            {
                cxt.beginPath();
                cxt.arc(x+(r+1)+j*2*(r+1),y+(r+1)+i*2*(r+1),r,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}

function update(){
    for(var i=0;i<balls.length;i++)
    {
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;

        if(balls[i].y>=WINDOW_HEIGHT-balls[i].r){
            balls[i].y=WINDOW_HEIGHT-balls[i].r;
            balls[i].vy=-balls[i].vy*0.7;
        }
        if(balls[i].y!=WINDOW_HEIGHT&&balls[i].vy!=0)
        {
            if(balls[i].y>=WINDOW_HEIGHT-balls[i].r-5&&balls[i].y<=WINDOW_HEIGHT-balls[i].r-1+5&&balls[i].vy<=0.1&&balls[i].vy>=-0.1)
            {
                balls[i].y=WINDOW_HEIGHT;
                balls[i].vy=0;
            }
        }
    }

    var count=0;
    for(var i=0;i<balls.length;i++)
    {
        if(balls[i].x+balls[i].r>0&&balls[i].x-balls[i].r<WINDOW_WIDTH)
        {
            balls[count++]=balls[i];
        }
    }
    while(balls.length>count)
    {
        balls.pop();
    }
}

