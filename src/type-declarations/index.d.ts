import { Component } from 'react';

export = Xtate;

declare class Xtate {
    constructor(initialState: any, logChanges?: boolean);

    connect(ComponentToConnect: Component): Component;
}