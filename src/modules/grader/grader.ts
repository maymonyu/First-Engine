import {Cluster, Constitution} from 'src/types';
import {CrossingResult} from '../cross-checker/types/crossing-result';


export class Grader {
    private constitution: Constitution;

    constructor(constitution: Constitution) {
        this.constitution = constitution;
    }

    gradeUsingConstituition(cluster: Cluster): CrossingResult {
        const key = this.createKey(cluster);
        const value = this.constitution[key];

        // todo validate value

        const result = new CrossingResult(cluster, value.geographicScore, value.essenceScore);

        return result;
    }

    private createKey(cluster: Cluster): string {
        const {clusteringQuality, inBuildingQuality, stayingInterval,
            numberOfBuildings} = cluster;

        return clusteringQuality + ',' + inBuildingQuality + ',' +
            stayingInterval.minTimeinHours + '_to_' + stayingInterval.maxTimeInHours +
            ',' + numberOfBuildings;
    }
}
