import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Deteksi bahasa saat ini
  const currentLang = i18n.language?.startsWith("id") ? "id" : "en";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: t("nav.home"), href: "#Home" },
    { name: t("nav.about"), href: "#About" },
    { name: t("nav.portfolio"), href: "#Portofolio" },
    { name: t("nav.contact"), href: "#Contact" },
  ];

  // Fungsi Toggle Bahasa (Pastikan memicu i18n.changeLanguage)
  const toggleLanguage = () => {
    const nextLang = currentLang === "id" ? "en" : "id";
    i18n.changeLanguage(nextLang);
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 
        NAVBAR HYBRID: 
        - Mobile: Edge-to-edge (top-0, w-full, tanpa rounded)
        - Desktop (sm+): Floating Pill (top-6, max-w-5xl, rounded-full) 
      */}
      <header className="fixed top-0 sm:top-6 left-0 right-0 z-50 flex justify-center sm:px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full sm:max-w-5xl px-5 sm:px-6 py-4 sm:py-3.5 sm:rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-xl border-b sm:border border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              : "bg-white/70 backdrop-blur-md border-b sm:border border-zinc-200/50 shadow-sm"
          }`}
        >
          {/* LOGO */}
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="text-xl font-black tracking-tighter text-zinc-900 uppercase"
          >
            HENRY<span className="text-zinc-400">.</span>
          </a>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-zinc-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* KANAN: BAHASA & TOMBOL KOLAB (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 transition-colors uppercase tracking-wider"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang}</span>
            </button>

            <a
              href="#Contact"
              onClick={(e) => scrollToSection(e, "#Contact")}
              className="flex items-center gap-1.5 px-5 py-2 bg-zinc-900 text-white rounded-full font-bold uppercase tracking-wider text-xs transition-transform hover:scale-105 active:scale-95 shadow-md hover:bg-zinc-800"
            >
              {t("nav.collab")} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* HAMBURGER MOBILE */}
          <button
            className="lg:hidden p-1 text-zinc-900 focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </motion.nav>
      </header>

      {/* FULLSCREEN MENU MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="px-5 py-5 flex items-center justify-between border-b border-zinc-100">
              <span className="text-xl font-black tracking-tighter text-zinc-900 uppercase">
                HENRY.
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-zinc-100 rounded-full text-zinc-900 hover:bg-zinc-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="text-3xl font-black text-zinc-900 uppercase tracking-tighter hover:text-zinc-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="p-6 border-t border-zinc-100 flex flex-col gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 text-sm font-bold text-zinc-900 uppercase tracking-widest p-4 bg-zinc-100 rounded-2xl"
              >
                <Globe className="w-5 h-5" />
                Bahasa: {currentLang === "id" ? "INDONESIA" : "ENGLISH"}
              </button>
              
              <a
                href="#Contact"
                onClick={(e) => scrollToSection(e, "#Contact")}
                className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl"
              >
                {t("nav.collab")} <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;