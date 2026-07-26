import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { NebulaAudioEngine } from "./NebulaAudioEngine.js";

const canvas = document.getElementById("nebula-canvas");
const modal = document.getElementById("node-modal");
const modalText = document.getElementById("node-modal-text");
const audioBtn = document.getElementById("audio-toggle");
const audioEngine = new NebulaAudioEngine();
let isMuted = false;

if (audioBtn) {
  const btnIcon = audioBtn.querySelector(".btn-icon");
  const btnText = audioBtn.querySelector(".btn-text");

  audioBtn.addEventListener("click", () => {
    if (!audioEngine.isUnlocked) {
      audioEngine.unlock();

      audioBtn.classList.add("audio-active");
      if (btnIcon) btnIcon.textContent = "🔊";
      if (btnText) btnText.textContent = "AUDIO: ONLINE";

      audioEngine.playSonarPing();
      return;
    }

    isMuted = !isMuted;
    if (isMuted) {
      audioEngine.masterGain.gain.linearRampToValueAtTime(0, audioEngine.ctx.currentTime + 0.1);
      if (btnIcon) btnIcon.textContent = "🔇";
      if (btnText) btnText.textContent = "AUDIO: MUTED";
      audioBtn.classList.remove("audio-active");
    } else {
      audioEngine.masterGain.gain.linearRampToValueAtTime(0.4, audioEngine.ctx.currentTime + 0.1);
      if (btnIcon) btnIcon.textContent = "🔊";
      if (btnText) btnText.textContent = "AUDIO: ONLINE";
      audioBtn.classList.add("audio-active");
    }
  });
}

const scene = new THREE.Scene();
scene.background = new THREE.Color("#050510");

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 26);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  depthBuffer: true,
});

const lensScene = new THREE.Scene();
const lensCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const lensUniforms = {
  tDiffuse: { value: renderTarget.texture },
  center: { value: new THREE.Vector2(0.5, 0.5) },
  mass: { value: 0.55 },
  time: { value: 0 },
  eventHorizon: { value: 0.1 },
};

const lensQuad = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.ShaderMaterial({
    uniforms: lensUniforms,
    depthWrite: false,
    depthTest: false,
    transparent: false,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 center;
      uniform float mass;
      uniform float time;
      uniform float eventHorizon;
      varying vec2 vUv;

      void main() {
        vec2 dir = vUv - center;
        float dist = length(dir);
        float safeDist = max(dist, 0.0001);

        if (dist < eventHorizon) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          return;
        }

        float distortion = mass / (safeDist * safeDist);
        vec2 offset = dir * distortion * 0.05;

        float angle = (time * 2.0) / safeDist;
        float s = sin(angle);
        float c = cos(angle);
        mat2 rot = mat2(c, -s, s, c);

        vec2 distortedUv = center + rot * (dir - offset);
        vec4 baseColor = texture2D(tDiffuse, distortedUv);

        float glow = smoothstep(eventHorizon + 0.08, eventHorizon, dist);
        vec3 glowColor = vec3(1.0, 0.6, 0.2) * glow * 2.5;

        gl_FragColor = baseColor + vec4(glowColor, 0.0);
      }
    `,
  })
);
lensScene.add(lensQuad);

const blackHoleMass = {
  current: lensUniforms.mass.value,
  target: lensUniforms.mass.value,
  velocity: 1.75,
};

window.setBlackHoleMassTarget = (nextMass) => {
  blackHoleMass.target = THREE.MathUtils.clamp(nextMass, 0.0, 2.0);
};

window.triggerDockingSequence = () => {
  window.setBlackHoleMassTarget(1.15);
};

window.completeDockingSequence = () => {
  window.setBlackHoleMassTarget(0.0);
};

const ambient = new THREE.AmbientLight(0x8d93ff, 0.42);
scene.add(ambient);

const pointLight = new THREE.PointLight(0x9b6bff, 2.1, 200);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Core ("romskipet")
const coreGroup = new THREE.Group();
const coreMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.85, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xaa88ff })
);
const coreGlow = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0x8e5fff,
    transparent: true,
    opacity: 0.26,
  })
);
coreGroup.add(coreMesh, coreGlow);
scene.add(coreGroup);

// Stars (I2P noder) i flere Z-aksedyp
const starCount = 320;
const starGeo = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);
const nodeMeta = [];

for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;
  const zLayer = THREE.MathUtils.randFloatSpread(70);
  positions[i3 + 0] = THREE.MathUtils.randFloatSpread(85);
  positions[i3 + 1] = THREE.MathUtils.randFloatSpread(55);
  positions[i3 + 2] = zLayer;

  nodeMeta.push({
    id: `node-${i}`,
    health: Math.random() > 0.22 ? "stable" : "unstable",
    traffic: 0,
    flareUntil: 0,
    flareColor: new THREE.Color(0xc7d1dd),
  });
}

starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const starMat = new THREE.PointsMaterial({
  color: 0xc7d1dd,
  size: 0.18,
  transparent: true,
  opacity: 0.92,
  depthWrite: false,
});
const starPoints = new THREE.Points(starGeo, starMat);
scene.add(starPoints);

// Klikkbare proxies for raycasting
const clickableStars = [];
const starProxyMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0,
});
for (let i = 0; i < starCount; i++) {
  const proxy = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), starProxyMaterial);
  proxy.position.fromArray(positions, i * 3);
  proxy.userData.index = i;
  scene.add(proxy);
  clickableStars.push(proxy);
}

// Sonar ring (ekkolodd)
const sonarUniforms = {
  uTime: { value: 0 },
  uProgress: { value: -1 },
  uColor: { value: new THREE.Color("#a46bff") },
};
const sonarRing = new THREE.Mesh(
  new THREE.RingGeometry(1.2, 1.45, 96),
  new THREE.ShaderMaterial({
    uniforms: sonarUniforms,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uProgress;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float alpha = smoothstep(1.0, 0.0, abs(vUv.y - 0.5) * 2.0);
        alpha *= 0.9;
        if (uProgress < 0.0) alpha = 0.0;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  })
);
sonarRing.rotation.x = Math.PI * 0.5;
scene.add(sonarRing);

let sonarActive = false;
let sonarStart = 0;
let sonarDirection = "outgoing";

// Constellation system
const trafficFrequency = new Map();
const constellationsGroup = new THREE.Group();
scene.add(constellationsGroup);

function markTraffic(nodeIndex) {
  const key = nodeMeta[nodeIndex].id;
  trafficFrequency.set(key, (trafficFrequency.get(key) || 0) + 1);
}

function rebuildConstellations() {
  while (constellationsGroup.children.length) {
    constellationsGroup.remove(constellationsGroup.children[0]);
  }

  const topNodes = [...trafficFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([id]) => id);

  if (topNodes.length < 2) return;

  const positionsArr = starGeo.attributes.position.array;
  const starById = new Map(nodeMeta.map((n, i) => [n.id, i]));

  for (let i = 0; i < topNodes.length - 1; i++) {
    const aIdx = starById.get(topNodes[i]);
    const bIdx = starById.get(topNodes[i + 1]);
    if (aIdx == null || bIdx == null) continue;

    const a = new THREE.Vector3().fromArray(positionsArr, aIdx * 3);
    const b = new THREE.Vector3().fromArray(positionsArr, bIdx * 3);

    const curve = new THREE.CatmullRomCurve3([
      a,
      a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, 0, 2.0)),
      b,
    ]);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, 0.03, 6, false),
      new THREE.MeshBasicMaterial({
        color: 0xa46bff,
        transparent: true,
        opacity: 0.68,
      })
    );
    constellationsGroup.add(tube);
  }
}

// Parallax input
const targetTilt = { x: 0, y: 0 };
const smoothTilt = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  const nx = e.clientX / window.innerWidth - 0.5;
  const ny = e.clientY / window.innerHeight - 0.5;
  targetTilt.x = ny * 0.45;
  targetTilt.y = nx * 0.7;
});

window.addEventListener("deviceorientation", (ev) => {
  const gamma = THREE.MathUtils.clamp((ev.gamma || 0) / 45, -1, 1);
  const beta = THREE.MathUtils.clamp((ev.beta || 0) / 45, -1, 1);
  targetTilt.y = gamma * 0.65;
  targetTilt.x = beta * 0.35;
});

// Raycasting interaktivitet
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedIndex = -1;

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObjects(clickableStars, false)[0];

  if (!hit) {
    modal.classList.add("hidden");
    selectedIndex = -1;
    return;
  }

  selectedIndex = hit.object.userData.index;
  const node = nodeMeta[selectedIndex];
  modal.classList.remove("hidden");
  modal.classList.toggle("unstable", node.health === "unstable");
  modalText.textContent =
    node.health === "stable"
      ? "Node resonance stable • smooth orbital pulse"
      : "Node resonance unstable • jagged flux detected";
});

function positionModalAboveSelected() {
  if (selectedIndex < 0) return;
  const p = clickableStars[selectedIndex].position.clone().project(camera);
  const x = (p.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-p.y * 0.5 + 0.5) * window.innerHeight;
  modal.style.left = `${x}px`;
  modal.style.top = `${y}px`;
}

// Sonar trigger simulation
function triggerSonar(direction = "outgoing") {
  sonarActive = true;
  sonarStart = performance.now();
  sonarDirection = direction;
  sonarUniforms.uColor.value.set(direction === "outgoing" ? "#f6c65b" : "#c7d1dd");

  if (direction === "outgoing") {
    audioEngine.playSonarPing();
  } else {
    audioEngine.playIncomingBass();
  }
}

setInterval(() => {
  triggerSonar(Math.random() > 0.5 ? "outgoing" : "incoming");
}, 1900);

// Sonar hit detection (visuell)
function processSonarHits(radius) {
  const arr = starGeo.attributes.position.array;
  for (let i = 0; i < starCount; i++) {
    const x = arr[i * 3 + 0];
    const y = arr[i * 3 + 1];
    const z = arr[i * 3 + 2];
    const d = Math.sqrt(x * x + y * y + z * z);

    if (Math.abs(d - radius) < 0.55) {
      nodeMeta[i].flareUntil = performance.now() + 180;
      nodeMeta[i].flareColor.set(sonarDirection === "outgoing" ? 0xf6c65b : 0xc7d1dd);
      markTraffic(i);
    }
  }
}

// Render loop
const clock = new THREE.Clock();

function render() {
  const dt = clock.getDelta();
  const t = clock.elapsedTime;
  smoothTilt.x += (targetTilt.x - smoothTilt.x) * 0.045;
  smoothTilt.y += (targetTilt.y - smoothTilt.y) * 0.045;

  camera.rotation.x = smoothTilt.x;
  camera.rotation.y = smoothTilt.y;

  coreMesh.scale.setScalar(1 + Math.sin(t * 2.2) * 0.04);
  coreGlow.scale.setScalar(1 + Math.sin(t * 1.7) * 0.09);

  if (sonarActive) {
    const elapsed = performance.now() - sonarStart;
    const duration = 1100;
    const p = elapsed / duration;

    if (p >= 1) {
      sonarActive = false;
      sonarUniforms.uProgress.value = -1;
      rebuildConstellations();
    } else {
      const radius = 1.4 + p * 55;
      sonarRing.scale.setScalar(radius);
      sonarUniforms.uProgress.value = p;
      processSonarHits(radius);
    }
  }

  // flare feedback (fargevariasjon på stjernefelt)
  let flareMix = 0;
  for (let i = 0; i < starCount; i++) {
    if (nodeMeta[i].flareUntil > performance.now()) {
      flareMix += 1;
    }
  }
  flareMix = THREE.MathUtils.clamp(flareMix / 42, 0, 1);
  starMat.color.lerpColors(
    new THREE.Color(0xc7d1dd),
    new THREE.Color(sonarDirection === "outgoing" ? 0xf6c65b : 0xe7effa),
    flareMix * 0.65
  );

  blackHoleMass.current = THREE.MathUtils.damp(
    blackHoleMass.current,
    blackHoleMass.target,
    blackHoleMass.velocity,
    dt
  );
  lensUniforms.mass.value = blackHoleMass.current;
  lensUniforms.time.value = t;

  positionModalAboveSelected();

  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, camera);

  renderer.setRenderTarget(null);
  renderer.render(lensScene, lensCamera);

  requestAnimationFrame(render);
}

render();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderTarget.setSize(window.innerWidth, window.innerHeight);
});
