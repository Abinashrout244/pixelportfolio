import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   GLSL Shaders
   ───────────────────────────────────────────── */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  
  #define MAX_RIPPLES 50
  uniform vec4 u_ripples[MAX_RIPPLES];
  uniform int u_rippleCount;

  varying vec2 vUv;

  /* ── Simplex 3D noise ── */
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Adjusted to be much calmer initially (less chaotic static white patches)
  float surfaceElevation(vec2 uv, float t) {
    float n1 = snoise(vec3(uv * 1.0, t * 0.3));
    float n2 = snoise(vec3(uv * 2.0 + 5.0, t * 0.2));
    return n1 * 0.25 + n2 * 0.08; 
  }

  void main() {
    vec2 uv = vUv;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 uvAspect = vec2(uv.x * aspect, uv.y);
    
    float t = u_time * 0.04;

    // ── Ripple Physics Accumulation ──
    vec2 rippleDisplacement = vec2(0.0);
    float rippleElevation = 0.0;

    for(int i = 0; i < MAX_RIPPLES; i++) {
      if (i >= u_rippleCount) break;
      vec4 rip = u_ripples[i];
      vec2 ripPos = vec2(rip.x * aspect, rip.y);
      float age = rip.z;
      float intensity = rip.w;

      vec2 dir = uvAspect - ripPos;
      float dist = length(dir);
      
      if(dist > 0.0001) {
        dir /= dist;
        
        float waveSpeed = 0.9;
        float frequency = 24.0;
        float decay = 3.2; 
        
        float phase = (dist - age * waveSpeed) * frequency;
        
        // Premium organic dampening curve
        float envelope = exp(-age * 1.8) * exp(-dist * decay);
        float wave = sin(phase) * envelope * intensity;
        
        rippleElevation += wave * 0.22;
        rippleDisplacement += dir * wave * 0.06;
      }
    }

    // Distortion maps applied precisely
    vec2 distortedUV = uvAspect + rippleDisplacement;
    
    // Fine-tuned sampling step for ultra-sharp liquid normal vectors
    vec2 e = vec2(0.005, 0.0);
    
    float h = surfaceElevation(distortedUV, t) + rippleElevation;
    float hx = surfaceElevation(distortedUV + e.xy, t) + rippleElevation;
    float hy = surfaceElevation(distortedUV + e.yx, t) + rippleElevation;
    
    // Normal calculation: Z tuned up to flatten baseline, sharpening glass reflections
    vec3 normal = normalize(vec3(hx - h, hy - h, 0.09));

    // ── Deep Premium Metallic Lighting Model ──
    vec3 lightDir1 = normalize(vec3(-1.5, 1.5, 1.2));
    vec3 lightDir2 = normalize(vec3(1.5, -0.8, 0.8));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);

    // Pure ink-black premium backdrop foundation
    vec3 baseColor = vec3(0.012, 0.012, 0.015);
    
    // Specular 1 (Glossy Liquid Chrome Highlight - tightened exponent to avoid broad white clouds)
    vec3 halfVector1 = normalize(lightDir1 + viewDir);
    float NdotH1 = max(0.0, dot(normal, halfVector1));
    float specular1 = pow(NdotH1, 140.0) * 0.95;

    // Specular 2 (Subtle context reflection)
    vec3 halfVector2 = normalize(lightDir2 + viewDir);
    float NdotH2 = max(0.0, dot(normal, halfVector2));
    float specular2 = pow(NdotH2, 45.0) * 0.25;

    // Polished glass edge rim light
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 4.0);
    vec3 rimColor = vec3(0.15, 0.18, 0.22) * fresnel * 0.4;

    // Caustics highlight scaled down so baseline isn't washed out
    float flowHighlight = smoothstep(0.2, 0.6, h) * 0.015;

    // Assembly
    vec3 finalColor = baseColor + vec3(specular1) + vec3(specular2) + rimColor + flowHighlight;
    
    // Monochromatic tone mapping with a rich silver/mercury grading tint
    finalColor *= vec3(0.96, 0.97, 0.99);
    
    // High-fidelity glare control clamp
    float luminance = dot(finalColor, vec3(0.299, 0.587, 0.114));
    finalColor += finalColor * luminance * 0.12;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

/* ─────────────────────────────────────────────
   Quad Mesh & User Interaction Processing Loop
   ───────────────────────────────────────────── */

const MAX_RIPPLES = 50;

function LiquidPlane() {
  const meshRef = useRef();
  const { size } = useThree();

  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseCurrent = useRef(new THREE.Vector2(0.5, 0.5));
  const lastMousePos = useRef(new THREE.Vector2(0.5, 0.5));
  const ripples = useRef([]);

  const uniforms = useMemo(() => {
    const rippleData = new Float32Array(MAX_RIPPLES * 4);
    return {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_ripples: { value: rippleData },
      u_rippleCount: { value: 0 },
    };
  }, []);

  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseTarget.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material;

    // High fidelity frame-rate independent spring interpolation
    const lerpFactor = 1.0 - Math.pow(0.0001, delta);
    mouseCurrent.current.lerp(mouseTarget.current, lerpFactor);

    const velocity = mouseCurrent.current.distanceTo(lastMousePos.current);
    
    // Responsive ripple displacement activation threshold
    if (velocity > 0.0015) {
      const intensity = Math.min(velocity * 22.0, 1.2);
      
      ripples.current.unshift({
        x: mouseCurrent.current.x,
        y: mouseCurrent.current.y,
        age: 0,
        intensity: intensity,
      });

      if (ripples.current.length > MAX_RIPPLES) {
        ripples.current.pop();
      }
    }
    
    lastMousePos.current.copy(mouseCurrent.current);

    let activeRipples = 0;
    const maxAge = 2.5; // Quick, responsive dissipation curve

    for (let i = ripples.current.length - 1; i >= 0; i--) {
      const r = ripples.current[i];
      r.age += delta;
      
      if (r.age > maxAge) {
        ripples.current.splice(i, 1);
        continue;
      }

      const baseIndex = activeRipples * 4;
      uniforms.u_ripples.value[baseIndex + 0] = r.x;
      uniforms.u_ripples.value[baseIndex + 1] = r.y;
      uniforms.u_ripples.value[baseIndex + 2] = r.age;
      uniforms.u_ripples.value[baseIndex + 3] = r.intensity;
      
      activeRipples++;
    }

    mat.uniforms.u_time.value += delta;
    mat.uniforms.u_mouse.value.copy(mouseCurrent.current);
    mat.uniforms.u_rippleCount.value = activeRipples;
    mat.uniforms.u_ripples.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   Canvas Performance Packaging Shell
   ───────────────────────────────────────────── */

export default function LiquidGlassBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-[#060608]">
      <Canvas
        className="liquid-glass-canvas"
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        camera={{ position: [0, 0, 1] }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <LiquidPlane />
      </Canvas>
    </div>
  );
}