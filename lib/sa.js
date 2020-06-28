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

var gridHelper = new THREE.GridHelper(100, 70, 0xfafafa, 0xfafafa);
gridHelper.position.y = -0.7;
scene.add(gridHelper);
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//?ini bagian dari material box yang mengunakan phong material
var geometry = new THREE.BoxGeometry(1, 1, 1);
// ini bagian kita memasukan gambar ke dalam mesh
var A = new THREE.TextureLoader().load("../img/A.jpg");
var gambar = new THREE.TextureLoader().load("../img/B.jpg");
var C = new THREE.TextureLoader().load("../img/kayu.jpg");
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

var geometry = new THREE.BoxGeometry(1, 1, 1);
// ini bagian kita memasukan gambar ke dalam mesh
var material = new THREE.MeshPhongMaterial({
  // color: 0x00ff00,
  map: A,
  shininess: 100,
  bumpMap: gambar2,
});
var cube2 = new THREE.Mesh(geometry, material);
cube2.scale.set(2, 1, 1);
cube2.position.set(-5, 0, 0);
// cube2.receiveShadow = true;
// cube2.castShadow = true;
scene.add(cube2);

var geometry = new THREE.BoxGeometry(1, 1, 1);
// ini bagian kita memasukan gambar ke dalam mesh
var material = new THREE.MeshPhongMaterial({
  // color: 0x00ff00,
  map: C,
  // shininess: 100,
});
var cube3 = new THREE.Mesh(geometry, material);
cube3.position.set(4, 0, 0);
cube3.scale.set(2, 1, 1);
// cube3.receiveShadow = true;
// cube3.castShadow = true;
scene.add(cube3);

//?ini bagian memesukan lantai yang inggin kita buat Saya mengunakan MeshLambertMAterial
var plane = new THREE.PlaneGeometry(30, 30, 120, 120);
// var catur = new THREE.TextureLoader().load("../img/catur.jpg");
var PlaneMaterial = new THREE.MeshLambertMaterial({
  color: "darkcyan",
  wireframe: false,
  // map: C,
});

var PlaneMesh = new THREE.Mesh(plane, PlaneMaterial);
PlaneMesh.receiveShadow = true;
PlaneMesh.position.set(0, -1, 0);
PlaneMesh.rotation.x = -Math.PI / 2;
scene.add(PlaneMesh);

//? ini Bagian Pencahayaan//
var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

var point = new THREE.SpotLight("white", 0.2);
// point.castShadow = true;
point.position.y = 5;
scene.add(point);

var cahaya2 = new THREE.SpotLight(0xffffff, 0.5);
cahaya2.castShadow = true;
cahaya2.position.z = 10;
scene.add(cahaya2);
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
  cube2.rotation.y += 0.01;
  cube3.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();

//cama membuat auto rezsize pada sast window di resize//
window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
});
