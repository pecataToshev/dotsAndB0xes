class Field{
    constructor(posX,posY,width,height,init1,play1,init2,play2){
        this.posX=posX;
        this.posY=posY;
        
        this.width=width;
        this.height=height;
        
        this.init1=init1;
        this.play1=play1;
        
        this.init2=init2;
        this.play2=play2;
        
        this.lines=[];
    }
    
    addLine(p1X,p1Y,p2X,p2Y){
        var added=new Line(
            new Vector(p1X,p1Y),
            new Vector(p2X,p2Y));
        
        if(added.length()!==1){
            return false;
        }
        
        this.lines.push(added);
    }
    
    draw(){
        for(var el of this.lines){
            el.draw(this.posX,this.posY);
        }
        
        for(var i=1;i<=this.height;i++){
            for(var j=1;j<=this.width;j++){
                context.beginPath();
                context.arc(j*Line.size+this.posX,i*Line.size+this.posY,5,0,2*Math.PI);
                context.fill();
            }
        }
    }
    
    initPlay(){
        this.init1(this.width,this.height);
        this.init2(this.width,this.height);
    }
    
    recallPlay(){
        this.play1();
        this.play2();
        setTimeout(recallPlay,1000);
    }
    
    startPlay(){
        initPlay();
        recallPlay();
    }
    
}