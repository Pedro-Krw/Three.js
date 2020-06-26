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
// ini bagian materialnya Mesh
var geometry = new THREE.BoxGeometry(2, 2, 2);
var teksture = new THREE.TextureLoader().load("img/myLOGO.png");
var material = new THREE.MeshBasicMaterial({
  //   color: 0xff0000,
  map: teksture,
  //   wireframe:true
});
var cube = new THREE.Mesh(geometry, material);
//akhihr dari bagian matrialnya
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
