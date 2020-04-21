import {Cluster} from 'src/types';

export interface CrossingResult {
    cluster: Cluster;
    buildingsAssessmentSummary: number;
    contextToProfession: boolean;
    outputEssenceValue: number;
}
