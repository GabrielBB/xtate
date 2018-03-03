import React from 'react';
import { EventEmitter } from 'fbemitter';

export class Xtate extends EventEmitter {
  constructor(initialState = {}, logChanges = false) {
    super();
    this.store = initialState;
    this.logChanges = logChanges;
  }

  updateStore = (event, newState) => {
    this.store = newState;
    super.emit('update' + event);

    // With this im going to try to travel in time with a future dev tools
    // it will probably require immutability like Redux does
    if (this.logChanges) {
      console.log(event + ' event changed store to: ');
      console.log(newState);
    }
  }

  actionAsync = (event, reducer) => {
    super.addListener(event, async (payload) => {
      const result = await reducer(this.store, payload);

      this.updateStore(event, result);

    });
  }

  action = (event, reducer) => {
    super.addListener(event, (payload) => {
      const result = reducer(this.store, payload);

      this.updateStore(event, result);

    });
  }

  dispatch = (event, payload) => {
    super.emit(event, payload);
  }

  connect = (ChildComponent, ...events) => {
    const reactEmitter = this;

    return class extends React.Component {

      constructor() {
        super();

        this.state = reactEmitter.store;

        this.addListenerForEvents();
      }

      addListenerForEvents() {
        const component = this;

        events.forEach(e => {
          reactEmitter.addListener('update' + e, () => {
            component.setState(reactEmitter.store);
          });
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
