import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Target,
  Lightbulb,
  TrendingUp,
  Brain,
  Cloud,
  Code2,
  MonitorSmartphone,
  Server,
  Sparkles,
  Shield,
} from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
} from "postprocessing";

// Importar los iconos 3D reales
import AiDataIcon3D from "../icons/AiDataIcon3D";
import CloudDevOpsIcon3D from "../icons/CloudDevOpsIcon3D";
import SecurityIcon3D from "../icons/SecurityIcon3D";
import FrontendIcon3D from "../icons/FrontendIcon3D";
import BackendIcon3D from "../icons/BackendIcon3D";
import UxUiIcon3D from "../icons/UxUiIcon3D";
import ApisAutomationIcon3D from "../icons/ApisAutomationIcon3D";

// 3D Solar System data con mapeo a iconos 3D reales
const PLANETS = [
  {
    id: "ai",
    label: "AI & Data",
    radius: 8.5,
    speed: 0.35,
    color: "#8B5CF6",
    Icon3D: AiDataIcon3D,
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    radius: 10.5,
    speed: 0.26,
    color: "#3BA3FF",
    Icon3D: CloudDevOpsIcon3D,
  },
  {
    id: "apis",
    label: "APIs & Automatización",
    radius: 12.5,
    speed: 0.3,
    color: "#F97316",
    ring: true,
    Icon3D: ApisAutomationIcon3D,
  },
  {
    id: "ux",
    label: "UX / UI",
    radius: 7.5,
    speed: 0.42,
    color: "#EC4899",
    Icon3D: UxUiIcon3D,
  },
  {
    id: "be",
    label: "Backend",
    radius: 5.5,
    speed: 0.55,
    color: "#10B981",
    Icon3D: BackendIcon3D,
  },
  {
    id: "fe",
    label: "Frontend",
    radius: 6.5,
    speed: 0.58,
    color: "#60A5FA",
    Icon3D: FrontendIcon3D,
  },
  {
    id: "sec",
    label: "Seguridad",
    radius: 9.5,
    speed: 0.22,
    color: "#EF4444",
    halo: true,
    Icon3D: SecurityIcon3D,
  },
];

const CAPABILITY_INFO = {
  ai: {
    desc: "Modelos de IA predictivos para decisiones asistidas y automatización estratégica.",
    exampleTitle: "CASO DE USO CLAVE",
    example:
      "Implementación de bots conversacionales 24/7 y dashboards con analítica predictiva.",
    valueTitle: "VALOR INMEDIATO",
    techTitle: "TECNOLOGÍA BASE",
    tech: [
      "OpenAI (o LLMs)",
      "Python (TensorFlow/PyTorch)",
      "Node.js",
      "PostgreSQL",
    ],
    bullets: [
      "Modelos de Machine Learning entrenados con tus datos de negocio.",
      "Sistemas de recomendación y forecasting automatizado.",
    ],
  },
  cloud: {
    desc: "Despliegues seguros y escalables. Monitoreo automatizado y orquestación CI/CD.",
    exampleTitle: "CASO DE USO CLAVE",
    example:
      "Migración orquestada a AWS con ambientes segregados (Dev/QA/Prod).",
    valueTitle: "VALOR INMEDIATO",
    techTitle: "TECNOLOGÍA BASE",
    tech: ["AWS", "Docker", "GitHub Actions"],
    bullets: [
      "Arquitectura cloud-native optimizada y adaptable.",
      "Automatización completa con Pipelines CI/CD.",
    ],
  },
  apis: {
    desc: "Orquestación de procesos críticos y flujos de trabajo inteligentes.",
    exampleTitle: "CASO DE USO CLAVE",
    example:
      "Flujos de automatización para CRMs/ERPs, como agendamiento automático vía WhatsApp (utilizando n8n).",
    valueTitle: "VALOR INMEDIATO",
    techTitle: "TECNOLOGÍA BASE",
    tech: ["REST API", "Webhooks", "n8n (Orquestación)", "JSON"],
    bullets: [
      "APIs y Webhooks para integraciones seguras en tiempo real.",
      "Automatización de procesos empresariales (BPM) sin code-debt.",
    ],
  },
  ux: {
    desc: "Diseño centrado en el usuario y design system consistente.",
    example: "Flujos claros y accesibles AA.",
    tech: ["Figma", "WCAG", "Design Tokens"],
    bullets: ["Accesibilidad", "Diseño consistente"],
  },
  be: {
    desc: "Infraestructura modular, escalable y optimizada para el rendimiento.",
    exampleTitle: "CASO DE USO CLAVE",
    example:
      "Diseño e implementación de APIs en Node, con autenticación segura y estrategias avanzadas de caché.",
    valueTitle: "VALOR INMEDIATO",
    techTitle: "TECNOLOGÍA BASE",
    tech: ["Node.js", "Express.js", "JWT", "Redis"],
    bullets: [
      "Arquitectura desacoplada y modular (fácil de escalar y mantener).",
      "Sistemas de observabilidad para monitoreo proactivo de performance.",
    ],
  },
  fe: {
    desc: "Experiencias de usuario de vanguardia, optimizadas para rendimiento y conversión.",
    exampleTitle: "CASO DE USO CLAVE",
    example:
      "Desarrollo de SPA (Single Page Applications) en React con performance superior y arquitectura CLS-Free.",
    valueTitle: "VALOR INMEDIATO",
    techTitle: "TECNOLOGÍA BASE",
    tech: ["React", "Vite", "Tailwind CSS"],
    bullets: [
      "Velocidad de carga extrema (gracias a Vite).",
      "Diseño UX/UI centrado en la conversión y la accesibilidad.",
    ],
  },
  sec: {
    desc: "Protección integral, cumplimiento normativo y enfoque proactivo.",
    exampleTitle: "CASO DE USO CLAVE",
    example:
      "Implementación de cifrado de extremo a extremo, garantizando la confidencialidad de tus datos.",
    valueTitle: "VALOR INMEDIATO",
    techTitle: "TECNOLOGÍA BASE",
    tech: ["TLS", "WAF", "Pruebas de Penetración"],
    bullets: [
      "Defensa activa contra vulnerabilidades (OWASP).",
      "Arquitectura de infraestructura reforzada (Hardening).",
      "Monitoreo continuo y gestión de accesos.",
    ],
  },
};

const ICONS = {
  ai: Brain,
  cloud: Cloud,
  apis: Code2,
  ux: Sparkles,
  be: Server,
  fe: MonitorSmartphone,
  sec: Shield,
};

// Generates a circular radial alpha texture for a soft glow (no hard rectangle)
function useRadialGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0, "rgba(179,140,255,0.55)");
    g.addColorStop(1, "rgba(179,140,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Effects({ enabled = true, visible = true }) {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const comp = new EffectComposer(gl);
    comp.multisampling = 2;
    const renderPass = new RenderPass(scene, camera);
    const bloom = new BloomEffect({
      intensity: 0.25,
      luminanceThreshold: 0.2,
      luminanceSmoothing: 0.025,
    });
    const effects = new EffectPass(camera, bloom);
    comp.addPass(renderPass);
    comp.addPass(effects);
    comp.setSize(size.width, size.height);
    composer.current = comp;
    return () => {
      composer.current?.dispose();
      composer.current = null;
    };
  }, [gl, scene, camera, size, enabled]);
  useEffect(() => {
    if (composer.current && enabled)
      composer.current.setSize(size.width, size.height);
  }, [size, enabled]);
  useFrame((_, delta) => {
    if (enabled && visible && composer.current) composer.current.render(delta);
  }, 1);
  return null;
}

const Sun = () => {
  const core = useRef();
  const glow = useRef();
  const glowTex = useRadialGlowTexture();
  useFrame((_, dt) => {
    if (core.current) core.current.rotation.y += dt * 0.15;
    if (glow.current) glow.current.rotation.z += dt * 0.02;
  });
  return (
    <group>
      {/* Core sphere with emissive material (drives Bloom) */}
      <mesh ref={core} renderOrder={2} castShadow receiveShadow>
        <sphereGeometry args={[2.1, 48, 48]} />
        <meshStandardMaterial
          color="#8AA4FF"
          emissive="#8AA4FF"
          emissiveIntensity={0.6}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>
      {/* Halo: radial alpha glow behind the core, no hard rectangle */}
      <Billboard>
        <mesh ref={glow} renderOrder={1} position={[0, 0, -0.01]}>
          <planeGeometry args={[7, 7]} />
          <meshBasicMaterial
            map={glowTex}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.85}
          />
        </mesh>
      </Billboard>
      {/* Label: 3D text below the sun, no background */}
      <Text
        position={[0, -2.9, 0]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#B38CFF"
        renderOrder={3}
      >
        Cloution Core
      </Text>
      {/* light source */}
      <pointLight color="#ffffff" intensity={1.2} distance={40} decay={2} />
    </group>
  );
};

const Orbit = ({ radius, highlighted }) => {
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial
        color={highlighted ? "#93a5fd" : "#ffffff"}
        transparent
        opacity={highlighted ? 0.35 : 0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Planet = ({
  data,
  reduced,
  hoveredId,
  setHoveredId,
  onActivate,
  registerRef,
  visible,
  activeId,
}) => {
  const { radius, speed, color, id, label } = data;
  const group = useRef();
  const modelRef = useRef();
  const angle = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);
  const orbitspeed = (reduced ? 0.3 : 1) * speed;
  const [distanceFactor, setDistanceFactor] = useState(8);
  const { camera } = useThree();
  const tooltipId = `tt-${id}`;
  const isActive = activeId === id;

  useEffect(() => {
    registerRef?.(id, group);
  }, [id, registerRef]);

  useFrame((_, delta) => {
    if (!visible) return;
    angle.current += delta * orbitspeed * 0.6;
    const x = Math.cos(angle.current) * radius;
    const z = Math.sin(angle.current) * radius;
    if (group.current) group.current.position.set(x, 0, z);
    if (modelRef.current) modelRef.current.rotation.y += delta * 0.2;
    if (group.current) {
      const gp = group.current.getWorldPosition(new THREE.Vector3());
      const dist = camera.position.distanceTo(gp);
      // Keep label fairly constant in screen size
      const df = Math.max(6, Math.min(12, dist * 0.35));
      setDistanceFactor(df);
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => (document.body.style.cursor = "");
  }, [hovered]);

  const info = CAPABILITY_INFO[id] || {};

  return (
    <group ref={group}>
      {/* Collider invisible para interacción - usando raycast only */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setHoveredId(id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          setHoveredId(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onActivate(id);
        }}
      >
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          alphaTest={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* visible planet: 3D icon model */}
      <group
        ref={modelRef}
        scale={isActive ? 1.25 : hovered || hoveredId === id ? 1.12 : 1}
      >
        <Suspense
          fallback={
            <mesh>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>
          }
        >
          {data.Icon3D && (
            <data.Icon3D
              color={color}
              emissive={id === "sec" ? color : undefined}
              emissiveIntensity={id === "sec" ? 0.3 : 0}
              rotationSpeed={0.15}
              scale={0.96}
            />
          )}
        </Suspense>
      </group>
      {/* saturn-like ring */}
      {data.ring && (
        <mesh rotation-x={-Math.PI / 3}>
          <ringGeometry args={[1.1, 1.5, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isActive ? 0.6 : hovered || hoveredId === id ? 0.45 : 0.35}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {/* halo/shield - solo para seguridad */}
      {data.halo && id === "sec" && (
        <mesh>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isActive ? 0.18 : 0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {/* Always-visible label */}
      <Billboard position={[0, 1.6, 0]}>
        <Html
          center
          transform
          distanceFactor={distanceFactor}
          zIndexRange={[10, 0]}
        >
          <button
            role="button"
            tabIndex={0}
            aria-label={label}
            aria-describedby={hovered ? tooltipId : undefined}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onActivate(id);
              if (e.key === "Escape") setHovered(false);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            className={`px-2 py-1 rounded-lg border backdrop-blur text-white/90 text-xs flex items-center gap-2 transition-colors ${
              isActive
                ? "bg-neon-blue/30 border-neon-blue/40 shadow-[0_0_20px_rgba(59,163,255,0.35)]"
                : hovered || hoveredId === id
                ? "bg-white/20 border-white/30"
                : "bg-white/10 border-white/20 opacity-60"
            }`}
          >
            {(() => {
              const Icon = ICONS[id];
              return Icon ? (
                <Icon className="w-3.5 h-3.5 text-white/90" />
              ) : (
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              );
            })()}
            <span className="font-medium">{label}</span>
          </button>
        </Html>
      </Billboard>
      {/* Tooltip with one-line description, occluded if hidden */}
      <Billboard position={[0, 2.4, 0]}>
        <Html
          center
          transform
          occlude
          distanceFactor={distanceFactor}
          zIndexRange={[20, 0]}
        >
          <AnimatePresence>
            {(hovered || hoveredId === id) && (
              <motion.div
                id={tooltipId}
                role="tooltip"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="px-2 py-1 rounded-md border border-white/20 bg-slate-900/80 text-white text-xs backdrop-blur shadow"
              >
                {(CAPABILITY_INFO[id]?.desc || "").split(".")[0]}
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
      </Billboard>
    </group>
  );
};

function PlanetContent({ id, color }) {
  const commonMat = { metalness: 0.15, roughness: 0.55 };
  switch (id) {
    case "ai":
      // Chip: rounded box + small pins
      return (
        <group>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.3, 1.1]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
          {/* pins */}
          {[-0.6, 0.6].map((x) =>
            [-0.4, 0.4].map((z) => (
              <mesh key={`pin-${x}-${z}`} position={[x, -0.25, z]}>
                <cylinderGeometry args={[0.06, 0.06, 0.3, 16]} />
                <meshStandardMaterial
                  color="#cbd5e1"
                  metalness={0.4}
                  roughness={0.4}
                />
              </mesh>
            ))
          )}
          {/* center node */}
          <mesh position={[0, 0.2, 0]}>
            <torusGeometry args={[0.35, 0.08, 12, 32]} />
            <meshStandardMaterial color="#ffffff" {...commonMat} />
          </mesh>
        </group>
      );
    case "cloud":
      // Cloud: overlapping spheres
      return (
        <group>
          <mesh castShadow receiveShadow position={[-0.45, 0, 0]}>
            <sphereGeometry args={[0.65, 32, 32]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.45, 0, 0]}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
        </group>
      );
    case "apis":
      // API: torus ring with small nodes around
      return (
        <group>
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.7, 0.18, 16, 48]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.7, 0, Math.sin(a) * 0.7]}
              >
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#ffffff" {...commonMat} />
              </mesh>
            );
          })}
        </group>
      );
    case "ux":
      // UX/UI: cube with a front panel and dots
      return (
        <group>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
          <mesh position={[0, 0.05, 0.51]}>
            <boxGeometry args={[0.75, 0.45, 0.06]} />
            <meshStandardMaterial color="#0ea5e9" {...commonMat} />
          </mesh>
          {[-0.25, 0, 0.25].map((x, idx) => (
            <mesh key={idx} position={[x, 0.18, 0.54]}>
              <sphereGeometry args={[0.06, 14, 14]} />
              <meshStandardMaterial color="#ffffff" {...commonMat} />
            </mesh>
          ))}
        </group>
      );
    case "be":
      // Backend: stacked blocks
      return (
        <group>
          <mesh castShadow receiveShadow position={[0, -0.4, 0]}>
            <boxGeometry args={[1.2, 0.28, 1.2]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[1.0, 0.28, 1.0]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
            <boxGeometry args={[0.8, 0.28, 0.8]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
        </group>
      );
    case "fe":
      // Frontend: layered plates
      return (
        <group>
          <mesh
            castShadow
            receiveShadow
            position={[0, -0.1, 0]}
            rotation={[0.05, 0.2, 0]}
          >
            <boxGeometry args={[1.1, 0.18, 0.9]} />
            <meshStandardMaterial color={color} {...commonMat} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            position={[0.05, 0.22, 0.05]}
            rotation={[-0.05, -0.15, 0]}
          >
            <boxGeometry args={[1.0, 0.16, 0.8]} />
            <meshStandardMaterial color="#ffffff" {...commonMat} />
          </mesh>
        </group>
      );
    case "sec":
      // Security: simple extruded shield
      return (
        <group>
          <ShieldMesh color={color} />
        </group>
      );
    default:
      return (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.0, 32, 32]} />
          <meshStandardMaterial color={color} {...commonMat} />
        </mesh>
      );
  }
}

function ShieldMesh({ color = "#3D5A80" }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.9);
    s.bezierCurveTo(0.6, 0.9, 0.8, 0.4, 0.0, -1.1);
    s.bezierCurveTo(-0.8, 0.4, -0.6, 0.9, 0, 0.9);
    return s;
  }, []);
  return (
    <mesh castShadow receiveShadow rotation={[0, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.25, bevelEnabled: false }]} />
      <meshStandardMaterial color={color} metalness={0.15} roughness={0.55} />
    </mesh>
  );
}

const SolarSystem = ({
  reduced,
  activeId,
  setActiveId,
  registerRef,
  visible,
}) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <group rotation-x={-0.26}>
      <Sun />
      {PLANETS.map((p) => (
        <Orbit
          key={`orbit-${p.id}`}
          radius={p.radius}
          highlighted={hoveredId === p.id || activeId === p.id}
        />
      ))}
      {PLANETS.map((p) => (
        <Planet
          key={p.id}
          data={p}
          reduced={reduced}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          onActivate={setActiveId}
          registerRef={registerRef}
          visible={visible}
          activeId={activeId}
        />
      ))}
    </group>
  );
};

const CameraRig = ({ activeId, getPlanetRef, shouldReduceMotion }) => {
  const controls = useRef();
  const { camera, gl } = useThree();
  // attach controls ref via key
  useEffect(() => {
    const c = controls.current;
    return () => {
      if (c) c.dispose?.();
    };
  }, []);
  useFrame((_, delta) => {
    const ref = activeId && !shouldReduceMotion ? getPlanetRef(activeId) : null;
    const current = ref?.current;
    if (current) {
      const target = current.getWorldPosition(new THREE.Vector3());
      const dir = camera.position.clone().sub(target).normalize();
      const desired = target
        .clone()
        .add(dir.multiplyScalar(6))
        .add(new THREE.Vector3(0, 1.8, 0));
      camera.position.lerp(desired, Math.min(1, delta * 2));
      controls.current?.target.lerp(target, Math.min(1, delta * 2));
      controls.current?.update();
    }
  });
  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={14}
      maxDistance={36}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={(3 * Math.PI) / 5}
      autoRotate={!activeId && !shouldReduceMotion}
      autoRotateSpeed={0.12}
      args={[camera, gl.domElement]}
    />
  );
};

const CapabilityPanel = ({ activeId, onClose }) => {
  const data = PLANETS.find((p) => p.id === activeId);
  const info = activeId ? CAPABILITY_INFO[activeId] : null;
  const exampleHeading = info?.exampleTitle || "Ejemplo aplicado";
  const valueHeading = info?.valueTitle || "¿Qué entregamos?";
  const techHeading = info?.techTitle || "Stack técnico";
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!data || !info) return null;
  return (
    <motion.aside
      initial={{ x: 160, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 160, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative flex h-full w-full flex-col border-t border-white/5 bg-slate-950/95 backdrop-blur-2xl shadow-[0_0_40px_rgba(15,23,42,0.6)] lg:w-[55%] xl:w-[50%]"
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 py-7 sm:px-8 lg:px-12">
        <header className="flex items-start gap-3 border-b border-white/10 pb-6">
          <div className="flex items-start gap-3">
            <span
              className="mt-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-blue/70">
                Capability
              </p>
              <h2 className="text-2xl font-bold text-white">{data.label}</h2>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{info.desc}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-6 py-6">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              {exampleHeading}
            </h3>
            <p className="mt-2 text-base text-white/80 leading-relaxed">
              {info.example}
            </p>
          </section>

          {info.bullets?.length ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
                {valueHeading}
              </h3>
              <ul className="mt-3 space-y-2">
                {info.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5/10 px-3 py-2 text-sm text-white/80 backdrop-blur"
                  >
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon-blue" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {info.tech?.length ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
                {techHeading}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {info.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <footer className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            ¿Necesitas llevar este roadmap a tu equipo? Genera un reporte inmediato.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-neon-blue/50 hover:text-white"
            >
              Cerrar panel
            </motion.button>
          </div>
        </footer>
      </div>
    </motion.aside>
  );
};

function useLowFpsOnMobile() {
  const [low, setLow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile =
      window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;
    let frames = 0;
    let start = performance.now();
    let raf = null;
    const loop = () => {
      frames++;
      const now = performance.now();
      if (now - start >= 1000) {
        const fps = frames / ((now - start) / 1000);
        if (fps < 30) setLow(true);
        cancelAnimationFrame(raf);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return low;
}

function usePageVisible() {
  const [visible, setVisible] = useState(
    typeof document !== "undefined" ? !document.hidden : true
  );
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return visible;
}

const SolarSystemCanvas = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(null);
  const lowFps = useLowFpsOnMobile();
  const pageVisible = usePageVisible();
  const renderFallback = shouldReduceMotion || lowFps;
  const refs = useRef({});
  const registerRef = (id, ref) => {
    refs.current[id] = ref;
  };
  const getPlanetRef = (id) => refs.current[id];
  const handleClose = () => setActiveId(null);

  const renderScene = (variant = "default") => {
    const baseClasses =
      variant === "split"
        ? "relative h-full min-h-[60vh] w-full overflow-hidden glass-effect"
        : "relative w-full h-96 overflow-hidden rounded-2xl glass-effect";
    const paddingClasses = variant === "split" ? "p-6 sm:p-8 lg:p-10" : "p-8";
    const borderClasses =
      variant === "split"
        ? "lg:rounded-l-3xl lg:border-r lg:border-white/10"
        : "";

    return (
      <div className={`${baseClasses} ${paddingClasses} ${borderClasses}`}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/35 via-slate-900/15 to-slate-900/35" />
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-neon-blue/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="relative z-10 h-full w-full">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 12, 22], fov: 42 }}
            onCreated={({ gl }) => {
              gl.setClearColor("#000000", 0);
              gl.toneMapping = THREE.ACESFilmicToneMapping;
            }}
          >
            <ambientLight intensity={0.3} />
            <Stars
              radius={80}
              depth={40}
              count={2000}
              factor={4}
              saturation={0}
              fade
              speed={0.5}
            />
            <Suspense
              fallback={
                <group>
                  <mesh>
                    <sphereGeometry args={[2.5, 32, 32]} />
                    <meshStandardMaterial
                      color="#8B5CF6"
                      emissive="#4338CA"
                      emissiveIntensity={0.5}
                    />
                  </mesh>
                  <pointLight position={[0, 0, 0]} intensity={2} />
                </group>
              }
            >
              <SolarSystem
                reduced={shouldReduceMotion}
                activeId={activeId}
                setActiveId={setActiveId}
                registerRef={registerRef}
                visible={pageVisible}
              />
            </Suspense>
            <CameraRig
              activeId={activeId}
              getPlanetRef={getPlanetRef}
              shouldReduceMotion={shouldReduceMotion}
            />
            <Effects enabled={!shouldReduceMotion} visible={pageVisible} />
          </Canvas>
        </div>
      </div>
    );
  };

  if (renderFallback) {
    return (
      <>
        <div className="relative w-full overflow-hidden rounded-2xl glass-effect p-6">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-900/15 to-slate-900/35" />
          <div className="relative z-10">
            <div className="grid grid-cols-2 gap-3">
              {PLANETS.map((p) => {
                const info = CAPABILITY_INFO[p.id];
                const isOpen = activeId === p.id;
                return (
                  <div key={p.id} className="col-span-2">
                    <button
                      type="button"
                      onClick={() => setActiveId(isOpen ? null : p.id)}
                      className={`w-full flex items-center justify-between gap-2 rounded-xl border px-3 py-2 backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue ${
                        isOpen
                          ? "bg-white/10 border-neon-blue/40"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-sm font-medium text-white/90">
                        {p.label}
                      </span>
                      <span aria-hidden className="text-xs text-white/60">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.2,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pt-2 pb-3 text-sm text-white/80">
                            <div className="mb-1">
                              <span className="font-semibold text-white">
                                {p.label}:
                              </span>{" "}
                              {info.desc}
                            </div>
                            <div className="mb-1">
                              <span className="text-neon-blue font-medium">
                                Ejemplo:
                              </span>{" "}
                              {info.example}
                            </div>
                            <div className="text-xs text-gray-300">
                              Tech: {info.tech.join(", ")}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-white/70">
          Nuestro ecosistema combina IA, Cloud, APIs y diseño para crear
          soluciones B2B escalables y confiables.
        </p>
        <div className="mt-2 text-center">
          <a
            href="/3d-icons-test"
            className="inline-flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/60"
            title="Ver galería de iconos 3D"
          >
            <span>🔧</span>
            <span className="underline">Explorar sistema de iconos 3D</span>
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {!activeId && (
          <motion.div
            key="solar-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderScene("default")}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeId && (
          <motion.div
            key="solar-split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[120] flex flex-col bg-slate-950/80 backdrop-blur-xl lg:flex-row"
            onClick={(event) => {
              if (event.target === event.currentTarget) handleClose();
            }}
          >
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex-1 lg:w-[45%] xl:w-[42%]"
            >
              {renderScene("split")}
            </motion.div>
            <CapabilityPanel activeId={activeId} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>

      {!activeId && (
        <>
          <p className="mt-3 text-sm text-white/70">
            Nuestro ecosistema combina IA, Cloud, APIs y diseño para crear
            soluciones B2B escalables y confiables.
          </p>
          <div className="mt-2 text-center">
            <a
              href="/3d-icons-test"
              className="inline-flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/60"
              title="Ver galería de iconos 3D"
            >
              <span>🔧</span>
              <span className="underline">Explorar sistema de iconos 3D</span>
            </a>
          </div>
        </>
      )}
    </>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="nosotros" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <span className="text-neon-blue font-semibold text-sm uppercase tracking-wider">
                Quiénes Somos
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Pioneros en la
                <span className="gradient-text"> Transformación Digital</span>
              </h2>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Transformamos tus desafíos digitales en oportunidades de negocio.
              En Cloution, nuestro equipo de arquitectos digitales crea
              soluciones B2B innovadoras y escalables para impulsar el
              crecimiento de tu empresa.
            </p>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Convertimos retos tecnológicos en resultados de negocio tangibles,
              con un equipo cercano y multidisciplinario.
            </p>

            {/* Key Points */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Users,
                  title: "Equipo Experto",
                  desc: "Profesionales certificados",
                },
                {
                  icon: Target,
                  title: "Enfoque Preciso",
                  desc: "Solución alineada a objetivos, no a modas.",
                },
                {
                  icon: Lightbulb,
                  title: "Arquitectura escalable",
                  desc: "Crece contigo sin rehacerlo todo.",
                },
                {
                  icon: TrendingUp,
                  title: "Resultados Medibles",
                  desc: "Definimos métricas desde el día uno.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                    <item.icon className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Solar System 3D */}
          <motion.div variants={itemVariants} className="relative lg:pl-12">
            <SolarSystemCanvas />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
