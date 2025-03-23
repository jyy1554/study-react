import React, { Component } from 'react';

class ResponseCheckClass extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  timeout;
  startTime;  // 바뀌어도 렌더링 안됨
  endTime;

  onClick = () => {
    const { state, message, result } = this.state;

    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요',
      });

      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });

        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(this.timeout);

      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색으로 변경된 후에 클릭하세요.',
      });
    } else if (state === 'now') { // 반응속도 체크
      this.endTime = new Date();

      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  
 
    // } else {
    //   console.log(`반응속도 : ${new Date().getTime() - this.state.response} ms`);

    //   this.setState({
    //     text: '클릭해서 시작하세요',
    //     color: 'skyblue',
    //     start: false,
    //   });
    // }
  }

  onReset = () => {
    this.setState({
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.',
    });
  }

  resultAverage = () => {
    const { result } = this.state;

    return result.length === 0 
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>;
  }

  render() {
    const { state, message } = this.state;

    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClick}
        >
          {message}
        </div>
        {this.resultAverage()}
        {/* { 
          this.state.result.length === 0 ? 
          null : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length} ms</div>
        }
        {
          this.state.result.length !== 0
          && <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length} ms</div>
        } */}
      </>
    );
  };
};

export default ResponseCheckClass;