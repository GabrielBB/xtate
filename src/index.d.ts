import { EventEmitter } from "events";

export = Xtate;

declare class Xtate extends EventEmitter {
    constructor(initialState: any, logChanges?: boolean);

    connect(ComponentToBeConnected: React.Component): React.Component;
}