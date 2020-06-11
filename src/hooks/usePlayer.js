import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../components/tetromios';
import { STAGE_WIDTH, checkCollision } from '../components/gameHelpers';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape, // Stage will be blank on first look
        // tetromino: randomTetromino().shape,
        collided: false,
    });


    const rotate = (matrix, dir) => {
        // Make the rows to become cols (transpose)
        const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));

        // Reverse each row to get a rotated matrix
        if (dir > 0) return rotatedTetro.map((row) => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);


        const pos = clonedPlayer.pos.x;
        let offset = 1;
        // we're not moving so we send - {x: 0, y: 0}
        while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
            clonedPlayer.pos.x += offset; // add the offset
            offset = -(offset + (offset > 0));

            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);

    };

    /** set the player state */
    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer((prev) => ({
            ...prev,
            pos: {
                x: (prev.pos.x += x),
                y: (prev.pos.y += y),
            },
            collided,
        }))
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {
                x: STAGE_WIDTH / 2 - 2, // middle of the Grid
                y: 0,                   // Top of the Grid
            },
            tetromino: randomTetromino().shape, // get a random Tetromino
            collided: false,
        });
    }, []);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
};

