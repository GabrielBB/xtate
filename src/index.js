import React from 'react';
import { EventEmitter } from 'fbemitter';

function updateStore(functionName, newState) {
  if (this.store !== newState) {
    this.store = newState;
    this.emit('_');

    // With this im going to try to travel in time with a future dev tools
    // it will probably require immutability like Redux does
    if (this.logChanges) {
      console.log(functionName + ' action changed store to: ');
      console.log(newState);
    }
  } else {
    console.log(functionName + ' tried to mutate the store. Ignoring change because immutability is required');
  }

};

async function dispatch(actionReducer, payload) {
  const result = await actionReducer(this.store, payload);

  updateStore.apply(this, [actionReducer.name, result]);

};

export default class Xtate extends EventEmitter {
  constructor(initialState = {}, logChanges = false) {
    super();
    this.store = initialState;
    this.logChanges = logChanges;
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
          <ChildComponent store={this.state} {...this.props}
            dispatch={dispatch.bind(xtate)} />
        );
      }
    };
  }
}
