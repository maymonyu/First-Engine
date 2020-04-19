import {Cluster} from '../types/cluster';
import {Itur} from '../types/itur';
import {Rule} from '../types/rule';
import {Coordinate} from '../types/coordinate';
import {parseFile, ParserOptionsArgs} from 'fast-csv';

function readFile(fileName: string, parseOptions: ParserOptionsArgs, callback: Function) {
  const result: Array<any> = [];

  parseFile('./data/' + fileName, parseOptions)
      .on('error', (error) => console.error(error))
      .on('data', (row) => result.push(row))
      .on('end', () => callback(result));
}

export function buildTvirim() {
  const parseOptions: ParserOptionsArgs = {
    headers: [undefined, 'ID', 'hatzvara_quality', 'in_building_quality', 'staying', 'Identification', 'profession',
      'number_of_buildings', 'geo_buildings', undefined, undefined],
    skipRows: 1,
  };

  readFile('Tvirim.csv', parseOptions, function(result: Array<any>) {
    const clusters: Array<Cluster> = [];
    for (const element of result) {
      clusters.push(createCluster(element));
    }
    console.log(clusters[0]);
  });
}

export function buildRules() {
  const parseOptions: ParserOptionsArgs = {
    headers: [undefined, undefined, 'hatzvara_quality', 'in_building_quality', 'staying',
      'number_of_buildings', 'context_to_profession', 'output_geo_value', 'output_essence_value'],
    skipRows: 1,
  };

  return readFile('Constitution.csv', parseOptions, function(result: Array<any>) {
    const rules: Array<Rule> = [];
    for (const element of result) {
      rules.push(createRule(element));
    }
    console.log(rules);
  });
}

export function buildIturim() {
  const options: ParserOptionsArgs = {
    headers: [undefined, 'index', 'Points_x', 'Points_y', 'professions', 'tabu_owner', 'names'],
    skipRows: 1,
  };

  readFile('iturim.csv', options, function(result: Array<any>) {
    const iturim: Array<Itur> = [];
    for (const element of result) {
      iturim.push(createItur(element));
    }
    console.log(iturim[0]);
  });
}

function createCluster(element: any) {
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


function createItur(element:any) {
  const coordinate : Coordinate = {
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

function createRule(element:any) {
  const key = element['hatzvara_quality'] + ',' +element['in_building_quality'] + ',' +
  element['staying']+ ',' + element['number_of_buildings'];

  const value = element['output_geo_value'] + ',' +element['output_essence_value'];

  const rule: Rule = {
    key: key,
    value: value,
  };

  return rule;
}
