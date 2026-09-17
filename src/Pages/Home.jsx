import React, { useEffect, useState, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const TECH_STACK = [
  "React.js", "JavaScript", "Tailwind CSS", "Node.js", "PHP", 
  "Laravel", "MySQL", "Supabase", "Git", "Figma", "REST API"
];

const Home = () => {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const WORDS = t("home.words", { returnObjects: true });

  const typeEffect = useCallback(() => {
    const currentWord = WORDS[wordIndex] || WORDS[0];
    const isComplete = !isDeleting && text === currentWord;
    const isEmpty = isDeleting && text === "";

    if (isComplete) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isEmpty) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    } else {
      const timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? 50 : 100);
      return () => clearTimeout(timeout);
    }
  }, [text, isDeleting, wordIndex, WORDS]);

  useEffect(() => {
    typeEffect();
  }, [typeEffect]);

  useEffect(() => {
    setText("");
    setWordIndex(0);
    setIsDeleting(false);
  }, [i18n.language]);

  return (
    <>
      <Helmet>
        <title>Muhammad Henry Alifianto | Software Engineer</title>
        <meta name="description" content="Website resmi Muhammad Henry Alifianto, Software Engineer." />
      </Helmet>

      <div className="relative min-h-screen bg-white overflow-hidden" id="Home">
        
        {/* =========================================
            BACKGROUND: DOTTED GRID (Seperti di Referensi)
            ========================================= */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:32px_32px] opacity-70"></div>

        {/* =========================================
            SISI KANAN: FOTO POTRET EDGE-TO-EDGE (DIPERBAIKI)
            ========================================= */}
        <div className="absolute bottom-0 right-0 w-[80%] lg:w-[45%] h-[70vh] lg:h-screen z-0 flex justify-end items-end pointer-events-none">
          <div className="relative w-full h-full">
            {/* Gradasi yang diperhalus agar tidak menutupi wajah */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden z-10" />
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white to-transparent hidden lg:block z-10" />
            
            <img 
              src="/Photo home.png" 
              alt="Muhammad Henry Alifianto" 
              // object-[80%_top] akan memaksa foto mepet ke kanan dan atas
              className="w-full h-full object-cover object-[55%_top] filter grayscale contrast-125 brightness-110 opacity-70 lg:opacity-100"
            />
          </div>
        </div>

        {/* =========================================
            SISI KIRI: TIPOGRAFI RAKSASA & TEKS
            ========================================= */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 h-screen flex flex-col justify-center">
          <div className="w-full lg:w-[60%] flex flex-col items-start text-left pt-20 lg:pt-0">
            
            <motion.div 
              initial="hidden" animate="visible" variants={itemVariants}
              className="mb-6"
            >
              <span className="px-4 py-1.5 rounded-sm bg-zinc-900 text-white text-xs tracking-[0.2em] uppercase font-bold shadow-sm">
                {t("home.badge")}
              </span>
            </motion.div>

            <motion.div 
              initial="hidden" animate="visible" variants={itemVariants}
              className="mb-4 space-y-2"
            >
              {/* Tipografi Raksasa ala Brutalist */}
              <h1 className="text-7xl sm:text-8xl md:text-[8rem] font-black tracking-tighter text-zinc-900 leading-[0.9] uppercase">
                HENRY<span className="text-zinc-300"></span>
              </h1>
              
              <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-2 text-2xl sm:text-3xl font-bold text-zinc-500 tracking-tight">
                <span>{t("home.title")}</span>
                <span className="text-zinc-900 hidden sm:block">•</span>
                <span className="text-zinc-800 bg-zinc-100 px-2">
                  {text}<span className="animate-pulse text-zinc-400">|</span>
                </span>
              </div>
            </motion.div>

            <motion.p 
              initial="hidden" animate="visible" variants={itemVariants}
              className="text-lg text-zinc-500 max-w-md font-medium leading-relaxed mb-10"
            >
              {t("home.description")}
            </motion.p>

            <motion.div 
              initial="hidden" animate="visible" variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a 
                href="#Portofolio"
                className="flex items-center justify-center gap-2 px-10 py-4 bg-zinc-900 text-white font-bold uppercase tracking-wider text-sm transition-all hover:bg-zinc-800 hover:translate-x-2"
              >
                {t("home.btnProjects")}
              </a>
              <a 
                href="#Contact" 
                className="flex items-center justify-center gap-2 px-10 py-4 bg-transparent text-zinc-900 border-2 border-zinc-900 font-bold uppercase tracking-wider text-sm transition-all hover:bg-zinc-50 hover:translate-x-2"
              >
                <Play className="w-4 h-4 fill-zinc-900" />
                {t("home.btnContact")}
              </a>
            </motion.div>

          </div>
        </div>

        {/* =========================================
            MARQUEE KEAHLIAN (Tetap dipertahankan di bawah)
            ========================================= */}
        <div className="absolute bottom-0 w-full border-t border-zinc-200 bg-white py-4 overflow-hidden z-20">
          <div className="relative flex whitespace-nowrap overflow-hidden select-none">
            <div className="animate-marquee-tech flex items-center gap-8 md:gap-12 px-4">
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                  {TECH_STACK.map((tech, idx) => (
                    <span key={idx} className="text-sm md:text-base font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-4">
                      {tech} <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div className="absolute top-0 animate-marquee-tech2 flex items-center gap-8 md:gap-12 px-4">
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i + 3}>
                  {TECH_STACK.map((tech, idx) => (
                    <span key={idx} className="text-sm md:text-base font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-4">
                      {tech} <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .animate-marquee-tech { animation: marqueeTech 30s linear infinite; }
          .animate-marquee-tech2 { animation: marqueeTech2 30s linear infinite; }
          @keyframes marqueeTech { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
          @keyframes marqueeTech2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
        `}</style>

      </div>
    </>
  );
};

export default memo(Home);