import React from 'react';

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

  render() {
    let stackItems = []

    for (let i = 0; i < this.state.stack.length; i++) {
      const element = this.state.stack[i]
      stackItems.push(
        <li key={i}>{element.value}</li>
      );
      
    }

    return (
      <div id="calculator">
        <div>
          { stackItems }
        </div>
          <input value={this.state.currentNumber} onChange={this.handleChange} type="text"/>
          <button onClick={() => this.addToStack(this.state.currentNumber)}> ENTER </button>
          <button onClick={this.add}> + </button>
          <button onClick={this.substract}> - </button>
          <button onClick={this.multiple}> * </button>
          <button onClick={this.divide}> / </button>
          <button onClick={this.invert}> ± </button>
          <button onClick={this.swap}> SWAP </button>
          <button onClick={this.drop}> DROP </button>
      </div>
    );
  }
}

export default Calculator;
