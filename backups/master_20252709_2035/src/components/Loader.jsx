import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-galaxy-dark via-galaxy-violet to-galaxy-dark"
    >
      <div className="relative">
        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-32 h-32"
        >
          <div className="w-full h-full rounded-full border-4 border-neon-blue/20 border-t-neon-blue" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-32 h-32"
        >
          <div className="w-full h-full rounded-full border-4 border-neon-purple/20 border-t-neon-purple" />
        </motion.div>

        {/* Center logo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <img
            src="/logo.svg"
            alt="Cloution Logo"
            className="w-14 h-14"
            style={{ filter: "drop-shadow(0 0 10px rgba(37, 99, 235, 0.5))" }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          style={{ marginLeft: "-44px" }}
        >
          <div className="flex items-center justify-center">
            <span className="text-white font-medium text-lg">Cargando</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-neon-blue ml-1 text-lg"
            >
              ...
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
