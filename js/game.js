import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// Crear el LoadingManager
const manager = new THREE.LoadingManager();

// Crear la barra de carga
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
// Configurar el método onProgress
manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    progressBar.style.width = (itemsLoaded / itemsTotal * 100) + '%';
};

// Configurar el método onLoad
manager.onLoad = function () {
    progressContainer.style.display = 'none'; // Ocultar la barra de carga
    document.getElementById("text").style.display = 'block';
    document.getElementById("move_tips").style.display = 'block';
};
const fontLoader = new FontLoader();
let loader = new GLTFLoader(manager);
let scene = new THREE.Scene();

let about_me_position, sneakers_position, k_position, cat_position, screen_position;
fontLoader.load( '../fonts/Roboto_Bold.json', function ( font ) {
    const geometry = new TextGeometry( 'About me', {
        font: font,
      size: 15,
      height: 2,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5
    } );
    const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa }) // Cambiar el material a MeshPhongMaterial

    // Crear un objeto de malla con la geometría del texto y el material
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.y=4;
    textMesh.position.z=100;
    textMesh.position.x=100;
    textMesh.rotation.y=Math.PI;
    about_me_position = textMesh.position;
    // Añadir el objeto de malla a la escena
    textMesh.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
    scene.add(textMesh);
} );

setText("Contact", 4, 50, 300, Math.PI+Math.PI/4);
setText("Projects", 5, 100, -100, Math.PI/2+0.4);
setText("Certificates", 4, -200, 200, -Math.PI/4);
setText("Skills", 4, -200, -200, 1.2);

// Crear la cámara
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = -15;
camera.position.y = 2;

// Crear el renderizador
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

// Añadir controles de órbita para permitir la interacción con la cámara
let controls = new OrbitControls(camera, renderer.domElement);

let ambientLight = new THREE.AmbientLight(0xffffff); // luz suave gris
scene.add(ambientLight);
let directionalLight = new THREE.DirectionalLight(0xaaaaaa, 0.5);
scene.add(directionalLight);

// Crear las paredes, el suelo y el techo
let ancho_habitacion = 700; 
let geometry = new THREE.BoxGeometry(0.1, ancho_habitacion,ancho_habitacion); // Ajusta el tamaño de las paredes aquí
let material = new THREE.MeshStandardMaterial({color: 0x151515}); // Ajusta el color de las paredes aquí

let walls = [
    {position: [-ancho_habitacion/2, ancho_habitacion/2, 0], rotation: [0, 0, 0]}, // Pared izquierda
    {position: [ancho_habitacion/2, ancho_habitacion/2, 0], rotation: [0, 0, 0]}, // Pared derecha
    {position: [0, ancho_habitacion/2, -ancho_habitacion/2], rotation: [0, Math.PI / 2, 0]}, // Pared delantera
    {position: [0, ancho_habitacion/2, ancho_habitacion/2], rotation: [0, Math.PI / 2, 0]}, // Pared trasera
    {position: [0, 0, 0], rotation: [0, 0, Math.PI / 2]}, // Suelo
    {position: [0, ancho_habitacion, 0], rotation: [0, 0, Math.PI / 2]} // Techo
];

for (const element of walls) {
    let wall = new THREE.Mesh(geometry, material);
    wall.position.set(...element.position);
    wall.rotation.set(...element.rotation);
    wall.receiveShadow = true;
    wall.userData.collidable=true;
    scene.add(wall);
}

let car;
loader.load('../3d/car/scene.gltf', function(gltf) {
    car = gltf.scene;
    car.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
            node.castShadow = true;
        }
    });
    car.position.y=1;
    scene.add(car);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target = car.position;
}, undefined, function(error) {
    // En caso de error al cargar el objeto GLTF
    console.error(error);
});

let sneakers;
loader.load('../3d/sneakers/source/Seen_low_2K.glb', function (gltf) {
    // Añadir el modelo cargado a la escena
    sneakers = gltf.scene;
    sneakers.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
            node.castShadow = true;
        }
    });
    sneakers.scale.set(60, 60, 60); // Ajusta los valores según sea necesario
    sneakers.position.set(-120, 0, 150); // Ajusta los valores según sea necesario
    sneakers.rotation.y = Math.PI+Math.PI/2;
    sneakers_position = sneakers.position;
    scene.add(sneakers);
}, undefined, function (error) {
    console.error(error);
});

let cat;
let burger;
loader.load('../3d/burger/scene.gltf', function (gltf) {
    // Añadir el modelo cargado a la escena
    burger = gltf.scene;
    burger.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
            node.castShadow = true;
        }
    });
    burger.scale.set(0.02, 0.02, 0.02); // Ajusta los valores según sea necesario
    burger.position.set(-166, 2, 92); // Ajusta los valores según sea necesario
    burger.rotation.y = -Math.PI/2 + 0.4;
    scene.add(burger);
}, undefined, function (error) {
    console.error(error);
});
loader.load('../3d/cat/scene.gltf', function (gltf) {
    // Añadir el modelo cargado a la escena
    cat = gltf.scene;
    cat.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
            node.castShadow = true;
        }
    });
    cat.scale.set(20, 20, 20); // Ajusta los valores según sea necesario
    cat.position.set(-170,0,89); // Ajusta los valores según sea necesario
    cat.rotation.y = Math.PI/2+0.5;
    cat_position = cat.position;
    scene.add(cat);
}, undefined, function (error) {
    console.error(error);
});

let k;
loader.load('../3d/k/nocuk_logo.glb', function (gltf) {
    // Añadir el modelo cargado a la escena
    k = gltf.scene;
    k.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
            node.castShadow = true;
        }
    });
    k.scale.set(3, 3, 3); // Ajusta los valores según sea necesario
    k.position.set(-150,4,25); // Ajusta los valores según sea necesario
    k.rotation.y = Math.PI/2-0.2;
    k_position = k.position;
    scene.add(k);
}, undefined, function (error) {
    console.error(error);
});

let screen;
loader.load('../3d/screen/untitled.glb', function (gltf) {
    // Añadir el modelo cargado a la escena
    screen = gltf.scene;
    screen.traverse(function(node) {
        if (node instanceof THREE.Mesh) {
            node.castShadow = true;
        }
    });
    screen.scale.set(10, 10, 10); // Ajusta los valores según sea necesario
    screen.position.set(-205,0,-25); // Ajusta los valores según sea necesario
    screen.rotation.y = Math.PI/2-0.2;
    screen_position = screen.position;
    scene.add(screen);
}, undefined, function (error) {
    console.error(error);
});


// Crear un array para almacenar las lámparas
let lamps = [];
let lights = [];
let separation = ancho_habitacion / 2; // Ajusta la separación aquí
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
        // Cargar la lámpara GLTF
        loader.load('../3d/ceiling_lamp/scene.gltf', function(gltf) {
            // Ajustar la posición de la lámpara
            gltf.scene.position.set(i * separation - ancho_habitacion / 2 + separation, 50, j * separation - ancho_habitacion / 2 + separation); // Ajusta la posición aquí según sea necesario
            // Escalar la lámpara
            gltf.scene.scale.set(3, 3, 3);
            // Añadir la lámpara cargada a la escena
            scene.add(gltf.scene);
            // Añadir la lámpara al array de lámparas
            lamps.push(gltf.scene);

            // Crear una luz puntual
let spotLight = new THREE.SpotLight(0x999999, 0.4);
// Ajustar la posición de la luz para que coincida con la de la lámpara
spotLight.position.copy(gltf.scene.position);
// Hacer que la luz mire hacia abajo
spotLight.lookAt(spotLight.position.x, 0, spotLight.position.z);
// Habilitar la proyección de sombras
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 8192; // Ajusta estos valores según sea necesario
spotLight.shadow.mapSize.height = 8192;
// Atenuar los bordes de la luz
spotLight.penumbra = 0.5;
// Añadir la luz a la escena
scene.add(spotLight);
// Añadir la luz al array de luces
lights.push(spotLight);
let spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
        }, undefined, function(error) {
            // En caso de error al cargar la lámpara GLTF
            console.error(error);
        });
    }
}
let speed = 0;
let maxSpeed = 0.3;
let acceleration = 0.1;


let keys = {w: false, a: false, s: false, d: false, shift: false};

window.addEventListener('keydown', function(event) {
    if (event.key === 'w'||event.key === 'W') keys.w = true;
    else if (event.key === 'a'||event.key === 'A') keys.a = true;
    else if (event.key === 's'||event.key === 'S') keys.s = true;
    else if (event.key === 'd'||event.key === 'D') keys.d = true;
    else if(event.key==='Shift')keys.shift=true;
});

window.addEventListener('keyup', function(event) {
    if (event.key === 'w'||event.key === 'W') keys.w = false;
    else if (event.key === 'a'||event.key === 'A') keys.a = false;
    else if (event.key === 's'||event.key === 'S') keys.s = false;
    else if (event.key === 'd'||event.key === 'D') keys.d = false;
    else if(event.key==='Shift')keys.shift=false;
});

let deceleration = 0.005;


function animate() {
    if (car) {
        let rotationSpeed = 0.03; // Ajusta la velocidad de rotación aquí
        let lerpFactor = 0.05; // Ajusta el factor de interpolación lineal aquí

        let distance = -10; // Ajusta la distancia de la cámara aquí
        if (keys.w) {
            speed = Math.min(speed + acceleration, maxSpeed); // No permitir que la velocidad supere la velocidad máxima
        } else if (keys.s) {
            speed = Math.max(speed - acceleration, -maxSpeed); // No permitir que la velocidad supere la velocidad máxima
        } else {
            distance = -10;
            if(speed > 0){
                speed -=deceleration;
            }
            else if(speed < 0){
                speed+=deceleration
            }
        }
        if(keys.s && speed < 0)
            distance = 10; // Cambia la distancia para que la cámara esté delante del coche

        if ((keys.a && keys.s)) {
            car.rotation.y -= rotationSpeed;
        }else if(keys.a || (keys.a && keys.w)){
            car.rotation.y += rotationSpeed;
        }
        if (keys.d && keys.s) {
            car.rotation.y += rotationSpeed;
        }else if(keys.d || (keys.d && keys.w)){
            car.rotation.y -= rotationSpeed;
        }
        if(keys.shift){
            acceleration = 0.2;
            maxSpeed = 0.5;
        }else{
            acceleration = 0.1;
            maxSpeed = 0.3;
        }
        if(keys.a || keys.s || keys.d || keys.w)
            document.getElementById("move_tips").style.display = 'none';

        // Mover el coche a la velocidad actual
        car.translateZ(speed);

        // Calcular la nueva posición de la cámara
        let newCameraPositionX = car.position.x + distance * Math.sin(car.rotation.y);
        let newCameraPositionZ = car.position.z + distance * Math.cos(car.rotation.y);
        camera.position.x = new THREE.Vector3().lerpVectors(camera.position, new THREE.Vector3(newCameraPositionX, camera.position.y, newCameraPositionZ), lerpFactor).x;
        camera.position.y = car.position.y + 3; // Ajusta la altura de la cámara aquí
        camera.position.z = new THREE.Vector3().lerpVectors(camera.position, new THREE.Vector3(newCameraPositionX, camera.position.y, newCameraPositionZ), lerpFactor).z;

        // Hacer que la cámara mire al coche
        controls.target = car.position;

        directionalLight.position.copy(camera.position);
        directionalLight.target = car;

        // Actualizar los controles de órbita
        controls.update();
        if(sneakers_position != null && cat_position != null && k_position != null){ 
            let distance_snakers = car.position.distanceTo(sneakers_position);
            let distance_cat = car.position.distanceTo(cat_position);
            let distance_k = car.position.distanceTo(k_position);
            let distance_screen = car.position.distanceTo(screen_position);
            if(distance_snakers<25){
                document.getElementById("text").textContent="PRESS [SPACE] TO VIEW THE PROJECT";
            }
            else if(distance_k < 10){
                document.getElementById("text").textContent="PRESS [SPACE] TO VIEW THE PROJECT 3";
            }else if(distance_cat < 15){
                document.getElementById("text").textContent="PRESS [SPACE] TO VIEW THE PROJECT 2";
            }else if(distance_screen < 20)
                document.getElementById("text").textContent="PRESS [SPACE] TO VIEW THE PROJECT 4"
            else{
                // document.getElementById("text").textContent = car.position.x + " " + car.position.z;
                document.getElementById("text").textContent="IN PROGRESS";
            }
        }
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Llamar a la función de animación
animate();


function setText(text, y, z, x, ang){
    fontLoader.load( '../fonts/Roboto_Bold.json', function ( font ) {
        const geometry = new TextGeometry( text, {
            font: font,
            size: 15,
            height: 2,
            curveSegments: 12,
            bevelEnabled: false
        } );
        const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa }) // Cambiar el material a MeshPhongMaterial
    
        // Crear un objeto de malla con la geometría del texto y el material
        const textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.y=y;
        textMesh.position.z=z;
        textMesh.position.x=x;
        textMesh.rotation.y=ang;
        textMesh.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        // Añadir el objeto de malla a la escena
        scene.add(textMesh);
    } );
}