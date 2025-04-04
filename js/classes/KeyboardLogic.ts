import {GlobalEvents} from './globalEvents.js';

export class KeyboardLogic {
    constructor() {
        this._initKeyPressListener();
    }

    private _initKeyPressListener() {
        window.addEventListener('keydown', this._onKeyPress.bind(this));
    }

    private _onKeyPress(event: KeyboardEvent) {
        GlobalEvents.instance.onKeyPress.dispatch(event.key);
    }

    destroy() {
        window.removeEventListener('keydown', this._onKeyPress.bind(this));
    }
}
