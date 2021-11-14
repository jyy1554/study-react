import React, { Component } from 'react';

class Counter extends Component {
  //컴포넌트에 state 설정 시 constructor 메서드 필수
  constructor(props) {
    // 클래스형 컴포넌트에서 constructor 작성 시 반드시 super(props); 호출 필요
    super(props);
    // state의 초깃값 설정하기
    this.state = {
      number: 0
    };
  }
  render() {
    const {number} = this.state;  // state를 조회할 때는 this.state로 조회함, state는 객체 형식
    return (
      <div>
        <h1>{number}</h1>
        <button
          // onClick을 통해 버튼이 클릭되었을 때 호출시킬 함수를 설정함
          onClick={() => {
            //this.setState를 사용하여 state값을 바꿀 수 있음
            this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;