import React from 'react';

class CalculatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <span id="button">
        <button onClick={this.props.operation}> {this.props.printedValue} </button>
      </span>
    );
  }
}

export default CalculatorButton;
