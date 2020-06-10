import { useState, useCallback } from 'react';

import { randomTetromino } from '../components/tetromios';
import { STAGE_WIDTH } from '../components/gameHelpers';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: randomTetromino().shape,
        collided: false,
    });

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

    return [player, updatePlayerPos, resetPlayer];
};

