"use client";

/**
 * HoverImage — a plant photo with a tasteful WebGL liquid/ripple distortion on
 * hover. Always renders a next/image (fill, object-cover) as the base and the
 * permanent fallback, so the card never looks broken even if WebGL is absent.
 *
 * The GL surface is created LAZILY on mouseenter and fully DISPOSED on
 * mouseleave / unmount (renderer.dispose + force-lose-context + canvas removal),
 * so across a 12-card grid at most ~1-2 live WebGL contexts ever exist. The
 * effect is gated to hover-capable, fine-pointer, non-reduced-motion devices
 * only; everywhere else it stays a plain image.
 *
 * Shader: samples the plant texture with a small displacement driven by
 * generated value-noise turbulence, an eased hover-progress uniform (0..1) and
 * the pointer position. Amplitude is deliberately tiny so it reads premium, not
 * gimmicky. The texture is framed to mirror object-cover.
 */

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import type * as T from "three";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "./hooks";

/**
 * SSR-safe capability detection via useSyncExternalStore: enabled only on
 * hover-capable, fine-pointer, non-reduced-motion devices. The server snapshot
 * is always false so markup is deterministic; the client subscribes to the
 * media queries and re-reads if they change (e.g. plugging in a mouse).
 */
const HOVER_Q = "(hover: hover) and (pointer: fine)";
const MOTION_Q = "(prefers-reduced-motion: reduce)";

// Browsers cap how many live WebGL contexts can exist (Firefox especially);
// past the cap they force-lose the oldest, which across a 12-card grid means
// dropped contexts + console noise. So we limit how many distortion surfaces
// run at once and fall back to the plain image beyond it.
let liveContexts = 0;
const MAX_CONTEXTS = 4;

function subscribeCapability(onChange: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const a = window.matchMedia(HOVER_Q);
  const b = window.matchMedia(MOTION_Q);
  a.addEventListener("change", onChange);
  b.addEventListener("change", onChange);
  return () => {
    a.removeEventListener("change", onChange);
    b.removeEventListener("change", onChange);
  };
}

function getCapabilitySnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(HOVER_Q).matches && !prefersReducedMotion();
}

type HoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

type GLState = {
  renderer: T.WebGLRenderer;
  scene: T.Scene;
  camera: T.OrthographicCamera;
  material: T.ShaderMaterial;
  texture: T.Texture;
  raf: number;
  start: number;
  active: boolean;
  target: number; // 1 while hovering, 0 while leaving
  progress: number;
  pointer: { x: number; y: number };
  ro?: ResizeObserver;
};

/** GLSL value-noise + fbm turbulence and a pointer-led ripple displacement. */
const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uProgress;   // eased hover 0..1
  uniform vec2 uPointer;     // 0..1, image space
  uniform vec2 uCover;       // object-cover scale
  uniform vec2 uOffset;      // object-cover offset

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // distance from pointer drives a soft, localised ripple
    float d = distance(uv, uPointer);
    float ring = sin(d * 22.0 - uTime * 3.0);
    float falloff = smoothstep(0.55, 0.0, d);

    // flowing turbulence
    vec2 flow = vec2(
      fbm(uv * 3.2 + vec2(0.0, uTime * 0.18)),
      fbm(uv * 3.2 + vec2(uTime * 0.18, 0.0))
    ) - 0.5;

    float amp = 0.012 * uProgress;
    vec2 disp = (flow + ring * falloff * 0.6) * amp;

    // apply displacement, then object-cover framing
    vec2 cuv = (uv + disp) * uCover + uOffset;

    // subtle chromatic split scaled by hover, kept very mild
    float ca = 0.0018 * uProgress * falloff;
    vec4 col;
    col.r = texture2D(uTex, cuv + vec2(ca, 0.0)).r;
    col.g = texture2D(uTex, cuv).g;
    col.b = texture2D(uTex, cuv - vec2(ca, 0.0)).b;
    col.a = 1.0;

    gl_FragColor = col;
  }
`;

export default function HoverImage({
  src,
  alt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: HoverImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // gated to hover-capable, fine-pointer, non-reduced-motion; false during SSR
  const capable = useSyncExternalStore(
    subscribeCapability,
    getCapabilitySnapshot,
    () => false,
  );

  // mutable GL state kept off-render so re-renders never touch live contexts
  const gl = useRef<GLState | null>(null);
  // hover intent + an async-init guard (three.js is imported on first hover)
  const hovering = useRef(false);
  const initializing = useRef(false);

  // compute object-cover scale/offset for an image of given aspect in a box
  function coverFraming(imgW: number, imgH: number, boxW: number, boxH: number) {
    const imgAspect = imgW / imgH;
    const boxAspect = boxW / boxH;
    let sx = 1;
    let sy = 1;
    if (imgAspect > boxAspect) {
      // image wider than box -> crop sides
      sx = boxAspect / imgAspect;
    } else {
      // image taller than box -> crop top/bottom
      sy = imgAspect / boxAspect;
    }
    const ox = (1 - sx) * 0.5;
    const oy = (1 - sy) * 0.5;
    return { cover: [sx, sy] as [number, number], offset: [ox, oy] as [number, number] };
  }

  function disposeGL() {
    const s = gl.current;
    if (!s) return;
    cancelAnimationFrame(s.raf);
    s.ro?.disconnect();
    s.active = false;
    try {
      s.texture.dispose();
      s.material.dispose();
      s.scene.clear();
      const canvas = s.renderer.domElement;
      s.renderer.dispose();
      s.renderer.forceContextLoss();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    } catch {
      // ignore disposal hiccups
    }
    gl.current = null;
    liveContexts = Math.max(0, liveContexts - 1);
  }

  async function initGL() {
    const wrap = wrapRef.current;
    if (!wrap || gl.current || initializing.current) return;

    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w === 0 || h === 0) return;

    // three.js is only pulled in on first hover, keeping it off the page bundle.
    initializing.current = true;
    const THREE = await import("three");
    initializing.current = false;
    // bail if the component unmounted or a context already exists by now
    if (!wrapRef.current || gl.current) return;
    // Respect the browser's WebGL context budget; beyond it, stay a still image.
    if (liveContexts >= MAX_CONTEXTS) return;

    let renderer: T.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      // WebGL unavailable — keep the static image silently
      return;
    }
    liveContexts += 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h, false);

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 360ms ease";
    canvas.style.pointerEvents = "none";
    // If the GPU drops the context, tear down cleanly so the base image shows
    // through rather than a dead canvas.
    canvas.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
        disposeGL();
      },
      { once: true },
    );

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const texture = new THREE.Texture();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTex: { value: texture },
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uCover: { value: new THREE.Vector2(1, 1) },
        uOffset: { value: new THREE.Vector2(0, 0) },
      },
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const state: GLState = {
      renderer,
      scene,
      camera,
      material,
      texture,
      raf: 0,
      start: performance.now(),
      active: true,
      target: hovering.current ? 1 : 0,
      progress: 0,
      pointer: { x: 0.5, y: 0.5 },
    };
    gl.current = state;

    // keep canvas sized to the wrapper
    const ro = new ResizeObserver(() => {
      const cw = wrap.clientWidth;
      const ch = wrap.clientHeight;
      if (cw === 0 || ch === 0) return;
      renderer.setSize(cw, ch, false);
      applyFraming();
    });
    ro.observe(wrap);
    state.ro = ro;

    function applyFraming() {
      const img = texture.image as HTMLImageElement | undefined;
      if (!img || !img.width) return;
      const { cover, offset } = coverFraming(
        img.width,
        img.height,
        wrap!.clientWidth,
        wrap!.clientHeight,
      );
      (material.uniforms.uCover.value as T.Vector2).set(cover[0], cover[1]);
      (material.uniforms.uOffset.value as T.Vector2).set(offset[0], offset[1]);
    }

    // load the photo into the GL texture; reveal the canvas once decoded
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => {
      if (!gl.current) return;
      texture.image = img;
      texture.needsUpdate = true;
      applyFraming();
      canvas.style.opacity = "1";
    };
    img.onerror = () => {
      // leave static image showing
      disposeGL();
    };
    img.src = src;

    wrap.appendChild(canvas);

    const animate = () => {
      const s = gl.current;
      if (!s || !s.active) return;
      s.raf = requestAnimationFrame(animate);

      // ease progress toward target
      const ease = s.target > s.progress ? 0.08 : 0.06;
      s.progress += (s.target - s.progress) * ease;

      // if we've eased fully out, tear the context down
      if (s.target === 0 && s.progress < 0.01) {
        disposeGL();
        return;
      }

      const t = (performance.now() - s.start) / 1000;
      s.material.uniforms.uTime.value = t;
      s.material.uniforms.uProgress.value = s.progress;
      (s.material.uniforms.uPointer.value as T.Vector2).set(
        s.pointer.x,
        s.pointer.y,
      );
      s.renderer.render(s.scene, s.camera);
    };
    state.raf = requestAnimationFrame(animate);
  }

  // event wiring — only when capable
  useEffect(() => {
    if (!capable) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onEnter = () => {
      hovering.current = true;
      if (gl.current) gl.current.target = 1;
      else void initGL();
    };
    const onLeave = () => {
      hovering.current = false;
      if (gl.current) gl.current.target = 0;
    };
    const onMove = (e: PointerEvent) => {
      const s = gl.current;
      if (!s) return;
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height; // flip for GL uv
      s.pointer.x = Math.max(0, Math.min(1, x));
      s.pointer.y = Math.max(0, Math.min(1, y));
    };

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointermove", onMove);

    return () => {
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointermove", onMove);
      disposeGL();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capable, src]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    </div>
  );
}
