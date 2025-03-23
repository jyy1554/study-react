import React, { PureComponent } from 'react'; // class 컴포넌트만 PureComponent 씀. 함수 컨포넌트는 memo써야됨

/**
 * 자식 컴포넌트가 바뀌는 경우
 * 1. state가 바뀌는 경우
 * 2. props가 바뀌는 경우
 * 3. 부모 컴포넌트가 리렌더링 되는 경우 (=> pureComponent는 3번 경우처럼 부모 리렌더링에 의해 자식이 불필요하게 리렌더링되는 경우를 막아준다. 단, 함수 컴포넌트는 memo 사용필요)
 */

class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props;

    return (
      <li>
        {tryInfo.try} : {tryInfo.result}
      </li>
    );
  }
}

export default Try;