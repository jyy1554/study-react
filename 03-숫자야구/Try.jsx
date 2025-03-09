import React, { memo, useState } from 'react';

/**
 * 자식 컴포넌트가 바뀌는 경우
 * 1. state가 바뀌는 경우
 * 2. props가 바뀌는 경우
 * 3. 부모 컴포넌트가 리렌더링 되는 경우 (=> memo는 3번 경우처럼 부모 리렌더링에 의해 자식이 불필요하게 리렌더링되는 경우를 막아준다. 단, Class 컴포넌트는 PureComponent 사용필요)
 */

// const Try = (props) => {
const Try = memo(({ tryInfo }) => {
  // const { tryInfo } = props;

  // 자식 컴포넌트에서는 부모로부터 받은 props를 수정하지 않는 것이 원칙이나
  // 실무에서는 어쩔 수 없이 변경해야하는 경우가 있음.
  // 그럴 경우, 아래와 같이 진행. (부모에 영향이 없도록 새로운 state를 만듦)

  const [result, setResult] = useState(tryInfo.result);

  const onClick = () => {
    setResult('1');
  }

  return (
    // <li>{tryInfo.try} : {tryInfo.result}</li>
    <li onClick={onClick}>{tryInfo.try} : {result}</li>
  );
});

Try.displayName = "Try";

export default Try;