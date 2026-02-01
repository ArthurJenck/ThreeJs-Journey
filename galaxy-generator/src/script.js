import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI({
    title: 'Galaxy generator',
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const galaxyParameters = {
    count: 1000,
    size: 0.02,
    expansionFactor: 10,
}

let geometry = null
let material = null
let points = null

const generateGalaxy = () => {
    /**
     * Destroy old galaxy
     */
    if (points) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    const vertices = new Float32Array(galaxyParameters.count * 3)

    for (let i = 0; i < galaxyParameters.count; i++) {
        const i3 = i * 3

        vertices[i3 + 0] =
            (Math.random() - 0.5) * galaxyParameters.expansionFactor
        vertices[i3 + 1] =
            (Math.random() - 0.5) * galaxyParameters.expansionFactor
        vertices[i3 + 2] =
            (Math.random() - 0.5) * galaxyParameters.expansionFactor
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size: galaxyParameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    })

    points = new THREE.Points(geometry, material)

    scene.add(points)
}

generateGalaxy()

gui.add(galaxyParameters, 'count')
    .min(100)
    .max(1000000)
    .step(100)
    .onFinishChange(generateGalaxy)
gui.add(galaxyParameters, 'size')
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .onFinishChange(generateGalaxy)
gui.add(galaxyParameters, 'expansionFactor')
    .min(1)
    .max(1000)
    .onFinishChange(generateGalaxy)

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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
