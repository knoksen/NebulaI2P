import * as THREE from "three";

const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  2000,
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

const starsGeometry = new THREE.BufferGeometry();
const starCount = 2000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i += 1) {
  const i3 = i * 3;
  positions[i3] = (Math.random() - 0.5) * 500;
  positions[i3 + 1] = (Math.random() - 0.5) * 500;
  positions[i3 + 2] = (Math.random() - 0.5) * 500;
}

starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const starsMaterial = new THREE.PointsMaterial({
  color: 0x8ad7ff,
  size: 0.8,
  transparent: true,
  opacity: 0.9,
});

const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

function animate() {
  requestAnimationFrame(animate);
  starField.rotation.y += 0.0007;
  starField.rotation.x += 0.0002;
  renderer.render(scene, camera);
}

animate();
