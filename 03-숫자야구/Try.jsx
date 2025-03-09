import React, { memo } from 'react';

/**
 * 자식 컴포넌트가 바뀌는 경우
 * 1. state가 바뀌는 경우
 * 2. props가 바뀌는 경우
 * 3. 부모 컴포넌트가 리렌더링 되는 경우 (=> memo는 3번 경우처럼 부모 리렌더링에 의해 자식이 불필요하게 리렌더링되는 경우를 막아준다. 단, Class 컴포넌트는 PureComponent 사용필요)
 */

// const Try = (props) => {
const Try = memo(({ tryInfo }) => {
  // const { tryInfo } = props;
  return (
    <li>{tryInfo.try} : {tryInfo.result}</li>
  );
}); 

export default Try;