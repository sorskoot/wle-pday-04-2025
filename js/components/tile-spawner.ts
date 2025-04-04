import {wlUtils} from '@sorskoot/wonderland-components';
import {Component, Object3D, RetainEmitter} from '@wonderlandengine/api';

export enum TilePrefabs {
    Tile_Grass = 0,
    Tile_Rock,
    Tile_Wood,
}

export class TileSpawner extends Component {
    static TypeName = 'tile-spawner';
    static InheritProperties = true;

    private static _instance: TileSpawner;
    static get instance(): TileSpawner {
        return TileSpawner._instance;
    }

    get PrefabBinName(): string {
        return 'Tiles.bin';
    }

    /**
     * Reference to the root object containing all prefabs
     */
    private _prefabs!: Object3D;

    /**
     * Gets the root object containing all prefabs
     */
    get prefabs(): Object3D {
        return this._prefabs;
    }

    /**
     * Event emitter that notifies when prefabs are loaded
     */
    public onPrefabsLoaded = new RetainEmitter<[Object3D]>();

    private _isLoaded = false;

    /**
     * Gets whether the prefabs have been loaded
     */
    get isLoaded(): boolean {
        return this._isLoaded;
    }

    init() {
        if (TileSpawner._instance) {
            console.error('There can only be one instance of TileSpawner Component');
        }
        TileSpawner._instance = this;
    }

    /**
     * Loads the prefabs bin file and initializes the prefabs
     */
    async start(): Promise<void> {
        const prefabData = await this.engine.loadPrefab(this.PrefabBinName);
        const result = this.engine.scene.instantiate(prefabData);

        this._prefabs = result.root;
        this._prefabs.parent = this.object;

        wlUtils.setActive(this._prefabs, false);
        this._isLoaded = true;
        setTimeout(() => this.onPrefabsLoaded.notify(this._prefabs), 0);
    }

    /**
     * Spawns an object with the given name
     * @param name Name of the prefab to spawn
     * @param parent Optional parent object of the spawned object
     * @param startActive Optional boolean to set the active state of the spawned object; default is true
     * @returns The spawned object or null if spawn failed
     */
    spawn(name: string, parent: Object3D | null = null, startActive = true): Object3D | null {
        if (!this._prefabs) {
            console.warn(`Spawning Failed. Prefabs not loaded`);
            return null;
        }

        const prefab = this._prefabs.findByName(name)[0];

        if (!prefab) {
            console.warn(`Spawning Failed. Prefab with name ${name} not found`);
            return null;
        }

        const clonedPrefab = prefab.clone(parent);

        if (startActive) {
            wlUtils.setActive(clonedPrefab, true);
        }

        clonedPrefab.resetPositionRotation();
        return clonedPrefab;
    }
}
