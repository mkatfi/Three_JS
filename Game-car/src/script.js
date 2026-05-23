import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

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
const matcapTexture = textureLoader.load('./textures/matcaps/3.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')


doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
gradientTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial( )
// // Equivalent
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture

// // material.map = doorColorTexture
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

// Ferrari Group
const ferrari = new THREE.Group();

// Materials
const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xcc0000, // Iconic Ferrari Red
    metalness: 0.3,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    polygonOffset: true,
    polygonOffsetFactor: 1,
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x050505,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1.0,
    transparent: true,
    opacity: 0.8,
    clearcoat: 1.0
});

// Front Bumper (Sloped and rounded)
const bumperGeo = new RoundedBoxGeometry(1.2, 0.4, 1.7, 4, 0.15);
const bumper = new THREE.Mesh(bumperGeo, bodyMaterial);
bumper.position.set(1.6, 0.3, 0);
// Slight tilt for aerodynamic nose
bumper.rotation.z = -0.15;
ferrari.add(bumper);

// Main Chassis (Sleeker body with radious)
const chassisGeo = new RoundedBoxGeometry(3.2, 0.5, 1.8, 4, 0.15);
const chassis = new THREE.Mesh(chassisGeo, bodyMaterial);
chassis.position.set(-0.4, 0.35, 0);
ferrari.add(chassis);

// Cabin (Greenhouse/Windows with aerodynamic slope)
const cabinGeo = new RoundedBoxGeometry(1.8, 0.5, 1.3, 4, 0.15);
const cabin = new THREE.Mesh(cabinGeo, glassMaterial);
cabin.position.set(-0.4, 0.8, 0);
cabin.rotation.z = 0.05; // Leaning back slightly
ferrari.add(cabin);

// Wheels & rims
const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
const rimMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8, roughness: 0.2 });
const tireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.3, 32); // Slightly wider/larger tires
const rimGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.32, 32); // Larger rims

const createWheel = (x, y, z) => {
    const wheelGroup = new THREE.Group();
    
    const tire = new THREE.Mesh(tireGeo, wheelMaterial);
    tire.rotation.x = Math.PI / 2;
    
    const rim = new THREE.Mesh(rimGeo, rimMaterial);
    rim.rotation.x = Math.PI / 2;
    
    wheelGroup.add(tire, rim);
    wheelGroup.position.set(x, y, z);
    return wheelGroup;
}

const wFrontLeft = createWheel(1.4, 0.42, 0.9);
const wFrontRight = createWheel(1.4, 0.42, -0.9);
const wRearLeft = createWheel(-1.3, 0.42, 0.9);
const wRearRight = createWheel(-1.3, 0.42, -0.9);

ferrari.add(wFrontLeft, wFrontRight, wRearLeft, wRearRight);

// Spoiler
const spoilerPillarGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 8);
const pillar1 = new THREE.Mesh(spoilerPillarGeo, bodyMaterial);
pillar1.position.set(-1.8, 0.7, 0.5);
pillar1.rotation.z = -0.2;
const pillar2 = new THREE.Mesh(spoilerPillarGeo, bodyMaterial);
pillar2.position.set(-1.8, 0.7, -0.5);
pillar2.rotation.z = -0.2;

const spoilerWingGeo = new RoundedBoxGeometry(0.4, 0.05, 1.7, 2, 0.02);
const spoilerWing = new THREE.Mesh(spoilerWingGeo, bodyMaterial);
spoilerWing.position.set(-1.9, 0.9, 0);
spoilerWing.rotation.z = -0.1;
ferrari.add(pillar1, pillar2, spoilerWing);

// Headlights (Glowing white, integrated into the rounded bumper)
const headlightGeo = new RoundedBoxGeometry(0.2, 0.1, 0.4, 2, 0.05);
const headlightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2 });
const hl1 = new THREE.Mesh(headlightGeo, headlightMaterial);
hl1.position.set(2.0, 0.4, 0.5);
hl1.rotation.z = -0.15;
const hl2 = new THREE.Mesh(headlightGeo, headlightMaterial);
hl2.position.set(2.0, 0.4, -0.5);
hl2.rotation.z = -0.15;
ferrari.add(hl1, hl2);

// Taillights (Glowing red circles)
const taillightGeo = new THREE.TorusGeometry(0.1, 0.03, 8, 16);
const taillightMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 3 });
const tl1 = new THREE.Mesh(taillightGeo, taillightMaterial);
tl1.rotation.y = Math.PI / 2;
tl1.position.set(-2.0, 0.5, 0.5);
const tl2 = new THREE.Mesh(taillightGeo, taillightMaterial);
tl2.rotation.y = Math.PI / 2;
tl2.position.set(-2.0, 0.5, -0.5);
ferrari.add(tl1, tl2);

scene.add(ferrari);

// --- Race Track Environment ---
const trackGroup = new THREE.Group();

// Make everything huge
const trackLength = 2000;

// Asphalt Ground
const asphaltGeo = new THREE.PlaneGeometry(trackLength, 20);
const asphaltMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 1.0, metalness: 0.0 });
const asphalt = new THREE.Mesh(asphaltGeo, asphaltMaterial);
asphalt.rotation.x = -Math.PI / 2; // Flat on the ground
asphalt.position.x = trackLength / 2 - 100;
trackGroup.add(asphalt);

// Center Dashed Line
const centerLineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
for (let i = -20; i < 400; i++) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.2), centerLineMaterial);
    line.rotation.x = -Math.PI / 2;
    line.position.set(i * 5, 0.01, 0); // slightly above ground to prevent z-fighting
    trackGroup.add(line);
}

// Grass borders (Huge continuous ground)
const grassGeo = new THREE.PlaneGeometry(trackLength, 500);
const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x1f5e1f, roughness: 1.0, metalness: 0.0 });

const grassTop = new THREE.Mesh(grassGeo, grassMaterial);
grassTop.rotation.x = -Math.PI / 2;
grassTop.position.set(trackLength / 2 - 100, -0.05, -260);

const grassBottom = new THREE.Mesh(grassGeo, grassMaterial);
grassBottom.rotation.x = -Math.PI / 2;
grassBottom.position.set(trackLength / 2 - 100, -0.05, 260);

trackGroup.add(grassTop, grassBottom);

// Red and White Curbs
const curbGeo = new THREE.PlaneGeometry(2, 1);
const redCurbMat = new THREE.MeshBasicMaterial({ color: 0xcc0000 });
const whiteCurbMat = new THREE.MeshBasicMaterial({ color: 0xeeeeee });

for (let i = -50; i < 500; i++) {
    // Top curb
    const curb1 = new THREE.Mesh(curbGeo, i % 2 === 0 ? redCurbMat : whiteCurbMat);
    curb1.rotation.x = -Math.PI / 2;
    curb1.position.set(i * 2, 0.02, 10.5);
    
    // Bottom curb
    const curb2 = new THREE.Mesh(curbGeo, i % 2 === 0 ? redCurbMat : whiteCurbMat);
    curb2.rotation.x = -Math.PI / 2;
    curb2.position.set(i * 2, 0.02, -10.5);
    
    trackGroup.add(curb1, curb2);
}

scene.add(trackGroup);

// --- Massive City Scenery & Environment ---
const sceneryGroup = new THREE.Group();

// Buildings
const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
const bMat1 = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 });
const bMat2 = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.9, metalness: 0.2 });
const bMat3 = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.6, metalness: 0.5 });
const bMat4 = new THREE.MeshStandardMaterial({ color: 0x607d8b, roughness: 0.7 });
const buildingMats = [bMat1, bMat2, bMat3, bMat4];

for (let i = 0; i < 300; i++) {
    const mat = buildingMats[Math.floor(Math.random() * buildingMats.length)];
    const building = new THREE.Mesh(buildingGeo, mat);
    
    const width = 10 + Math.random() * 20;
    const depth = 10 + Math.random() * 20;
    const height = 20 + Math.random() * 80; // Some tall skyscrapers
    
    building.scale.set(width, height, depth);
    
    // Spread along the track from -100 to 1800
    const x = -100 + Math.random() * 1900;
    
    // Spread them far away from the track so they form a skyline
    const isTop = Math.random() > 0.5;
    const z = isTop ? (80 + Math.random() * 400) : (-80 - Math.random() * 400);
    
    building.position.set(x, height / 2, z);
    sceneryGroup.add(building);
}

// Forests (Trees)
const trunkGeo = new THREE.CylinderGeometry(0.5, 0.6, 4, 8);
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
const leavesGeo = new THREE.ConeGeometry(3, 8, 8);
const leavesMat = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 1.0 });

for (let i = 0; i < 600; i++) {
    const tree = new THREE.Group();
    
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 2;
    
    const leaves = new THREE.Mesh(leavesGeo, leavesMat);
    leaves.position.y = 6;
    
    tree.add(trunk, leaves);
    
    // Spread trees all around
    const x = -100 + Math.random() * 1900;
    
    // Closer than buildings, but not on track
    const isTop = Math.random() > 0.5;
    const z = isTop ? (25 + Math.random() * 100) : (-25 - Math.random() * 100);
    
    tree.position.set(x, 0, z);
    
    // Optional scaling for varied height trees
    const randomScale = 0.5 + Math.random() * 1.5;
    tree.scale.set(randomScale, randomScale, randomScale);

    sceneryGroup.add(tree);
}

scene.add(sceneryGroup);

// Add Sky / Fog for atmosphere and to hide edges
scene.background = new THREE.Color(0x87ceeb); // Sky blue
scene.fog = new THREE.Fog(0x87ceeb, 50, 400); // Fades buildings smoothly at a distance

// --- Audience (Women Characters) ---
const audienceGroup = new THREE.Group();

// Geometries: A cone for a dress-like look, and a sphere for the head
const headGeo = new THREE.SphereGeometry(0.25, 16, 16);
const dressGeo = new THREE.ConeGeometry(0.35, 1.0, 16); 

// Assorted vibrant colors for dresses
const dressColors = [0xff69b4, 0x9370db, 0x40e0d0, 0xffa500, 0xff6347, 0x32cd32, 0xe0b0ff];

const createWomanCharacter = (x, z) => {
    const person = new THREE.Group();
    
    // Dress Material
    const color = dressColors[Math.floor(Math.random() * dressColors.length)];
    const dressMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.8 });
    const body = new THREE.Mesh(dressGeo, dressMat);
    body.position.y = 0.5; // Rest on ground
    
    // Head Material
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.5 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.15; // Placed above the dress
    
    person.add(body, head);
    
    // Face the track
    if (z > 0) person.rotation.y = Math.PI; // Face negative Z if on the top side
    
    person.position.set(x, 0, z);
    return person;
}

// Generate the audience along the grass borders
for (let i = 0; i < 80; i++) {
    const x = (Math.random() - 0.5) * 100; // X spread
    
    // Random side: top or bottom grass
    const isTop = Math.random() > 0.5;
    // Z range: just outside the track curbs (12 to 20 distance)
    const z = isTop ? (12 + Math.random() * 8) : (-12 - Math.random() * 8);
    
    audienceGroup.add(createWomanCharacter(x, z));
}

scene.add(audienceGroup);

// --- Developer Experience Stages (Milestones) ---
const stagesGroup = new THREE.Group();

// Helper to create a texture with text
const createTextTexture = (text) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 70px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    return new THREE.CanvasTexture(canvas);
};

// Helper to create a detailed board with text for project info
const createInfoBoard = (title, lines) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = 'rgba(20, 20, 30, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 15;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Text Setup
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    
    // Title
    ctx.font = 'bold 90px Arial';
    ctx.fillText(title, canvas.width / 2, 160);
    
    // Divider
    ctx.beginPath();
    ctx.moveTo(100, 220);
    ctx.lineTo(924, 220);
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Line Items
    ctx.font = '55px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ddd';
    lines.forEach((line, i) => {
        ctx.fillText(line, 80, 350 + (i * 100));
    });
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    
    // Creating the Mesh
    const boardMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
    const board = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), boardMaterial);
    
    // Align to face the car (negative X)
    board.rotation.y = -Math.PI / 2;
    return board;
};

const experienceStages = [
    { 
        text: "Stage 1: HTML & CSS Hero", 
        color: 0xe34f26, 
        getContent: () => createInfoBoard("HTML / CSS Journey", [
            "🧑‍🎓 Studies: Web Design Fundamentals", 
            "💻 Tech: HTML5, CSS3, Flexbox, Grid", 
            "🚀 Project: Landing Page & Portfolio"
        ])
    },
    { 
        text: "Stage 2: JavaScript Mastery", 
        color: 0xf7df1e, 
        getContent: () => createInfoBoard("JavaScript", [
            "🧑‍🎓 Studies: JS algorithms & Data Structures", 
            "💻 Tech: ES6+, DOM API, Async/Await", 
            "🚀 Project: Interactive Quiz, ToDo App"
        ]) 
    },
    { 
        text: "Stage 3: Frontend Frameworks", 
        color: 0x61dafb, 
        getContent: () => createInfoBoard("React Developer", [
            "🧑‍🎓 Studies: Advanced React Patterns", 
            "💻 Tech: React.js, Redux, Tailwind", 
            "🚀 Project: E-commerce Dashboard"
        ]) 
    },
    { 
        text: "Stage 4: Backend & APIs", 
        color: 0x4caf50, 
        getContent: () => createInfoBoard("Backend Engineering", [
            "🧑‍🎓 Studies: Node.js & Databases", 
            "💻 Tech: Express.js, MongoDB, REST APIs", 
            "🚀 Project: Full-stack Auth System"
        ]) 
    },
    { 
        text: "Stage 5: 3D WebGL (Three.js)", 
        color: 0x8a2be2, 
        getContent: () => createInfoBoard("Creative 3D Coding", [
            "🧑‍🎓 Studies: Three.js Journey Course", 
            "💻 Tech: WebGL, Three.js, Shaders", 
            "🚀 Project: Interactive 3D Portfolio"
        ]) 
    }
];

const interactiveBoxes = [];

experienceStages.forEach((stage, index) => {
    // Place them 40 units apart starting from x = 15
    const xPos = 15 + (index * 40); 
    
    const archGroup = new THREE.Group();

    // Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, 8, 16);
    const pillarMat = new THREE.MeshStandardMaterial({color: 0x333333, metalness: 0.8});
    
    const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
    leftPillar.position.set(xPos, 4, 11);
    const rightPillar = new THREE.Mesh(pillarGeo, pillarMat);
    rightPillar.position.set(xPos, 4, -11);

    // Crossbar / Sign
    const signGeo = new THREE.PlaneGeometry(24, 4);
    const signTex = createTextTexture(stage.text);
    const signMat = new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide });
    const sign = new THREE.Mesh(signGeo, signMat);
    
    // Positioned across the track, facing negative X (towards the starting car)
    sign.position.set(xPos, 7.5, 0);
    sign.rotation.y = -Math.PI / 2;

    // Small physical backing for the sign
    const signBackGeo = new THREE.BoxGeometry(0.2, 4.2, 24.2);
    const signBack = new THREE.Mesh(signBackGeo, new THREE.MeshStandardMaterial({color: 0x111111}));
    signBack.position.set(xPos + 0.1, 7.5, 0);

    archGroup.add(leftPillar, rightPillar, sign, signBack);
    stagesGroup.add(archGroup);

    // --- Interactive Box scattered as a puzzle ---
    const boxGroup = new THREE.Group();
    // Randomize position:
    // X is somewhere between the previous arch and current arch
    // Z is somewhere across the track OR on the grass
    const randomXOffset = (Math.random() - 0.5) * 20; 
    const randomZ = (Math.random() - 0.5) * 40; // Wide spread, might be in the grass
    boxGroup.position.set(xPos + randomXOffset, 0, randomZ);

    const boxMat = new THREE.MeshStandardMaterial({ color: stage.color });
    
    // Box Bottom (Open at top)
    const boxBottom = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 3), boxMat);
    boxBottom.position.y = 1;
    boxGroup.add(boxBottom);

    // Box Lid (Hinged so it can open)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(-1.5, 2, 0); // Position hinge at the back edge

    const boxLid = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 3), boxMat);
    boxLid.position.set(1.5, 0.1, 0); // Offset geometry from hinge
    lidGroup.add(boxLid);
    
    boxGroup.add(lidGroup);

    // Inside Content (Hidden initially)
    const content = stage.getContent();
    content.position.y = 1; // Hidden inside the box
    content.scale.set(0.1, 0.1, 0.1); // Scaled down initially
    boxGroup.add(content);

    stagesGroup.add(boxGroup);

    // Save reference for animation
    interactiveBoxes.push({
        xPos: xPos,
        group: boxGroup,
        bottom: boxBottom,
        lid: lidGroup,
        content: content,
        isOpened: false,
        openProgress: 0
    });
});

scene.add(stagesGroup);

// --- Compass Arrow to guide user to the next box ---
const compassGroup = new THREE.Group();
const compassArrowGeo = new THREE.ConeGeometry(0.5, 2, 8);
compassArrowGeo.rotateX(Math.PI / 2); // Point along local Z axis
const compassArrowMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const compassArrow = new THREE.Mesh(compassArrowGeo, compassArrowMat);
compassGroup.add(compassArrow);
// A little floating sphere above it
const compassOrb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
compassOrb.position.z = -1.2;
compassGroup.add(compassOrb);
scene.add(compassGroup);


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
directionalLight.position.set(50, 100, 50)
directionalLight.castShadow = true

// Configure shadow properties
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.left = -100
directionalLight.shadow.camera.right = 100
directionalLight.shadow.camera.top = 100
directionalLight.shadow.camera.bottom = -100
directionalLight.shadow.bias = -0.001 // helps prevent shadow acne

scene.add(directionalLight)

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
camera.position.x = 6
camera.position.y = 4
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true // makes the edges smoother
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Enable shadows in renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Traverse the scene to enable shadows on all applicable objects
scene.traverse((child) => {
    if (child.isMesh && child.material) {
        // Exclude specific objects from casting/receiving shadows if they are emissive or basic
        if (child.material.type !== 'MeshBasicMaterial') {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    }
})

/**
 * Car Controls & Physics
 */
const keys = { w: false, a: false, s: false, d: false }

window.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') keys.w = true
    if (e.key === 'a' || e.key === 'ArrowLeft') keys.a = true
    if (e.key === 's' || e.key === 'ArrowDown') keys.s = true
    if (e.key === 'd' || e.key === 'ArrowRight') keys.d = true
})

window.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') keys.w = false
    if (e.key === 'a' || e.key === 'ArrowLeft') keys.a = false
    if (e.key === 's' || e.key === 'ArrowDown') keys.s = false
    if (e.key === 'd' || e.key === 'ArrowRight') keys.d = false
})

// UI Button Controls
document.getElementById('btn-up').addEventListener('mousedown', () => keys.w = true)
document.getElementById('btn-up').addEventListener('mouseup', () => keys.w = false)
document.getElementById('btn-up').addEventListener('touchstart', (e) => { e.preventDefault(); keys.w = true })
document.getElementById('btn-up').addEventListener('touchend', (e) => { e.preventDefault(); keys.w = false })

document.getElementById('btn-down').addEventListener('mousedown', () => keys.s = true)
document.getElementById('btn-down').addEventListener('mouseup', () => keys.s = false)
document.getElementById('btn-down').addEventListener('touchstart', (e) => { e.preventDefault(); keys.s = true })
document.getElementById('btn-down').addEventListener('touchend', (e) => { e.preventDefault(); keys.s = false })

document.getElementById('btn-left').addEventListener('mousedown', () => keys.a = true)
document.getElementById('btn-left').addEventListener('mouseup', () => keys.a = false)
document.getElementById('btn-left').addEventListener('touchstart', (e) => { e.preventDefault(); keys.a = true })
document.getElementById('btn-left').addEventListener('touchend', (e) => { e.preventDefault(); keys.a = false })

document.getElementById('btn-right').addEventListener('mousedown', () => keys.d = true)
document.getElementById('btn-right').addEventListener('mouseup', () => keys.d = false)
document.getElementById('btn-right').addEventListener('touchstart', (e) => { e.preventDefault(); keys.d = true })
document.getElementById('btn-right').addEventListener('touchend', (e) => { e.preventDefault(); keys.d = false })

let carSpeed = 0;
let carAngle = 0;

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Handle car motion
    if (keys.w) carSpeed += 1 * deltaTime
    if (keys.s) carSpeed -= 1 * deltaTime

    // Friction/drag
    carSpeed *= 0.98

    if (keys.a && Math.abs(carSpeed) > 0.01) carAngle += 1.5 * deltaTime
    if (keys.d && Math.abs(carSpeed) > 0.01) carAngle -= 1.5 * deltaTime

    // Move car
    ferrari.rotation.y = carAngle
    ferrari.position.x += Math.cos(carAngle) * carSpeed
    ferrari.position.z -= Math.sin(carAngle) * carSpeed

    // Update sunlight position to follow the car to keep shadows sharp
    directionalLight.position.set(ferrari.position.x + 50, 100, ferrari.position.z + 50);
    directionalLight.target.position.copy(ferrari.position);
    directionalLight.target.updateMatrixWorld();

    let nextTargetBox = null;

    // Handle interactive boxes
    interactiveBoxes.forEach(box => {
        // Find the first unopened box for our compass arrow
        if (!box.isOpened && !nextTargetBox) {
            nextTargetBox = box;
        }

        // Calculate distance from car to box
        const dist = ferrari.position.distanceTo(box.group.position);

        // If close enough and not fully opened yet, trigger opening animation
        if (dist < 6.0 && !box.isOpened) {
            box.isOpened = true;
            // The box bottom and lid instantly disappear
            box.bottom.visible = false;
            box.lid.visible = false;
        }

        // Animate Opening (Make the information board appear)
        if (box.isOpened && box.openProgress < 1) {
            box.openProgress += 2 * deltaTime; // Speed of opening
            if (box.openProgress > 1) box.openProgress = 1;
            
            // Rise up the content
            box.content.position.y = 1 + (box.openProgress * 2.5); // Rise out of box
            
            // Scale up the content. Because it's a big plane (6x6), 1.0 scale is good.
            box.content.scale.set(box.openProgress, box.openProgress, box.openProgress);
        }

        // Just let it gently float up and down to look magical, but keep facing the car
        if (box.isOpened) {
            box.content.position.y = 3.5 + Math.sin(elapsedTime * 2) * 0.2;
        }
    });

    // Update Compass Arrow
    if (nextTargetBox) {
        compassGroup.visible = true;
        // Hover above the car
        compassGroup.position.copy(ferrari.position);
        compassGroup.position.y += 4 + Math.sin(elapsedTime * 4) * 0.2;
        // Point deeply towards the hidden box
        compassGroup.lookAt(nextTargetBox.group.position);
    } else {
        compassGroup.visible = false; // All boxes found!
    }

    // Rotate wheels
    const wheelRotation = carSpeed * 5
    wFrontLeft.rotation.z -= wheelRotation
    wFrontRight.rotation.z -= wheelRotation
    wRearLeft.rotation.z -= wheelRotation
    wRearRight.rotation.z -= wheelRotation

    // Camera follow (Third-person view)
    const cameraOffset = new THREE.Vector3(-8, 4, 0); // Behind and above the car
    cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), carAngle);
    
    const targetCameraPos = ferrari.position.clone().add(cameraOffset);
    camera.position.lerp(targetCameraPos, 0.1);

    // Make OrbitControls look at the car
    controls.target.copy(ferrari.position);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()