import {CrossingResult} from '../cross-checker/types/crossing-result';

import {Cluster, Itur, Coordinate, Constitution} from 'src/types';

export class Grader {
    private constitution: Constitution;

    constructor(constitution: Constitution) {
        this.constitution = constitution;
    }

    gradeUsingConstituition(crossingResult: CrossingResult): CrossingResult {
        const constitutionKey = this.createKey(crossingResult);
        const constitutionValue = this.constitution[constitutionKey];

        crossingResult.outputEssenceValue = constitutionValue.essenceScore;
        crossingResult.buildingsAssessmentSummary = constitutionValue.geographicScore;

        return crossingResult;
    }

    private createKey(crossingResult: CrossingResult): string {
        const {clusteringQuality, inBuildingQuality, minStaying,
            maxStaying, numberOfBuildings} = crossingResult.cluster;

        return clusteringQuality + ',' + inBuildingQuality + ','+
        minStaying + '_to_' + maxStaying + ',' + numberOfBuildings;
    }
}
