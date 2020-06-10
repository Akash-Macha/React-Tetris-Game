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
