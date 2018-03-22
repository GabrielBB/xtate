import React from 'react';
import { Connect } from 'xtate';

class DogDetail extends React.Component {

  render() {
    const image = this.props.store.image ? <img alt="dog" src={this.props.store.image} /> : null;

    return (
      <div>
        {image}
      </div>

    );
  }
}

export default Connect(DogDetail);
