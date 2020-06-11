import { useState, useEffect } from 'react';

import { createStage } from '../components/gameHelpers';

/** https://youtu.be/ZGOaCxX8HIU?t=5037 */
export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage()); // clean board
	const [rowsCleared, setRowsCleared] = useState(0);

	useEffect(() => {
		setRowsCleared(0);
		// accumulator is the new array that we're builing inside the reduce function
		//												accumulator, row
		const sweepRows = (newStage) => 
			newStage.reduce((ack, row) => {
				// if a row contains at least one 0, it isn't filled completely, we shouldn't clear it
				if (row.findIndex(cell => cell[0] === 0) === -1) {
				// if a row is filled completely

				// add +1 to rowsCleared
				setRowsCleared(prev => prev + 1);
				// add a empyt row at the top of the row
				ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
				
				return ack;
			}
			ack.push(row); 
			return ack;
		}, []);

		const updateStage = (prevStage) => {
			// When we update the Stage
			// 1. Flush the stage, (remove everything that shouldn't be there, if lowest row is filled up?)
			//      -> we have to clear it (the lowest row) from the previous render

			// if we haven't marked our cell as 'merge'
			// then we just clear it and return a fresh clear cell
			// otherwise we return the cell as it is & it will stay in the stage
			//      Thus we know what cells have collided tetraminos in them or not
			const newStage = prevStage.map((row) => row.map((cell) =>
				cell[1] === 'clear'
					? [0, 'clear']
					: cell));

			// 2. Draw the tetramino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? 'merged' : 'clear'}`
						];
					}
				})
			});

			// then check if we collided
			if (player.collided) {
				resetPlayer();
				return sweepRows(newStage);
			}

			return newStage;
		};

		setStage((prev) => updateStage(prev))
	}, [player, resetPlayer]);
// }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

	return [stage, setStage, rowsCleared];
};

