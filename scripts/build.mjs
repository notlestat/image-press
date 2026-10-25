import { writeFileSync, mkdirSync } from 'node:fs';
import * as k from '../vendor/anatomy/kit/iso-kit.mjs';
import * as G from '../vendor/anatomy/kit/lathe.mjs';
import * as A from '../vendor/anatomy/kit/audit.mjs';

const W = 980, H = 640;
const base = { x: -174, y: -93, w: 344, d: 186, r: 13 };
const P = k.fitProjection([...k.boxCorners({ x: -270, y: -104, w: 572, d: 208, r: 0 }, -3, 188)], W, H, { pad: 65, azimuth: 50, elevation: 27 });
const order = ['cover'];
const spring = { stiffness: 64, damping: 16, stagger: 0 };
const R = A.recorder(P, { order, spring });
const S = k.solidSvg, L = k.lineSvg;
let number = 0;
function put(name, at, paths, shape, { piece = 'body', inner = '', tone = 'mid', accent = false, extra = '' } = {}) {
  const id = `${name}-${number++}`;
  const svg = `<g data-name="${name}" class="part${accent ? ' ink-part' : ''}" ${extra}>${S(paths, { tone, inner })}</g>`;
  R.put({ name: id, piece, at, move: piece === 'cover' ? [0, 0, 74] : [0, 0, 0], svg, shapes: [R.solid({ ...shape, name: id })] });
}
function box(name, plan, z, h, options = {}) {
  put(name, [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2], k.slabOf(plan, z, h, P, 6, .7), A.slab(plan, z, h, {}, 6), options);
}
function puck(name, x, y, r, z, h, options = {}) {
  put(name, [x, y, z + h / 2], k.cylinder(x, y, r, z, h, P, 48, .4), A.cylinder(x, y, r, z, h), options);
}
function axial(name, F, s0, s1, r, options = {}) {
  put(name, G.pointOf(F, (s0 + s1) / 2, 0, 0), G.disc(s0, s1, r, F, P, { steps: 64, smooth: { slope: () => 0 } }), A.disc(F, s0, s1, r), options);
}
function bolts(plan, z) {
  return k.dotsSvg(k.corners(plan, 6).map(([x, y]) => k.iso([x, y, z], P)), { size: .8, tone: 'hi' });
}

for (const [x, y] of k.corners(base, 27)) {
  puck('stand.foot', x, y, 11, -3, 5, { tone: 'lo' });
  puck('foot-collar', x, y, 13, 2, 2);
}
box('stand.base', base, 4, 18, { inner: L(k.planOutline(k.insetPlan(base, 5), 22, P), { tone: 'lo' }) + bolts(base, 22) });

for (const y of [-88, 74]) {
  box('frame-rail', { x: -154, y, w: 300, d: 14, r: 3 }, 22, 10);
  for (const x of [-143, 126]) box('cover-post', { x, y: y + 2, w: 13, d: 10, r: 2 }, 32, 60);
}
box('feed-support', { x: -174, y: -60, w: 26, d: 120, r: 2 }, 22, 12);
box('delivery-support', { x: 132, y: -60, w: 26, d: 120, r: 2 }, 22, 12);
const feed = { x: -267, y: -62, w: 125, d: 124, r: 4 };
const delivery = { x: 140, y: -62, w: 160, d: 124, r: 4 };
box('input-bed', feed, 34, 3, { tone: 'hi', inner: bolts(feed, 37) });
box('output-bed', delivery, 34, 3, { tone: 'hi', inner: bolts(delivery, 37) });
for (const y of [-62, 58]) {
  box('input-guide', { x: -256, y, w: 106, d: 4, r: 1 }, 37, 3);
  box('output-guide', { x: 145, y, w: 149, d: 4, r: 1 }, 37, 3);
}
box('feed-paper', { x: -256, y: -55, w: 103, d: 110, r: .2 }, 37, .35, { tone: 'lo' });
box('print-bed', { x: -142, y: -62, w: 274, d: 124, r: 2 }, 22, 10);
for (const [i, x] of [-102, -12, 78].entries()) {
  const F = G.frameAlong([x, 0, 58], [0, 1, 0]);
  axial('roller', F, -62, 62, 20, { accent: i === 1, tone: 'hi', inner: L(G.arcOf(F, -58, 20, P), { tone: 'faint' }) + L(G.arcOf(F, 58, 20, P), { tone: 'faint' }) });
  for (const [a, b] of [[-65, -62], [62, 65]]) axial('roller-cap', F, a, b, 20.8, { tone: 'hi' });
  for (const [a, b] of [[-82, -76], [-70, -65], [65, 70], [76, 82]]) axial('shaft', F, a, b, 4, { tone: 'hi' });
  for (const y of [-76, 70]) {
    box('bearing-pedestal', { x: x - 12, y, w: 24, d: 6, r: 2 }, 32, 15);
    const a = y, b = y + 6;
    put('bearing', [x, y + 3, 58], G.disc(a, b, 11, F, P, { steps: 48 }), A.disc(F, a, b, 11), { tone: 'hi', inner: L(G.circleOf(F, b, 7.5, P), { tone: 'lo' }) });
  }
  axial('drive-hub', F, 82, 89, 10, { tone: 'hi', extra: `data-hub="${i}"` });
}
for (const [i, x] of [-61, 29].entries()) {
  box('plate-carrier', { x, y: -58, w: 34, d: 116, r: 1 }, 32, 1.5, { tone: 'lo' });
  box(i ? 'red-plate' : 'black-plate', { x: x + 2, y: -54, w: 30, d: 108, r: .4 }, 33.5, .5, { tone: 'hi', accent: !!i, extra: i ? 'data-registration-plate' : '' });
}
for (const [i, x] of [-62, 28, 110].entries()) {
  puck('control-collar', x, 81, 7, 32, 2);
  puck('control-knob', x, 81, 6.5, 34, 7, { tone: 'hi', inner: L(k.knurl(x, 81, 6.5, 34, 41, 36, P), { tone: 'lo' }) + `<path data-machine-pointer="${i}" class="iso-line" data-tone="hi" data-free="start" d="${k.lineOnTop([x, 81], [x, 74.5], 41, P)}"/>` });
}
const label = { x: -142, y: 64, w: 46, d: 8, r: 1 };
box('serial-plate', label, 22, .6, { inner: k.faceTextSvg(k.topMatrix([-138, 70], 22.6, P), 'IP—01', { size: 4, tone: 'hi' }) });
const lid = { x: -153, y: -86, w: 300, d: 172, r: 9 };
let lidDetails = L(k.planOutline(k.insetPlan(lid, 5), 100, P), { tone: 'lo' }) + bolts(lid, 100);
for (let i = 0; i < 9; i++) lidDetails += L(k.planOutline({ x: -122 + i * 11, y: -49, w: 4, d: 31, r: 2 }, 100, P), { tone: 'mid' });
box('casing', lid, 92, 8, { piece: 'cover', tone: 'hi', inner: lidDetails, extra: 'data-casing' });
for (const x of [-22, 22]) box('handle-mount', { x, y: -4, w: 8, d: 10, r: 2 }, 100, 10, { piece: 'cover' });
box('handle', { x: -22, y: -4, w: 52, d: 10, r: 3 }, 110, 6, { piece: 'cover', tone: 'hi' });

console.time('Depth ordering');
A.settle(R, P);
console.timeEnd('Depth ordering');
R.items.sort((a, b) => a.key - b.key);
const halo = `<path class="iso-halo" d="${k.haloOf(base, -3, 15, P)}"/>`;
const origin = k.iso([148, -55, 37.7], P);
const ux = k.axisVector(P, [1, 0, 0]), uy = k.axisVector(P, [0, 1, 0]);
const matrix = `matrix(${ux[0]} ${ux[1]} ${uy[0]} ${uy[1]} ${origin[0]} ${origin[1]})`;
const print = `<g data-print-plane transform="${matrix}"><defs><clipPath id="sheet-crop"><rect width="140" height="110"/></clipPath></defs><g clip-path="url(#sheet-crop)"><g data-emerging-sheet><rect width="137.5" height="110" fill="#f7f3e9"/><image data-machine-print x="0" y="0" width="110" height="137.5" transform="translate(137.5 0) rotate(90)" preserveAspectRatio="none"/><path d="M0 0H137.5V110H0Z" fill="none" stroke="#79766e" stroke-width=".45"/></g></g></g>`;
const body = R.items.map(item => `<g class="assembly" data-piece="${item.piece}" data-key="${item.key}" data-lift="${item.move[2]}">${item.svg}</g>`);
const svg = k.figureSvg({ width: W, height: H, label: 'An isometric tabletop printing press, with three transverse rollers, two ink plates, a removable service cover and an emerging photographic print.', body: [halo, ...body, print] });
mkdirSync('public', { recursive: true });
writeFileSync('public/machine.svg', svg);
writeFileSync('public/machine-data.json', JSON.stringify({ projection: P, width: W, height: H, parts: R.solids.length, knobs: [-62, 28, 110] }));
console.log(`Built Image Press: ${R.solids.length} solids, ${R.items.length} ordered parts`);
A.auditOrExit(R, P);
