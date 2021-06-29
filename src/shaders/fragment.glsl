uniform sampler2D uTexture;

varying vec2 vUv;
varying vec2 vPUv;

void main () {
  vec4 color = texture2D(uTexture, vPUv);
  gl_FragColor = color;

}