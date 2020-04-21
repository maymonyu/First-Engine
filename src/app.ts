import {Cluster, Itur, Constitution} from './types';
import {readClusters, readIturim, readConstitution} from './dataProviders/csvProvider';

const readData = async () => {
  const clusters: Cluster[] = await readClusters();
  const iturim: Itur[] = await readIturim();
  const constitution: Constitution = await readConstitution();
};

readData();
