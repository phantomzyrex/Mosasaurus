import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDepthMeters,
  computeParallaxOffset,
  getFossilLocationById,
  getHotspotById,
  getPelagicZoneLabel,
  getScaleComparisonMetrics,
} from './oceanMath';
import {
  ANATOMY_HOTSPOTS,
  DISCOVERY_TIMELINE,
  FAST_FACTS,
  FOSSIL_LOCATIONS,
  MYTH_CARDS,
  OVERVIEW_STATS,
  SCIENTIFIC_SOURCES,
  SPECIES_LIST,
} from '../data/mosasaurusData';

test('calculateDepthMeters clamps and scales scroll progress from 0 m to 200 m', () => {
  assert.equal(calculateDepthMeters(0), 0);
  assert.equal(calculateDepthMeters(0.5), 100);
  assert.equal(calculateDepthMeters(1), 200);
  assert.equal(calculateDepthMeters(-0.5), 0);
  assert.equal(calculateDepthMeters(1.8), 200);
  assert.equal(calculateDepthMeters(NaN), 0);
});

test('getPelagicZoneLabel returns accurate ocean zone titles across depth progression', () => {
  assert.equal(getPelagicZoneLabel(0), 'EPIPELAGIC SURFACE');
  assert.equal(getPelagicZoneLabel(65), 'PHOTIC HUNTING ZONE');
  assert.equal(getPelagicZoneLabel(150), 'LOWER PHOTIC MARGIN');
  assert.equal(getPelagicZoneLabel(200), 'MESOPELAGIC BOUNDARY');
});

test('computeParallaxOffset respects amplitude and prefers-reduced-motion', () => {
  assert.deepEqual(computeParallaxOffset(0.5, -0.5, 24, false), { x: 12, y: -12 });
  assert.deepEqual(computeParallaxOffset(1, -1, -24, false), { x: -24, y: 24 });
  assert.deepEqual(computeParallaxOffset(1, 1, 40, true), { x: 0, y: 0 });
});

test('getScaleComparisonMetrics switches Mosasaurus between conservative (11.5m) and disputed maximum (17m)', () => {
  const conservative = getScaleComparisonMetrics('conservative');
  const maximum = getScaleComparisonMetrics('maximum');

  const mosaCon = conservative.find((item) => item.id === 'mosasaurus');
  const mosaMax = maximum.find((item) => item.id === 'mosasaurus');

  assert.ok(mosaCon);
  assert.ok(mosaMax);
  assert.equal(mosaCon.activeMeters, 11.5);
  assert.equal(mosaMax.activeMeters, 17.0);
  assert.ok(mosaMax.widthPercent > mosaCon.widthPercent);
});

test('scientific datasets match required specification counts and lookups', () => {
  assert.equal(OVERVIEW_STATS.length, 8);
  assert.equal(DISCOVERY_TIMELINE.length, 7);
  assert.equal(ANATOMY_HOTSPOTS.length, 9);
  assert.equal(FOSSIL_LOCATIONS.length, 8);
  assert.equal(SPECIES_LIST.length, 5);
  assert.equal(MYTH_CARDS.length, 4);
  assert.equal(FAST_FACTS.length, 8);
  assert.equal(SCIENTIFIC_SOURCES.length, 6);

  assert.equal(getHotspotById('palate-teeth').title, 'Palate Teeth (Pterygoid Dentition)');
  assert.equal(getFossilLocationById('europe-maastricht').countries, 'Netherlands & Belgium');
});
