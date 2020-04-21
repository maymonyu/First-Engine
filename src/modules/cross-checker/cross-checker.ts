import {isPointInPolygon} from 'geolib';

import {Cluster, Itur, Point} from 'src/types';

export function crossClusterWithIturim(cluster: Cluster, iturim: Itur[]): Cluster {
    for (const building of cluster.geoBuildings) {
        const relevantIturim = getIturimInsidePolygon(iturim, building.polygon);
        if (!relevantIturim || relevantIturim.length === 0) {
            continue;
        }

        building.iturim = relevantIturim;
        building.score = 1;
    }

    return cluster;
}

function getIturimInsidePolygon(iturim: Itur[], polygon: Point[]): Itur[] {
    if (!polygon || polygon.length < 3) {
        console.error(`can't search for iturim inside polygon: ${polygon}`);
        return [];
    }

    return iturim.filter((itur) => isPointInPolygon(itur.location, polygon));
}
