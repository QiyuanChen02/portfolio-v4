import {
	MathUtils,
	Mesh,
	MeshBasicMaterial,
	Scene,
	SphereGeometry,
} from "three"
import { generateRandomPositionInSphere } from "./generateRandomPositionInSphere"
import { pulsingSpheres } from "./types"

export function addSpheres(scene: Scene, numSpheres: number) {
	// Optimization: Create geometry and material ONCE and reuse them
	const baseGeometry = new SphereGeometry(1, 4, 4)
	const baseMaterial = new MeshBasicMaterial({ color: 0xffffff })

	for (let i = 0; i < numSpheres; i++) {
		const radius = MathUtils.randFloat(0.1, 0.12)
		
		// Reuse geometry/material
		const sphere = new Mesh(baseGeometry, baseMaterial)
		
		// Scale the mesh to the desired radius instead of creating new geometry
		sphere.scale.setScalar(radius)

		const position = generateRandomPositionInSphere(30, 120)
		sphere.position.copy(position)

		scene.add(sphere)

        pulsingSpheres.push({
            mesh: sphere,
            pulseSpeed: MathUtils.randFloat(0.0005, 0.002),
			baseScale: radius,
        })
    }
}
