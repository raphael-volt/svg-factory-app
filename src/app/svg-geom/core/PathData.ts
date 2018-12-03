import { PathDataBase } from './PathDataBase';
import { EventEmitter } from '@angular/core';

export class PathData implements PathDataBase {
    changed: EventEmitter<boolean> = new EventEmitter<boolean>()
    id: string
    view_box: string
    path: string
    path_length: number
    id_product: string
    length_ratio: string
    constructor() { }
}