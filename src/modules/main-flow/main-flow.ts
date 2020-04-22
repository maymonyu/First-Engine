import {readClusters, readIturim, readConstitution} from '../data-providers';
import {Grader} from '../grader';
import * as crossChecker from '../cross-checker';

export async function start(): Promise<void> {
    const constitution = await readConstitution();
    const clusters = await readClusters();
    const iturim = await readIturim();

    const clustersWithIturim =
            clusters.map((cluster) => crossChecker.crossClusterWithIturim(cluster, iturim));

    const grader = new Grader(constitution);

    const results = clustersWithIturim.map((cluster) => grader.gradeUsingConstituition(cluster));

    console.log(`there are ${results.length} results.`);
    if (results.length > 0) {
        console.log(`first result: ${results[0]} 
            with cluster id: ${results[0].cluster.id}
            with outputGeoValue ${results[0].outputGeoValue}
            with outputEssenceValue ${results[0].outputEssenceValue}`);
    }
}
