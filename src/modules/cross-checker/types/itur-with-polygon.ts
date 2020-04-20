import {Itur, Coordinate} from 'src/types';

export class IturimOfPolygon {
    polygon: Coordinate[];
    iturim: Itur[];

    constructor(polygon: Coordinate[], iturim: Itur[]) {
        this.polygon = polygon;
        this.iturim = iturim;
    }
}
