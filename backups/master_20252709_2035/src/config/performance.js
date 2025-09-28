// Performance configuration
export const PERFORMANCE_CONFIG = {
  // Detect device capabilities
  isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
  isLowEnd: navigator.hardwareConcurrency <= 4,
  hasTouch: 'ontouchstart' in window,
  
  // Animation settings
  animations: {
    enabled: !(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  },
  
  // Particle settings
  particles: {
    mobile: {
      count: 20,
      connectionDistance: 0, // Disable connections on mobile
      animationSpeed: 0.1,
    },
    desktop: {
      count: 50,
      connectionDistance: 100,
      animationSpeed: 0.5,
    },
    highEnd: {
      count: 100,
      connectionDistance: 150,
      animationSpeed: 1,
    }
  },
  
  // 3D settings
  threejs: {
    enabled: !(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),
    quality: {
      mobile: 'low',
      desktop: 'medium',
      highEnd: 'high'
    }
  },
  
  // Cache settings
  cache: {
    enabled: true,
    duration: 1000 * 60 * 60 * 24, // 24 hours
    keys: {
      icons: 'cloution_icons_cache',
      images: 'cloution_images_cache',
      data: 'cloution_data_cache'
    }
  }
};

// Get performance profile
export const getPerformanceProfile = () => {
  const isMobile = PERFORMANCE_CONFIG.isMobile;
  const isLowEnd = PERFORMANCE_CONFIG.isLowEnd;
  
  if (isMobile || isLowEnd) {
    return 'low';
  } else if (navigator.hardwareConcurrency >= 8) {
    return 'high';
  }
  return 'medium';
};

// Cache utilities
export const CacheManager = {
  set: (key, data, duration = PERFORMANCE_CONFIG.cache.duration) => {
    if (!PERFORMANCE_CONFIG.cache.enabled) return;
    
    const item = {
      value: data,
      timestamp: Date.now(),
      duration
    };
    
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.warn('Cache storage failed:', e);
    }
  },
  
  get: (key) => {
    if (!PERFORMANCE_CONFIG.cache.enabled) return null;
    
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;
      
      const now = Date.now();
      if (now - item.timestamp > item.duration) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (e) {
      console.warn('Cache retrieval failed:', e);
      return null;
    }
  },
  
  clear: () => {
    Object.values(PERFORMANCE_CONFIG.cache.keys).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
