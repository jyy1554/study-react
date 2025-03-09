import React, { Component } from 'react'; // 우리는 babel 덕분에 import 쓸 수 있음
import Try from './Try';

const getNumbers = () => {  // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseballClass extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     result: '',
  //     value: '',
  //     answer: getNumbers(), // 바깥에 만들어야됨!!!!
  //     tries: [],
  //     history: '',
  //   };
  //   this.onSubmit = this.onSubmit.bind(this); // 화살표 함수 안쓰고 onSubmit() {} 이렇게 쓰는 경우 여기서 bind 안하면 this 못씀
  //   this.onChange = this.onChange.bind(this);
  // }

  state = {
    result: '',
    value: '',
    answer: getNumbers(), // 바깥에 만들어야됨!!!!
    tries: [],
    history: '',
  };

  onSubmit = (e) => { // 화살표 함수를 안쓰면 constructor를 써야됨
    e.preventDefault();

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

  fruits = [
    { fruit: '사과', taste: '맛있다'},
    { fruit: '배', taste: '맛있다'},
    { fruit: '포도', taste: '맛있다'},
    { fruit:'감', taste: '맛있다'},
    { fruit:'밤', taste: '맛있다'},
    { fruit: '사과', taste: '맛없다'},
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmit}>
          <input maxLength={4} ref={this.onRefInput} value={this.state.value} onChange={this.onChange} />
          <button type="submit">입력</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {/* {['가', '나', '다'].map((item) => {
            return (
              <li>{item}</li>
            );
          })} */}

          {/* {[['사과', '맛있다'], ['배', '맛있다'], ['포도', '맛있다'], ['감', '맛있다'], ['밤', '맛있다']].map((v) => {
            return (
              <li><b>{v[0]}</b> - {v[1]}</li>
            );
          })} */}

          {/* {[  // 객체를 더 많이씀
            { fruit: '사과', taste: '맛있다'},
            { fruit: '배', taste: '맛있다'},
            { fruit: '포도', taste: '맛있다'},
            { fruit:'감', taste: '맛있다'},
            { fruit:'밤', taste: '맛있다'},
            { fruit: '사과', taste: '맛없다'},
          ].map((v) => {
            return (
              <li key={v.fruit + v.taste}><b>{v.fruit}</b> - {v.taste}</li> // 반복문을 돌릴때는 key를 적어줘야함
            );
          })} */}

          {this.fruits.map((v, i) => {
            return (
              // 긴 코드를 따로 Component로 빼는 이유 : 가독성, 재사용성, 성능최적화
              <Try key={v.fruit + v.taste} value={v} index={i} /> // value, index 같은 것들을 React에서는 props라고 부름
            );
          })}
        </ul>
      </>
    );
  }
}

// export const hello = 'hello'; // default로 export되지않은 것을 가져올때는 import { hello }; 이런식으로
export default NumberBaseballClass; // default로 export한 것을 가져올때는 import NumberBaseballClass; 이런식으로