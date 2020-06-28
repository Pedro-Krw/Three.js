var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

//? Ini bagian seting cajhaya Background dari keseluruhan scene//
scene.background = new THREE.Color("0x0a0a0a");
//
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//?ini bagian dari material box yang mengunakan phong material
var geometry = new THREE.BoxGeometry(1, 1, 1);
// ini bagian kita memasukan gambar ke dalam mesh
var gambar = new THREE.TextureLoader().load("../img/B.jpg");
var gambar2 = new THREE.TextureLoader().load("../img/catur.jpg");
var material = new THREE.MeshPhongMaterial({
  // color: 0x00ff00,
  map: gambar,
  shininess: 100,
  bumpMap: gambar2,
});
var cube = new THREE.Mesh(geometry, material);
cube.receiveShadow = true;
cube.castShadow = true;
scene.add(cube);

//?ini bagian memesukan lantai yang inggin kita buat Saya mengunakan MeshLambertMAterial
var plane = new THREE.PlaneGeometry(30, 30, 120, 120);
// var catur = new THREE.TextureLoader().load("../img/catur.jpg");
var PlaneMaterial = new THREE.MeshLambertMaterial({
  color: "darkcyan",
  wireframe: true,
  // map: catur,
});

var PlaneMesh = new THREE.Mesh(plane, PlaneMaterial);
PlaneMesh.receiveShadow = true;
PlaneMesh.position.set(0, -1, 0);
PlaneMesh.rotation.x = -Math.PI / 2;
scene.add(PlaneMesh);

//? ini Bagian Pencahayaan//
var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

var point = new THREE.SpotLight(0xffffff, 0.5);
point.castShadow = true;
point.position.set(2, 2, 2);
scene.add(point);
camera.position.z += 10;
// let controls = new THREE.OrbitControls(camera, renderer.domElement);
let control = new THREE.OrbitControls(camera, renderer.domElement);
// document.body.onkeydown = function (e) {
//   if (e.key == "s") {
//     camera.position.z += 0.03;
//   } else if (e.key == "w") {
//     camera.position.z -= 0.03;
//   } else if (e.key == "a") {
//     camera.position.x -= 0.03;
//   } else if (e.key == "d") {
//     camera.position.x += 0.03;
//   }
// };

var animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();

//cama membuat auto rezsize pada sast window di resize//
window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
});
