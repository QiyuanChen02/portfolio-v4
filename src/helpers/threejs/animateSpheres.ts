import { pulsingSpheres } from "./types"

export function animateSpheres(time: number) {
	pulsingSpheres.forEach((sphere) => {
        const t = (time * sphere.pulseSpeed) % (Math.PI * 2)
		const pulse = Math.exp(-t) * 0.5 + 0.8
		sphere.mesh.scale.setScalar(pulse * sphere.baseScale)
	})
}
