import {readClusters, readIturim} from '../data-providers';
import {CrossChecker} from '../cross-checker';

export class MainFlow {
    private crossChecker: CrossChecker;

    constructor() {
        this.crossChecker = new CrossChecker();
    }

    public async start(): Promise<void> {
        const clusters = await readClusters();
        const iturim = await readIturim();

        const clustersWithIturim =
            clusters.map((cluster) => this.crossChecker.crossClusterWithIturim(cluster, iturim));

        console.log(`there are ${clustersWithIturim.length} clusters.`);
        if (clustersWithIturim.length > 0) {
            console.log(`first cluster: ${clustersWithIturim[0]} 
            with first building's iturim: ${clustersWithIturim[0].geoBuildings[0].iturim}
            and first building score ${clustersWithIturim[0].geoBuildings[0].score}`);
        }
    }
}
