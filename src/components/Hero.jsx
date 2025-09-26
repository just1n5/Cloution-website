import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Rocket,
  Target,
} from "lucide-react";

const Hero = () => {
  const canvasRef = useRef(null);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

  // Valores rotativos
  const rotatingValues = [
    {
      text: "Soluciones que escalan contigo",
      color: "from-blue-400 to-cyan-400",
    },
    {
      text: "Acompañamiento cercano y constante",
      color: "from-purple-400 to-pink-400",
    },
    {
      text: "Implementación ágil y eficiente",
      color: "from-green-400 to-teal-400",
    },
    {
      text: "Seguridad y confianza garantizada",
      color: "from-orange-400 to-red-400",
    },
  ];

  // Rotar valores cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % rotatingValues.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animated network nodes background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const nodeCount = 50;

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.6)";
        ctx.fill();

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i === j) return;
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) +
              Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${
              0.2 * (1 - distance / 150)
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(drawNetwork);
    };

    drawNetwork();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollDown = () => {
    const element = document.getElementById("nosotros");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Network Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ background: "transparent" }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs with slower animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"
        />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect mb-8 border border-blue-500/20"
          >
            <Sparkles className="w-4 h-4 text-neon-blue animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transformamos negocios con tecnología de vanguardia.
            </span>
            <Sparkles className="w-4 h-4 text-neon-purple animate-pulse" />
          </motion.div>

          {/* New Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Transforma tu negocio</span>
            <span className="block gradient-text mt-2">
              Conquista el futuro digital
            </span>
          </motion.h1>

          {/* New Detailed Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Somos una{" "}
            <span className="text-white font-medium">startup tecnológica</span>{" "}
            que impulsa a las empresas con soluciones B2B basadas en{" "}
            <span className="text-blue-400">inteligencia artificial</span>,{" "}
            <span className="text-purple-400">automatización</span> y{" "}
            <span className="text-teal-400">desarrollo a medida</span> y el{" "}
            <span className="text-orange-400">diseño de páginas web</span> .
            Creamos tecnología confiable, escalable y hecha para crecer contigo.
          </motion.p>

          {/* Updated CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/+573219984290"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group flex items-center gap-2 px-8 py-4 text-lg font-semibold"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary group flex items-center gap-2 px-8 py-4 text-lg font-semibold border-gradient"
                style={{
                  background:
                    "linear-gradient(135deg, transparent, transparent)",
                  borderImage:
                    "linear-gradient(135deg, #2563eb, #8b5cf6, #14b8a6) 1",
                }}
                href="#servicios"
              >
                <Rocket className="w-5 h-5" />
                Explorar Servicios
              </motion.a>
            </div>

            {/* Micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm text-gray-400 flex items-center gap-3"
            >
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Sin costos ocultos
              </span>
              <span className="text-gray-600">·</span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4 text-blue-400" />
                Respuesta en menos de 24h
              </span>
            </motion.p>
          </motion.div>

          {/* NEW: Rotating Values Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 mb-8"
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">
              Por qué elegirnos
            </p>
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentValueIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${rotatingValues[currentValueIndex].color} bg-clip-text text-transparent`}
              >
                {rotatingValues[currentValueIndex].text}
              </motion.h3>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4">
              {rotatingValues.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentValueIndex
                      ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                      : "w-2 bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Alternative: Simple inline tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-3 text-sm text-gray-500"
          >
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Escalable
            </span>
            <span className="text-gray-700">·</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Cercano
            </span>
            <span className="text-gray-700">·</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Ágil
            </span>
            <span className="text-gray-700">·</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              Confiable
            </span>
          </motion.div>

          {/* Integrated Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-16 mb-20 cursor-pointer flex justify-center"
            onClick={handleScrollDown}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 group"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                Descubre más
              </span>
              <div className="relative">
                <div className="p-3 rounded-full border border-blue-500/30 group-hover:border-blue-500/60 transition-all duration-300 bg-blue-500/5 group-hover:bg-blue-500/10">
                  <ChevronDown className="w-5 h-5 text-neon-blue" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-blue-500/20 -z-10"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
