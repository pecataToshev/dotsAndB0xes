function engine(widthArg,heightArg,optionsArg){
    var _canvas;
    var _requestAnimationFrameFunc=window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                function (callback) { setTimeout (callback, 1000 / 30); };
    
    var _findCanvas = function(selector){
        if(typeof(selector)!=="string"){
            throw new Error("Selector should be string");
        }
        
        var canvasElement=document.querySelector(selector);
        
        if(!(canvasElement instanceof HTMLCanvasElement)){
            throw new Error("Selected element should be of type HTMLCanvasElement");
        }
        
        return canvasElement;
    }
    
    var canvas = function(canvasParameter){
        if(typeof(canvasParameter) !== "undefined"){
            if(!(canvasParameter instanceof HTMLCanvasElement)){
                throw new Error("Canvas should be of type HTMLCanvasElement");
            }
            _canvas=canvasParameter;
        }
        return _canvas;
    }
    
    canvas(_findCanvas(optionsArg.canvasSelector));
    
    var width = function(widthParameter){
        if(typeof(widthParameter) !== "undefined" ){
            if(!(typeof(widthParameter)) ==="number" ||
                widthParameter<=0){
                throw new Error("Width should be a positive integer");
            }
            
            canvas().width=widthParameter;
        }
        return canvas().width;
    }
    
    var height = function(heightParameter){
        if(typeof(heightParameter) !== "undefined" ){
            if(!(typeof(heightParameter)) ==="number" ||
                heightParameter<=0){
                throw new Error("Height should be a positive integer");
            }
            
            canvas().height=heightParameter;
        }
        return canvas().height;
    }
    
    var getContext=function(){
        return this.getCanvas().getContext("2d");
    }
    
    var _userDraw=function(){};
    var _userUpdate=function(){};
    
    var drawProp=function(arg){
        _userDraw=arg;
    };
    var updateProp=function(arg){
        _userUpdate=arg;
    };
    
    var _draw=function(){
        _userDraw();
        _requestAnimationFrameFunc.call(window,_draw);
    }
    
    var _update=function(){
        _userUpdate();
        setTimeout(_update,optionsArg.updateCallbackTime);
    }
    
    var start = function(){
        _draw();
        _update();
    }
    
    width(widthArg);
    height(heightArg);

    return {
        getCanvas:canvas,
        setDraw:drawProp,
        setUpdate:updateProp,
        start:start,
        getContext:getContext
    };
}