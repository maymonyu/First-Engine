import {Coordinate} from './coordinate';

export interface Cluster {
    ID: string;
    hatzvaraQuality: string;
    identification: string;
    staying: number;
    profession: string;
    numberOfBuildings: number;
    geoBuildings: Coordinate[];
}
