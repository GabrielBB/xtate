import { Component } from 'react';
import PropTypes from 'prop-types';

export default class StoreProvider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

StoreProvider.childContextTypes = {
  store: PropTypes.object.isRequired
};