import { useState, useEffect } from 'react';

import { createStage } from '../components/gameHelpers';

/** https://youtu.be/ZGOaCxX8HIU?t=5037 */
export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage()); // clean board

	useEffect(() => {
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

			return newStage;
		};

		setStage((prev) => updateStage(prev))
	}, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

	return [stage, setStage];
};

