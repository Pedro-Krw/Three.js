var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene.background = new THREE.Color("0x0a0a0a");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
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
scene.add(cube);

var plane = new THREE.PlaneGeometry(30, 30, 120, 120);
var PlaneMaterial = new THREE.MeshLambertMaterial({
  color: "darkcyan",
});

var PlaneMesh = new THREE.Mesh(plane, PlaneMaterial);
PlaneMesh.position.set(0, -1, 0);
PlaneMesh.rotation.x = -Math.PI / 2;
scene.add(PlaneMesh);

//? ini Bagian Pencahayaan//
var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);

var point = new THREE.SpotLight(0x0000ff, 0.5);
point.receiveShadow = true;
point.position.set(2, 2, 2);
scene.add(point);

// let controls = new THREE.OrbitControls(camera, renderer.domElement);

// var pLight2 = new THREE.PointLight(0xffffff, 1);
// pLight2.position.set(4, 4, 2);
// scene.add(pLight);

// var pLight = new THREE.PointLight(0xffffff, 1);
// pLight.position.set(-4, 4, 2);
// scene.add(pLight2);

// var pLight3 = new THREE.PointLight(0xffffff, 1);
// pLight3.position.set(0, -4, 2);
// scene.add(pLight3);
camera.position.z = 10;

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
  camera.UpdateProjectMatrix();
});
window.onload = init;
