var hor[100][100]={ false }, ver[100][100]={false}, num[100][100] = {0};
var width, height, turn;

function init_play(_width, _height){
	width  = _width;
	height = _height;
}

function set_in_table (x1, y1, x2, y1){
	if(x1 == x2){
		//set in hor
		hor[x1][y1]=true;
	}
}

function play_computer(params){
	//set persons turn
	for(i = 0;  i < params.length;  i+=4)
		set_in_table(params[i]-1, params[i+1]-1, params[i+2]-1, params[i+3]-1);



}