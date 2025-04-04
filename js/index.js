/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 */

/* wle:auto-imports:start */
import {Cursor} from '@wonderlandengine/components';
import {CursorTarget} from '@wonderlandengine/components';
import {MouseLookComponent} from '@wonderlandengine/components';
import {WasdControlsComponent} from '@wonderlandengine/components';
import {BuildingSpawner} from './components/building-spawner.js';
import {GameManager} from './components/game-manager.js';
import {GridGenerator} from './components/grid-generator.js';
import {InteractionManager} from './components/interaction-manager.js';
import {TileSpawner} from './components/tile-spawner.js';
/* wle:auto-imports:end */

export default function(engine) {
/* wle:auto-register:start */
engine.registerComponent(Cursor);
engine.registerComponent(CursorTarget);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(WasdControlsComponent);
engine.registerComponent(BuildingSpawner);
engine.registerComponent(GameManager);
engine.registerComponent(GridGenerator);
engine.registerComponent(InteractionManager);
engine.registerComponent(TileSpawner);
/* wle:auto-register:end */
}
