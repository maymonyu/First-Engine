import {Coordinate, Itur} from './';

export class Building {
    coordinates: Coordinate[];
    score: number;
    iturim?: Itur[];

    constructor(coordinates: Coordinate[]) {
        this.coordinates = coordinates;
        this.score = 0;
    }
}
