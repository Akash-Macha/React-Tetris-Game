import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from "./tetromios";

const Cell = ({ type }) => (
    <>
        {console.log('type: ', type)}
        <StyledCell type={type} color={TETROMINOS[type].color} />
    </>
);

export default Cell;
