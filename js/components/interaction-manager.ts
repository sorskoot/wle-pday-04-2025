import {wlUtils} from '@sorskoot/wonderland-components';
import {Component, MeshComponent, Object3D, PhysXComponent} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {Cursor, CursorTarget} from '@wonderlandengine/components';
import {GameManager} from './game-manager.js';
import {GlobalEvents} from '../classes/globalEvents.js';
import {GridGenerator} from './grid-generator.js';
import {FlatOpaque} from '../materials.js';

const tempVec = new Float32Array(3);

export class InteractionManager extends Component {
    static TypeName = 'interaction-manager';

    @property.object({required: true})
    highLight!: Object3D;

    @property.color(1.0, 1.0, 1.0, 1.0)
    allowed = [1.0, 1.0, 1.0, 1.0];

    @property.color(1.0, 0.0, 0.0, 1.0)
    notAllowed = [1.0, 0.0, 0.0, 1.0];

    // Singleton
    private static _instance: InteractionManager;
    static get instance(): InteractionManager {
        return InteractionManager._instance;
    }

    // Store the material for quicker access
    private _highlightMaterial: FlatOpaque | null = null;
    // Store the current placement state
    private _isCurrentlyAllowed: boolean | null = null;

    init() {
        if (InteractionManager._instance) {
            console.error('There can only be one instance of InteractionManager Component');
        }
        InteractionManager._instance = this;

        const meshComp = this.highLight.findByNameRecursive('Box')?.[0]?.getComponent(MeshComponent);
        if (meshComp) {
            this._highlightMaterial = meshComp.material as FlatOpaque;
        } else {
            console.error('InteractionManager: Could not find MeshComponent on highlight object Box child.');
        }
    }

    onActivate(): void {
        const p = this.object.getComponent(CursorTarget);
        this._hovering = false;
        wlUtils.setActive(this.highLight, false);
        p.onClick.add(this._click);
        p.onMove.add(this._move);
        p.onHover.add(this._hover);
        p.onUnhover.add(this._unhover);
        this._isCurrentlyAllowed = null; // Reset state on activate
    }

    onDeactivate(): void {
        const p = this.object.getComponent(CursorTarget);
        p.onClick.remove(this._click);
        p.onMove.remove(this._move);
        p.onHover.remove(this._hover);
        p.onUnhover.remove(this._unhover);
        this._hovering = false;

        this._showMouse();
        this._isCurrentlyAllowed = null; // Reset state on deactivate
    }

    private _hovering = false;

    private _click = (o, cursor: Cursor, e) => {
        this._roundPositionToTile(cursor);
        GlobalEvents.instance.interaction.dispatch('click', tempVec);
    };

    private _move = (o, cursor: Cursor, e) => {
        if (!this._hovering || !this._highlightMaterial) {
            return;
        }

        this._roundPositionToTile(cursor);
        const canPlace = GridGenerator.instance.canPlace(tempVec);

        // Only update color if the state changed
        if (canPlace !== this._isCurrentlyAllowed) {
            this._highlightMaterial.setColor(canPlace ? this.allowed : this.notAllowed);
            this._isCurrentlyAllowed = canPlace;
        }

        this.highLight.setPositionWorld(tempVec);
    };

    private _hover = (o, cursor: Cursor, e) => {
        if (!this._hovering && this._highlightMaterial) {
            this._hovering = true;
            wlUtils.setActive(this.highLight, true);
            this._hideMouse();

            // Set initial color and state based on hover position
            this._roundPositionToTile(cursor);
            const canPlace = GridGenerator.instance.canPlace(tempVec);
            this._highlightMaterial.setColor(canPlace ? this.allowed : this.notAllowed);
            this._isCurrentlyAllowed = canPlace;
            this.highLight.setPositionWorld(tempVec); // Also set initial position
        }
    };

    private _unhover = (o, cursor: Cursor, e) => {
        if (this._hovering) {
            this._hovering = false;
            this._showMouse();
            wlUtils.setActive(this.highLight, false);
            this._isCurrentlyAllowed = null; // Reset state when not hovering
        }
    };

    private _roundPositionToTile(cursor: Cursor) {
        cursor.cursorObject.getPositionWorld(tempVec);
        tempVec[0] = Math.floor(tempVec[0]) + 0.5;
        tempVec[1] = 0;
        tempVec[2] = Math.floor(tempVec[2]) + 0.5;
    }

    private _hideMouse() {
        this.engine.canvas.style.cursor = 'none';
    }
    private _showMouse() {
        this.engine.canvas.style.cursor = 'auto';
    }
}
