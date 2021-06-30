// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float random(float n) {
  return fract(sin(n) * 43758.5453123);
}

// ******************************** /\ HELPERS /\

uniform vec2 uImageTextureSize;
uniform sampler2D uInteractiveTexture;
uniform float uParticleSize;
uniform float uTime;

attribute float aParticleIndex;
attribute vec3 aParticleOffset;
attribute float aParticleDispersionAngle;

varying vec2 vPUv;
varying vec2 vUv;

void main () {

  // particle uv
  vec2 puv = aParticleOffset.xy / uImageTextureSize;
  vPUv = puv;

  // pixel color
  // vec4 color = texture2D(uTexture, puv);

  // displacement
  vec3 displaced = aParticleOffset;

  // center
  displaced.xy -= uImageTextureSize * 0.5;

  // interactive texture
  float blastFactor = texture2D(uInteractiveTexture, puv).r;
  displaced.z += blastFactor * 20.0;
  displaced.x += cos(aParticleDispersionAngle) * blastFactor * 20.0;
  displaced.y += sin(aParticleDispersionAngle) * blastFactor * 20.0;

  // particle size
  float particleSize = (snoise(vec2(uTime, aParticleIndex) * 0.5) + 2.0);
  particleSize *= uParticleSize;

  // final position
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  mvPosition.xyz += position * particleSize;
  vec4 finalPosition = projectionMatrix * mvPosition;

  gl_Position = finalPosition;

  vUv = uv;
}