import type { Vector3 } from "three"
import type { AnimatedCube } from "./types"

export function checkCollision(
	newPos: Vector3,
	collisionRadius: number,
	existingCubes: AnimatedCube[],
): boolean {
	for (const cube of existingCubes) {
		// Since we are scaling a unit cube (width=1), the effective width is the scale
		const cubeRadius = Math.sqrt(3) * cube.mesh.scale.x
		
		const distance = newPos.distanceTo(cube.mesh.position)
		const minDistance = (collisionRadius + cubeRadius) / 2
		if (distance < minDistance) {
			return true // Collision detected
		}
	}
	return false // No collision
}
