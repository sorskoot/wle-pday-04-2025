import {NumberArray} from '@wonderlandengine/api';
import {GlobalEvents} from './globalEvents.js';

export class BuildingPlacing {
    private _rotationY: number = 0; // Store rotation around Y-axis in degrees
    private _currentBuilding: number = 0;

    constructor() {
        GlobalEvents.instance.interaction.add(this._onInteraction, this);
        GlobalEvents.instance.onKeyPress.add(this._onKeyPress, this);
    }

    /**
     * Rotates the building preview clockwise around the Y-axis.
     * @param degrees - The amount to rotate in degrees.
     */
    public rotateBuilding(degrees: number): void {
        this._rotationY = (this._rotationY + degrees) % 360;
    }

    private _onInteraction = (event: string, position: Float32Array<ArrayBuffer>) => {
        // Pass the current rotation when placing the building
        // Assuming placeBuilding signature is updated to:
        // dispatch(buildingType: number, position: NumberArray, rotationY: number)
        if (GlobalEvents.instance.placeBuilding.dispatch(this._currentBuilding, position, this._rotationY)) {
            console.log(`Building placed at: ${position}, rotation: ${this._rotationY}`);
            // Reset rotation after placing? Depends on desired behavior.
            // this._rotationY = 0;
        }
    };

    private _onKeyPress = (key: string) => {
        if (key === 'r') {
            this.rotateBuilding(90); // Rotate 90 degrees on pressing 'r'
        }
        if (key === '1') {
            this._currentBuilding = 0;
        }
        if (key === '2') {
            this._currentBuilding = 1;
        }
    };
}
