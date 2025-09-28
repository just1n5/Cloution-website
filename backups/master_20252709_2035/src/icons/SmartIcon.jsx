import React, { lazy, Suspense, useEffect, useState } from 'react'
import { PERFORMANCE_CONFIG, getPerformanceProfile } from '../config/performance'
import { Activity, Brain, Database, Cloud, Code, LineChart } from 'lucide-react'

// Lazy load 3D icons only for capable devices
const FrontendIcon3D = lazy(() => import('./FrontendIcon3D'))
const BackendIcon3D = lazy(() => import('./BackendIcon3D'))
const CloudDevOpsIcon3D = lazy(() => import('./CloudDevOpsIcon3D'))
const SecurityIcon3D = lazy(() => import('./SecurityIcon3D'))
const AiDataIcon3D = lazy(() => import('./AiDataIcon3D'))
const UxUiIcon3D = lazy(() => import('./UxUiIcon3D'))

// Fallback 2D icon component
const Icon2DFallback = ({ icon: Icon, color, className }) => (
  <div className={`p-4 rounded-xl bg-gradient-to-br ${color} ${className}`}>
    <Icon className="w-full h-full text-white" strokeWidth={1.5} />
  </div>
)

// Loading placeholder
const IconLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
  </div>
)

/**
 * Smart Icon component that automatically chooses between 3D and 2D
 * based on device capabilities and performance profile
 */
const SmartIcon = ({ 
  type, 
  size = 1, 
  color = '#2563eb',
  className = '',
  force2D = false,
  ...props 
}) => {
  const [use3D, setUse3D] = useState(false)
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    // Determine if 3D should be used
    const profile = getPerformanceProfile()
    const should3D = 
      !force2D && 
      !PERFORMANCE_CONFIG.isMobile && 
      !PERFORMANCE_CONFIG.animations.reduced &&
      profile !== 'low'
    
    setUse3D(should3D)
  }, [force2D])

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const element = document.getElementById(`icon-${type}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [type])

  // Icon mapping
  const icon3DMap = {
    'frontend': FrontendIcon3D,
    'backend': BackendIcon3D,
    'cloud': CloudDevOpsIcon3D,
    'security': SecurityIcon3D,
    'ai': AiDataIcon3D,
    'ux': UxUiIcon3D,
  }

  const icon2DMap = {
    'frontend': Code,
    'backend': Database,
    'cloud': Cloud,
    'security': Activity,
    'ai': Brain,
    'ux': LineChart,
  }

  const colorMap = {
    'frontend': 'from-blue-500 to-cyan-500',
    'backend': 'from-green-500 to-emerald-500',
    'cloud': 'from-purple-500 to-pink-500',
    'security': 'from-red-500 to-orange-500',
    'ai': 'from-indigo-500 to-purple-500',
    'ux': 'from-yellow-500 to-orange-500',
  }

  const Icon3D = icon3DMap[type]
  const Icon2D = icon2DMap[type]
  const gradientColor = colorMap[type]

  return (
    <div id={`icon-${type}`} className={`icon-container ${className}`}>
      {use3D && isInView ? (
        <Suspense fallback={<IconLoader />}>
          <div className="w-full h-full">
            <Icon3D 
              scale={size} 
              color={color}
              quality={getPerformanceProfile()}
              {...props}
            />
          </div>
        </Suspense>
      ) : (
        <Icon2DFallback 
          icon={Icon2D} 
          color={gradientColor}
          className="w-full h-full"
        />
      )}
    </div>
  )
}

export default SmartIcon

// Export individual optimized icons for backward compatibility
export const OptimizedFrontendIcon = (props) => <SmartIcon type="frontend" {...props} />
export const OptimizedBackendIcon = (props) => <SmartIcon type="backend" {...props} />
export const OptimizedCloudIcon = (props) => <SmartIcon type="cloud" {...props} />
export const OptimizedSecurityIcon = (props) => <SmartIcon type="security" {...props} />
export const OptimizedAiIcon = (props) => <SmartIcon type="ai" {...props} />
export const OptimizedUxIcon = (props) => <SmartIcon type="ux" {...props} />
