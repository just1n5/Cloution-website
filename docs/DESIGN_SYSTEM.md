# 🎨 Design System - Cloution Website

## 📋 Tabla de Contenidos
1. [Filosofía de Diseño](#filosofía-de-diseño)
2. [Colores](#colores)
3. [Tipografía](#tipografía)
4. [Espaciado](#espaciado)
5. [Componentes](#componentes)
6. [Animaciones](#animaciones)
7. [Iconografía](#iconografía)
8. [Efectos Visuales](#efectos-visuales)
9. [Responsive Design](#responsive-design)
10. [Accesibilidad](#accesibilidad)

---

## 🌟 Filosofía de Diseño

### Concepto: "Galaxia Digital"
El diseño de Cloution se basa en la metáfora de una galaxia digital, representando:
- **Infinitas posibilidades** tecnológicas
- **Conexiones** entre sistemas y soluciones
- **Evolución constante** y movimiento
- **Profundidad** y complejidad técnica
- **Elegancia** y profesionalismo

### Principios de Diseño
1. **Minimalismo Funcional**: Cada elemento tiene un propósito
2. **Movimiento con Sentido**: Las animaciones guían y comunican
3. **Jerarquía Visual Clara**: Información organizada y escaneable
4. **Consistencia**: Patrones repetibles y predecibles
5. **Accesibilidad**: Diseño inclusivo para todos

---

## 🎨 Colores

### Paleta Principal

#### Fondos Base
```css
--galaxy-dark: #0f172a    /* Azul noche profundo */
--galaxy-violet: #1e1b4b  /* Violeta cósmico */
```

#### Colores de Acento
```css
--neon-blue: #2563eb     /* Azul neón - Principal */
--neon-purple: #8b5cf6   /* Púrpura neón - Secundario */
--neon-teal: #14b8a6     /* Verde azulado - Terciario */
```

#### Escala de Grises
```css
--white: #ffffff         /* Blanco puro */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db      /* Texto secundario */
--gray-400: #9ca3af      /* Texto deshabilitado */
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

### Uso de Colores

#### Textos
- **Títulos principales**: `#ffffff` (white)
- **Subtítulos**: `#e2e8f0` (gray-200)
- **Párrafos**: `#d1d5db` (gray-300)
- **Texto secundario**: `#9ca3af` (gray-400)
- **Enlaces**: `#2563eb` (neon-blue)

#### Fondos
- **Fondo principal**: Gradiente de `galaxy-dark` a `galaxy-violet`
- **Cards**: `rgba(255, 255, 255, 0.05)` con backdrop-blur
- **Hover states**: `rgba(37, 99, 235, 0.1)` (neon-blue con transparencia)

#### Estados
- **Success**: `#10b981`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`
- **Info**: `#3b82f6`

### Gradientes

```css
/* Gradiente Principal */
background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);

/* Gradiente de Texto */
background: linear-gradient(to right, #2563eb, #8b5cf6, #14b8a6);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Gradiente de Acento */
background: linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%);
```

---

## 📝 Tipografía

### Fuente Principal
**Familia**: Inter
**Fallback**: system-ui, -apple-system, sans-serif
**Importación**: Google Fonts

### Escala Tipográfica

#### Títulos
```css
.heading-1 {
  font-size: clamp(3rem, 5vw, 4.5rem);  /* 48px - 72px */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.heading-2 {
  font-size: clamp(2.25rem, 4vw, 3.75rem);  /* 36px - 60px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.heading-3 {
  font-size: clamp(1.875rem, 3vw, 2.25rem);  /* 30px - 36px */
  font-weight: 600;
  line-height: 1.3;
}

.heading-4 {
  font-size: clamp(1.5rem, 2.5vw, 1.875rem);  /* 24px - 30px */
  font-weight: 600;
  line-height: 1.4;
}

.heading-5 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);  /* 20px - 24px */
  font-weight: 500;
  line-height: 1.5;
}
```

#### Cuerpo de Texto
```css
.body-large {
  font-size: 1.125rem;  /* 18px */
  line-height: 1.75;
  font-weight: 400;
}

.body-regular {
  font-size: 1rem;  /* 16px */
  line-height: 1.6;
  font-weight: 400;
}

.body-small {
  font-size: 0.875rem;  /* 14px */
  line-height: 1.5;
  font-weight: 400;
}

.caption {
  font-size: 0.75rem;  /* 12px */
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0.02em;
}
```

---

## 📐 Espaciado

### Sistema de 8 puntos
Todo el espaciado sigue un sistema basado en múltiplos de 8:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Contenedores
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container { padding: 0 var(--space-6); }
}

@media (min-width: 1024px) {
  .container { padding: 0 var(--space-8); }
}
```

---

## 🧩 Componentes

### Botones

#### Botón Primario
```css
.btn-primary {
  background: var(--neon-blue);
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.3);
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(37, 99, 235, 0.4);
}
```

#### Botón Secundario
```css
.btn-secondary {
  background: transparent;
  color: var(--neon-blue);
  border: 2px solid var(--neon-blue);
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: var(--neon-blue);
  color: white;
  transform: translateY(-2px);
}
```

### Cards

#### Card Base
```css
.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
```

### Glass Effect
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Badges
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: var(--neon-blue);
}
```

---

## 🎭 Animaciones

### Transiciones Base
```css
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;
--transition-slower: 800ms ease;
```

### Animaciones Predefinidas

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide Up
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

#### Pulse
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

#### Glow
```css
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
  }
  50% {
    box-shadow: 0 0 30px rgba(37, 99, 235, 0.8);
  }
}
```

### Configuración de Framer Motion

```javascript
// Variantes de Contenedor
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
}

// Variantes de Items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

// Configuración de Hover
const hoverConfig = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeInOut"
  }
}
```

---

## 🎯 Iconografía

### Librería de Iconos
**Librería**: Lucide React
**Tamaño estándar**: 24x24px
**Stroke width**: 2px

### Iconos Principales
- **Logo**: `<Zap />`
- **Menú**: `<Menu />`
- **Cerrar**: `<X />`
- **Flecha**: `<ArrowRight />`
- **Chevron**: `<ChevronDown />`
- **Play**: `<Play />`
- **Plus**: `<Plus />`

### Uso de Iconos
```jsx
// Icono simple
<Zap className="w-6 h-6 text-neon-blue" />

// Icono con animación
<motion.div whileHover={{ rotate: 360 }}>
  <Settings className="w-6 h-6" />
</motion.div>
```

---

## ✨ Efectos Visuales

### Sombras
```css
/* Sombras de Elevación */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Sombras de Color */
--shadow-blue: 0 4px 14px 0 rgba(37, 99, 235, 0.3);
--shadow-purple: 0 4px 14px 0 rgba(139, 92, 246, 0.3);
```

### Bordes
```css
--border-radius-sm: 4px;
--border-radius-md: 8px;
--border-radius-lg: 12px;
--border-radius-xl: 16px;
--border-radius-2xl: 24px;
--border-radius-full: 9999px;
```

### Blur Effects
```css
--blur-sm: 4px;
--blur-md: 8px;
--blur-lg: 12px;
--blur-xl: 16px;
--blur-2xl: 24px;
```

---

## 📱 Responsive Design

### Breakpoints
```css
--screen-sm: 640px;   /* Mobile landscape */
--screen-md: 768px;   /* Tablet */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large desktop */
--screen-2xl: 1536px; /* Extra large */
```

### Estrategia Mobile-First
```css
/* Base (Mobile) */
.component {
  padding: 16px;
  font-size: 14px;
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: 24px;
    font-size: 16px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: 32px;
    font-size: 18px;
  }
}
```

### Grid System
```css
/* Grid Responsive */
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1280px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## ♿ Accesibilidad

### Contraste de Color
- **Texto grande**: Ratio mínimo 3:1
- **Texto normal**: Ratio mínimo 4.5:1
- **Elementos interactivos**: Ratio mínimo 3:1

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--neon-blue);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Tamaños Mínimos
- **Áreas clickeables**: Mínimo 44x44px
- **Espaciado entre links**: Mínimo 8px
- **Tamaño de fuente mínimo**: 14px

### ARIA Labels
```jsx
<button aria-label="Abrir menú">
  <Menu />
</button>

<nav aria-label="Navegación principal">
  {/* Links */}
</nav>
```

### Jerarquía de Encabezados
- Un solo `<h1>` por página
- Orden secuencial (h1 → h2 → h3)
- No saltar niveles

---

## 🔧 Utilidades CSS

### Clases Utilitarias Personalizadas

```css
/* Ocultar visualmente pero mantener para lectores de pantalla */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Truncar texto */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Preserve 3D para animaciones */
.preserve-3d {
  transform-style: preserve-3d;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(to right, var(--neon-blue), var(--neon-purple), var(--neon-teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 📚 Recursos y Referencias

### Herramientas de Diseño
- **Figma**: Para prototipos y diseño
- **Coolors**: Generación de paletas
- **Contrast Checker**: Verificación de accesibilidad
- **Framer Motion**: Documentación de animaciones

### Inspiración
- **Awwwards**: Sitios web premiados
- **Dribbble**: Conceptos de UI
- **Behance**: Proyectos de diseño

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0.0
**Mantenido por**: Equipo Cloution
