var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//?

// let loader = new THREE.CubeTextureLoader();
// let skybox = loader.load([
//   "dunia/px.png",
//   "dunia/nx.png",
//   "dunia/py.png",
//   "dunia/ny.png",
//   "dunia/pz.png",
//   "dunia/nz.png",
// ]);
// scene.background = skybox;

camera.position.z = 200;
scene.background = new THREE.Color("white");
let control = new THREE.OrbitControls(camera, renderer.domElement);
var animate = function () {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
