import {
	FogExp2,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	type ColorRepresentation,
} from "three"

export function initScene(canvas: HTMLCanvasElement) {
	const width = window.innerWidth
	const height = window.innerHeight

	const camera = new PerspectiveCamera(60, width / height, 0.1, 200)
	const scene = new Scene()
	
	// Add fog to make distant objects dimmer
	scene.fog = new FogExp2(0x000000 as ColorRepresentation, 0.016)

	const renderer = new WebGLRenderer({ canvas, antialias: true })
	renderer.setSize(width, height)
	// Optimization: Cap pixel ratio to 2 to avoid performance issues on high-density mobile screens
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

	// Handle window resize
	window.addEventListener("resize", () => {
		const newWidth = window.innerWidth
		const newHeight = window.innerHeight
		
		camera.aspect = newWidth / newHeight
		camera.updateProjectionMatrix()
		
		renderer.setSize(newWidth, newHeight)
	})

	return { scene, camera, renderer }
}
