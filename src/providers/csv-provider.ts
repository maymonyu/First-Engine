import { Cluster } from '../types/cluster'
import { parseFile, ParserOptionsArgs } from 'fast-csv';

function readFile(fileName: string, options: ParserOptionsArgs, callback: Function) {
  const result: Array<JSON> = [];

  parseFile('./data/' + fileName, options)
    .on('error', (error) => console.error(error))
    .on('data', (row) => result.push(row))
    .on('end', () => callback(result));
}

export function buildTvirim() {
  const options: ParserOptionsArgs = {
    headers: [undefined, 'ID', 'hatzvara_quality', 'in_building_quality', 'staying', 'Identification', 'profession',
      'number_of_buildings', 'geo_buildings', undefined, undefined],
    skipRows: 1,
  };

  readFile('Tvirim.csv', options, function (results: Array<JSON>) {
    let clusters : Array<Cluster> = [];
    for (const result in results) {
      
    }
  });
}

export function buildIturim() {
  const options: ParserOptionsArgs = {
    headers: [undefined, 'index', 'Points_x', 'Points_y', 'professions', 'tabu_owner', 'names'],
    skipRows: 1,
  };

  readFile('iturim.csv', options, function (result: Array<JSON>) {
    console.log(result[0]);
  });
}


