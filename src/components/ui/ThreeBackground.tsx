"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useReducedMotion } from "@/hooks"

export function ThreeBackground({ className = "" }: { className?: string }) {
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

    // ===== LAYER 1: Deep Space Particles (Background) =====
    const deepParticleCount = reducedMotion ? 800 : 3000
    const deepGeometry = new THREE.BufferGeometry()
    const deepPositions = new Float32Array(deepParticleCount * 3)
    const deepColors = new Float32Array(deepParticleCount * 3)
    const deepSizes = new Float32Array(deepParticleCount)
    const deepVelocities = new Float32Array(deepParticleCount * 3)
    const deepPhases = new Float32Array(deepParticleCount)

    const colorPrimary = new THREE.Color("hsl(var(--primary))")
    const colorSecondary = new THREE.Color("#00ffff")
    const colorAccent = new THREE.Color("#ff00ff")

    for (let i = 0; i < deepParticleCount; i++) {
      const radius = 80 + Math.random() * 200
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      deepPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      deepPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      deepPositions[i * 3 + 2] = radius * Math.cos(phi) - 100

      const colorChoice = Math.random()
      if (colorChoice < 0.5) {
        deepColors[i * 3] = colorPrimary.r * 0.3
        deepColors[i * 3 + 1] = colorPrimary.g * 0.3
        deepColors[i * 3 + 2] = colorPrimary.b * 0.3
      } else if (colorChoice < 0.8) {
        deepColors[i * 3] = colorSecondary.r * 0.2
        deepColors[i * 3 + 1] = colorSecondary.g * 0.2
        deepColors[i * 3 + 2] = colorSecondary.b * 0.2
      } else {
        deepColors[i * 3] = colorAccent.r * 0.15
        deepColors[i * 3 + 1] = colorAccent.g * 0.15
        deepColors[i * 3 + 2] = colorAccent.b * 0.15
      }

      deepSizes[i] = 0.3 + Math.random() * 0.8
      deepVelocities[i * 3] = (Math.random() - 0.5) * 0.005
      deepVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      deepVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005
      deepPhases[i] = Math.random() * Math.PI * 2
    }

    deepGeometry.setAttribute("position", new THREE.BufferAttribute(deepPositions, 3))
    deepGeometry.setAttribute("color", new THREE.BufferAttribute(deepColors, 3))
    deepGeometry.setAttribute("size", new THREE.BufferAttribute(deepSizes, 1))

    const deepMaterial = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const deepParticles = new THREE.Points(deepGeometry, deepMaterial)
    scene.add(deepParticles)

    // ===== LAYER 2: Mid-ground Flowing Particles =====
    const midParticleCount = reducedMotion ? 500 : 1500
    const midGeometry = new THREE.BufferGeometry()
    const midPositions = new Float32Array(midParticleCount * 3)
    const midColors = new Float32Array(midParticleCount * 3)
    const midSizes = new Float32Array(midParticleCount)
    const midVelocities = new Float32Array(midParticleCount * 3)
    const midFlowOffset = new Float32Array(midParticleCount)

    for (let i = 0; i < midParticleCount; i++) {
      const x = (Math.random() - 0.5) * 400
      const y = (Math.random() - 0.5) * 400
      const z = (Math.random() - 0.5) * 200 - 50

      midPositions[i * 3] = x
      midPositions[i * 3 + 1] = y
      midPositions[i * 3 + 2] = z

      const intensity = 0.4 + Math.random() * 0.4
      midColors[i * 3] = colorPrimary.r * intensity
      midColors[i * 3 + 1] = colorPrimary.g * intensity
      midColors[i * 3 + 2] = colorPrimary.b * intensity

      midSizes[i] = 0.8 + Math.random() * 1.5
      midVelocities[i * 3] = (Math.random() - 0.5) * 0.02
      midVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      midVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
      midFlowOffset[i] = Math.random() * Math.PI * 2
    }

    midGeometry.setAttribute("position", new THREE.BufferAttribute(midPositions, 3))
    midGeometry.setAttribute("color", new THREE.BufferAttribute(midColors, 3))
    midGeometry.setAttribute("size", new THREE.BufferAttribute(midSizes, 1))

    const midMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const midParticles = new THREE.Points(midGeometry, midMaterial)
    scene.add(midParticles)

    // ===== LAYER 3: Foreground Interactive Particles =====
    const fgParticleCount = reducedMotion ? 300 : 800
    const fgGeometry = new THREE.BufferGeometry()
    const fgPositions = new Float32Array(fgParticleCount * 3)
    const fgColors = new Float32Array(fgParticleCount * 3)
    const fgSizes = new Float32Array(fgParticleCount)
    const fgVelocities = new Float32Array(fgParticleCount * 3)
    const fgBasePositions = new Float32Array(fgParticleCount * 3)

    for (let i = 0; i < fgParticleCount; i++) {
      const x = (Math.random() - 0.5) * 300
      const y = (Math.random() - 0.5) * 300
      const z = (Math.random() - 0.5) * 100 + 20

      fgPositions[i * 3] = x
      fgPositions[i * 3 + 1] = y
      fgPositions[i * 3 + 2] = z
      fgBasePositions[i * 3] = x
      fgBasePositions[i * 3 + 1] = y
      fgBasePositions[i * 3 + 2] = z

      fgColors[i * 3] = colorPrimary.r
      fgColors[i * 3 + 1] = colorPrimary.g
      fgColors[i * 3 + 2] = colorPrimary.b

      fgSizes[i] = 1.5 + Math.random() * 2.5
      fgVelocities[i * 3] = (Math.random() - 0.5) * 0.03
      fgVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03
      fgVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    fgGeometry.setAttribute("position", new THREE.BufferAttribute(fgPositions, 3))
    fgGeometry.setAttribute("color", new THREE.BufferAttribute(fgColors, 3))
    fgGeometry.setAttribute("size", new THREE.BufferAttribute(fgSizes, 1))

    const fgMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const fgParticles = new THREE.Points(fgGeometry, fgMaterial)
    scene.add(fgParticles)

    // ===== LAYER 4: Geometric Wireframe Structures =====
    const structures = new THREE.Group()
    const structureCount = reducedMotion ? 3 : 8

    for (let s = 0; s < structureCount; s++) {
      const geoType = Math.floor(Math.random() * 4)
      let geometry: THREE.BufferGeometry

      if (geoType === 0) {
        geometry = new THREE.IcosahedronGeometry(15 + Math.random() * 25, 0)
      } else if (geoType === 1) {
        geometry = new THREE.OctahedronGeometry(15 + Math.random() * 25, 0)
      } else if (geoType === 2) {
        geometry = new THREE.TetrahedronGeometry(15 + Math.random() * 25, 0)
      } else {
        geometry = new THREE.DodecahedronGeometry(15 + Math.random() * 25, 0)
      }

      const edges = new THREE.EdgesGeometry(geometry)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color("hsl(var(--primary))"),
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
      })

      const mesh = new THREE.LineSegments(edges, lineMaterial)
      mesh.position.set(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 200 - 50
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.001,
          y: (Math.random() - 0.5) * 0.001,
          z: (Math.random() - 0.5) * 0.001,
        },
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.0005 + Math.random() * 0.001,
        floatAmplitude: 5 + Math.random() * 15,
      }
      structures.add(mesh)
    }
    scene.add(structures)

    // ===== LAYER 5: Data Stream Lines =====
    const streamCount = reducedMotion ? 10 : 30
    const streams = new THREE.Group()

    for (let i = 0; i < streamCount; i++) {
      const points = []
      const segmentCount = 20
      for (let j = 0; j <= segmentCount; j++) {
        const t = j / segmentCount
        const x = (Math.random() - 0.5) * 400
        const y = (Math.random() - 0.5) * 400
        const z = -100 + t * 300
        points.push(new THREE.Vector3(x, y, z))
      }

      const curve = new THREE.CatmullRomCurve3(points)
      const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.3, 8, false)
      const streamMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("hsl(var(--primary))"),
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
        side: THREE.DoubleSide,
      })

      const stream = new THREE.Mesh(tubeGeometry, streamMaterial)
      stream.userData = { progress: Math.random(), speed: 0.0002 + Math.random() * 0.0005 }
      streams.add(stream)
    }
    scene.add(streams)

    // ===== LAYER 6: Grid Floor with Scroll Reaction =====
    const gridSize = 500
    const gridDivisions = 100
    const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions)
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("hsl(var(--primary))"),
      transparent: true,
      opacity: 0.02,
      wireframe: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const grid = new THREE.Mesh(gridGeometry, gridMaterial)
    grid.rotation.x = -Math.PI / 2
    grid.position.y = -150
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

      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight)
      const scrollInfluence = scrollProgress * 200

      // Deep particles - slow rotation with scroll parallax
      deepParticles.rotation.y += 0.00005
      deepParticles.rotation.x += 0.00002
      deepParticles.position.y = -scrollInfluence * 0.1

      const deepPositionsArray = deepGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < deepParticleCount; i++) {
        deepPositionsArray[i * 3] += deepVelocities[i * 3]
        deepPositionsArray[i * 3 + 1] += deepVelocities[i * 3 + 1] + Math.sin(time + deepPhases[i]) * 0.002
        deepPositionsArray[i * 3 + 2] += deepVelocities[i * 3 + 2]

        const dist = Math.sqrt(
          deepPositionsArray[i * 3] ** 2 +
          deepPositionsArray[i * 3 + 1] ** 2 +
          deepPositionsArray[i * 3 + 2] ** 2
        )
        if (dist > 300) {
          const factor = 300 / dist
          deepPositionsArray[i * 3] *= factor
          deepPositionsArray[i * 3 + 1] *= factor
          deepPositionsArray[i * 3 + 2] *= factor
        }
      }
      deepGeometry.attributes.position.needsUpdate = true

      // Mid particles - flowing with scroll influence
      const midPositionsArray = midGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < midParticleCount; i++) {
        midPositionsArray[i * 3] += midVelocities[i * 3] + Math.sin(time * 0.5 + midFlowOffset[i]) * 0.01
        midPositionsArray[i * 3 + 1] += midVelocities[i * 3 + 1] + Math.cos(time * 0.5 + midFlowOffset[i]) * 0.01
        midPositionsArray[i * 3 + 2] += midVelocities[i * 3 + 2] + Math.sin(scrollProgress * Math.PI * 4 + midFlowOffset[i]) * 0.02

        // Wrap around
        if (midPositionsArray[i * 3] > 200) midPositionsArray[i * 3] = -200
        if (midPositionsArray[i * 3] < -200) midPositionsArray[i * 3] = 200
        if (midPositionsArray[i * 3 + 1] > 200) midPositionsArray[i * 3 + 1] = -200
        if (midPositionsArray[i * 3 + 1] < -200) midPositionsArray[i * 3 + 1] = 200
        if (midPositionsArray[i * 3 + 2] > 100) midPositionsArray[i * 3 + 2] = -100
        if (midPositionsArray[i * 3 + 2] < -100) midPositionsArray[i * 3 + 2] = 100
      }
      midGeometry.attributes.position.needsUpdate = true

      // Foreground particles - mouse reactive
      const fgPositionsArray = fgGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < fgParticleCount; i++) {
        const dx = fgPositionsArray[i * 3] - mouseX * 100
        const dy = fgPositionsArray[i * 3 + 1] - mouseY * 100
        const dz = fgPositionsArray[i * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < 150 && !reducedMotion) {
          const force = (150 - dist) / 150 * 0.1
          fgVelocities[i * 3] += (dx / dist) * force
          fgVelocities[i * 3 + 1] += (dy / dist) * force
        }

        fgPositionsArray[i * 3] += fgVelocities[i * 3]
        fgPositionsArray[i * 3 + 1] += fgVelocities[i * 3 + 1]
        fgPositionsArray[i * 3 + 2] += fgVelocities[i * 3 + 2]

        fgVelocities[i * 3] *= 0.98
        fgVelocities[i * 3 + 1] *= 0.98
        fgVelocities[i * 3 + 2] *= 0.98

        // Return to base position
        const baseDx = fgBasePositions[i * 3] - fgPositionsArray[i * 3]
        const baseDy = fgBasePositions[i * 3 + 1] - fgPositionsArray[i * 3 + 1]
        const baseDz = fgBasePositions[i * 3 + 2] - fgPositionsArray[i * 3 + 2]
        fgVelocities[i * 3] += baseDx * 0.001
        fgVelocities[i * 3 + 1] += baseDy * 0.001
        fgVelocities[i * 3 + 2] += baseDz * 0.001

        // Wrap
        if (fgPositionsArray[i * 3] > 150) fgPositionsArray[i * 3] = -150
        if (fgPositionsArray[i * 3] < -150) fgPositionsArray[i * 3] = 150
        if (fgPositionsArray[i * 3 + 1] > 150) fgPositionsArray[i * 3 + 1] = -150
        if (fgPositionsArray[i * 3 + 1] < -150) fgPositionsArray[i * 3 + 1] = 150
      }
      fgGeometry.attributes.position.needsUpdate = true

      // Structures - rotate and float
      structures.children.forEach((mesh) => {
        const data = mesh.userData
        mesh.rotation.x += data.rotationSpeed.x
        mesh.rotation.y += data.rotationSpeed.y
        mesh.rotation.z += data.rotationSpeed.z
        mesh.position.y += Math.sin(time * data.floatSpeed + data.floatOffset) * data.floatAmplitude * 0.01
        mesh.position.z = -50 + scrollInfluence * 0.05
      })

      // Data streams - flow
      streams.children.forEach((stream) => {
        const data = stream.userData
        data.progress += data.speed
        if (data.progress > 1) data.progress = 0
        stream.position.z = -100 + data.progress * 300 - scrollInfluence * 0.2
      })

      // Grid - scroll reaction
      grid.position.y = -150 - scrollInfluence * 0.05
      ;(gridMaterial as THREE.MeshBasicMaterial).opacity = 0.02 + Math.sin(time * 0.5) * 0.01 + scrollProgress * 0.01

      // Camera subtle movement
      if (!reducedMotion) {
        camera.position.x += (mouseX * 10 - camera.position.x) * 0.01
        camera.position.y += (mouseY * 10 - camera.position.y) * 0.01
        camera.position.z = 100 + scrollInfluence * 0.1
        camera.lookAt(0, -scrollInfluence * 0.05, 0)
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
      midGeometry.dispose()
      midMaterial.dispose()
      fgGeometry.dispose()
      fgMaterial.dispose()
      structures.children.forEach((mesh) => {
        const m = mesh as THREE.Mesh<THREE.BufferGeometry, THREE.Material>
        m.geometry.dispose()
        if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose())
        else m.material.dispose()
      })
      streams.children.forEach((stream) => {
        const s = stream as THREE.Mesh<THREE.BufferGeometry, THREE.Material>
        s.geometry.dispose()
        if (Array.isArray(s.material)) s.material.forEach(mat => mat.dispose())
        else s.material.dispose()
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