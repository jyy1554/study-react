import React, { memo } from "react"; // 자식 컴포넌트는 PureComponent 해도됨

// 함수 컴포넌트에서 PureComponent 적용하려면 memo를 이용
const Ball = memo(({ number }) => {
  let background;

  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    <div className="ball" style={{ background }} >{number}</div>
  );
});

export default Ball;