import {Cluster, Itur} from './types';
import {readClusters, readIturim} from './dataProviders/csv-provider';

const processData = async () => {
  const clusters: Cluster[] = await readClusters();
  const iturim: Itur[] = await readIturim();
};

processData();
