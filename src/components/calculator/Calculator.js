import React from 'react';
import CalculatorButton from '../calculatorButton/CalculatorButton';
import './calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: [],
      currentNumber: "0"
    };
  }

  _handleKeydown = (event) => {
    if (event.keyCode === 8) this.popCurrentNumber()
  }

  _handleKeypress = (event) => {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 48:
        this.pushToCurrentNumber('0')
        break;
      case 49:
        this.pushToCurrentNumber('1')
        break;
      case 50:
        this.pushToCurrentNumber('2')
        break;
      case 51:
        this.pushToCurrentNumber('3')
        break;
      case 52:
        this.pushToCurrentNumber('4')
        break;
      case 53:
        this.pushToCurrentNumber('5')
        break;
      case 54:
        this.pushToCurrentNumber('6')
        break;
      case 55:
        this.pushToCurrentNumber('7')
        break;
      case 56:
        this.pushToCurrentNumber('8')
        break;
      case 57:
        this.pushToCurrentNumber('9')
        break;
      case 46:
        this.pushToCurrentNumber('.')
        break;
      case 43: // +
        this.add()
        break;
      case 45: // -
        this.substract()
        break;
      case 47: // /
        this.divide()
        break;
      case 42: // *
        this.multiple()
        break;
      case 177: // ±
        this.invert()
        break;
      case 13: // ENTER
        this.addToStack(this.state.currentNumber)
        break;
    
      default:
        break;
    }
  }

  _clearCurrentNumber = () => {
    this.setState({currentNumber: 0}); 
  }

  async _unstack() {
    if (this.state.stack.length === 0) return
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
    if (this.state.stack.length < 2) return
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(secondToLastStackItem.value + lastStackItem.value)
  }

  substract = async () => {
    if (this.state.stack.length < 2) return
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(secondToLastStackItem.value - lastStackItem.value)
  }

  multiple = async () => {
    if (this.state.stack.length < 2) return
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(secondToLastStackItem.value * lastStackItem.value)
  }
  
  divide = async () => {
    if (this.state.stack.length < 2) return
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(secondToLastStackItem.value / lastStackItem.value)
  }

  invert = async () => {
    if (this.state.stack.length === 0) return
    const lastStackItem = await this._unstack()
    
    this.addToStack(lastStackItem.value * -1)
  }

  swap = async () => {
    if (this.state.stack.length < 2) return
    const lastStackItem = await this._unstack()
    const secondToLastStackItem = await this._unstack()
    
    this.addToStack(lastStackItem.value)
    this.addToStack(secondToLastStackItem.value)
  }

  drop = async () => {
    this._unstack()
  }

  popCurrentNumber = () => {
    if (!this.state.currentNumber.length || this.state.currentNumber.length === 0) return

    const newCurrentNumber = [...this.state.currentNumber]
    newCurrentNumber.pop();
    this.setState({currentNumber: newCurrentNumber});
  }

  pushToCurrentNumber = (number) => {
    parseFloat(this.state.currentNumber) === 0 ? this.setState({currentNumber: number}) : this.setState({currentNumber: this.state.currentNumber + number})
  }

  componentDidMount = () => {
    document.addEventListener("keypress", this._handleKeypress);
    document.addEventListener("keydown", this._handleKeydown);
  }
  
  componentWillUnmount = () => {

    document.removeEventListener("keydown", this._handleKeydown);
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
      { value: 'SUPR', operation: this.popCurrentNumber },
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
      { value: '.',operation: () => this.pushToCurrentNumber('.') },
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
            { buttons }
          </div>
        </div>
      </span>
    );
  }
}

export default Calculator;
