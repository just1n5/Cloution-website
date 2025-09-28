@echo off
setlocal EnableDelayedExpansion
cls

echo ============================================================
echo         FASE 3: PARTICLE OPTIMIZATION
echo                   Riesgo: BAJO
echo ============================================================
echo.

set GREEN=[92m
set YELLOW=[93m
set RED=[91m
set RESET=[0m

:: Check previous phase
if not exist "optimization_status.txt" (
    echo %RED%ERROR: Debes completar fases anteriores!%RESET%
    pause
    exit /b 1
)

:: Create backup
echo %YELLOW%[1/5] Creando backup...%RESET%
set backup_dir=backups\phase3_%date:~-4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%
set backup_dir=!backup_dir: =0!
mkdir "!backup_dir!" 2>nul
copy "src\components\ParticleBackground.jsx" "!backup_dir!\ParticleBackground.jsx.bak" >nul 2>&1
echo %GREEN%Backup creado%RESET%

:: Create optimized ParticleBackground
echo.
echo %YELLOW%[2/5] Optimizando ParticleBackground...%RESET%
(
echo import React, { useEffect, useRef, useState } from 'react'
echo import { motion } from 'framer-motion'
echo.
echo const ParticleBackground = ^(^) =^> {
echo   const canvasRef = useRef^(null^)
echo   const animationRef = useRef^(null^)
echo   const [particleCount, setParticleCount] = useState^(50^)
echo.
echo   useEffect^(^(^) =^> {
echo     const canvas = canvasRef.current
echo     if ^(!canvas^) return
echo.
echo     const ctx = canvas.getContext^('2d', { alpha: true }^)
echo     if ^(!ctx^) return
echo.
echo     // Detectar dispositivo
echo     const isMobile = window.innerWidth ^< 768
echo     const isLowEnd = navigator.hardwareConcurrency ^<= 4
echo     
echo     // Ajustar particulas segun dispositivo
echo     const particles = []
echo     const count = isMobile ? 20 : isLowEnd ? 35 : 50
echo     setParticleCount^(count^)
echo.
echo     // Configurar canvas
echo     const resizeCanvas = ^(^) =^> {
echo       canvas.width = window.innerWidth
echo       canvas.height = window.innerHeight
echo     }
echo     resizeCanvas^(^)
echo.
echo     // Clase Particle simplificada
echo     class Particle {
echo       constructor^(^) {
echo         this.reset^(^)
echo       }
echo       
echo       reset^(^) {
echo         this.x = Math.random^(^) * canvas.width
echo         this.y = Math.random^(^) * canvas.height
echo         this.size = Math.random^(^) * 2 + 0.5
echo         this.speedX = ^(Math.random^(^) - 0.5^) * 0.3
echo         this.speedY = ^(Math.random^(^) - 0.5^) * 0.3
echo         this.opacity = Math.random^(^) * 0.3 + 0.1
echo       }
echo.
echo       update^(^) {
echo         this.x += this.speedX
echo         this.y += this.speedY
echo.
echo         // Wrap around
echo         if ^(this.x ^> canvas.width^) this.x = 0
echo         if ^(this.x ^< 0^) this.x = canvas.width
echo         if ^(this.y ^> canvas.height^) this.y = 0
echo         if ^(this.y ^< 0^) this.y = canvas.height
echo       }
echo.
echo       draw^(^) {
echo         ctx.globalAlpha = this.opacity
echo         ctx.fillStyle = '#2563eb'
echo         ctx.beginPath^(^)
echo         ctx.arc^(this.x, this.y, this.size, 0, Math.PI * 2^)
echo         ctx.fill^(^)
echo       }
echo     }
echo.
echo     // Crear particulas
echo     for ^(let i = 0; i ^< count; i++^) {
echo       particles.push^(new Particle^(^)^)
echo     }
echo.
echo     // Conexiones solo en desktop
echo     const drawConnections = ^(^) =^> {
echo       if ^(isMobile^) return
echo       
echo       ctx.strokeStyle = '#8b5cf6'
echo       ctx.lineWidth = 0.5
echo       
echo       for ^(let i = 0; i ^< particles.length - 1; i++^) {
echo         for ^(let j = i + 1; j ^< Math.min^(i + 5, particles.length^); j++^) {
echo           const dx = particles[i].x - particles[j].x
echo           const dy = particles[i].y - particles[j].y
echo           const distance = Math.sqrt^(dx * dx + dy * dy^)
echo.
echo           if ^(distance ^< 100^) {
echo             ctx.globalAlpha = ^(1 - distance / 100^) * 0.1
echo             ctx.beginPath^(^)
echo             ctx.moveTo^(particles[i].x, particles[i].y^)
echo             ctx.lineTo^(particles[j].x, particles[j].y^)
echo             ctx.stroke^(^)
echo           }
echo         }
echo       }
echo     }
echo.
echo     // Animation loop optimizado
echo     let lastTime = 0
echo     const fps = isMobile ? 30 : 60
echo     const frameInterval = 1000 / fps
echo     
echo     const animate = ^(currentTime^) =^> {
echo       const deltaTime = currentTime - lastTime
echo       
echo       if ^(deltaTime ^> frameInterval^) {
echo         ctx.clearRect^(0, 0, canvas.width, canvas.height^)
echo         
echo         particles.forEach^(particle =^> {
echo           particle.update^(^)
echo           particle.draw^(^)
echo         }^)
echo         
echo         drawConnections^(^)
echo         
echo         lastTime = currentTime - ^(deltaTime %% frameInterval^)
echo       }
echo       
echo       animationRef.current = requestAnimationFrame^(animate^)
echo     }
echo.
echo     // Pausar cuando no visible
echo     const handleVisibility = ^(^) =^> {
echo       if ^(document.hidden^) {
echo         if ^(animationRef.current^) cancelAnimationFrame^(animationRef.current^)
echo       } else {
echo         animate^(0^)
echo       }
echo     }
echo.
echo     document.addEventListener^('visibilitychange', handleVisibility^)
echo     window.addEventListener^('resize', resizeCanvas^)
echo     
echo     animate^(0^)
echo.
echo     return ^(^) =^> {
echo       if ^(animationRef.current^) cancelAnimationFrame^(animationRef.current^)
echo       document.removeEventListener^('visibilitychange', handleVisibility^)
echo       window.removeEventListener^('resize', resizeCanvas^)
echo     }
echo   }, []^)
echo.
echo   return ^(
echo     ^<^>
echo       ^<canvas
echo         ref={canvasRef}
echo         className="fixed inset-0 pointer-events-none opacity-20"
echo         style={{ zIndex: 1 }}
echo       /^>
echo       
echo       {/* Orbes solo en desktop */}
echo       {window.innerWidth ^>= 1024 ^&^& ^(
echo         ^<div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}^>
echo           ^<motion.div
echo             initial={{ opacity: 0 }}
echo             animate={{ opacity: 0.05 }}
echo             transition={{ duration: 2 }}
echo             className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
echo           /^>
echo           ^<motion.div
echo             initial={{ opacity: 0 }}
echo             animate={{ opacity: 0.05 }}
echo             transition={{ duration: 2, delay: 0.5 }}
echo             className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"
echo           /^>
echo         ^</div^>
echo       ^)}
echo     ^</^>
echo   ^)
echo }
echo.
echo export default ParticleBackground
) > src\components\ParticleBackground.phase3.jsx

copy "src\components\ParticleBackground.jsx" "src\components\ParticleBackground.phase3.backup.jsx" >nul 2>&1
copy "src\components\ParticleBackground.phase3.jsx" "src\components\ParticleBackground.jsx" >nul 2>&1
echo %GREEN%ParticleBackground optimizado%RESET%

:: Clear cache
echo.
echo %YELLOW%[3/5] Limpiando cache...%RESET%
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite" 2>nul
echo %GREEN%Cache limpiado%RESET%

:: Test build
echo.
echo %YELLOW%[4/5] Probando build...%RESET%
call npm run build >build_phase3_log.txt 2>&1
if !errorlevel! == 0 (
    echo %GREEN%Build exitoso!%RESET%
    
    :: Update status
    echo PHASE_3_COMPLETE >> optimization_status.txt
    echo %date% %time% >> optimization_status.txt
    
    echo.
    echo %YELLOW%[5/5] Generando reporte...%RESET%
    echo.
    echo ============================================================
    echo %GREEN%     FASE 3 COMPLETADA EXITOSAMENTE!%RESET%
    echo ============================================================
    echo.
    echo Mejoras aplicadas:
    echo   - Particulas: 20 en movil, 35 en low-end, 50 en desktop
    echo   - FPS adaptativo: 30fps movil, 60fps desktop
    echo   - Conexiones solo en desktop
    echo   - Pausa cuando no visible
    echo   - Orbes solo en pantallas grandes
    echo.
    echo Mejoras esperadas:
    echo   - 50%% menos CPU en moviles
    echo   - FPS estable
    echo   - Mejor duracion de bateria
    echo.
    set success=1
) else (
    echo %RED%Build fallo!%RESET%
    copy "!backup_dir!\ParticleBackground.jsx.bak" "src\components\ParticleBackground.jsx" >nul 2>&1
    set success=0
)

:: Cleanup
del "src\components\ParticleBackground.phase3.jsx" 2>nul

if !success!==1 (
    echo %GREEN%Fase 3 completada. Puedes proceder a Fase 4.%RESET%
) else (
    echo %RED%Fase 3 fallo.%RESET%
)

pause
