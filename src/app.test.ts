import {sum} from './app';
import {Cluster} from './types/cluster';
import {Coordinate} from './types/coordinate';
import {CrossChecker} from './modules/cross-checker/cross-checker';
import {Itur} from './types/itur';

const crossChecker = new CrossChecker();

function createCluster(geoBuildings: Coordinate[][]): Cluster {
  return {
    'ID': 'clusterTest1',
    'hatzvaraQuality': 'low',
    'identification': 'sdsds',
    'staying': 2,
    'profession': 'wizard',
    'numberOfBuildings': 1,
    'geoBuildings': geoBuildings,
  };
};

function createItur(coordinate: Coordinate): Itur {
  return {
    'index': 123,
    'location': coordinate,
    'profession': 'assassin',
    'tabuOwner': 'moshe',
    'names': 'bla',
  };
}

test('basic itur inside cluster', () => {
  const cluster = createCluster( [[{latitude: 31.3018, longitude: 34.2754},
    {latitude: 31.3011, longitude: 34.2754}, {latitude: 31.3012, longitude: 34.2746}]]);

  const itur = createItur({latitude: 31.3016, longitude: 34.2752});

  expect(crossChecker.crossClusterWithIturim(cluster, [itur]).iturimWithPolygons.length).toBe(1);
  expect(crossChecker.crossClusterWithIturim(cluster, [itur])
      .iturimWithPolygons[0].iturim[0].location.latitude).toBe(31.3016);
});

test('basic itur NOT inside cluster', () => {
  const cluster = createCluster( [[{latitude: 31.3018, longitude: 34.2754},
    {latitude: 31.3011, longitude: 34.2754}, {latitude: 31.3012, longitude: 34.2746}]]);

  const itur = createItur({latitude: 38.8888, longitude: 34.2752});

  expect(crossChecker.crossClusterWithIturim(cluster, [itur]).iturimWithPolygons[0].iturim.length).toBe(0);
});

test('basic itur inside cluster when there are 2 buildings', () => {
  const cluster = createCluster( [[{latitude: 31.3029, longitude: 34.2731},
    {latitude: 31.3017, longitude: 34.2729}, {latitude: 31.3023, longitude: 34.2740}],
  [{latitude: 31.3018, longitude: 34.2754},
    {latitude: 31.3011, longitude: 34.2754}, {latitude: 31.3012, longitude: 34.2746}],
  ]);

  const itur = createItur({latitude: 31.3016, longitude: 34.2752});

  expect(crossChecker.crossClusterWithIturim(cluster, [itur]).iturimWithPolygons[1].iturim.length).toBe(1);
  expect(crossChecker.crossClusterWithIturim(cluster, [itur]).iturimWithPolygons[1].
      iturim[0].location.latitude).toBe(31.3016);
  expect(crossChecker.crossClusterWithIturim(cluster, [itur]).iturimWithPolygons[1].polygon[0].latitude).toBe(31.3018);
});


test('basic itur NOT inside cluster when there are 2 buildings', () => {
  const cluster = createCluster( [[{latitude: 31.3029, longitude: 34.2731},
    {latitude: 31.3017, longitude: 34.2729}, {latitude: 31.3023, longitude: 34.2740}],
  [{latitude: 31.3018, longitude: 34.2754},
    {latitude: 31.3011, longitude: 34.2754}, {latitude: 31.3012, longitude: 34.2746}],
  ]);

  const itur = createItur({latitude: 0.0000, longitude: 34.2752});

  expect(crossChecker.crossClusterWithIturim(cluster, [itur]).iturimWithPolygons[0].iturim.length).toBe(0);
  expect(crossChecker.crossClusterWithIturim(cluster, [itur]).iturimWithPolygons[1].iturim.length).toBe(0);
});
