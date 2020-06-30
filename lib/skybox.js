var scene = new THREE.Scene();
var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02 };
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var size = 10;
var divisions = 10;
var gridHelper = new THREE.GridHelper(1000, 70);
gridHelper.position.y = -51;
scene.add(gridHelper);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(500, 500, 500);
var material = new THREE.MeshBasicMaterial({ color: "white" });
var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

//?

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load("../dunia/h2s_ft.jpg");
let texture_bk = new THREE.TextureLoader().load("../dunia/h2s_bk.jpg");
let texture_up = new THREE.TextureLoader().load("../dunia/h2s_up.jpg");
let texture_dn = new THREE.TextureLoader().load("../dunia/h2s_dn.jpg");
let texture_rt = new THREE.TextureLoader().load("../dunia/h2s_rt.jpg");
let texture_lf = new THREE.TextureLoader().load("../dunia/h2s_lf.jpg");

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(80, 100, 100);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
// skybox.position.set(100, 1, 1);
scene.add(skybox);

//?
let materialArray1 = [];
let texture_ft1 = new THREE.TextureLoader().load("../dunia/indigo_ft.jpg");
let texture_bk1 = new THREE.TextureLoader().load("../dunia/indigo_bk.jpg");
let texture_up1 = new THREE.TextureLoader().load("../dunia/flame_up.jpg");
let texture_dn1 = new THREE.TextureLoader().load("../dunia/indigo_dn.jpg");
let texture_rt1 = new THREE.TextureLoader().load("../dunia/indigo_rt.jpg");
let texture_lf1 = new THREE.TextureLoader().load("../dunia/indigo_lf.jpg");

materialArray1.push(new THREE.MeshBasicMaterial({ map: texture_ft1 }));
materialArray1.push(new THREE.MeshBasicMaterial({ map: texture_bk1 }));
materialArray1.push(new THREE.MeshBasicMaterial({ map: texture_up1 }));
materialArray1.push(new THREE.MeshBasicMaterial({ map: texture_dn1 }));
materialArray1.push(new THREE.MeshBasicMaterial({ map: texture_rt1 }));
materialArray1.push(new THREE.MeshBasicMaterial({ map: texture_lf1 }));

for (i = 0; i < 6; i++) materialArray1[i].side = THREE.BackSide;

let skyboxGeo1 = new THREE.BoxGeometry(100, 100, 100);
let skybox1 = new THREE.Mesh(skyboxGeo1, materialArray1);
skybox1.position.set(-120, 1, 1);
scene.add(skybox1);

camera.position.z = 300;
scene.background = new THREE.Color("black");
let control = new THREE.OrbitControls(camera, renderer.domElement);
var animate = function () {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
