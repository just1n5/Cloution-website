import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getPerformanceProfile, PERFORMANCE_CONFIG } from '../config/performance'

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const animationIdRef = useRef(null)
  const [isEnabled, setIsEnabled] = useState(true)
  
  useEffect(() => {
    // Check performance profile
    const profile = getPerformanceProfile()
    
    // Disable on very low-end devices
    if (PERFORMANCE_CONFIG.isMobile && PERFORMANCE_CONFIG.isLowEnd) {
      setIsEnabled(false)
      return
    }
    
    // Respect reduced motion preference
    if (PERFORMANCE_CONFIG.animations.reduced) {
      setIsEnabled(false)
      return
    }
    
    const canvas = canvasRef.current
    if (!canvas || !isEnabled) return

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true // Better performance
    })
    if (!ctx) return

    // Get particle settings based on device
    const settings = profile === 'high' 
      ? PERFORMANCE_CONFIG.particles.highEnd
      : profile === 'low'
      ? PERFORMANCE_CONFIG.particles.mobile
      : PERFORMANCE_CONFIG.particles.desktop

    // Set canvas size with device pixel ratio consideration
    const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2 for performance
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }
    resizeCanvas()

    // Debounced resize
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 250)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Optimized Particle class
    class Particle {
      constructor() {
        this.reset()
      }
      
      reset() {
        this.x = Math.random() * canvas.width / dpr
        this.y = Math.random() * canvas.height / dpr
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * settings.animationSpeed
        this.speedY = (Math.random() - 0.5) * settings.animationSpeed
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen
        const w = canvas.width / dpr
        const h = canvas.height / dpr
        
        if (this.x > w) this.x = 0
        if (this.x < 0) this.x = w
        if (this.y > h) this.y = 0
        if (this.y < 0) this.y = h
      }

      draw() {
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = '#2563eb'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles based on settings
    const particles = []
    for (let i = 0; i < settings.count; i++) {
      particles.push(new Particle())
    }

    // Optimized connection drawing (only if enabled and not mobile)
    const drawConnections = () => {
      if (settings.connectionDistance === 0) return
      
      ctx.strokeStyle = '#8b5cf6'
      ctx.lineWidth = 0.5
      
      // Use spatial hashing for better performance
      for (let i = 0; i < particles.length - 1; i++) {
        for (let j = i + 1; j < Math.min(i + 10, particles.length); j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < settings.connectionDistance) {
            ctx.globalAlpha = (1 - distance / settings.connectionDistance) * 0.1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Optimized animation loop
    let lastTime = 0
    const targetFPS = PERFORMANCE_CONFIG.isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS
    
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime
      
      if (deltaTime > frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Batch operations
        ctx.save()
        
        // Update and draw particles
        particles.forEach(particle => {
          particle.update()
          particle.draw()
        })
        
        // Draw connections only if not mobile
        if (!PERFORMANCE_CONFIG.isMobile) {
          drawConnections()
        }
        
        ctx.restore()
        
        lastTime = currentTime - (deltaTime % frameInterval)
      }
      
      animationIdRef.current = requestAnimationFrame(animate)
    }
    
    // Start animation
    animationIdRef.current = requestAnimationFrame(animate)

    // Pause animation when page is hidden
    const handleVisibilityChange = () => {
      if (document.hidden && animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      } else if (!document.hidden) {
        animationIdRef.current = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(resizeTimeout)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isEnabled])

  // Don't render orbs on mobile
  const showOrbs = !PERFORMANCE_CONFIG.isMobile && !PERFORMANCE_CONFIG.animations.reduced

  return (
    <>
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none opacity-20 will-change-transform"
          style={{ 
            zIndex: 1,
            width: '100%',
            height: '100%'
          }}
        />
      )}
      
      {/* Simplified orbs for desktop only */}
      {showOrbs && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"
          />
        </div>
      )}
    </>
  )
}

export default ParticleBackground
