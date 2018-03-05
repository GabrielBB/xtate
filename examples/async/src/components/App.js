import React from 'react';
import Button from './Button';
import DogDetail from './DogDetail';
import store from '../store/index'

class App extends React.Component {

  render() {
    return (
      <div>
        <Button />
        {
          this.props.store.image ?
            <DogDetail title='Wof Wof' /> : null
        }

      </div>
    );
  }
}

export default store.connect(App);
