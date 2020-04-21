import csv from 'csvtojson';
import {Cluster, Itur, Coordinate, Rule, RuleValue, Constitution} from '../types';

const readCsvFile = async (filePath: string): Promise<any[]> => {
  const data: any[] = await csv().fromFile(filePath);

  return data;
};

export const readClusters = async (): Promise<Cluster[]> => {
  const clustersCsvData = await readCsvFile('./data/Tvirim.csv');

  const clusters = clustersCsvData.map(createCluster);

  return clusters;
};

export const readIturim = async (): Promise<Itur[]> => {
  const IturimCsvData = await readCsvFile('./data/iturim.csv');

  const iturim: Itur[] = IturimCsvData.map(createItur);

  return iturim;
};

export const readConstitution = async (): Promise<Constitution> => {
  const rulesCsvData = await readCsvFile('./data/Constitution.csv');
  const constitution: Constitution = {};

  const rules: Rule[] = rulesCsvData.map(createRule);
  rules.forEach((rule) => constitution[rule.key] = rule.value);

  return constitution;
};

const createCluster = (element: any): Cluster => {
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
};

const createItur = (element: any): Itur => {
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
};

const createRule = (element: any): Rule => {
  const keyFields = [
    'hatzvara_quality',
    'in_building_quality',
    'staying',
    'number_of_buildings',
  ];
  const key = keyFields.map((fieldName) => element[fieldName]).join(',');

  const value: RuleValue = {
    geographicScore: element['output_geo_value'],
    essenceScore: element['output_essence_value'],
  };

  const rule: Rule = {
    key,
    value,
  };

  return rule;
};
