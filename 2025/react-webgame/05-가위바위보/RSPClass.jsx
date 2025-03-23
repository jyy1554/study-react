import React, { Component } from 'react';

// 리액트 실행 순서 (리액트 라이프사이클)
// 클래스의 경우 : constructor -> render -> ref -> componenetDidMount
//  -> (setState/props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
//  -> (부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸)

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

class RSPClass extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
  };

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링 된 후 실행. 리렌더링시에는 실행안됨 (이것을 만약 render에 setState로 쓰면 계속 리렌더링됨)
                        // 여기에 비동기 요청을 많이함
    this.interval = setInterval(this.changeHand, 300);
   
  }

  componentDidUpdate() { // 리렌더링 후 이것이 실행 후

  }

  componentWillUnmount() { // 컴포넌트 제거되기 직전에 실행 (부모 컴포넌트가 나를 없앴을 때). 비동기 요청 정리
    clearInterval(this.interval);
  }

  changeHand = () => { // 1초마다 가위바위보가 돌아감
    const { imgCoord } = this.state;

    if(imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => () => {  // render에서 onClick={() => this.onClickBtn('바위')}의 ()=> 빼려고, () => 한번더 써줌
    const { imgCoord } = this.state;
  
    clearInterval(this.interval);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: '비겼습니다.',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다.',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다.',
          score: prevState.score - 1,
        };
      });
    }

    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 300);
    }, 1000);
  }

  render() {
    const { result, imgCoord, score } = this.state;
  
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')} >바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  };
};

export default RSPClass;