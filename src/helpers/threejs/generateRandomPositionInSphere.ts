import { MathUtils, Vector3 } from "three"

export function generateRandomPositionInSphere(minRadius: number, maxRadius: number): Vector3 {
	const theta = MathUtils.randFloat(0, 2 * Math.PI)
	const phi = Math.acos(MathUtils.randFloat(-1, 1))
	const r = MathUtils.randFloat(minRadius, maxRadius)
	
	return new Vector3(
		r * Math.sin(phi) * Math.cos(theta),
		r * Math.sin(phi) * Math.sin(theta),
		r * Math.cos(phi),
	)
}
