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
      console.log(event + ' event changed store to: ');
      console.log(newState);
    }
  }

  actionAsync = (event, reducer) => {
    super.addListener('_' + event, async (payload) => {
      const result = await reducer(this.store, payload);

      this.updateStore(event, result);

    });
  }

  action = (event, reducer) => {
    super.addListener('_' + event, (payload) => {
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

        this.addListenerForEvents();
      }

      addListenerForEvents() {
        const component = this;

        xtate.addListener('_', () => {
          component.setState(xtate.store);
        });
      }

      render() {
        return (
          // The Store (the global state) and the props the user passes are divided, not mixed like in Redux
          <ChildComponent global={this.state} local={this.props} />
        );
      }
    };
  }

}
