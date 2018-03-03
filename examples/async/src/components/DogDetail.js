import React from 'react';
import store from '../store/index';

class DogDetail extends React.Component {

  render() {
    return (
      <div>
        {this.props.global.data ? <img src={this.props.global.data.message} /> : null}
      </div>

    );
  }
}

export default store.connect(DogDetail);
