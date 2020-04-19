import csv from 'csvtojson';
import {Cluster, Itur, Coordinate} from '../types';

const readCsvFile = async (filePath: string): Promise<any[]> => {
  const data: any[] = await csv().fromFile(filePath);

  return data;
};

export const readClusters = async (): Promise<Cluster[]> => {
  const clustersCsvData = await readCsvFile('./data/Tvirim.csv');

  const clusters = clustersCsvData.map((clusterData) => createCluster(clusterData));

  return clusters;
};

export const readIturim = async (): Promise<Itur[]> => {
  const IturimCsvData = await readCsvFile('./data/iturim.csv');

  const iturim: Itur[] = IturimCsvData.map((iturData) => createItur(iturData));

  return iturim;
};

function createCluster(element: any): Cluster {
  const cluster: Cluster = {
    ID: element['ID'],
    hatzvaraQuality: element['hatzvara_quality'],
    identification: element['Identification'],
    staying: element['staying'],
    profession: element['profession'],
    numberOfBuildings: element['number_of_buildings'],
    geoBuildings: element['geo_buildings'],
  };

  return cluster;
}

function createItur(element: any): Itur {
  const coordinate: Coordinate = {
    x: element['Points_x'],
    y: element['Points_y'],
  };

  const itur: Itur = {
    index: element['index'],
    location: coordinate,
    profession: element['professions'],
    tabuOwner: element['tabu_owner'],
    names: element['names'],
  };

  return itur;
}
