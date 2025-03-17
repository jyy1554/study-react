import React, { Component } from 'react';
import BallClass from './BallClass';

function getWinNumbers() {
  console.log('getWinNumbers'); // 반복실행여부 파악하기 위해 console.log 넣음

  const candidate = Array(45).map((v, i) => i + 1);
  const shuffle = [];

  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }

  const bonusNumber = shuffle[shuffle.length - 1];  // shuffle 마지막 숫자
  const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);  // 앞에서 6개 숫자, 오름차순

  return [...winNumbers, bonusNumber];
}

class LottoClass extends Component {
  state = {
    winNumbers: getWinNumbers(),  // 당첨 숫자들
    winBalls: [], 
    bonus: null,  // 보너스 공
    redo: false,
  };

  render() {
    const { winBalls, bonus, redo } = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <BallClass number={bonus} />}
        <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>
      </>
    );
  };
}

export default LottoClass;