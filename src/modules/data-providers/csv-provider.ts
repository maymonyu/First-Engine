import csv from 'csvtojson';
import terraformer from 'terraformer-wkt-parser';

import {Cluster, Itur, Coordinate, Rule, RuleValue, Constitution, Building} from '../../types';

type CsvLine = {[propertyName: string]: string};

function extractCoordinates(parsedPolygon: GeoJSON.GeometryObject): Coordinate[] {
    parsedPolygon = parsedPolygon as GeoJSON.DirectGeometryObject;

    // since the polygons have the form of 'Polygon((..))' instead of 'Polgon(..)',
    // we take only the first cell
    const positions = parsedPolygon.coordinates[0] as number[][];
    const coordinates = positions.map((position) => new Coordinate(position[0], position[1]));
    return coordinates;
}

function parseBuildings(polygonString: string): Building[] {
    const stringPolygons: string[] = polygonString.split('\'');
    stringPolygons.shift();
    stringPolygons.pop();
    const polygons = stringPolygons
        .filter((stringPolygon) => stringPolygon.includes('POLYGON'))
        .map((stringPolygon) => terraformer.parse(stringPolygon))
        .map(extractCoordinates)
        .map((coordinates) => new Building(coordinates));
    return polygons;
}

function parseStaying(stayingString: string): [number, number] {
    const range = stayingString.split('_');
    if (range.length === 3) {
        return [Number(range[0]), Number(range[2])];
    }
    const minStaying = stayingString.split('+');
    if (minStaying.length > 0) {
        return [Number(minStaying[0]), NaN];
    }
    console.error(`'staying' property is expected to be in the format:
        'fromNumber_to_toNumber' or 'number+'. Got: ${stayingString}`);
    return [NaN, NaN];
}

function createCluster(element: CsvLine): Cluster {
    const buildings = parseBuildings(element['geo_buildings']);
    const [parsedMinStaying, parsedMaxStaying] = parseStaying(element['staying']);

    const cluster: Cluster = {
        id: element['ID'],
        clusteringQuality: element['hatzvara_quality'],
        identification: element['Identification'],
        minStaying: parsedMinStaying,
        maxStaying: parsedMaxStaying,
        profession: element['profession'],
        numberOfBuildings: Number(element['number_of_buildings']),
        geoBuildings: buildings,
        inBuildingQuality: element['in_building_quality'],
    };

    return cluster;
};

function createItur(element: CsvLine): Itur {
    const coordinate: Coordinate = {
        latitude: Number(element['Points_x']),
        longitude: Number(element['Points_y']),
    };

    const itur: Itur = {
        index: Number(element['index']),
        location: coordinate,
        profession: element['professions'],
        tabuOwner: element['tabu_owner'],
        names: element['names'],
    };

    return itur;
};

function createRule(element: CsvLine): Rule {
    const keyFields = [
        'hatzvara_quality',
        'in_building_quality',
        'staying',
        'number_of_buildings',
    ];
    const key = keyFields
        .map((fieldName) => element[fieldName])
        .join(',');

    const value: RuleValue = {
        geographicScore: element['output_geo_value'],
        essenceScore: element['output_essence_value'],
    };

    const rule: Rule = {key, value};

    return rule;
};

function readCsvFile(filePath: string): PromiseLike<CsvLine[]> {
    return csv().fromFile(filePath);
};

export async function readClusters(): Promise<Cluster[]> {
    const clustersCsvData = await readCsvFile('./data/Tvirim.csv');

    const clusters = clustersCsvData.map((clusterData) => createCluster(clusterData));

    return clusters;
};

export async function readIturim(): Promise<Itur[]> {
    const IturimCsvData = await readCsvFile('./data/iturim.csv');

    const iturim: Itur[] = IturimCsvData.map((iturData) => createItur(iturData));

    return iturim;
};

export async function readConstitution(): Promise<Constitution> {
    const rulesCsvData = await readCsvFile('./data/Constitution.csv');
    const constitution: Constitution = {};

    const rules: Rule[] = rulesCsvData.map((ruleData) => createRule(ruleData));
    rules.forEach((rule) => constitution[rule.key] = rule.value);

    return constitution;
};
