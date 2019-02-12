export type Coord = [number, number]

export const cloneCoord = (cord: Coord): Coord => {
    return cord.slice() as Coord
}