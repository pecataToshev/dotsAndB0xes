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
            throw new Error("Value should be number")
        }
        this._x=value;
    }
    
    get y(){
        return this._y;
    }
    
    set y(value){
        if(typeof(value)!=="number"){
            throw new Error("Value should be number")
        }
        this._y=value;
    }
    
    distTo(p2){
        console.log(Math.sqrt((this.x-p2.x)*(this.x-p2.x) + (this.y-p2.y)*(this.y-p2.y)))
        return Math.sqrt((this.x-p2.x)*(this.x-p2.x) + (this.y-p2.y)*(this.y-p2.y));
    }
}