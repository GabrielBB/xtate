import { Component } from 'react';

export class StoreProvider extends Component {
    constructor(store: any, logChanges?: boolean);
}

export function Connect(ComponentToConnect: Component): Component;