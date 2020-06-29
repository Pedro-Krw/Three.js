var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02 };
var USE_WIREFRAME = false;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var gridHelper = new THREE.GridHelper(100, 70);
gridHelper.position.y = -4;
scene.add(gridHelper);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//?
var geometry = new THREE.SphereGeometry(5, 22, 22);
var gambar = new THREE.TextureLoader().load("../img/matahari2.png");
var material = new THREE.MeshBasicMaterial({
  color: "orange",
  map: gambar,
});
var sphere = new THREE.Mesh(geometry, material);
sphere.position.set(6, 1, 1);
scene.add(sphere);
//?
var geometry = new THREE.SphereGeometry(1, 12, 12);
var merkurius = new THREE.TextureLoader().load("../img/A.jpg");
var material = new THREE.MeshBasicMaterial({
  // color: "lime",
  map: merkurius,
});
var cube = new THREE.Mesh(geometry, material);
cube.position.set(-1, 1, 1);
scene.add(cube);

//?

var geometry = new THREE.SphereGeometry(1.5, 12, 12);
var venus = new THREE.TextureLoader().load("../img/mars.png");
var material = new THREE.MeshBasicMaterial({
  // color: "lime",
  map: venus,
});

//?
var bumiku = new THREE.Mesh(geometry, material);
bumiku.position.set(-4.5, 1, 1);
scene.add(bumiku);

//?
var geometry = new THREE.SphereGeometry(2, 12, 12);
var bumi = new THREE.TextureLoader().load("../img/bumi.png");
var material = new THREE.MeshBasicMaterial({
  color: "white",
  map: bumi,
});

var light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);

//?
var jupiter = new THREE.Mesh(geometry, material);
jupiter.position.set(-9, 1, 1);
scene.add(jupiter);
//!
camera.position.z -= 20;

let control = new THREE.OrbitControls(camera, renderer.domElement);

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
var animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  bumiku.rotation.x += 0.01;
  bumiku.rotation.y += 0.01;
  bumiku.rotation.z += 0.01;
  jupiter.rotation.x -= 0.01;
  jupiter.rotation.y -= 0.01;
  sphere.rotation.y += 0.01;

  if (keyboard[87]) {
    // W key
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if (keyboard[83]) {
    // S key
    camera.position.x += Math.sin(camera.rotation.y) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if (keyboard[65]) {
    // A key
    camera.position.x +=
      Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
    camera.position.z +=
      -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
  }
  if (keyboard[68]) {
    // D key
    camera.position.x +=
      Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
    camera.position.z +=
      -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
  }

  if (keyboard[37]) {
    // left arrow key
    camera.rotation.y -= player.turnSpeed;
  }
  if (keyboard[39]) {
    // right arrow key
    camera.rotation.y += player.turnSpeed;
  }

  renderer.render(scene, camera);

  function keyDown(event) {
    keyboard[event.keyCode] = true;
  }

  function keyUp(event) {
    keyboard[event.keyCode] = false;
  }

  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);

  window.onload = init;
};

animate();
