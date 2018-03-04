import React from 'react';
import { clearDogData, updateDogImage } from '../store';

export default class Button extends React.Component {

  render() {
    return (
      <div>
        <button onClick={updateDogImage}>Load random dog image</button>
        <button onClick={clearDogData}>Remove Dog Image from the store</button>
      </div>

    );
  }
}

// No need to add store.connect(Button) because this component is not using the state to render itself
