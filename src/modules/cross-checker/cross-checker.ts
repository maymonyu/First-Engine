import {isPointInPolygon} from 'geolib';

import {Cluster} from '../../types/cluster';
import {Itur} from '../../types/itur';
import {Coordinate} from '../../types/coordinate';
import {IturimOfPolygon} from './types/itur-with-polygon';
import {ClusterWithIturim} from './types/cluster-with-iturim';


export class CrossChecker {
  crossClusterWithIturim(cluster: Cluster, iturim: Itur[]): ClusterWithIturim {
    const clusterBuildingsWithIturim: IturimOfPolygon[] = [];
    for (const building of cluster.geoBuildings) {
      const relevantIturim = this.getIturimInsidePolygon(iturim, building);
      const buildingWithIturim = new IturimOfPolygon(building, relevantIturim);
      clusterBuildingsWithIturim.push(buildingWithIturim);
    }
    return new ClusterWithIturim(cluster, clusterBuildingsWithIturim);
  }

  private getIturimInsidePolygon(iturim: Itur[], polygon: Coordinate[]): Itur[] {
    if (!polygon || polygon.length < 3) {
      console.error(`can't search for iturim inside polygon: ${polygon}`);
      return [];
    }

    return iturim.filter((itur) => isPointInPolygon(itur.location, polygon));
  }
}
