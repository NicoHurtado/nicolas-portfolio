import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// Renders at 1440p60; geometry lives in a 1920x1080 viewBox and scales as
// vectors — crisp on any screen.
export const WIDTH = 2560;
export const HEIGHT = 1440;
export const FPS = 60;
export const DURATION = 16 * FPS; // 16s seamless loop

const VW = 1920;
const VH = 1080;

const TAU = Math.PI * 2;

// ---------------------------------------------------------------------------
// "The data journey" — one continuous take, keynote style.
// Four lines never stop flowing right. Everything else is born from them:
//   flow → dots surface ON the lines → the dots slide along the lines and
//   gather into a living neural net (curved links, drawn in cascade) → the
//   accent line leaves the net beating (ECG) while a ring breathes around the
//   ink line → the vitals lift into rising trends, stats live in a quiet
//   widget card below → the trend flows into a laptop + phone demo → back to
//   flow. Loop. All action sits on the right; the left stays calm for the name.
// ---------------------------------------------------------------------------

const PHASES = 6;
const CFG = { duration: DURATION, plateau: 22, shoulder: 100, beats: 16 };

const INK = "#141414";
const ACCENT = "#FF4D00";
const GRAY = "#ABABA9";
const FOG = "#D8D8D6";
const GHOST = "#E9E9E7";

const LINE_COLORS = [INK, ACCENT, GRAY, FOG];
const LINE_WIDTHS = [2.8, 3.0, 2.4, 2.2];
const CY = [430, 545, 660, 775];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const frac = (v: number) => v - Math.floor(v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};
const sstep = (a: number, b: number, v: number) => smooth((v - a) / (b - a));
const gauss = (u: number, c: number, w: number, a: number) =>
  a * Math.exp(-((u - c) ** 2) / (2 * w * w));
const rand = (seed: number) => frac(Math.sin(seed * 127.1 + 311.7) * 43758.5453);

// Right-side energy envelope: calm under the name, alive on the right.
const envR = (x: number) => 0.28 + 0.72 * sstep(340, 1120, x);

function phaseWeights(frame: number): number[] {
  const phaseLen = CFG.duration / PHASES;
  const raw = new Array(PHASES).fill(0).map((_, p) => {
    const center = p * phaseLen + phaseLen / 2;
    let d = Math.abs(frame - center);
    d = Math.min(d, CFG.duration - d);
    return smooth((CFG.plateau + CFG.shoulder - d) / CFG.shoulder);
  });
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((w) => w / sum);
}

function ecg(u: number): number {
  return (
    gauss(u, 0.3, 0.045, 15) +
    gauss(u, 0.46, 0.013, -14) +
    gauss(u, 0.5, 0.016, 124) +
    gauss(u, 0.545, 0.016, -30) +
    gauss(u, 0.685, 0.055, 24)
  );
}

// --- shared geometry ---------------------------------------------------------

// Safe area: every discrete element stays inside x ∈ [900, 1800], y ∈ [200, 880]
// so object-cover cropping (wide or tall viewports) never clips a device or card.
const COLX = [1060, 1330, 1600]; // where the data gathers into the net
const LAP = { x: 1090, y: 250, w: 560, h: 348, r: 22 };
const PHN = { x: 1548, y: 336, w: 210, h: 430, r: 34 };
const LANE0 = 380;
const LANE_GAP = 40;

// --- per-scene line shapes (every one keeps travelling right) ----------------

function yFlow(i: number, x: number, t: number): number {
  return (
    CY[i] +
    envR(x) *
      (46 * Math.sin(x * 0.0037 - TAU * 5 * t + i * 1.9) +
        16 * Math.sin(x * 0.009 + TAU * 3 * t + i * 2.6))
  );
}

function yData(i: number, x: number, t: number): number {
  return (
    CY[i] +
    envR(x) *
      (26 * Math.sin(x * 0.0062 - TAU * 7 * t + i * 2.1) +
        9 * Math.sin(x * 0.014 - TAU * 5 * t + i))
  );
}

// The net rides the lines: gentle travelling wave, slightly separated lanes —
// nodes will track these live, so the whole net drifts and breathes.
const CYN = [415, 545, 675, 805];
function yNet(i: number, x: number, t: number): number {
  return (
    CYN[i] +
    envR(x) *
      (14 * Math.sin(x * 0.0032 - TAU * 4 * t + i * 1.6) +
        6 * Math.sin(x * 0.008 - TAU * 6 * t + i * 2.8))
  );
}

function yPulse(i: number, x: number, t: number): number {
  if (i === 1) {
    const amp = 0.3 + 0.7 * sstep(480, 1080, x);
    const u = frac(x / 420 - t * CFG.beats);
    return 600 - ecg(u) * amp;
  }
  if (i === 0) {
    const breath = 0.5 + 0.5 * Math.sin(TAU * 4 * t - Math.PI / 2);
    return 430 + envR(x) * (14 + 30 * breath) * Math.sin(x * 0.006 - TAU * 3 * t);
  }
  const flat = [0, 0, 726, 800][i];
  return flat + envR(x) * 6 * Math.sin(x * 0.006 - TAU * 3 * t + i * 2.4);
}

function yTrend(i: number, x: number, t: number): number {
  const base = 820 - i * 55;
  const rise = sstep(340, 1700, x) * (400 - i * 70);
  const wob = envR(x) * 16 * Math.sin(x * 0.005 + i * 2 - TAU * 4 * t);
  return base - rise + wob;
}

function yDevice(i: number, x: number, t: number): number {
  const lane = LANE0 + i * LANE_GAP;
  const s = sstep(560, LAP.x + 30, x);
  const inScreen =
    sstep(LAP.x, LAP.x + 80, x) * (1 - sstep(LAP.x + LAP.w - 40, LAP.x + LAP.w + 60, x));
  const wave = lerp(6, 13, inScreen) * Math.sin(x * 0.016 - TAU * 8 * t + i * 1.8);
  return lerp(CY[i], lane, s) + envR(x) * wave * lerp(0.4, 1, s);
}

const SHAPES = [yFlow, yData, yNet, yPulse, yTrend, yDevice];

const LINE_ALPHA: number[][] = [
  // flow data net  pulse trend device
  [1, 1, 0.95, 1, 1, 1],
  [1, 1, 0.95, 1, 1, 1],
  [0.9, 0.9, 0.8, 0.15, 0.9, 0.8],
  [0.85, 0.85, 0.7, 0.12, 0.85, 0.75],
];

function yBlend(i: number, x: number, w: number[], t: number): number {
  let y = 0;
  for (let p = 0; p < PHASES; p++) {
    if (w[p] > 0.0005) y += w[p] * SHAPES[p](i, x, t);
  }
  return y;
}

function buildPath(i: number, w: number[], t: number): string {
  const pts: string[] = [];
  for (let x = -40; x <= VW + 40; x += 5) {
    pts.push(`${x === -40 ? "M" : "L"}${x},${yBlend(i, x, w, t).toFixed(2)}`);
  }
  return pts.join(" ");
}

// Point on a quadratic bezier.
function qPoint(
  x1: number, y1: number, cx: number, cy: number, x2: number, y2: number, u: number
) {
  const a = (1 - u) * (1 - u);
  const b = 2 * (1 - u) * u;
  const c = u * u;
  return { x: a * x1 + b * cx + c * x2, y: a * y1 + b * cy + c * y2 };
}

// --- scenes ------------------------------------------------------------------

/**
 * Data + network as ONE continuous act:
 * dots surface on the lines, then slide ALONG the lines into three columns
 * where they become the nodes of a living net. Links are soft curves drawn in
 * a left-to-right cascade; small signals travel them. Nothing pops — every
 * opacity is slaved to the scene weights.
 */
const DataToNet: React.FC<{ w: number[]; t: number }> = ({ w, t }) => {
  const wd = w[1];
  const wn = w[2];
  const presence = clamp01((wd + wn) * 1.5);
  if (presence < 0.02) return null;

  // how far dots have migrated into their columns
  const m = smooth(wn / (wd + wn + 1e-6));

  // node positions (live — they ride the blended lines)
  const nodes = COLX.map((cx) => new Array(4).fill(0).map((_, i) => ({
    x: cx,
    y: yBlend(i, cx, w, t),
  })));

  // grid dots per line, each assigned to its nearest column
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < 4; i++) {
    for (let k = 0; k < 10; k++) {
      const gx = 900 + k * 80;
      const col = gx < 1190 ? 0 : gx < 1460 ? 1 : 2;
      const x = lerp(gx, COLX[col], m);
      const y = yBlend(i, x, w, t);
      const stagger = smooth(clamp01(wd * 1.7 - rand(i * 13 + k) * 0.5));
      const o = Math.max(stagger * clamp01(wd * 1.6), smooth(clamp01(wn * 1.6)));
      if (o < 0.02) continue;
      dots.push(
        <circle
          key={`d${i}-${k}`}
          cx={x}
          cy={y}
          r={3.6}
          fill={LINE_COLORS[i]}
          opacity={o * (i > 1 ? 0.55 : 0.95)}
        />
      );
    }
  }

  // curved links between columns, drawn in cascade
  const links: React.ReactNode[] = [];
  const linkOn = smooth(clamp01(wn * 1.6));
  if (linkOn > 0.02) {
    for (let c = 0; c < COLX.length - 1; c++) {
      const draw = smooth(clamp01(wn * 2.1 - c * 0.28));
      if (draw < 0.02) continue;
      for (let a = 0; a < 4; a++) {
        for (let b = 0; b < 4; b++) {
          const n1 = nodes[c][a];
          const n2 = nodes[c + 1][b];
          const len = Math.hypot(n2.x - n1.x, n2.y - n1.y);
          links.push(
            <path
              key={`l${c}-${a}-${b}`}
              d={`M${n1.x},${n1.y} Q${(n1.x + n2.x) / 2},${(n1.y + n2.y) / 2 + 16} ${n2.x},${n2.y}`}
              fill="none"
              stroke={GHOST}
              strokeWidth={1.1}
              opacity={linkOn}
              strokeDasharray={len * 1.02}
              strokeDashoffset={(len * 1.02) * (1 - draw)}
            />
          );
        }
      }
    }
  }

  // signals travelling a few links — faded by the same weight, never popping
  const pulses: React.ReactNode[] = [];
  if (linkOn > 0.05) {
    const routes = [
      { c: 0, a: 1, b: 0, k: 5, ph: 0.0 },
      { c: 0, a: 2, b: 1, k: 6, ph: 0.35 },
      { c: 1, a: 0, b: 1, k: 5, ph: 0.6 },
      { c: 1, a: 1, b: 2, k: 7, ph: 0.15 },
      { c: 1, a: 3, b: 1, k: 6, ph: 0.82 },
    ];
    for (let r = 0; r < routes.length; r++) {
      const { c, a, b, k, ph } = routes[r];
      const n1 = nodes[c][a];
      const n2 = nodes[c + 1][b];
      const u = frac(t * k + ph);
      const p = qPoint(n1.x, n1.y, (n1.x + n2.x) / 2, (n1.y + n2.y) / 2 + 16, n2.x, n2.y, u);
      pulses.push(
        <circle
          key={`p${r}`}
          cx={p.x}
          cy={p.y}
          r={3.4}
          fill={ACCENT}
          opacity={linkOn * Math.sin(Math.PI * u) * 0.85}
        />
      );
    }
  }

  // soft halo rings make the gathered dots read as nodes
  const halos = linkOn > 0.02
    ? nodes.flat().map((n, k) => (
        <circle
          key={`h${k}`}
          cx={n.x}
          cy={n.y}
          r={10.5}
          fill="none"
          stroke={k % 5 === 2 ? ACCENT : FOG}
          strokeWidth={1.4}
          opacity={linkOn * 0.9}
        />
      ))
    : null;

  return (
    <g>
      {links}
      {pulses}
      {dots}
      {halos}
      {/* quiet sampling ruler, only while the dots surface */}
      <g opacity={clamp01(wd * 1.4) * 0.8}>
        <line x1={940} y1={866} x2={1560} y2={866} stroke={GHOST} strokeWidth={1.5} />
        {new Array(14).fill(0).map((_, k) => (
          <line
            key={k}
            x1={940 + k * 48}
            y1={866}
            x2={940 + k * 48}
            y2={866 + (k % 5 === 0 ? 13 : 7)}
            stroke={FOG}
            strokeWidth={1.5}
          />
        ))}
      </g>
    </g>
  );
};

/** Vitals: a hairline ring breathing exactly with the ink line, and the BPM
 *  readout for the beating accent line. No flares, no glows. */
const Vitals: React.FC<{ w: number[]; t: number }> = ({ w, t }) => {
  const o = smooth(clamp01(w[3] * 1.4));
  if (o < 0.02) return null;
  const breath = 0.5 + 0.5 * Math.sin(TAU * 4 * t - Math.PI / 2);
  const r = 52 + 26 * breath;
  const bpm = 62 + Math.round(5 * Math.sin(TAU * 2 * t));
  // the ring rides the ink line, even while scenes blend
  const ringY = yBlend(0, 1380, w, t);
  return (
    <g opacity={o}>
      <g transform={`translate(1380, ${ringY.toFixed(1)})`}>
        <circle r={r} fill="none" stroke={FOG} strokeWidth={1.8} />
        <circle r={4} fill={INK} />
      </g>
      <g fontFamily="Menlo, monospace">
        {/* sits right of the trend card's column so the two never collide
            while the scenes cross-fade */}
        <circle cx={1602} cy={690} r={5} fill={ACCENT} />
        <text x={1620} y={698} fontSize={26} fill={INK}>
          {bpm} BPM
        </text>
        <text x={1620} y={725} fontSize={14} fill={GRAY} letterSpacing={2.5}>
          LIVE — RESTING
        </text>
      </g>
    </g>
  );
};

/** Trend: dots ride the rising accent line; the stats live in a quiet widget
 *  card below, out of the lines' way. */
const Trend: React.FC<{ w: number[]; t: number }> = ({ w, t }) => {
  const o = smooth(clamp01(w[4] * 1.35));
  if (o < 0.02) return null;
  const lift = 26 * (1 - o);
  const C = { x: 1150, y: 610, w: 370, h: 200, r: 20 };
  return (
    <g opacity={o}>
      {/* markers on the protagonist line */}
      {new Array(7).fill(0).map((_, k) => {
        const x = 1130 + k * 95;
        return (
          <circle
            key={k}
            cx={x}
            cy={yBlend(1, x, w, t)}
            r={4.2}
            fill="#FFFFFF"
            stroke={ACCENT}
            strokeWidth={2.3}
          />
        );
      })}
      {/* stats widget */}
      <g transform={`translate(0, ${lift})`}>
        <rect
          x={C.x}
          y={C.y}
          width={C.w}
          height={C.h}
          rx={C.r}
          fill="#FFFFFF"
          opacity={0.94}
        />
        <rect
          x={C.x}
          y={C.y}
          width={C.w}
          height={C.h}
          rx={C.r}
          fill="none"
          stroke={GHOST}
          strokeWidth={1.5}
        />
        <g fontFamily="Menlo, monospace">
          <text x={C.x + 28} y={C.y + 42} fontSize={13} fill={GRAY} letterSpacing={2.5}>
            WEEKLY TREND
          </text>
          <text x={C.x + 28} y={C.y + 86} fontSize={34} fill={INK}>
            +24%
          </text>
        </g>
        {new Array(8).fill(0).map((_, k) => {
          const h = (24 + rand(k * 13 + 5) * 56) * o;
          return (
            <rect
              key={k}
              x={C.x + 28 + k * 42}
              y={C.y + C.h - 32 - h}
              width={22}
              height={h}
              rx={6}
              fill={k === 6 ? ACCENT : "#EFEFED"}
            />
          );
        })}
        <line
          x1={C.x + 28}
          y1={C.y + C.h - 30}
          x2={C.x + C.w - 28}
          y2={C.y + C.h - 30}
          stroke={GHOST}
          strokeWidth={1.5}
        />
      </g>
    </g>
  );
};

/** Laptop shell drawn UNDER the lines — its screen is a live dashboard the
 *  lines run through. */
const LaptopBack: React.FC<{ w: number }> = ({ w }) => {
  const o = smooth(clamp01(w * 1.4));
  if (o < 0.02) return null;
  const draw = smooth(clamp01(w * 1.3));
  const perim = 2 * (LAP.w + LAP.h);
  return (
    <g opacity={o}>
      <rect x={LAP.x} y={LAP.y} width={LAP.w} height={LAP.h} rx={LAP.r} fill="#FFFFFF" opacity={0.9} />
      <rect
        x={LAP.x} y={LAP.y} width={LAP.w} height={LAP.h} rx={LAP.r}
        fill="none" stroke={INK} strokeWidth={2.4}
        strokeDasharray={perim} strokeDashoffset={perim * (1 - draw)}
      />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={LAP.x + 26 + k * 18} cy={LAP.y + 24} r={4.5} fill={GHOST} />
      ))}
      <line x1={LAP.x} y1={LAP.y + 44} x2={LAP.x + LAP.w} y2={LAP.y + 44} stroke={GHOST} strokeWidth={1.4} />
      {[0, 1, 2, 3].map((k) => (
        <rect
          key={k}
          x={LAP.x + 26}
          y={LAP.y + 72 + k * 34}
          width={k === 0 ? 92 : 70 - k * 8}
          height={11}
          rx={5.5}
          fill={k === 0 ? "#E3E3E1" : GHOST}
        />
      ))}
      <line x1={LAP.x + 144} y1={LAP.y + 44} x2={LAP.x + 144} y2={LAP.y + LAP.h} stroke={GHOST} strokeWidth={1.4} />
      <rect x={LAP.x - 52} y={LAP.y + LAP.h + 6} width={LAP.w + 104} height={11} rx={5.5} fill="#EDEDEB" />
    </g>
  );
};

/** Phone in front — the journey's data, now a product. */
const PhoneFront: React.FC<{ w: number; t: number }> = ({ w, t }) => {
  const o = smooth(clamp01(w * 1.4));
  if (o < 0.02) return null;
  const draw = smooth(clamp01(w * 1.3));
  const perim = 2 * (PHN.w + PHN.h);
  const RC = 2 * Math.PI * 34;
  const shimmer = frac(t * 5);
  let spark = "";
  for (let k = 0; k <= 40; k++) {
    const x = PHN.x + 30 + (k / 40) * (PHN.w - 60);
    const u = frac(k / 14 - t * 10);
    const y = PHN.y + 318 - ecg(u) * 0.22;
    spark += `${k === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)} `;
  }
  return (
    <g opacity={o}>
      <rect x={PHN.x} y={PHN.y} width={PHN.w} height={PHN.h} rx={PHN.r} fill="#FFFFFF" opacity={0.97} />
      <rect
        x={PHN.x} y={PHN.y} width={PHN.w} height={PHN.h} rx={PHN.r}
        fill="none" stroke={INK} strokeWidth={2.6}
        strokeDasharray={perim} strokeDashoffset={perim * (1 - draw)}
      />
      <rect x={PHN.x + PHN.w / 2 - 30} y={PHN.y + 16} width={60} height={8} rx={4} fill={GHOST} />
      <g transform={`translate(${PHN.x + 62}, ${PHN.y + 96})`}>
        <circle r={34} fill="none" stroke={GHOST} strokeWidth={7.5} />
        <circle
          r={34} fill="none" stroke={ACCENT} strokeWidth={7.5} strokeLinecap="round"
          strokeDasharray={RC} strokeDashoffset={RC * (1 - 0.84 * draw)}
          transform="rotate(-90)"
        />
        <text y={7} textAnchor="middle" fontFamily="Menlo, monospace" fontSize={20} fill={INK}>
          84
        </text>
      </g>
      <g fontFamily="Menlo, monospace">
        <text x={PHN.x + 114} y={PHN.y + 92} fontSize={12} fill={GRAY} letterSpacing={2}>
          WELLNESS
        </text>
        <text x={PHN.x + 114} y={PHN.y + 114} fontSize={17} fill={INK}>
          Synced
        </text>
        <circle cx={PHN.x + 186} cy={PHN.y + 109} r={4} fill={ACCENT} />
      </g>
      {[0, 1].map((k) => {
        const cy0 = PHN.y + 152 + k * 62;
        return (
          <g key={k}>
            <rect x={PHN.x + 24} y={cy0} width={PHN.w - 48} height={46} rx={12} fill="#F4F4F2" />
            <rect x={PHN.x + 38} y={cy0 + 13} width={64 - k * 14} height={8} rx={4} fill="#E2E2E0" />
            <rect x={PHN.x + 38} y={cy0 + 28} width={104 - k * 22} height={8} rx={4} fill="#EBEBE9" />
            <rect
              x={PHN.x + 24 + shimmer * (PHN.w - 48 - 34)}
              y={cy0} width={34} height={46} rx={12}
              fill="#FFFFFF" opacity={0.6}
            />
          </g>
        );
      })}
      <path d={spark} fill="none" stroke={ACCENT} strokeWidth={2.2} strokeLinecap="round" />
      <rect x={PHN.x + 24} y={PHN.y + 356} width={86} height={8} rx={4} fill="#EBEBE9" />
      <rect x={PHN.x + 24} y={PHN.y + 372} width={56} height={8} rx={4} fill="#F1F1EF" />
    </g>
  );
};

/** Sparse, constant drifting motes — right side only, no flicker. */
const Motes: React.FC<{ t: number }> = ({ t }) => (
  <g opacity={0.8}>
    {new Array(12).fill(0).map((_, k) => {
      const speed = 1 + Math.floor(rand(k * 11 + 4) * 2);
      const x = 900 + frac(rand(k * 17 + 9) + t * speed) * 900;
      const y = 220 + rand(k * 23 + 6) * 640 + 10 * Math.sin(TAU * (t * 2 + rand(k)));
      return <circle key={k} cx={x} cy={y} r={1.8} fill="#E4E4E2" />;
    })}
  </g>
);

// --- composition -------------------------------------------------------------

export type HeroFlowProps = {
  plateau?: number;
  shoulder?: number;
  beats?: number;
};

export const HeroFlow: React.FC<HeroFlowProps> = ({
  plateau = 22,
  shoulder = 100,
  beats = 16,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  CFG.duration = durationInFrames;
  CFG.plateau = plateau;
  CFG.shoulder = shoulder;
  CFG.beats = beats;
  const t = frame / durationInFrames;
  const w = phaseWeights(frame);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${VW} ${VH}`} style={{ display: "block" }}>
        <Motes t={t} />
        <LaptopBack w={w[5]} />
        {LINE_COLORS.map((color, i) => {
          const alpha = w.reduce((acc, wp, p) => acc + wp * LINE_ALPHA[i][p], 0);
          return (
            <path
              key={i}
              d={buildPath(i, w, t)}
              fill="none"
              stroke={color}
              strokeWidth={LINE_WIDTHS[i]}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={alpha}
            />
          );
        })}
        <DataToNet w={w} t={t} />
        <Vitals w={w} t={t} />
        <Trend w={w} t={t} />
        <PhoneFront w={w[5]} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
