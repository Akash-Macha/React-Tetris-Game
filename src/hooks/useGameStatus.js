import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
	// state for GameStatus
	const [score, setScore] = useState(0);
	// total rows cleared
	const [rows, setRows] = useState(0);
	const [level, setLevel] = useState(0);

	const linePoints = [40, 100, 300, 1200];

	/** we call calcScore inside useEffect, 
	 *  that is why we're wrapping it with useCallback
	 *  to avoid infinite loop re-creating of func
	 */
	const calcScore = useCallback(() => {
		// check we have score
		//  rowsCleared <= 0, no score to calculate
		if (rowsCleared > 0) {
			// This is how original Tetris score is calculated
			setScore((prev) => 
				 (prev + linePoints[rowsCleared - 1] * (level + 1)));
			setRows((prev) => prev + rowsCleared);	
		}
	}, [level, linePoints, rowsCleared]);

	/** we want to fire calcScore automatically
	 *  Thus we useEffect
	 */
	useEffect(() => {
		calcScore();
	}, [calcScore, rowsCleared, score]);

	/**
	 * score to display
	 * setScore : setScoer when we start a new game
	 * rows
	 * setRows : setRows should be 0, when we start a new Game
	 * level : to display
	 * setLevel : set to 0, when we start a new Game
	 */
	return [score, setScore, rows, setRows, level, setLevel];
};
