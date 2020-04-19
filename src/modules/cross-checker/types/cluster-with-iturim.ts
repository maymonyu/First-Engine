import {Cluster} from '../../../types/cluster';
import {IturimOfPolygon} from './itur-with-polygon';

export class ClusterWithIturim {
    cluster: Cluster;
    iturimWithPolygons: IturimOfPolygon[];

    constructor(cluster: Cluster, iturimWithPolygons) {
      this.cluster = cluster;
      this.iturimWithPolygons = iturimWithPolygons;
    }
}
