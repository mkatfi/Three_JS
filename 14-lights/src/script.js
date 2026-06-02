import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

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
 * Lights
 */
/***** Ambient Light *****/
/** Ambient light is a global light source that illuminates all 
 * objects in the scene equally, regardless of their position 
 * or orientation. It does not cast shadows and does not have 
 * a specific direction. It is often used to provide a base level
 *  of illumination to the entire scene, ensuring that no part of
 *  it is completely dark. The intensity and color of ambient 
 * light can be adjusted to create different moods and 
 * atmospheres in the scene.
 *  *****/
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)

/******  Directional light *****/
/** Directional light is a type of light source that simulates
 *  light coming from a specific direction, similar to sunlight. 
 * It is defined by a direction vector and an intensity value.
 *  Directional light illuminates all objects in the scene as if 
 * they were being lit by a distant light source. It casts shadows
 *  and can create strong highlights and shadows on objects, 
 * depending on their orientation to the light source. The color
 *  of directional light can also be adjusted to create different
 *  moods and atmospheres in the scene.
 *  *****/
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
scene.add(directionalLight)
directionalLight.position.set(1, 0.25, 0)


/****** Hemisphere light *****/
/** Hemisphere light is a type of light source that simulates
 *  the lighting conditions of a hemisphere, typically used to
 *  create a more natural and realistic lighting environment.
 *  It is defined by two colors: the sky color and the ground color.
 *  The intensity of the hemisphere light can be adjusted to create
 *  different moods and atmospheres in the scene.
 *  *****/
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
scene.add(hemisphereLight)

/******  Point light *****/
/** Point light is a type of light source that emits light in all 
 *  directions from a single point. It is defined by a position and an intensity value.
 *  Point light illuminates objects in the scene based on their distance from the light source.
 *  It casts shadows and can create realistic lighting effects.
 *  *****/
// const pointLight = new THREE.PointLight(0xff9000, 1.5, 0)
// const pointLight = new THREE.PointLight(0xff9000, 1.5, 0, 0.5)
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
pointLight.position.set(1, - 0.5, 1)
scene.add(pointLight)

/******  React area light *****/
/** RectAreaLight is a type of light source that emits light from a rectangular area.
 *  It is defined by a position, a width, a height, and an intensity value.
 *  RectAreaLight illuminates objects in the scene based on their distance 
 *  from the light source and their orientation to the light.
 *  It does not cast shadows but can create soft lighting effects.
 *  *****/
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1)
scene.add(rectAreaLight)
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())


/****** Spot light *****/
/** Spot light is a type of light source that emits light in a cone shape from a single point.
 *  It is defined by a position, a direction, an intensity, a distance, a penumbra, and a angle.
 *  Spot light illuminates objects in the scene based on their distance from the light source 
 *  and their orientation to the light.
 *  It casts shadows and can create dramatic lighting effects.
 *  *****/
const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.target.position.x = - 0.75
spotLight.position.set(0, 2, 3)
scene.add(spotLight.target)
scene.add(spotLight)

/**
 * Helpers
 */

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
