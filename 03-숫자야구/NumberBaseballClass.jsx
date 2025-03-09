import React, { Component } from 'react'; // 우리는 babel 덕분에 import 쓸 수 있음
import Try from './Try';

const getNumbers = () => {  // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);

    // const randomNum = candidate[Math.floor(Math.random() * 9)];
    // if(array.indexOf(randomNum) === -1) {
    //   array.push(randomNum);
    // }else {
    //   i--;
    // }
  }

  return array;
}

class NumberBaseballClass extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // 바깥에 만들어야됨!!!!
    tries: [],  // push쓰면 안됨. push 쓰면 (메모리 참조 시) 기존 배열과 차이가 없어 리액트에서 변화를 감지하지 못함
  };

  onSubmit = (e) => { // 화살표 함수를 안쓰면 constructor를 써야됨
    e.preventDefault();

    const { value, answer, tries } = this.state;

    if (value === answer.join('')) {
      this.setState({
        result: '홈런!',
        tries: [...tries, { try: value, result: '홈런!' }],
      });
      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
    } else {  // 답 틀렸으면
      const valueArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) { // 10번 이상 틀렸을때
        this.setState({
          result: `10번 넘게 틀려 실패! 답은 ${answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (valueArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(valueArray[i])) {
            ball++;
          }
        }

        this.setState({
          tries: [...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼` }],
          value: '',
        });
      }
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

  render() {
    const { result, value, tries } = this.state;

    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmit}>
          <input maxLength={4} ref={this.onRefInput} value={value} onChange={this.onChange} />
          <button type="submit">입력</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return (
              <Try key={`${i}차 시도: `} tryInfo={v} />
            );
          })}
        </ul>
      </>
    );
  }
}

// export const hello = 'hello'; // default로 export되지않은 것을 가져올때는 import { hello }; 이런식으로
export default NumberBaseballClass; // default로 export한 것을 가져올때는 import NumberBaseballClass; 이런식으로