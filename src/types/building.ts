import {Coordinate, Itur} from './';

export class Building {
    coordinates: Coordinate[];
    iturim?: Itur[];
    score: number;

    constructor(coordinates: Coordinate[]) {
        this.coordinates = coordinates;
        this.score = 0;
    }
}
