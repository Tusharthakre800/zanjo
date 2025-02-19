import LocomotiveScroll from 'locomotive-scroll';

import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const locomotiveScroll = new LocomotiveScroll();


// Scene setup
const scene = new THREE.Scene();
const distance = 20;
const fov = 2 * Math.atan((window.innerHeight / 2) / distance)  * (180 / Math.PI);
const camera =  new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.canvas'),
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const images = document.querySelectorAll('img');
const planes = []
images.forEach((image, index) => {
    const imgbounds = image.getBoundingClientRect();
    const texture = new THREE.TextureLoader().load(image.src);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {
           value: texture 
          },
        uMouse: { 
          value: new THREE.Vector2(0.5,0.5) 
        },
        uHover:{
          value: 0
        },
        uTime: {
          value: 0
        },
        uBounds: {
          value: new THREE.Vector4(imgbounds.left, imgbounds.top, imgbounds.width, imgbounds.height)
        },

      },
      vertexShader,
      fragmentShader,
    });
    const planeGeometry = new THREE.PlaneGeometry(imgbounds.width, imgbounds.height);
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.position.set(imgbounds.left - window.innerWidth / 2 + imgbounds.width / 2 ,  -imgbounds.top + window.innerHeight / 2 - imgbounds.height / 2, 0);
    planes.push(plane);
    scene.add(plane);
});

function updateplanePosition() {
    planes.forEach((plane, index) => {
        const imgbounds = images[index].getBoundingClientRect();
        plane.position.set(imgbounds.left - window.innerWidth / 2 + imgbounds.width / 2 ,  -imgbounds.top + window.innerHeight / 2 - imgbounds.height / 2, 0);

      });
}


// Position camera
camera.position.z = distance;

// Animation loop
function animate() {
  window.requestAnimationFrame(animate);
  updateplanePosition();
  renderer.render(scene, camera);
}

animate();



// Handle window resize
window.addEventListener('resize', () => {
  const newFov = 2 * Math.atan((window.innerHeight / 2) / distance)  * (180 / Math.PI);
  camera.fov = newFov;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateplanePosition()
  
});
// locomotiveScroll.on('scroll', updateplanePosition);

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  
  const intersects = raycaster.intersectObjects(planes);

  planes.forEach( plane => {
      gsap.to(plane.material.uniforms.uHover, {
        value: 0,
        duration: 0.3,
      })  });

  if (intersects.length > 0) {
    const intersectedplane = intersects[0];
    const uv = intersectedplane.uv;
      gsap.to(intersectedplane.object.material.uniforms.uMouse.value, {
        x: uv.x,
        y: uv.y,
        duration: 0.2,
      });
      gsap.to(intersectedplane.object.material.uniforms.uHover, {
        value: 1,
        duration: 0.3,
      });  }
});

// window.addEventListener('mouseleave', () => {
//   planes.forEach(plane => {
//     gsap.to(plane.material.uniforms.uHover, {
//       value: 0,
//       duration: 0.3,
//     });
//     gsap.to(plane.material.uniforms.uMouse.value, {
//       x: 0.5,
//       y: 0.5,
//       duration: 0.2,
//     });
//   });
// });


