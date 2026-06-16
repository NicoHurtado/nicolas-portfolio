"use client";

import { useEffect, useRef } from "react";

/**
 * A real (tiny) feed-forward network animated as a live inference + training loop.
 *  - layers 5 → 7 → 7 → 4, Xavier-initialised weights + biases
 *  - each "sample": random input, true forward pass (sigmoid hidden, softmax out)
 *  - the result is revealed layer-by-layer so you watch information flow through
 *  - neuron brightness = activation, line warmth/width = weight sign/magnitude
 *  - floating cards show the actual z = Σwᵢaᵢ+b and σ(z) for the firing neuron
 *  - a small HUD tells the story of training: epoch ↑, loss ↓, accuracy ↑
 */

type Node = { x: number; y: number; act: number; lit: number; hover: number };

// palette (matches tailwind theme)
const WARM = "204,120,92"; // clay  → excitatory (+)
const WARM_HI = "248,224,196"; // bright core / positive pulse
const COOL = "126,148,172"; // slate → inhibitory (−)
const COOL_HI = "168,196,224";
const CREAM = "243,238,227";
const MUTED = "163,156,140";

const LAYERS = [5, 7, 7, 4];
const LAYER_CAPTIONS = ["input", "hidden", "hidden", "output"];
const OUT_LABELS = ["Data", "ML · AI", "Backend", "Insight"];

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export default function HeroCanvas() {
  const dotsRef = useRef<HTMLCanvasElement>(null);
  const netRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cd = dotsRef.current;
    const cn = netRef.current;
    if (!cd || !cn) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;

    // pointer in client coords; converted to canvas-local each frame (scroll-safe)
    let pointerX = -1,
      pointerY = -1,
      mx = -1,
      my = -1;

    let L: Node[][] = [];
    let W: number[][][] = []; // W[li][a][b] weight in/out of layers
    let B: number[][] = []; // B[li][j] bias (per non-input layer, index by li≥1)

    let D = { w: 0, h: 0, x: cd.getContext("2d")! };
    let N = { w: 0, h: 0, x: cn.getContext("2d")! };
    let compact = false; // narrow screens → ambient network only (no text overlays)

    const fit = (c: HTMLCanvasElement) => {
      const r = c.getBoundingClientRect();
      c.width = r.width * DPR;
      c.height = r.height * DPR;
      const x = c.getContext("2d")!;
      x.setTransform(DPR, 0, 0, DPR, 0, 0);
      return { w: r.width, h: r.height, x };
    };

    const build = () => {
      D = fit(cd);
      N = fit(cn);
      compact = N.w < 400;

      // nodes laid out in columns
      L = [];
      const cols = LAYERS.length;
      for (let li = 0; li < cols; li++) {
        const nn = LAYERS[li];
        const arr: Node[] = [];
        for (let i = 0; i < nn; i++) {
          arr.push({
            x: N.w * (0.3 + li * (0.5 / (cols - 1))),
            y: N.h * (0.3 + (0.54 * i) / (nn - 1)),
            act: 0,
            lit: 0,
            hover: 0,
          });
        }
        L.push(arr);
      }

      // Xavier-ish weights + small biases — stable for the session
      W = [];
      B = [[]]; // input layer has no bias
      for (let li = 0; li < L.length - 1; li++) {
        const nin = L[li].length,
          nout = L[li + 1].length;
        const lim = Math.sqrt(6 / (nin + nout));
        const mat: number[][] = [];
        for (let a = 0; a < nin; a++) {
          const row: number[] = [];
          for (let b = 0; b < nout; b++) row.push(rand(-lim, lim) * 1.7);
          mat.push(row);
        }
        W.push(mat);
        B.push(Array.from({ length: nout }, () => rand(-0.4, 0.4)));
      }

      newSample(true);
    };

    // ── inference state ───────────────────────────────────────────────
    // a sample is computed fully (real math) then revealed transition-by-transition
    type Card = { li: number; j: number; z: number; a: number; bias: number; t: number };
    let revLi = 0; // transition currently animating (0..L.length-2)
    let revT = 0; // 0..1 progress of current transition
    let phase: "reveal" | "hold" = "reveal";
    let holdT = 0;
    let card: Card | null = null;
    let predicted = -1;

    // training story
    let epoch = 0;
    let loss = 0.92;
    let acc = 0.41;
    const lossHist: number[] = [];

    const REVEAL_DUR = 0.95; // seconds per layer transition
    const HOLD_DUR = 2.1; // seconds to admire the prediction

    const newSample = (first = false) => {
      // random input features in [0,1]
      for (const nd of L[0]) {
        nd.act = rand(0.06, 1);
        nd.lit = 1;
      }
      // forward pass
      for (let li = 1; li < L.length; li++) {
        const isOut = li === L.length - 1;
        const zs: number[] = [];
        for (let j = 0; j < L[li].length; j++) {
          let z = B[li][j];
          for (let a = 0; a < L[li - 1].length; a++) z += L[li - 1][a].act * W[li - 1][a][j];
          zs.push(z);
        }
        if (isOut) {
          const m = Math.max(...zs);
          const ex = zs.map((z) => Math.exp(z - m));
          const sum = ex.reduce((p, c) => p + c, 0);
          for (let j = 0; j < L[li].length; j++) L[li][j].act = ex[j] / sum;
          predicted = ex.indexOf(Math.max(...ex));
        } else {
          for (let j = 0; j < L[li].length; j++) L[li][j].act = sigmoid(zs[j]);
        }
        for (const nd of L[li]) nd.lit = 0; // not revealed yet
      }

      revLi = 0;
      revT = first ? 1 : 0;
      phase = "reveal";
      card = null;

      // advance the training narrative (asymptotic learning curve + noise)
      epoch += first ? 1 : 1;
      const tgtLoss = 0.07 + 0.83 * Math.exp(-epoch / 38);
      const tgtAcc = 0.99 - 0.6 * Math.exp(-epoch / 30);
      loss += (tgtLoss - loss) * 0.5 + rand(-0.012, 0.012);
      acc += (tgtAcc - acc) * 0.5 + rand(-0.006, 0.006);
      loss = Math.max(0.05, loss);
      acc = Math.min(0.998, Math.max(0, acc));
      lossHist.push(loss);
      if (lossHist.length > 46) lossHist.shift();

      if (first) {
        for (const layer of L) for (const nd of layer) nd.lit = 1;
        phase = "hold";
        holdT = HOLD_DUR;
      }
    };

    // when a hidden layer finishes revealing, pop a formula card on its top neuron
    const makeCard = (li: number) => {
      if (li === 0 || li >= L.length - 1) return; // only hidden layers
      let best = 0;
      for (let j = 1; j < L[li].length; j++) if (L[li][j].act > L[li][best].act) best = j;
      let z = B[li][best];
      for (let a = 0; a < L[li - 1].length; a++) z += L[li - 1][a].act * W[li - 1][a][best];
      card = { li, j: best, z, a: L[li][best].act, bias: B[li][best], t: 0 };
    };

    const step = (dt: number) => {
      if (phase === "hold") {
        holdT -= dt;
        if (holdT <= 0) newSample();
        return;
      }
      revT += dt / REVEAL_DUR;
      // light the target layer progressively
      const tgt = L[revLi + 1];
      const e = Math.min(1, revT);
      for (const nd of tgt) nd.lit = e * e * (3 - 2 * e); // smoothstep
      if (revT >= 1) {
        for (const nd of tgt) nd.lit = 1;
        makeCard(revLi + 1);
        revLi++;
        revT = 0;
        if (revLi >= L.length - 1) {
          phase = "hold";
          holdT = HOLD_DUR;
        }
      }
    };

    // ── background dot field (left of hero) — a slow, calm breathing wave ──
    const gap = 30;
    const drawDots = (t: number) => {
      const x = D.x,
        W2 = D.w,
        H = D.h;
      x.clearRect(0, 0, W2, H);
      for (let px = gap; px < W2; px += gap) {
        for (let py = gap; py < H; py += gap) {
          // low spatial frequency + slow t → gentle large-scale undulation
          const w = Math.sin(px * 0.006 + t) + Math.cos(py * 0.007 - t * 0.55);
          const lev = w * 0.5 + 0.5;
          const fr = px / W2;
          const fade = fr < 0.3 ? 1 : fr > 0.46 ? 0 : 1 - (fr - 0.3) / 0.16;
          if (fade <= 0) continue;
          // small opacity/size variance so it moves without flickering or shouting
          x.fillStyle = `rgba(${WARM},${(0.1 + lev * 0.11) * fade})`;
          x.beginPath();
          x.arc(px, py, 0.8 + lev * 0.8, 0, 7);
          x.fill();
        }
      }
    };

    // nearest edge to cursor (for weight tooltip)
    const nearEdge = () => {
      if (mx < 0) return null;
      let bestD = 7,
        hit: { li: number; a: number; b: number; mxp: number; myp: number } | null = null;
      for (let li = 0; li < L.length - 1; li++) {
        for (let a = 0; a < L[li].length; a++) {
          for (let b = 0; b < L[li + 1].length; b++) {
            const p = L[li][a],
              q = L[li + 1][b];
            const dx = q.x - p.x,
              dy = q.y - p.y;
            const len2 = dx * dx + dy * dy;
            let t = ((mx - p.x) * dx + (my - p.y) * dy) / len2;
            t = Math.max(0, Math.min(1, t));
            const cx = p.x + dx * t,
              cy = p.y + dy * t;
            const d = Math.hypot(mx - cx, my - cy);
            if (d < bestD) {
              bestD = d;
              hit = { li, a, b, mxp: cx, myp: cy };
            }
          }
        }
      }
      return hit;
    };

    // ── network render ────────────────────────────────────────────────
    const roundRect = (
      x: CanvasRenderingContext2D,
      rx: number,
      ry: number,
      w: number,
      h: number,
      r: number
    ) => {
      x.beginPath();
      x.moveTo(rx + r, ry);
      x.arcTo(rx + w, ry, rx + w, ry + h, r);
      x.arcTo(rx + w, ry + h, rx, ry + h, r);
      x.arcTo(rx, ry + h, rx, ry, r);
      x.arcTo(rx, ry, rx + w, ry, r);
      x.closePath();
    };

    const drawNet = (dt: number, t: number) => {
      const n = N.x;
      n.clearRect(0, 0, N.w, N.h);

      // layer captions
      if (!compact) {
        n.font = "10px ui-sans-serif, system-ui, sans-serif";
        n.textAlign = "center";
        for (let li = 0; li < L.length; li++) {
          const cx = L[li][0].x;
          n.fillStyle = `rgba(${MUTED},0.62)`;
          n.fillText(LAYER_CAPTIONS[li].toUpperCase(), cx, L[li][0].y - 26);
        }
        n.textAlign = "left";
      }

      // 1 — connections; opacity & width encode |weight|, warm=+ / cool=−
      //     the transition currently revealing gets animated pulses
      for (let li = 0; li < L.length - 1; li++) {
        const active = phase === "reveal" && li === revLi;
        for (let a = 0; a < L[li].length; a++) {
          for (let b = 0; b < L[li + 1].length; b++) {
            const w = W[li][a][b];
            const aw = Math.abs(w);
            const p = L[li][a],
              q = L[li + 1][b];
            const base = li < revLi || phase === "hold" ? 1 : 0.72; // resolved edges brighter
            n.strokeStyle =
              w >= 0
                ? `rgba(${WARM},${(0.11 + aw * 0.22) * base})`
                : `rgba(${COOL},${(0.1 + aw * 0.2) * base})`;
            n.lineWidth = 0.5 + aw * 1.25;
            n.beginPath();
            n.moveTo(p.x, p.y);
            n.lineTo(q.x, q.y);
            n.stroke();

            // travelling pulse along the active transition
            if (active) {
              const contrib = aw * L[li][a].act; // how much this edge carries
              if (contrib < 0.12) continue;
              const e = Math.min(1, revT);
              const hx = p.x + (q.x - p.x) * e,
                hy = p.y + (q.y - p.y) * e;
              const tp = Math.max(0, e - 0.3);
              const tx = p.x + (q.x - p.x) * tp,
                ty = p.y + (q.y - p.y) * tp;
              const col = w >= 0 ? WARM_HI : COOL_HI;
              const al = Math.min(0.9, contrib) * Math.sin(e * Math.PI);
              const grad = n.createLinearGradient(tx, ty, hx, hy);
              grad.addColorStop(0, `rgba(${col},0)`);
              grad.addColorStop(1, `rgba(${col},${al * 0.8})`);
              n.strokeStyle = grad;
              n.lineWidth = 1.2 + contrib * 1.8;
              n.beginPath();
              n.moveTo(tx, ty);
              n.lineTo(hx, hy);
              n.stroke();
              n.fillStyle = `rgba(${col},${al})`;
              n.beginPath();
              n.arc(hx, hy, 1.6 + contrib * 2.2, 0, 7);
              n.fill();
            }
          }
        }
      }

      // 2 — neurons
      for (let li = 0; li < L.length; li++) {
        const isOut = li === L.length - 1;
        for (let i = 0; i < L[li].length; i++) {
          const nd = L[li][i];

          // pointer proximity → eased hover
          let target = 0;
          if (mx >= 0) {
            const d = Math.hypot(nd.x - mx, nd.y - my);
            if (d < 56) target = 1 - d / 56;
          }
          nd.hover += (target - nd.hover) * Math.min(1, dt * 12);

          const reveal = nd.lit;
          const g = Math.max(0.22, nd.act * reveal); // brightness = activation, once revealed
          const s = 1 + nd.hover * 0.9;
          const ring = Math.max(reveal * nd.act, nd.hover);

          // outer halo
          n.fillStyle = `rgba(${WARM},${(0.07 + g * 0.22) * (0.55 + reveal * 0.45)})`;
          n.beginPath();
          n.arc(nd.x, nd.y, (5 + g * 7.5) * s, 0, 7);
          n.fill();
          // body
          n.fillStyle = `rgba(206,124,96,${0.46 + g * 0.5})`;
          n.beginPath();
          n.arc(nd.x, nd.y, (2.8 + g * 2.5) * s, 0, 7);
          n.fill();
          // bright core
          n.fillStyle = `rgba(${WARM_HI},${0.45 + g * 0.5})`;
          n.beginPath();
          n.arc(nd.x, nd.y, (1 + g * 0.9) * s, 0, 7);
          n.fill();
          // activation / hover ring
          if (ring > 0.12) {
            n.strokeStyle = `rgba(232,200,168,${ring * 0.5})`;
            n.lineWidth = 0.7;
            n.beginPath();
            n.arc(nd.x, nd.y, (4.6 + ring * 5) * s, 0, 7);
            n.stroke();
          }

          // input values to the left
          if (li === 0 && !compact) {
            n.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
            n.textAlign = "right";
            n.fillStyle = `rgba(${MUTED},${0.72 + nd.hover * 0.28})`;
            n.fillText(`x${i + 1}=${nd.act.toFixed(2)}`, nd.x - 12, nd.y + 3);
            n.textAlign = "left";
          }

          // output labels + probabilities to the right; winner glows
          if (isOut && !compact) {
            const win = i === predicted && phase === "hold";
            n.font = `${win ? "600 " : ""}11px ui-sans-serif, system-ui, sans-serif`;
            n.textAlign = "left";
            n.fillStyle = win
              ? `rgba(${WARM_HI},${0.6 + reveal * 0.4})`
              : `rgba(${CREAM},${0.58 + reveal * 0.4})`;
            n.fillText(OUT_LABELS[i], nd.x + 14, nd.y - 1);
            n.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
            n.fillStyle = `rgba(${MUTED},${0.66 + reveal * 0.34})`;
            n.fillText(`${(nd.act * 100).toFixed(0)}%`, nd.x + 14, nd.y + 10);
            if (win) {
              n.strokeStyle = `rgba(${WARM_HI},0.6)`;
              n.lineWidth = 1.1;
              n.beginPath();
              n.arc(nd.x, nd.y, 11 * s, 0, 7);
              n.stroke();
            }
          }
        }
      }

      // 3 — formula card for the firing neuron
      if (card && !compact) {
        card.t = Math.min(1, card.t + dt * 3.2);
        const nd = L[card.li][card.j];
        const cw = 138,
          ch = 50;
        let bx = nd.x + 16,
          by = nd.y - ch - 12;
        if (bx + cw > N.w - 6) bx = nd.x - cw - 16;
        if (by < 4) by = nd.y + 14;
        const al = card.t;
        n.fillStyle = `rgba(28,26,20,${0.82 * al})`;
        roundRect(n, bx, by, cw, ch, 7);
        n.fill();
        n.strokeStyle = `rgba(${WARM},${0.35 * al})`;
        n.lineWidth = 0.75;
        n.stroke();
        // connector line to neuron
        n.strokeStyle = `rgba(${WARM},${0.3 * al})`;
        n.beginPath();
        n.moveTo(nd.x, nd.y);
        n.lineTo(bx < nd.x ? bx + cw : bx, by + ch / 2);
        n.stroke();

        n.textAlign = "left";
        n.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
        n.fillStyle = `rgba(${MUTED},${0.85 * al})`;
        n.fillText(`h${card.li}·${card.j + 1}`, bx + 10, by + 14);
        n.fillStyle = `rgba(${CREAM},${0.92 * al})`;
        n.fillText(`z = Σ wᵢaᵢ + b = ${card.z.toFixed(2)}`, bx + 10, by + 28);
        n.fillStyle = `rgba(${WARM_HI},${0.95 * al})`;
        n.fillText(`σ(z) = ${card.a.toFixed(2)}`, bx + 10, by + 42);
      }

      // 4 — weight tooltip on hover
      const he = compact ? null : nearEdge();
      if (he) {
        const w = W[he.li][he.a][he.b];
        const txt = `w = ${w >= 0 ? "+" : ""}${w.toFixed(2)}`;
        n.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        const tw = n.measureText(txt).width + 14;
        n.fillStyle = "rgba(28,26,20,0.9)";
        roundRect(n, he.mxp + 8, he.myp - 9, tw, 18, 5);
        n.fill();
        n.strokeStyle = `rgba(${w >= 0 ? WARM : COOL},0.5)`;
        n.lineWidth = 0.75;
        n.stroke();
        n.fillStyle = `rgba(${CREAM},0.95)`;
        n.textAlign = "left";
        n.fillText(txt, he.mxp + 15, he.myp + 3.5);
      }

      if (!compact) drawHUD();
    };

    // ── training HUD: a metrics bar centred above the network ─────────
    const drawHUD = () => {
      const n = N.x;
      const cx = (L[0][0].x + L[L.length - 1][0].x) / 2;
      const topY = L[0][0].y;

      const labFont = "9px ui-sans-serif, system-ui, sans-serif";
      const valFont = "600 14px ui-sans-serif, system-ui, sans-serif";
      const pairs = [
        { lab: "epoch", val: `${epoch}`, col: CREAM },
        { lab: "loss", val: loss.toFixed(2), col: WARM_HI },
        { lab: "acc", val: `${(acc * 100).toFixed(0)}%`, col: WARM_HI },
      ];
      const GAP = 20,
        LV = 6,
        SPK = 46;
      const widths = pairs.map((p) => {
        n.font = labFont;
        const wl = n.measureText(p.lab).width;
        n.font = valFont;
        return wl + LV + n.measureText(p.val).width;
      });
      // layout: epoch | loss | sparkline | acc
      const total =
        widths[0] + GAP + widths[1] + GAP + SPK + GAP + widths[2];
      const rowY = topY - 62;
      const startX = cx - total / 2;

      // panel
      n.font = labFont;
      const headW = n.measureText("TRAINING · forward pass").width;
      const pw = Math.max(total, headW) + 36;
      const ph = 50;
      const px = cx - pw / 2;
      const py = rowY - 30;
      n.fillStyle = "rgba(28,26,20,0.6)";
      roundRect(n, px, py, pw, ph, 9);
      n.fill();
      n.strokeStyle = `rgba(${WARM},0.28)`;
      n.lineWidth = 0.75;
      n.stroke();

      // header
      n.textAlign = "center";
      n.fillStyle = `rgba(${MUTED},0.7)`;
      n.fillText("TRAINING · forward pass", cx, py + 16);

      // metrics row
      n.textAlign = "left";
      n.textBaseline = "middle";
      let x = startX;
      const drawPair = (p: (typeof pairs)[number], w: number) => {
        n.font = labFont;
        n.fillStyle = `rgba(${MUTED},0.7)`;
        n.fillText(p.lab, x, rowY + 1);
        const wl = n.measureText(p.lab).width;
        n.font = valFont;
        n.fillStyle = `rgba(${p.col},0.95)`;
        n.fillText(p.val, x + wl + LV, rowY);
        x += w;
      };
      drawPair(pairs[0], widths[0]);
      x += GAP;
      drawPair(pairs[1], widths[1]);
      x += GAP;
      // loss sparkline
      if (lossHist.length > 1) {
        const sw = SPK,
          sh = 15,
          sx = x,
          sy = rowY - sh / 2;
        const mx2 = Math.max(...lossHist),
          mn2 = Math.min(...lossHist);
        const rng = Math.max(0.001, mx2 - mn2);
        n.strokeStyle = `rgba(${WARM},0.78)`;
        n.lineWidth = 1.3;
        n.beginPath();
        lossHist.forEach((v, i) => {
          const lx = sx + (sw * i) / (lossHist.length - 1);
          const ly2 = sy + sh - ((v - mn2) / rng) * sh;
          i ? n.lineTo(lx, ly2) : n.moveTo(lx, ly2);
        });
        n.stroke();
      }
      x += SPK + GAP;
      drawPair(pairs[2], widths[2]);
      n.textBaseline = "alphabetic";

      // legend centred below the network
      const botY = N.h * 0.84 + 34;
      n.font = labFont;
      n.textAlign = "left";
      const segW = (label: string) => 16 + 6 + n.measureText(label).width;
      const lw = segW("+ weight") + 24 + segW("− weight");
      let lx = cx - lw / 2;
      const seg = (col: string, label: string) => {
        n.strokeStyle = `rgba(${col},0.8)`;
        n.lineWidth = 2;
        n.beginPath();
        n.moveTo(lx, botY);
        n.lineTo(lx + 16, botY);
        n.stroke();
        n.fillStyle = `rgba(${MUTED},0.7)`;
        n.fillText(label, lx + 22, botY + 3.5);
        lx += segW(label) + 24;
      };
      seg(WARM, "+ weight");
      seg(COOL, "− weight");
    };

    // ── loop ──────────────────────────────────────────────────────────
    let last = performance.now();
    let elapsed = 0;

    const frame = (now: number) => {
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05;
      elapsed += dt;

      if (pointerX >= 0) {
        const r = cn.getBoundingClientRect();
        mx = pointerX - r.left;
        my = pointerY - r.top;
      } else {
        mx = -1;
        my = -1;
      }

      drawDots(elapsed * 0.1);
      if (!reduce) step(dt);
      drawNet(dt, elapsed);
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };
    const onLeave = () => {
      pointerX = -1;
      pointerY = -1;
    };

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("blur", onLeave);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={dotsRef}
        className="absolute inset-0 h-full w-full z-[1]"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 hidden h-full w-[62%] z-[2] lg:block"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 26%, #000 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 26%, #000 100%)",
        }}
        aria-hidden="true"
      >
        <canvas ref={netRef} className="absolute inset-0 h-full w-full" />
      </div>
    </>
  );
}
