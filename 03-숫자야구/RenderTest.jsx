import React, { PureComponent } from "react"; // PureComponent를 쓰면 불필요한 렌더링을 막음

class RenderTest extends PureComponent {
  state = {
    counter: 0,
  };

  // 아래처럼 shouldComponentUpdate를 쓰거나...
  // shouldComponentUpdate(nextProps, nextState, nextContext) {  // 이럴때만 업데이트해라. 성능최적화
  //   if (this.state.counter !== nextState.counter) {
  //     return true;
  //   }
  //   return false;
  // }

  onClick = () => {
    this.setState({});
  };

  render() {
    console.log('렌더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default RenderTest;