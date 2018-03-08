import React from 'react';
import { Connect } from 'xtate';
import { clearDogData, updateDogImage } from '../actions/dogActions';

class Button extends React.Component {

  updateDog = async () => {
    try {
      await this.props.dispatch(updateDogImage)
    } catch (ex) {
      console.log(ex);
    }
  }

  clearDog = () => {
    this.props.dispatch(clearDogData)
  }

  render() {
    return (
      <div>
        <button onClick={this.updateDog}>Load random dog image</button>
        <button onClick={this.clearDog}>Remove Dog Image from the store</button>
      </div>

    );
  }
}

export default Connect(Button);