import React, { useCallback, useEffect, useRef, memo } from "react";
import { CLICK_CELL } from "./TicTacToe";

// 계속 td 9개가 리렌더링 되므로 memo를 사용하여 최적화
const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log('td rendered');

  // 어떤 값들이 바뀌는지 확인하는 방법
  const ref = useRef([]);

  useEffect(() => {
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    // 확인해보니 cellData가 계속 바뀐다. 따라서, 아래에서 확인해보기
    console.log(cellData, ref.current[3]);

    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);
  ///////

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
  }, [cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  );
});

export default Td;