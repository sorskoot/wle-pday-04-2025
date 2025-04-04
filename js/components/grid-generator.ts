import {Component, Object3D, Property} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {UserActions} from '../enums/UserActions.js';
import {TilePrefabs, TileSpawner} from './tile-spawner.js';
import {Noise} from '@sorskoot/wonderland-components';

class TileDefinition {
    @property.enum(Object.keys(TilePrefabs).filter((e) => isNaN(Number(e))), TilePrefabs.Tile_Grass)
    tileType: TilePrefabs = TilePrefabs.Tile_Grass;

    /** Scale factor for the noise pattern. Smaller values = larger features. */
    @property.float(10.0)
    noiseScale: number = 10.0;

    /** Offset added to noise coordinates to vary the pattern. */
    @property.float(0.0)
    noiseOffset: number = 0.0;

    /** Value above which this tile type will be generated. */
    @property.float(0.5)
    noiseThreshold: number = 0.5;
}

type TileState = {};

export class GridGenerator extends Component {
    static TypeName = 'grid-generator';

    private static _instance: GridGenerator;
    static get instance(): GridGenerator {
        if (!GridGenerator._instance) {
            throw new Error('GridGenerator instance not available. Ensure it is initialized.');
        }
        return GridGenerator._instance;
    }

    @property.vector2(16, 16)
    gridSize: number[] = [16, 16];

    @property.array(Property.record(TileDefinition))
    tileDefinitions: TileDefinition[] = [];

    @property.object({required: true})
    gridParent!: Object3D;

    private _grid: Map<string, TileState> = new Map();

    public userAction: UserActions = UserActions.Inspect;

    public init(): void {
        if (GridGenerator._instance && GridGenerator._instance !== this) {
            console.error('GridGenerator: Attempting to initialize multiple instances. Destroying duplicate.');
            this.destroy();
            return;
        }
        GridGenerator._instance = this;
    }

    public start(): void {
        if (!this.gridParent) {
            throw new Error('GridGenerator: gridParent property is not set.');
        }
        setTimeout(() => {
            this.restart();
        }, 1000);
    }

    private _createGrid(): void {
        this._grid.clear();

        while (this.gridParent.children.length > 0) {
            this.gridParent.children[0].destroy();
        }

        for (let y = 0; y < this.gridSize[1]; y++) {
            for (let x = 0; x < this.gridSize[0]; x++) {
                let objectToSpawn: string = TilePrefabs[TilePrefabs.Tile_Grass];

                for (const definition of this.tileDefinitions) {
                    const noiseValue = Noise.simplex2(
                        x / definition.noiseScale + definition.noiseOffset,
                        y / definition.noiseScale + definition.noiseOffset
                    );

                    if (noiseValue > definition.noiseThreshold) {
                        objectToSpawn = TilePrefabs[definition.tileType];
                    }
                }

                const tile = TileSpawner.instance.spawn(objectToSpawn, this.gridParent);
                const posX = x - this.gridSize[0] / 2 + 0.5;
                const posZ = y - this.gridSize[1] / 2 + 0.5;
                tile.setPositionWorld([posX, 0, posZ]);
            }
        }
    }

    public onTileClick(key: string, auto: boolean = false): void {}

    public restart(): void {
        this._createGrid();
        this.userAction = UserActions.Inspect;
    }

    public onDestroy(): void {
        if (GridGenerator._instance === this) {
            GridGenerator._instance = null;
        }
    }
}
