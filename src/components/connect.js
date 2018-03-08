import { Component } from 'react';
import PropTypes from 'prop-types';

export const Connect = (ComponentToConnect) => {
  const xtate = this;

  return class extends Component {

    static contextTypes = {
      store: PropTypes.object.isRequired
    }

    constructor() {
      super();
      this.state = this.context.store
    }

    componentDidMount() {
      const component = this;

      this.listener = xtate.addListener('_', () => {
        component.setState(xtate.store);
      });
    }

    componentWillUnmount() {
      this.listener.remove();
    }

    render() {
      return (
        <ComponentToConnect store={this.state} {...this.props}
          dispatch={xtate.dispatch} />
      );
    }
  };
}