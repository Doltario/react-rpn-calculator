import React from 'react';
import CalculatorButton from '../calculatorButton/CalculatorButton';
import './calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: [
        {
          value : 12
        }
      ],
      currentNumber: 0
    };
  }

  handleChange = (event) => {   
    this.setState({currentNumber: event.target.value});
  }

  _clearCurrentNumber = () => {
    this.setState({currentNumber: 0}); 
  }

  async _unstack() {
    const newStack = [...this.state.stack]
    const unstackedItem = newStack.splice(newStack.length - 1, 1)[0]
    this.setState({stack: newStack});
    return unstackedItem; 
  }

  addToStack = (stringOrNumberToAdd) => {  
    if (parseFloat(stringOrNumberToAdd) === 0) return
    
    const newStack = [...this.state.stack]
    newStack.push({ value: parseFloat(stringOrNumberToAdd) })
    this.setState({stack: newStack});
    this._clearCurrentNumber();
  }

  add = async () => {
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(secondToLastStackItem.value + lastStackItem.value)
  }

  substract = async () => {
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(secondToLastStackItem.value - lastStackItem.value)
  }

  multiple = async () => {
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(secondToLastStackItem.value * lastStackItem.value)
  }
  
  divide = async () => {
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(secondToLastStackItem.value / lastStackItem.value)
  }

  invert = async () => {
    const lastStackItem = await this._unstack()
    
    this.addToStack(lastStackItem.value * -1)
  }

  swap = async () => {
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(lastStackItem.value)
    this.addToStack(secondToLastStackItem.value)
  }

  drop = async () => {
    this._unstack()
  }

  pushToCurrentNumber = (number) => {
    this.setState({currentNumber: this.state.currentNumber + number})
  }
  render() {
    let stackItems = []

    for (let i = 0; i < this.state.stack.length; i++) {
      const element = this.state.stack[i]
      stackItems.push(
        <li className="calculator-screen-item" key={i}>{element.value}</li>
      );
      
    }

    const BUTTONS_MAP = [ // It allows to change order of buttons to display them as we want
      { value: 'SWAP', operation: this.swap },
      { value: '±',operation: this.invert },
      { value: '+',operation: this.add },
      { value: '1',operation: () => this.pushToCurrentNumber('1') },
      { value: '2',operation: () => this.pushToCurrentNumber('2') },
      { value: '3',operation: () => this.pushToCurrentNumber('3') },
      { value: '-',operation: this.substract },
      { value: '4',operation: () => this.pushToCurrentNumber('4') },
      { value: '5',operation: () => this.pushToCurrentNumber('5') },
      { value: '6',operation: () => this.pushToCurrentNumber('6') },
      { value: '*',operation: this.multiple },
      { value: '7',operation: () => this.pushToCurrentNumber('7') },
      { value: '8',operation: () => this.pushToCurrentNumber('8') },
      { value: '9',operation: () => this.pushToCurrentNumber('9') },
      { value: '/',operation: this.divide },
      { value: 'DROP',operation: this.drop },
      { value: '0',operation: () => this.pushToCurrentNumber('0') },
      { value: 'ENTER',operation: () => this.addToStack(this.state.currentNumber) },
    ]

    let buttons = []
    for (let i = 0; i < BUTTONS_MAP.length; i++) {
      const element = BUTTONS_MAP[i];
      buttons.push(<CalculatorButton printedValue={element.value} operation={element.operation} key={i} /> )
    }

    return (
      <span id="calculator-container">
        <div className="calculator">
          <div className="calculator-screen-container">
            <ul className="calculator-screen">
              { stackItems }
            </ul>
            <div className="calculator-screen flex">
              <span>:</span>
              {this.state.currentNumber}
            </div>

          </div>
          <div className="calculator-buttons-container">
            <div className="spacer"></div>
            { buttons }
            <div className="spacer"></div>

          </div>
        </div>
      </span>
    );
  }
}

export default Calculator;
