import React, { Component } from 'react';

class R011_SpreadOperator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //javascript Array
    var varArray1 = ['num1', 'num2'];
    var varArray2 = ['num3', 'num4'];

    //ES6 Array
    let sumLetArr = [...varArray1, ...varArray2];
    console.log(`1. sumLetArr : ${sumLetArr}`);
    const [sum1, sum2, ...remain] = sumLetArr;
    console.log(`2. sum : ${sum1}, sum2 : ${sum2}, remain : ${remain}`);

    var varObj1 = { key1 : 'val1', key2 : 'val2' };
    var varObj2 = { key3 : 'val3', key4 : 'val4' };
    //ES6 Object
    let sumLetObj = {...varObj1, ...varObj2};
    console.log(`3. sumLetObj : ${JSON.stringify(sumLetObj)}`)
    let {key1, key3, ...others} = sumLetObj;
    console.log(`4. key1 : ${key1}, key3 : ${key3}, others : ${JSON.stringify(others)}`);
  }

  render() {
    return (
      <h2>[THIS IS SpreadOperator]</h2>
    )
  }
}

export default R011_SpreadOperator;
