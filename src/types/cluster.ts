import {Building} from './';

export interface Cluster {
    ID: string;
    hatzvaraQuality: string;
    identification: string;
    staying: number;
    profession: string;
    numberOfBuildings: number;
    geoBuildings: Building[];
}
