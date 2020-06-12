import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from "./tetromios";

const Cell = ({ type }) => (
    <>
        {/* {console.log('type: ', type)} */}
        <StyledCell type={type} color={TETROMINOS[type].color} >
            {console.log("[Cell] re-renderd")}
        </StyledCell>
    </>
);

export default React.memo(Cell);
