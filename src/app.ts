import {Cluster, Itur, Constitution} from './types';
import {readClusters, readIturim, readConstitution} from './dataProviders/csvProvider';

const readData = async (): Promise<void> => {
  const clusters: Cluster[] = await readClusters();
  const iturim: Itur[] = await readIturim();
  const constitution: Constitution = await readConstitution();
};

readData();
