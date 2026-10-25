import test from 'node:test';
import assert from 'node:assert/strict';
import { coverCrop, densityAt, dotRadius } from './print-model.mjs';

test('portrait print crops wide and tall images centrally without stretching', () => {
  const wide = coverCrop(2400, 1200, 696, 794);
  assert.equal(wide.height, 1200);
  assert.ok(wide.x > 600 && wide.x < 700);
  assert.equal(wide.y, 0);
  const tall = coverCrop(1000, 3000, 696, 794);
  assert.ok(Math.abs(tall.width - 1000) < 1e-9);
  assert.ok(tall.y > 900);
  assert.ok(Math.abs(tall.width / tall.height - 696 / 794) < 1e-10);
});
test('transparent pixels print as paper and contrast preserves middle grey', () => {
  assert.equal(densityAt(0, 0, 0, 0, 180), 0);
  assert.equal(densityAt(255, 255, 255, 255, 180), 0);
  assert.equal(densityAt(0, 0, 0, 255, 180), 1);
  assert.ok(Math.abs(densityAt(127.5, 127.5, 127.5, 255, 180) - .5) < 1e-10);
  assert.ok(densityAt(60, 60, 60, 255, 180) > densityAt(60, 60, 60, 255, 70));
});
test('halftone area increases with density and remains bounded at extremes', () => {
  assert.equal(dotRadius(0, 10), 0);
  assert.ok(dotRadius(.8, 10) > dotRadius(.2, 10));
  assert.ok(Math.abs(dotRadius(100, 10) - 6.8) < 1e-9);
  assert.equal(dotRadius(-1, 10), 0);
});
