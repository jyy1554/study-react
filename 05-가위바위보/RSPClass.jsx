import React, { Component } from 'react';

// 리액트 실행 순서 (리액트 라이프사이클)
// 클래스의 경우 : constructor -> render -> ref -> componenetDidMount
//  -> (setState/props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
//  -> (부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸)

class RSPClass extends Component {
  state = {
    result: '',
    imgCoord: 0,
    score: 0,
  };

  scissor;
  rock;
  paper;
  value;

  componentDidMount() { // 컴포넌트가 첫 렌더링 된 후 실행. 리렌더링시에는 실행안됨 (이것을 만약 render에 setState로 쓰면 계속 리렌더링됨)
                        // 여기에 비동기 요청을 많이함

    this.scissor = setInterval(() => {  // 가위
      this.setState({
        imgCoord: '-1500px',
      });

      this.value = 'scissor';
    }, 300);

    this.paper = setInterval(() => { // 보
      this.setState({
        imgCoord: '-3000px',
      });

      this.value = 'paper';
    }, 500);

    this.rock = setInterval(() => { // 바위
      this.setState({
        imgCoord: '0px',
      });

      this.value = this.rock;
    }, 700);
  }

  componentDidUpdate() { // 리렌더링 후 이것이 실행 후

  }

  componentWillUnmount() { // 컴포넌트 제거되기 직전에 실행 (부모 컴포넌트가 나를 없앴을 때). 비동기 요청 정리

  }

  onClickBtn = (e) => {
    clearInterval(this.scissor);
    clearInterval(this.rock);
    clearInterval(this.paper);

    console.log(this.value);


    // 내가 낸 거
    if (e.target.id === 'rock') {
      if (this.value === 'paper') {
        console.log('You lose');
        this.setState((prevState) => {
          return {
            score: prevState.score - 1,
          };
        });
      } else if (this.value === 'scissor') {
        console.log('You win');
        this.setState((prevState) => {
          console.log(prevState.score);
          return {
            score: prevState.score + 1,
          };
        });
      }
    } else if (e.target.id === 'scissor') {
      if (this.value === 'rock') {
        console.log('You lose');
        this.setState((prevState) => {
          return {
            score: prevState.score - 1,
          };
        });
      } else if (this.value === 'paper') {
        console.log('You win');
        this.setState((prevState) => {
          return {
            score: prevState.score + 1,
          };
        });
      }
    } else { // 보
      if (this.value === 'scissor') {
        console.log('You lose');
        this.setState((prevState) => {
          return {
            score: prevState.score - 1,
          };
        });
      } else if (this.value === 'rock') {
        console.log('You win');
        this.setState((prevState) => {
          return {
            score: prevState.score + 1,
          };
        });
      }
    }
  };

  render() {
    const { result, score, imgCoord } = this.state;
    const { onClickBtn } = this;

    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={onClickBtn} >바위</button>
          <button id="scissor" className="btn" onClick={onClickBtn}>가위</button>
          <button id="paper" className="btn" onClick={onClickBtn}>보</button>
          <button id="reset" className="btn" onClick={onClickBtn}>리셋</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  };
};

export default RSPClass;