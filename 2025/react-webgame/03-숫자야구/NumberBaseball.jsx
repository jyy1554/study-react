import React, { useState, useRef } from 'react';
import Try from './Try';

const getNumbers = () => {
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const randomNum = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(randomNum);
  }

  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  // const [answer, setAnswer] = useState(getNumbers()); // getNumbers()로 쓰면 리렌더링 시 계속 실행됨. answer가 바뀌지는 않으나..
  const [answer, setAnswer] = useState(getNumbers); // lazy init이라고 부름. 따라서, 이렇게 getNumbers로 써줘야함. 리렌더링 시 실행안됨. 최초에만 실행됨
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (value === answer.join('')) { // 맞으면
      setResult('합격!');
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '합격!' }];
      });

      alert('게임을 다시 시작합니다.');

      setValue('');
      setAnswer(getNumbers());  // 여기서는 () 빼면 안됨! () 빼도 되긴하나.. 운좋게 () => {} 형태로 들어가니 문제가 없는것. 
      setTries([]);
    } else {  // 틀리면
      const valueArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {  // 10번 이상 틀렸을때
        setResult(`10번 넘게 틀려 실패! 답은 ${answer}였습니다!`);

        alert('게임을 다시 시작합니다.');

        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (valueArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(valueArray[i])) {
            ball++;
          }
        }

        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼` }];
        });
        setResult(`${strike} 스트라이크, ${ball} 볼`);
        setValue('');
      }
    }

    inputRef.current.focus();
  };

  const onChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input maxLength={4} ref={inputRef} value={value} onChange={onChange} />
        <button type="submit">입력</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {
          tries.map((v, i) => {
            return (
              <Try key={`${i + 1}차 시도 `} tryInfo={v} />
            );
          })
        }
      </ul>
    </>
  );
}

export default NumberBaseball;