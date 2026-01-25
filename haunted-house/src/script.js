import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/addons/objects/Sky.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI({
    closeFolders: true,
})

gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Floor
const floorFolder = gui.addFolder('Floor')

const floorAlphaTexture = textureLoader.load('./floor/alpha.webp')

const floorColorTexture = textureLoader.load(
    './floor/coast_sand_rocks_02_1k/diff.webp'
)
const floorARMTexture = textureLoader.load(
    './floor/coast_sand_rocks_02_1k/arm.webp'
)
const floorNormalTexture = textureLoader.load(
    './floor/coast_sand_rocks_02_1k/nor_gl.webp'
)
const floorDisplacementTexture = textureLoader.load(
    './floor/coast_sand_rocks_02_1k/disp.webp'
)
// const floorColorTexture = textureLoader.load(
//     './floor/aerial_rocks_02_1k/diff.jpg'
// )
// const floorARMTexture = textureLoader.load('./floor/aerial_rocks_02_1k/arm.jpg')
// const floorNormalTexture = textureLoader.load(
//     './floor/aerial_rocks_02_1k/nor_gl.jpg'
// )
// const floorDisplacementTexture = textureLoader.load(
//     './floor/aerial_rocks_02_1k/disp.jpg'
// )

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall
const wallColorTexture = textureLoader.load(
    './wall/castle_brick_broken_06_1k/diff.webp'
)
wallColorTexture.colorSpace = THREE.SRGBColorSpace

const wallARMTexture = textureLoader.load(
    './wall/castle_brick_broken_06_1k/arm.webp'
)

const wallNormalTexture = textureLoader.load(
    './wall/castle_brick_broken_06_1k/nor_gl.webp'
)

// Roof
const roofColorTexture = textureLoader.load(
    './roof/roof_slates_02_1k/diff.webp'
)
roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 1)
roofColorTexture.wrapS = THREE.RepeatWrapping

const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/arm.webp')

roofARMTexture.repeat.set(3, 1)
roofARMTexture.wrapS = THREE.RepeatWrapping

const roofNormalTexture = textureLoader.load(
    './roof/roof_slates_02_1k/nor_gl.webp'
)

roofNormalTexture.repeat.set(3, 1)
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load(
    './bush/leaves_forest_ground_1k/diff.webp'
)
bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(3, 1)
bushColorTexture.wrapS = THREE.RepeatWrapping

const bushARMTexture = textureLoader.load(
    './bush/leaves_forest_ground_1k/arm.webp'
)

bushARMTexture.repeat.set(3, 1)
bushARMTexture.wrapS = THREE.RepeatWrapping

const bushNormalTexture = textureLoader.load(
    './bush/leaves_forest_ground_1k/nor_gl.webp'
)

bushNormalTexture.repeat.set(3, 1)
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Grave
const graveColorTexture = textureLoader.load(
    './grave/plastered_stone_wall_1k/diff.webp'
)
graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveColorTexture.wrapS = THREE.RepeatWrapping

const graveARMTexture = textureLoader.load(
    './grave/plastered_stone_wall_1k/arm.webp'
)

graveARMTexture.repeat.set(0.3, 0.4)
graveARMTexture.wrapS = THREE.RepeatWrapping

const graveNormalTexture = textureLoader.load(
    './grave/plastered_stone_wall_1k/nor_gl.webp'
)

graveNormalTexture.repeat.set(0.3, 0.4)
graveNormalTexture.wrapS = THREE.RepeatWrapping

// Door
const doorColorTexture = textureLoader.load('./door/color.webp')
doorColorTexture.colorSpace = THREE.SRGBColorSpace

const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorAmbientOcclusioTexture = textureLoader.load(
    './door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load('./door/height.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')

/**
 * House
 */
const houseMeasurements = {
    width: 4,
    height: 2.5,
    depth: 4,
}
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        transparent: true,
        alphaMap: floorAlphaTexture,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2,
    })
)

floorFolder.add(floor.material, 'displacementScale').min(0).max(1).step(0.001)
floorFolder.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001)

floor.rotation.x = -Math.PI / 2

scene.add(floor)

// House container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(
        houseMeasurements.width,
        houseMeasurements.height,
        houseMeasurements.depth
    ),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
    })
)

walls.position.y += houseMeasurements.height / 2

house.add(walls)

// Roof
const roofMeasurements = {
    radius: 3.5,
    height: 1.5,
    radialSegments: 4,
}
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(
        roofMeasurements.radius,
        roofMeasurements.height,
        roofMeasurements.radialSegments
    ),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
    })
)

roof.position.y = houseMeasurements.height + roofMeasurements.height / 2
roof.rotation.y = Math.PI / 4

house.add(roof)

// Door
const doorMeasurements = {
    width: 2.2,
    height: 2.2,
}
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(
        doorMeasurements.width,
        doorMeasurements.height,
        100,
        100
    ),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusioTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        normalMap: doorNormalTexture,
    })
)

door.position.y += houseMeasurements.height / 2 - 0.25
door.position.z += houseMeasurements.depth / 2 + 0.01

house.add(door)

// Bushes
const bushMeasurements = {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16,
}
const bushGeometry = new THREE.SphereGeometry(
    bushMeasurements.radius,
    bushMeasurements.widthSegments,
    bushMeasurements.heightSegments
)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: 0xccffcc,
    map: bushColorTexture,
    aoMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.setScalar(0.25)
bush2.position.set(1.4, 0.21, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.setScalar(0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.setScalar(0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.75

house.add(bush1, bush2, bush3, bush4)

// Graves
const graveMeasurements = {
    width: 0.6,
    height: 0.8,
    depth: 0.2,
}
const graveGeometry = new THREE.BoxGeometry(
    graveMeasurements.width,
    graveMeasurements.height,
    graveMeasurements.depth
)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i < 30; i++) {
    // Placement on graves layout
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4

    // Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    grave.position.x = Math.cos(angle) * radius
    grave.position.z = Math.sin(angle) * radius

    grave.position.y = Math.random() * (graveMeasurements.height / 2)

    // grave.rotation.y = Math
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to graves group
    graves.add(grave)
}

/**
 * Lights
 */
const lightsFolder = gui.addFolder('Lights')

// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

const ambientLightFolder = lightsFolder.addFolder('Ambient light')

ambientLightFolder.addColor(ambientLight, 'color')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(10)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const directionalLightFolder = lightsFolder.addFolder('Directional Light')

directionalLightFolder.addColor(directionalLight, 'color')
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(10)
directionalLightFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(10)
    .step(0.001)
directionalLightFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.001)
directionalLightFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.001)

// Door light
const doorLight = new THREE.PointLight('#ffac63', 1)
doorLight.position.set(0, 2.2, 2.5)
scene.add(doorLight)

const doorLightFolder = lightsFolder.addFolder('Door light')

doorLightFolder.addColor(doorLight, 'color')
doorLightFolder.add(doorLight, 'intensity').min(0).max(5).step(0.001)
doorLightFolder.add(doorLight.position, 'x').min(-10).max(10).step(0.001)
doorLightFolder.add(doorLight.position, 'y').min(-10).max(10).step(0.001)
doorLightFolder.add(doorLight.position, 'z').min(-10).max(10).step(0.001)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)

scene.add(ghost1, ghost2, ghost3)

const ghostParams = {
    ghost1AngleFactor: 0.5,
    ghost2AngleFactor: 0.38,
    ghost3AngleFactor: 0.76,
}

const ghostsFolder = gui.addFolder('Ghosts')
const ghost1Folder = ghostsFolder.addFolder('Ghost 1')
const ghost2Folder = ghostsFolder.addFolder('Ghost 2')
const ghost3Folder = ghostsFolder.addFolder('Ghost 3')

ghost1Folder.addColor(ghost1, 'color')
ghost1Folder.add(ghost1, 'intensity').min(0).max(15).step(0.001)
ghost1Folder.add(ghostParams, 'ghost1AngleFactor').min(0).max(5).name('Speed')

ghost2Folder.addColor(ghost2, 'color')
ghost2Folder.add(ghost2, 'intensity').min(0).max(15).step(0.001)
ghost2Folder.add(ghostParams, 'ghost2AngleFactor').min(0).max(5).name('Speed')

ghost3Folder.addColor(ghost3, 'color')
ghost3Folder.add(ghost3, 'intensity').min(0).max(15).step(0.001)
ghost3Folder.add(ghostParams, 'ghost3AngleFactor').min(0).max(5).name('Speed')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

controls.maxPolarAngle = Math.PI / 2 - 0.05
controls.maxDistance = 20
controls.minDistance = 4.5

controls.addEventListener('change', () => {
    if (controls.target.y < 0) {
        controls.target.y = 0
    }
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

graves.children.forEach((grave) => {
    grave.castShadow = true
    grave.receiveShadow = true
})

// Mapping
const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
)
scene.add(directionalLightCameraHelper)

directionalLightCameraHelper.visible = false

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/**
 * Sky
 */
const sky = new Sky()
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

sky.scale.setScalar(100)

scene.add(sky)

const skyFolder = gui.addFolder('Sky')
skyFolder
    .add(sky.material.uniforms['turbidity'], 'value')
    .min(0)
    .max(50)
    .step(0.001)
    .name('Turbidity')
skyFolder
    .add(sky.material.uniforms['rayleigh'], 'value')
    .min(0)
    .max(50)
    .step(0.001)
    .name('Rayleigh')
skyFolder
    .add(sky.material.uniforms['mieCoefficient'], 'value')
    .min(0)
    .max(1)
    .step(0.001)
    .name('Mie coefficient')
skyFolder
    .add(sky.material.uniforms['mieDirectionalG'], 'value')
    .min(0)
    .max(10)
    .step(0.001)
    .name('Mie directional G')

const sunPositionFolder = skyFolder.addFolder('Sun position')
sunPositionFolder.open()
sunPositionFolder
    .add(sky.material.uniforms['sunPosition'].value, 'x')
    .min(-20)
    .max(20)
    .step(0.001)
sunPositionFolder
    .add(sky.material.uniforms['sunPosition'].value, 'y')
    .min(-0.1)
    .max(0.1)
    .step(0.0001)
sunPositionFolder
    .add(sky.material.uniforms['sunPosition'].value, 'z')
    .min(-10)
    .max(0)
    .step(0.001)

/**
 * Fog
 */
// scene.fog = new THREE.Fog('#02343f', 1, 13)
scene.fog = new THREE.FogExp2('#02343f', 0.1)

const fogFolder = gui.addFolder('Fog')
fogFolder.addColor(scene.fog, 'color')

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghosts animation
    const ghost1Angle = elapsedTime * ghostParams.ghost1AngleFactor

    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y =
        Math.sin(ghost1Angle) *
        Math.sin(ghost1Angle * 2.34) *
        Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = -elapsedTime * ghostParams.ghost2AngleFactor

    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y =
        Math.sin(ghost2Angle) *
        Math.sin(ghost2Angle * 2.34) *
        Math.sin(ghost2Angle * 3.45)

    const ghost3Angle =
        -elapsedTime *
        Math.sin(ghostParams.ghost3AngleFactor) *
        Math.sin(ghostParams.ghost3AngleFactor * 50)

    ghost3.position.x = Math.cos(ghost3Angle) * 7
    ghost3.position.z = Math.sin(ghost3Angle) * 7
    ghost3.position.y =
        Math.sin(ghost3Angle) *
        Math.sin(ghost3Angle * 2.34) *
        Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
