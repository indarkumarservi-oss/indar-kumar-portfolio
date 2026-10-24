"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useReducedMotion } from "@/hooks"

export function GlobalBackground({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000)
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ===== LAYER 1: Deep Space Particles =====
    const deepParticleCount = reducedMotion ? 600 : 2000
    const deepGeometry = new THREE.BufferGeometry()
    const deepPositions = new Float32Array(deepParticleCount * 3)
    const deepColors = new Float32Array(deepParticleCount * 3)
    const deepSizes = new Float32Array(deepParticleCount)
    const deepVelocities = new Float32Array(deepParticleCount * 3)
    const deepPhases = new Float32Array(deepParticleCount)

    const colorPrimary = new THREE.Color("hsl(var(--primary))")
    const colorSecondary = new THREE.Color("#00ffff")
    const colorAccent = new THREE.Color("#ff0066")

    for (let i = 0; i < deepParticleCount; i++) {
      const radius = 100 + Math.random() * 300
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      deepPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      deepPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      deepPositions[i * 3 + 2] = radius * Math.cos(phi) - 200

      const colorChoice = Math.random()
      if (colorChoice < 0.5) {
        deepColors[i * 3] = colorPrimary.r * 0.25
        deepColors[i * 3 + 1] = colorPrimary.g * 0.25
        deepColors[i * 3 + 2] = colorPrimary.b * 0.25
      } else if (colorChoice < 0.75) {
        deepColors[i * 3] = colorSecondary.r * 0.15
        deepColors[i * 3 + 1] = colorSecondary.g * 0.15
        deepColors[i * 3 + 2] = colorSecondary.b * 0.15
      } else {
        deepColors[i * 3] = colorAccent.r * 0.1
        deepColors[i * 3 + 1] = colorAccent.g * 0.1
        deepColors[i * 3 + 2] = colorAccent.b * 0.1
      }

      deepSizes[i] = 0.2 + Math.random() * 0.6
      deepVelocities[i * 3] = (Math.random() - 0.5) * 0.003
      deepVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      deepVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003
      deepPhases[i] = Math.random() * Math.PI * 2
    }

    deepGeometry.setAttribute("position", new THREE.BufferAttribute(deepPositions, 3))
    deepGeometry.setAttribute("color", new THREE.BufferAttribute(deepColors, 3))
    deepGeometry.setAttribute("size", new THREE.BufferAttribute(deepSizes, 1))

    const deepMaterial = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const deepParticles = new THREE.Points(deepGeometry, deepMaterial)
    scene.add(deepParticles)

    // ===== LAYER 2: Flowing Data Field =====
    const fieldParticleCount = reducedMotion ? 400 : 1200
    const fieldGeometry = new THREE.BufferGeometry()
    const fieldPositions = new Float32Array(fieldParticleCount * 3)
    const fieldColors = new Float32Array(fieldParticleCount * 3)
    const fieldSizes = new Float32Array(fieldParticleCount)
    const fieldVelocities = new Float32Array(fieldParticleCount * 3)
    const fieldNoiseOffset = new Float32Array(fieldParticleCount)

    for (let i = 0; i < fieldParticleCount; i++) {
      fieldPositions[i * 3] = (Math.random() - 0.5) * 600
      fieldPositions[i * 3 + 1] = (Math.random() - 0.5) * 600
      fieldPositions[i * 3 + 2] = (Math.random() - 0.5) * 400 - 100

      const intensity = 0.3 + Math.random() * 0.5
      fieldColors[i * 3] = colorPrimary.r * intensity
      fieldColors[i * 3 + 1] = colorPrimary.g * intensity
      fieldColors[i * 3 + 2] = colorPrimary.b * intensity

      fieldSizes[i] = 0.5 + Math.random() * 1.2
      fieldVelocities[i * 3] = (Math.random() - 0.5) * 0.015
      fieldVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015
      fieldVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008
      fieldNoiseOffset[i] = Math.random() * Math.PI * 2
    }

    fieldGeometry.setAttribute("position", new THREE.BufferAttribute(fieldPositions, 3))
    fieldGeometry.setAttribute("color", new THREE.BufferAttribute(fieldColors, 3))
    fieldGeometry.setAttribute("size", new THREE.BufferAttribute(fieldSizes, 1))

    const fieldMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const fieldParticles = new THREE.Points(fieldGeometry, fieldMaterial)
    scene.add(fieldParticles)

    // ===== LAYER 3: Geometric Constellations =====
    const constellations = new THREE.Group()
    const constellationCount = reducedMotion ? 2 : 6

    for (let c = 0; c < constellationCount; c++) {
      const geoType = Math.floor(Math.random() * 5)
      let geometry: THREE.BufferGeometry
      const size = 20 + Math.random() * 40

      if (geoType === 0) geometry = new THREE.IcosahedronGeometry(size, 0)
      else if (geoType === 1) geometry = new THREE.OctahedronGeometry(size, 0)
      else if (geoType === 2) geometry = new THREE.TetrahedronGeometry(size, 0)
      else if (geoType === 3) geometry = new THREE.DodecahedronGeometry(size, 0)
      else geometry = new THREE.BoxGeometry(size, size, size)

      const edges = new THREE.EdgesGeometry(geometry)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color("hsl(var(--primary))"),
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      })

      const mesh = new THREE.LineSegments(edges, lineMaterial)
      mesh.position.set(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 400 - 100
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.0005,
          y: (Math.random() - 0.5) * 0.0005,
          z: (Math.random() - 0.5) * 0.0005,
        },
        orbitRadius: 50 + Math.random() * 150,
        orbitSpeed: 0.0001 + Math.random() * 0.0003,
        orbitPhase: Math.random() * Math.PI * 2,
        orbitAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
      }
      constellations.add(mesh)
    }
    scene.add(constellations)

    // ===== LAYER 4: Energy Beams =====
    const beams = new THREE.Group()
    const beamCount = reducedMotion ? 5 : 15

    for (let i = 0; i < beamCount; i++) {
      const points = []
      const segments = 15
      for (let j = 0; j <= segments; j++) {
        const t = j / segments
        const x = (Math.random() - 0.5) * 500
        const y = (Math.random() - 0.5) * 500
        const z = -200 + t * 500
        points.push(new THREE.Vector3(x, y, z))
      }

      const curve = new THREE.CatmullRomCurve3(points)
      const tubeGeometry = new THREE.TubeGeometry(curve, 30, 0.2, 8, false)
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() < 0.5 ? new THREE.Color("hsl(var(--primary))") : new THREE.Color("#00ffff"),
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
        side: THREE.DoubleSide,
      })

      const beam = new THREE.Mesh(tubeGeometry, beamMaterial)
      beam.userData = { progress: Math.random(), speed: 0.00015 + Math.random() * 0.0004 }
      beams.add(beam)
    }
    scene.add(beams)

    // ===== LAYER 5: Subtle Grid Floor =====
    const gridGeometry = new THREE.PlaneGeometry(800, 800, 80, 80)
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("hsl(var(--primary))"),
      transparent: true,
      opacity: 0.015,
      wireframe: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const grid = new THREE.Mesh(gridGeometry, gridMaterial)
    grid.rotation.x = -Math.PI / 2
    grid.position.y = -250
    scene.add(grid)

    // ===== MOUSE INTERACTION =====
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    container.addEventListener("mousemove", handleMouseMove)

    // ===== ANIMATION LOOP =====
    let animationId: number
    let time = 0

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      time += 0.016

      const scrollProgress = Math.min(scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight), 1)
      const scrollInfluence = scrollProgress * 300

      // Deep particles
      deepParticles.rotation.y += 0.00003
      deepParticles.rotation.x += 0.00001
      deepParticles.position.y = -scrollInfluence * 0.08

      const deepPosArray = deepGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < deepParticleCount; i++) {
        deepPosArray[i * 3] += deepVelocities[i * 3]
        deepPosArray[i * 3 + 1] += deepVelocities[i * 3 + 1] + Math.sin(time * 0.3 + deepPhases[i]) * 0.0015
        deepPosArray[i * 3 + 2] += deepVelocities[i * 3 + 2] + Math.cos(time * 0.2 + deepPhases[i]) * 0.001

        const dist = Math.sqrt(
          deepPosArray[i * 3] ** 2 +
          deepPosArray[i * 3 + 1] ** 2 +
          deepPosArray[i * 3 + 2] ** 2
        )
        if (dist > 400) {
          const factor = 400 / dist
          deepPosArray[i * 3] *= factor
          deepPosArray[i * 3 + 1] *= factor
          deepPosArray[i * 3 + 2] *= factor
        }
      }
      deepGeometry.attributes.position.needsUpdate = true

      // Field particles - noise-based flow
      const fieldPosArray = fieldGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < fieldParticleCount; i++) {
        const noiseX = Math.sin(time * 0.4 + fieldNoiseOffset[i] + fieldPosArray[i * 3] * 0.01)
        const noiseY = Math.cos(time * 0.4 + fieldNoiseOffset[i] + fieldPosArray[i * 3 + 1] * 0.01)
        const scrollWave = Math.sin(scrollProgress * Math.PI * 6 + fieldNoiseOffset[i])

        fieldPosArray[i * 3] += fieldVelocities[i * 3] + noiseX * 0.008 + scrollWave * 0.01
        fieldPosArray[i * 3 + 1] += fieldVelocities[i * 3 + 1] + noiseY * 0.008
        fieldPosArray[i * 3 + 2] += fieldVelocities[i * 3 + 2] + scrollWave * 0.015

        // Wrap around with large bounds
        if (fieldPosArray[i * 3] > 300) fieldPosArray[i * 3] = -300
        if (fieldPosArray[i * 3] < -300) fieldPosArray[i * 3] = 300
        if (fieldPosArray[i * 3 + 1] > 300) fieldPosArray[i * 3 + 1] = -300
        if (fieldPosArray[i * 3 + 1] < -300) fieldPosArray[i * 3 + 1] = 300
        if (fieldPosArray[i * 3 + 2] > 200) fieldPosArray[i * 3 + 2] = -200
        if (fieldPosArray[i * 3 + 2] < -200) fieldPosArray[i * 3 + 2] = 200
      }
      fieldGeometry.attributes.position.needsUpdate = true

      // Constellations - rotate and orbit
      constellations.children.forEach((mesh) => {
        const data = mesh.userData
        mesh.rotation.x += data.rotationSpeed.x
        mesh.rotation.y += data.rotationSpeed.y
        mesh.rotation.z += data.rotationSpeed.z

        // Orbital motion
        const angle = time * data.orbitSpeed + data.orbitPhase
        const orbitX = Math.cos(angle) * data.orbitRadius
        const orbitZ = Math.sin(angle) * data.orbitRadius
        mesh.position.x += (orbitX - mesh.position.x) * 0.0005
        mesh.position.z += (orbitZ - mesh.position.z) * 0.0005
        mesh.position.y = -100 - scrollInfluence * 0.03
      })

      // Energy beams
      beams.children.forEach((beam) => {
        const data = beam.userData
        data.progress += data.speed
        if (data.progress > 1) data.progress = 0
        beam.position.z = -200 + data.progress * 500 - scrollInfluence * 0.15
      })

      // Grid
      grid.position.y = -250 - scrollInfluence * 0.04
      ;(gridMaterial as THREE.MeshBasicMaterial).opacity = 0.015 + Math.sin(time * 0.3) * 0.005 + scrollProgress * 0.008

      // Camera follows scroll with subtle parallax
      if (!reducedMotion) {
        camera.position.x += (mouseX * 15 - camera.position.x) * 0.008
        camera.position.y += (mouseY * 15 - camera.position.y) * 0.008
        camera.position.z = 100 + scrollInfluence * 0.08
        camera.lookAt(0, -scrollInfluence * 0.04, 0)
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      container.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      deepGeometry.dispose()
      deepMaterial.dispose()
      fieldGeometry.dispose()
      fieldMaterial.dispose()
      constellations.children.forEach((mesh) => {
        const m = mesh as THREE.Mesh<THREE.BufferGeometry, THREE.Material>
        m.geometry.dispose()
        if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose())
        else m.material.dispose()
      })
      beams.children.forEach((beam) => {
        const b = beam as THREE.Mesh<THREE.BufferGeometry, THREE.Material>
        b.geometry.dispose()
        if (Array.isArray(b.material)) b.material.forEach(mat => mat.dispose())
        else b.material.dispose()
      })
      gridGeometry.dispose()
      gridMaterial.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [reducedMotion, scrollY])

  if (!mounted) {
    return <div className={className} ref={mountRef} style={{ width: "100%", height: "100%" }} />
  }

  return <div className={className} ref={mountRef} style={{ width: "100%", height: "100%" }} />
}