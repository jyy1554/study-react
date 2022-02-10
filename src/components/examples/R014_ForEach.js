import React, { Component } from 'react';

class R014_ForEach extends Component {

  componentDidMount() {
    var ForEach_Arr = [3,2,8,8];
    var ForEach_newArr = [];

    ForEach_Arr.forEach((result) => {
      ForEach_newArr.push(result);
    })
    console.log(`ForEach_newArr : [${ForEach_newArr}]`);
  }


  render() {
    return (
      <h2>[THIS IS ForEach]</h2>
    )
  }
}

export default R014_ForEach;
