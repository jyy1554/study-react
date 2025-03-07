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

    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
      });
    } else {
      this.setState({
        result: '땡',
        value: '',
      });
    }

    this.input.focus();
  };

  onChange = (e) => {
    // console.log(e.target.value);

    this.setState({
      value: e.target.value,
    });
  };

  input;

  onRefInput = (c) => {
    this.input = c;
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