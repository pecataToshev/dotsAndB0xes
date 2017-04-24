class Line{
    constructor(p1,p2){
        this.p1=p1;
        this.p2=p2;
    }
    
    length(){
        return this.p1.distTo(this.p2);
    }
    
    draw(posX,posY){
        context.beginPath();
        context.moveTo(this.p1.x*Line.size+posX,this.p1.y*Line.size+posY);
        context.lineTo(this.p2.x*Line.size+posX,this.p2.y*Line.size+posY);
        context.stroke();
    }
}
Line.size=20;