import { isPointInPolygon } from 'geolib';

import { Cluster, Itur, Coordinate } from 'src/types';

export class CrossChecker {
    crossClusterWithIturim(cluster: Cluster, iturim: Itur[]): Cluster {
        for (const building of cluster.geoBuildings) {
            const relevantIturim = this.getIturimInsidePolygon(iturim, building.coordinates);
            if (!relevantIturim || relevantIturim.length === 0) {
                continue;
            }

            building.iturim = relevantIturim;
            building.score = 1;
        }

        return cluster;
    }

    CrossIdentification(cluster: Cluster): Cluster {
        for (const building of cluster.geoBuildings) {
            const iturim: Itur[] = building.iturim ? building.iturim : [];
            let factor: number = -1;

            if (!iturim.length) { continue; }

            for (const itur of iturim) {
                if (itur.tabuOwner === cluster.identification) {
                    factor = 1
                }
            }
            building.score += factor;
        }
        
        return cluster;
    }

    private getIturimInsidePolygon(iturim: Itur[], polygon: Coordinate[]): Itur[] {
        if (!polygon || polygon.length < 3) {
            console.error(`can't search for iturim inside polygon: ${polygon}`);
            return [];
        }

        return iturim.filter((itur) => isPointInPolygon(itur.location, polygon));
    }
}
