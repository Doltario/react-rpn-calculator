import React from 'react';
import './calculator-button.css';

class CalculatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <div id="calculator-button" onClick={this.props.operation}>
        <div className="calculator-content"> {this.props.printedValue} </div>
      </div>
    );
  }
}

export default CalculatorButton;
