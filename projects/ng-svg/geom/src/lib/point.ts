import { FixedNumbers } from "@ng-svg/core";

export type Coord = FixedNumbers<2>

export const cloneCoord = (cord: Coord): Coord => {
    return cord.slice() as Coord
}