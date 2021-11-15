import React, { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);  //첫번째 원소 : 상태값, 두번째 원소 : 상태를 설정하는 함수

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};

export default Counter;