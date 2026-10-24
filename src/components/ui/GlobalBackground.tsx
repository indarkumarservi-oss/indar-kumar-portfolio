"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useReducedMotion } from "@/hooks"

export function GlobalBackground({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const scrollYRef = useRef(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollYRef.current = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
    const container = mountRef.current
    if (! container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000)
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ===== OPTIMIZED: Single merged particle system =====
    const particleCount = reducedMotion ? 400 : 1000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const velocities = new Float32Array(particleCount * 3)
    const phases = new Float32Array(particleCount)
    const layers = new Float32Array(particleCount) // 0 = deep, 1 = mid, 2 = foreground

    const colorPrimary = new THREE.Color("hsl(var(--primary))")

    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random()
      layers[i] = layer

      if (layer < 0.4) {
        // Deep layer - sparse, slow
        const radius = 150 + Math.random() * 350
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = radius * Math.cos(phi) - 200
        sizes[i] = 0.3 + Math.random() * 0.5
        velocities[i * 3] = (Math.random() - 0.5) * 0.002
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
        colors[i * 3] = colorPrimary.r * 0.2
        colors[i * 3 + 1] = colorPrimary.g * 0.2
        colors[i * 3 + 2] = colorPrimary.b * 0.2
      } else if (layer < 0.85) {
        // Mid layer - flowing field
        positions[i * 3] = (Math.random() - 0.5) * 500
        positions[i * 3 + 1] = (Math.random() - 0.5) * 500
        positions[i * 3 + 2] = (Math.random() - 0.5) * 300 - 100
        sizes[i] = 0.6 + Math.random() * 0.8
        velocities[i * 3] = (Math.random() - 0.5) * 0.008
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004
        colors[i * 3] = colorPrimary.r * (0.3 + Math.random() * 0.3)
        colors[i * 3 + 1] = colorPrimary.g * (0.3 + Math.random() * 0.3)
        colors[i * 3 + 2] = colorPrimary.b * (0.3 + Math.random() * 0.3)
      } else {
        // Foreground - interactive
        positions[i * 3] = (Math.random() - 0.5) * 250
        positions[i * 3 + 1] = (Math.random() - 0.5) * 250
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100 + 30
        sizes[i] = 1.0 + Math.random() * 1.5
        velocities[i * 3] = (Math.random() - 0.5) * 0.015
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
        colors[i * 3] = colorPrimary.r
        colors[i * 3 + 1] = colorPrimary.g
        colors[i * 3 + 2] = colorPrimary.b
      }
      phases[i] = Math.random() * Math.PI * 2
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute("layer", new THREE.BufferAttribute(layers, 1))

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // ===== OPTIMIZED: Simple geometric shapes using InstancedMesh =====
    const shapeCount = reducedMotion ? 2 : 4
    const dummy = new THREE.Object3D()
    const shapeGeometry = new THREE.IcosahedronGeometry(1, 0)
    const edges = new THREE.EdgesGeometry(shapeGeometry)
    const lineGeometry = new THREE.BufferGeometry().copy(edges)
    const instanceMatrix = new THREE.InstancedBufferAttribute(new Float32Array(shapeCount * 16), 16)
    const instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(shapeCount * 3), 3)
    const instanceScale = new THREE.InstancedBufferAttribute(new Float32Array(shapeCount), 1)
    const instanceSpeed = new THREE.InstancedBufferAttribute(new Float32Array(shapeCount * 3), 3)
    const instanceOffset = new THREE.InstancedBufferAttribute(new Float32Array(shapeCount), 1)

    for (let i = 0; i < shapeCount; i++) {
      const scale = 20 + Math.random() * 30
      const x = (Math.random() - 0.5) * 400
      const y = (Math.random() - 0.5) * 400 - 50
      const z = (Math.random() - 0.5) * 200 - 50

      dummy.position.set(x, y, z)
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()
      instanceMatrix.setX(i * 16 + 0, dummy.matrix.elements[0])
      instanceMatrix.setX(i * 16 + 1, dummy.matrix.elements[1])
      instanceMatrix.setX(i * 16 + 2, dummy.matrix.elements[2])
      instanceMatrix.setX(i * 16 + 3, dummy.matrix.elements[3])
      instanceMatrix.setX(i * 16 + 4, dummy.matrix.elements[4])
      instanceMatrix.setX(i * 16 + 5, dummy.matrix.elements[5])
      instanceMatrix.setX(i * 16 + 6, dummy.matrix.elements[6])
      instanceMatrix.setX(i * 16 + 7, dummy.matrix.elements[7])
      instanceMatrix.setX(i * 16 + 8, dummy.matrix.elements[8])
      instanceMatrix.setX(i * 16 + 9, dummy.matrix.elements[9])
      instanceMatrix.setX(i * 16 + 10, dummy.matrix.elements[10])
      instanceMatrix.setX(i * 16 + 11, dummy.matrix.elements[11])
      instanceMatrix.setX(i * 16 + 12, dummy.matrix.elements[12])
      instanceMatrix.setX(i * 16 + 13, dummy.matrix.elements[13])
      instanceMatrix.setX(i * 16 + 14, dummy.matrix.elements[14])
      instanceMatrix.setX(i * 16 + 15, dummy.matrix.elements[15])

      instanceColor.setXYZ(i, colorPrimary.r * 0.15, colorPrimary.g * 0.15, colorPrimary.b * 0.15)
      instanceScale.setX(i, scale)
      instanceSpeed.setXYZ(i, (Math.random() - 0.5) * 0.0003, (Math.random() - 0.5) * 0.0003, (Math.random() - 0.5) * 0.0003)
      instanceOffset.setX(i, Math.random() * Math.PI * 2)
    }

    lineGeometry.setAttribute("instanceMatrix", instanceMatrix)
    lineGeometry.setAttribute("instanceColor", instanceColor)
    lineGeometry.setAttribute("instanceScale", instanceScale)
    lineGeometry.setAttribute("instanceSpeed", instanceSpeed)
    lineGeometry.setAttribute("instanceOffset", instanceOffset)

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    })

    const shapes = new THREE.InstancedMesh(lineGeometry, lineMaterial, shapeCount)
    shapes.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(shapes)

    // ===== OPTIMIZED: Simple grid (no wireframe subdivisions) =====
    const gridGeometry = new THREE.PlaneGeometry(600, 600, 20, 20)
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
    grid.position.y = -200
    scene.add(grid)

    // ===== MOUSE INTERACTION (throttled) =====
    let mouseX = 0
    let mouseY = 0
    let mouseTargetX = 0
    let mouseTargetY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseTargetX = (event.clientX / window.innerWidth) * 2 - 1
      mouseTargetY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    container.addEventListener("mousemove", handleMouseMove)

    // ===== ANIMATION LOOP =====
    let animationId: number
    let time = 0

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      time += 0.016

      // Smooth mouse interpolation
      mouseX += (mouseTargetX - mouseX) * 0.05
      mouseY += (mouseTargetY - mouseY) * 0.05

      const scrollProgress = Math.min(scrollYRef.current / Math.max(1, document.body.scrollHeight - window.innerHeight), 1)
      const scrollInfluence = scrollProgress * 200

      // Single particle update loop - vectorized where possible
      const posArray = geometry.attributes.position.array as Float32Array
      const velArray = velocities
      const layerArray = geometry.attributes.layer.array as Float32Array
      const phaseArray = phases

      for (let i = 0; i < particleCount; i++) {
        const layer = layerArray[i]
        const idx = i * 3

        if (layer < 0.4) {
          // Deep - slow rotation
          posArray[idx] += velArray[idx]
          posArray[idx + 1] += velArray[idx + 1] + Math.sin(time * 0.2 + phaseArray[i]) * 0.001
          posArray[idx + 2] += velArray[idx + 2]

          const dist = Math.sqrt(posArray[idx] ** 2 + posArray[idx + 1] ** 2 + posArray[idx + 2] ** 2)
          if (dist > 500) {
            const factor = 500 / dist
            posArray[idx] *= factor
            posArray[idx + 1] *= factor
            posArray[idx + 2] *= factor
          }
        } else if (layer < 0.85) {
          // Mid - flow with simple noise
          const n = Math.sin(time * 0.3 + phaseArray[i] + posArray[idx] * 0.005)
          posArray[idx] += velArray[idx] + n * 0.005
          posArray[idx + 1] += velArray[idx + 1] + Math.cos(time * 0.3 + phaseArray[i] + posArray[idx + 1] * 0.005) * 0.005
          posArray[idx + 2] += velArray[idx + 2]

          // Scroll wave
          const sw = Math.sin(scrollProgress * Math.PI * 4 + phaseArray[i])
          posArray[idx + 1] += sw * 0.008
          posArray[idx + 2] += sw * 0.01

          // Wrap
          if (posArray[idx] > 250) posArray[idx] = -250
          if (posArray[idx] < -250) posArray[idx] = 250
          if (posArray[idx + 1] > 250) posArray[idx + 1] = -250
          if (posArray[idx + 1] < -250) posArray[idx + 1] = 250
          if (posArray[idx + 2] > 150) posArray[idx + 2] = -150
          if (posArray[idx + 2] < -150) posArray[idx + 2] = 150
        } else {
          // Foreground - mouse interaction
          const dx = posArray[idx] - mouseX * 80
          const dy = posArray[idx + 1] - mouseY * 80
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120 && !reducedMotion) {
            const force = (120 - dist) / 120 * 0.05
            velArray[idx] += (dx / dist) * force
            velArray[idx + 1] += (dy / dist) * force
          }

          posArray[idx] += velArray[idx]
          posArray[idx + 1] += velArray[idx + 1]
          posArray[idx + 2] += velArray[idx + 2]

          velArray[idx] *= 0.97
          velArray[idx + 1] *= 0.97
          velArray[idx + 2] *= 0.97

          // Return to base
          const baseX = (Math.sin(phaseArray[i]) * 125)
          const baseY = (Math.cos(phaseArray[i]) * 125)
          velArray[idx] += (baseX - posArray[idx]) * 0.0005
          velArray[idx + 1] += (baseY - posArray[idx + 1]) * 0.0005

          if (posArray[idx] > 150) posArray[idx] = -150
          if (posArray[idx] < -150) posArray[idx] = 150
          if (posArray[idx + 1] > 150) posArray[idx + 1] = -150
          if (posArray[idx + 1] < -150) posArray[idx + 1] = 150
        }
      }
      geometry.attributes.position.needsUpdate = true

      // Instanced shapes rotation (GPU-friendly)
      const speedArray = shapes.instanceMatrix.array
      const instSpeed = shapes.geometry.attributes.instanceSpeed as THREE.InstancedBufferAttribute
      const instOffset = shapes.geometry.attributes.instanceOffset as THREE.InstancedBufferAttribute

      for (let i = 0; i < shapeCount; i++) {
        dummy.position.setFromMatrixPosition(new THREE.Matrix4().fromArray(speedArray, i * 16))
        dummy.rotation.x += instSpeed.getX(i * 3)
        dummy.rotation.y += instSpeed.getX(i * 3 + 1)
        dummy.rotation.z += instSpeed.getX(i * 3 + 2)
        dummy.position.y = -50 - scrollInfluence * 0.02 + Math.sin(time * 0.001 + instOffset.getX(i)) * 3
        dummy.updateMatrix()
        speedArray.set(dummy.matrix.elements, i * 16)
      }
      shapes.instanceMatrix.needsUpdate = true

      // Grid
      grid.position.y = -200 - scrollInfluence * 0.03
      gridMaterial.opacity = 0.02 + scrollProgress * 0.005

      // Camera - minimal movement
      if (!reducedMotion) {
        camera.position.x += (mouseX * 8 - camera.position.x) * 0.01
        camera.position.y += (mouseY * 8 - camera.position.y) * 0.01
        camera.position.z = 100 + scrollInfluence * 0.05
        camera.lookAt(0, -scrollInfluence * 0.02, 0)
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
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      gridGeometry.dispose()
      gridMaterial.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [reducedMotion])

  if (!mounted) {
    return <div className={className} ref={mountRef} style={{ width: "100%", height: "100%" }} />
  }

  return <div className={className} ref={mountRef} style={{ width: "100%", height: "100%" }} />
}