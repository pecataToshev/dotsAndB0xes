"use strict";

class Vector{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    
    get x(){
        return this._x;
    }
    
    set x(value){
        if(typeof(value)!=="number"){
            this._x=x;
        }
    }
    
    get y(){
        return this._y;
    }
    
    set y(value){
        if(typeof(value)!=="number"){
            this._y=y;
        }
    }
}