import React from 'react';
import Button from './Button';
import DogDetail from './DogDetail';
import store from '../store';

class App extends React.Component {

  render() {
    return (
      <div>
        <Button />
        {
          this.props.store.image ? 
          <DogDetail title='This text is not coming from the store but the image does. Accessing the image in the store with "this.props.store.image" and this text with "this.props.title"' /> : null
        }

      </div>

    );
  }
}

export default store.connect(App);
