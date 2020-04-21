import {isPointInPolygon} from 'geolib';

import {Cluster, Itur, Coordinate, Building} from 'src/types';

export class CrossChecker {
    crossClusterWithIturim(cluster: Cluster, iturim: Itur[]): Cluster {
        for (const building of cluster.geoBuildings) {
            const relevantIturim = this.getIturimInsidePolygon(iturim, building.coordinates);
            if (!relevantIturim || relevantIturim.length === 0) {
                continue;
            }

            building.iturim = relevantIturim;
            building.score = 1;

            building.score += this.getCrossIdentificationFactor(cluster.identification, building);
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

    private getCrossIdentificationFactor(clusterIdentification: string, building: Building): number {
        const iturim = building.iturim;
        if (!iturim || iturim.length == 0) {
            return 0;
        }

        const crossFound = iturim.some((itur) => itur.tabuOwner === clusterIdentification);
        const factor = crossFound ? 1 : -1;
        return factor;
    }
}
