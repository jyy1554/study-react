import React, { useState, useRef } from 'react';

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
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const valueArray = value.split('').map((v) => parseInt(v));

    if (answer.join('') === valueArray.join('')) { // 맞으면
      setResult('합격!');
      setTries([...tries, { try: value, result: '합격!' }]);

      alert('게임을 다시 시작합니다.');

      setValue('');
      setAnswer(getNumbers());
      setResult('');
      setTries([]);
    } else {  // 틀리면
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려 실패! 답은 ${answer}였습니다!`);
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answer[i] === valueArray[i]) {
            strike++;
          } else if (answer.includes(valueArray[i])) {
            ball++;
          }
        }

        setResult(`${strike} 스트라이크, ${ball} 볼`);
        setTries([...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼` }]);
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
          tries.map((v) => {
            return (
              <li key={v.try + v.result}>{v.try} : {v.result}</li>
            );
          })
        }
      </ul>
    </>
  );
}

export default NumberBaseball;