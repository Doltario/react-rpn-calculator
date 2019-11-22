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

  _getTwoLastStackNumber = () => {
    return [
      this.state.stack[this.state.stack.length-2],
      this.state.stack[this.state.stack.length-1]
    ]
  }

  _unstack(numberOfItems) {
    const newStack = [...this.state.stack]
    newStack.splice(newStack.length-1, 2)
    this.setState({stack: newStack});
  }

  addToStack = (stringOrNumberToAdd) => {
    console.log(stringOrNumberToAdd);
    
    if (parseFloat(stringOrNumberToAdd) === 0) return
    
    const newStack = [...this.state.stack]
    newStack.push({ value: parseFloat(stringOrNumberToAdd) })
    this.setState({stack: newStack});
    this._clearCurrentNumber();
  }

  doAddition = () => {
    const terms = this._getTwoLastStackNumber()
    const result = terms.reduce((sum, term)=> { return sum.value += term.value })
    this._unstack(2)
    //this.addToStack(result)
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
          
            {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
          
          <input value={this.state.currentNumber} onChange={this.handleChange} type="text"/>
          <button onClick={() => this.addToStack(this.state.currentNumber)}> coucou </button>
          <button onClick={this.doAddition}> + </button>
      </div>
    );
  }
}

export default Calculator;
