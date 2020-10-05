import React, { Component, ChangeEvent } from 'react';
import Toggle from 'react-toggle';

class Controlled extends Component {
  state = {
    burritoIsReady: false
  };
  handleBurritoChange: ((event: ChangeEvent) => void) | undefined;

  render() {
    return (
      <form ref="breakfastForm">
        {/* Controlled Component */}

        <div className="example">
          <label>
            <input type="checkbox" checked={this.state.burritoIsReady} name="burritoIsReady2" onChange={this.handleBurritoChange} />
            <span className="label-text"> Controlled Component</span>
          </label>

          <br />
          <Toggle checked={this.state.burritoIsReady} name="burritoIsReady" value="yes" onChange={this.handleBurritoChange} />
        </div>
      </form>
    );
  }
}

export default Controlled;
