import {Cluster} from 'src/types';

export interface CrossingResult {
    cluster: Cluster;
    buildingsAssessmentSummary: string;
    contextToProfession: boolean;
    outputEssenceValue: string;
}
