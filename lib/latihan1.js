var scene, camera, renderer, mesh, napi, teksture;
var meshFloor;

var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02 };
var USE_WIREFRAME = false;

function gambar() {
  var kam = new THREE.TextureLoader().load("../img/2.jpg");
  return kam;
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);

  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      //   color: "lime",
      wireframe: false,
      map: gambar(),
    })
  );

  napi = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "darkcyan", wireframe: true })
  );
  napi.position.y += 3;
  scene.add(napi);

  mesh.position.y += 1; // Move the mesh up 1 meter
  scene.add(mesh);

  meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30, 120, 120),
    new THREE.MeshBasicMaterial({ color: "darkcyan", wireframe: false })
  );
  meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
  scene.add(meshFloor);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  light = new THREE.PointLight(0xffffff, 0.8, 18);
  light.position.set(-3, 6, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  scene.add(light);

  // Texture Loading
  var textureLoader = new THREE.TextureLoader();
  crateTexture = textureLoader.load("crate0/crate0_diffuse.png");
  crateBumpMap = textureLoader.load("crate0/crate0_bump.png");
  crateNormalMap = textureLoader.load("crate0/crate0_normal.png");

  // Create mesh with these textures
  crate = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 3),
    new THREE.MeshPhongMaterial({
      color: 0xff00000,

      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
    })
  );
  scene.add(crate);
  crate.position.set(2.5, 3 / 2, 2.5);
  crate.receiveShadow = true;
  crate.castShadow = true;

  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0, player.height, 0));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  napi.rotation.y += 0.01;
  mesh.rotation.y += 0.02;
  // Keyboard movement inputs
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
    // Redirect motion by 90 degrees
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

  // Keyboard turn inputs
  if (keyboard[37]) {
    // left arrow key
    camera.rotation.y -= player.turnSpeed;
  }
  if (keyboard[39]) {
    // right arrow key
    camera.rotation.y += player.turnSpeed;
  }

  renderer.render(scene, camera);
}

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

//cama membuat auto rezsize pada sast window di resize//
window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.UpdateProjectMatrix();
});
window.onload = init;
