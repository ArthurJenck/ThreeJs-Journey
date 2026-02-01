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
    innerColor: '#ff6030',
    outerColor: '#1b3984',
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomnessPower: 3,
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

    /**
     * New vertices
     */
    const vertices = new Float32Array(galaxyParameters.count * 3)
    const colors = new Float32Array(galaxyParameters.count * 3)

    for (let i = 0; i < galaxyParameters.count; i++) {
        const i3 = i * 3

        // Position
        const radius = Math.random() * galaxyParameters.radius
        const spinAngle = radius * galaxyParameters.spin
        const branchAngle =
            (Math.PI / galaxyParameters.branches) *
            2 *
            (i % galaxyParameters.branches)

        const randomX =
            Math.pow(Math.random(), galaxyParameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1)
        const randomY =
            Math.pow(Math.random(), galaxyParameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1)
        const randomZ =
            Math.pow(Math.random(), galaxyParameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1)

        vertices[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        vertices[i3 + 1] = 0 + randomY
        vertices[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        // Color
        const innerColor = new THREE.Color(galaxyParameters.innerColor)
        const outerColor = new THREE.Color(galaxyParameters.outerColor)
        const mixColor = innerColor.clone()
        mixColor.lerp(outerColor, radius / galaxyParameters.radius)

        colors[i3 + 0] = mixColor.r
        colors[i3 + 1] = mixColor.g
        colors[i3 + 2] = mixColor.b
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size: galaxyParameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    })

    points = new THREE.Points(geometry, material)

    scene.add(points)
}

generateGalaxy()

galaxyParameters.generate = generateGalaxy

gui.addColor(galaxyParameters, 'innerColor').onFinishChange(generateGalaxy)
gui.addColor(galaxyParameters, 'outerColor').onFinishChange(generateGalaxy)

const starsFolder = gui.addFolder('Stars')

starsFolder
    .add(galaxyParameters, 'count')
    .min(100)
    .max(1000000)
    .step(100)
    .name('Stars quantity')
    .onFinishChange(generateGalaxy)
starsFolder
    .add(galaxyParameters, 'size')
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .name('Stars size')
    .onFinishChange(generateGalaxy)

const branchesFolder = gui.addFolder('Galaxy branches')

branchesFolder
    .add(galaxyParameters, 'branches')
    .min(2)
    .max(20)
    .step(1)
    .name('Quantity')
    .onFinishChange(generateGalaxy)
branchesFolder
    .add(galaxyParameters, 'radius')
    .min(0.01)
    .max(20)
    .step(0.01)
    .name('Maximum radius')
    .onFinishChange(generateGalaxy)
branchesFolder
    .add(galaxyParameters, 'spin')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('Spin factor')
    .onFinishChange(generateGalaxy)
branchesFolder
    .add(galaxyParameters, 'randomnessPower')
    .min(1)
    .max(10)
    .step(0.001)
    .name('Stars randomness')
    .onFinishChange(generateGalaxy)

gui.add(galaxyParameters, 'generate').name('Re-generate')

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
