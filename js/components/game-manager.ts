import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {Signal} from '../utils/Signal.js';
import {GlobalEvents} from '../classes/globalEvents.js';
import {BuildingPlacing} from '../classes/BuildingPlacing.js';
import {BuildingSpawner} from './building-spawner.js';
import {KeyboardLogic} from '../classes/KeyboardLogic.js';

export class GameManager extends Component {
    static TypeName = 'game-manager';

    // Singleton
    private static _instance: GameManager;
    private _buildingPlacing: BuildingPlacing;
    private _keyboardLogic: KeyboardLogic;
    static get instance(): GameManager {
        return GameManager._instance;
    }

    init() {
        if (GameManager._instance) {
            console.error('There can only be one instance of GameManager Component');
        }
        GameManager._instance = this;
    }

    start() {
        this._buildingPlacing = new BuildingPlacing();
        this._keyboardLogic = new KeyboardLogic();
    }

    update(dt: number) {}

    onDestroy(): void {
        this._keyboardLogic.destroy();
    }
}
