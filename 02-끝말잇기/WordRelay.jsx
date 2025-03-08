import React from 'react';
import { useState, useRef } from 'react';

const WordRelay = () => {
  const [word, setWord] = useState('갈매기');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if(word[word.length - 1] === value[0]) {
      setResult("정답");
      setWord(value);
      setValue('');
    } else {
      setResult("땡");
      setValue('');
    }

    inputRef.current.focus();
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmit}>
        {/* for와 class는 JS의 예약어이기 때문에 JSX에서는 htmlFor와 className이라고 써야됨 */}
        <label id='label' htmlFor="wordInput">글자를 입력하세요.</label>
        <input id='wordInput' className="wordInput" ref={inputRef} value={value} onChange={onChange} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
}

export default WordRelay;