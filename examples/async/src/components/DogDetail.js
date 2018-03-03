import React from 'react';
import store from '../store/index';

class DogDetail extends React.Component {

  render() {
    return (
      <div>
        <img src={this.props.global.message} />
      </div>

    );
  }
}

export default store.connect(DogDetail, 'UPDATE_DOG_IMAGE');
