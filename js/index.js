window.onload = function () {
    const width = window.innerWidth
    const height = window.innerHeight
    const canvas = document.querySelector("#canvas")

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)


    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setClearColor(0xdddddd)

    const scene = new THREE.Scene()

//  ----CAMERA
    const fov = 40
    const aspect = width / height
    const near = 1
    const far = 5000

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 10)
    camera.rotation.y = 45

// ----- LIGHT
    const colorLight = 0x404040;
    let intensity = 5
    const hlight = new THREE.AmbientLight(colorLight, intensity);
    scene.add(hlight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(0, 1, 0)
    directionalLight.castShadow = true
    scene.add(directionalLight)



// -------- GLTFLoader
    const loader = new THREE.GLTFLoader()
    loader.load('texture/build1/scene.gltf', function (gltf) {
        const house = gltf.scene.children[0]
        house.scale.set(0.5, 0.5, 0.5)
        scene.add(gltf.scene)
    })

// ----ORBIT CONTROLS
    const control = new THREE.OrbitControls(camera, canvas);
    control.target.set(0, 0, -20);
    control.update();


//------------------- RAYNCASTER

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        render()
    }

    function removeScene(object) {
        scene.remove(object)
    }


    function render() {
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);

        for (var i = 0; i < intersects.length; i++) {
            removeScene(scene.children[i])
        }

        renderer.render(scene, camera);

    }
    addEventListener('mousedown', onMouseMove, false);


    function loop() {
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
    }

    loop()
}