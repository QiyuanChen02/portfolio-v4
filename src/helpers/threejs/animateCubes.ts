import { cubes } from "./types"

export function animateCubes() {
	cubes.forEach((cube) => {
		cube.mesh.rotation.x += cube.rotationSpeed.x
		cube.mesh.rotation.y += cube.rotationSpeed.y
		cube.mesh.rotation.z += cube.rotationSpeed.z
	})
}
