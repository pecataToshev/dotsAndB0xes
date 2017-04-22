# Javascript-Canvas-Game-Engine
This is a simple javascript game engine, that encapsulates and shortens canvas initialisation operations.

## Example

```Js
var engine=engine(800,800,{
        canvasSelector:"#canvas-id",
        updateCallbackTime:30})
//Create a new engine with size and an options object. 

var context=engine.getContext();
var canvas=engine.getCanvas();


var mouse=mouse(canvas);
//Returns an object with {x,y} fields.

var checkPressed=CheckPressedProvider();
//Returns a function that checks wheter a key with a given keyCode or charCode is pressed.

var draw = function(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillRect(mouse.x,mouse.y,100,100)
    
    context.strokeRect(0,0,canvas.width,canvas.height)
}

var update = function(){
    console.log("Its working")
    //Will be logged many times
}

engine.setDraw(draw);
//Sets the draw function.

engine.setUpdate(update);
//Sets the update function.

engine.start();

```

## Keys
`Keys()` returns a function, that returns true if a key with a given keyCode or Char is pressed.
### Simple Use:
```Js
var keys=Keys()
keys("w");  //Returns true if the "w" key on the keyboard is pressed.
keys(115);   //Returns true if the key with a keyCode 68 ("w") is pressed.
```

## Mouse
`Mouse()` returns an object, representing the mouse coordinates on the canvas.

### Simple Use
```Js
var mouse=Mouse(canvas);  //Returns an object in the format Mouse{x,y}
console.log(mouse.x,mouse.y)    //Logs the mouse's coordinates in the console
