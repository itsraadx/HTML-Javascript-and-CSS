var canvas
var canvasContext
var start=false
const BALL_RAD=gameCanvas.height/60
var ballX=gameCanvas.width/2-BALL_RAD/2
var ballY=gameCanvas.height/2-BALL_RAD/2
var ballSPEEDX=gameCanvas.width*5/700
var ballSPEEDY=gameCanvas.width*-3/700
const PADDLE_HEIGHT=gameCanvas.height/6
var paddleLY=gameCanvas.height/2-PADDLE_HEIGHT/2
var paddleRY=gameCanvas.height/2-PADDLE_HEIGHT/2
var paddleSPEED=gameCanvas.height/60
const PADDLE_THICK=gameCanvas.height/60
const PADDLE_DIST=gameCanvas.width/70
var scoreLeft=0
var scoreRight=0
const WIN_CON=10

function calcMouse(evt){
    var rect=canvas.getBoundingClientRect()
    var root=document.documentElement
    var mouseX=evt.clientX-rect.left-root.scrollLeft
    var mouseY=evt.clientY-rect.top-root.scrollTop
    return {x:mouseX,y:mouseY}
}

window.onload=function(){
    canvas=document.getElementById("gameCanvas")
    canvasContext=canvas.getContext("2d")
    
    var fps=60
    setInterval(function(){animate();draw()}, 1000/fps)

    canvas.addEventListener("mousemove",function(evt){
        var mousePos=calcMouse(evt)
        paddleLY=mousePos.y-PADDLE_HEIGHT/2
    })
}

function reset(){
    ballX=canvas.width/2-BALL_RAD/2
    ballY=canvas.height/2-BALL_RAD/2
    ballSPEEDX=-ballSPEEDX
    ballSPEEDY=-ballSPEEDY
    ballSPEEDY/=1.5
    if (scoreLeft==WIN_CON){
        alert("You win! GG")
        scoreLeft=0
        scoreRight=0
    } else if (scoreRight==WIN_CON){
        alert("You loose! You get'em next time")
        scoreLeft=0
        scoreRight=0
    }
}

function cpuMove(){
    if (paddleRY+(PADDLE_HEIGHT/2) < ballY-canvas.width/20){
        paddleRY+=canvas.height/100
    } else if(paddleRY+(PADDLE_HEIGHT/2) > ballY+canvas.width/20){
        paddleRY-=canvas.height/100
    }
}

function animate(){
    cpuMove()
    ballX+=ballSPEEDX
    ballY+=ballSPEEDY
    
    if (ballX < PADDLE_DIST+PADDLE_THICK+BALL_RAD/2 && ballY > paddleLY && ballY < paddleLY+PADDLE_HEIGHT){
        ballSPEEDX=-ballSPEEDX
        var deltaY=ballY-(paddleLY+PADDLE_HEIGHT/2)
        ballSPEEDY=deltaY*0.35
    }
    if (ballX > canvas.width-(PADDLE_DIST+PADDLE_THICK+BALL_RAD/2) && ballY > paddleRY && ballY < paddleRY+PADDLE_HEIGHT){
        ballSPEEDX=-ballSPEEDX
        var deltaY=ballY-(paddleRY+PADDLE_HEIGHT/2)
        ballSPEEDY=deltaY*0.2
    }
    if (ballX < 0){
        scoreRight+=1
        reset()
    }
    if (ballX > canvas.width){
        scoreLeft+=1
        reset()
    }
    if (ballY > canvas.height-BALL_RAD/2 || ballY < BALL_RAD/2){
        ballSPEEDY=-ballSPEEDY
    }
}

function draw(){
    drawRect(0,0,canvas.width,canvas.height,"black")
    drawRect(PADDLE_THICK,paddleLY,PADDLE_THICK,PADDLE_HEIGHT,"white")
    drawRect(canvas.width-2*PADDLE_THICK,paddleRY,PADDLE_THICK,PADDLE_HEIGHT,"white")
    for (var i=0;i<canvas.height;i+=canvas.height/20){
        drawRect(canvas.width/2-1,i,canvas.height/200,canvas.height/30,"white")
    }
    drawCirc(ballX,ballY,BALL_RAD,"white")
    canvasContext.fillText(scoreLeft,canvas.width/7,canvas.height/6 )
    canvasContext.fillText(scoreRight,canvas.width-canvas.width/7,canvas.height/6)
}

function drawRect(leftX,topY,width,height,color){
    canvasContext.fillStyle=color
    canvasContext.fillRect(leftX,topY,width,height)
}

function drawCirc(centerX,centerY,radius,color){
    canvasContext.fillStyle=color
    canvasContext.beginPath()
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true)
    canvasContext.fill()
}