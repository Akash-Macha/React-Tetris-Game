import React from 'react';

import Cell from './Cell';
import { StyledStage } from './styles/StyledState';

const Stage = ({ stage }) => (
    // width and height props changed the game
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map((row) => row.map((cell, x) => <Cell />) )  }
    </StyledStage>
);

export default Stage;
