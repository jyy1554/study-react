import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER'; // export해서 모듈로 만들어 버리기
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (prevState, action) => {
  switch(action.type) {
    case SET_WINNER: {
      // prevState.winner = action.winner; // 이렇게 하면 안됨 (직접 건들면 안됨)
      return {
        ...prevState,
        winner: action.winner,
      };
    }
    case CLICK_CELL: {
      const tableData = [...prevState.tableData];
      tableData[action.row] = [...prevState.tableData[action.row]]; // immer라는 라이브러리 가독성 해결 가능
      tableData[action.row][action.cell] = prevState.turn;

      return {
        ...prevState,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...prevState,
        turn: prevState.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...prevState,
        turn: 'O',
        tableData: [
          ['', '', ''], 
          ['', '', ''], 
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return prevState;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);  // setState를 dispatch로 한방에 해결할 수 있음
  const { tableData, turn, winner, recentCell } = state;

  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {  // 컴포넌트에 넣는 함수들은 다 useCallback하기
    dispatch({type: SET_WINNER, winner: 'O'});
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }

    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }

    if (win) {  // 승리 시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {  // 무승부 검사
      let all = true; // all이 true면 무승부라는 의미

      tableData.forEach((row) => {
        row.forEach((cell) => {
          if(!cell) {
            all = false;
          }
        })
      });

      if (all) {  // 무승부일 경우
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;