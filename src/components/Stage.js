import React from 'react';

import Cell from './Cell';

const Stage = ({ stage }) => (
    <div>
        {console.log('stage: ', stage)}
        {stage.map((row) => row.map((cell, x) => <Cell />) )  }
    </div>
);

export default Stage;
