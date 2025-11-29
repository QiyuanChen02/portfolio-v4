import * as THREE from "three"

export interface AnimatedCube {
	mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>
	rotationSpeed: THREE.Vector3
}

export const cubes: AnimatedCube[] = []

export interface PulsingSphere {
	mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>
	pulseSpeed: number
	baseScale: number
}

export const pulsingSpheres: PulsingSphere[] = []
