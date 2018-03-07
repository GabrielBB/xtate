export = Xtate;

declare class Xtate  {
    constructor(initialState: any, logChanges?: boolean);

    connect(ComponentToBeConnected: React.Component): React.Component;
}