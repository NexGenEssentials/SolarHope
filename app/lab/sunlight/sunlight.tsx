"use client";
import React, { useEffect, useRef, useState } from "react";

// PROTOTYPE — "Sunlight in motion".
// A real installation photo rendered with WebGL. The visitor moves the sun
// (cursor, or finger on phones): light glints across the glass of the panels
// and the sky glows around the sun. Scrolling grades the same photo from
// midday to golden hour to dusk. Plain WebGL, no libraries. Falls back to the
// plain photo if WebGL is unavailable.

const VERT = `
attribute vec2 p;
varying vec2 v;
void main(){ v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
varying vec2 v;
uniform sampler2D img;
uniform vec2 res;     // canvas size (px)
uniform vec2 imgRes;  // image size (px)
uniform vec2 sun;     // sun position, 0..1 screen space (y up)
uniform float grade;  // 0 midday, 0.5 golden hour, 1 dusk
uniform float time;

vec2 cover(vec2 uv){
  float rs = res.x / res.y, ri = imgRes.x / imgRes.y;
  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  return (uv - 0.5) * s + 0.5;
}
float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }

void main(){
  vec2 uv = cover(v);
  vec2 tuv = vec2(uv.x, 1.0 - uv.y);
  vec3 c = texture2D(img, tuv).rgb;
  float l = luma(c);

  // Aspect-correct distance to the sun.
  vec2 a = vec2(res.x / res.y, 1.0);
  vec2 d = (v - sun) * a;
  float dist = length(d);

  // Glass of the panels: dark, slightly blue pixels.
  float panel = smoothstep(0.24, 0.08, l) * smoothstep(-0.03, 0.04, c.b - c.r * 0.92);

  // Edge strength (for crisp glints along panel frames).
  vec2 px = 1.5 / imgRes;
  float lx = luma(texture2D(img, tuv + vec2(px.x, 0.0)).rgb) - luma(texture2D(img, tuv - vec2(px.x, 0.0)).rgb);
  float ly = luma(texture2D(img, tuv + vec2(0.0, px.y)).rgb) - luma(texture2D(img, tuv - vec2(0.0, px.y)).rgb);
  float edge = clamp(length(vec2(lx, ly)) * 6.0, 0.0, 1.0);
  // Glass is smooth; clothing and reflections of people are textured.
  panel *= 1.0 - edge;

  // Warmth of the light changes with the time of day.
  vec3 sunCol = mix(vec3(1.0, 0.96, 0.86), vec3(1.0, 0.72, 0.38), smoothstep(0.2, 0.75, grade));
  sunCol = mix(sunCol, vec3(1.0, 0.45, 0.25), smoothstep(0.75, 1.0, grade));

  // 1. Light falls off away from the sun (gentle relighting of the scene).
  float falloff = mix(1.08, 0.86, smoothstep(0.0, 1.4, dist));
  vec3 col = c * falloff;

  // 2. Sun reflected in the glass: a soft hotspot, stretched along the panels.
  // A broad, soft sheen that keeps the texture of the glass underneath.
  vec2 dg = d * vec2(0.7, 1.4);
  float spot = exp(-dot(dg, dg) * 4.0);
  col = mix(col, col + sunCol * 0.6, panel * spot * 0.7);

  // 3. Glow in the air around the sun, stronger over bright sky.
  // Screen blend keeps contrast (additive washed the photo out).
  float glow = exp(-dist * 5.0) * 0.42 + exp(-dist * 24.0) * 0.85;
  vec3 g = sunCol * glow * (0.25 + l * 0.9);
  col = 1.0 - (1.0 - col) * (1.0 - g);

  // Faint shimmer on the glass so it feels alive.
  col += sunCol * panel * spot * 0.025 * sin(time * 1.2 + v.x * 30.0);

  // 4. Time-of-day grade.
  vec3 golden = col * vec3(1.14, 1.0, 0.80) + vec3(0.03, 0.015, 0.0);
  vec3 dusk = col * vec3(0.55, 0.55, 0.78) + vec3(0.04, 0.02, 0.06) * (1.0 - v.y);
  float g1 = smoothstep(0.15, 0.55, grade);
  float g2 = smoothstep(0.6, 1.0, grade);
  col = mix(col, golden, g1);
  col = mix(col, dusk, g2);
  // Dusk sky warms near the horizon.
  col += vec3(0.25, 0.10, 0.05) * g2 * smoothstep(0.35, 0.75, v.y) * smoothstep(0.45, 0.85, l);

  // 5. Vignette.
  float vig = smoothstep(1.25, 0.35, length((v - 0.5) * vec2(1.1, 1.3)));
  col *= mix(0.72, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

const CAPTIONS: [number, string, string][] = [
  [0, "Midday", "Move the sun. Every panel catches it."],
  [0.4, "Golden hour", "Still making power as the light warms and the shadows stretch."],
  [0.78, "Dusk", "The sun goes down. The battery takes the evening from here."],
];

export default function Sunlight({ src, alt }: { src: string; alt: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [grade, setGrade] = useState(0);
  const target = useRef({ x: 0.7, y: 0.78 });
  const sun = useRef({ x: 0.7, y: 0.78 });
  const touched = useRef(false);
  const gradeRef = useRef(0);

  // Scroll -> time of day.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      gradeRef.current = p;
      setGrade(p);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  // WebGL setup and render loop.
  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) { setFailed(true); return; }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("res"), uImg = u("imgRes"), uSun = u("sun"), uGrade = u("grade"), uTime = u("time");

    const tex = gl.createTexture();
    const image = new Image();
    let ready = false;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform2f(uImg, image.naturalWidth, image.naturalHeight);
      ready = true;
    };
    image.src = src;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.75);
      const w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uRes, cv.width, cv.height);
    };

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); });
    io.observe(cv);
    const t0 = performance.now();
    function frame(t: number) {
      raf = 0;
      if (!visible) return;
      resize();
      const secs = (t - t0) / 1000;
      // Without a pointer, the sun drifts slowly on its own.
      if (!touched.current && !reduced) {
        target.current.x = 0.62 + Math.sin(secs * 0.25) * 0.22;
        target.current.y = 0.8 + Math.cos(secs * 0.25) * 0.06;
      }
      // The sun sinks towards the horizon as the day goes on.
      const sinkY = target.current.y - gradeRef.current * 0.38;
      sun.current.x += (target.current.x - sun.current.x) * 0.08;
      sun.current.y += (sinkY - sun.current.y) * 0.08;
      if (ready) {
        gl!.uniform2f(uSun, sun.current.x, sun.current.y);
        gl!.uniform1f(uGrade, gradeRef.current);
        gl!.uniform1f(uTime, reduced ? 0 : secs);
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const move = (x: number, y: number) => {
      const r = cv.getBoundingClientRect();
      touched.current = true;
      target.current.x = (x - r.left) / r.width;
      target.current.y = 1 - (y - r.top) / r.height;
    };
    const onPointer = (e: PointerEvent) => move(e.clientX, e.clientY);
    cv.addEventListener("pointermove", onPointer);
    cv.addEventListener("pointerdown", onPointer);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      cv.removeEventListener("pointermove", onPointer);
      cv.removeEventListener("pointerdown", onPointer);
    };
  }, [src]);

  const cap = [...CAPTIONS].reverse().find(([g]) => grade >= g) ?? CAPTIONS[0];

  return (
    <div ref={wrap} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-dark-blue">
        {failed ? (
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <canvas ref={canvas} role="img" aria-label={alt} className="absolute inset-0 w-full h-full touch-none cursor-crosshair" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-dark-blue/70 via-dark-blue/10 to-transparent" />

        <div className="pointer-events-none absolute left-6 sm:left-16 bottom-14 sm:bottom-20 max-w-xl text-white">
          <p className="text-yellow text-sm font-semibold uppercase tracking-[0.25em]">Nyagatare · our installation</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-bold leading-[1.05]">Light Up Dreams, The Solar Way</h1>
          <div key={cap[1]} className="mt-6 animate-[rise_0.6s_ease-out_both]">
            <p className="text-yellow/90 text-xs font-semibold uppercase tracking-widest">{cap[1]}</p>
            <p className="mt-1 text-lg sm:text-xl text-white/85">{cap[2]}</p>
          </div>
        </div>

        <p className="pointer-events-none absolute right-6 sm:right-10 bottom-6 text-xs text-white/60">
          {grade < 0.05 ? "Move your mouse (or touch) to move the sun · scroll for the rest of the day ↓" : ""}
        </p>
      </div>
    </div>
  );
}
