"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A tile field that lifts and ripples under the cursor.
 *
 * Raw WebGL, no dependencies: the fragment shader walks the grid with a 2D DDA
 * (Amanatides–Woo) and intersects the box standing in each cell, so tile edges
 * come out exact instead of approximated by a distance field.
 */
export type GridRiseProps = {
  /** Base tile colour, darkened automatically on side faces. */
  color?: string;
  /** How much darker the side faces read than the tops. */
  relief?: number;
  /** Colour blended into tiles nearest the cursor. */
  accent?: string;
  /** Backdrop colour the grid fades into. */
  background?: string;
  /** How strongly the accent tints lifted tiles. */
  accentStrength?: number;
  /** Width of one grid cell in world units. */
  cellSize?: number;
  /** Fraction of each cell left empty as a seam. */
  gap?: number;
  /** Height of the idle bobbing near the cursor. */
  amplitude?: number;
  /** Steady rise applied to tiles under the cursor. */
  lift?: number;
  /** Radius of the cursor's influence. */
  liftRadius?: number;
  /** Multiplier for the bobbing rate. */
  speed?: number;
  /** Lens length; higher flattens the perspective. */
  zoom?: number;
  /** Camera angle around the grid in degrees. */
  orbit?: number;
  /** Camera distance from the centre. */
  distance?: number;
  /** Camera height above the grid. */
  altitude?: number;
  /** How much of the depth fades into the background. */
  haze?: number;
  /** Pixel ratio ceiling. */
  dpr?: number;
  /** Upper bound on rendered frames per second. */
  maxFps?: number;
  /** Radius of the idle orbit used before the cursor arrives. */
  drift?: number;
  /** How fast the idle orbit is travelled. */
  driftSpeed?: number;
  /**
   * Sweep back and forth along this world-space vector instead of orbiting.
   * The camera is rotated, so a straight line on screen is not a straight line
   * in world units: solve the axis against the projection rather than guessing.
   */
  driftAxis?: [number, number];
  /** How quickly the focus catches up to the cursor. */
  ease?: number;
  /** Where the raised region sits before the pointer arrives, in world units. */
  origin?: [number, number];
  /** Let the pointer steer the raised region. */
  interactive?: boolean;
  /** Freeze the animation clock. */
  paused?: boolean;
  /** Classes applied to the wrapper. */
  className?: string;
  /** Overlay content rendered above the grid. */
  children?: ReactNode;
};

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uFocus;
uniform float uCell, uGap, uLift, uAmp, uLiftRadius, uSpeed;
uniform float uZoom, uOrbit, uDist, uAlt, uHaze, uRelief, uAccentStrength;
uniform vec3  uColor, uAccent, uBg;

const int MAX_STEPS = 96;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.31, 289.17))) * 43758.5453);
}

/* Height of the tile standing in cell "cid"; "infl" reports how much of that
   height comes from the cursor, so shading can tint exactly those tiles. */
float cellHeight(vec2 cid, out float infl) {
  vec2 c = (cid + 0.5) * uCell;
  float d = distance(c, uFocus);
  float f = 1.0 - smoothstep(0.0, uLiftRadius, d);
  f *= f;
  float ripple = 0.5 + 0.5 * sin(d * 26.0 - uTime * uSpeed * 2.6);
  infl = f;
  return 0.0035 + uLift * f + uAmp * f * ripple + 0.012 * hash(cid) * f;
}

/* Slab test against the box standing in one cell. Returns the hit distance, or
   -1.0, and reports the face normal. */
float boxHit(vec3 ro, vec3 rd, vec2 cid, float h, out vec3 n) {
  float seam = uCell * uGap * 0.5;
  vec2 lo = cid * uCell + seam;
  vec2 hi = (cid + 1.0) * uCell - seam;

  vec3 bmin = vec3(lo.x, 0.0, lo.y);
  vec3 bmax = vec3(hi.x, h, hi.y);

  vec3 inv = 1.0 / rd;
  vec3 t0 = (bmin - ro) * inv;
  vec3 t1 = (bmax - ro) * inv;
  vec3 tsm = min(t0, t1);
  vec3 tbg = max(t0, t1);

  float tn = max(max(tsm.x, tsm.y), tsm.z);
  float tf = min(min(tbg.x, tbg.y), tbg.z);
  if (tf < max(tn, 0.0)) return -1.0;

  n = -sign(rd) * step(tsm.yzx, tsm.xyz) * step(tsm.zxy, tsm.xyz);
  return tn;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float a = radians(uOrbit);
  /* The camera stays put: letting it chase the focus keeps the raised region
     pinned to the middle of the frame, so the cursor appears to do nothing. */
  vec3 tgt = vec3(0.0);
  vec3 eye = tgt + vec3(cos(a) * uDist, uAlt, sin(a) * uDist);

  vec3 fw = normalize(tgt - eye);
  vec3 rt = normalize(cross(fw, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(rt, fw);
  vec3 rd = normalize(fw * uZoom + rt * uv.x + up * uv.y);
  vec3 ro = eye;

  vec3 col = uBg;

  /* Skip the empty air above the tallest possible tile. */
  float ceilH = 0.0035 + uLift + uAmp + 0.012;
  float t = 0.0;
  if (ro.y > ceilH) {
    if (rd.y >= -0.0001) { gl_FragColor = vec4(uBg, 1.0); return; }
    t = (ceilH - ro.y) / rd.y;
  }

  /* 2D DDA across the grid, one cell at a time. */
  vec3 p = ro + rd * t;
  vec2 cid = floor(p.xz / uCell);
  vec2 stp = sign(rd.xz);
  vec2 dt = abs(uCell / max(abs(rd.xz), vec2(1e-6)));
  vec2 nextEdge = (cid + max(stp, 0.0)) * uCell;
  vec2 tmax = t + (nextEdge - p.xz) / (rd.xz + vec2(1e-6) * (1.0 - abs(stp)));

  float hitT = -1.0;
  vec3 hitN = vec3(0.0);
  float hitInfl = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    float infl;
    float h = cellHeight(cid, infl);
    vec3 n;
    float bt = boxHit(ro, rd, cid, h, n);
    if (bt > 0.0 && bt <= min(tmax.x, tmax.y) + 1e-4) {
      hitT = bt; hitN = n; hitInfl = infl;
      break;
    }
    if (tmax.x < tmax.y) {
      cid.x += stp.x; t = tmax.x; tmax.x += dt.x;
    } else {
      cid.y += stp.y; t = tmax.y; tmax.y += dt.y;
    }
    if (ro.y + rd.y * t < -0.001) break;
  }

  if (hitT > 0.0) {
    float top = step(0.5, hitN.y);
    /* Side faces read darker, and the two side orientations differ slightly so
       the tiles keep their volume against a flat background. */
    float side = 1.0 - uRelief * (0.75 + 0.25 * abs(hitN.z));
    col = uColor * mix(side, 1.0, top);
    col = mix(col, uAccent, uAccentStrength * hitInfl * (0.4 + 0.6 * top));
    float fog = 1.0 - exp(-uHaze * hitT * hitT * 0.22);
    col = mix(col, uBg, clamp(fog, 0.0, 1.0));
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function GridRise({
  color = "#BDBDBD",
  relief = 0.52,
  accent = "#FF4D00",
  background = "#FFFFFF",
  accentStrength = 0.6,
  cellSize = 0.05,
  gap = 0.18,
  amplitude = 0.038,
  lift = 0.065,
  liftRadius = 0.42,
  speed = 0.6,
  zoom = 4.6,
  orbit = 45,
  distance = 2.1,
  altitude = 1.3,
  haze = 0.95,
  dpr = 2,
  maxFps = 60,
  drift = 0.28,
  driftSpeed = 0.35,
  driftAxis,
  ease = 0.08,
  origin = [0, 0],
  interactive = true,
  paused = false,
  className = "",
  children,
}: GridRiseProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Props the render loop reads every frame, without re-creating the context.
  const propsRef = useRef({
    color, relief, accent, background, accentStrength, cellSize, gap,
    amplitude, lift, liftRadius, speed, zoom, orbit, distance, altitude,
    haze, dpr, maxFps, drift, driftSpeed, driftAxis, ease, origin,
    interactive, paused,
  });
  propsRef.current = {
    color, relief, accent, background, accentStrength, cellSize, gap,
    amplitude, lift, liftRadius, speed, zoom, orbit, distance, altitude,
    haze, dpr, maxFps, drift, driftSpeed, driftAxis, ease, origin,
    interactive, paused,
  };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let heldStill = false;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const U = {
      res: u("uRes"), time: u("uTime"), focus: u("uFocus"),
      cell: u("uCell"), gap: u("uGap"), lift: u("uLift"), amp: u("uAmp"),
      liftRadius: u("uLiftRadius"), speed: u("uSpeed"), zoom: u("uZoom"),
      orbit: u("uOrbit"), dist: u("uDist"), alt: u("uAlt"), haze: u("uHaze"),
      relief: u("uRelief"), accentStrength: u("uAccentStrength"),
      color: u("uColor"), accent: u("uAccent"), bg: u("uBg"),
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    const resize = () => {
      const p = propsRef.current;
      const ratio = Math.min(window.devicePixelRatio || 1, p.dpr);
      const w = Math.max(1, Math.round(host.clientWidth * ratio));
      const h = Math.max(1, Math.round(host.clientHeight * ratio));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();

    /* Assigning canvas.width blanks the drawing buffer, so every resize has to
       be followed by a frame. Without this a resize under reduced motion (or
       `paused`) leaves the canvas cleared to black for good, since the held
       still frame is never re-drawn. */
    const ro = new ResizeObserver(() => {
      resize();
      heldStill = false;
      render();
    });
    ro.observe(host);

    // Focus: eased toward the pointer, idling on a slow orbit around `origin`
    // until the pointer actually arrives.
    let focus: [number, number] = [...propsRef.current.origin] as [number, number];
    let target: [number, number] | null = null;

    const pointerToWorld = (clientX: number, clientY: number) => {
      const r = host.getBoundingClientRect();
      const p = propsRef.current;
      const uvx = (clientX - r.left - r.width / 2) / r.height;
      const uvy = -(clientY - r.top - r.height / 2) / r.height;

      const a = (p.orbit * Math.PI) / 180;
      const eye: [number, number, number] = [
        Math.cos(a) * p.distance,
        p.altitude,
        Math.sin(a) * p.distance,
      ];
      // Same basis as the shader, then intersect the ground plane.
      const fw = [-eye[0], -eye[1], -eye[2]];
      const fl = Math.hypot(fw[0], fw[1], fw[2]) || 1;
      const f = [fw[0] / fl, fw[1] / fl, fw[2] / fl];
      // cross(forward, worldUp) — the shader's right vector, sign included:
      // flipping it mirrors both axes and the field runs away from the cursor.
      const rt = [-f[2], 0, f[0]];
      const rl = Math.hypot(rt[0], rt[1], rt[2]) || 1;
      const r2 = [rt[0] / rl, rt[1] / rl, rt[2] / rl];
      const upv = [
        r2[1] * f[2] - r2[2] * f[1],
        r2[2] * f[0] - r2[0] * f[2],
        r2[0] * f[1] - r2[1] * f[0],
      ];
      const dir = [
        f[0] * p.zoom + r2[0] * uvx + upv[0] * uvy,
        f[1] * p.zoom + r2[1] * uvx + upv[1] * uvy,
        f[2] * p.zoom + r2[2] * uvx + upv[2] * uvy,
      ];
      if (dir[1] >= -1e-4) return null;
      const t = -eye[1] / dir[1];
      return [eye[0] + dir[0] * t, eye[2] + dir[2] * t] as [number, number];
    };

    const onMove = (e: PointerEvent) => {
      if (!propsRef.current.interactive) return;
      const world = pointerToWorld(e.clientX, e.clientY);
      if (world) target = world;
    };
    const onLeave = () => {
      target = null;
    };
    // Listening on the window keeps the field reacting while the pointer moves
    // over the headline sitting on top of it.
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    /* Whether the field is worth drawing. Checked per frame from the live rect
       rather than an IntersectionObserver: an observer that first fires while
       the element is hidden (a background tab, or the `hidden lg:block`
       wrapper on a narrow viewport) reports "not intersecting" and never
       corrects itself, leaving the canvas black. */
    const onScreen = () => {
      const r = host.getBoundingClientRect();
      return (
        r.width > 0 &&
        r.height > 0 &&
        r.bottom > 0 &&
        r.top < (window.innerHeight || 0)
      );
    };

    let raf = 0;
    let last = 0;
    let clock = 0;
    let prev = performance.now();

    /* One frame, straight to the GPU. Split out of the rAF loop so the first
       frame can be painted at mount: rAF does not run while the document is
       hidden, and without this the canvas would sit at its cleared black until
       the tab is first looked at. */
    const render = () => {
      const p = propsRef.current;

      if (target) {
        focus[0] += (target[0] - focus[0]) * p.ease;
        focus[1] += (target[1] - focus[1]) * p.ease;
      } else {
        const idle = clock * p.driftSpeed;
        /* Shaping the sweep: a plain sine coasts to a stop at each end and
           hangs there. Pushing it through a power > 1 keeps the travel around
           the middle — where the swell actually reads — and turns the ends into
           a quick dart in and back out. */
        const raw = Math.sin(idle);
        const swing = p.driftAxis
          ? Math.sign(raw) * Math.pow(Math.abs(raw), 1.6)
          : 0;
        const ox = p.driftAxis
          ? p.origin[0] + p.driftAxis[0] * swing
          : p.origin[0] + Math.cos(idle) * p.drift;
        const oy = p.driftAxis
          ? p.origin[1] + p.driftAxis[1] * swing
          : p.origin[1] + Math.sin(idle * 0.8) * p.drift * 0.6;
        focus[0] += (ox - focus[0]) * p.ease;
        focus[1] += (oy - focus[1]) * p.ease;
      }

      resize();

      gl.uniform2f(U.res, width, height);
      gl.uniform1f(U.time, clock);
      gl.uniform2f(U.focus, focus[0], focus[1]);
      gl.uniform1f(U.cell, p.cellSize);
      gl.uniform1f(U.gap, p.gap);
      gl.uniform1f(U.lift, p.lift);
      gl.uniform1f(U.amp, p.amplitude);
      gl.uniform1f(U.liftRadius, p.liftRadius);
      gl.uniform1f(U.speed, p.speed);
      gl.uniform1f(U.zoom, p.zoom);
      gl.uniform1f(U.orbit, p.orbit);
      gl.uniform1f(U.dist, p.distance);
      gl.uniform1f(U.alt, p.altitude);
      gl.uniform1f(U.haze, p.haze);
      gl.uniform1f(U.relief, p.relief);
      gl.uniform1f(U.accentStrength, p.accentStrength);
      gl.uniform3fv(U.color, hexToRgb(p.color));
      gl.uniform3fv(U.accent, hexToRgb(p.accent));
      gl.uniform3fv(U.bg, hexToRgb(p.background));

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const p = propsRef.current;

      const still = p.paused || reduce.matches;
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      if (document.hidden || !onScreen()) return;
      /* Frozen by `paused` or by the reader's reduced-motion setting: paint one
         frame and hold it, rather than re-uploading the same uniforms forever. */
      if (still) {
        if (!heldStill) {
          heldStill = true;
          render();
        }
        return;
      }
      heldStill = false;

      const minGap = 1000 / Math.max(1, p.maxFps);
      if (now - last < minGap) return;
      last = now;

      clock += dt;
      render();
    };

    render();
    raf = requestAnimationFrame(frame);

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div ref={hostRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
      {children}
    </div>
  );
}
