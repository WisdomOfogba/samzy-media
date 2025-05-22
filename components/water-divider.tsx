"use client"

import { useEffect, useRef } from "react"

interface WaterDividerProps {
  direction?: "normal" | "reverse"
}

export default function WaterDivider({ direction = "normal" }: WaterDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 100
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    function drawWave() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "#9333ea") // purple-600
      gradient.addColorStop(0.5, "#db2777") // pink-600
      gradient.addColorStop(1, "#9333ea") // purple-600

      ctx.fillStyle = gradient

      ctx.beginPath()

      // Starting point
      ctx.moveTo(0, direction === "normal" ? 0 : canvas.height)

      // Draw the wave
      for (let x = 0; x < canvas.width; x++) {
        // Create multiple overlapping sine waves with different frequencies and amplitudes
        const y1 = Math.sin(x * 0.01 + time) * 20
        const y2 = Math.sin(x * 0.02 + time * 0.8) * 15
        const y3 = Math.sin(x * 0.005 + time * 1.2) * 10

        const y = y1 + y2 + y3

        // Adjust y position based on direction
        const adjustedY = direction === "normal" ? canvas.height - 50 + y : 50 + y

        ctx.lineTo(x, adjustedY)
      }

      // Complete the path
      if (direction === "normal") {
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(canvas.width, 0)
      } else {
        ctx.lineTo(canvas.width, 0)
        ctx.lineTo(canvas.width, canvas.height)
      }

      ctx.closePath()
      ctx.fill()

      // Add some particles for extra effect
      drawParticles()

      time += 0.01
      animationFrameId = requestAnimationFrame(drawWave)
    }

    function drawParticles() {
      if (!ctx) return

      const numberOfParticles = 20

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width
        const baseY = direction === "normal" ? canvas.height - 50 : 50

        const y1 = Math.sin(x * 0.01 + time) * 20
        const y2 = Math.sin(x * 0.02 + time * 0.8) * 15
        const y3 = Math.sin(x * 0.005 + time * 1.2) * 10

        const y = baseY + y1 + y2 + y3

        const size = Math.random() * 4 + 1
        const opacity = Math.random() * 0.5 + 0.2

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    drawWave()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [direction])

  return (
    <div className="w-full h-[100px] relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 bg-black/0" />
    </div>
  )
}
