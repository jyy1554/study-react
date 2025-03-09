import React, { Component } from 'react'; // 우리는 babel 덕분에 import 쓸 수 있음

class NumberBaseballClass extends Component {
  state = {
    answer: [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9), Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)],
    result: '',
    value: '',
    history: '',
  };

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state.answer);

    const num = this.state.value;
    const target = this.state.answer.map((element) => element.toString());
    let strike = 0;
    let ball = 0;

    for(let i = 0; i < num.length; i++) {
      if(target.includes(num[i]) && (target[i] === num[i])) {
        strike++;
      } else if(target.includes(num[i]) && !(target[i] === num[i])) {
        ball++;
      }
    }

    if (strike === 4) {
      this.setState({
        result: '홈런',
        history: '',
        value: '',
        answer: [Math.ceil(Math.random() * 9), Math.ceil(Math.random() * 9), Math.ceil(Math.random() * 9), Math.ceil(Math.random() * 9)],
      });

      const his = document.querySelector('.history');
      his.textContent = '';
    } else {
      this.setState({
        result: `S: ${strike} B: ${ball}`,
        history: `${this.state.value} -> S: ${strike} B: ${ball}`,
        value: '',
      });

      this.addHistory();
    }

    this.input.focus();
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  input;

  onRefInput = (c) => {
    this.input = c;
  }

  addHistory = () => {
    const his = document.querySelector('.history');
    const element = document.createElement('article');
    element.textContent = this.state.history;
    console.log(this.state.history);
    his.appendChild(element);
  }

  render() {
    return (
      <>
        <div>{this.state.result}</div>
        <form onSubmit={this.onSubmit}>
          <input ref={this.onRefInput} type="text" value={this.state.value} onChange={this.onChange} />
          <button type="submit">입력</button>
        </form>
        <div>{this.state.history}</div>
        <div>-----History-----</div>
        <div className="history"></div>
      </>
    );
  }
}

// export const hello = 'hello'; // default로 export되지않은 것을 가져올때는 import { hello }; 이런식으로
export default NumberBaseballClass; // default로 export한 것을 가져올때는 import NumberBaseballClass; 이런식으로