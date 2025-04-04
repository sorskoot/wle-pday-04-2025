/* /!\ This file is auto-generated. */

import {Font, Material, MaterialConstructor, NumberArray, Texture} from '@wonderlandengine/api';

export interface FlatOpaque extends Material {
    getColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColor(value: NumberArray): void;
}
export interface MeshVisualizer extends Material {
    getColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColor(value: NumberArray): void;
    getWireframeColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setWireframeColor(value: NumberArray): void;
}
export interface PhongOpaque extends Material {
    getAmbientColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setAmbientColor(value: NumberArray): void;
    getDiffuseColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setDiffuseColor(value: NumberArray): void;
    getSpecularColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setSpecularColor(value: NumberArray): void;
    getEmissiveColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setEmissiveColor(value: NumberArray): void;
    getFogColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setFogColor(value: NumberArray): void;
    getShininess(): number;
    setShininess(value: number): void;
}
export interface PhongOpaqueTextured extends Material {
    getAmbientColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setAmbientColor(value: NumberArray): void;
    getDiffuseColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setDiffuseColor(value: NumberArray): void;
    getSpecularColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setSpecularColor(value: NumberArray): void;
    getEmissiveColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setEmissiveColor(value: NumberArray): void;
    getFogColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setFogColor(value: NumberArray): void;
    getDiffuseTexture(): Texture | null;
    setDiffuseTexture(value: Texture | null | undefined): void;
    getEmissiveTexture(): Texture | null;
    setEmissiveTexture(value: Texture | null | undefined): void;
    getShininess(): number;
    setShininess(value: number): void;
}
export interface PhysicalOpaque extends Material {
    getAlbedoColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setAlbedoColor(value: NumberArray): void;
    getMetallicFactor(): number;
    setMetallicFactor(value: number): void;
    getRoughnessFactor(): number;
    setRoughnessFactor(value: number): void;
}
export interface PhysicalOpaqueTextured extends Material {
    getAlbedoColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setAlbedoColor(value: NumberArray): void;
    getMetallicFactor(): number;
    setMetallicFactor(value: number): void;
    getRoughnessFactor(): number;
    setRoughnessFactor(value: number): void;
    getAlbedoTexture(): Texture | null;
    setAlbedoTexture(value: Texture | null | undefined): void;
    getRoughnessMetallicTexture(): Texture | null;
    setRoughnessMetallicTexture(value: Texture | null | undefined): void;
}
export interface Text extends Material {
    getColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColor(value: NumberArray): void;
    getEffectColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setEffectColor(value: NumberArray): void;
    getFont(): Font | null;
    setFont(value: Font | null | undefined): void;
}
export interface Sky extends Material {
    getColorStop3<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColorStop3(value: NumberArray): void;
    getColorStop2<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColorStop2(value: NumberArray): void;
    getColorStop1<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColorStop1(value: NumberArray): void;
    getColorStop0<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColorStop0(value: NumberArray): void;
}
export interface FlatOpaqueAlpha extends Material {
    getColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColor(value: NumberArray): void;
}
export interface Never extends Material {
    getColor<T extends NumberArray | undefined = undefined>(value?: T): T extends undefined ? Float32Array : T;
    setColor(value: NumberArray): void;
}

declare module '@wonderlandengine/api' {
    interface MaterialManager {
        getTemplate(pipeline: 'Flat Opaque'): MaterialConstructor<FlatOpaque>;
        getTemplate(pipeline: 'MeshVisualizer'): MaterialConstructor<MeshVisualizer>;
        getTemplate(pipeline: 'Phong Opaque'): MaterialConstructor<PhongOpaque>;
        getTemplate(pipeline: 'Phong Opaque Textured'): MaterialConstructor<PhongOpaqueTextured>;
        getTemplate(pipeline: 'Physical Opaque'): MaterialConstructor<PhysicalOpaque>;
        getTemplate(pipeline: 'Physical Opaque Textured'): MaterialConstructor<PhysicalOpaqueTextured>;
        getTemplate(pipeline: 'Text'): MaterialConstructor<Text>;
        getTemplate(pipeline: 'Sky'): MaterialConstructor<Sky>;
        getTemplate(pipeline: 'Flat Opaque Alpha'): MaterialConstructor<FlatOpaqueAlpha>;
        getTemplate(pipeline: 'Never'): MaterialConstructor<Never>;
    }
}
