import React from 'react';
import StateEmitter from '../util/state-emitter';
import PropTypes from 'prop-types';

export default class StoreProvider extends React.Component {

  constructor(props) {
    super();

    const xtate = new StateEmitter(props.store, props.log);

    this.state = {
      xtate
    }
  }

  getChildContext() {
    return {
      xtate: this.state.xtate
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

StoreProvider.childContextTypes = {
  xtate: PropTypes.instanceOf(StateEmitter)
};

StoreProvider.propTypes = {
  store: PropTypes.object.isRequired,
  log: PropTypes.bool
};