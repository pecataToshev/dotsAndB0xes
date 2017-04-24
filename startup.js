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


var f1=new Field(100,100,10,10);

var update = function(){
}

var draw = function(){
    context.clearRect(0,0,canvas.width,canvas.height)
    
    f1.draw();
    
    context.strokeRect(0,0,canvas.width,canvas.height)
}

engine.setDraw(draw);
engine.setUpdate(update);
engine.start();