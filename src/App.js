import React from 'react';

function App() {  // 함수형 컴포넌트 (HTML도 문자열 템플릿도 아니며 JSX라 함)
  const name = '리액트';
  const style = {
    //background-color는 backgroundColor와 같이 -가 사라지고 카멜 표기법으로 작성해야함
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: '48px', // font-size -> fontSize
    fontWeight: 'bold', //font-weight -> fontWeight
    padding: 16 // 단위 생략하면 px로 지정됨
  };

  return <div style={style}>{name}</div>;
}

export default App;
