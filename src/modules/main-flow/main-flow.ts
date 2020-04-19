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
    }
}
