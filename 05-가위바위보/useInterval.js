import { useEffect, useRef } from "react";

// 커스텀 훅 만들기

// 사용법
// const [isRunning, setIsRunning] = useState(true);
// useInterval(() => {
//   console.log('hello');
// }, isRunning ? 1000 : null);

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {   // 이 tick 함수를 별도로 쓰는 것은 useEffect에서 [delay, callback]을 쓰는 경우, setInterval과 clearInterval로 인해 생기는 delay를 없애줌
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);  // delay가 null이면 tick이 실행됨
      return () => clearInterval(id); // delay가 널이면 return이 실행됨
    }
  }, [delay]);

  return savedCallback.current;
}

export default useInterval;