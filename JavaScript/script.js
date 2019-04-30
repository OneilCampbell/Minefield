let $board = document.querySelector('#gameBoard');
let $character = document.querySelector('#character');

//******* DIMENSIONS ********

//game board is 800 X 800
//squares occupied by characters/objects/etc. is 50 X 50
//so the conceptual board is 16 X 16


//********** LOGIC **********

//x and y range of objects' coordinates is from 0-15
//position in html is determined by "top" and "left" (since they are styled with position:absolute)
//left = x * 50, top = y * 50 to draw position in corresponding square on the grid

let characterPosition = {x:0, y:0};

const moveCharacter = () => {
	$character.style.left = `${characterPosition.x * 50}px`;
	$character.style.top = `${characterPosition.y * 50}px`;
}

let gridArray = [];

currentSquareIndex = 0;

const drawGrid = () => {
	for(square of gridArray){

		let div = square.elemnt;   
		div.style.left = `${square.x * 50}px`;
		div.style.top = `${square.y * 50}px`;

	}
}

const populateGrid = () => {
	for(let x = 0; x < 16; x++){
		for(let y = 0; y < 16; y++){

			let div = document.createElement('div');
			div.classList.add('gridSquare');
			$board.append(div);

			gridArray.push({x, y, elemnt:div});
		}
	}

	drawGrid();
}

populateGrid();

let bombArray = [];

//function to randomly populate "bombs" on the game grid
//grid is 16 X 16, so 256 possible positions
//ideally want to choose between 100-150 bombs to be placed on the grid
const createBombs = () => {
	let amountOfBombs = Math.floor(Math.random()*51)+15;

	while(bombArray.length < amountOfBombs){

		let randIndex = Math.floor(Math.random() * gridArray.length);

		while(bombArray.includes(randIndex) || [0,1,16,17].includes(randIndex)){
			randIndex = Math.floor(Math.random() * gridArray.length);
		}

		bombArray.push(randIndex);
		
	}
}

createBombs();

const explodeBombs = () => {
	for(bomb of bombArray){
		gridArray[bomb].elemnt.style.background = "red";
	}
}

const checkCollision = () => {
	if(bombArray.includes(currentSquareIndex)){
		explodeBombs();
	}
	else{
		gridArray[currentSquareIndex].elemnt.style.background = "#eee";
	}
}

const moveLeft = () => {
	if(characterPosition.x >= 1){
		characterPosition.x--;
		currentSquareIndex -= 16;
	}
}

const moveUp = () => {
	if(characterPosition.y >= 1){
		characterPosition.y--;
		currentSquareIndex -= 1;
	}
}

const moveRight = () => {
	if(characterPosition.x <= 14){
		characterPosition.x++;
		currentSquareIndex += 16;
	}
}

const moveDown = () => {
	if(characterPosition.y <= 14){
		characterPosition.y++;
		currentSquareIndex += 1;
	}
}


document.body.addEventListener('keydown', (e) => {
	let keycode = e.keyCode;
	if ([37,38,39,40].includes(keycode)){
		e.preventDefault();
		switch(keycode){
			case 37:
				moveLeft();
			break;

			case 38:
				moveUp();
			break;

			case 39:
				moveRight();
			break;

			case 40:
				moveDown();
			break;
		}
		moveCharacter();
		checkCollision();
	}
})











