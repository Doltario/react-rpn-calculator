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
    const firstTerm = await this._unstack()
    const secondTerm = await this._unstack()
    
    this.addToStack(firstTerm.value + secondTerm.value)
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
          <button onClick={() => this.addToStack(this.state.currentNumber)}> coucou </button>
          <button onClick={this.add}> + </button>
      </div>
    );
  }
}

export default Calculator;
