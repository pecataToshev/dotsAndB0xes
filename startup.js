var engine=engine(
    getWidth(),
    getHeight(),
    {
        canvasSelector:"#canvas-id",
        updateCallbackTime:30
    }
);

var context=engine.getContext();
var canvas=engine.getCanvas();

var mouse=mouse(canvas);
var checkPressed=CheckPressedProvider();

var draw = function(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillRect(mouse.x,mouse.y,100,100)
    context.strokeRect(0,0,canvas.width,canvas.height)
}

var update = function(){
    console.log("Its working")
}

engine.setDraw(draw);
engine.setUpdate(update);
engine.start();