import { FixedNumbers } from "../core/public_api";

export type Coord = FixedNumbers<2>

export const cloneCoord = (cord: Coord): Coord => {
    return cord.slice() as Coord
}