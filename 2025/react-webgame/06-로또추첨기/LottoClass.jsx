import React, { Component } from 'react';
import BallClass from './BallClass';

function getWinNumbers() {
  console.log('getWinNumbers'); // 반복실행여부 파악하기 위해 console.log 넣음

  const candidate = Array(45).fill().map((v, i) => i + 1);
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

  timeouts = [];  // hooks에서는 useRef 쓰지만..

  runTimeouts = () => {
    const { winNumbers } = this.state;
    console.log(winNumbers);

    for(let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);  // 1초마다 나오도록
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true, // 한번더 버튼이 보임
      });
    }, 7000);
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.winBalls.length === 0) {  // 언제 업데이트를 할건지 잘 판단 (이게 없다면 setState가 바뀔때마다 실행되므로 조건문 꼭!)
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => clearTimeout(v));
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [], 
      bonus: null,
      redo: false,
    });

    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <BallClass key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <BallClass number={bonus} />}
        <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>
      </>
    );
  };
}

export default LottoClass;