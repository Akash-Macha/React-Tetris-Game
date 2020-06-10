import React, { useState } from 'react';

import { createStage } from './gameHelpers';

// styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
	console.log('re-rendered: [Tetris]');

	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer);

	/**
	 * this will take care of Left & Right movements
	 * dir will have the x co-ordinate value, since we're handling left & right moves
	 */
	const movePlayer = (dir) => {
		updatePlayerPos({
			x: dir,
			y: 0,
		});
	};

	const startGame= () => {
		/**
		 * Reset the 
		 * Stage &
		 * Player
		 */
		setStage(createStage());
		resetPlayer();
	}; 

	/**
	 * while droping we increase y value and make
	 * tetramine a one cell down!
	 */
	const drop = () => {
		updatePlayerPos({
			x: 0,
			y: 1,
			collided: false,
		});
	};

	const dropPlayer = () => {
		drop();
	};

	/**  de-structuring keyCode from event 'e' */
	const move = ({ keyCode }) => {
		if (!gameOver) {
			// left arrow
			if (keyCode === 37) movePlayer(-1);
			// righ arrow
			else if (keyCode === 39) movePlayer(1);
			// down arrow
			else if (keyCode === 40) dropPlayer();
		}
	};

	return (
		/** role="button" will register the keystrokes */
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
							<div>
								<Display text="Score" />
								<Display text="Rows" />
								<Display text="Level" />
							</div>
					)}
					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
