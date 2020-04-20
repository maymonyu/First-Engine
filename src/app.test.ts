import { Cluster } from './types/cluster';
import { Coordinate } from './types/coordinate';
import { CrossChecker } from './modules/cross-checker/cross-checker';
import { Itur } from './types/itur';

const crossChecker = new CrossChecker();

test('Set1: basic itur inside cluster', () => {
  const cluster = createClusterExample([[{ latitude: 31.3018, longitude: 34.2754 },
  { latitude: 31.3011, longitude: 34.2754 }, { latitude: 31.3012, longitude: 34.2746 }]]);

  const itur = createIturExample({ latitude: 31.3016, longitude: 34.2752 });
  const crossResult = crossChecker.crossClusterWithIturim(cluster, [itur]);

  expect(crossResult.iturimWithPolygons.length).toBe(1);
  expect(crossResult.iturimWithPolygons.length).toBe(1);
  expect(crossResult.iturimWithPolygons[0].iturim.length).toBe(1);
  expect(crossResult.iturimWithPolygons[0].polygon.length).toBe(3);
  expect(crossResult.iturimWithPolygons[0].iturim[0].location.latitude).toBe(31.3016);
});

test('Set1: basic itur NOT inside cluster', () => {
  const cluster = createClusterExample([[{ latitude: 31.3018, longitude: 34.2754 },
  { latitude: 31.3011, longitude: 34.2754 }, { latitude: 31.3012, longitude: 34.2746 }]]);

  const itur = createIturExample({ latitude: 38.8888, longitude: 34.2752 });
  const crossResult = crossChecker.crossClusterWithIturim(cluster, [itur]);

  expect(crossResult.iturimWithPolygons[0].iturim.length).toBe(0);
  expect(crossResult.iturimWithPolygons.length).toBe(1);
});

test('Set2: itur with 2 buildings when in the second one', () => {
  const cluster = createClusterExample([[{ latitude: 31.3029, longitude: 34.2731 },
  { latitude: 31.3017, longitude: 34.2729 }, { latitude: 31.3023, longitude: 34.2740 }],
  [{ latitude: 31.3018, longitude: 34.2754 },
  { latitude: 31.3011, longitude: 34.2754 }, { latitude: 31.3012, longitude: 34.2746 }],
  ]);

  const itur = createIturExample({ latitude: 31.3016, longitude: 34.2752 });
  const crossResult = crossChecker.crossClusterWithIturim(cluster, [itur]);

  expect(crossResult.iturimWithPolygons.length).toBe(2);
  expect(crossResult.iturimWithPolygons[0].iturim.length).toBe(0);
  expect(crossResult.iturimWithPolygons[1].iturim.length).toBe(1);
  expect(crossResult.iturimWithPolygons[1].iturim[0].location.latitude).toBe(31.3016);
  expect(crossResult.iturimWithPolygons[1].polygon[0].latitude).toBe(31.3018);
});


test('Set2: itur not inside 2 buildings', () => {
  const cluster = createClusterExample([[{ latitude: 31.3029, longitude: 34.2731 },
  { latitude: 31.3017, longitude: 34.2729 }, { latitude: 31.3023, longitude: 34.2740 }],
  [{ latitude: 31.3018, longitude: 34.2754 },
  { latitude: 31.3011, longitude: 34.2754 }, { latitude: 31.3012, longitude: 34.2746 }],
  ]);

  const itur = createIturExample({ latitude: 0.0000, longitude: 34.2752 });
  const crossResult = crossChecker.crossClusterWithIturim(cluster, [itur]);

  expect(crossResult.iturimWithPolygons.length).toBe(2);
  expect(crossResult.iturimWithPolygons[0].iturim.length).toBe(0);
  expect(crossResult.iturimWithPolygons[1].iturim.length).toBe(0);
});


test('Set3: changing location , few iturim , polygon have 4 coordinates', () => {
  const cluster = createClusterExample([[{ latitude: 32.071341, longitude: 34.805351 }, {
    latitude: 32.071382, longitude: 34.805109
  }, { latitude: 32.071223, longitude: 34.805077 }, { latitude: 32.071164, longitude: 34.805324 }]]);

  const firstItur = createIturExample({ latitude: 32.071291, longitude: 34.805200 }); // inside poly
  const secondItur = createIturExample({ latitude: 31.30161, longitude: 34.2752 }); // not inside
  const crossResult = crossChecker.crossClusterWithIturim(cluster, [firstItur, secondItur]);

  expect(crossResult.iturimWithPolygons.length).toBe(1);
  expect(crossResult.iturimWithPolygons[0].iturim.length).toBe(1);
  expect(crossResult.iturimWithPolygons[0].iturim[0].location.latitude).toBe(32.071291);
});

test('Set4: few iturim inside the same building ', () => {
  const cluster = createClusterExample([[{ latitude: 32.071341, longitude: 34.805351 }, {
    latitude: 32.071382, longitude: 34.805109
  }, { latitude: 32.071223, longitude: 34.805077 }, { latitude: 32.071164, longitude: 34.805324 }]]);

  const firstItur = createIturExample({ latitude: 32.071291, longitude: 34.805200 });
  const secondItur = createIturExample({ latitude: 32.071273, longitude: 34.805088 });
  const thirdItur = createIturExample({ latitude: 32.071218, longitude: 34.805313 });
  const fourthItur = createIturExample({ latitude: 32.071332, longitude: 34.805222 });
  const crossResult = crossChecker.crossClusterWithIturim(cluster, [firstItur, secondItur, thirdItur, fourthItur]);

  expect(crossResult.iturimWithPolygons.length).toBe(1);
  expect(crossResult.iturimWithPolygons[0].iturim.length).toBe(4);

});

test('Set4: few iturim around the building none should be considered ', () => {
  const cluster = createClusterExample([[{ latitude: 32.071341, longitude: 34.805351 }, {
    latitude: 32.071382, longitude: 34.805109
  }, { latitude: 32.071223, longitude: 34.805077 }, { latitude: 32.071164, longitude: 34.805324 }]]);

  const firstItur = createIturExample({ latitude: 32.071405, longitude: 34.804975 });
  const secondItur = createIturExample({ latitude: 32.071195, longitude: 34.804964 });
  const thirdItur = createIturExample({ latitude: 32.071136, longitude: 34.805431 });
  const fourthItur = createIturExample({ longitude: 32.071364, latitude: 34.805447 });
  const crossResult = crossChecker.crossClusterWithIturim(cluster, [firstItur, secondItur, thirdItur, fourthItur]);

  expect(crossResult.iturimWithPolygons.length).toBe(1);
  expect(crossResult.iturimWithPolygons[0].iturim.length).toBe(0);
});

test('Set5: few iturim split between 2 buildings ', () => {
  const cluster = createClusterExample([[{ latitude: 32.071341, longitude: 34.805351 }, {
    latitude: 32.071382, longitude: 34.805109
  }, { latitude: 32.071223, longitude: 34.805077 }, { latitude: 32.071164, longitude: 34.805324 }]
    , [{ latitude: 32.071241, longitude: 34.805608 }, { latitude: 32.071114, longitude: 34.805855 },
    { latitude: 32.071014, longitude: 34.805807 }, { latitude: 32.071050, longitude: 34.805544 }]
  ]);

  const firstItur = createIturExample({ latitude: 32.071291, longitude: 34.805200 });// in first
  const secondItur = createIturExample({ latitude: 32.071273, longitude: 34.805088 }); // in first
  const thirdItur = createIturExample({ latitude: 32.071155, longitude: 34.805683 }); // in second
  const fourthItur = createIturExample({ latitude: 32.071086, longitude: 34.805619 }); // in second
  const fifthItur = createIturExample({ latitude: 32.071182, longitude: 34.805437 }); // not in any 

  const crossResult = crossChecker.crossClusterWithIturim(cluster, [firstItur, secondItur, thirdItur, fourthItur, fifthItur]);

  expect(crossResult.iturimWithPolygons.length).toBe(2);
  expect(crossResult.iturimWithPolygons[0].iturim.length).toBe(2);
  expect(crossResult.iturimWithPolygons[0].iturim[0].location.latitude).toBe(32.071291);
  expect(crossResult.iturimWithPolygons[0].iturim[1].location.latitude).toBe(32.071273);
  expect(crossResult.iturimWithPolygons[1].iturim.length).toBe(2);
  expect(crossResult.iturimWithPolygons[1].iturim[0].location.latitude).toBe(32.071155);
  expect(crossResult.iturimWithPolygons[1].iturim[1].location.latitude).toBe(32.071086);
});

function createClusterExample(geoBuildings: Coordinate[][]): Cluster {
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

function createIturExample(coordinate: Coordinate): Itur {
  return {
    'index': 123,
    'location': coordinate,
    'profession': 'assassin',
    'tabuOwner': 'moshe',
    'names': 'bla',
  };
}
