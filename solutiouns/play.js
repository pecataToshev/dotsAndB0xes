var hor, ver, num, width, height, suggestion, is_computer_turn, still_computer_turn;

function init_play(_width, _height){
	hor = new Array(102).fill(new Array(102).fill(false));
	ver = new Array(102).fill(new Array(102).fill(false));

	num = new Array(101).fill(
		new Array(101).fill({
			lines  : 0,
			left   : false,
			top    : false,
			right  : false,
			bottom : false
		})
	);

	width  = _width;
	height = _height;
}

function from_box_to_line(box){
	if(box.line == 'left'){
		
		return {x1: box.x, y1: box.y, x2: box.x, y2: box.y+1};

	} else if(box.line == 'top'){
		
		return {x1: box., y1: box.y, x2: box.x+1, y2: box.y};

	} else if(box.line == 'right'){

		return {x1: box.x+1, y1: box.y, x2: box.x+1, y2: box.y+1};

	} else {
		//bottom
		return {x1: box.x, y1: box.y+1, x2: box.x+1, y2: box.y+1};

	}
}

function set_in_table (x1, y1, x2, y2){
	if(x1 == x2){
		
		if(ver[x1][y1] && is_computer_turn){
			if(suggestion[0].x1 == x1 && suggestion[0].y1 == y1
				&& suggestion[0].x2 == x2 && suggestion[0].y2 == y2)
				
				suggestion.shift();


			still_computer_turn = true;
			return false;
		}

		//set in ver
		ver[x1][y1] = true;
		set_in_array(x1, y1, 'left');
		set_in_array(x2-1, y2-1, 'right');

	} else if(y1 == y2){
		
		if(hor[x1][y1] && is_computer_turn){
			if(suggestion[0].x1 == x1 && suggestion[0].y1 == y1
				&& suggestion[0].x2 == x2 && suggestion[0].y2 == y2)

				suggestion.shift();


			still_computer_turn = true;
			return false;
		}

		//set in hor
		hor[x1][y1]=true;
		set_in_array(x1, y1, 'top');
		set_in_array(x2-1, y2-1, 'bottom');
	}

	return true;
}

function set_in_array (x, y, line){
	if(num[x][y].lines == 3){
		for(i in suggestion){
			if(i.x == suggestion.x && i.y == suggestion.y){
				suggestion.slice(i, 1);
				break;
			}
		}
	}

	++num[x][y].lines;
	num[x][y][line] = true;
	
	if(num[x][y] == 4){
			if(is_computer_turn)
				still_computer_turn = true;
	} else {
		
		still_computer_turn = false;
		
		if(num[x][y] == 3){
			//add to suggestion

			if(num[x][y].left == false){

				suggestion.push({x: x, y: y, position: 'left'});

			} else if(num[x][y].top == false){

				suggestion.push({x: x, y: y, position: 'top'});

			} else if(num[x][y].right == false){

				suggestion.push({x: x, y: y, position: 'right'});

			} else {
				//bottom
				suggestion.push({x: x, y: y, position: 'bottom'});

			}
		}
		
	}
}

function searching_algorithm(){

	var suggested_box;

	//check for suggestion
	if(suggestion.length > 0){
		 suggested_box = from_box_to_line(suggestion[0]);
	} else {
		var stop_all = false
		for(p = 1;  p < height && !stop_all;  p++){
			for(q = 1;  q < width && !stop_all;  q++){
				if(num[p][q].lines == 2)
					continue;

				if(num[p][q].left == false && num[p][q-1].right == false && num[p][q-1].lines < 2){
					suggested_box = from_box_to_line(p, q, 'left');
					stop_all = true;
					break;
				}

				if(num[p][q].top == false && num[p-1][q].bottom == false && num[p-1][q].lines < 2){
					suggested_box = from_box_to_line(p, q, 'top');
					stop_all = true;
					break;
				}

				if(num[p][q].right == false && num[p][q+1].left == false && num[p][q+1].lines < 2){
					suggested_box = from_box_to_line(p, q, 'right');
					stop_all = true;
					break;
				}

				if(num[p][q].bottom == false && num[p+1][q].top == false && num[p+1][q].lines < 2){
					suggested_box = from_box_to_line(p, q, 'bottom');
					stop_all = true;
					break;
				}

			}
		}

	}

	return [suggested_box.x1, suggested_box.y1, suggested_box.x2, suggested_box.y2];

}

function play_computer(params){
	//set persons turn
	is_computer_turn = false;
	still_computer_turn = false;
	for(i = 0;  i < params.length;  i+=4)
		set_in_table(params[i], params[i+1], params[i+2], params[i+3]);

	is_computer_turn = true;
	still_computer_turn = true;
	
	var result = []

	while(still_computer_turn){
		result.push.apply(result, searching_algorithm());
	}

	return result;
}