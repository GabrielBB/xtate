import React from 'react';
import { EventEmitter } from 'fbemitter';

export default class Xtate extends EventEmitter {
  constructor(initialState = {}, logChanges = false) {
    super();
    this.store = initialState;
    this.logChanges = logChanges;
  }

  updateStore = (event, newState) => {
    this.store = newState;
    super.emit('_');

    // With this im going to try to travel in time with a future dev tools
    // it will probably require immutability like Redux does
    if (this.logChanges) {
      console.log(event + ' action changed store to: ');
      console.log(newState);
    }
  }

  createAction(event, callback) {
    super.addListener('_' + event, callback);

    return (payload) => {
      this.dispatch(event, payload);
    };
  }

  actionAsync = (event, reducer) => {
    return this.createAction(event, async (payload) => {
      const result = await reducer(this.store, payload);

      this.updateStore(event, result);

    });
  }

  action = (event, reducer) => {
    return this.createAction(event, (payload) => {
      const result = reducer(this.store, payload);

      this.updateStore(event, result);

    });
  }

  dispatch = (event, payload) => {
    super.emit('_' + event, payload);
  }

  connect = (ChildComponent) => {
    const xtate = this;

    return class extends React.Component {

      constructor() {
        super();
        this.state = xtate.store;
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
          // The Store (the global state) and the props the user passes are divided, not mixed like in Redux
          <ChildComponent store={this.state} {...this.props} />
        );
      }
    };
  }
}
