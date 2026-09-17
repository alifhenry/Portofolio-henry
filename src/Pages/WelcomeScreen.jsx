import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Waktu tunggu disesuaikan agar terasa cepat, responsif, dan tidak membosankan
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000); // Menunggu animasi tirai naik selesai
    }, 2800); 
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // Animasi transisi layar ditarik ke atas (Curtain Reveal)
  const containerVariants = {
    exit: {
      y: "-100%", // Bergerak ke atas menjauhi layar
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Kurva animasi premium (snappy & smooth)
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center overflow-hidden"
          initial={{ y: 0 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* Latar Belakang: Dotted Grid agar konsisten dengan tema web */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:32px_32px] opacity-70"></div>

          {/* Konten Utama */}
          <div className="relative z-10 text-center flex flex-col items-center">
            
            {/* Badge Initializing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-4 md:mb-6"
            >
              <span className="px-5 py-2 rounded-sm bg-zinc-900 text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                System Initializing
              </span>
            </motion.div>

            {/* Nama Raksasa dengan efek muncul dari bawah (Masking) */}
            <div className="overflow-hidden mb-2 px-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase"
              >
                HENRY<span className="text-zinc-300">.</span>
              </motion.h1>
            </div>

            {/* Loading Bar Elegan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <div className="h-[2px] w-32 md:w-48 bg-zinc-200 overflow-hidden relative">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-zinc-900"
                />
              </div>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-zinc-400 uppercase">
                Loading Portfolio
              </p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;