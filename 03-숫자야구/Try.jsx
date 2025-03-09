import React, { Component } from 'react';

class Try extends Component {
  render() {
    const { tryInfo } = this.props;

    return (
      <li>
        {tryInfo.try} : {tryInfo.result}
      </li>
    );
  }
}

export default Try;