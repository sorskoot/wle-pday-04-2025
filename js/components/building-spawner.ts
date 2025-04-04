import {PrefabsBase} from '@sorskoot/wonderland-components';

export class BuildingSpawner extends PrefabsBase {
    static TypeName = 'building-spawner';
    static InheritProperties = true;

    get PrefabBinName(): string {
        return 'Buildings.bin';
    }
}
