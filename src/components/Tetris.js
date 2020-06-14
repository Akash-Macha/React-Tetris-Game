import React, { useState } from 'react';

import { createStage, checkCollision } from './gameHelpers';

// styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import ReactTouchEvents from "react-touch-events";

// custom hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
	// console.log('re-rendered: [Tetris]');

	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	const [
		score, setScore,
		rows, setRows,
		level, setLevel,
		] = useGameStatus(rowsCleared);

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

	/**
	 * Reset the Stage, DropTime, Player, GameOver state, Score, Level, Rows count
	 */
	const startGame= () => {
		setStage(createStage());
		setDropTime(1000); // 1 sec
		resetPlayer();
		setGameOver(false);

		setScore(0);
		setRows(0);
		setLevel(0);
	}; 

	/**
	 * while droping we increase y value and make
	 * tetramine a one cell down!
	 */
	const drop = () => {
		// increase level when player has cleared 10 rows
		if (rows > (level + 1) * 10) {
			setLevel((prev) => prev + 1);

			// Also increase speed
			setDropTime(1000 / (level + 1) + 200);
		}

		if(!checkCollision(player, stage, {x: 0, y: 1})) {
			/** if there is NO collision, move the cell 1 bit down */
			updatePlayerPos({
				x: 0,
				y: 1,
				collided: false,
			});
		} else {
			// if there is Collision?
			// Game Over!
			if(player.pos.y < 1) {
				console.log("GAME OVER");
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({x: 0, y: 0, collided: true})
		}
	};

	/** ArrwoDown = 40
	 * 	but the function name I put is keyUp?
	 *  check where I have used it
	 */
	const keyUp = ({ keyCode }) => {
		// console.log("interval on");
		if (!gameOver) {
			/** ArrwoDown = 40 */
			if (keyCode === 40) {
				setDropTime(1000 / (level + 1) + 200);
			}
		}
	};

	const dropPlayer = (isNotTouchEvent=true) => {
		// console.log("interval off");
		
		// When we press the down key
		// we want to stop the player 
		// stop the interval, 
		// and we need to activate it when user leaves the down key: for that we're creating the func -> 
		isNotTouchEvent && setDropTime(null);
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

	const handleSwipe = (direction) => {
		if (!gameOver) {
			if (direction === 'left') movePlayer(-1);
			else if (direction === 'right') movePlayer(1);
			else if (direction === 'bottom') dropPlayer(false); // isNotTouchEvent = false
			else if (direction === 'top') playerRotate(stage, 1); // 1 indicates in clock-wise
		}
	};

	useInterval(() => {
		drop();
	}, dropTime);

	/**  trying out touch feature: https://www.linkedin.com/pulse/touch-detection-react-daniel-paschal/ */
	// const handleTouch = (mode, e) => {
	// 	console.log('mode: ', mode);
	// 	console.log('handleTouch: e = ', e);
	// 	const firstTouchEvent = e.touches[0];
	// 	const location = {
	// 		x: firstTouchEvent.clientX,
	// 		y: firstTouchEvent.clientY,
	// 	};
	// };

	return (
		<ReactTouchEvents
			onSwipe={(direction) => handleSwipe(direction)}
		>
			{/* role="button" will register the keystrokes */}
			<StyledTetrisWrapper 
				role="button" 
				tabIndex="0" 
				onKeyDown={e => move(e)} 
				onKeyUp={keyUp}
			>
				<StyledTetris>
					<Stage stage={stage} />
					<aside>
						{gameOver ? (
							<Display gameOver={gameOver} text="Game Over" />
						) : (
								<div>
									<Display text={`Score: ${score}`} />
									<Display text={`Rows: ${rows}`} />
									<Display text={`Level: ${level}`} />
								</div>
						)}
						<StartButton callback={startGame} />
					</aside>
				</StyledTetris>
			</StyledTetrisWrapper>
		</ReactTouchEvents>
	);
};

export default Tetris;
