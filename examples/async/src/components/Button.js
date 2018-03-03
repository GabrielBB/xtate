import React from 'react';
import store from '../store';

export default class Button extends React.Component {

    updateDogImage = () => {
      store.dispatch('UPDATE_DOG_IMAGE');
    }

    render() {
      return (
        <div>
          <button onClick={this.updateDogImage}>Load random dog image</button>
        </div>

      );
    }
}

// No need to add store.connect(Button) because this component is not using the state to render itself
