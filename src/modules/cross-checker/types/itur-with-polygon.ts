import {Itur} from '../../../types/itur';
import {Coordinate} from '../../../types/coordinate';

export class IturimOfPolygon {
    polygon: Coordinate[];
    iturim: Itur[];

    constructor(polygon: Coordinate[], iturim: Itur[]) {
        this.polygon = polygon;
        this.iturim = iturim;
    }
}
