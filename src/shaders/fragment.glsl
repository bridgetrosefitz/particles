uniform sampler2D uImageTexture;

varying vec2 vUv;
varying vec2 vParticleUv;

void main () {
  vec4 color = texture2D(uImageTexture, vParticleUv);

  // circle

  float border = 0.3;
  float radius = 0.5;
  float dist = radius - distance(vUv, vec2(0.5));
  float t = smoothstep(0.0, border, dist);

  // final color
  color.a = t;

  gl_FragColor = color;

}