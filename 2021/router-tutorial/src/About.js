import React, { useMemo } from 'react';
import { useLocation } from 'react-router';

function useQuery() {
  const {search} = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const About = () => {
  let query = useQuery();
  const showDetail = query.get('detail') === 'true';
  
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};

export default About;