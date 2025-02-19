uniform sampler2D uTexture;
varying vec2 vUv;    
uniform vec2 uMouse;   
uniform float uHover;



void main(){
    float blocks = 20.0;
    vec2 blockUv = floor(vUv*blocks)/blocks;
    float distance = length(blockUv - uMouse);
    float effect = smoothstep(0.3,0.0,distance * 1.0);
    vec2 distortion = vec2(0.02) * effect * 3.0;
    vec4 color = texture2D(uTexture, vUv + distortion*uHover);
    gl_FragColor = color;
}
