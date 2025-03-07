import React, { Component } from 'react';

class WordRelay extends Component {
  // constructor(props) {
  //     super(props);
  // }

  state = {
    word: '갈매기',
    value: '',
    result: '',
  };

  onSubmit = (e) => {
    e.preventDefault();

    // console.log('submit', this.state.word.slice(0,1));

    if (this.state.word.slice(this.state.word.length - 1) === this.state.value.slice(0,1)) {
      this.setState((prevState) => {
        return {
          word: prevState.value,
          value: '',
          result: '정답',
        };
      });
    } else {
      return {
        value:'',
        result: '땡',
      };
    }

    this.input.focus();
  };

  onRefInput = (c) => {
    this.input = c;
  };

  onChange = (e) => {
    // console.log(e.target.value);

    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmit}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChange} />
          <button type="submit">입력!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

export default WordRelay;