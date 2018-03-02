import React from 'react';
import { EventEmitter } from 'fbemitter';

export class Xtate extends EventEmitter {
    constructor(initialState = {}, logChanges = false) {
        super();
        this.store = initialState;
        this.logChanges = logChanges;
    }

    action = (event, reducer) => {

        super.addListener(event, payload => {
            this.store = reducer(this.store, payload)

            // With this im going to try to travel in time with a future dev tools
            // it will probably require immutability like Redux does, but for now the user can see the changes in the console
            if (this.logChanges) console.log(event + ' event changed store to: ' + this.store)
            super.emit('update' + event)

        });

    }

    dispatch = (event, payload) => {
        super.emit(event, payload)
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
                        component.setState(reactEmitter.store)
                    });
                })
            }

            render() {
                return (
                    // The Store (the global state) and the props the user passes are divided, not mixed like in Redux
                    <ChildComponent global={this.state} local={this.props} />
                );
            }
        }
    }

}