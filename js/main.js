import Petal from "./petal.js";

const createScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1, 1000);
  light.position.set(10, 10, 10);
  scene.add(light);

  camera.position.z = 10;

  return { scene, camera, renderer, controls };
};

const onWindowResize = (camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = (petals, scene, camera, renderer, controls) => {
  requestAnimationFrame(() =>
    animate(petals, scene, camera, renderer, controls)
  );

  const time = performance.now() * 0.001;
  for (const petal of petals) {
    petal.update(time);
  }

  controls.update();
  renderer.render(scene, camera);
};

const init = async () => {
  const { scene, camera, renderer, controls } = createScene();
  const numPetals = 1000;
  const petals = [];
  const petalTexture = await new Promise((resolve) => {
    new THREE.TextureLoader().load("../textures/sakura.png", resolve);
  });

  for (let i = 0; i < numPetals; i++) {
    const petal = new Petal(petalTexture);
    scene.add(petal.mesh);
    petals.push(petal);
  }

  window.addEventListener(
    "resize",
    () => onWindowResize(camera, renderer),
    false
  );
  animate(petals, scene, camera, renderer, controls);
};

init();
