// Recovers the RegionMap projection by matching county FIPS between the source
// FDOT county GeoJSON (tmp_cty.json, EPSG:4326) and the existing SVG paths in
// RegionMap.tsx, then projects the FDOT road layers (and optional hydro) into
// the same SVG coordinate space. Pure equirectangular => an affine fit x=A*lon+B,
// y=C*lat+D is exact (modulo path simplification).
import fs from 'fs';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => fs.readFileSync(ROOT + p, 'utf8');

// --- 1. Pull FOCUS + CONTEXT arrays out of RegionMap.tsx and parse the JSON ---
const src = read('src/components/RegionMap.tsx');
function grabArray(name) {
  const m = src.match(new RegExp(`const ${name}[^=]*=\\s*(\\[[\\s\\S]*?\\]);`));
  if (!m) throw new Error('cannot find ' + name);
  return JSON.parse(m[1]);
}
const counties = [...grabArray('FOCUS'), ...grabArray('CONTEXT')];

// Area + centroid of a ring via the shoelace formula.
function ringCentroid(pts) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    const f = x0 * y1 - x1 * y0;
    a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f;
  }
  a *= 0.5;
  return { area: Math.abs(a), c: a === 0 ? pts[0] : [cx / (6 * a), cy / (6 * a)] };
}
// Largest-ring centroid (ignores offshore islands), robust to simplification.
function largestCentroid(rings) {
  let best = null;
  for (const ring of rings) {
    const rc = ringCentroid(ring);
    if (!best || rc.area > best.area) best = rc;
  }
  return best.c;
}
// SVG path -> array of rings (split on M).
function pathRings(d) {
  return d.split('M').filter(Boolean).map((seg) => {
    const nums = seg.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const pts = [];
    for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
    if (pts.length && (pts[0][0] !== pts.at(-1)[0] || pts[0][1] !== pts.at(-1)[1])) pts.push(pts[0]);
    return pts;
  });
}
const svgCentroid = {};
for (const c of counties) svgCentroid[c.fips] = largestCentroid(pathRings(c.d));

// --- 2. Source county outer-ring centroids keyed by FIPS = "12" + FIRST_FIPS ---
const cty = JSON.parse(read('tmp_cty.json'));
function outerRings(g) {
  return g.type === 'Polygon' ? [g.coordinates[0]] : g.coordinates.map((poly) => poly[0]);
}
const lonlatCentroid = {};
for (const f of cty.features) {
  const fips = '12' + String(f.properties.FIRST_FIPS).padStart(3, '0');
  lonlatCentroid[fips] = largestCentroid(outerRings(f.geometry));
}

// --- 3. Fit x=A*lon+B and y=C*lat+D from county centroids ---
function fit1d(pairs) {
  const n = pairs.length;
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const [x, y] of pairs) { sx += x; sy += y; sxx += x * x; sxy += x * y; }
  const m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const b = (sy - m * sx) / n;
  return { m, b };
}
const xPairs = [], yPairs = [];
for (const fips of Object.keys(svgCentroid)) {
  const s = svgCentroid[fips], g = lonlatCentroid[fips];
  if (!g) { console.warn('no source for', fips); continue; }
  xPairs.push([g[0], s[0]]);
  yPairs.push([g[1], s[1]]);
}
const fx = fit1d(xPairs), fy = fit1d(yPairs);
const project = ([lon, lat]) => [fx.m * lon + fx.b, fy.m * lat + fy.b];

let maxResX = 0, maxResY = 0;
for (const [lon, x] of xPairs) maxResX = Math.max(maxResX, Math.abs(fx.m * lon + fx.b - x));
for (const [lat, y] of yPairs) maxResY = Math.max(maxResY, Math.abs(fy.m * lat + fy.b - y));
console.error(`projection fit: x=${fx.m.toFixed(2)}*lon+${fx.b.toFixed(1)}  y=${fy.m.toFixed(2)}*lat+${fy.b.toFixed(1)}`);
console.error(`max centroid residual: x=${maxResX.toFixed(1)}px  y=${maxResY.toFixed(1)}px (over ${xPairs.length} counties)`);

// Visible map extent (viewBox) for clipping
const VB = { x0: 0, y0: 0, x1: 999, y1: 1000 };
const inExtent = ([x, y]) => x >= VB.x0 - 5 && x <= VB.x1 + 5 && y >= VB.y0 - 5 && y <= VB.y1 + 5;

// Round + build a polyline path; split when points leave the extent.
const r = (n) => Math.round(n * 10) / 10;
function lineToPaths(coords) {
  const paths = [];
  let cur = [];
  for (const c of coords) {
    const p = project(c);
    if (inExtent(p)) cur.push(p);
    else if (cur.length) { paths.push(cur); cur = []; }
  }
  if (cur.length) paths.push(cur);
  return paths
    .filter((seg) => seg.length > 1)
    .map((seg) => 'M' + seg.map(([x, y]) => `${r(x)} ${r(y)}`).join('L'));
}

function projectRoads(file) {
  const fc = JSON.parse(read(file));
  const out = [];
  for (const f of fc.features) {
    const g = f.geometry;
    const lines = g.type === 'LineString' ? [g.coordinates] : g.type === 'MultiLineString' ? g.coordinates : [];
    for (const line of lines) out.push(...lineToPaths(line));
  }
  return out;
}

const interstates = projectRoads('tmp_int.json');
const stateRoads = projectRoads('tmp_state.json');
console.error(`interstates: ${interstates.length} path segments`);
console.error(`state roads: ${stateRoads.length} path segments`);

// --- Hydrography: NHD waterbodies (lakes) and named major rivers ---
// Polygon -> SVG path (all rings, M..Z each). Kept whole if any vertex is in
// view; the SVG viewBox clips the overflow. evenodd handles island holes.
function polyToPath(geom) {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
  const subs = [];
  let any = false;
  for (const poly of polys) {
    for (const ring of poly) {
      const proj = ring.map(project);
      if (proj.some(inExtent)) any = true;
      subs.push('M' + proj.map(([x, y]) => `${r(x)} ${r(y)}`).join('L') + 'Z');
    }
  }
  return any ? subs.join('') : null;
}

const lakeFC = JSON.parse(read('tmp_lakes2.json'));
const lakes = [];
for (const f of lakeFC.features) {
  if (f.properties.FTYPE !== 'LakePond' || f.properties.AREASQKM < 1000) continue; // keep only Lake Okeechobee
  const d = polyToPath(f.geometry);
  if (!d) continue;
  const name = f.properties.GNIS_NAME || (f.properties.AREASQKM > 1000 ? 'Lake Okeechobee' : '');
  lakes.push({ name, d });
}

const riverFC = JSON.parse(read('tmp_rivers2.json'));
const rivers = [];
for (const f of riverFC.features) {
  if (f.properties.GNIS_NAME !== 'Caloosahatchee River') continue; // story focuses on the Caloosahatchee only
  const g = f.geometry;
  const name = f.properties.GNIS_NAME || '';
  const lines = g.type === 'LineString' ? [g.coordinates] : g.type === 'MultiLineString' ? g.coordinates : [];
  for (const line of lines) for (const d of lineToPaths(line)) rivers.push({ name, d });
}
console.error(`lakes: ${lakes.length} polygons   rivers: ${rivers.length} segments`);

// Stitch the Caloosahatchee flowline segments into one continuous main-stem path,
// ordered upstream -> downstream (east -> west), for animating flow along it.
const segs = [];
for (const f of riverFC.features) {
  if (f.properties.GNIS_NAME !== 'Caloosahatchee River') continue;
  const g = f.geometry;
  const lines = g.type === 'LineString' ? [g.coordinates] : g.type === 'MultiLineString' ? g.coordinates : [];
  for (const line of lines) {
    const pts = line.map(project).filter(inExtent);
    if (pts.length >= 2) segs.push(pts);
  }
}
let chain = [];
if (segs.length) {
  const used = new Set();
  // Start at the easternmost endpoint (closest to Lake Okeechobee).
  let startSeg = 0, startRev = false, maxX = -Infinity;
  segs.forEach((s, i) => {
    if (s[0][0] > maxX) { maxX = s[0][0]; startSeg = i; startRev = false; }
    if (s[s.length - 1][0] > maxX) { maxX = s[s.length - 1][0]; startSeg = i; startRev = true; }
  });
  used.add(startSeg);
  chain = startRev ? segs[startSeg].slice().reverse() : segs[startSeg].slice();
  const TOL = 22;
  while (true) {
    const end = chain[chain.length - 1];
    const cand = [];
    segs.forEach((s, i) => {
      if (used.has(i)) return;
      const a = s[0], b = s[s.length - 1];
      if (Math.hypot(a[0] - end[0], a[1] - end[1]) <= TOL) cand.push({ i, rev: false, far: b });
      if (Math.hypot(b[0] - end[0], b[1] - end[1]) <= TOL) cand.push({ i, rev: true, far: a });
    });
    if (!cand.length) break;
    cand.sort((p, q) => p.far[0] - q.far[0]); // continue downstream (westmost far end)
    const c = cand[0];
    used.add(c.i);
    const s = c.rev ? segs[c.i].slice().reverse() : segs[c.i].slice();
    chain.push(...s.slice(1));
  }
}
const caloosaPath = chain.length > 1 ? 'M' + chain.map(([x, y]) => `${r(x)} ${r(y)}`).join('L') : '';
console.error(`caloosahatchee flow path: ${chain.length} points`);

const waterBanner = `// AUTO-GENERATED by scripts/genlayers.mjs — do not edit by hand.\n` +
  `// USGS National Hydrography Dataset: major lakes (NHD Waterbody, LakePond > 8 sq km)\n` +
  `// and principal named rivers (NHD Flowline), projected into the RegionMap SVG space.\n`;
const waterTs = waterBanner +
  `export interface WaterFeature { name: string; d: string; }\n` +
  `export const LAKES: WaterFeature[] = ${JSON.stringify(lakes)};\n\n` +
  `export const RIVERS: WaterFeature[] = ${JSON.stringify(rivers)};\n\n` +
  `export const CALOOSA_PATH = ${JSON.stringify(caloosaPath)};\n`;
fs.writeFileSync(ROOT + 'src/components/regionWater.ts', waterTs);
console.error('wrote src/components/regionWater.ts');

const banner = `// AUTO-GENERATED by scripts/genlayers.mjs — do not edit by hand.\n` +
  `// FDOT Interstate (tmp_int.json) and State Highway System (tmp_state.json) routes,\n` +
  `// projected into the RegionMap SVG space (viewBox 0 0 999 1000).\n`;
const ts = banner +
  `export const INTERSTATES: string[] = ${JSON.stringify(interstates)};\n\n` +
  `export const STATE_ROADS: string[] = ${JSON.stringify(stateRoads)};\n`;
fs.writeFileSync(ROOT + 'src/components/regionRoads.ts', ts);
console.error('wrote src/components/regionRoads.ts');
