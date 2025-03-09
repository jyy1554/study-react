import React from 'react';

// const Try = (props) => {
const Try = ({ tryInfo }) => {
  // const { tryInfo } = props;
  return (
    <li>{tryInfo.try} : {tryInfo.result}</li>
  );
};

export default Try;