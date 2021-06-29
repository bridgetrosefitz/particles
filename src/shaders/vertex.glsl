uniform vec2 uTextureSize;

attribute float pindex;
attribute vec3 offset;
attribute float angle;

varying vec2 vPUv;
varying vec2 vUv;

void main () {

  // particle uv
  vec2 puv = offset.xy / uTextureSize;
  vPUv = puv;

  // pixel color
  // vec4 color = texture2D(uTexture, puv);

  // displacement
  vec3 displaced = offset;

  // center

  displaced.xy -= uTextureSize * 0.5;



  // final position
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  mvPosition.xyz += position * 1.0;
  vec4 finalPosition = projectionMatrix * mvPosition;

  gl_Position = finalPosition;

  vUv = uv;
}