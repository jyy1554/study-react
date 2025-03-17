import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);

  const interval = useRef();  // let interval;이라 쓰면 안됨!!

  useEffect(() => { // componentDidMount, ComponentDidUpdate 역할을 함 (1대1 대응은 아님)
    interval.current = setInterval(changeHand, 300);

    return () => {  // componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]); // 두번째 인수 배열에 넣은 값들이 바뀔때마다 useEffect가 실행됨

  const changeHand = () => { // 1초마다 가위바위보가 돌아감

    if(imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {  // render에서 onClick={() => this.onClickBtn('바위')}의 ()=> 빼려고, () => 한번더 써줌
    clearInterval(interval.current);  // useRef를 쓰고 있으므로

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다.');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다.');
      setScore((prevScore) => prevScore - 1);
    }

    setTimeout(() => {
      interval.current = setInterval(changeHand, 300);  // useRef를 쓰고 있으므로
    }, 1000);
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')} >바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;