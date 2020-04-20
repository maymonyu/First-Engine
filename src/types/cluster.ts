import {Building} from './';

export interface Cluster {
    id: string;
    clusteringQuality: string;
    identification: string;
    minStaying: number;
    maxStaying?: number;
    profession: string;
    numberOfBuildings: number;
    geoBuildings: Building[];
}
