import React, { PureComponent } from "react"; // 자식 컴포넌트는 PureComponent 해도됨

class BallClass extends PureComponent {
  render() {
    const { number } = this.props;
    let background;

    if (number <= 10) {
      background = 'red';
    } else if (number <= 20) {
      background = 'orange';
    } else if (number <= 30) {
      background = 'yellow';
    } else if (number <= 40) {
      background = 'blue';
    } else {
      background = 'green';
    }

    return (
      <div className="ball" style={{ background }} >{number}</div>
    );
  }
}

export default BallClass;