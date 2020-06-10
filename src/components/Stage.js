import React from 'react';

import Cell from './Cell';
import { StyledStage } from './styles/StyledState';

const Stage = ({ stage }) => (
    // width and height props changed the game
    <StyledStage width={stage[0].length} height={stage.length}>
    {console.log('stage: ', stage[0])}
        {stage.map((row) => row.map((cell, x) => <Cell type={cell[0]}/>) )  }
    </StyledStage>
);

export default Stage;
