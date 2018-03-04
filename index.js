var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var lineWidth=1;

autoSetCanvasSize(canvas);
function autoSetCanvasSize(canvas){
    setCanvasRect(canvas);
    window.onresize=function(){
        setCanvasRect(canvas);
    };
}
function setCanvasRect(canvas){
    var pageWidth=document.documentElement.clientWidth;
    var pageHeight=document.documentElement.clientHeight;
    canvas.width=pageWidth;
    canvas.height=pageHeight;
}

// ctx.fillStyle="blue";
// ctx.fillRect(10,10,100,100);
// ctx.strokeStyle='yellow';
// ctx.strokeRect(10,10,100,100);
// ctx.clearRect(50,50,10,10);

// ctx.fillStyle="red";
// ctx.beginPath();
// ctx.moveTo(240,240);
// ctx.lineTo(300,240);
// ctx.lineTo(300,300);
// ctx.fill();
var using=false;
var lastPoint={x:undefined,y:undefined};
var eraserEnabled=false;
eraser.onclick=function(){
    eraserEnabled=true;
    eraser.classList.add("active");
}
brush.onclick=function(){
   eraserEnabled=false;
   brush.classList.add("active");
}
clear.onclick=function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
download.onclick=function(){
    var url=canvas.toDataURL("image/png");
    var a=document.createElement("a");
    document.body.appendChild(a);
    a.href=url;
    a.download="canvas";
    a.click();

}
if(document.body.ontouchstart!==undefined){
    canvas.ontouchstart=function(e){
        var x=e.touches[0].clientX;
        var y=e.touches[0].clientY;
        startControl(x,y);
    }
    canvas.ontouchmove=function(e){
        var x=e.touches[0].clientX;
        var y=e.touches[0].clientY;
        moveControl(x,y);
    }
    canvas.ontouchend=function(e){
        endControl()
    }
}else{
    canvas.onmousedown=function(e){
        var x=e.clientX;
        var y=e.clientY;
        startControl(x,y);
    }
    canvas.onmousemove=function(e){
        var x=e.clientX;
        var y=e.clientY;
        moveControl(x,y);
       
    }
    canvas.onmouseup=function(e){
        endControl()
    }
    
}

function startControl(x,y){
    using=true;
    if(eraserEnabled){
        ctx.clearRect(x-5,y-5,10,10);
    }else{
        lastPoint={x:x,y:y};
       // drawCircle(x,y,1);
    }
}

function moveControl(x,y){
    if(!using) return;
    if(eraserEnabled){
        ctx.clearRect(x-5,y-5,10,10);
    }else{ 
        var newPoint={x:x,y:y};
       // drawCircle(x,y,1);
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint=newPoint;
    }
}

function endControl(){
    using=false;
}
function drawCircle(x,y,radius){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.stroke();
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineWidth=lineWidth;
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}

red.onclick=function(e){
    changeColor(e.target,"red");
}
blue.onclick=function(e){
    changeColor(e.target,"blue");
}

green.onclick=function(e){
    changeColor(e.target,"green");
}

function changeColor(target,color){
    if(target.className.indexOf("active")!=-1){
        ctx.fillStyle="black";
        ctx.strokeStyle="black";
        target.classList.remove("active");
        return false;
    }
    red.classList.remove("active");
    blue.classList.remove("active");
    green.classList.remove("active");
    target.classList.add("active");
    ctx.fillStyle=color;
    ctx.strokeStyle=color;
}

thin.onclick=function(){
  lineWidth=1;
}
thick.onclick=function(){
  lineWidth=10;
}

