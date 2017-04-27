var hor, ver, num, width, height, suggestion, is_computer_turn, still_computer_turn, find_min_arr;

function init_play(_width, _height){
	var z = new Date().getTime();
	suggestion = [];
	find_min_arr = [];

	var max_width = 100;
	max_width += 2;//adding additional points

	hor = new Array(max_width).fill(new Array(max_width).fill(false));
	ver = new Array(max_width).fill(new Array(max_width).fill(false));

	num = Array.apply(null, Array(max_width - 1)).map(
		function(){
			return Array.apply(null, Array(max_width - 1)).map(
				function(){
					return {
						lines  : 0,
						left   : false,
						top    : false,
						right  : false,
						bottom : false
					};
				}
			)
		}
	);

	width  = _width;
	height = _height;
	var z1 = new Date().getTime();
	console.log("start = " + z + "\ncurrent time = " + z1 + "\nexec time = " + (z1 - z));
}

function from_box_to_line(box){
	if(box.line == 'left'){
		
		return {x1: box.x, y1: box.y, x2: box.x, y2: box.y+1};

	} else if(box.line == 'top'){
		
		return {x1: box.x, y1: box.y, x2: box.x+1, y2: box.y};

	} else if(box.line == 'right'){

		return {x1: box.x+1, y1: box.y, x2: box.x+1, y2: box.y+1};

	} else {
		//bottom
		return {x1: box.x, y1: box.y+1, x2: box.x+1, y2: box.y+1};

	}
}

function from_box_to_line_add(_x, _y, _lines){
	return from_box_to_line({x: _x, y: _y, line: _lines});
}

function set_in_table (x1, y1, x2, y2){
	console.log("set in table:\nx1=" + x1 + "\ny1=" + y1 + "\nx2=" + x2 + "\ny2=" + y2);
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
	console.log("\nset in array\nx=" + x + "\ny=" + y + "\nline=" + line);

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

function find_min_func(a, b){
	if(find_min_arr[a][b] != 0)
		return 0;

	if(num[a][b].lines == 4)
		return 0;



	if(num[a][b].left == false)
		find_min_arr[a][b] = Math.max(find_min_arr[a][b], find_min_func(a, b-1));


	if(num[a][b].top == false)
		find_min_arr[a][b] = Math.max(find_min_arr[a][b], find_min_func(a-1, b));

	if(num[a][b].right == false)
		find_min_arr[a][b] = Math.max(find_min_arr[a][b], find_min_func(a, b+1));

	if(num[a][b].bottom == false)
		find_min_arr[a][b] = Math.max(find_min_arr[a][b], find_min_func(a+1, b+1));

	return find_min_arr[a][b];

}

function searching_algorithm(){

	var suggested_box;
	console.log("searching_algorithm");

	//check for suggestion
	if(suggestion.length > 0){
		 //suggestioned boxes are only when the box has 3 borders
		 suggested_box = from_box_to_line(suggestion[0]);

	} else {
		//if there are boxes with less than 2 borders
		var stop_all = false
		for(p = 1;  p < height && !stop_all;  p++){
			for(q = 1;  q < width && !stop_all;  q++){
				console.log("p=" + p + " q=" + q + " -> ")
				console.log(num[p][q]);

				if(num[p][q].lines == 2)
					continue;

				if(num[p][q].left == false && num[p][q-1].right == false && num[p][q-1].lines < 2){
					console.log("p=" + p + " q=" + q + " left")
					suggested_box = from_box_to_line_add(p, q, 'left');
					stop_all = true;
					break;
				}

				if(num[p][q].top == false && num[p-1][q].bottom == false && num[p-1][q].lines < 2){
					console.log("p=" + p + " q=" + q + " top")
					suggested_box = from_box_to_line_add(p, q, 'top');
					stop_all = true;
					break;
				}

				if(num[p][q].right == false && num[p][q+1].left == false && num[p][q+1].lines < 2){
					console.log("p=" + p + " q=" + q + " right")
					suggested_box = from_box_to_line_add(p, q, 'right');
					stop_all = true;
					break;
				}

				if(num[p][q].bottom == false && num[p+1][q].top == false && num[p+1][q].lines < 2){
					console.log("p=" + p + " q=" + q + " bottomx")
					suggested_box = from_box_to_line_add(p, q, 'bottom');
					stop_all = true;
					break;
				}

			}
		}

		console.log("stop_all == " + stop_all);

		if(!stop_all){
			//there isn't box with less than 2 borders
			find_min_arr = new Array(101).fill(new Array(101).fill(0));
			for(p = 0;  p < height;  p++){
				for(q = 0;  q < width;  q++){
					find_min_func(p, q);
				}
			}
		}

	}

	console.log(suggested_box);
	set_in_table(suggested_box.x1, suggested_box.y1, suggested_box.x2, suggested_box.y2);
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


function print_array(){
	var z;
	for(i=0;i<height;i++){
		z = "";
        for(j=0;j<width-1;j++){
            if(hor[i][j]){
                z += "*-";
            }else{
				z += "* ";
			}
        }
        z += "*\n";

        for(j=0;j<width;j++){
			if(ver[i][j]){
                z+= "| ";
            }else{
				z += "  ";
			}
        }
        console.log(z);
    }
    console.log("\n");
    for(i=0;i<height-1;i++){
    	z = "";
		for(j=0;j<width-1;j++){
			z += num[i][j].lines + " ";
		}
		console.log(z);
	}
}