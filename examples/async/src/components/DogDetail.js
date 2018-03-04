import React from 'react';
import store from '../store/index';

class DogDetail extends React.Component {

  render() {
    return (
      <div>
        <span style={{display: 'block'}}>{this.props.title}</span>
        {<img src={this.props.store.image} />}
      </div>

    );
  }
}

export default store.connect(DogDetail);
