"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useReducedMotion } from "@/hooks"

export function ThreeBackground({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = reducedMotion ? 500 : 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const velocities = new Float32Array(particleCount * 3)

    const colorPrimary = new THREE.Color("hsl(var(--primary))")
    const colorSecondary = new THREE.Color("#00ffff")

    for (let i = 0; i < particleCount; i++) {
      const radius = 15 + Math.random() * 35
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const colorMix = Math.random()
      colors[i * 3] = colorPrimary.r * colorMix + colorSecondary.r * (1 - colorMix)
      colors[i * 3 + 1] = colorPrimary.g * colorMix + colorSecondary.g * (1 - colorMix)
      colors[i * 3 + 2] = colorPrimary.b * colorMix + colorSecondary.b * (1 - colorMix)

      sizes[i] = 0.5 + Math.random() * 1.5

      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    const particleMaterial = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
    })

    const particles = new THREE.Points(particlesGeometry, particleMaterial)
    scene.add(particles)

    const lineGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []
    const lineColors: number[] = []

    for (let i = 0; i < particleCount; i += 10) {
      for (let j = i + 1; j < Math.min(i + 5, particleCount); j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < 15) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2])

          const alpha = 0.1 * (1 - dist / 15)
          lineColors.push(colorPrimary.r, colorPrimary.g, colorPrimary.b, alpha)
          lineColors.push(colorPrimary.r, colorPrimary.g, colorPrimary.b, alpha)
        }
      }
    }

    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 4))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    const gridHelper = new THREE.GridHelper(100, 50, new THREE.Color("hsl(var(--border) / 0.1)"), new THREE.Color("hsl(var(--border) / 0.05)"))
    gridHelper.position.y = -30
    scene.add(gridHelper)

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    container.addEventListener("mousemove", handleMouseMove)

    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const positionsArray = particlesGeometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3] += velocities[i * 3]
        positionsArray[i * 3 + 1] += velocities[i * 3 + 1]
        positionsArray[i * 3 + 2] += velocities[i * 3 + 2]

        const x = positionsArray[i * 3]
        const y = positionsArray[i * 3 + 1]
        const z = positionsArray[i * 3 + 2]
        const dist = Math.sqrt(x * x + y * y + z * z)

        if (dist > 50) {
          const factor = 50 / dist
          positionsArray[i * 3] *= factor
          positionsArray[i * 3 + 1] *= factor
          positionsArray[i * 3 + 2] *= factor
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true

      if (!reducedMotion) {
        particles.rotation.y += 0.0002
        particles.rotation.x += 0.0001
        lines.rotation.y += 0.0002
        lines.rotation.x += 0.0001

        camera.position.x += (mouseX * 5 - camera.position.x) * 0.02
        camera.position.y += (mouseY * 5 - camera.position.y) * 0.02
        camera.lookAt(scene.position)
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
      particlesGeometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [reducedMotion])

  if (!mounted) {
    return <div className={className} ref={mountRef} style={{ width: "100%", height: "100%" }} />
  }

  return <div className={className} ref={mountRef} style={{ width: "100%", height: "100%" }} />
}