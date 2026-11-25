"use client";
// «Жидкий» переливающийся градиент, как у Stripe.
// Рисуется видеокартой (WebGL): цветовые пятна плавно перетекают друг в друга.
// Экономия: рисуем в половинном разрешении (градиент всё равно размытый)
// и останавливаемся, когда блок не виден на экране.

import { useEffect, useRef } from "react";

type FluidGradientProps = {
  colors: [string, string, string, string]; // 4 цвета в формате #RRGGBB
  speed?: number; // скорость перетекания (1 — обычная)
  className?: string;
};

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Шейдер: «шум», искажённый другим шумом (domain warping) → мягкие волны цвета
const FRAGMENT = `
precision highp float;
uniform vec2 r;
uniform float t;
uniform vec3 c0, c1, c2, c3;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / r;
  uv.x *= r.x / r.y;
  vec2 q = vec2(fbm(uv * 1.4 + vec2(t * 0.05, -t * 0.03)),
                fbm(uv * 1.4 + vec2(-t * 0.04, t * 0.02) + 5.2));
  float n = fbm(uv * 1.2 + q * 1.8 + vec2(t * 0.02, 0.0));
  vec3 col = mix(c0, c1, smoothstep(0.15, 0.75, n));
  col = mix(col, c2, smoothstep(0.35, 0.85, q.x));
  col = mix(col, c3, smoothstep(0.55, 0.9, q.y * n * 1.7));
  col += (hash(gl_FragCoord.xy + t) - 0.5) / 255.0 * 3.0; // лёгкое зерно против «полос»
  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export default function FluidGradient({ colors, speed = 1, className = "" }: FluidGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return; // нет WebGL — останется запасной CSS-фон под холстом

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Один прямоугольник на весь холст
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "r");
    const uTime = gl.getUniformLocation(program, "t");
    ["c0", "c1", "c2", "c3"].forEach((name, i) =>
      gl.uniform3fv(gl.getUniformLocation(program, name), hexToRgb(colors[i])),
    );

    // На телефоне (сенсорный экран) рисуем ещё грубее и 30 кадров в секунду: градиент размытый, разницы не видно
    const phone = window.matchMedia("(pointer: coarse)").matches;
    const minFrameMs = phone ? 1000 / 30 : 0;
    let lastFrame = 0;

    const resize = () => {
      const scale = phone ? 0.35 : 0.5; // пониженное разрешение: незаметно глазу, намного легче
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;
    const start = performance.now();
    const draw = (now: number) => {
      if (now - lastFrame >= minFrameMs) {
        lastFrame = now;
        gl.uniform1f(uTime, 8 + ((now - start) / 1000) * speed);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reduced && visible) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    // Пауза, когда градиент ушёл с экрана
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reduced) frame = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      io.disconnect();
    };
  }, [colors, speed]);

  return (
    <div
      aria-hidden
      className={`overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` }}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
