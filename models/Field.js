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
        
        this.walls=[];
        
        this.lastOutput=null;
        
        for(var i=0;i<this.height;i++){
            this.walls[i]=[];
            for(var j=0;j<this.width;j++){
                this.walls[i][j]=0;
            }
        }
    }
    
    addLine(p1X,p1Y,p2X,p2Y){
        var added=new Line(
            new Vector(p1X,p1Y),
            new Vector(p2X,p2Y));
        
        if(added.length()!==1){
            return false;
        }
        
        if(p1X==p2X){
            ++this.walls[p1Y];
            ++this.walls[p1Y+2];
            if(this.walls[p1Y]==4 || this.walls[p1Y+2]==4){
                return true;
            }
        }
        
        if(p1Y==p2Y){
            ++this.walls[p1X];
            ++this.walls[p1X+2];
            if(this.walls[p1X]==4 || this.walls[p1X+2]==4){
                return true;
            }
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
        this.lastOutput=this.play1(this.lastOutput);
        
        for(var i=0;i<this.lastOutput.length/4;i++){
            this.addLine(this.lastOutput[i],
                        this.lastOutput[i+1],
                        this.lastOutput[i+2],
                        this.lastOutput[i+3])
        }
        
        this.lastOutput=this.play2(this.lastOutput);
        
        for(var i=0;i<this.lastOutput.length/4;i++){
            this.addLine(this.lastOutput[i],
                        this.lastOutput[i+1],
                        this.lastOutput[i+2],
                        this.lastOutput[i+3])
        }
        
        setTimeout(recallPlay,1000);
    }
    
    startPlay(){
        initPlay();
        recallPlay();
    }
    
}