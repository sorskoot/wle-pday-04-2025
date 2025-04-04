import {wlUtils} from '@sorskoot/wonderland-components';
import {Component, Object3D, PhysXComponent} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {Cursor, CursorTarget} from '@wonderlandengine/components';

const tempVec = new Float32Array(3);

export class InteractionManager extends Component {
    static TypeName = 'interaction-manager';

    @property.object({required: true})
    highLight!: Object3D;

    // Singleton
    private static _instance: InteractionManager;
    static get instance(): InteractionManager {
        return InteractionManager._instance;
    }

    init() {
        if (InteractionManager._instance) {
            console.error('There can only be one instance of InteractionManager Component');
        }
        InteractionManager._instance = this;
    }

    onActivate(): void {
        const p = this.object.getComponent(CursorTarget);
        this._hovering = false;
        wlUtils.setActive(this.highLight, false);
        p.onClick.add(this._click);
        p.onMove.add(this._move);
        p.onHover.add(this._hover);
        p.onUnhover.add(this._unhover);
    }

    onDeactivate(): void {
        const p = this.object.getComponent(CursorTarget);
        p.onClick.remove(this._click);
        p.onMove.remove(this._move);
        p.onHover.remove(this._hover);
        p.onUnhover.remove(this._unhover);
        this._hovering = false;
    }
    private _hovering = false;

    private _click = (o, cursor: Cursor, e) => {};
    private _move = (o, cursor: Cursor, e) => {
        if (!this._hovering) {
            return;
        }
        cursor.cursorObject.getPositionWorld(tempVec);
        tempVec[0] = Math.floor(tempVec[0]) + 0.5;
        tempVec[2] = Math.floor(tempVec[2]) + 0.5;
        this.highLight.setPositionWorld(tempVec);
    };

    private _hover = (o, cursor: Cursor, e) => {
        if (!this._hovering) {
            this._hovering = true;
            wlUtils.setActive(this.highLight, true);
        }
    };
    private _unhover = (o, cursor: Cursor, e) => {
        if (this._hovering) {
            this._hovering = false;
            wlUtils.setActive(this.highLight, false);
        }
    };
}
