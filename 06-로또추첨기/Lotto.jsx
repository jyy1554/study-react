import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {  // state 안쓰는 것들은 꼭 분리
  console.log('getWinNumbers'); // 반복실행여부 파악하기 위해 console.log 넣음

  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];

  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }

  const bonusNumber = shuffle[shuffle.length - 1];  // shuffle 마지막 숫자
  const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);  // 앞에서 6개 숫자, 오름차순

  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // useMemo : 복잡한 함수 결과값을 기억,  useRef : 일반값을 기억

  // useMemo를 쓰면 getWinNumbers가 계속 실행이 안되고 hooks가 getWinNumbers의 리턴값을 기억할 것임
  const lottoNumbers = useMemo(() => getWinNumbers(), []);  // 배열의 요소가 바뀌면 다시 실행됨
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  // const [winNumbers, setWinNumbers] = useState(getWinNumbers()); // 이렇게 하면 getWinNumbers가 계속 실행됨
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  const runTimeouts = () => {
    console.log(winNumbers, bonus);

    for(let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);  // 1초마다 나오도록
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  useEffect(() => {
    console.log('useEffect');
    runTimeouts();

    // useEffect 안에서 return 하면 componentWillUnmount 역할 함
    return () => {
      timeouts.current.forEach((v) => clearTimeout(v));
    };
  }, [winNumbers]); // 빈 배열이면 componentDidMount와 동일한 기능을 함
  //배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

  const onClickRedo = useCallback(() => { // 자식 컴포넌트에 함수를 넘겨주는 경우 꼭 useCallback을 써야함
    console.log('onClickRedo');
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]); // useCallback에 있는 state 꼭 써주기. 안쓰면 예전 state를 계속 기억하고 있음

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;