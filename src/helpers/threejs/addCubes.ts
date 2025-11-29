import * as THREE from "three"
import { cubes } from "./types"
import { generateRandomPositionInSphere } from "./generateRandomPositionInSphere"
import { checkCollision } from "./checkCollision"

// Shared resources to avoid recreating them for every cube
const baseGeometry = new THREE.BoxGeometry(1, 1, 1)
const baseEdges = new THREE.EdgesGeometry(baseGeometry)
const baseMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.0,      // Invisible cube faces
    colorWrite: false, // Invisible faces
    depthWrite: true,  // But writes to depth buffer to occlude lines
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
})
const baseLineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
})

function addCube(scene: THREE.Scene): boolean {
    const edgeLength = THREE.MathUtils.randFloat(1.5, 2.5)
    const collisionRadius = Math.sqrt(3) * edgeLength

    const position = generateRandomPositionInSphere(20, 80)

    if (checkCollision(position, collisionRadius, cubes)) {
        return false
    }

    // Reuse shared geometry and material
    const cube = new THREE.Mesh(baseGeometry, baseMaterial)
    
    // Scale the unit cube to the desired size
    cube.scale.setScalar(edgeLength)

    cube.position.copy(position)

    const randomAngle = () => THREE.MathUtils.randFloatSpread(2 * Math.PI)
    cube.rotation.set(
        randomAngle(),
        randomAngle(),
        randomAngle(),
    )

    // Reuse shared edges geometry and material
    const wireframe = new THREE.LineSegments(baseEdges, baseLineMaterial)
    cube.add(wireframe)
    scene.add(cube)

    // Store cube with random rotation speeds
    const randomRotationSpeed = () => THREE.MathUtils.randFloatSpread(0.015)
    cubes.push({
        mesh: cube,
        rotationSpeed: new THREE.Vector3(
            randomRotationSpeed(),
            randomRotationSpeed(),
            randomRotationSpeed(),
        ),
    })

    return true
}

export function addCubes(scene: THREE.Scene, numCubes: number) {
	let added = 0
	let attempts = 0
	const maxAttempts = numCubes * 10

	while (added < numCubes && attempts < maxAttempts) {
		if (addCube(scene)) {
			added++
		}
		attempts++
	}
}
