import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


/**
 * Debug
 */
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg')


doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
gradientTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */

// const material = new THREE.MeshBasicMaterial( )
///***********************/
//***** Equivalent  ******/
///***********************/
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture

// material.color = new THREE.Color('#ff0000')
// material.color = new THREE.Color('#f00')
// material.color = new THREE.Color('red')
// material.color = new THREE.Color('rgb(255, 0, 0)')
// material.color = new THREE.Color(0xff0000)
// material.color = new THREE.Color('orange')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide



//***** MeshNormalMaterial ******/
///******************************/
/* *** Explanation of MeshNormalMaterial:
    explanation: This material colors 
    the surface of the geometry based on the direction of the normals.
    It creates a colorful, rainbow-like effect where different colors represent 
    different orientations of the surface. 
    This material is often used for debugging purposes to visualize the normals 
    of a geometry, but it can also be used creatively for artistic effects. 
    It does not respond to lights in the scene,so it will always display 
    the same colors regardless of lighting conditions.
*** */
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true



// MeshMatcapMaterial
///******************************/
/* *** Explanation of MeshMatcapMaterial:
    explanation: This material uses a matcap (material capture) texture to 
    simulate complex lighting and shading effects on the surface of a geometry. 
    The matcap texture is a pre-rendered image that contains information about     
    how light interacts with a material.
    When applied to a mesh, the MeshMatcapMaterial uses the matcap texture to 
    determine the color and shading of each pixel on the surface based on the 
    orientation of the surface normals. This allows for realistic rendering of 
    materials without the need for complex lighting calculations in real-time. 
    It is often used for stylized or non-photorealistic rendering, as it can 
    create unique and artistic effects based on the chosen matcap texture.
*** */
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture



// MeshDepthMaterial
///******************************/
/* *** Explanation of MeshDepthMaterial:
    explanation: This material colors the surface of the geometry based on its depth
    relative to the camera. It creates a grayscale effect where closer parts of
    the geometry appear brighter and farther parts appear darker.
*** */
// const material = new THREE.MeshDepthMaterial()



// MeshLambertMaterial
///******************************/
/* *** Explanation of MeshLambertMaterial:
    explanation: This material uses the Lambertian reflectance model to simulate
    the way light interacts with a surface. It creates a simple, non-shiny appearance
    that is often used for basic rendering of objects in a scene.
*** */
// const material = new THREE.MeshLambertMaterial()


// MeshPhongMaterial
///******************************/
/* *** Explanation of MeshPhongMaterial:
    explanation: This material uses the Phong reflectance model to simulate
    the way light interacts with a surface. It creates a more realistic appearance
    with highlights and reflections, making it suitable for rendering objects
    that have a shiny or glossy surface.
*** */
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100 
// material.specular = new THREE.Color(0x1188ff)




// MeshToonMaterial
///******************************/
/* *** Explanation of MeshToonMaterial:
    explanation: This material creates a toon-shaded appearance, 
    similar to animation styles.
*** */
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture



// MeshStandardMaterial
///******************************/
/* *** Explanation of MeshStandardMaterial:
    explanation: This material uses a physically-based rendering (PBR) approach to simulate
    the way light interacts with a surface. It provides realistic lighting and shading
    effects based on the material's properties such as roughness and metalness.
*** */
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.metalness = 1
// material.roughness = 1
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// // material.side = THREE.DoubleSide

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)



/**
 * MeshPhysicalMaterial
 */
///******************************/
/* *** Explanation of MeshPhysicalMaterial:
    explanation: This material uses a physically-based rendering (PBR) approach to simulate
    the way light interacts with a surface. It provides realistic lighting and shading
    effects based on the material's properties such as roughness and metalness.
*** */
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.metalness = 1
// material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// Clearcoat
material.clearcoat = 1
material.clearcoatRoughness = 0

gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// Sheen
material.sheen = 1
material.sheenRoughness = 0.25
material.sheenColor.set(1, 1, 1)

gui.add(material, 'sheen').min(0).max(1).step(0.0001)
gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
gui.addColor(material, 'sheenColor')


// Iridescence
material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [ 100, 800 ]

gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)


// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)



const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)




/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)


/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()