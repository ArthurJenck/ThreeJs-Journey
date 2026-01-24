import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

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

const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')

// const floorColorTexture = textureLoader.load(
//     './floor/coast_sand_rocks_02_1k/diff.jpg'
// )
const floorColorTexture = textureLoader.load(
    './floor/aerial_rocks_02_1k/diff.jpg'
)
floorColorTexture.repeat.set(8, 8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorColorTexture.colorSpace = THREE.SRGBColorSpace

// const floorARMTexture = textureLoader.load(
//     './floor/coast_sand_rocks_02_1k/arm.jpg'
// )
const floorARMTexture = textureLoader.load('./floor/aerial_rocks_02_1k/arm.jpg')
floorARMTexture.repeat.set(8, 8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

// const floorNormalTexture = textureLoader.load(
//     './floor/coast_sand_rocks_02_1k/nor_gl.jpg'
// )
const floorNormalTexture = textureLoader.load(
    './floor/aerial_rocks_02_1k/nor_gl.jpg'
)
floorNormalTexture.repeat.set(8, 8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

// const floorDisplacementTexture = textureLoader.load(
//     './floor/coast_sand_rocks_02_1k/disp.jpg'
// )
const floorDisplacementTexture = textureLoader.load(
    './floor/aerial_rocks_02_1k/disp.jpg'
)
floorDisplacementTexture.repeat.set(8, 8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall
const wallColorTexture = textureLoader.load(
    './wall/castle_brick_broken_06_1k/diff.jpg'
)
wallColorTexture.colorSpace = THREE.SRGBColorSpace

const wallARMTexture = textureLoader.load(
    './wall/castle_brick_broken_06_1k/arm.jpg'
)

const wallNormalTexture = textureLoader.load(
    './wall/castle_brick_broken_06_1k/nor_gl.jpg'
)

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/diff.jpg')
roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 1)
roofColorTexture.wrapS = THREE.RepeatWrapping

const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/arm.jpg')

roofARMTexture.repeat.set(3, 1)
roofARMTexture.wrapS = THREE.RepeatWrapping

const roofNormalTexture = textureLoader.load(
    './roof/roof_slates_02_1k/nor_gl.jpg'
)

roofNormalTexture.repeat.set(3, 1)
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load(
    './bush/leaves_forest_ground_1k/diff.jpg'
)
bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(3, 1)
bushColorTexture.wrapS = THREE.RepeatWrapping

const bushARMTexture = textureLoader.load(
    './bush/leaves_forest_ground_1k/arm.jpg'
)

bushARMTexture.repeat.set(3, 1)
bushARMTexture.wrapS = THREE.RepeatWrapping

const bushNormalTexture = textureLoader.load(
    './bush/leaves_forest_ground_1k/nor_gl.jpg'
)

bushNormalTexture.repeat.set(3, 1)
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Grave
const graveColorTexture = textureLoader.load(
    './grave/plastered_stone_wall_1k/diff.jpg'
)
graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveColorTexture.wrapS = THREE.RepeatWrapping

const graveARMTexture = textureLoader.load(
    './grave/plastered_stone_wall_1k/arm.jpg'
)

graveARMTexture.repeat.set(0.3, 0.4)
graveARMTexture.wrapS = THREE.RepeatWrapping

const graveNormalTexture = textureLoader.load(
    './grave/plastered_stone_wall_1k/nor_gl.jpg'
)

graveNormalTexture.repeat.set(0.3, 0.4)
graveNormalTexture.wrapS = THREE.RepeatWrapping

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace

const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusioTexture = textureLoader.load(
    './door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

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
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

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

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
