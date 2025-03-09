import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');  // setState는 return이 다시 실행됨
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);

  // 주의!! 아래에서 let을 쓰면 렌더링될때마다 초기값으로 초기화되어 값을 기억못함.
  // 밖에 뺄수도 있으나, 해당 컴포넌트에 여러 인스턴스가 있을 경우 같은 변수를 공유하게되어 문제가 될수도 있다.
  const timeout = useRef(null); // useRef 값을 바꾸더라도 return이 다시 실행되지 않는다. 즉, 불필요한 렌더링을 막는다.
  const startTime = useRef();
  const endTime = useRef();

  const onClick = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');

      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');

        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(timeout.current);

      setState('waiting');
      setMessage('너무 성급하시군요! 초록색으로 변경된 후에 클릭하세요.');
    } else if (state === 'now') { // 반응속도 체크
      endTime.current = new Date();

      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
    }
  }

  const onReset = () => {
    setResult([]);
    setState('waiting');
    setMessage('클릭해서 시작하세요.');
  }

  const resultAverage = () => {
    return result.length === 0 
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
        <button onClick={onReset}>리셋</button>
      </>;
  }

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClick}
      >
        {message}
      </div>
      {resultAverage()}
      {/* { 
        this.state.result.length === 0 ? 
        null : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length} ms</div>
      }
      {
        this.state.result.length !== 0
        && <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length} ms</div>
      } */}
    </>
  );
};

export default ResponseCheck;