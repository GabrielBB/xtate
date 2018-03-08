import { EventEmitter } from 'fbemitter';

export default class StateEmitter extends EventEmitter {
  constructor(initialState = {}, logChanges = false) {
    super();
    this.store = initialState;
    this.logChanges = logChanges;

    if (logChanges) {
      console.log('Xtate logging is activated')
    }
  }

  updateStore = (functionName, newState) => {
    if (this.store !== newState) {
      this.store = newState;
      this.emit('_');

      if (this.logChanges) {
        console.log(functionName + ' action changed store to: ');
        console.log(newState);
      }
    } else {
      console.error(functionName + ' tried to mutate the store. Ignoring change because immutability is required');
    }

  };

  dispatch = async (actionReducer, payload) => {
    const result = await actionReducer(this.store, payload);

    updateStore(actionReducer.name, result);

  };
}