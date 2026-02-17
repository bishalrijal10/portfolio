/// <reference types="vite/client" />

declare module 'maath/random/dist/maath-random.esm' {
    export function inSphere(buffer: Float32Array, options?: { radius?: number }): Float32Array;
    export function inBox(buffer: Float32Array, options?: { sides?: [number, number, number] }): Float32Array;
}
