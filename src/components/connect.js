import React from 'react';
import PropTypes from 'prop-types';
import StateEmitter from '../util/state-emitter';

const Connect = (ComponentToConnect) => {

  class StoreHOC extends React.Component {

    constructor(props, context) {
      super();
      this.state = context.xtate.store
    }

    componentDidMount() {
      //const component = this;

      this.listener = this.context.xtate.addListener('_', () => {
        this.setState(this.context.xtate.store);
      });
    }

    componentWillUnmount() {
      this.listener.remove();
    }

    render() {
      return (
        <ComponentToConnect store={this.state} {...this.props}
          dispatch={this.context.xtate.dispatch} />
      );
    }
  };

  StoreHOC.contextTypes = {
    xtate: PropTypes.instanceOf(StateEmitter)
  }

  return StoreHOC;
}

export default Connect;