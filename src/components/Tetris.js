import React, { useState } from 'react';

import { createStage, checkCollision } from './gameHelpers';

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

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage] = useStage(player, resetPlayer);

	/**
	 * this will take care of Left & Right movements
	 * dir will have the x co-ordinate value, since we're handling left & right moves
	 */
	const movePlayer = (dir) => {
		// move if we don't collide with anything
		// stop moving if we collide with side walls
		if(!checkCollision(player, stage, {x: dir, y: 0})) {
			updatePlayerPos({
				x: dir,
				y: 0,
			});
		}
	};

	const startGame= () => {
		/**
		 * Reset the 
		 * Stage &
		 * Player
		 */
		setStage(createStage());
		resetPlayer();
		setGameOver(false);
	}; 

	/**
	 * while droping we increase y value and make
	 * tetramine a one cell down!
	 */
	const drop = () => {
		if(!checkCollision(player, stage, {x: 0, y: 1})) {
			updatePlayerPos({
				x: 0,
				y: 1,
				collided: false,
			});
		} else {
			// Game Over
			if(player.pos.y < 1) {
				console.log("GAME OVER");
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({x: 0, y: 0, collided: true})
		}
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
			// up arrow
			else if (keyCode === 38) playerRotate(stage, 1); // 1 indicates in clock-wise
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
