import React, { memo } from "react";
import Td from './Td';

// 계속 tr 3개가 리렌더링 되므로 memo를 사용하여 최적화
const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');

  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        <Td dispatch={dispatch} key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} >{''}</Td>
      ))}
    </tr>
  );
});

export default Tr;