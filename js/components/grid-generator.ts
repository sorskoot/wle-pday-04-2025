import {Component, Object3D, Property} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {UserActions} from '../enums/UserActions.js';
import {TilePrefabs, TileSpawner} from './tile-spawner.js';
import {Noise} from '@sorskoot/wonderland-components';
import {BuildingSpawner} from './building-spawner.js';
import {GlobalEvents} from '../classes/globalEvents.js';
import {quat, vec3} from 'gl-matrix';

const tempQuat = quat.create();
const tempVec3 = vec3.create();

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

type TileState = {
    type: string;
};

type BuildingState = {
    type: string;
    rotation: number;
};

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
    private _states: Map<string, BuildingState> = new Map();

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
        TileSpawner.instance.onPrefabsLoaded.add(() => {
            console.log('TileSpawner: Prefabs loaded. Creating grid.');
            console.log(TileSpawner.instance.prefabs.children.length, 'prefabs loaded.');
        });
        BuildingSpawner.instance.onPrefabsLoaded.add(() => {
            console.log('BuildingSpawner: Prefabs loaded. Creating grid.');
            console.log(BuildingSpawner.instance.prefabs.children.length, 'prefabs loaded.');
        });
        setTimeout(() => {
            this.restart();
        }, 2000);

        GlobalEvents.instance.placeBuilding.add(this._onPlaceBuilding, this);
    }

    private _createGrid(): void {
        this._grid.clear();
        if (!TileSpawner.instance.prefabs) {
            console.error('TileSpawner: Prefabs not initialized. Cannot create grid.');
            return;
        }
        // while (this.gridParent.children.length > 0) {
        //     this.gridParent.children[0].destroy();
        // }

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

                // Store the tile state in the grid map
                vec3.set(tempVec3, posX, 0, posZ);
                vec3.round(tempVec3, tempVec3);
                const positionKey = `${tempVec3[0]},${tempVec3[1]},${tempVec3[2]}`;
                const newState: TileState = {type: objectToSpawn};
                this._grid.set(positionKey, newState);
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

    private _onPlaceBuilding = (number: number, position: Float32Array, rotation: number): void => {
        vec3.round(tempVec3, position);
        const positionKey = `${tempVec3[0]},${tempVec3[1]},${tempVec3[2]}`;

        if (!this.canPlace(position)) {
            console.log(`GridGenerator: Position ${positionKey} is already occupied.`);
            return;
        }

        let buildingType: string;
        switch (number) {
            case 0:
                buildingType = 'Building_Gatherer';
                break;
            case 1:
                buildingType = 'Building_Belt';
                break;
            default:
                console.error('Invalid building type:', number);
                return;
        }

        const newState: BuildingState = {
            type: buildingType,
            rotation: rotation,
        };
        this._states.set(positionKey, newState);
        console.log(`GridGenerator: Placed ${buildingType} at ${positionKey}`);

        const buildingObject = BuildingSpawner.instance.spawn(buildingType);
        buildingObject.getRotationWorld(tempQuat);
        quat.rotateY(tempQuat, tempQuat, (rotation * Math.PI) / 180);
        buildingObject.setPositionWorld(position);
        buildingObject.setRotationWorld(tempQuat);
    };

    public canPlace(position: Float32Array): boolean {
        // Generate the key from the position, rounding it first
        vec3.round(tempVec3, position);
        const positionKey = `${tempVec3[0]},${tempVec3[1]},${tempVec3[2]}`;

        // 1. Check if a building already exists at this position
        if (this._states.has(positionKey)) {
            return false; // Cannot place if a building is already there
        }

        // 2. Check if the ground tile is grass
        const tileState = this._grid.get(positionKey);
        if (!tileState || tileState.type !== TilePrefabs[TilePrefabs.Tile_Grass]) {
            return false; // Cannot place if the tile isn't grass or doesn't exist
        }

        // If both checks pass, placement is allowed
        return true;
    }
}
