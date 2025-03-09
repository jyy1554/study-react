import React, { Component } from 'react';

class ResponseCheckClass extends Component {
  state = {
    text: '클릭해서 시작하세요',
    color: 'skyblue',
    start: false,
    response: new Date().getTime(),
  };

  onClick = () => {
    if (!this.state.start) {
      this.setState({
        text: '초록색이 되면 클릭하세요',
        color: 'red',
        start: true,
      });
  
      setTimeout(() => {
        this.setState({
          color: 'green',
          response: new Date().getTime(),
        });
      }, 3000);
    } else {
      console.log(`반응속도 : ${new Date().getTime() - this.state.response} ms`);

      this.setState({
        text: '클릭해서 시작하세요',
        color: 'skyblue',
        start: false,
      });
    }
  }

  render() {
    return (
      <>
        <div onClick={this.onClick} style={{
          backgroundColor: `${this.state.color}`, 
          width: '300px', 
          height: '300px',
          textAlign: 'center',
          padding: '3px',
        }}>
          <h2>{this.state.text}</h2>
        </div>
      </>
    );
  };
};

export default ResponseCheckClass;