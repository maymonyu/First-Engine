import {Cluster} from 'src/types';
import {IturimOfPolygon} from './itur-with-polygon';

export class ClusterWithIturim {
    cluster: Cluster;
    iturimWithPolygons: IturimOfPolygon[];

    constructor(cluster: Cluster, iturimWithPolygons: IturimOfPolygon[]) {
        this.cluster = cluster;
        this.iturimWithPolygons = iturimWithPolygons;
    }
}
