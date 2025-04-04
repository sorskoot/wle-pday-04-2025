import {PrefabsBase} from '@sorskoot/wonderland-components';

export enum TilePrefabs {
    Tile_Grass = 0,
    Tile_Rock,
    Tile_Wood,
}

export class TileSpawner extends PrefabsBase {
    static TypeName = 'tile-spawner';
    static InheritProperties = true;

    get PrefabBinName(): string {
        return 'Tiles.bin';
    }
}
