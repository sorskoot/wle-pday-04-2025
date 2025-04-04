import {Signal} from '../utils/Signal.js';

export class GlobalEvents {
    private static _instance: GlobalEvents;

    interaction = new Signal<[string, Float32Array<ArrayBuffer>]>();
    placeBuilding = new Signal<[number, Float32Array<ArrayBuffer>, number]>();
    onKeyPress = new Signal<[string]>();

    static get instance(): GlobalEvents {
        if (!GlobalEvents._instance) {
            GlobalEvents._instance = new GlobalEvents();
        }
        return GlobalEvents._instance;
    }

    private constructor() {}
}
