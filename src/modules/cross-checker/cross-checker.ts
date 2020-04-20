import {isPointInPolygon} from 'geolib';

import {IturimOfPolygon, ClusterWithIturim} from './index';
import {Cluster, Itur, Coordinate} from 'src/types';

export class CrossChecker {
    crossClusterWithIturim(cluster: Cluster, iturim: Itur[]): ClusterWithIturim {
        const clusterBuildingsWithIturim: IturimOfPolygon[] = [];
        for (const building of cluster.geoBuildings) {
            const relevantIturim = this.getIturimInsidePolygon(iturim, building.coordinates);
            if (!relevantIturim || relevantIturim.length === 0) {
                continue;
            }
            const buildingWithIturim = new IturimOfPolygon(building.coordinates, relevantIturim);
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
