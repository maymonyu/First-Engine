import {buildTvirim, buildIturim} from '../../providers';
import {CrossChecker} from '../cross-checker/cross-checker';

export class MainFlow {
    private crossChecker: CrossChecker;

    constructor() {
      this.crossChecker = new CrossChecker();
    }

    public start(): void {
      const clusters = buildTvirim();
      const iturim = buildIturim();

      const clustersWithIturim =
            clusters.map((cluster) => this.crossChecker.crossClusterWithIturim(cluster, iturim));

      console.log(`there are ${clustersWithIturim.length} clusters.`);
      if (clustersWithIturim.length > 0) {
        console.log(`first cluster: ${clustersWithIturim[0].cluster} 
            with iturim: ${clustersWithIturim[0].iturimWithPolygons}`);
      }
    }
}
