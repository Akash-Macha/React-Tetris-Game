export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// 2nd value can be clear or merge
const CELL = [0, 'clear'];

/**
 * each cell in height we create a row with STAGE_WIDTH
 * fill each row with [0, 'clear']
 * 
 * Understand 
 * 	Array.from
 * 	Array()
 */
export const createStage = () => 
	Array.from( Array(STAGE_HEIGHT), () => 
		new Array(STAGE_WIDTH).fill([0, 'clear']) 
	);

/** Collision Detection: https://www.youtube.com/watch?v=ZGOaCxX8HIU&t=5822s
 * 
 * return true if collided with something else false
 * 
 * renamed x and y to moveX and moveY respectively, coz we use x another purpose
 * 
 */
export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
	
	for(let y = 0 ; y < player.tetromino.length; ++y){
		for(let x = 0 ; x < player.tetromino[y].length; ++x){

			// 1. Check that we're on an actual Tetromino cell
			if (player.tetromino[y][x] !== 0) {

				if(
				// 2. check that our move is inside the game areas height (y)
				// we shouldn't go through the bottom of the play area
				!stage[y + player.pos.y + moveY] || 

				// 3. check that our move is inside the game areas width (x)
				!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||

				// 4. check that the cell we're moving to isn't set to clear
				// because if it is clear we're not colliding
				stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
				){
					return true;
				}
			}
		}
	}

	return false;
};
